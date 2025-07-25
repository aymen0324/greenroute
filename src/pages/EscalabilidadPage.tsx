// src/pages/EscalabilidadPage.tsx
import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Server, 
  Cloud, 
  Zap, 
  BarChart3, 
  Globe, 
  Shield, 
  Database, 
  Cpu, 
  HardDrive,
  Activity,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Layers,
  GitBranch,
  Gauge,
  Network,
  Lock,
  Rocket
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SystemMetrics from "../components/SystemMetrics";
import CloudWatchDashboard from "../components/CloudWatchDashboard";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  icon: React.ReactNode;
}

export default function EscalabilidadPage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedMetrics, setAnimatedMetrics] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    setTimeout(() => setAnimatedMetrics(true), 500);
    return () => clearInterval(timer);
  }, []);

  const realTimeMetrics: MetricCard[] = [
    {
      title: "Requests/Segundo",
      value: "12,847",
      change: "+23.5%",
      trend: "up",
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: "Tiempo Respuesta",
      value: "47ms",
      change: "-12.3%",
      trend: "down",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "CPU Utilización",
      value: "68%",
      change: "+5.2%",
      trend: "up",
      icon: <Cpu className="w-6 h-6" />
    },
    {
      title: "Memoria Activa",
      value: "42.3GB",
      change: "+8.1%",
      trend: "up",
      icon: <HardDrive className="w-6 h-6" />
    },
    {
      title: "Uptime",
      value: "99.98%",
      change: "0%",
      trend: "stable",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Usuarios Activos",
      value: "248K",
      change: "+45.7%",
      trend: "up",
      icon: <Users className="w-6 h-6" />
    }
  ];

  const architectureComponents = [
    {
      name: "AWS Application Load Balancer",
      description: "Distribución inteligente de tráfico",
      status: "healthy",
      connections: "847K/min"
    },
    {
      name: "AWS ECS Fargate",
      description: "Contenedores serverless auto-escalables",
      status: "healthy",
      connections: "24 instancias activas"
    },
    {
      name: "Amazon RDS Multi-AZ",
      description: "Base de datos con alta disponibilidad",
      status: "healthy",
      connections: "1.2K conn/seg"
    },
    {
      name: "ElastiCache Redis Cluster",
      description: "Cache distribuido en memoria",
      status: "healthy",
      connections: "15.8K ops/seg"
    },
    {
      name: "AWS CloudFront CDN",
      description: "Red de entrega de contenido global",
      status: "healthy",
      connections: "156 edge locations"
    },
    {
      name: "Amazon S3 + CloudWatch",
      description: "Almacenamiento y monitoreo",
      status: "healthy",
      connections: "99.999% durabilidad"
    }
  ];

  const techStack = [
    { category: "Frontend", techs: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "PWA"] },
    { category: "Backend", techs: ["Node.js", "Express", "Python FastAPI", "GraphQL", "WebSockets"] },
    { category: "Database", techs: ["PostgreSQL", "Redis", "MongoDB", "TimescaleDB", "DynamoDB"] },
    { category: "Infrastructure", techs: ["AWS ECS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"] },
    { category: "Monitoring", techs: ["CloudWatch", "Datadog", "Prometheus", "Grafana", "Sentry"] },
    { category: "Security", techs: ["AWS WAF", "OAuth 2.0", "JWT", "Rate Limiting", "SSL/TLS"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
      >
        <ArrowLeft className="mr-2" /> Volver
      </button>

      {/* Header con animación */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 animate-pulse">
          <Rocket className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          Escalabilidad Enterprise
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Arquitectura cloud-native de clase mundial, diseñada para manejar millones de usuarios 
          con latencia ultra-baja y disponibilidad del 99.99%
        </p>
        <div className="mt-4 text-sm text-gray-400">
          🕒 Sistema en vivo: {currentTime.toLocaleTimeString('es-ES')} | 🌍 Servicio global activo
        </div>
      </div>

      {/* Métricas del sistema en tiempo real */}
      <div className="mb-12">
        <SystemMetrics />
      </div>

      {/* Métricas en tiempo real */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <BarChart3 className="mr-3 text-yellow-400" />
          Métricas en Tiempo Real
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realTimeMetrics.map((metric, index) => (
            <div
              key={metric.title}
              className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 transform transition-all duration-500 hover:scale-105 ${
                animatedMetrics ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-gray-400">{metric.icon}</div>
                <div className={`flex items-center text-sm ${
                  metric.trend === 'up' ? 'text-green-400' :
                  metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  <TrendingUp className={`w-4 h-4 mr-1 ${
                    metric.trend === 'down' ? 'rotate-180' : ''
                  }`} />
                  {metric.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-gray-400 text-sm">{metric.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Arquitectura del Sistema */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Layers className="mr-3 text-blue-400" />
          Arquitectura Cloud-Native
        </h2>
        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Diagrama de arquitectura simplificado */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-blue-300 mb-4">Componentes Principales</h3>
              {architectureComponents.map((component, index) => (
                <div
                  key={component.name}
                  className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-blue-400 hover:bg-gray-800/70 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{component.name}</h4>
                    <span className="flex items-center text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {component.status}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{component.description}</p>
                  <div className="text-blue-300 text-xs">{component.connections}</div>
                </div>
              ))}
            </div>

            {/* Visualización de flujo de datos */}
            <div className="bg-gray-900/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-300 mb-4">Flujo de Datos</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Globe className="w-8 h-8 text-green-400 mr-3" />
                  <div className="flex-1">
                    <div className="text-white font-medium">Cliente Global</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div className="bg-green-400 h-2 rounded-full animate-pulse" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Cloud className="w-8 h-8 text-blue-400 mr-3" />
                  <div className="flex-1">
                    <div className="text-white font-medium">CloudFront CDN</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div className="bg-blue-400 h-2 rounded-full animate-pulse" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Server className="w-8 h-8 text-purple-400 mr-3" />
                  <div className="flex-1">
                    <div className="text-white font-medium">ECS Fargate</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div className="bg-purple-400 h-2 rounded-full animate-pulse" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Database className="w-8 h-8 text-yellow-400 mr-3" />
                  <div className="flex-1">
                    <div className="text-white font-medium">RDS Multi-AZ</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div className="bg-yellow-400 h-2 rounded-full animate-pulse" style={{width: '65%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stack Tecnológico */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Cpu className="mr-3 text-green-400" />
          Stack Tecnológico Avanzado
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((stack, index) => (
            <div
              key={stack.category}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-green-400 mb-4">{stack.category}</h3>
              <div className="flex flex-wrap gap-2">
                {stack.techs.map((tech) => (
                  <span
                    key={tech}
                    className="bg-green-900/30 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30 hover:bg-green-900/50 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Características de Escalabilidad */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Zap className="mr-3 text-yellow-400" />
          Características de Escalabilidad
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
                <Network className="w-5 h-5 mr-2" />
                Auto-Scaling Inteligente
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Escalado horizontal automático basado en CPU, memoria y latencia</li>
                <li>• Predicción de demanda con Machine Learning</li>
                <li>• Escalado preventivo durante picos de tráfico</li>
                <li>• Optimización de costos con instancias spot</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-xl p-6 border border-green-500/30">
              <h3 className="text-xl font-semibold text-green-300 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Alta Disponibilidad
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Despliegue multi-región con failover automático</li>
                <li>• Base de datos con réplicas de lectura en múltiples AZ</li>
                <li>• Circuit breakers y retry policies inteligentes</li>
                <li>• Backup continuo y disaster recovery</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
                <Gauge className="w-5 h-5 mr-2" />
                Optimización de Performance
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• CDN global con 200+ edge locations</li>
                <li>• Compresión y optimización automática de assets</li>
                <li>• Database query optimization con índices inteligentes</li>
                <li>• Caching multi-nivel (L1, L2, CDN)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-xl p-6 border border-yellow-500/30">
              <h3 className="text-xl font-semibold text-yellow-300 mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Seguridad Enterprise
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• WAF con protección DDoS y rate limiting</li>
                <li>• Encriptación end-to-end en tránsito y reposo</li>
                <li>• Autenticación multi-factor y OAuth 2.0</li>
                <li>• Auditoría completa y compliance SOC 2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* DevOps y CI/CD */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <GitBranch className="mr-3 text-purple-400" />
          DevOps y CI/CD Pipeline
        </h2>
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <GitBranch className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-blue-300 mb-2">Source Control</h3>
              <p className="text-gray-400 text-sm">Git con GitHub Flow y feature branches</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-green-300 mb-2">Testing</h3>
              <p className="text-gray-400 text-sm">Unit, Integration y E2E tests automatizados</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-yellow-300 mb-2">Build & Deploy</h3>
              <p className="text-gray-400 text-sm">GitHub Actions con deployment automático</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-purple-300 mb-2">Monitoring</h3>
              <p className="text-gray-400 text-sm">Observabilidad completa y alertas inteligentes</p>
            </div>
          </div>
        </div>
      </div>

      {/* CloudWatch Dashboard */}
      <div className="mb-12">
        <CloudWatchDashboard />
      </div>

      {/* Métricas de Business Impact */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <TrendingUp className="mr-3 text-green-400" />
          Impacto en el Negocio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">40%</div>
            <div className="text-green-200">Reducción en costos de infraestructura</div>
          </div>
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">99.98%</div>
            <div className="text-blue-200">Uptime garantizado</div>
          </div>
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">&lt; 50ms</div>
            <div className="text-purple-200">Latencia promedio global</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-800 to-yellow-900 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">10M+</div>
            <div className="text-yellow-200">Requests procesados diariamente</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-2xl p-8 border border-yellow-500/30">
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">
          🚀 Arquitectura preparada para el futuro
        </h2>
        <p className="text-gray-300 text-lg mb-6 max-w-3xl mx-auto">
          GreenRoute utiliza las mejores prácticas de la industria y tecnologías de vanguardia 
          para ofrecer una plataforma robusta, escalable y confiable que puede crecer desde 
          cientos hasta millones de usuarios sin comprometer el rendimiento.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-yellow-800/50 text-yellow-200 px-4 py-2 rounded-full">Cloud-Native</span>
          <span className="bg-yellow-800/50 text-yellow-200 px-4 py-2 rounded-full">Microservicios</span>
          <span className="bg-yellow-800/50 text-yellow-200 px-4 py-2 rounded-full">Serverless</span>
          <span className="bg-yellow-800/50 text-yellow-200 px-4 py-2 rounded-full">Event-Driven</span>
          <span className="bg-yellow-800/50 text-yellow-200 px-4 py-2 rounded-full">Machine Learning</span>
        </div>
      </div>
    </div>
  );
}
