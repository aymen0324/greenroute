// src/components/RouteCalculator.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Navigation, Clock, Car, Leaf, Calculator, 
  Zap, Brain, Satellite, Route, TrendingUp, Target,
  Radar, Cpu, Globe, Activity, Radio, Timer, ChevronDown,
  ChevronUp, BarChart3, Gauge, Fuel, Sparkles, Atom,
  CpuIcon, Network, Wifi, Signal, Database, Server,
  CircuitBoard, Microchip, CpuIcon as CpuIcon2
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

const RouteCalculator: React.FC = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [mapView, setMapView] = useState<string>('satelite');
  const [algorithmType, setAlgorithmType] = useState<string>('quantum');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulación de ciudades
  const cities = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 
    'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao',
    'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón'
  ];

  const mapViews = ['satelite', 'tráfico', 'terreno', 'híbrido'];

  useEffect(() => {
    // Simular actualizaciones en tiempo real cada 10 segundos
    const interval = setInterval(() => {
      if (routeData) {
        setRouteData(prev => prev ? {
          ...prev,
          realTimeUpdates: prev.realTimeUpdates + 1,
          trafficScore: Math.max(1, Math.min(10, prev.trafficScore + (Math.random() - 0.5) * 2))
        } : null);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [routeData]);

  const handleCalculateRoute = () => {
    if (!origin || !destination) {
      setError('Por favor, selecciona origen y destino');
      return;
    }

    setLoading(true);
    setError('');

    // Simulación de cálculo avanzado
    setTimeout(() => {
      const distance = Math.floor(Math.random() * 500 + 50);
      const duration = Math.floor(Math.random() * 8 + 1) * 60 + Math.floor(Math.random() * 60);
      
      setRouteData({
        distance: `${distance} km`,
        duration: `${Math.floor(duration / 60)}h ${duration % 60}min`,
        fuel_savings: `${Math.floor(Math.random() * 20 + 10)}%`,
        co2_reduction: `${Math.floor(Math.random() * 25 + 15)}%`,
        route_points: [
          { lat: 40.4168, lng: -3.7038, name: origin },
          { lat: 41.3851, lng: 2.1734, name: destination }
        ],
        aiOptimization: Math.floor(Math.random() * 30 + 70),
        trafficScore: Math.floor(Math.random() * 8 + 2),
        weatherImpact: Math.floor(Math.random() * 15 + 5),
        predictiveScore: Math.floor(Math.random() * 25 + 75),
        algorithmUsed: algorithmType === 'quantum' ? 'Optimización Cuántica Avanzada' : 'Machine Learning Predictivo',
        realTimeUpdates: 0
      });
      
      setLoading(false);
    }, 3000);
  };

  const FuturisticCard: React.FC<{
    title: string;
    value: string;
    icon: React.ComponentType<any>;
    color: string;
    subtitle?: string;
    glow?: boolean;
  }> = ({ title, value, icon: Icon, color, subtitle, glow = false }) => (
    <motion.div
      className={`relative p-6 rounded-2xl border border-${color}-500/30 bg-gradient-to-br from-${color}-900/20 via-${color}-800/10 to-${color}-900/20 backdrop-blur-sm ${
        glow ? `shadow-lg shadow-${color}-500/25` : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        boxShadow: glow ? `0 0 30px rgba(59, 130, 246, 0.3)` : undefined
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl animate-pulse"></div>
      
      {/* Glow effect */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl animate-pulse"></div>
      )}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 border border-${color}-500/30`}>
            <Icon size={24} className={`text-${color}-400`} />
          </div>
          {glow && (
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">
          {value}
        </h3>
        
        <p className="text-cyan-100 text-sm mb-1">
          {title}
        </p>
        
        {subtitle && (
          <p className="text-cyan-300/70 text-xs">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-cyan-300 rounded-full animate-ping"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6 p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <Calculator size={40} className="text-cyan-400" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Route Optimizer
            </span>
          </h1>
          
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
            Calculadora de rutas con IA cuántica y optimización predictiva avanzada
          </p>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden mb-6">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-medium w-full border border-cyan-500/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isMobileMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              Configuración Avanzada
            </motion.button>
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center justify-between gap-6">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-cyan-100 text-sm font-medium mb-2">Origen</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                >
                  <option value="">Seleccionar origen</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-cyan-100 text-sm font-medium mb-2">Destino</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                >
                  <option value="">Seleccionar destino</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <div>
                <label className="block text-cyan-100 text-sm font-medium mb-2">Algoritmo</label>
                <select
                  value={algorithmType}
                  onChange={(e) => setAlgorithmType(e.target.value)}
                  className="px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="quantum">IA Cuántica</option>
                  <option value="ml">Machine Learning</option>
                </select>
              </div>
              
              <div>
                <label className="block text-cyan-100 text-sm font-medium mb-2">Vista</label>
                <select
                  value={mapView}
                  onChange={(e) => setMapView(e.target.value)}
                  className="px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  {mapViews.map(view => (
                    <option key={view} value={view}>{view}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-cyan-100 text-sm font-medium mb-2">Origen</label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white"
                  >
                    <option value="">Seleccionar origen</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-cyan-100 text-sm font-medium mb-2">Destino</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white"
                  >
                    <option value="">Seleccionar destino</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cyan-100 text-sm font-medium mb-2">Algoritmo</label>
                    <select
                      value={algorithmType}
                      onChange={(e) => setAlgorithmType(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white"
                    >
                      <option value="quantum">IA Cuántica</option>
                      <option value="ml">Machine Learning</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-cyan-100 text-sm font-medium mb-2">Vista</label>
                    <select
                      value={mapView}
                      onChange={(e) => setMapView(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white"
                    >
                      {mapViews.map(view => (
                        <option key={view} value={view}>{view}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Calculate Button */}
          <motion.button
            onClick={handleCalculateRoute}
            disabled={loading}
            className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg relative overflow-hidden group disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Floating particles */}
            <div className="absolute -top-1 -right-1 text-cyan-300 opacity-0 group-hover:opacity-100 animate-bounce">
              <Atom size={20} />
            </div>
            <div className="absolute -bottom-1 -left-1 text-purple-300 opacity-0 group-hover:opacity-100 animate-bounce">
              <CpuIcon size={20} />
            </div>
            
            <span className="relative z-10 flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Procesando...
                </>
              ) : (
                <>
                  <Calculator size={24} />
                  Calcular Ruta Óptima
                </>
              )}
            </span>
          </motion.button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Results Section */}
        {routeData && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Main Results */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FuturisticCard
                title="Distancia"
                value={routeData.distance}
                icon={Navigation}
                color="cyan"
                subtitle="Ruta optimizada"
                glow={true}
              />
              <FuturisticCard
                title="Duración"
                value={routeData.duration}
                icon={Clock}
                color="blue"
                subtitle="Tiempo estimado"
              />
              <FuturisticCard
                title="Ahorro Combustible"
                value={routeData.fuel_savings}
                icon={Fuel}
                color="green"
                subtitle="vs ruta tradicional"
              />
              <FuturisticCard
                title="Reducción CO₂"
                value={routeData.co2_reduction}
                icon={Leaf}
                color="emerald"
                subtitle="Impacto ambiental"
              />
            </div>

            {/* AI Analysis */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30">
                  <Brain size={24} className="text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Análisis de IA</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FuturisticCard
                  title="Optimización IA"
                  value={`${routeData.aiOptimization}%`}
                  icon={CpuIcon2}
                  color="purple"
                  subtitle="Algoritmo: {routeData.algorithmUsed}"
                />
                <FuturisticCard
                  title="Score Tráfico"
                  value={`${routeData.trafficScore}/10`}
                  icon={Activity}
                  color="orange"
                  subtitle="Condiciones actuales"
                />
                <FuturisticCard
                  title="Impacto Clima"
                  value={`${routeData.weatherImpact}%`}
                  icon={Globe}
                  color="cyan"
                  subtitle="Factor meteorológico"
                />
                <FuturisticCard
                  title="Score Predictivo"
                  value={`${routeData.predictiveScore}%`}
                  icon={TrendingUp}
                  color="green"
                  subtitle="Precisión del modelo"
                />
              </div>
            </div>

            {/* Map Simulation */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
                  <Satellite size={24} className="text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Visualización de Ruta</h2>
              </div>
              
              <div className="h-64 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-cyan-500/30 flex items-center justify-center relative overflow-hidden">
                {/* Animated grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
                
                {/* Route line */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                </div>
                
                {/* Route points */}
                <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
                <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
                </div>
                
                <div className="text-center text-cyan-100">
                  <Satellite size={48} className="mx-auto mb-4 text-cyan-400" />
                  <p>Visualización de ruta optimizada</p>
                  <p className="text-sm text-cyan-300/70">Vista: {mapView}</p>
                </div>
              </div>
            </div>

            {/* Real-time Updates */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30">
                  <Radio size={24} className="text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Actualizaciones en Tiempo Real</h2>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FuturisticCard
                  title="Actualizaciones"
                  value={`${routeData.realTimeUpdates}`}
                  icon={Timer}
                  color="green"
                  subtitle="Datos procesados"
                />
                <FuturisticCard
                  title="Estado Conexión"
                  value="Activo"
                  icon={Wifi}
                  color="cyan"
                  subtitle="Conexión estable"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RouteCalculator;
