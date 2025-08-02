import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, MapPin, Truck, Clock, AlertTriangle, CheckCircle,
  Eye, Settings, RefreshCw, Play, Pause, Zap, Shield,
  Users, Package, Fuel, Target, TrendingUp, BarChart3, PieChart,
  ChevronDown, ChevronUp
} from 'lucide-react';

const LiveOperationsPage: React.FC = () => {
  const [isLive, setIsLive] = useState(true);
  const [selectedView, setSelectedView] = useState('map');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const views = [
    { id: 'map', label: 'Mapa', icon: <MapPin size={16} /> },
    { id: 'vehicles', label: 'Vehículos', icon: <Truck size={16} /> },
    { id: 'alerts', label: 'Alertas', icon: <AlertTriangle size={16} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={16} /> }
  ];

  const liveData = {
    activeVehicles: 12,
    totalDistance: 2847,
    averageSpeed: 65,
    fuelLevel: 78,
    alerts: 3,
    completedRoutes: 8,
    efficiency: 94.2,
    carbonSaved: 45.2
  };

  const vehicles = [
    { 
      id: 1, 
      name: 'Truck-001', 
      driver: 'Carlos M.', 
      status: 'En Ruta', 
      location: 'Madrid → Barcelona',
      speed: 68,
      fuel: 85,
      eta: '14:30',
      distance: 625,
      efficiency: 92
    },
    { 
      id: 2, 
      name: 'Truck-002', 
      driver: 'Ana L.', 
      status: 'En Ruta', 
      location: 'Valencia → Sevilla',
      speed: 72,
      fuel: 78,
      eta: '16:45',
      distance: 520,
      efficiency: 88
    },
    { 
      id: 3, 
      name: 'Truck-003', 
      driver: 'Miguel R.', 
      status: 'Mantenimiento', 
      location: 'Taller Central',
      speed: 0,
      fuel: 45,
      eta: 'N/A',
      distance: 0,
      efficiency: 75
    },
    { 
      id: 4, 
      name: 'Truck-004', 
      driver: 'Laura S.', 
      status: 'En Ruta', 
      location: 'Bilbao → Málaga',
      speed: 65,
      fuel: 93,
      eta: '18:20',
      distance: 890,
      efficiency: 95
    }
  ];

  const alerts = [
    { 
      id: 1, 
      type: 'warning', 
      message: 'Bajo nivel de combustible en Truck-005', 
      vehicle: 'Truck-005',
      time: '14:25',
      priority: 'Media'
    },
    { 
      id: 2, 
      type: 'error', 
      message: 'Retraso en ruta Madrid-Barcelona', 
      vehicle: 'Truck-001',
      time: '14:20',
      priority: 'Alta'
    },
    { 
      id: 3, 
      type: 'info', 
      message: 'Mantenimiento programado completado', 
      vehicle: 'Truck-003',
      time: '14:15',
      priority: 'Baja'
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'info': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En Ruta': return 'bg-green-500/20 text-green-400';
      case 'Mantenimiento': return 'bg-yellow-500/20 text-yellow-400';
      case 'Disponible': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    color: string;
    suffix?: string;
    change?: number;
  }> = ({ title, value, icon: Icon, color, suffix = '', change }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.3 }
      }}
      className="relative overflow-hidden rounded-2xl p-6 lg:p-8 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <motion.div 
          className={`p-3 lg:p-4 rounded-xl ${color} shadow-lg`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
        </motion.div>
        {change && (
          <motion.div 
            className={`flex items-center gap-2 text-sm lg:text-lg font-bold ${change > 0 ? 'text-green-400' : 'text-red-400'}`}
            whileHover={{ scale: 1.1 }}
          >
            <TrendingUp size={14} className="lg:w-4 lg:h-4" />
            {change > 0 ? '+' : ''}{change}%
          </motion.div>
        )}
      </div>
      
      <motion.div 
        className="text-2xl lg:text-4xl font-black mb-2 lg:mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
        whileHover={{ scale: 1.05 }}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </motion.div>
      
      <div className="text-gray-300 text-sm lg:text-lg font-semibold">{title}</div>
    </motion.div>
  );

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simular actualizaciones de datos
      console.log('Actualizando datos en tiempo real...');
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-black via-green-900/20 via-emerald-900/20 to-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="space-y-4 text-center">
            <motion.div className="flex items-center justify-center gap-3 sm:gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-4xl sm:text-5xl lg:text-6xl"
              >
                📡
              </motion.div>
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                OPERACIONES EN VIVO
              </motion.h2>
            </motion.div>
            <motion.p 
              className="text-gray-300 text-base sm:text-lg lg:text-xl font-medium max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Monitoreo en tiempo real de flotas con IA predictiva y control centralizado
            </motion.p>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-xl border border-white/30 text-white rounded-xl font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              Configuración de Operaciones
            </motion.button>
          </div>

          {/* Controls - Desktop */}
          <motion.div 
            className="hidden lg:flex items-center gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex gap-2">
              {views.map((view) => (
                <motion.button
                  key={view.id}
                  onClick={() => setSelectedView(view.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedView === view.id
                      ? 'bg-green-600 text-white'
                      : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {view.icon}
                  {view.label}
                </motion.button>
              ))}
            </div>

            <motion.button 
              onClick={() => setIsLive(!isLive)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 ${
                isLive
                  ? 'bg-green-600 text-white'
                  : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLive ? <Play size={20} /> : <Pause size={20} />}
              {isLive ? 'En Vivo' : 'Pausado'}
            </motion.button>
          </motion.div>

          {/* Controls - Mobile */}
          {isMobileMenuOpen && (
            <motion.div 
              className="lg:hidden space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-2 gap-2">
                {views.map((view) => (
                  <motion.button
                    key={view.id}
                    onClick={() => setSelectedView(view.id)}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                      selectedView === view.id
                        ? 'bg-green-600 text-white'
                        : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {view.icon}
                    {view.label}
                  </motion.button>
                ))}
              </div>

              <motion.button 
                onClick={() => setIsLive(!isLive)}
                className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                  isLive
                    ? 'bg-green-600 text-white'
                    : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLive ? <Play size={20} /> : <Pause size={20} />}
                {isLive ? 'En Vivo' : 'Pausado'}
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* KPIs principales */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <MetricCard
            title="Vehículos Activos"
            value={liveData.activeVehicles}
            icon={Truck}
            color="bg-gradient-to-br from-green-500 to-emerald-500"
            change={5.2}
          />
          
          <MetricCard
            title="Eficiencia Promedio"
            value={liveData.efficiency}
            icon={Target}
            color="bg-gradient-to-br from-blue-500 to-cyan-500"
            suffix="%"
            change={2.1}
          />
          
          <MetricCard
            title="CO₂ Ahorrado"
            value={liveData.carbonSaved}
            icon={Shield}
            color="bg-gradient-to-br from-purple-500 to-pink-500"
            suffix=" kg"
            change={8.5}
          />
          
          <MetricCard
            title="Alertas Activas"
            value={liveData.alerts}
            icon={AlertTriangle}
            color="bg-gradient-to-br from-orange-500 to-red-500"
            change={-12.5}
          />
        </motion.div>

        {/* Estado en Tiempo Real */}
        <motion.div 
          className="relative overflow-hidden rounded-2xl p-6 lg:p-10 border border-white/10 backdrop-blur-2xl bg-gradient-to-br from-black/40 to-black/20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-10">
              <motion.h3 
                className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                📊 Estado en Tiempo Real
              </motion.h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-400">
                  <motion.div 
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-base lg:text-lg font-bold">En Vivo</span>
                </div>
                <motion.button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`p-3 rounded-2xl ${autoRefresh ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RefreshCw size={20} />
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              {[
                { label: 'Distancia Total', value: `${liveData.totalDistance}km`, icon: <MapPin size={20} className="lg:w-6 lg:h-6" /> },
                { label: 'Velocidad Promedio', value: `${liveData.averageSpeed}km/h`, icon: <Activity size={20} className="lg:w-6 lg:h-6" /> },
                { label: 'Nivel Combustible', value: `${liveData.fuelLevel}%`, icon: <Fuel size={20} className="lg:w-6 lg:h-6" /> },
                { label: 'Rutas Completadas', value: liveData.completedRoutes, icon: <CheckCircle size={20} className="lg:w-6 lg:h-6" /> },
                { label: 'Conductores Activos', value: liveData.activeVehicles, icon: <Users size={20} className="lg:w-6 lg:h-6" /> },
                { label: 'Paquetes Entregados', value: 156, icon: <Package size={20} className="lg:w-6 lg:h-6" /> }
              ].map((item, index) => (
                <motion.div 
                  key={item.label} 
                  className="text-center p-4 lg:p-6 bg-black/30 rounded-xl lg:rounded-2xl border border-white/10 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-green-400 mb-3">{item.icon}</div>
                  <div className="text-lg lg:text-2xl font-black text-white mb-2">
                    {item.value}
                  </div>
                  <div className="text-gray-300 text-xs lg:text-sm font-medium">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contenido Principal */}
        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0 }}
        >
          {/* Vehículos en Tiempo Real */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl p-6 lg:p-10 border border-white/10 backdrop-blur-2xl bg-gradient-to-br from-black/40 to-black/20"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
            <div className="relative z-10">
              <motion.h3 
                className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 lg:mb-8"
                whileHover={{ scale: 1.05 }}
              >
                🚛 Vehículos en Tiempo Real
              </motion.h3>
              
              <div className="space-y-4">
                {vehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    className="p-4 lg:p-6 bg-black/30 rounded-xl lg:rounded-2xl border border-white/10 backdrop-blur-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <h4 className="text-white font-bold text-base lg:text-lg">{vehicle.name}</h4>
                        <p className="text-gray-300 text-sm">{vehicle.driver}</p>
                        <p className="text-gray-400 text-xs">{vehicle.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(vehicle.status)}`}>
                          {vehicle.status}
                        </div>
                        <motion.button
                          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye size={16} />
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 lg:gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Velocidad:</span>
                        <span className="text-green-400 font-bold">{vehicle.speed} km/h</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Combustible:</span>
                        <span className={`font-bold ${vehicle.fuel < 20 ? 'text-red-400' : vehicle.fuel < 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {vehicle.fuel}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">ETA:</span>
                        <span className="text-gray-300">{vehicle.eta}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Eficiencia:</span>
                        <span className="text-green-400 font-bold">{vehicle.efficiency}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Alertas y Notificaciones */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl p-6 lg:p-10 border border-white/10 backdrop-blur-2xl bg-gradient-to-br from-black/40 to-black/20"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5" />
            <div className="relative z-10">
              <motion.h3 
                className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-6 lg:mb-8"
                whileHover={{ scale: 1.05 }}
              >
                ⚠️ Alertas y Notificaciones
              </motion.h3>
              
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    className={`p-4 lg:p-6 rounded-xl lg:rounded-2xl border backdrop-blur-xl ${getAlertColor(alert.type)}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: -5 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-base lg:text-lg">{alert.message}</h4>
                        <p className="text-sm opacity-80">{alert.vehicle} • {alert.time}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs opacity-70">{alert.priority}</div>
                        <motion.button
                          className="p-2 bg-white/10 rounded-lg mt-2"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveOperationsPage; 