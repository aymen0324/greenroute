// src/components/RouteCalculator.tsx
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Navigation, Clock, Car, Leaf, Calculator, 
  Zap, Brain, Satellite, Route, TrendingUp, Target,
  Radar, Cpu, Globe, Activity, Radio, Timer
} from 'lucide-react';

interface RouteData {
  distance: string;
  duration: string;
  fuel_savings: string;
  co2_reduction: string;
  route_points: { lat: number; lng: number; name: string }[];
  aiOptimization: number;
  trafficScore: number;
  weatherImpact: number;
  predictiveScore: number;
  algorithmUsed: string;
  realTimeUpdates: number;
}

export default function RouteCalculator() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [processingStep, setProcessingStep] = useState('');
  const [mapView, setMapView] = useState<'satellite' | 'hybrid' | 'terrain'>('satellite');

  // Lista expandida de ciudades españolas y europeas
  const cities = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga',
    'Murcia', 'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Córdoba',
    'Valladolid', 'Vigo', 'Gijón', 'Hospitalet', 'Granada', 'Elche',
    'Oviedo', 'Badalona', 'Cartagena', 'Terrassa', 'Jerez', 'Sabadell',
    'París', 'Londres', 'Berlín', 'Roma', 'Ámsterdam', 'Bruselas',
    'Lisboa', 'Viena', 'Praga', 'Varsovia', 'Estocolmo', 'Copenhague'
  ];

  const processingSteps = [
    'Inicializando algoritmos cuánticos...',
    'Consultando 125,000+ sensores IoT...',
    'Procesando datos satelitales en tiempo real...',
    'Aplicando machine learning predictivo...',
    'Optimizando con algoritmos genéticos...',
    'Calculando impacto ambiental...',
    'Finalizando ruta óptima...'
  ];

  const calculateRoute = async () => {
    if (!origin || !destination) {
      setError('Por favor selecciona origen y destino');
      return;
    }

    if (origin === destination) {
      setError('El origen y destino no pueden ser iguales');
      return;
    }

    setLoading(true);
    setError('');
    setRouteData(null);

    try {
      // Simular procesamiento avanzado con pasos
      for (let i = 0; i < processingSteps.length; i++) {
        setProcessingStep(processingSteps[i]);
        await new Promise(resolve => setTimeout(resolve, 400));
      }
      
      // Datos simulados más avanzados
      const distance = Math.floor(Math.random() * 1200 + 200);
      const duration = Math.floor(distance / 85 * 60); // minutos aproximados
      const algorithms = ['Quantum Annealing', 'Genetic Algorithm', 'Swarm Intelligence', 'Neural Network', 'Hybrid AI'];
      
      const mockRouteData: RouteData = {
        distance: `${distance} km`,
        duration: `${Math.floor(duration / 60)}h ${duration % 60}min`,
        fuel_savings: `${Math.floor(Math.random() * 20 + 10)}%`,
        co2_reduction: `${Math.floor(Math.random() * 25 + 15)}%`,
        route_points: [
          { lat: 40.4168, lng: -3.7038, name: origin },
          { lat: 40.0, lng: -2.0, name: 'Punto intermedio optimizado por IA' },
          { lat: 39.4699, lng: -0.3763, name: destination }
        ],
        aiOptimization: Math.floor(Math.random() * 40 + 25),
        trafficScore: Math.floor(Math.random() * 30 + 70),
        weatherImpact: Math.floor(Math.random() * 15 + 5),
        predictiveScore: Math.floor(Math.random() * 10 + 90),
        algorithmUsed: algorithms[Math.floor(Math.random() * algorithms.length)],
        realTimeUpdates: Math.floor(Math.random() * 50 + 150)
      };
      
      setRouteData(mockRouteData);
    } catch (err) {
      setError('Error al calcular la ruta. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
      setProcessingStep('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/60 backdrop-blur-sm border border-blue-400/30 rounded-3xl p-8 mb-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">Simulador IA Avanzado</h2>
              <p className="text-blue-300">Motor de Optimización Cuántica en Tiempo Real</p>
            </div>
          </div>
          <p className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
            Experimenta el poder de la <span className="text-yellow-400 font-bold">Inteligencia Artificial</span> aplicada 
            a la optimización logística. Procesamiento de <span className="text-green-400 font-bold">50+ variables</span> en tiempo real.
          </p>
        </div>

        {/* Map View Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-700/50 rounded-xl p-2 flex gap-2">
            {(['satellite', 'hybrid', 'terrain'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setMapView(view)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  mapView === view 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-600/50'
                }`}
              >
                {view === 'satellite' && <Satellite className="w-4 h-4" />}
                {view === 'hybrid' && <Globe className="w-4 h-4" />}
                {view === 'terrain' && <MapPin className="w-4 h-4" />}
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-blue-200 font-semibold">
              <MapPin className="w-5 h-5 text-green-400" />
              Ciudad de Origen
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full p-4 bg-slate-700/70 text-white rounded-xl border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
            >
              <option value="">Selecciona origen...</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-blue-200 font-semibold">
              <Target className="w-5 h-5 text-red-400" />
              Ciudad de Destino
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-4 bg-slate-700/70 text-white rounded-xl border border-slate-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
            >
              <option value="">Selecciona destino...</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-blue-200 font-semibold">
              <Brain className="w-5 h-5 text-purple-400" />
              Calcular Ruta
            </label>
            <button
              onClick={calculateRoute}
              disabled={loading || !origin || !destination}
              className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Procesando IA...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  Optimizar Ruta
                </>
              )}
            </button>
          </div>
        </div>

        {/* Processing Steps */}
        {loading && processingStep && (
          <div className="bg-slate-700/50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="text-blue-300 font-semibold">Procesamiento en Tiempo Real</span>
            </div>
            <div className="text-white text-lg">{processingStep}</div>
            <div className="mt-3 bg-slate-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{width: `${(processingSteps.indexOf(processingStep) + 1) / processingSteps.length * 100}%`}}></div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500/50 rounded-xl p-4 mb-8">
            <p className="text-red-200">{error}</p>
          </div>
        )}
      </div>

      {/* Results Section */}
      {routeData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Visualization */}
          <div className="bg-gradient-to-br from-slate-800/80 to-gray-900/60 backdrop-blur-sm border border-gray-400/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-400" />
              Visualización Satelital {mapView.toUpperCase()}
            </h3>
            
            {/* Advanced Map Placeholder */}
            <div className={`relative rounded-xl p-6 h-96 overflow-hidden transition-all duration-500 ${
              mapView === 'satellite' ? 'bg-gradient-to-br from-gray-900 to-blue-900' :
              mapView === 'hybrid' ? 'bg-gradient-to-br from-green-900 to-gray-900' :
              'bg-gradient-to-br from-amber-900 to-yellow-900'
            }`}>
              {/* Dynamic Background Effect */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                  {Array.from({length: 48}).map((_, i) => (
                    <div key={i} className={`border transition-all duration-300 ${
                      mapView === 'satellite' ? 'border-blue-500/20' :
                      mapView === 'hybrid' ? 'border-green-500/20' :
                      'border-yellow-500/20'
                    } ${
                      Math.random() > 0.7 ? 
                        (mapView === 'satellite' ? 'bg-green-500/10' :
                         mapView === 'hybrid' ? 'bg-blue-500/10' :
                         'bg-red-500/10') : 
                        Math.random() > 0.8 ? 
                          (mapView === 'satellite' ? 'bg-yellow-500/10' :
                           mapView === 'hybrid' ? 'bg-purple-500/10' :
                           'bg-green-500/10') : ''
                    }`}></div>
                  ))}
                </div>
              </div>
              
              {/* Terrain Effects */}
              {mapView === 'terrain' && (
                <div className="absolute inset-0 opacity-30">
                  <div className="w-full h-full bg-gradient-radial from-transparent via-yellow-500/10 to-orange-500/20"></div>
                  {/* Mountain Effects */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                    <polygon points="50,250 80,200 110,250" fill="#8b4513" opacity="0.3"/>
                    <polygon points="300,250 330,180 360,250" fill="#8b4513" opacity="0.3"/>
                    <polygon points="180,250 220,160 260,250" fill="#8b4513" opacity="0.3"/>
                  </svg>
                </div>
              )}
              
              {/* Hybrid View Effects */}
              {mapView === 'hybrid' && (
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
                    {Array.from({length: 16}).map((_, i) => (
                      <div key={i} className="border border-green-400/10 flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${
                          Math.random() > 0.5 ? 'bg-green-400/30' : 'bg-blue-400/30'
                        } animate-pulse`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Route Visualization */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                {/* Background Cities */}
                <circle cx={80} cy={150} r="8" fill="#10b981" className="animate-pulse" />
                <circle cx={320} cy={180} r="8" fill="#ef4444" className="animate-pulse" />
                
                {/* Optimized Route Path */}
                <path 
                  d="M 80 150 Q 150 120 200 140 Q 250 160 320 180" 
                  stroke={`url(#routeGradient-${mapView})`}
                  strokeWidth="4" 
                  fill="none"
                  className="animate-pulse"
                />
                
                {/* Alternative Route (less optimal) */}
                <path 
                  d="M 80 150 Q 200 100 250 120 Q 280 160 320 180" 
                  stroke="#6b7280" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
                
                {/* Route Markers */}
                <circle cx={200} cy={140} r="4" fill="#8b5cf6" className="animate-bounce" />
                
                <defs>
                  <linearGradient id="routeGradient-satellite" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="routeGradient-hybrid" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="routeGradient-terrain" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Labels */}
              <div className="absolute top-4 left-4 bg-black/70 rounded-lg px-3 py-2">
                <div className="text-green-400 text-sm font-bold">{origin}</div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 rounded-lg px-3 py-2">
                <div className="text-red-400 text-sm font-bold">{destination}</div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 rounded-lg px-3 py-2">
                <div className="text-purple-400 text-xs">IA Optimizado</div>
              </div>
              
              {/* Map Type Indicator */}
              <div className="absolute top-4 right-4 bg-black/70 rounded-lg px-3 py-2">
                <div className={`text-xs font-bold ${
                  mapView === 'satellite' ? 'text-blue-400' :
                  mapView === 'hybrid' ? 'text-green-400' :
                  'text-yellow-400'
                }`}>
                  {mapView.toUpperCase()} VIEW
                </div>
              </div>
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="bg-slate-700/80 hover:bg-slate-600 p-2 rounded-lg transition-colors">
                  <Zap className="w-4 h-4 text-yellow-400" />
                </button>
                <button className="bg-slate-700/80 hover:bg-slate-600 p-2 rounded-lg transition-colors">
                  <Radar className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Metrics */}
          <div className="space-y-6">
            {/* Basic Route Info */}
            <div className="bg-gradient-to-br from-slate-800/80 to-green-900/40 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Route className="w-6 h-6 text-green-400" />
                Métricas de Ruta Optimizada
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Navigation className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-300 font-semibold">Distancia</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{routeData.distance}</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-300 font-semibold">Tiempo</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{routeData.duration}</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Car className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-300 font-semibold">Combustible</span>
                  </div>
                  <div className="text-2xl font-bold text-white">-{routeData.fuel_savings}</div>
                </div>
                
                <div className="bg-slate-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Leaf className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 font-semibold">CO₂ Reducido</span>
                  </div>
                  <div className="text-2xl font-bold text-white">-{routeData.co2_reduction}</div>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/40 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-400" />
                Análisis de Inteligencia Artificial
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-purple-300 font-semibold">Optimización IA</span>
                    <span className="text-white font-bold">+{routeData.aiOptimization}%</span>
                  </div>
                  <div className="bg-slate-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{width: `${routeData.aiOptimization + 30}%`}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-300 font-semibold">Score de Tráfico</span>
                    <span className="text-white font-bold">{routeData.trafficScore}/100</span>
                  </div>
                  <div className="bg-slate-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full" style={{width: `${routeData.trafficScore}%`}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-300 font-semibold">Precisión Predictiva</span>
                    <span className="text-white font-bold">{routeData.predictiveScore}%</span>
                  </div>
                  <div className="bg-slate-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{width: `${routeData.predictiveScore}%`}}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-slate-700/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-300 font-semibold">Algoritmo Utilizado</span>
                </div>
                <div className="text-white font-bold">{routeData.algorithmUsed}</div>
                <div className="text-gray-400 text-sm mt-1">{routeData.realTimeUpdates} actualizaciones en tiempo real</div>
              </div>
            </div>

            {/* Real-time Status */}
            <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/40 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-400" />
                Estado en Tiempo Real
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300">Sensores IoT: Activos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-300">GPS: Alta precisión</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-purple-300">IA: Optimizando</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-yellow-300">Datos: Sincronizados</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
