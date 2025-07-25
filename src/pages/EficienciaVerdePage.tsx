// src/pages/EficienciaVerdePage.tsx
import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Leaf, 
  TrendingDown, 
  Globe, 
  Award,
  Zap,
  Shield,
  Target,
  Brain,
  Cpu,
  Database,
  Layers,
  Settings,
  Users,
  TreePine,
  Recycle,
  Sun,
  Wind,
  Droplets
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EcoChatbot from "../components/EcoChatbot";
import EcoImpactCalculator from "../components/EcoImpactCalculator";
import EcoMetricsLive from "../components/EcoMetricsLive";

export default function EficienciaVerdePage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    setTimeout(() => setAnimatedStats(true), 500);
    return () => clearInterval(timer);
  }, []);

  const aiFeatures = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "IA Predictiva",
      description: "Algoritmos de machine learning que predicen patrones de tráfico y condiciones climáticas",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Optimización Dinámica",
      description: "Recalcula rutas en tiempo real basado en 50+ variables ambientales",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Eco-Coaching",
      description: "IA que analiza patrones de conducción y sugiere mejoras en tiempo real",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Big Data Ambiental",
      description: "Procesa 10TB+ de datos diarios: clima, tráfico, emisiones, IoT",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const sustainabilityMetrics = [
    {
      icon: <Leaf className="w-8 h-8" />,
      value: "2.8M",
      label: "Toneladas CO₂ Evitadas",
      subtitle: "Equivalente a 120,000 árboles",
      color: "text-green-400",
      bg: "bg-green-900/30"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      value: "15M",
      label: "Litros Combustible Ahorrados",
      subtitle: "Reducción 32% consumo promedio",
      color: "text-blue-400",
      bg: "bg-blue-900/30"
    },
    {
      icon: <TreePine className="w-8 h-8" />,
      value: "450K",
      label: "Árboles Plantados Virtuales",
      subtitle: "Por cada 10kg CO₂ ahorrados",
      color: "text-emerald-400",
      bg: "bg-emerald-900/30"
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      value: "98%",
      label: "Eficiencia Circular",
      subtitle: "Recursos optimizados y reutilizados",
      color: "text-purple-400",
      bg: "bg-purple-900/30"
    }
  ];

  const certifications = [
    { name: "ISO 14001", description: "Gestión Ambiental", icon: "🌍" },
    { name: "Carbon Trust", description: "Huella de Carbono", icon: "🌱" },
    { name: "B Corp", description: "Impacto Social", icon: "🏆" },
    { name: "Smart Mobility", description: "Movilidad Inteligente", icon: "🚗" },
    { name: "LEED Platinum", description: "Construcción Sostenible", icon: "🏢" },
    { name: "Energy Star", description: "Eficiencia Energética", icon: "⭐" }
  ];

  const technologies = [
    {
      category: "Inteligencia Artificial",
      items: ["TensorFlow", "PyTorch", "Computer Vision", "NLP", "Reinforcement Learning"]
    },
    {
      category: "Internet of Things",
      items: ["Sensores CO₂", "GPS Avanzado", "Telemetría", "Edge Computing", "5G Connectivity"]
    },
    {
      category: "Cloud Computing",
      items: ["AWS Carbon Lake", "Azure Sustainability", "Google Earth Engine", "Serverless", "Auto-scaling"]
    },
    {
      category: "Blockchain",
      items: ["Carbon Credits", "Supply Chain", "Smart Contracts", "Ethereum", "Proof of Stake"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-green-400 hover:text-green-300 transition-colors"
        >
          <ArrowLeft className="mr-2" /> Volver
        </button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 animate-bounce">
            <Leaf className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Eficiencia Verde Inteligente
          </h1>
          
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Revolucionamos la logística con IA avanzada, reduciendo el impacto ambiental 
            y maximizando la eficiencia energética con tecnología de vanguardia
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Sistema Activo 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Cobertura Global</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Tiempo Real: {currentTime.toLocaleTimeString('es-ES')}</span>
            </div>
          </div>
        </div>

        {/* Main Impact Metrics */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center">
            <TrendingDown className="w-10 h-10 mr-3 text-green-400" />
            Impacto Ambiental Global
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sustainabilityMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`${metric.bg} rounded-2xl p-8 border border-green-500/20 text-center transform transition-all duration-700 hover:scale-105 ${
                  animatedStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`${metric.color} mb-4 flex justify-center`}>
                  {metric.icon}
                </div>
                <div className={`text-4xl font-bold ${metric.color} mb-2`}>
                  {metric.value}
                </div>
                <div className="text-white font-semibold mb-1">{metric.label}</div>
                <div className="text-gray-400 text-sm">{metric.subtitle}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Metrics Dashboard */}
        <div className="mb-16">
          <EcoMetricsLive />
        </div>

        {/* AI Features */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center">
            <Brain className="w-10 h-10 mr-3 text-purple-400" />
            Inteligencia Artificial Ambiental
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Calculator */}
        <div className="mb-16">
          <EcoImpactCalculator />
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center">
            <Cpu className="w-10 h-10 mr-3 text-blue-400" />
            Stack Tecnológico Verde
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={tech.category}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-4">{tech.category}</h3>
                <div className="space-y-2">
                  {tech.items.map((item) => (
                    <div
                      key={item}
                      className="bg-blue-900/30 text-blue-300 px-3 py-2 rounded-lg text-sm border border-blue-500/20 hover:bg-blue-900/50 transition-colors"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Features */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center">
            <Shield className="w-10 h-10 mr-3 text-green-400" />
            Características Ambientales Avanzadas
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-semibold text-green-300 mb-4 flex items-center">
                  <Sun className="w-5 h-5 mr-2" />
                  Energías Renovables
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Integración con paneles solares de flotas</li>
                  <li>• Optimización para vehículos eléctricos</li>
                  <li>• Carga inteligente basada en energía verde</li>
                  <li>• Predicción de disponibilidad solar/eólica</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
                  <Wind className="w-5 h-5 mr-2" />
                  Calidad del Aire
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Monitoreo en tiempo real de contaminantes</li>
                  <li>• Rutas que evitan zonas de alta polución</li>
                  <li>• Alertas de calidad del aire</li>
                  <li>• Contribución a mapas de contaminación</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
                  <Layers className="w-5 h-5 mr-2" />
                  Economía Circular
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Optimización de carga de retorno</li>
                  <li>• Rutas de reciclaje inteligentes</li>
                  <li>• Marketplace de recursos compartidos</li>
                  <li>• Trazabilidad de materiales sostenibles</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-xl p-6 border border-yellow-500/30">
                <h3 className="text-xl font-semibold text-yellow-300 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Impacto Social
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Reducción de ruido en zonas urbanas</li>
                  <li>• Apoyo a comunidades locales</li>
                  <li>• Empleos verdes y capacitación</li>
                  <li>• Transparencia en métricas sociales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 flex items-center justify-center">
            <Award className="w-10 h-10 mr-3 text-yellow-400" />
            Certificaciones y Reconocimientos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 text-center hover:border-yellow-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-3">{cert.icon}</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">{cert.name}</h3>
                <p className="text-gray-300 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Real Example Case Study */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-2xl p-8 border border-green-500/30">
            <h2 className="text-3xl font-bold text-center mb-6 text-green-400">
              Caso de Éxito Real: Empresa Logística Europea
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Resultados en 6 meses:</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-green-800/30 rounded-lg p-4">
                    <span className="text-green-200">Reducción CO₂:</span>
                    <span className="text-2xl font-bold text-green-400">-42%</span>
                  </div>
                  <div className="flex items-center justify-between bg-blue-800/30 rounded-lg p-4">
                    <span className="text-blue-200">Ahorro combustible:</span>
                    <span className="text-2xl font-bold text-blue-400">-38%</span>
                  </div>
                  <div className="flex items-center justify-between bg-yellow-800/30 rounded-lg p-4">
                    <span className="text-yellow-200">Ahorro económico:</span>
                    <span className="text-2xl font-bold text-yellow-400">€125K</span>
                  </div>
                  <div className="flex items-center justify-between bg-purple-800/30 rounded-lg p-4">
                    <span className="text-purple-200">Eficiencia operativa:</span>
                    <span className="text-2xl font-bold text-purple-400">+35%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Implementación:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>Semana 1-2:</strong> Instalación de sensores IoT y integración de APIs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>Semana 3-4:</strong> Entrenamiento de algoritmos IA con datos históricos</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>Semana 5-8:</strong> Optimización gradual y capacitación del personal</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>Semana 9+:</strong> Funcionamiento autónomo con mejora continua</span>
                  </li>
                </ul>
                
                <div className="mt-6 bg-gray-800/50 rounded-lg p-4">
                  <p className="text-green-300 italic">
                    "GreenRoute transformó nuestra operación. No solo reducimos costos, 
                    sino que nos convertimos en líderes de sostenibilidad en nuestro sector."
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    - Director de Operaciones, LogiGreen Europe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-2xl p-12 border border-green-500/30">
          <h2 className="text-4xl font-bold text-green-400 mb-6">
            🚀 Únete a la Revolución Verde
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transforma tu logística con IA avanzada, reduce tu huella de carbono 
            y lidera el cambio hacia un futuro sostenible
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-700/50 text-green-200 px-6 py-3 rounded-full font-semibold">
              IA Ambiental
            </span>
            <span className="bg-blue-700/50 text-blue-200 px-6 py-3 rounded-full font-semibold">
              Impacto Medible
            </span>
            <span className="bg-purple-700/50 text-purple-200 px-6 py-3 rounded-full font-semibold">
              ROI Garantizado
            </span>
            <span className="bg-yellow-700/50 text-yellow-200 px-6 py-3 rounded-full font-semibold">
              Certificaciones
            </span>
          </div>
        </div>
      </div>

      {/* Eco Chatbot */}
      <EcoChatbot />
    </div>
  );
}
