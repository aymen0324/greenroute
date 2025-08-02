import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  ComposedChart, Legend
} from 'recharts';
import { 
  TrendingUp, TrendingDown, DollarSign, Truck, Fuel, Clock,
  Users, Package, MapPin, Activity, Target, Calendar,
  Download, Filter, RefreshCw, Eye, AlertCircle, Zap, Star, Rocket
} from 'lucide-react';

interface AnalyticsData {
  revenue: {
    daily: Array<{ date: string; value: number; target: number }>;
    monthly: number;
    growth: number;
  };
  operations: {
    deliveries: number;
    onTimeRate: number;
    averageDeliveryTime: number;
    fuelEfficiency: number;
  };
  fleet: {
    utilization: number;
    activeVehicles: number;
    totalVehicles: number;
    maintenanceCost: number;
  };
  environmental: {
    co2Saved: number;
    fuelSaved: number;
    greenRoutes: number;
    sustainabilityScore: number;
  };
  costs: Array<{ category: string; amount: number; color: string }>;
  performance: Array<{ month: string; efficiency: number; cost: number; revenue: number }>;
}

interface BusinessAnalyticsDashboardProps {
  onClose?: () => void;
}

const BusinessAnalyticsDashboard: React.FC<BusinessAnalyticsDashboardProps> = ({ onClose }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'efficiency' | 'costs'>('revenue');

  useEffect(() => {
    const generateAnalyticsData = (): AnalyticsData => {
      const today = new Date();
      const dailyRevenue = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(today.getTime() - (29 - i) * 24 * 60 * 60 * 1000);
        const baseRevenue = 15000 + Math.sin(i / 7) * 3000;
        const randomVariation = (Math.random() - 0.5) * 2000;
        const value = Math.max(8000, baseRevenue + randomVariation);
        
        return {
          date: date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
          value: Math.round(value),
          target: 16000
        };
      });

      const performanceData = [
        { month: 'Ene', efficiency: 85, cost: 12000, revenue: 45000 },
        { month: 'Feb', efficiency: 88, cost: 11500, revenue: 48000 },
        { month: 'Mar', efficiency: 91, cost: 11200, revenue: 52000 },
        { month: 'Abr', efficiency: 89, cost: 11800, revenue: 49000 },
        { month: 'May', efficiency: 93, cost: 10900, revenue: 55000 },
        { month: 'Jun', efficiency: 95, cost: 10500, revenue: 58000 }
      ];

      const costBreakdown = [
        { category: 'Combustible', amount: 45000, color: '#F59E0B' },
        { category: 'Mantenimiento', amount: 28000, color: '#3B82F6' },
        { category: 'Salarios', amount: 65000, color: '#10B981' },
        { category: 'Seguros', amount: 15000, color: '#8B5CF6' },
        { category: 'Otros', amount: 12000, color: '#EF4444' }
      ];

      return {
        revenue: {
          daily: dailyRevenue,
          monthly: dailyRevenue.reduce((sum, day) => sum + day.value, 0),
          growth: 12.5
        },
        operations: {
          deliveries: 1247,
          onTimeRate: 94.8,
          averageDeliveryTime: 2.3,
          fuelEfficiency: 87.2
        },
        fleet: {
          utilization: 89.3,
          activeVehicles: 11,
          totalVehicles: 12,
          maintenanceCost: 28000
        },
        environmental: {
          co2Saved: 2847,
          fuelSaved: 1205,
          greenRoutes: 89,
          sustainabilityScore: 92
        },
        costs: costBreakdown,
        performance: performanceData
      };
    };

    setAnalyticsData(generateAnalyticsData());
  }, [selectedPeriod]);

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-purple-900 to-black">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity }
          }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    change: number;
    icon: React.ComponentType<any>;
    color: string;
    prefix?: string;
    suffix?: string;
  }> = ({ title, value, change, icon: Icon, color, prefix = '', suffix = '' }) => (
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
          className={`flex items-center gap-2 text-lg font-bold ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}
          whileHover={{ scale: 1.1 }}
        >
          {change >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          {Math.abs(change)}%
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
                🚀
              </motion.div>
              <motion.h2 
                className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                ANALYTICS FUTURISTA
              </motion.h2>
            </motion.div>
            <motion.p 
              className="text-gray-300 text-xl font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Dashboard de próxima generación con IA avanzada y métricas holográficas
            </motion.p>
          </div>

          <motion.div 
            className="flex items-center gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="px-8 py-4 bg-black/50 backdrop-blur-xl border border-white/30 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-purple-500/50 text-lg font-semibold"
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
              <option value="1y">Último año</option>
            </select>

            <motion.button 
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl text-white transition-all duration-300 shadow-2xl font-bold text-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className="w-6 h-6" />
              Actualizar
            </motion.button>

            <motion.button 
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-2xl text-white transition-all duration-300 shadow-2xl font-bold text-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-6 h-6" />
              Exportar
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
            title="Ingresos Mensuales"
            value={analyticsData.revenue.monthly}
            change={analyticsData.revenue.growth}
            icon={DollarSign}
            color="bg-gradient-to-br from-green-500 to-emerald-500"
            prefix="€"
          />
          
          <MetricCard
            title="Entregas Realizadas"
            value={analyticsData.operations.deliveries}
            change={8.3}
            icon={Package}
            color="bg-gradient-to-br from-blue-500 to-cyan-500"
          />
          
          <MetricCard
            title="Tasa de Puntualidad"
            value={analyticsData.operations.onTimeRate.toFixed(1)}
            change={2.1}
            icon={Clock}
            color="bg-gradient-to-br from-purple-500 to-pink-500"
            suffix="%"
          />
          
          <MetricCard
            title="Utilización de Flota"
            value={analyticsData.fleet.utilization.toFixed(1)}
            change={5.7}
            icon={Truck}
            color="bg-gradient-to-br from-orange-500 to-red-500"
            suffix="%"
          />
        </motion.div>

        {/* Gráficos principales */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          {/* Gráfico de ingresos diarios */}
          <motion.div 
            className="relative overflow-hidden rounded-3xl p-10 border border-white/20 backdrop-blur-2xl bg-black/30"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <motion.h3 
                  className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  💰 Ingresos Diarios
                </motion.h3>
                <div className="flex items-center gap-6 text-lg text-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span>Real</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                    <span>Objetivo</span>
                  </div>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart 
                  data={analyticsData.revenue.daily}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9CA3AF" 
                    tick={{ fontSize: 14 }}
                    axisLine={{ stroke: '#374151' }}
                    tickLine={{ stroke: '#374151' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    tick={{ fontSize: 14 }}
                    axisLine={{ stroke: '#374151' }}
                    tickLine={{ stroke: '#374151' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '16px',
                      color: '#fff',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 0 30px rgba(0,0,0,0.5)'
                    }}
                    cursor={{ fill: 'rgba(147, 51, 234, 0.1)' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="url(#barGradient)" 
                    radius={[12, 12, 0, 0]}
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    barSize={30}
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#6B7280" 
                    strokeDasharray="5 5"
                    strokeWidth={4}
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Gráfico de costos */}
          <motion.div 
            className="relative overflow-hidden rounded-3xl p-10 border border-white/20 backdrop-blur-2xl bg-black/30"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
            <div className="relative z-10">
              <motion.h3 
                className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-10"
                whileHover={{ scale: 1.05 }}
              >
                📊 Distribución de Costos
              </motion.h3>
              
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={analyticsData.costs}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={150}
                    paddingAngle={12}
                    dataKey="amount"
                    stroke="#1F2937"
                    strokeWidth={3}
                  >
                    {analyticsData.costs.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke="#1F2937"
                        strokeWidth={3}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '16px',
                      color: '#fff',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 0 30px rgba(0,0,0,0.5)'
                    }}
                    formatter={(value: number) => [`€${value.toLocaleString()}`, 'Costo']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>

        {/* Métricas ambientales */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
          <motion.div 
            className="relative overflow-hidden rounded-3xl p-8 border border-white/20 backdrop-blur-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-6 mb-6">
              <motion.div 
                className="p-4 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.8 }}
              >
                <Activity className="w-8 h-8 text-green-400" />
              </motion.div>
              <h4 className="font-black text-green-400 text-xl">CO₂ Ahorrado</h4>
            </div>
            <motion.div 
              className="text-4xl font-black text-white mb-3"
              whileHover={{ scale: 1.1 }}
            >
              {analyticsData.environmental.co2Saved.toLocaleString()} kg
            </motion.div>
            <div className="text-green-300 text-lg">
              Equivale a {Math.round(analyticsData.environmental.co2Saved / 22)} árboles plantados 🌳
            </div>
          </motion.div>

          <motion.div 
            className="relative overflow-hidden rounded-3xl p-8 border border-white/20 backdrop-blur-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-6 mb-6">
              <motion.div 
                className="p-4 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.8 }}
              >
                <Fuel className="w-8 h-8 text-blue-400" />
              </motion.div>
              <h4 className="font-black text-blue-400 text-xl">Combustible Ahorrado</h4>
            </div>
            <motion.div 
              className="text-4xl font-black text-white mb-3"
              whileHover={{ scale: 1.1 }}
            >
              {analyticsData.environmental.fuelSaved.toLocaleString()} L
            </motion.div>
            <div className="text-blue-300 text-lg">
              Ahorro de €{(analyticsData.environmental.fuelSaved * 1.45).toLocaleString()} ⛽
            </div>
          </motion.div>

          <motion.div 
            className="relative overflow-hidden rounded-3xl p-8 border border-white/20 backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-6 mb-6">
              <motion.div 
                className="p-4 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.8 }}
              >
                <MapPin className="w-8 h-8 text-purple-400" />
              </motion.div>
              <h4 className="font-black text-purple-400 text-xl">Rutas Verdes</h4>
            </div>
            <motion.div 
              className="text-4xl font-black text-white mb-3"
              whileHover={{ scale: 1.1 }}
            >
              {analyticsData.environmental.greenRoutes}%
            </motion.div>
            <div className="text-purple-300 text-lg">
              De todas las rutas optimizadas 🚗
            </div>
          </motion.div>

          <motion.div 
            className="relative overflow-hidden rounded-3xl p-8 border border-white/20 backdrop-blur-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-6 mb-6">
              <motion.div 
                className="p-4 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.8 }}
              >
                <Target className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <h4 className="font-black text-yellow-400 text-xl">Score Sostenibilidad</h4>
            </div>
            <motion.div 
              className="text-4xl font-black text-white mb-3"
              whileHover={{ scale: 1.1 }}
            >
              {analyticsData.environmental.sustainabilityScore}/100
            </motion.div>
            <div className="text-yellow-300 text-lg">
              Certificación A+ alcanzada 🏆
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessAnalyticsDashboard;
