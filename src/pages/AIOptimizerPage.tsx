import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Clock,
  MapPin,
  Truck,
  Fuel,
  Leaf,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  Sparkles,
  Cpu,
  Network,
  Database,
  Server,
  CircuitBoard,
  Microchip,
  Atom,
  CpuIcon,
  Wifi,
  Signal,
  Globe,
  Activity,
  Timer,
  Radio,
  Satellite,
  Radar,
  CpuIcon as CpuIcon2
} from 'lucide-react'

const AIOptimizerPage: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('genetic')
  const [optimizationParams, setOptimizationParams] = useState({
    fuelEfficiency: 85,
    timeOptimization: 90,
    costReduction: 75,
    carbonFootprint: 80
  })

  const algorithms = [
    { id: 'genetic', name: 'Algoritmo Genético', description: 'Optimización evolutiva para rutas complejas', icon: <Sparkles size={20} /> },
    { id: 'neural', name: 'Red Neuronal', description: 'Machine Learning para predicciones avanzadas', icon: <Brain size={20} /> },
    { id: 'ant', name: 'Colonia de Hormigas', description: 'Optimización basada en comportamiento natural', icon: <Target size={20} /> },
    { id: 'particle', name: 'Enjambre de Partículas', description: 'Optimización global para múltiples objetivos', icon: <Zap size={20} /> }
  ]

  const optimizationResults = {
    fuelSavings: 23.5,
    timeReduction: 18.2,
    costReduction: 31.7,
    carbonReduction: 28.4,
    routeOptimization: 94.2,
    efficiencyGain: 87.6
  }

  const startOptimization = () => {
    setIsOptimizing(true)
    setOptimizationProgress(0)
    
    const interval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsOptimizing(false)
          setShowResults(true)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const stopOptimization = () => {
    setIsOptimizing(false)
    setOptimizationProgress(0)
  }

  const resetOptimization = () => {
    setShowResults(false)
    setOptimizationProgress(0)
  }

  const handleParamChange = (param: string, value: number) => {
    setOptimizationParams(prev => ({
      ...prev,
      [param]: value
    }))
  }

  const FuturisticCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
    glow?: boolean;
  }> = ({ title, value, icon, color, subtitle, glow = false }) => (
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
            {icon}
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
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-blue-900/50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-purple-300 rounded-full animate-ping"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6 p-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <Brain size={40} className="text-purple-400" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI Optimizer
            </span>
          </h1>
          
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
            Motor de optimización con inteligencia artificial avanzada y algoritmos cuánticos
          </p>
        </motion.div>

        {/* Algorithm Selection */}
        <motion.div
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30">
              <Cpu size={24} className="text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Selección de Algoritmo</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {algorithms.map((algorithm) => (
              <motion.button
                key={algorithm.id}
                onClick={() => setSelectedAlgorithm(algorithm.id)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  selectedAlgorithm === algorithm.id
                    ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/50 shadow-lg shadow-purple-500/25'
                    : 'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    selectedAlgorithm === algorithm.id
                      ? 'bg-purple-500/20 border-purple-500/30'
                      : 'bg-slate-700/50'
                  }`}>
                    {algorithm.icon}
                  </div>
                  {selectedAlgorithm === algorithm.id && (
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                <h3 className="text-white font-semibold mb-1">
                  {algorithm.name}
                </h3>
                
                <p className="text-cyan-300/70 text-sm">
                  {algorithm.description}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Optimization Parameters */}
        <motion.div
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
              <Settings size={24} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Parámetros de Optimización</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'fuelEfficiency', label: 'Eficiencia Combustible', icon: <Fuel size={20} />, color: 'green' },
              { key: 'timeOptimization', label: 'Optimización Tiempo', icon: <Clock size={20} />, color: 'blue' },
              { key: 'costReduction', label: 'Reducción Costos', icon: <TrendingUp size={20} />, color: 'purple' },
              { key: 'carbonFootprint', label: 'Huella Carbono', icon: <Leaf size={20} />, color: 'emerald' }
            ].map((param) => (
              <div key={param.key} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-${param.color}-500/20 border border-${param.color}-500/30`}>
                    {param.icon}
                  </div>
                  <label className="text-cyan-100 font-medium">
                    {param.label}
                  </label>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={optimizationParams[param.key as keyof typeof optimizationParams]}
                  onChange={(e) => handleParamChange(param.key, parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, rgb(34, 197, 94) 0%, rgb(34, 197, 94) ${optimizationParams[param.key as keyof typeof optimizationParams]}%, rgb(51, 65, 85) ${optimizationParams[param.key as keyof typeof optimizationParams]}%, rgb(51, 65, 85) 100%)`
                  }}
                />
                
                <div className="text-center">
                  <span className="text-2xl font-bold text-white">
                    {optimizationParams[param.key as keyof typeof optimizationParams]}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-lg border border-cyan-500/30">
              <Server size={24} className="text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Panel de Control</h2>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              onClick={startOptimization}
              disabled={isOptimizing}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-bold flex items-center gap-3 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={20} />
              Iniciar Optimización
            </motion.button>
            
            <motion.button
              onClick={stopOptimization}
              disabled={!isOptimizing}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-xl font-bold flex items-center gap-3 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Pause size={20} />
              Detener
            </motion.button>
            
            <motion.button
              onClick={resetOptimization}
              className="px-8 py-4 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-500 hover:to-slate-500 text-white rounded-xl font-bold flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={20} />
              Reiniciar
            </motion.button>
          </div>
          
          {/* Progress Bar */}
          {isOptimizing && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyan-100 font-medium">Progreso de Optimización</span>
                <span className="text-cyan-400 font-bold">{Math.round(optimizationProgress)}%</span>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${optimizationProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-300/70 text-sm">Procesando algoritmos...</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Section */}
        {showResults && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {/* Main Results */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FuturisticCard
                title="Ahorro Combustible"
                value={`${optimizationResults.fuelSavings}%`}
                icon={<Fuel size={24} className="text-green-400" />}
                color="green"
                subtitle="Reducción significativa"
                glow={true}
              />
              <FuturisticCard
                title="Reducción Tiempo"
                value={`${optimizationResults.timeReduction}%`}
                icon={<Clock size={24} className="text-blue-400" />}
                color="blue"
                subtitle="Optimización temporal"
              />
              <FuturisticCard
                title="Reducción Costos"
                value={`${optimizationResults.costReduction}%`}
                icon={<TrendingUp size={24} className="text-purple-400" />}
                color="purple"
                subtitle="Ahorro económico"
              />
              <FuturisticCard
                title="Reducción CO₂"
                value={`${optimizationResults.carbonReduction}%`}
                icon={<Leaf size={24} className="text-emerald-400" />}
                color="emerald"
                subtitle="Impacto ambiental"
              />
              <FuturisticCard
                title="Optimización Ruta"
                value={`${optimizationResults.routeOptimization}%`}
                icon={<Target size={24} className="text-cyan-400" />}
                color="cyan"
                subtitle="Eficiencia máxima"
              />
              <FuturisticCard
                title="Ganancia Eficiencia"
                value={`${optimizationResults.efficiencyGain}%`}
                icon={<Zap size={24} className="text-yellow-400" />}
                color="yellow"
                subtitle="Rendimiento total"
              />
            </div>

            {/* AI Analysis */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30">
                  <Brain size={24} className="text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Análisis de IA</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-100">Algoritmo Utilizado</h3>
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-purple-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      {algorithms.find(a => a.id === selectedAlgorithm)?.icon}
                      <span className="text-white font-medium">
                        {algorithms.find(a => a.id === selectedAlgorithm)?.name}
                      </span>
                    </div>
                    <p className="text-cyan-300/70 text-sm">
                      {algorithms.find(a => a.id === selectedAlgorithm)?.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-100">Estadísticas de Rendimiento</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-purple-500/30">
                      <div className="text-2xl font-bold text-purple-400 mb-1">94.2%</div>
                      <div className="text-cyan-300/70 text-sm">Precisión</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-purple-500/30">
                      <div className="text-2xl font-bold text-blue-400 mb-1">1.2s</div>
                      <div className="text-cyan-300/70 text-sm">Tiempo Proceso</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AIOptimizerPage 