import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, Fuel, Wrench, MapPin, Activity, Clock, Users, Package,
  AlertTriangle, CheckCircle, Plus, Search, Filter, Download,
  Settings, Eye, Edit, Trash2, Star, Zap, Rocket, Shield,
  ChevronDown, ChevronUp, BarChart3, TrendingUp, Gauge
} from 'lucide-react';

const FleetManagementPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showMaintenance, setShowMaintenance] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filters = [
    { id: 'all', label: 'Todos', icon: <Truck size={16} /> },
    { id: 'active', label: 'Activos', icon: <CheckCircle size={16} /> },
    { id: 'maintenance', label: 'Mantenimiento', icon: <Wrench size={16} /> },
    { id: 'fuel', label: 'Bajo Combustible', icon: <Fuel size={16} /> },
    { id: 'alert', label: 'Alertas', icon: <AlertTriangle size={16} /> }
  ];

  const fleetData = {
    totalVehicles: 24,
    activeVehicles: 18,
    maintenanceVehicles: 4,
    lowFuelVehicles: 2,
    totalDrivers: 22,
    averageEfficiency: 87.5
  };

  const vehicles = [
    { 
      id: 1, 
      name: 'Truck-001', 
      model: 'Mercedes-Benz Actros', 
      status: 'Activo', 
      fuel: 85, 
      driver: 'Carlos M.', 
      lastMaintenance: '2025-01-15',
      nextMaintenance: '2025-02-15',
      efficiency: 92,
      location: 'Madrid',
      alerts: 0
    },
    { 
      id: 2, 
      name: 'Truck-002', 
      model: 'Volvo FH16', 
      status: 'Activo', 
      fuel: 72, 
      driver: 'Ana L.', 
      lastMaintenance: '2025-01-10',
      nextMaintenance: '2025-02-10',
      efficiency: 88,
      location: 'Barcelona',
      alerts: 0
    },
    { 
      id: 3, 
      name: 'Truck-003', 
      model: 'Scania R500', 
      status: 'Mantenimiento', 
      fuel: 45, 
      driver: 'Miguel R.', 
      lastMaintenance: '2025-01-20',
      nextMaintenance: '2025-01-25',
      efficiency: 75,
      location: 'Valencia',
      alerts: 2
    },
    { 
      id: 4, 
      name: 'Truck-004', 
      model: 'MAN TGX', 
      status: 'Activo', 
      fuel: 93, 
      driver: 'Laura S.', 
      lastMaintenance: '2025-01-12',
      nextMaintenance: '2025-02-12',
      efficiency: 95,
      location: 'Sevilla',
      alerts: 0
    },
    { 
      id: 5, 
      name: 'Truck-005', 
      model: 'Iveco Stralis', 
      status: 'Bajo Combustible', 
      fuel: 15, 
      driver: 'Pedro V.', 
      lastMaintenance: '2025-01-08',
      nextMaintenance: '2025-02-08',
      efficiency: 82,
      location: 'Bilbao',
      alerts: 1
    },
    { 
      id: 6, 
      name: 'Truck-006', 
      model: 'DAF XF', 
      status: 'Activo', 
      fuel: 78, 
      driver: 'Carmen G.', 
      lastMaintenance: '2025-01-18',
      nextMaintenance: '2025-02-18',
      efficiency: 89,
      location: 'Málaga',
      alerts: 0
    }
  ];

  const maintenanceSchedule = [
    { 
      id: 1, 
      vehicle: 'Truck-003', 
      type: 'Mantenimiento Preventivo', 
      date: '2025-01-25', 
      status: 'Programado',
      priority: 'Alta',
      description: 'Cambio de aceite y filtros'
    },
    { 
      id: 2, 
      vehicle: 'Truck-007', 
      type: 'Revisión General', 
      date: '2025-01-28', 
      status: 'Programado',
      priority: 'Media',
      description: 'Revisión completa del motor'
    },
    { 
      id: 3, 
      vehicle: 'Truck-012', 
      type: 'Cambio de Neumáticos', 
      date: '2025-02-02', 
      status: 'Programado',
      priority: 'Alta',
      description: 'Cambio de neumáticos traseros'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Mantenimiento': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Bajo Combustible': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Media': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Baja': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    color: string;
    suffix?: string;
    trend?: number;
  }> = ({ title, value, icon: Icon, color, suffix = '', trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.3 }
      }}
      className="relative overflow-hidden rounded-2xl p-6 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div 
          className={`p-3 rounded-xl ${color} shadow-lg`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp size={16} className="mr-1" />
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      
      <motion.div 
        className="text-3xl font-black mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
        whileHover={{ scale: 1.05 }}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </motion.div>
      
      <div className="text-gray-300 text-sm font-medium">{title}</div>
    </motion.div>
  );

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-black via-blue-900/20 via-cyan-900/20 to-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"
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
                🚛
              </motion.div>
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                GESTIÓN DE FLOTA
              </motion.h2>
            </motion.div>
            <motion.p 
              className="text-gray-300 text-base sm:text-lg lg:text-xl font-medium max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Control inteligente de vehículos con IA predictiva y mantenimiento proactivo
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
              Filtros y Controles
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
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter.icon}
                  {filter.label}
                </motion.button>
              ))}
            </div>

            <motion.button 
              onClick={() => setShowMaintenance(!showMaintenance)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 ${
                showMaintenance
                  ? 'bg-cyan-600 text-white'
                  : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Wrench size={20} />
              Mantenimiento
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
                {filters.map((filter) => (
                  <motion.button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                      selectedFilter === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {filter.icon}
                    {filter.label}
                  </motion.button>
                ))}
              </div>

              <motion.button 
                onClick={() => setShowMaintenance(!showMaintenance)}
                className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                  showMaintenance
                    ? 'bg-cyan-600 text-white'
                    : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Wrench size={20} />
                Mantenimiento
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* KPIs principales */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <MetricCard
            title="Total Vehículos"
            value={fleetData.totalVehicles}
            icon={Truck}
            color="bg-gradient-to-br from-blue-500 to-cyan-500"
            trend={5}
          />
          
          <MetricCard
            title="Vehículos Activos"
            value={fleetData.activeVehicles}
            icon={CheckCircle}
            color="bg-gradient-to-br from-green-500 to-emerald-500"
            trend={3}
          />
          
          <MetricCard
            title="Conductores"
            value={fleetData.totalDrivers}
            icon={Users}
            color="bg-gradient-to-br from-purple-500 to-pink-500"
            trend={2}
          />
          
          <MetricCard
            title="Eficiencia Promedio"
            value={fleetData.averageEfficiency}
            icon={Gauge}
            color="bg-gradient-to-br from-orange-500 to-red-500"
            suffix="%"
            trend={-1}
          />
        </motion.div>

        {/* Búsqueda y controles */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 items-center justify-between"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar vehículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <motion.button
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Agregar Vehículo</span>
              <span className="sm:hidden">Agregar</span>
            </motion.button>
            
            <motion.button
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-black/30 backdrop-blur-xl border border-white/30 text-white rounded-2xl font-bold text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              <span className="hidden sm:inline">Exportar</span>
              <span className="sm:hidden">Export</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Lista de Vehículos */}
        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0 }}
        >
          {/* Vehículos */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl p-6 lg:p-8 border border-white/10 backdrop-blur-2xl bg-gradient-to-br from-black/40 to-black/20"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
            <div className="relative z-10">
              <motion.h3 
                className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6"
                whileHover={{ scale: 1.05 }}
              >
                🚗 Flota de Vehículos
              </motion.h3>
              
              <div className="space-y-4">
                {vehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    className="p-4 lg:p-6 bg-black/30 rounded-xl border border-white/10 backdrop-blur-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-base lg:text-lg">{vehicle.name}</h4>
                        <p className="text-gray-300 text-sm">{vehicle.model}</p>
                        <p className="text-gray-400 text-xs">{vehicle.location} • {vehicle.driver}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(vehicle.status)}`}>
                          {vehicle.status}
                        </div>
                        {vehicle.alerts > 0 && (
                          <div className="flex items-center gap-1 text-red-400">
                            <AlertTriangle size={14} />
                            <span className="text-xs">{vehicle.alerts}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Combustible:</span>
                        <span className={`font-bold ${vehicle.fuel < 20 ? 'text-red-400' : vehicle.fuel < 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {vehicle.fuel}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Eficiencia:</span>
                        <span className="font-bold text-green-400">{vehicle.efficiency}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Último Mant.:</span>
                        <span className="text-gray-300 text-xs">{vehicle.lastMaintenance}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Próximo Mant.:</span>
                        <span className="text-gray-300 text-xs">{vehicle.nextMaintenance}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mantenimiento */}
          {showMaintenance && (
            <motion.div 
              className="relative overflow-hidden rounded-2xl p-6 lg:p-8 border border-white/10 backdrop-blur-2xl bg-gradient-to-br from-black/40 to-black/20"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-indigo-500/5" />
              <div className="relative z-10">
                <motion.h3 
                  className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  🔧 Programación de Mantenimiento
                </motion.h3>
                
                <div className="space-y-4">
                  {maintenanceSchedule.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="p-4 lg:p-6 bg-black/30 rounded-xl border border-white/10 backdrop-blur-xl"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.02, x: -5 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div className="flex-1">
                          <h4 className="text-white font-bold">{item.vehicle}</h4>
                          <p className="text-gray-300 text-sm">{item.type}</p>
                          <p className="text-gray-400 text-xs">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </div>
                          <div className="text-gray-300 text-sm">{item.date}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Estado: {item.status}</span>
                        <div className="flex gap-2">
                          <motion.button
                            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye size={16} />
                          </motion.button>
                          <motion.button
                            className="p-2 bg-green-500/20 text-green-400 rounded-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FleetManagementPage; 