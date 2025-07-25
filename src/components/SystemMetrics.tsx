// src/components/SystemMetrics.tsx
import React, { useState, useEffect } from 'react';
import { Activity, Server, Database, Zap, Globe, Shield } from 'lucide-react';

interface SystemHealth {
  cpu: number;
  memory: number;
  network: number;
  database: number;
  response_time: number;
  uptime: number;
}

export default function SystemMetrics() {
  const [metrics, setMetrics] = useState<SystemHealth>({
    cpu: 65,
    memory: 42,
    network: 78,
    database: 32,
    response_time: 47,
    uptime: 99.98
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(20, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(15, Math.min(85, prev.memory + (Math.random() - 0.5) * 8)),
        network: Math.max(30, Math.min(95, prev.network + (Math.random() - 0.5) * 15)),
        database: Math.max(10, Math.min(70, prev.database + (Math.random() - 0.5) * 12)),
        response_time: Math.max(25, Math.min(200, prev.response_time + (Math.random() - 0.5) * 20)),
        uptime: Math.max(99.90, Math.min(99.99, prev.uptime + (Math.random() - 0.5) * 0.02))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getStatusColor = (value: number, type: 'percentage' | 'response' | 'uptime' = 'percentage') => {
    if (type === 'response') {
      return value < 50 ? 'text-green-400' : value < 100 ? 'text-yellow-400' : 'text-red-400';
    }
    if (type === 'uptime') {
      return value > 99.95 ? 'text-green-400' : value > 99.90 ? 'text-yellow-400' : 'text-red-400';
    }
    return value < 70 ? 'text-green-400' : value < 85 ? 'text-yellow-400' : 'text-red-400';
  };

  const getProgressColor = (value: number, type: 'percentage' | 'response' | 'uptime' = 'percentage') => {
    if (type === 'response') {
      return value < 50 ? 'bg-green-400' : value < 100 ? 'bg-yellow-400' : 'bg-red-400';
    }
    if (type === 'uptime') {
      return value > 99.95 ? 'bg-green-400' : value > 99.90 ? 'bg-yellow-400' : 'bg-red-400';
    }
    return value < 70 ? 'bg-green-400' : value < 85 ? 'bg-yellow-400' : 'bg-red-400';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <Activity className="w-6 h-6 mr-2 text-green-400" />
          Sistema en Vivo
        </h3>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              isLive 
                ? 'bg-green-900 text-green-300 hover:bg-green-800' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {isLive ? 'EN VIVO' : 'PAUSADO'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CPU Usage */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Server className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-gray-300 font-medium">CPU</span>
            </div>
            <span className={`font-bold ${getStatusColor(metrics.cpu)}`}>
              {metrics.cpu.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(metrics.cpu)}`}
              style={{ width: `${metrics.cpu}%` }}
            ></div>
          </div>
        </div>

        {/* Memory Usage */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Database className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-gray-300 font-medium">Memoria</span>
            </div>
            <span className={`font-bold ${getStatusColor(metrics.memory)}`}>
              {metrics.memory.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(metrics.memory)}`}
              style={{ width: `${metrics.memory}%` }}
            ></div>
          </div>
        </div>

        {/* Network Usage */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-gray-300 font-medium">Red</span>
            </div>
            <span className={`font-bold ${getStatusColor(metrics.network)}`}>
              {metrics.network.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(metrics.network)}`}
              style={{ width: `${metrics.network}%` }}
            ></div>
          </div>
        </div>

        {/* Database Load */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Database className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-gray-300 font-medium">BD Load</span>
            </div>
            <span className={`font-bold ${getStatusColor(metrics.database)}`}>
              {metrics.database.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(metrics.database)}`}
              style={{ width: `${metrics.database}%` }}
            ></div>
          </div>
        </div>

        {/* Response Time */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Zap className="w-5 h-5 text-orange-400 mr-2" />
              <span className="text-gray-300 font-medium">Latencia</span>
            </div>
            <span className={`font-bold ${getStatusColor(metrics.response_time, 'response')}`}>
              {metrics.response_time.toFixed(0)}ms
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(metrics.response_time, 'response')}`}
              style={{ width: `${Math.min(100, metrics.response_time / 2)}%` }}
            ></div>
          </div>
        </div>

        {/* Uptime */}
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-cyan-400 mr-2" />
              <span className="text-gray-300 font-medium">Uptime</span>
            </div>
            <span className={`font-bold ${getStatusColor(metrics.uptime, 'uptime')}`}>
              {metrics.uptime.toFixed(2)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(metrics.uptime, 'uptime')}`}
              style={{ width: `${(metrics.uptime - 99) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3">
          <div className="text-green-400 font-bold text-lg">24 Instancias</div>
          <div className="text-green-300 text-sm">Activas en ECS</div>
        </div>
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
          <div className="text-blue-400 font-bold text-lg">3 Regiones</div>
          <div className="text-blue-300 text-sm">AWS Multi-AZ</div>
        </div>
        <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3">
          <div className="text-purple-400 font-bold text-lg">Auto-Scale</div>
          <div className="text-purple-300 text-sm">Activo 24/7</div>
        </div>
      </div>
    </div>
  );
}
