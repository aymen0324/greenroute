import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Map, Route, Timer, BarChart3, Compass, CheckCircle2, 
  Zap, Brain, Satellite, Truck, MapPin, Clock, TrendingUp, 
  Wifi, Shield, Award, Activity, Globe, Layers, Navigation,
  Eye, Target, Cpu, Database, Radio, Radar, Play, Pause,
  Settings, Maximize2, RefreshCw, Search, Filter,
  Users, Calendar, Bell, Star, X, Menu, ArrowRight
} from "lucide-react";

// 1. Añadir contador animado de CO₂ y badge de eficiencia verde
const AnimatedCO2 = ({ value }) => {
  const [co2, setCo2] = useState(value);
  useEffect(() => {
    const interval = setInterval(() => {
      setCo2((c) => c + Math.floor(Math.random() * 2));
    }, 120);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center gap-2">
      <span className="text-emerald-400 font-bold text-lg">{co2.toLocaleString()} kg</span>
      <span className="text-xs text-gray-400">CO₂ evitado</span>
    </div>
  );
};

// 2. Mini-gráfico de eficiencia
const MiniEfficiencyBar = ({ efficiency }) => (
  <div className="w-full h-2 bg-gray-700 rounded-full mt-2">
    <div
      className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
      style={{ width: `${efficiency}%` }}
    />
  </div>
);

// 3. Tooltip simple
const Tooltip = ({ children, text }) => (
  <div className="relative group cursor-pointer">
    {children}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black/80 text-xs text-white px-2 py-1 rounded shadow-lg z-50 whitespace-nowrap">
      {text}
    </div>
  </div>
);

const CreativeRutasPage = () => {
  const navigate = useNavigate();
  const [activeRoutes, setActiveRoutes] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [viewMode, setViewMode] = useState('3d'); // 3d, satellite, traffic
  
  // Simulate real-time route data
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoutes(prev => Math.floor(Math.random() * 50) + 1200);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Mock route data with realistic information
  const routeData = [
    {
      id: 1,
      name: "Madrid → Barcelona Express",
      distance: "628 km",
      estimatedTime: "5h 42m",
      optimizedTime: "4h 58m",
      savings: "44 min",
      carbonSaved: "24.3 kg CO₂",
      traffic: "moderate",
      weather: "clear",
      vehicles: 23,
      priority: "high",
      efficiency: 94,
      gradient: "from-emerald-400 to-cyan-400"
    },
    {
      id: 2,
      name: "Valencia → Sevilla Eco",
      distance: "472 km",
      estimatedTime: "4h 28m",
      optimizedTime: "3h 52m",
      savings: "36 min",
      carbonSaved: "18.7 kg CO₂",
      traffic: "light",
      weather: "sunny",
      vehicles: 15,
      priority: "medium",
      efficiency: 97,
      gradient: "from-purple-400 to-pink-400"
    },
    {
      id: 3,
      name: "Bilbao → Zaragoza Smart",
      distance: "324 km",
      estimatedTime: "3h 15m",
      optimizedTime: "2h 47m",
      savings: "28 min",
      carbonSaved: "15.2 kg CO₂",
      traffic: "heavy",
      weather: "rain",
      vehicles: 31,
      priority: "urgent",
      efficiency: 91,
      gradient: "from-orange-400 to-red-400"
    },
    {
      id: 4,
      name: "Málaga → Granada Green",
      distance: "125 km",
      estimatedTime: "1h 32m",
      optimizedTime: "1h 18m",
      savings: "14 min",
      carbonSaved: "8.9 kg CO₂",
      traffic: "light",
      weather: "clear",
      vehicles: 8,
      priority: "low",
      efficiency: 98,
      gradient: "from-green-400 to-emerald-400"
    }
  ];

  const stats = [
    { label: "Rutas Activas", value: activeRoutes.toLocaleString(), change: "+12%", color: "text-emerald-400" },
    { label: "Tiempo Ahorrado", value: "2.8h", change: "+34%", color: "text-cyan-400" },
    { label: "CO₂ Reducido", value: "67.1 kg", change: "+28%", color: "text-green-400" },
    { label: "Eficiencia", value: "95.2%", change: "+5%", color: "text-purple-400" }
  ];

  const routeVisualization = () => (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden">
      {/* Animated Map Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20" viewBox="0 0 800 400">
          {/* Spain outline approximation */}
          <motion.path
            d="M100,200 Q200,150 300,160 L400,170 Q500,160 600,180 L700,190 Q750,200 780,220 L760,280 Q700,320 600,310 L500,300 Q400,290 300,300 L200,290 Q150,250 100,200"
            stroke="url(#mapGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Active routes */}
          {routeData.map((route, index) => (
            <motion.line
              key={route.id}
              x1={150 + index * 100}
              y1={180 + index * 20}
              x2={650 - index * 80}
              y2={220 + index * 15}
              stroke={`url(#route${route.id})`}
              strokeWidth="3"
              strokeDasharray="5 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear",
                delay: index * 0.5 
              }}
            />
          ))}

          {/* Cities */}
          {["Madrid", "Barcelona", "Valencia", "Sevilla"].map((city, index) => (
            <motion.circle
              key={city}
              cx={200 + index * 150}
              cy={190 + Math.sin(index) * 30}
              r="8"
              fill="url(#cityGradient)"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: index * 0.3 
              }}
            />
          ))}

          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <radialGradient id="cityGradient">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
            {routeData.map(route => (
              <linearGradient key={route.id} id={`route${route.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
              </linearGradient>
            ))}
          </defs>
        </svg>

        {/* Moving vehicles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
            style={{ filter: 'blur(1px)' }}
            animate={{
              x: [100, 700],
              y: [180 + i * 25, 220 + i * 25],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5
            }}
          />
        ))}
      </div>

      {/* View Mode Controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        {['3d', 'satellite', 'traffic'].map((mode) => (
          <motion.button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              viewMode === mode 
                ? 'bg-emerald-500 text-black' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Live Data Overlay */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
        <div className="text-emerald-400 text-sm font-medium mb-1">Estado en Tiempo Real</div>
        <div className="text-white text-xs">
          <div>🚛 {activeRoutes} rutas activas</div>
          <div>⚡ 95.2% eficiencia promedio</div>
          <div>🌱 67.1 kg CO₂ ahorrado hoy</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Route network background */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1920 1080">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 1920}
              cy={Math.random() * 1080}
              r="2"
              fill="#10b981"
              animate={{ 
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
          
          {/* Connecting lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * 1920}
              y1={Math.random() * 1080}
              x2={Math.random() * 1920}
              y2={Math.random() * 1080}
              stroke="#06b6d4"
              strokeWidth="1"
              opacity="0.1"
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ 
                duration: 4 + Math.random() * 2, 
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}
        </svg>

        {/* Floating optimization particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -80, -20],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 p-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => navigate('/')}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </motion.button>
            
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Optimización de Rutas IA
              </h1>
              <p className="text-gray-400">Sistema inteligente de logística avanzada</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setIsOptimizing(!isOptimizing)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isOptimizing 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-black'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOptimizing ? (
                <>
                  <Pause className="w-4 h-4 inline mr-2" />
                  Pausar IA
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 inline mr-2" />
                  Optimizar IA
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Stats Dashboard Mejorado */}
      <motion.section 
        className="relative z-10 px-6 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                  <div className="text-emerald-400 text-xs font-medium">{stat.change}</div>
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.label === 'CO₂ Reducido' ? <AnimatedCO2 value={67100} /> : stat.value}
                </div>
                {stat.label === 'Eficiencia' && stat.value.replace('%','') > 95 && (
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-green-400 to-emerald-400 text-black text-xs font-bold px-2 py-1 rounded-full mt-1">
                    <CheckCircle2 className="w-4 h-4" /> Eficiencia Verde
                  </div>
                )}
                <MiniEfficiencyBar efficiency={parseFloat(stat.value)} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="relative z-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Route Visualization Mejorada */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Mapa Inteligente</h2>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-3 h-3 bg-emerald-400 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-emerald-400 text-sm font-medium">En Tiempo Real</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-xs text-gray-400">Selecciona una ruta para ver la optimización algorítmica visual</span>
              </div>
              <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden">
                {/* Animated Map Background */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full opacity-20" viewBox="0 0 800 400">
                    {/* Spain outline approximation */}
                    <motion.path
                      d="M100,200 Q200,150 300,160 L400,170 Q500,160 600,180 L700,190 Q750,200 780,220 L760,280 Q700,320 600,310 L500,300 Q400,290 300,300 L200,290 Q150,250 100,200"
                      stroke="url(#mapGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="10 5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Antes/después de optimización */}
                    {selectedRoute && (
                      <>
                        {/* Ruta original (roja) */}
                        <motion.line
                          x1={150 + selectedRoute.id * 100 - 100}
                          y1={180 + selectedRoute.id * 20 - 20}
                          x2={650 - selectedRoute.id * 80 + 80}
                          y2={220 + selectedRoute.id * 15 - 15}
                          stroke="#ef4444"
                          strokeWidth="5"
                          strokeDasharray="8 6"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                        />
                        {/* Ruta optimizada (verde) */}
                        <motion.line
                          x1={150 + selectedRoute.id * 100}
                          y1={180 + selectedRoute.id * 20}
                          x2={650 - selectedRoute.id * 80}
                          y2={220 + selectedRoute.id * 15}
                          stroke="#10b981"
                          strokeWidth="5"
                          strokeDasharray="8 6"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                        />
                      </>
                    )}
                    {/* Active routes */}
                    {routeData.map((route, index) => (
                      <Tooltip key={route.id} text={route.name}>
                        <motion.line
                          x1={150 + index * 100}
                          y1={180 + index * 20}
                          x2={650 - index * 80}
                          y2={220 + index * 15}
                          stroke={`url(#route${route.id})`}
                          strokeWidth="3"
                          strokeDasharray="5 5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: index * 0.5 
                          }}
                        />
                      </Tooltip>
                    ))}
                    {/* Cities */}
                    {["Madrid", "Barcelona", "Valencia", "Sevilla"].map((city, index) => (
                      <Tooltip key={city} text={city}>
                        <motion.circle
                          cx={200 + index * 150}
                          cy={190 + Math.sin(index) * 30}
                          r="8"
                          fill="url(#cityGradient)"
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: index * 0.3 
                          }}
                        />
                      </Tooltip>
                    ))}
                    <defs>
                      <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                      <radialGradient id="cityGradient">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </radialGradient>
                      {routeData.map(route => (
                        <linearGradient key={route.id} id={`route${route.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                        </linearGradient>
                      ))}
                    </defs>
                  </svg>
                  {/* Partículas de optimización */}
                  {isOptimizing && Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-60"
                      style={{
                        left: `${10 + i * 12}%`,
                        top: `${30 + Math.sin(i) * 20}%`,
                      }}
                      animate={{
                        y: [0, -40, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
                {/* Live Data Overlay */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-emerald-400 text-sm font-medium mb-1">Estado en Tiempo Real</div>
                  <div className="text-white text-xs">
                    <div>🚛 {activeRoutes} rutas activas</div>
                    <div>⚡ 95.2% eficiencia promedio</div>
                    <div>🌱 <AnimatedCO2 value={67100} /></div>
                  </div>
                </div>
                {/* Storytelling visual de optimización */}
                {selectedRoute && (
                  <motion.div
                    className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 rounded-xl px-6 py-4 shadow-2xl border border-emerald-400/20 z-20"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Brain className="w-5 h-5 text-emerald-400" />
                      <span className="text-lg font-bold text-white">Optimización Algorítmica</span>
                    </div>
                    <div className="text-gray-300 text-sm mb-2">
                      La IA analizó tráfico, clima y 50+ variables para optimizar la ruta.
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-400 mb-1">Antes</span>
                        <span className="text-red-400 font-bold">{selectedRoute.estimatedTime}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-emerald-400" />
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-400 mb-1">Optimizado</span>
                        <span className="text-green-400 font-bold">{selectedRoute.optimizedTime}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-400 mb-1">Ahorro</span>
                        <span className="text-cyan-400 font-bold">{selectedRoute.savings}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-400 mb-1">CO₂</span>
                        <span className="text-emerald-400 font-bold">{selectedRoute.carbonSaved}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-400 mb-1">Eficiencia</span>
                        <span className="text-purple-400 font-bold">{selectedRoute.efficiency}%</span>
                      </div>
                    </div>
                    <MiniEfficiencyBar efficiency={selectedRoute.efficiency} />
                    {selectedRoute.efficiency > 95 && (
                      <div className="inline-flex items-center gap-1 bg-gradient-to-r from-green-400 to-emerald-400 text-black text-xs font-bold px-2 py-1 rounded-full mt-2">
                        <CheckCircle2 className="w-4 h-4" /> Eficiencia Verde
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Route List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Rutas Activas</h2>
              
              <div className="space-y-4">
                {routeData.map((route, index) => (
                  <motion.div
                    key={route.id}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedRoute(route)}
                  >
                    <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${route.gradient}`} />
                          <span className="font-medium text-white">{route.name}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          route.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                          route.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          route.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {route.priority}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-gray-400">Distancia</div>
                          <div className="text-white font-medium">{route.distance}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Ahorro</div>
                          <div className="text-emerald-400 font-medium">{route.savings}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Vehículos</div>
                          <div className="text-white font-medium">{route.vehicles}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Eficiencia</div>
                          <div className="text-cyan-400 font-medium">{route.efficiency}%</div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <div className="text-xs text-gray-400">CO₂ ahorrado:</div>
                        <div className="text-xs text-green-400 font-medium">{route.carbonSaved}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Optimization Status */}
      <AnimatePresence>
        {isOptimizing && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-emerald-500 text-black px-6 py-3 rounded-full font-medium flex items-center gap-3 shadow-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-5 h-5" />
              </motion.div>
              <span>IA optimizando rutas en tiempo real...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(16, 185, 129, 0.3)",
            "0 0 40px rgba(6, 182, 212, 0.4)",
            "0 0 20px rgba(16, 185, 129, 0.3)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Navigation className="w-6 h-6 text-black" />
      </motion.button>
    </div>
  );
};

export default CreativeRutasPage;
