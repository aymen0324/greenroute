import React from 'react';
import { ArrowLeft, Shield, Database, Lock, Activity, Server, Cloud, Zap, Cpu, GitBranch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BackendPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Header */}
      <div className="bg-slate-800/30 backdrop-blur-xl border-b border-slate-700/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver al Inicio
            </button>
            <h1 className="text-xl font-semibold text-white">Arquitectura Backend</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

             {/* Main Content */}
       <div className="max-w-7xl mx-auto p-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl mb-6">
            <Server className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent mb-6">
            Arquitectura Backend Sólida
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Infraestructura robusta y escalable que soporta miles de operaciones logísticas en tiempo real
          </p>
        </div>

        {/* Architecture Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Arquitectura de Microservicios</h3>
            
            <div className="space-y-4">
              {[
                {
                  title: "API Gateway",
                  description: "Kong/Express.js con rate limiting, autenticación JWT y load balancing inteligente",
                  icon: Shield,
                  color: "from-blue-500 to-cyan-500",
                  features: ["Rate Limiting", "JWT Auth", "Load Balancing", "CORS Management"]
                },
                {
                  title: "Base de Datos",
                  description: "PostgreSQL como principal, Redis para cache, MongoDB para analytics",
                  icon: Database,
                  color: "from-green-500 to-emerald-500",
                  features: ["ACID Compliance", "Connection Pooling", "Read Replicas", "Backup Strategy"]
                },
                {
                  title: "Autenticación",
                  description: "OAuth 2.0, JWT tokens, RBAC con roles granulares y 2FA",
                  icon: Lock,
                  color: "from-purple-500 to-pink-500",
                  features: ["OAuth 2.0", "JWT Tokens", "RBAC", "2FA Support"]
                },
                {
                  title: "Monitoreo",
                  description: "Prometheus + Grafana, ELK Stack, alertas en tiempo real",
                  icon: Activity,
                  color: "from-orange-500 to-red-500",
                  features: ["Real-time Metrics", "Alerting", "Log Aggregation", "Performance Tracking"]
                }
              ].map((service, index) => (
                                 <div
                   key={service.title}
                   className="p-6 rounded-2xl bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-800/50 transition-all duration-300 group"
                 >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
                      <p className="text-gray-300 text-sm mb-3">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-700/50 rounded-lg text-xs text-gray-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Stack Tecnológico</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Node.js", icon: "⚡", color: "from-green-500 to-emerald-500", desc: "Runtime" },
                { name: "PostgreSQL", icon: "🐘", color: "from-blue-500 to-cyan-500", desc: "Database" },
                { name: "Redis", icon: "🔴", color: "from-red-500 to-pink-500", desc: "Cache" },
                { name: "Docker", icon: "🐳", color: "from-blue-500 to-indigo-500", desc: "Containerization" },
                { name: "Kubernetes", icon: "☸️", color: "from-purple-500 to-blue-500", desc: "Orchestration" },
                { name: "AWS", icon: "☁️", color: "from-orange-500 to-yellow-500", desc: "Cloud" },
                { name: "GraphQL", icon: "🔗", color: "from-pink-500 to-purple-500", desc: "API" },
                { name: "WebSocket", icon: "🔌", color: "from-green-500 to-blue-500", desc: "Real-time" }
              ].map((tech, index) => (
                                 <div
                   key={tech.name}
                   className="p-4 rounded-xl bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-800/50 transition-all duration-300 text-center group"
                 >
                  <div className={`w-12 h-12 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{tech.icon}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{tech.name}</h4>
                  <p className="text-xs text-gray-400">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
                 <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-600/30 mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Métricas de Rendimiento</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { metric: "99.9%", label: "Uptime", icon: "🟢", desc: "Disponibilidad" },
              { metric: "< 50ms", label: "Latencia", icon: "⚡", desc: "Respuesta" },
              { metric: "10K+", label: "Requests/s", icon: "📊", desc: "Throughput" },
              { metric: "Auto-scaling", label: "Escalabilidad", icon: "📈", desc: "Flexibilidad" }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-green-400 mb-1">{stat.metric}</div>
                <div className="text-gray-300 text-sm mb-1">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

                 {/* Security & Compliance */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
           <div className="p-6 rounded-2xl bg-slate-800/30 backdrop-blur-xl border border-slate-700/30">
            <h3 className="text-xl font-bold text-white mb-4">🔒 Seguridad</h3>
            <div className="space-y-3">
              {[
                "Encriptación AES-256 en tránsito y reposo",
                "Autenticación multi-factor (MFA)",
                "Auditoría completa de logs",
                "Penetration testing regular",
                "Compliance GDPR y SOC 2"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

                     <div className="p-6 rounded-2xl bg-slate-800/30 backdrop-blur-xl border border-slate-700/30">
            <h3 className="text-xl font-bold text-white mb-4">⚡ Rendimiento</h3>
            <div className="space-y-3">
              {[
                "CDN global para contenido estático",
                "Database connection pooling",
                "Redis caching en múltiples niveles",
                "Load balancing automático",
                "Auto-scaling basado en métricas"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button 
            onClick={() => navigate('/greenroute')}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300"
          >
            Probar GreenRoute
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackendPage; 