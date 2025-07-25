// src/components/EcoMetricsLive.tsx
import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  TrendingDown, 
  Zap, 
  Globe, 
  BarChart3, 
  Award,
  Target,
  Activity,
  Gauge,
  TreePine
} from 'lucide-react';

interface EcoMetric {
  id: string;
  value: number;
  label: string;
  unit: string;
  trend: number;
  icon: React.ReactNode;
  color: string;
  target: number;
}

export default function EcoMetricsLive() {
  const [metrics, setMetrics] = useState<EcoMetric[]>([
    {
      id: 'co2_saved',
      value: 450,
      label: 'CO₂ Evitado Hoy',
      unit: 'kg',
      trend: 12.5,
      icon: <Leaf className="w-6 h-6" />,
      color: 'green',
      target: 500
    },
    {
      id: 'fuel_saved',
      value: 1200,
      label: 'Combustible Ahorrado',
      unit: 'L',
      trend: 8.3,
      icon: <Zap className="w-6 h-6" />,
      color: 'blue',
      target: 1500
    },
    {
      id: 'efficiency',
      value: 92,
      label: 'Eficiencia Energética',
      unit: '%',
      trend: 3.2,
      icon: <Gauge className="w-6 h-6" />,
      color: 'purple',
      target: 95
    },
    {
      id: 'eco_routes',
      value: 85,
      label: 'Rutas Eco-Optimizadas',
      unit: '%',
      trend: 5.7,
      icon: <Globe className="w-6 h-6" />,
      color: 'emerald',
      target: 90
    },
    {
      id: 'trees_equivalent',
      value: 28,
      label: 'Árboles Equivalentes',
      unit: 'und',
      trend: 15.2,
      icon: <TreePine className="w-6 h-6" />,
      color: 'green',
      target: 35
    },
    {
      id: 'carbon_score',
      value: 9.2,
      label: 'Puntuación Carbono',
      unit: '/10',
      trend: 4.1,
      icon: <Award className="w-6 h-6" />,
      color: 'yellow',
      target: 10
    }
  ]);

  const [globalStats, setGlobalStats] = useState({
    totalUsers: 15420,
    totalCO2Saved: 125.8,
    countriesActive: 23,
    ecoFleets: 847
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setMetrics(prev => 
        prev.map(metric => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * (metric.value * 0.02),
          trend: metric.trend + (Math.random() - 0.5) * 2
        }))
      );

      setGlobalStats(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 5),
        totalCO2Saved: prev.totalCO2Saved + (Math.random() * 0.1),
        countriesActive: prev.countriesActive,
        ecoFleets: prev.ecoFleets + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'from-green-500 to-emerald-600 border-green-500/30 text-green-100',
      blue: 'from-blue-500 to-cyan-600 border-blue-500/30 text-blue-100',
      purple: 'from-purple-500 to-violet-600 border-purple-500/30 text-purple-100',
      emerald: 'from-emerald-500 to-teal-600 border-emerald-500/30 text-emerald-100',
      yellow: 'from-yellow-500 to-orange-600 border-yellow-500/30 text-yellow-100'
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  const getProgressColor = (color: string) => {
    const colors = {
      green: 'bg-green-400',
      blue: 'bg-blue-400',
      purple: 'bg-purple-400',
      emerald: 'bg-emerald-400',
      yellow: 'bg-yellow-400'
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <div className="space-y-8">
      {/* Header with Live Status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center mb-2">
            <Activity className="w-8 h-8 mr-3 text-green-400" />
            Métricas Eco en Vivo
          </h2>
          <p className="text-gray-300">Impacto ambiental en tiempo real de la red GreenRoute</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-green-300 font-medium">
              {isLive ? 'EN VIVO' : 'PAUSADO'}
            </span>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isLive 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-gray-200'
            }`}
          >
            {isLive ? 'Pausar' : 'Reanudar'}
          </button>
        </div>
      </div>

      {/* Global Impact Stats */}
      <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-2xl p-6 border border-green-500/30">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-green-400" />
          Impacto Global Hoy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {globalStats.totalUsers.toLocaleString()}
            </div>
            <div className="text-green-200 text-sm">Usuarios Activos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">
              {globalStats.totalCO2Saved.toFixed(1)}T
            </div>
            <div className="text-blue-200 text-sm">CO₂ Total Ahorrado</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">
              {globalStats.countriesActive}
            </div>
            <div className="text-purple-200 text-sm">Países Activos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {globalStats.ecoFleets}
            </div>
            <div className="text-yellow-200 text-sm">Flotas Eco</div>
          </div>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className={`bg-gradient-to-br ${getColorClasses(metric.color)} rounded-xl p-6 border transition-all duration-500 hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-white/80">
                {metric.icon}
              </div>
              <div className={`text-sm font-medium ${
                metric.trend > 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                {metric.trend > 0 ? '+' : ''}{metric.trend.toFixed(1)}%
              </div>
            </div>
            
            <div className="mb-3">
              <div className="text-3xl font-bold text-white mb-1">
                {metric.unit === '%' || metric.unit === '/10' 
                  ? metric.value.toFixed(1) 
                  : Math.round(metric.value).toLocaleString()
                }
                <span className="text-lg font-normal ml-1">{metric.unit}</span>
              </div>
              <div className="text-white/80 text-sm">{metric.label}</div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(metric.color)}`}
                  style={{ 
                    width: `${Math.min(100, (metric.value / metric.target) * 100)}%` 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-white/60 mt-1">
                <span>0</span>
                <span>Meta: {metric.target}{metric.unit}</span>
              </div>
            </div>

            {/* Achievement Badge */}
            {metric.value >= metric.target * 0.9 && (
              <div className="flex items-center justify-center bg-white/20 rounded-lg py-2">
                <Target className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">Cerca de la meta</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Efficiency Breakdown */}
      <div className="bg-gradient-to-br from-gray-900 to-green-900/20 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
          Desglose de Eficiencia por Hora
        </h3>
        
        <div className="grid grid-cols-12 gap-2 mb-4">
          {Array.from({ length: 24 }, (_, i) => {
            const hour = i;
            const efficiency = 60 + Math.sin(i * 0.5) * 30 + Math.random() * 10;
            const height = (efficiency / 100) * 100;
            
            return (
              <div key={hour} className="flex flex-col items-center">
                <div className="w-full bg-gray-700 rounded-t h-16 flex items-end">
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t transition-all duration-1000"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {hour.toString().padStart(2, '0')}h
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center text-gray-400 text-sm">
          Eficiencia promedio: <span className="text-green-400 font-bold">78.5%</span> (↑ 5.2% vs ayer)
        </div>
      </div>

      {/* Environmental Achievements */}
      <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-2xl p-6 border border-green-500/30">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Award className="w-5 h-5 mr-2 text-yellow-400" />
          Logros Ambientales de Hoy
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-800/50 rounded-lg p-4 text-center border border-green-600/30">
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-green-400 font-bold">Carbon Neutral</div>
            <div className="text-green-200 text-sm">Alcanzado a las 14:30</div>
          </div>
          
          <div className="bg-blue-800/50 rounded-lg p-4 text-center border border-blue-600/30">
            <div className="text-2xl mb-2">💧</div>
            <div className="text-blue-400 font-bold">Water Saver</div>
            <div className="text-blue-200 text-sm">500L agua ahorrada</div>
          </div>
          
          <div className="bg-purple-800/50 rounded-lg p-4 text-center border border-purple-600/30">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-purple-400 font-bold">Energy Star</div>
            <div className="text-purple-200 text-sm">95% eficiencia energética</div>
          </div>
          
          <div className="bg-yellow-800/50 rounded-lg p-4 text-center border border-yellow-600/30">
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-yellow-400 font-bold">Eco Champion</div>
            <div className="text-yellow-200 text-sm">Meta diaria superada</div>
          </div>
        </div>
      </div>
    </div>
  );
}
