import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, DollarSign, Truck, Fuel, Clock,
  Users, Package, MapPin, Activity, Target, Calendar,
  Download, Filter, RefreshCw, Eye, AlertCircle, Zap, Star, Rocket,
  BarChart3, PieChart, LineChart, AreaChart, CheckCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showRealTime, setShowRealTime] = useState(true);

  const periods = [
    { id: 'day', label: 'Hoy', icon: <Calendar size={16} /> },
    { id: 'week', label: 'Esta Semana', icon: <Calendar size={16} /> },
    { id: 'month', label: 'Este Mes', icon: <Calendar size={16} /> },
    { id: 'quarter', label: 'Este Trimestre', icon: <Calendar size={16} /> },
    { id: 'year', label: 'Este Año', icon: <Calendar size={16} /> }
  ];

  const dashboardData = {
    revenue: {
      current: 125000,
      previous: 110000,
      change: 13.6,
      trend: 'up'
    },
    deliveries: {
      current: 2847,
      previous: 2650,
      change: 7.4,
      trend: 'up'
    },
    efficiency: {
      current: 94.2,
      previous: 91.8,
      change: 2.6,
      trend: 'up'
    },
    fuelConsumption: {
      current: 1250,
      previous: 1400,
      change: -10.7,
      trend: 'down'
    }
  };

  const realTimeData = {
    activeVehicles: 12,
    totalDistance: 2847,
    averageSpeed: 65,
    fuelLevel: 78,
    alerts: 3,
    completedRoutes: 8
  };

  const recentRoutes = [
    { id: 1, origin: 'Madrid', destination: 'Barcelona', status: 'En Ruta', progress: 75, driver: 'Carlos M.', vehicle: 'Truck-001' },
    { id: 2, origin: 'Valencia', destination: 'Sevilla', status: 'Completada', progress: 100, driver: 'Ana L.', vehicle: 'Truck-002' },
    { id: 3, origin: 'Bilbao', destination: 'Málaga', status: 'En Ruta', progress: 45, driver: 'Miguel R.', vehicle: 'Truck-003' },
    { id: 4, origin: 'Zaragoza', destination: 'Granada', status: 'Pendiente', progress: 0, driver: 'Laura S.', vehicle: 'Truck-004' }
  ];

  const vehicles = [
    { id: 1, name: 'Truck-001', status: 'Activo', fuel: 85, driver: 'Carlos M.', lastMaintenance: '2025-01-15' },
    { id: 2, name: 'Truck-002', status: 'Activo', fuel: 72, driver: 'Ana L.', lastMaintenance: '2025-01-10' },
    { id: 3, name: 'Truck-003', status: 'Mantenimiento', fuel: 45, driver: 'Miguel R.', lastMaintenance: '2025-01-20' },
    { id: 4, name: 'Truck-004', status: 'Activo', fuel: 93, driver: 'Laura S.', lastMaintenance: '2025-01-12' }
  ];

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-400' : 'text-red-400';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />;
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    change: number;
    trend: string;
    icon: React.ComponentType<any>;
    color: string;
    prefix?: string;
    suffix?: string;
  }> = ({ title, value, change, trend, icon: Icon, color, prefix = '', suffix = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.1, 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="relative overflow-hidden rounded-3xl p-8 border border-white/20 backdrop-blur-xl bg-black/30 shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <motion.div 
          className={`p-4 rounded-2xl ${color} shadow-2xl`}
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
        <motion.div 
          className={`flex items-center gap-2 text-lg font-bold ${getTrendColor(trend)}`}
          whileHover={{ scale: 1.1 }}
        >
          {getTrendIcon(trend)}
          {change > 0 ? '+' : ''}{change}%
        </motion.div>
      </div>
      
      <motion.div 
        className="text-4xl font-black mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
        whileHover={{ scale: 1.05 }}
      >
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </motion.div>
      
      <div className="text-gray-300 text-lg font-semibold">{title}</div>
    </motion.div>
  );

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-black via-purple-900 via-pink-900 to-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 p-8 space-y-12">
        {/* Header con controles */}
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="space-y-4">
            <motion.div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-6xl"
              >
                📊
              </motion.div>
              <motion.h2 
                className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                DASHBOARD FUTURISTA
              </motion.h2>
            </motion.div>
            <motion.p 
              className="text-gray-300 text-xl font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Control central de operaciones con IA avanzada y monitoreo holográfico
            </motion.p>
          </div>

          <motion.div 
            className="flex items-center gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex gap-2">
              {periods.map((period) => (
                <motion.button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === period.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {period.icon}
                  {period.label}
                </motion.button>
              ))}
            </div>

            <motion.button 
              onClick={() => setShowRealTime(!showRealTime)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 ${
                showRealTime
                  ? 'bg-green-600 text-white'
                  : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {showRealTime ? <Eye size={20} /> : <Eye size={20} />}
              Tiempo Real
            </motion.button>
          </motion.div>
        </motion.div>

        {/* KPIs principales */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <MetricCard
            title="Ingresos Totales"
            value={dashboardData.revenue.current}
            change={dashboardData.revenue.change}
            trend={dashboardData.revenue.trend}
            icon={DollarSign}
            color="bg-gradient-to-br from-green-500 to-emerald-500"
            prefix="€"
          />
          
          <MetricCard
            title="Entregas Realizadas"
            value={dashboardData.deliveries.current}
            change={dashboardData.deliveries.change}
            trend={dashboardData.deliveries.trend}
            icon={Package}
            color="bg-gradient-to-br from-blue-500 to-cyan-500"
          />
          
          <MetricCard
            title="Eficiencia Operativa"
            value={dashboardData.efficiency.current}
            change={dashboardData.efficiency.change}
            trend={dashboardData.efficiency.trend}
            icon={Target}
            color="bg-gradient-to-br from-purple-500 to-pink-500"
            suffix="%"
          />
          
          <MetricCard
            title="Consumo Combustible"
            value={dashboardData.fuelConsumption.current}
            change={dashboardData.fuelConsumption.change}
            trend={dashboardData.fuelConsumption.trend}
            icon={Fuel}
            color="bg-gradient-to-br from-orange-500 to-red-500"
            suffix="L"
          />
        </motion.div>

        {/* Real-time Dashboard */}
        {showRealTime && (
          <motion.div 
            className="relative overflow-hidden rounded-3xl p-10 border border-white/20 backdrop-blur-2xl bg-black/30"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <motion.h3 
                  className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  📡 Dashboard en Tiempo Real
                </motion.h3>
                <div className="flex items-center gap-2 text-green-400">
                  <motion.div 
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-lg font-bold">En Vivo</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { label: 'Vehículos Activos', value: realTimeData.activeVehicles, icon: <Truck size={24} /> },
                  { label: 'Distancia Total', value: `${realTimeData.totalDistance}km`, icon: <MapPin size={24} /> },
                  { label: 'Velocidad Promedio', value: `${realTimeData.averageSpeed}km/h`, icon: <Activity size={24} /> },
                  { label: 'Nivel Combustible', value: `${realTimeData.fuelLevel}%`, icon: <Fuel size={24} /> },
                  { label: 'Alertas', value: realTimeData.alerts, icon: <AlertCircle size={24} /> },
                  { label: 'Rutas Completadas', value: realTimeData.completedRoutes, icon: <CheckCircle size={24} /> }
                ].map((item, index) => (
                  <motion.div 
                    key={item.label} 
                    className="text-center p-6 bg-black/30 rounded-2xl border border-white/10 backdrop-blur-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-green-400 mb-3">{item.icon}</div>
                    <div className="text-2xl font-black text-white mb-2">
                      {item.value}
                    </div>
                    <div className="text-gray-300 text-sm font-medium">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Rutas Recientes y Vehículos */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0 }}
        >
          {/* Rutas Recientes */}
          <motion.div 
            className="relative overflow-hidden rounded-3xl p-10 border border-white/20 backdrop-blur-2xl bg-black/30"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
            <div className="relative z-10">
              <motion.h3 
                className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8"
                whileHover={{ scale: 1.05 }}
              >
                🚛 Rutas Recientes
              </motion.h3>
              
              <div className="space-y-4">
                {recentRoutes.map((route, index) => (
                  <motion.div
                    key={route.id}
                    className="p-4 bg-black/30 rounded-2xl border border-white/10 backdrop-blur-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-bold">{route.origin} → {route.destination}</h4>
                        <p className="text-gray-300 text-sm">{route.driver} • {route.vehicle}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        route.status === 'Completada' ? 'bg-green-500/20 text-green-400' :
                        route.status === 'En Ruta' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {route.status}
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${route.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vehículos */}
          <motion.div 
            className="relative overflow-hidden rounded-3xl p-10 border border-white/20 backdrop-blur-2xl bg-black/30"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
            <div className="relative z-10">
              <motion.h3 
                className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8"
                whileHover={{ scale: 1.05 }}
              >
                🚗 Flota de Vehículos
              </motion.h3>
              
              <div className="space-y-4">
                {vehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    className="p-4 bg-black/30 rounded-2xl border border-white/10 backdrop-blur-xl"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: -10 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-bold">{vehicle.name}</h4>
                        <p className="text-gray-300 text-sm">{vehicle.driver}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        vehicle.status === 'Activo' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {vehicle.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Combustible: {vehicle.fuel}%</span>
                      <span className="text-gray-300">Mantenimiento: {vehicle.lastMaintenance}</span>
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

export default Dashboard;
