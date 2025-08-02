import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  PieChart, 
  Activity,
  Calendar,
  Filter,
  Download,
  Eye,
  EyeOff,
  RefreshCw,
  Settings,
  Target,
  DollarSign,
  Fuel,
  Leaf,
  Clock,
  Users,
  Truck,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
  LineChart,
  BarChart,
  PieChart as PieChartIcon,
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
  Timer,
  Radio,
  Satellite,
  Radar,
  CpuIcon as CpuIcon2
} from 'lucide-react'

const AnalyticsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [showRealTime, setShowRealTime] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Simulated real-time data
  const [realTimeData, setRealTimeData] = useState({
    activeVehicles: 24,
    totalDistance: 2847,
    averageSpeed: 65,
    fuelLevel: 78,
    alerts: 3,
    completedRoutes: 18,
    efficiency: 87,
    carbonSaved: 45.2
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        activeVehicles: prev.activeVehicles + Math.floor(Math.random() * 3) - 1,
        totalDistance: prev.totalDistance + Math.floor(Math.random() * 50),
        averageSpeed: prev.averageSpeed + Math.floor(Math.random() * 10) - 5,
        fuelLevel: Math.max(20, prev.fuelLevel + Math.floor(Math.random() * 6) - 3),
        alerts: Math.max(0, prev.alerts + Math.floor(Math.random() * 3) - 1),
        completedRoutes: prev.completedRoutes + Math.floor(Math.random() * 2),
        efficiency: Math.min(100, Math.max(70, prev.efficiency + Math.floor(Math.random() * 6) - 3)),
        carbonSaved: prev.carbonSaved + (Math.random() * 2 - 1)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const periods = [
    { id: 'day', label: 'Hoy', icon: <Calendar size={16} /> },
    { id: 'week', label: 'Esta Semana', icon: <Calendar size={16} /> },
    { id: 'month', label: 'Este Mes', icon: <Calendar size={16} /> },
    { id: 'quarter', label: 'Este Trimestre', icon: <Calendar size={16} /> }
  ]

  const analyticsData = {
    fuelConsumption: {
      current: 1250,
      previous: 1400,
      change: -10.7,
      trend: 'down',
      icon: <Fuel size={20} />,
      color: 'blue'
    },
    costSavings: {
      current: 31500,
      previous: 28000,
      change: 12.5,
      trend: 'up',
      icon: <DollarSign size={20} />,
      color: 'green'
    },
    carbonReduction: {
      current: 45.2,
      previous: 38.5,
      change: 17.4,
      trend: 'up',
      icon: <Leaf size={20} />,
      color: 'emerald'
    },
    efficiency: {
      current: 87.3,
      previous: 82.1,
      change: 6.3,
      trend: 'up',
      icon: <Target size={20} />,
      color: 'purple'
    }
  }

  const chartData = [
    { name: 'Lun', fuel: 120, cost: 2800, efficiency: 85, routes: 12 },
    { name: 'Mar', fuel: 135, cost: 3200, efficiency: 88, routes: 15 },
    { name: 'Mié', fuel: 110, cost: 2900, efficiency: 92, routes: 18 },
    { name: 'Jue', fuel: 125, cost: 3100, efficiency: 87, routes: 14 },
    { name: 'Vie', fuel: 140, cost: 3400, efficiency: 89, routes: 16 },
    { name: 'Sáb', fuel: 95, cost: 2200, efficiency: 94, routes: 10 },
    { name: 'Dom', fuel: 80, cost: 1800, efficiency: 96, routes: 8 }
  ]

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <ArrowUpRight size={16} className="text-green-500" /> : <ArrowDownRight size={16} className="text-red-500" />
  }

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-500' : 'text-red-500'
  }

  const FuturisticCard: React.FC<{
    title: string;
    value: string;
    change: number;
    trend: string;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, trend, icon, color }) => (
    <motion.div
      className={`relative p-6 rounded-2xl border border-${color}-500/30 bg-gradient-to-br from-${color}-900/20 via-${color}-800/10 to-${color}-900/20 backdrop-blur-sm`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        boxShadow: `0 0 30px rgba(59, 130, 246, 0.3)`
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 border border-${color}-500/30`}>
            {icon}
          </div>
          <div className={`flex items-center gap-1 ${getTrendColor(trend)}`}>
            {getTrendIcon(trend)}
            <span className="text-sm font-medium">
              {change > 0 ? '+' : ''}{change}%
            </span>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">
          {value}
        </h3>
        
        <p className="text-cyan-100 text-sm">
          {title}
        </p>
      </div>
    </motion.div>
  )

  const RealTimeCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
  }> = ({ title, value, icon, color, subtitle }) => (
    <motion.div
      className={`relative p-6 rounded-2xl border border-${color}-500/30 bg-gradient-to-br from-${color}-900/20 via-${color}-800/10 to-${color}-900/20 backdrop-blur-sm`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 border border-${color}-500/30`}>
            {icon}
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-emerald-900/50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-blue-300 rounded-full animate-ping"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6 p-4 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-full border border-blue-500/30"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <BarChart3 size={40} className="text-blue-400" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Analytics Dashboard
            </span>
          </h1>
          
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
            Monitoreo en tiempo real y análisis avanzado de tu flota logística
          </p>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden mb-6">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-medium w-full border border-blue-500/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isMobileMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              Configuración
            </motion.button>
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex gap-2">
              {periods.map((period) => (
                <motion.button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === period.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-cyan-300 hover:bg-slate-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {period.icon}
                  {period.label}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setShowRealTime(!showRealTime)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                  showRealTime
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-700 text-cyan-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showRealTime ? <Eye size={16} /> : <EyeOff size={16} />}
                Tiempo Real
              </motion.button>
              
              <motion.button
                className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw size={16} />
              </motion.button>
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
              <div>
                <h4 className="text-cyan-100 font-semibold mb-2">Período</h4>
                <div className="grid grid-cols-2 gap-2">
                  {periods.map((period) => (
                    <motion.button
                      key={period.id}
                      onClick={() => setSelectedPeriod(period.id)}
                      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm ${
                        selectedPeriod === period.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-700 text-cyan-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {period.icon}
                      {period.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-cyan-100 font-semibold mb-2">Opciones</h4>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setShowRealTime(!showRealTime)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm ${
                      showRealTime
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-700 text-cyan-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {showRealTime ? <Eye size={14} /> : <EyeOff size={14} />}
                    Tiempo Real
                  </motion.button>
                  
                  <motion.button
                    className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Key Metrics */}
        <section className="px-4 mb-8">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Métricas Principales
              </h2>
              <p className="text-cyan-300">
                Rendimiento y eficiencia de tu flota
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: 'Consumo Combustible',
                  value: `${analyticsData.fuelConsumption.current}L`,
                  change: analyticsData.fuelConsumption.change,
                  trend: analyticsData.fuelConsumption.trend,
                  icon: analyticsData.fuelConsumption.icon,
                  color: analyticsData.fuelConsumption.color
                },
                {
                  title: 'Ahorro de Costos',
                  value: `€${analyticsData.costSavings.current.toLocaleString()}`,
                  change: analyticsData.costSavings.change,
                  trend: analyticsData.costSavings.trend,
                  icon: analyticsData.costSavings.icon,
                  color: analyticsData.costSavings.color
                },
                {
                  title: 'Reducción CO₂',
                  value: `${analyticsData.carbonReduction.current}kg`,
                  change: analyticsData.carbonReduction.change,
                  trend: analyticsData.carbonReduction.trend,
                  icon: analyticsData.carbonReduction.icon,
                  color: analyticsData.carbonReduction.color
                },
                {
                  title: 'Eficiencia',
                  value: `${analyticsData.efficiency.current}%`,
                  change: analyticsData.efficiency.change,
                  trend: analyticsData.efficiency.trend,
                  icon: analyticsData.efficiency.icon,
                  color: analyticsData.efficiency.color
                }
              ].map((metric, index) => (
                <FuturisticCard
                  key={metric.title}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  trend={metric.trend}
                  icon={metric.icon}
                  color={metric.color}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Real-time Dashboard */}
        {showRealTime && (
          <section className="px-4 mb-8">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Dashboard en Tiempo Real
                </h2>
                <div className="flex items-center justify-center gap-2 text-emerald-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">En Vivo</span>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { 
                    title: 'Vehículos Activos', 
                    value: realTimeData.activeVehicles, 
                    icon: <Truck size={20} />, 
                    color: 'blue',
                    subtitle: 'En ruta'
                  },
                  { 
                    title: 'Distancia Total', 
                    value: `${realTimeData.totalDistance}km`, 
                    icon: <MapPin size={20} />, 
                    color: 'green',
                    subtitle: 'Hoy'
                  },
                  { 
                    title: 'Velocidad Promedio', 
                    value: `${realTimeData.averageSpeed}km/h`, 
                    icon: <Activity size={20} />, 
                    color: 'purple',
                    subtitle: 'Actual'
                  },
                  { 
                    title: 'Nivel Combustible', 
                    value: `${realTimeData.fuelLevel}%`, 
                    icon: <Fuel size={20} />, 
                    color: 'orange',
                    subtitle: 'Promedio'
                  }
                ].map((item, index) => (
                  <RealTimeCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    icon={item.icon}
                    color={item.color}
                    subtitle={item.subtitle}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {[
                  { 
                    title: 'Alertas', 
                    value: realTimeData.alerts, 
                    icon: <AlertTriangle size={20} />, 
                    color: 'red',
                    subtitle: 'Activas'
                  },
                  { 
                    title: 'Rutas Completadas', 
                    value: realTimeData.completedRoutes, 
                    icon: <CheckCircle size={20} />, 
                    color: 'emerald',
                    subtitle: 'Hoy'
                  },
                  { 
                    title: 'Eficiencia', 
                    value: `${realTimeData.efficiency}%`, 
                    icon: <Target size={20} />, 
                    color: 'blue',
                    subtitle: 'Promedio'
                  },
                  { 
                    title: 'CO₂ Ahorrado', 
                    value: `${realTimeData.carbonSaved.toFixed(1)}kg`, 
                    icon: <Leaf size={20} />, 
                    color: 'green',
                    subtitle: 'Hoy'
                  }
                ].map((item, index) => (
                  <RealTimeCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    icon={item.icon}
                    color={item.color}
                    subtitle={item.subtitle}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Charts Section */}
        <section className="px-4 mb-8">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Análisis de Datos
              </h2>
              <p className="text-cyan-300">
                Gráficos y tendencias de rendimiento
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Line Chart */}
              <motion.div
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-blue-500/20 p-6 rounded-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">
                    Tendencia Semanal
                  </h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
                <div className="h-64 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-blue-500/30 flex items-center justify-center relative overflow-hidden">
                  {/* Animated grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
                  
                  <div className="text-center text-cyan-100">
                    <LineChart size={48} className="mx-auto mb-4 text-blue-400" />
                    <p>Gráfico de tendencias semanales</p>
                  </div>
                </div>
              </motion.div>

              {/* Pie Chart */}
              <motion.div
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-blue-500/20 p-6 rounded-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">
                    Distribución de Costos
                  </h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
                <div className="h-64 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-blue-500/30 flex items-center justify-center relative overflow-hidden">
                  {/* Animated grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
                  
                  <div className="text-center text-cyan-100">
                    <PieChartIcon size={48} className="mx-auto mb-4 text-emerald-400" />
                    <p>Distribución de costos por categoría</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="px-4 mb-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl py-8 rounded-2xl border border-blue-500/20">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Insights Inteligentes
              </h2>
              <p className="text-cyan-300">
                Análisis predictivo y recomendaciones basadas en IA
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <TrendingUp size={24} />,
                  title: "Optimización de Rutas",
                  description: "Reducción del 15% en tiempo de entrega promedio",
                  metric: "+15% eficiencia",
                  color: "green"
                },
                {
                  icon: <Fuel size={24} />,
                  title: "Ahorro de Combustible",
                  description: "Optimización de rutas reduce consumo en 23%",
                  metric: "-23% consumo",
                  color: "blue"
                },
                {
                  icon: <Leaf size={24} />,
                  title: "Reducción de Emisiones",
                  description: "Menor huella de carbono con rutas optimizadas",
                  metric: "-28% CO₂",
                  color: "emerald"
                },
                {
                  icon: <DollarSign size={24} />,
                  title: "Reducción de Costos",
                  description: "Ahorro significativo en costos operativos",
                  metric: "-31% costos",
                  color: "purple"
                },
                {
                  icon: <Clock size={24} />,
                  title: "Tiempo de Entrega",
                  description: "Mejora en la puntualidad de entregas",
                  metric: "+18% puntualidad",
                  color: "orange"
                },
                {
                  icon: <Users size={24} />,
                  title: "Satisfacción del Cliente",
                  description: "Mayor satisfacción por entregas más rápidas",
                  metric: "+25% satisfacción",
                  color: "pink"
                }
              ].map((insight, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-xl border border-blue-500/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className={`mb-4 p-3 rounded-lg bg-${insight.color}-500/20 border border-${insight.color}-500/30 w-fit`}>
                    {insight.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {insight.title}
                  </h3>
                  <p className="text-cyan-300 mb-4">
                    {insight.description}
                  </p>
                  <div className={`inline-block px-3 py-1 bg-${insight.color}-500/20 text-${insight.color}-300 rounded-full text-sm font-medium`}>
                    {insight.metric}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AnalyticsPage 