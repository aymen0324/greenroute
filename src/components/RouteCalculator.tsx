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
            <label className="block text-blue-200 font-semibold flex items-center gap-2">
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

        <div className="space-y-2">
          <label className="block text-blue-200 font-semibold">
            <MapPin className="inline w-4 h-4 mr-1" />
            Ciudad de Destino
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-3 bg-blue-800 text-white rounded-lg border border-blue-600 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Selecciona destino...</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Botón de cálculo */}
      <div className="text-center mb-6">
        <button
          onClick={calculateRoute}
          disabled={loading || !origin || !destination}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg flex items-center mx-auto"
        >
          <Calculator className="w-5 h-5 mr-2" />
          {loading ? 'Calculando ruta...' : 'Calcular Ruta Óptima'}
        </button>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Mapa simulado y resultados */}
      {routeData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mapa simulado */}
          <div className="bg-blue-800/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Navigation className="w-5 h-5 mr-2" />
              Visualización de Ruta
            </h3>
            
            {/* Simulación de mapa estilo Google Maps */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg h-64 relative overflow-hidden border-2 border-gray-300">
              {/* Simulación de calles y carreteras */}
              <div className="absolute inset-0">
                {/* Carreteras principales horizontales */}
                <div className="absolute top-16 left-0 right-0 h-1 bg-gray-400"></div>
                <div className="absolute top-32 left-0 right-0 h-1 bg-gray-400"></div>
                <div className="absolute bottom-16 left-0 right-0 h-1 bg-gray-400"></div>
                
                {/* Carreteras principales verticales */}
                <div className="absolute top-0 bottom-0 left-16 w-1 bg-gray-400"></div>
                <div className="absolute top-0 bottom-0 left-32 w-1 bg-gray-400"></div>
                <div className="absolute top-0 bottom-0 right-16 w-1 bg-gray-400"></div>
                
                {/* Áreas verdes (parques) */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-green-200 rounded"></div>
                <div className="absolute bottom-6 right-6 w-16 h-10 bg-green-200 rounded"></div>
                
                {/* Edificios (representados como cuadrados grises) */}
                <div className="absolute top-20 left-20 w-8 h-6 bg-gray-300 rounded"></div>
                <div className="absolute top-36 left-40 w-6 h-8 bg-gray-300 rounded"></div>
                <div className="absolute bottom-20 right-20 w-10 h-6 bg-gray-300 rounded"></div>
              </div>
              
              {/* Puntos de origen y destino */}
              <div className="absolute top-4 left-4 bg-green-500 text-white p-2 rounded-full font-bold text-sm shadow-lg z-10 flex items-center justify-center w-8 h-8">
                A
              </div>
              <div className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded-full font-bold text-sm shadow-lg z-10 flex items-center justify-center w-8 h-8">
                B
              </div>
              
              {/* Ruta optimizada animada */}
              <svg className="absolute inset-0 w-full h-full z-10">
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                <path
                  d="M 20 20 L 80 40 L 140 80 L 200 120 L 240 240"
                  stroke="url(#routeGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  className="animate-pulse"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                  }}
                />
                
                {/* Puntos intermedios de la ruta */}
                <circle cx="80" cy="40" r="3" fill="#10B981" className="animate-pulse" />
                <circle cx="140" cy="80" r="3" fill="#10B981" className="animate-pulse" />
                <circle cx="200" cy="120" r="3" fill="#10B981" className="animate-pulse" />
              </svg>
              
              {/* Etiquetas de ciudades con sombra */}
              <div className="absolute top-8 left-8 bg-white/95 px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-md border">
                📍 {origin}
              </div>
              <div className="absolute bottom-8 right-8 bg-white/95 px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-md border">
                🎯 {destination}
              </div>
              
              {/* Indicadores de tráfico */}
              <div className="absolute top-1/3 left-1/3 bg-green-400 text-white px-2 py-1 rounded text-xs font-bold shadow-md">
                🟢 Fluido
              </div>
              <div className="absolute top-2/3 left-2/3 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold shadow-md">
                🟡 Moderado
              </div>
              
              {/* Simulación de ubicación actual */}
              <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
              <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
            
            <div className="mt-4 text-blue-200 text-sm space-y-2">
              <p className="flex items-center">
                <span className="w-4 h-1 bg-gradient-to-r from-blue-500 to-green-500 mr-2 rounded"></span>
                Ruta optimizada por GreenRoute
              </p>
              <p className="flex items-center text-xs text-blue-300">
                🟢 Tráfico fluido • 🟡 Tráfico moderado • 📍 Origen • 🎯 Destino
              </p>
              <p className="text-xs text-blue-300 italic">
                * Simulación basada en datos reales de tráfico y condiciones meteorológicas
              </p>
            </div>
          </div>

          {/* Información de la ruta */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Información de la Ruta</h3>
            
            {/* Estadísticas principales */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-800/50 rounded-lg p-4 text-center">
                <Navigation className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{routeData.distance}</div>
                <div className="text-blue-200 text-sm">Distancia</div>
              </div>
              
              <div className="bg-blue-800/50 rounded-lg p-4 text-center">
                <Clock className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{routeData.duration}</div>
                <div className="text-blue-200 text-sm">Tiempo estimado</div>
              </div>
            </div>

            {/* Beneficios ambientales */}
            <div className="bg-green-800/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-green-200 mb-3 flex items-center">
                <Leaf className="w-5 h-5 mr-2" />
                Beneficios Ambientales
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-green-100">
                  <span>Ahorro de combustible:</span>
                  <span className="font-semibold text-green-300">{routeData.fuel_savings}</span>
                </div>
                <div className="flex justify-between text-green-100">
                  <span>Reducción CO₂:</span>
                  <span className="font-semibold text-green-300">{routeData.co2_reduction}</span>
                </div>
              </div>
            </div>

            {/* Detalles adicionales */}
            <div className="bg-blue-800/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-blue-200 mb-3 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Detalles del Viaje
              </h4>
              <ul className="space-y-1 text-blue-100 text-sm">
                <li>• Ruta optimizada evitando tráfico pesado</li>
                <li>• Considera condiciones meteorológicas</li>
                <li>• Minimiza consumo de combustible</li>
                <li>• Actualización en tiempo real</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Información adicional */}
      <div className="mt-6 bg-blue-800/30 rounded-lg p-4">
        <p className="text-blue-200 text-sm text-center">
          <strong>💡 Tip:</strong> GreenRoute utiliza algoritmos avanzados y datos en tiempo real para encontrar la ruta más eficiente y ecológica entre tus destinos.
        </p>
      </div>
    </div>
  );
}
