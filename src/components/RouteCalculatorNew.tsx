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
            
            {/* Google Maps Style Map */}
            <div className={`relative rounded-xl overflow-hidden h-96 transition-all duration-500 ${
              mapView === 'satellite' ? 'bg-gray-900' :
              mapView === 'hybrid' ? 'bg-gray-800' :
              'bg-amber-50'
            }`}>
              
              {/* Satellite View - Google Earth Style */}
              {mapView === 'satellite' && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black">
                  {/* Satellite imagery simulation */}
                  <div className="absolute inset-0 opacity-80">
                    <div className="w-full h-full relative">
                      {/* Cities and urban areas */}
                      <div className="absolute top-1/4 left-1/4 w-16 h-12 bg-yellow-400/20 rounded-sm"></div>
                      <div className="absolute top-3/4 right-1/4 w-20 h-14 bg-yellow-400/20 rounded-sm"></div>
                      <div className="absolute top-1/2 left-1/3 w-8 h-6 bg-yellow-400/15 rounded-sm"></div>
                      
                      {/* Roads network */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                        <path d="M 0 150 L 400 180" stroke="#4a5568" strokeWidth="2" opacity="0.6"/>
                        <path d="M 80 0 L 100 300" stroke="#4a5568" strokeWidth="1.5" opacity="0.5"/>
                        <path d="M 200 50 L 350 250" stroke="#4a5568" strokeWidth="1" opacity="0.4"/>
                        <path d="M 50 250 L 300 100" stroke="#4a5568" strokeWidth="1" opacity="0.4"/>
                      </svg>
                      
                      {/* Forests and green areas */}
                      <div className="absolute top-1/6 right-1/3 w-24 h-16 bg-green-600/30 rounded-lg"></div>
                      <div className="absolute bottom-1/4 left-1/6 w-20 h-20 bg-green-600/25 rounded-full"></div>
                      
                      {/* Water bodies */}
                      <div className="absolute top-2/3 right-1/6 w-16 h-8 bg-blue-500/40 rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Hybrid View - Google Maps Hybrid Style */}
              {mapView === 'hybrid' && (
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-gray-100 to-blue-100">
                  {/* Street map base */}
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                      {/* Grid streets */}
                      {Array.from({length: 20}).map((_, i) => (
                        <g key={i}>
                          <line x1={i * 20} y1="0" x2={i * 20} y2="300" stroke="#d1d5db" strokeWidth="0.5"/>
                          <line x1="0" y1={i * 15} x2="400" y2={i * 15} stroke="#d1d5db" strokeWidth="0.5"/>
                        </g>
                      ))}
                      
                      {/* Main roads */}
                      <path d="M 0 150 L 400 180" stroke="#374151" strokeWidth="3"/>
                      <path d="M 80 0 L 100 300" stroke="#374151" strokeWidth="2.5"/>
                      <path d="M 200 50 L 350 250" stroke="#6b7280" strokeWidth="2"/>
                      
                      {/* Highways */}
                      <path d="M 0 120 L 400 140" stroke="#1f2937" strokeWidth="4"/>
                      <path d="M 0 122 L 400 142" stroke="#fbbf24" strokeWidth="1" strokeDasharray="10,5"/>
                    </svg>
                    
                    {/* Buildings */}
                    <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gray-400 shadow-sm"></div>
                    <div className="absolute top-1/4 left-1/3 w-3 h-6 bg-gray-500 shadow-sm"></div>
                    <div className="absolute top-3/4 right-1/4 w-5 h-3 bg-gray-400 shadow-sm"></div>
                    <div className="absolute top-2/3 right-1/4 w-3 h-5 bg-gray-500 shadow-sm"></div>
                    
                    {/* Parks */}
                    <div className="absolute top-1/6 right-1/3 w-12 h-8 bg-green-300 rounded-sm"></div>
                    <div className="absolute bottom-1/4 left-1/6 w-10 h-10 bg-green-300 rounded-full"></div>
                  </div>
                  
                  {/* Street labels */}
                  <div className="absolute top-36 left-20 text-xs text-gray-700 font-semibold bg-white/80 px-1 rounded">Av. Principal</div>
                  <div className="absolute bottom-20 right-20 text-xs text-gray-700 font-semibold bg-white/80 px-1 rounded">C/ Mayor</div>
                </div>
              )}
              
              {/* Terrain View - Google Terrain Style */}
              {mapView === 'terrain' && (
                <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-yellow-100 to-orange-200">
                  {/* Topographic style */}
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                      {/* Contour lines */}
                      <path d="M 50 100 Q 150 80 250 100 Q 350 120 400 100" stroke="#8b4513" strokeWidth="1" fill="none" opacity="0.4"/>
                      <path d="M 30 130 Q 130 110 230 130 Q 330 150 380 130" stroke="#8b4513" strokeWidth="1" fill="none" opacity="0.4"/>
                      <path d="M 70 160 Q 170 140 270 160 Q 370 180 420 160" stroke="#8b4513" strokeWidth="1" fill="none" opacity="0.4"/>
                      
                      {/* Mountains */}
                      <polygon points="180,180 220,120 260,180" fill="#8b7355" opacity="0.6"/>
                      <polygon points="300,200 340,140 380,200" fill="#8b7355" opacity="0.5"/>
                      <polygon points="50,220 80,180 110,220" fill="#a0915a" opacity="0.4"/>
                      
                      {/* Rivers */}
                      <path d="M 0 200 Q 100 190 200 210 Q 300 230 400 220" stroke="#3b82f6" strokeWidth="3" fill="none" opacity="0.7"/>
                      <path d="M 150 0 Q 160 100 170 200 Q 180 250 190 300" stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.6"/>
                    </svg>
                    
                    {/* Elevation shading */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-yellow-500/10 to-orange-500/20"></div>
                    
                    {/* Forests */}
                    <div className="absolute top-1/6 right-1/3 w-20 h-12 bg-green-500/50 rounded-lg"></div>
                    <div className="absolute bottom-1/4 left-1/6 w-16 h-16 bg-green-600/40 rounded-full"></div>
                    <div className="absolute top-1/2 left-2/3 w-12 h-8 bg-green-500/45 rounded-lg"></div>
                  </div>
                  
                  {/* Terrain labels */}
                  <div className="absolute top-32 left-48 text-xs text-amber-800 font-semibold">Sierra Norte</div>
                  <div className="absolute bottom-16 right-24 text-xs text-blue-700 font-semibold">Río Verde</div>
                </div>
              )}
              
              {/* Route Visualization - Enhanced for Google Maps Style */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" style={{ zIndex: 10 }}>
                {/* Route shadow */}
                <path 
                  d="M 80 152 Q 150 122 200 142 Q 250 162 320 182" 
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth="6" 
                  fill="none"
                />
                
                {/* Main optimized route */}
                <path 
                  d="M 80 150 Q 150 120 200 140 Q 250 160 320 180" 
                  stroke="#1976d2"
                  strokeWidth="4" 
                  fill="none"
                  strokeLinecap="round"
                />
                
                {/* Route direction arrows */}
                <polygon points="140,125 150,120 145,130" fill="#1976d2"/>
                <polygon points="240,155 250,150 245,165" fill="#1976d2"/>
                <polygon points="290,170 300,165 295,180" fill="#1976d2"/>
                
                {/* Alternative route */}
                <path 
                  d="M 80 150 Q 200 100 250 120 Q 280 160 320 180" 
                  stroke="#9ca3af" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeDasharray="8,4"
                  opacity="0.7"
                />
                
                {/* Google Maps style markers */}
                <g transform="translate(80,150)">
                  <circle cx="0" cy="-8" r="12" fill="#34a853"/>
                  <circle cx="0" cy="-8" r="6" fill="white"/>
                  <text x="0" y="-5" textAnchor="middle" fontSize="8" fill="#34a853" fontWeight="bold">A</text>
                </g>
                
                <g transform="translate(320,180)">
                  <circle cx="0" cy="-8" r="12" fill="#ea4335"/>
                  <circle cx="0" cy="-8" r="6" fill="white"/>
                  <text x="0" y="-5" textAnchor="middle" fontSize="8" fill="#ea4335" fontWeight="bold">B</text>
                </g>
                
                {/* Waypoint */}
                <circle cx={200} cy={140} r="6" fill="#fbbc04" stroke="white" strokeWidth="2"/>
              </svg>
              
              {/* Google Maps style location labels */}
              <div className="absolute top-32 left-16 bg-white rounded-lg px-3 py-2 shadow-lg border">
                <div className="text-green-600 text-sm font-bold">{origin || 'Origen'}</div>
                <div className="text-xs text-gray-500">Punto de partida</div>
              </div>
              <div className="absolute bottom-16 right-12 bg-white rounded-lg px-3 py-2 shadow-lg border">
                <div className="text-red-600 text-sm font-bold">{destination || 'Destino'}</div>
                <div className="text-xs text-gray-500">Punto de llegada</div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg px-3 py-2 shadow-lg border">
                <div className="text-yellow-600 text-xs font-bold">Parada Optimizada</div>
                <div className="text-xs text-gray-500">IA Route</div>
              </div>
              
              {/* Google Maps style zoom controls */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg overflow-hidden">
                <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 border-b">
                  <span className="text-gray-600 text-xl">+</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100">
                  <span className="text-gray-600 text-xl">−</span>
                </button>
              </div>
              
              {/* Google Maps style fullscreen button */}
              <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg">
                <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zM16 4a1 1 0 00-1-1h-4a1 1 0 000 2h1.586l-2.293 2.293a1 1 0 001.414 1.414L13 6.414V8a1 1 0 002 0V4z"/>
                  </svg>
                </button>
              </div>
              
              {/* Map type indicator */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
                <div className={`text-xs font-bold ${
                  mapView === 'satellite' ? 'text-blue-600' :
                  mapView === 'hybrid' ? 'text-green-600' :
                  'text-amber-600'
                }`}>
                  {mapView === 'satellite' ? 'Satélite' :
                   mapView === 'hybrid' ? 'Híbrido' :
                   'Terreno'}
                </div>
              </div>
            </div>
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
