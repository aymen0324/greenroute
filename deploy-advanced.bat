@echo off
REM 🚀 GreenRoute Advanced Deployment Script for Windows
REM Automated deployment with Kubernetes, Terraform, and CI/CD integration

setlocal enabledelayedexpansion

REM Configuration
set CLUSTER_NAME=greenroute-cluster
set NAMESPACE=greenroute
set AWS_REGION=eu-west-1

echo [INFO] 🚀 Starting GreenRoute deployment for Windows...

REM Check prerequisites
echo [INFO] 🔍 Checking prerequisites...

where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed or not in PATH
    exit /b 1
)

where kubectl >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] kubectl is not installed or not in PATH
    exit /b 1
)

where terraform >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Terraform is not installed or not in PATH
    exit /b 1
)

where aws >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] AWS CLI is not installed or not in PATH
    exit /b 1
)

where helm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Helm is not installed or not in PATH
    exit /b 1
)

echo [SUCCESS] ✅ All prerequisites are installed

REM Get AWS Account ID
for /f "tokens=*" %%i in ('aws sts get-caller-identity --query Account --output text') do set AWS_ACCOUNT_ID=%%i
set ECR_BASE_URL=%AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com

REM Build and push Docker images
echo [INFO] 🏗️ Building and pushing Docker images...

REM Login to ECR
aws ecr get-login-password --region %AWS_REGION% | docker login --username AWS --password-stdin %ECR_BASE_URL%

REM Build frontend
echo [INFO] Building frontend image...
docker build -t greenroute/frontend:latest .
docker tag greenroute/frontend:latest %ECR_BASE_URL%/greenroute/frontend:latest
docker push %ECR_BASE_URL%/greenroute/frontend:latest
echo [SUCCESS] ✅ Frontend image built and pushed

REM Build backend
echo [INFO] Building backend image...
docker build -f Dockerfile.backend -t greenroute/backend:latest .
docker tag greenroute/backend:latest %ECR_BASE_URL%/greenroute/backend:latest
docker push %ECR_BASE_URL%/greenroute/backend:latest
echo [SUCCESS] ✅ Backend image built and pushed

REM Build ML server
echo [INFO] Building ML server image...
docker build -f Dockerfile.ml -t greenroute/ml-server:latest .
docker tag greenroute/ml-server:latest %ECR_BASE_URL%/greenroute/ml-server:latest
docker push %ECR_BASE_URL%/greenroute/ml-server:latest
echo [SUCCESS] ✅ ML server image built and pushed

REM Deploy infrastructure with Terraform
echo [INFO] 🏗️ Deploying infrastructure with Terraform...
cd infrastructure
terraform init
terraform plan -out=tfplan
terraform apply tfplan

REM Get cluster credentials
aws eks update-kubeconfig --region %AWS_REGION% --name %CLUSTER_NAME%
cd ..
echo [SUCCESS] ✅ Infrastructure deployed successfully

REM Deploy applications to Kubernetes
echo [INFO] 🚀 Deploying applications to Kubernetes...

REM Create namespace
kubectl create namespace %NAMESPACE% --dry-run=client -o yaml | kubectl apply -f -

REM Apply Kubernetes manifests
kubectl apply -f k8s-deployment.yaml

REM Wait for deployments
echo [INFO] Waiting for deployments to be ready...
kubectl wait --for=condition=available --timeout=600s deployment -l app=greenroute-frontend -n %NAMESPACE%
kubectl wait --for=condition=available --timeout=600s deployment -l app=greenroute-backend -n %NAMESPACE%
echo [SUCCESS] ✅ Applications deployed successfully

REM Setup monitoring
echo [INFO] 📊 Setting up monitoring with Prometheus and Grafana...
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

helm upgrade --install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=10Gi --set grafana.adminPassword=admin123
echo [SUCCESS] ✅ Monitoring stack deployed

REM Setup ingress
echo [INFO] 🌐 Setting up ingress controller...
helm repo add eks https://aws.github.io/eks-charts
helm repo update
helm upgrade --install aws-load-balancer-controller eks/aws-load-balancer-controller --namespace kube-system --set clusterName=%CLUSTER_NAME% --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller
echo [SUCCESS] ✅ Ingress controller deployed

REM Health checks
echo [INFO] 🏥 Running health checks...
kubectl get pods -n %NAMESPACE%
kubectl get services -n %NAMESPACE%

echo [SUCCESS] 🎉 GreenRoute deployment completed successfully!
echo [INFO] 📊 Monitoring dashboard: kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80
echo [INFO] 🔧 Access Grafana with admin/admin123

pause
