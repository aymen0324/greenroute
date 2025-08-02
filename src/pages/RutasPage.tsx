// src/pages/RutasPage.tsx
import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Map, Route, Timer, BarChart3, Compass, CheckCircle2, 
  Zap, Brain, Satellite, Truck, MapPin, Clock, TrendingUp, 
  Wifi, Shield, Award, Activity, Globe, Layers, Navigation,
  Eye, Target, Cpu, Database, Radio, Radar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import RouteCalculator from "../components/RouteCalculator";
import BusinessAnalyticsDashboard from "../components/BusinessAnalyticsDashboard";

export default function RutasPage() {
  const navigate = useNavigate();
  const [liveData, setLiveData] = useState({
    activeRoutes: 1247,
    optimizationSavings: 23.7,
    realTimeUpdates: 15420,
    predictiveAccuracy: 96.8,
    carbonReduction: 847.2,
    averageDelay: 4.2
  });

  const [aiInsights, setAiInsights] = useState([
    { type: "traffic", message: "Tráfico intenso detectado en A-4. Redirigiendo 127 vehículos automáticamente.", severity: "warning", time: "hace 2 min" },
    { type: "weather", message: "Lluvia prevista en Valencia. Ajustando velocidades y rutas para 89 entregas.", severity: "info", time: "hace 5 min" },
    { type: "optimization", message: "IA detectó nueva ruta 18% más eficiente para zona industrial Barcelona.", severity: "success", time: "hace 8 min" },
    { type: "prediction", message: "Algoritmo predice reducción de 12% en tiempos para rutas nocturnas.", severity: "success", time: "hace 12 min" }
  ]);

  // Sample routes for 3D visualization - Enhanced with new properties
  const sampleRoutes = [
    {
      id: 'route-1',
      start: { lat: 40.4168, lng: -3.7038, name: 'Centro Logístico Madrid', city: 'Madrid' },
      end: { lat: 41.3851, lng: 2.1734, name: 'Puerto de Barcelona', city: 'Barcelona' },
      status: 'active' as const,
      efficiency: 95,
      co2Saved: 125,
      distance: 621,
      estimatedTime: '6h 15min',
      fuelSaved: 45.2,
      priority: 'high' as const,
      vehicles: 3,
      cargo: 'Electrónicos',
      progress: 75
    },
    {
      id: 'route-2',
      start: { lat: 39.4699, lng: -0.3763, name: 'Hub Valencia', city: 'Valencia' },
      end: { lat: 37.3891, lng: -5.9845, name: 'Centro Sevilla', city: 'Sevilla' },
      status: 'optimized' as const,
      efficiency: 87,
      co2Saved: 89,
      distance: 467,
      estimatedTime: '4h 45min',
      fuelSaved: 32.8,
      priority: 'medium' as const,
      vehicles: 2,
      cargo: 'Alimentación',
      progress: 45
    },
    {
      id: 'route-3',
      start: { lat: 43.2627, lng: -2.9253, name: 'Puerto Bilbao', city: 'Bilbao' },
      end: { lat: 42.8805, lng: -8.5456, name: 'Puerto Santiago', city: 'Santiago' },
      status: 'planned' as const,
      efficiency: 92,
      co2Saved: 156,
      distance: 285,
      estimatedTime: '3h 20min',
      fuelSaved: 28.9,
      priority: 'high' as const,
      vehicles: 4,
      cargo: 'Maquinaria',
      progress: 0
    },
    {
      id: 'route-4',
      start: { lat: 36.7213, lng: -4.4216, name: 'Costa del Sol', city: 'Málaga' },
      end: { lat: 28.4636, lng: -16.2518, name: 'Hub Canarias', city: 'Tenerife' },
      status: 'active' as const,
      efficiency: 88,
      co2Saved: 234,
      distance: 1123,
      estimatedTime: '12h 30min',
      fuelSaved: 78.5,
      priority: 'high' as const,
      vehicles: 1,
      cargo: 'Productos Frescos',
      progress: 60
    },
    {
      id: 'route-5',
      start: { lat: 41.6518, lng: -0.8797, name: 'Hub Zaragoza', city: 'Zaragoza' },
      end: { lat: 40.9701, lng: -5.6635, name: 'Centro Salamanca', city: 'Salamanca' },
      status: 'optimized' as const,
      efficiency: 91,
      co2Saved: 67,
      distance: 156,
      estimatedTime: '2h 10min',
      fuelSaved: 18.4,
      priority: 'low' as const,
      vehicles: 1,
      cargo: 'Textil',
      progress: 30
    }
  ];

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        activeRoutes: prev.activeRoutes + Math.floor(Math.random() * 10 - 5),
        optimizationSavings: Math.max(0, prev.optimizationSavings + (Math.random() - 0.5) * 0.3),
        realTimeUpdates: prev.realTimeUpdates + Math.floor(Math.random() * 50),
        predictiveAccuracy: Math.min(99.9, Math.max(95, prev.predictiveAccuracy + (Math.random() - 0.5) * 0.2)),
        carbonReduction: prev.carbonReduction + Math.random() * 2,
        averageDelay: Math.max(0, prev.averageDelay + (Math.random() - 0.5) * 0.5)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Header with Navigation */}
      <div className="relative z-10 p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-300 hover:text-blue-200 transition-colors group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          <span className="text-lg font-medium">Volver al Dashboard</span>
        </button>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full px-6 py-3 mb-6">
            <Brain className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-semibold">IA de Próxima Generación</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Optimización de Rutas
            </span>
            <br />
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent text-4xl md:text-5xl">
              con Inteligencia Artificial
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed mb-8">
            Motor de IA que procesa <span className="text-yellow-400 font-bold">50+ variables en tiempo real</span> 
            para crear rutas que superan la eficiencia humana en un <span className="text-green-400 font-bold">37%</span>
          </p>
        </div>
      </div>

      {/* Real-Time AI Dashboard */}
      <div className="relative z-10 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-12">
            {/* Live Metrics */}
            <div className="md:col-span-4 bg-gradient-to-br from-slate-800/60 to-blue-800/40 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Activity className="w-6 h-6 text-green-400" />
                  Centro de Control IA - En Vivo
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold">ACTIVO</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-xl p-4 border border-blue-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Truck className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-300 text-sm font-medium">Rutas Activas</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{liveData.activeRoutes.toLocaleString()}</div>
                  <div className="text-green-400 text-xs">+5.7% vs ayer</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-4 border border-green-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 text-sm font-medium">Ahorro Total</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{liveData.optimizationSavings.toFixed(1)}%</div>
                  <div className="text-green-400 text-xs">€2.4M ahorrados</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-4 border border-purple-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-300 text-sm font-medium">Precisión IA</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{liveData.predictiveAccuracy.toFixed(1)}%</div>
                  <div className="text-purple-400 text-xs">Predicciones acertadas</div>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 rounded-xl p-4 border border-yellow-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-300 text-sm font-medium">Updates/min</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{liveData.realTimeUpdates.toLocaleString()}</div>
                  <div className="text-yellow-400 text-xs">Tiempo real</div>
                </div>
                
                <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-xl p-4 border border-cyan-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-300 text-sm font-medium">CO₂ Evitado</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{liveData.carbonReduction.toFixed(1)}t</div>
                  <div className="text-cyan-400 text-xs">Hoy</div>
                </div>
                
                <div className="bg-gradient-to-br from-red-900/50 to-pink-900/50 rounded-xl p-4 border border-red-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-red-400" />
                    <span className="text-red-300 text-sm font-medium">Retraso Medio</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{liveData.averageDelay.toFixed(1)} min</div>
                  <div className="text-red-400 text-xs">-67% vs industria</div>
                </div>
              </div>
            </div>

            {/* AI Insights Panel */}
            <div className="md:col-span-2 bg-gradient-to-br from-slate-800/60 to-purple-800/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Eye className="w-5 h-5 text-purple-400" />
                Insights de IA
              </h3>
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-3 border-l-4 border-purple-400">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        insight.severity === 'warning' ? 'bg-yellow-400' :
                        insight.severity === 'success' ? 'bg-green-400' : 'bg-blue-400'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-white text-sm leading-relaxed">{insight.message}</p>
                        <span className="text-gray-400 text-xs">{insight.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Route Calculator */}
      <div className="relative z-10 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Simulador Avanzado de Rutas
              </span>
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Experimenta el poder de la IA aplicada a la optimización logística. 
              Motor de cálculo que procesa millones de variables en segundos.
            </p>
          </div>
          
          <RouteCalculator />
        </div>
      </div>

      {/* 3D Route Visualization Section */}
      <div className="relative z-10 px-6 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Visualización 3D de Rutas en Tiempo Real
              </span>
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Explora tus rutas activas en un entorno 3D interactivo. Visualiza el estado, 
              eficiencia y impacto ambiental de cada trayecto en tiempo real.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/60 backdrop-blur-sm border border-green-400/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">Rutas Activas</span>
              </div>
              <p className="text-2xl font-bold text-white">{sampleRoutes.filter(r => r.status === 'active').length}</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/60 backdrop-blur-sm border border-blue-400/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-blue-400 font-semibold">Optimizadas</span>
              </div>
              <p className="text-2xl font-bold text-white">{sampleRoutes.filter(r => r.status === 'optimized').length}</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/60 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-yellow-400 font-semibold">Planificadas</span>
              </div>
              <p className="text-2xl font-bold text-white">{sampleRoutes.filter(r => r.status === 'planned').length}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/60 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-purple-400 font-semibold">CO₂ Total Ahorrado</span>
              </div>
              <p className="text-2xl font-bold text-white">{sampleRoutes.reduce((acc, r) => acc + r.co2Saved, 0)}kg</p>
            </div>
          </div>
          
          <BusinessAnalyticsDashboard />
        </div>
      </div>

      {/* Enterprise Features Grid */}
      <div className="relative z-10 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              Tecnología Enterprise de Vanguardia
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Machine Learning Engine */}
            <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/60 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Motor de Machine Learning</h3>
              <p className="text-blue-200 mb-6 leading-relaxed">
                Redes neuronales profundas que aprenden continuamente de patrones de tráfico, 
                comportamiento de conductores y datos históricos para optimización predictiva.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-blue-200 text-sm">50M+ puntos de datos procesados/día</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-blue-200 text-sm">Algoritmos de deep learning</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-blue-200 text-sm">Aprendizaje continuo adaptativo</span>
                </div>
              </div>
            </div>

            {/* Satellite Integration */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/60 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Satellite className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Integración Satelital</h3>
              <p className="text-purple-200 mb-6 leading-relaxed">
                Datos en tiempo real de múltiples constelaciones satelitales para 
                precisión GPS submétrica y análisis de condiciones terrestres.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-purple-200 text-sm">Precisión GPS &lt; 1 metro</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-purple-200 text-sm">Múltiples constelaciones</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-purple-200 text-sm">Análisis de imágenes satelitales</span>
                </div>
              </div>
            </div>

            {/* IoT Sensor Network */}
            <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/60 backdrop-blur-sm border border-green-400/30 rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Red IoT Inteligente</h3>
              <p className="text-green-200 mb-6 leading-relaxed">
                125,000+ sensores IoT desplegados que monitorean tráfico, clima, 
                calidad del aire y condiciones de la carretera en tiempo real.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-200 text-sm">125K+ sensores activos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-200 text-sm">Datos cada 30 segundos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-200 text-sm">Cobertura nacional 97%</span>
                </div>
              </div>
            </div>

            {/* Quantum Computing */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-teal-900/60 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Computación Cuántica</h3>
              <p className="text-cyan-200 mb-6 leading-relaxed">
                Algoritmos cuánticos para resolver problemas de optimización 
                combinatoria con miles de variables en tiempo exponencialmente menor.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-cyan-200 text-sm">1000x más rápido que clásico</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-cyan-200 text-sm">Problemas NP-hard resueltos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-cyan-200 text-sm">IBM Quantum Network</span>
                </div>
              </div>
            </div>

            {/* Blockchain Integration */}
            <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/60 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Blockchain & Smart Contracts</h3>
              <p className="text-yellow-200 mb-6 leading-relaxed">
                Trazabilidad inmutable y contratos inteligentes para 
                automatizar pagos, cumplimientos y verificaciones de entrega.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-yellow-200 text-sm">Trazabilidad inmutable</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-yellow-200 text-sm">Contratos inteligentes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-yellow-200 text-sm">Ethereum compatible</span>
                </div>
              </div>
            </div>

            {/* Digital Twin */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/60 backdrop-blur-sm border border-indigo-400/30 rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Gemelo Digital</h3>
              <p className="text-indigo-200 mb-6 leading-relaxed">
                Replica virtual exacta de toda la red logística que permite 
                simulaciones en tiempo real y predicciones de escenarios futuros.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-indigo-200 text-sm">Simulación 1:1 de la realidad</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-indigo-200 text-sm">Predicción de escenarios</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-indigo-200 text-sm">Unity 3D + NVIDIA Omniverse</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Benchmarks */}
      <div className="relative z-10 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/60 to-blue-900/40 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Benchmarks de Rendimiento vs Competencia
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-900/50 to-emerald-800/50 rounded-2xl p-6 border border-green-400/30">
                  <Award className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Eficiencia de Rutas</h3>
                  <div className="text-4xl font-bold text-green-400 mb-2">+37%</div>
                  <p className="text-green-200 text-sm">Mejor que soluciones tradicionales</p>
                  <div className="mt-4 bg-green-900/30 rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-300">GreenRoute IA</span>
                      <span className="text-green-400 font-bold">97.3%</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Competidor A</span>
                      <span className="text-gray-300">71.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Métodos manuales</span>
                      <span className="text-gray-300">59.8%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-900/50 to-cyan-800/50 rounded-2xl p-6 border border-blue-400/30">
                  <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Tiempo de Cálculo</h3>
                  <div className="text-4xl font-bold text-blue-400 mb-2">1000x</div>
                  <p className="text-blue-200 text-sm">Más rápido que métodos clásicos</p>
                  <div className="mt-4 bg-blue-900/30 rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-300">GreenRoute IA</span>
                      <span className="text-blue-400 font-bold">0.3 seg</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Algoritmos clásicos</span>
                      <span className="text-gray-300">5.2 min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Planificación manual</span>
                      <span className="text-gray-300">2.5 horas</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-800/50 rounded-2xl p-6 border border-purple-400/30">
                  <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Precisión Predictiva</h3>
                  <div className="text-4xl font-bold text-purple-400 mb-2">96.8%</div>
                  <p className="text-purple-200 text-sm">Predicciones de tiempo de llegada</p>
                  <div className="mt-4 bg-purple-900/30 rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-purple-300">GreenRoute IA</span>
                      <span className="text-purple-400 font-bold">96.8%</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">GPS tradicional</span>
                      <span className="text-gray-300">78.4%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Estimación manual</span>
                      <span className="text-gray-300">62.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Showcase */}
      <div className="relative z-10 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Motor de Algoritmos Avanzados
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-slate-800/60 to-gray-800/60 backdrop-blur-sm border border-gray-400/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-yellow-400" />
                Arquitectura de Algoritmos
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="text-lg font-semibold text-yellow-300 mb-2">Algoritmos Genéticos Híbridos</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Evolución artificial que combina múltiples poblaciones de soluciones 
                    con crossover inteligente y mutación adaptativa para encontrar óptimos globales.
                  </p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">Enjambre de Partículas Cuántico</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Optimización inspirada en comportamiento de enjambres con mecánica cuántica 
                    para exploración del espacio de soluciones en dimensiones superiores.
                  </p>
                </div>
                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="text-lg font-semibold text-green-300 mb-2">Simulated Annealing Paralelo</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Enfriamiento simulado distribuido en múltiples núcleos GPU con 
                    temperatura adaptativa basada en calidad de soluciones encontradas.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/60 to-purple-800/60 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Radar className="w-6 h-6 text-purple-400" />
                Variables de Optimización
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { category: "Tráfico", vars: ["Densidad vehicular", "Velocidad promedio", "Incidents en tiempo real", "Patrones históricos"], color: "red" },
                  { category: "Clima", vars: ["Precipitación", "Visibilidad", "Viento", "Temperatura"], color: "blue" },
                  { category: "Infraestructura", vars: ["Estado de carreteras", "Obras", "Restricciones", "Peajes"], color: "yellow" },
                  { category: "Logística", vars: ["Capacidad vehículos", "Horarios entrega", "Prioridades", "Combustible"], color: "green" }
                ].map((section, index) => (
                  <div key={index} className={`bg-${section.color}-900/20 border border-${section.color}-400/30 rounded-lg p-4`}>
                    <h4 className={`text-lg font-semibold text-${section.color}-300 mb-3`}>{section.category}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {section.vars.map((variable, vIndex) => (
                        <div key={vIndex} className="flex items-center gap-2">
                          <div className={`w-2 h-2 bg-${section.color}-400 rounded-full`}></div>
                          <span className="text-gray-300 text-xs">{variable}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative z-10 px-6 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/60 backdrop-blur-sm border border-blue-400/30 rounded-3xl p-12">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-full px-6 py-3 mb-6">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-green-300 font-semibold">Revoluciona tu Logística Ahora</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  El Futuro es Hoy
                </span>
              </h2>
              
              <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Únete a las <span className="text-yellow-400 font-bold">15,000+ empresas</span> que ya 
                transformaron su logística con GreenRoute. IA que supera la capacidad humana.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
              <button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-2xl hover:scale-105 flex items-center gap-3 justify-center">
                <Navigation className="w-5 h-5" />
                Demo en Vivo - Gratis
              </button>
              <button className="border-2 border-blue-400 hover:bg-blue-400/10 text-blue-300 hover:text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 flex items-center gap-3 justify-center">
                <Radio className="w-5 h-5" />
                Hablar con Experto IA
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400 mb-1">€2.4M</div>
                <div className="text-blue-200 text-sm">Ahorrado mensual</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-1">99.98%</div>
                <div className="text-blue-200 text-sm">Uptime SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-1">&lt;30ms</div>
                <div className="text-blue-200 text-sm">Latencia API</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-1">15K+</div>
                <div className="text-blue-200 text-sm">Empresas activas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}
