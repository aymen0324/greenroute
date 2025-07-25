#!/bin/bash

# 🚀 GreenRoute Advanced Deployment Script
# Automated deployment with Kubernetes, Terraform, and CI/CD integration

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CLUSTER_NAME="greenroute-cluster"
NAMESPACE="greenroute"
AWS_REGION="eu-west-1"
ECR_BASE_URL="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "🔍 Checking prerequisites..."
    
    commands=("docker" "kubectl" "terraform" "aws" "helm")
    for cmd in "${commands[@]}"; do
        if ! command -v $cmd &> /dev/null; then
            log_error "$cmd is not installed"
            exit 1
        fi
    done
    
    log_success "✅ All prerequisites are installed"
}

# Build and push Docker images
build_and_push_images() {
    log_info "🏗️ Building and pushing Docker images..."
    
    # Login to ECR
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_BASE_URL
    
    # Build images
    images=("frontend" "backend" "ml-server")
    for image in "${images[@]}"; do
        log_info "Building $image image..."
        
        if [ "$image" = "frontend" ]; then
            docker build -t greenroute/$image:latest .
        else
            docker build -f Dockerfile.$image -t greenroute/$image:latest .
        fi
        
        # Tag for ECR
        docker tag greenroute/$image:latest $ECR_BASE_URL/greenroute/$image:latest
        
        # Push to ECR
        docker push $ECR_BASE_URL/greenroute/$image:latest
        
        log_success "✅ $image image built and pushed"
    done
}

# Deploy infrastructure with Terraform
deploy_infrastructure() {
    log_info "🏗️ Deploying infrastructure with Terraform..."
    
    cd infrastructure
    
    # Initialize Terraform
    terraform init
    
    # Plan deployment
    terraform plan -out=tfplan
    
    # Apply infrastructure
    terraform apply tfplan
    
    # Get cluster credentials
    aws eks update-kubeconfig --region $AWS_REGION --name $CLUSTER_NAME
    
    cd ..
    
    log_success "✅ Infrastructure deployed successfully"
}

# Deploy applications to Kubernetes
deploy_applications() {
    log_info "🚀 Deploying applications to Kubernetes..."
    
    # Create namespace
    kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -
    
    # Update image references in k8s manifests
    sed -i "s|greenroute/frontend:latest|$ECR_BASE_URL/greenroute/frontend:latest|g" k8s-deployment.yaml
    sed -i "s|greenroute/backend:latest|$ECR_BASE_URL/greenroute/backend:latest|g" k8s-deployment.yaml
    sed -i "s|greenroute/ml-server:latest|$ECR_BASE_URL/greenroute/ml-server:latest|g" k8s-deployment.yaml
    
    # Apply Kubernetes manifests
    kubectl apply -f k8s-deployment.yaml
    
    # Wait for deployments to be ready
    kubectl wait --for=condition=available --timeout=600s deployment -l app=greenroute-frontend -n $NAMESPACE
    kubectl wait --for=condition=available --timeout=600s deployment -l app=greenroute-backend -n $NAMESPACE
    
    log_success "✅ Applications deployed successfully"
}

# Setup monitoring with Prometheus and Grafana
setup_monitoring() {
    log_info "📊 Setting up monitoring with Prometheus and Grafana..."
    
    # Add Helm repositories
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo add grafana https://grafana.github.io/helm-charts
    helm repo update
    
    # Install Prometheus
    helm upgrade --install prometheus prometheus-community/kube-prometheus-stack \
        --namespace monitoring \
        --create-namespace \
        --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=10Gi \
        --set grafana.adminPassword=admin123
    
    log_success "✅ Monitoring stack deployed"
}

# Setup ingress controller
setup_ingress() {
    log_info "🌐 Setting up ingress controller..."
    
    # Install AWS Load Balancer Controller
    helm repo add eks https://aws.github.io/eks-charts
    helm repo update
    
    helm upgrade --install aws-load-balancer-controller eks/aws-load-balancer-controller \
        --namespace kube-system \
        --set clusterName=$CLUSTER_NAME \
        --set serviceAccount.create=false \
        --set serviceAccount.name=aws-load-balancer-controller
    
    log_success "✅ Ingress controller deployed"
}

# Run health checks
run_health_checks() {
    log_info "🏥 Running health checks..."
    
    # Check if all pods are running
    kubectl get pods -n $NAMESPACE
    
    # Check services
    kubectl get services -n $NAMESPACE
    
    # Get load balancer URL
    FRONTEND_URL=$(kubectl get service greenroute-frontend-service -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
    
    if [ -n "$FRONTEND_URL" ]; then
        log_success "✅ Frontend available at: http://$FRONTEND_URL"
    else
        log_warning "⚠️ Frontend URL not yet available. It may take a few minutes."
    fi
    
    log_success "✅ Health checks completed"
}

# Main deployment flow
main() {
    log_info "🚀 Starting GreenRoute deployment..."
    
    check_prerequisites
    build_and_push_images
    deploy_infrastructure
    deploy_applications
    setup_monitoring
    setup_ingress
    run_health_checks
    
    log_success "🎉 GreenRoute deployment completed successfully!"
    log_info "📊 Monitoring dashboard: kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80"
    log_info "🔧 Access Grafana with admin/admin123"
}

# Handle script arguments
case "${1:-all}" in
    "infrastructure")
        deploy_infrastructure
        ;;
    "applications")
        deploy_applications
        ;;
    "monitoring")
        setup_monitoring
        ;;
    "health")
        run_health_checks
        ;;
    "all")
        main
        ;;
    *)
        echo "Usage: $0 {infrastructure|applications|monitoring|health|all}"
        exit 1
        ;;
esac
