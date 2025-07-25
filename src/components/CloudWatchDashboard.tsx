// src/components/CloudWatchDashboard.tsx
import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

interface CloudWatchMetric {
  timestamp: string;
  value: number;
}

export default function CloudWatchDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cpuData, setCpuData] = useState<CloudWatchMetric[]>([]);
  const [requestData, setRequestData] = useState<CloudWatchMetric[]>([]);

  useEffect(() => {
    // Generate initial data points
    const now = new Date();
    const initialCpuData: CloudWatchMetric[] = [];
    const initialRequestData: CloudWatchMetric[] = [];

    for (let i = 23; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60000); // Every minute
      initialCpuData.push({
        timestamp: timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        value: Math.random() * 40 + 30 // 30-70%
      });
      initialRequestData.push({
        timestamp: timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        value: Math.random() * 5000 + 8000 // 8000-13000 requests
      });
    }

    setCpuData(initialCpuData);
    setRequestData(initialRequestData);

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Update metrics every 30 seconds
    const metricsInterval = setInterval(() => {
      const newTimestamp = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      
      setCpuData(prev => [
        ...prev.slice(1),
        {
          timestamp: newTimestamp,
          value: Math.random() * 40 + 30
        }
      ]);

      setRequestData(prev => [
        ...prev.slice(1),
        {
          timestamp: newTimestamp,
          value: Math.random() * 5000 + 8000
        }
      ]);
    }, 30000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  const alerts = [
    {
      type: 'success',
      message: 'Auto-scaling triggered: +3 instances deployed',
      time: '14:32',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      type: 'warning',
      message: 'High memory usage detected in eu-west-1',
      time: '14:28',
      icon: <AlertTriangle className="w-4 h-4" />
    },
    {
      type: 'info',
      message: 'Deployment completed successfully in us-east-1',
      time: '14:25',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      type: 'success',
      message: 'Database failover completed in 2.3s',
      time: '14:20',
      icon: <Zap className="w-4 h-4" />
    }
  ];

  const renderMiniChart = (data: CloudWatchMetric[], color: string, label: string) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;

    return (
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-300 mb-3">{label}</h4>
        <div className="relative h-20">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            <g stroke="#374151" strokeWidth="0.5">
              <line x1="0" y1="20" x2="100%" y2="20" />
              <line x1="0" y1="40" x2="100%" y2="40" />
              <line x1="0" y1="60" x2="100%" y2="60" />
            </g>
            
            {/* Area chart */}
            <path
              d={`M 0 80 ${data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 80 - ((point.value - minValue) / range) * 60;
                return `L ${x} ${y}`;
              }).join(' ')} L 100 80 Z`}
              fill={`url(#gradient-${label})`}
            />
            
            {/* Line chart */}
            <path
              d={`M ${data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 80 - ((point.value - minValue) / range) * 60;
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}`}
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            
            {/* Data points */}
            {data.slice(-6).map((point, index) => {
              const x = ((data.length - 6 + index) / (data.length - 1)) * 100;
              const y = 80 - ((point.value - minValue) / range) * 60;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="2"
                  fill={color}
                  className="animate-pulse"
                />
              );
            })}
          </svg>
          
          {/* Current value */}
          <div className="absolute top-0 right-0 text-right">
            <div className={`text-lg font-bold`} style={{ color }}>
              {data[data.length - 1]?.value.toFixed(label.includes('CPU') ? 1 : 0)}
              {label.includes('CPU') ? '%' : ''}
            </div>
            <div className="text-xs text-gray-400">Actual</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-blue-900/20 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-blue-400" />
          AWS CloudWatch Dashboard
        </h3>
        <div className="text-right">
          <div className="text-blue-300 font-medium">
            {currentTime.toLocaleString('es-ES')}
          </div>
          <div className="text-gray-400 text-sm">Región: us-east-1, eu-west-1, ap-south-1</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">24</div>
          <div className="text-green-300 text-sm">Healthy Instances</div>
        </div>
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">47ms</div>
          <div className="text-blue-300 text-sm">Avg Response Time</div>
        </div>
        <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">12.8K</div>
          <div className="text-purple-300 text-sm">Requests/min</div>
        </div>
        <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">0</div>
          <div className="text-yellow-300 text-sm">Error Rate</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {renderMiniChart(cpuData, '#3B82F6', 'CPU Utilization (%)')}
        {renderMiniChart(requestData, '#10B981', 'Request Count')}
      </div>

      {/* Alerts and Events */}
      <div className="bg-gray-800/30 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-orange-400" />
          Eventos Recientes
        </h4>
        <div className="space-y-3 max-h-40 overflow-y-auto">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg transition-all hover:bg-gray-700/50 ${
                alert.type === 'success' 
                  ? 'bg-green-900/20 border-l-4 border-green-400' 
                  : alert.type === 'warning'
                  ? 'bg-yellow-900/20 border-l-4 border-yellow-400'
                  : 'bg-blue-900/20 border-l-4 border-blue-400'
              }`}
            >
              <div className={`mt-0.5 ${
                alert.type === 'success' 
                  ? 'text-green-400' 
                  : alert.type === 'warning'
                  ? 'text-yellow-400'
                  : 'text-blue-400'
              }`}>
                {alert.icon}
              </div>
              <div className="flex-1">
                <div className="text-white text-sm">{alert.message}</div>
                <div className="text-gray-400 text-xs mt-1">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Map */}
      <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4">Mapa de Servicios</h4>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="flex items-center gap-2 bg-green-900/30 px-3 py-2 rounded-lg border border-green-500/30">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-sm">Load Balancer</span>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center gap-2 bg-blue-900/30 px-3 py-2 rounded-lg border border-blue-500/30">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-300 text-sm">ECS Tasks (24)</span>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center gap-2 bg-purple-900/30 px-3 py-2 rounded-lg border border-purple-500/30">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 text-sm">RDS Cluster</span>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center gap-2 bg-yellow-900/30 px-3 py-2 rounded-lg border border-yellow-500/30">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-300 text-sm">Redis Cache</span>
          </div>
        </div>
      </div>
    </div>
  );
}
