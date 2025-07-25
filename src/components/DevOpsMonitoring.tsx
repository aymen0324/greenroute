// src/components/DevOpsMonitoring.tsx
import React, { useState, useEffect } from 'react';
import { 
  Server, Activity, AlertTriangle, CheckCircle, 
  Cpu, HardDrive, Wifi, Database, Cloud, Monitor 
} from 'lucide-react';

interface SystemHealth {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  latency: number;
  throughput: number;
}

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  responseTime: number;
  requests: number;
}

export default function DevOpsMonitoring() {
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    cpu: 23.4,
    memory: 67.8,
    disk: 45.2,
    network: 89.3,
    latency: 12.5,
    throughput: 1247
  });

  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: 'API Gateway',
      status: 'healthy',
      uptime: 99.98,
      responseTime: 45,
      requests: 15420
    },
    {
      name: 'ML Engine',
      status: 'healthy',
      uptime: 99.95,
      responseTime: 234,
      requests: 8750
    },
    {
      name: 'Route Optimizer',
      status: 'warning',
      uptime: 98.2,
      responseTime: 567,
      requests: 12340
    },
    {
      name: 'Blockchain Node',
      status: 'healthy',
      uptime: 99.99,
      responseTime: 123,
      requests: 5670
    }
  ]);

  const [deploymentStats, setDeploymentStats] = useState({
    totalDeployments: 247,
    successRate: 98.4,
    avgDeployTime: 4.2,
    rollbacks: 4,
    lastDeploy: '2 hours ago'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 5)),
        memory: Math.max(40, Math.min(85, prev.memory + (Math.random() - 0.5) * 3)),
        disk: Math.max(30, Math.min(70, prev.disk + (Math.random() - 0.5) * 2)),
        network: Math.max(70, Math.min(99, prev.network + (Math.random() - 0.5) * 2)),
        latency: Math.max(8, Math.min(50, prev.latency + (Math.random() - 0.5) * 3)),
        throughput: Math.max(800, Math.min(2000, prev.throughput + (Math.random() - 0.5) * 100))
      }));

      setServices(prev => prev.map(service => ({
        ...service,
        responseTime: Math.max(20, Math.min(800, service.responseTime + (Math.random() - 0.5) * 50)),
        requests: service.requests + Math.floor(Math.random() * 20)
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-900/30';
      case 'warning': return 'text-yellow-400 bg-yellow-900/30';
      case 'critical': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getHealthColor = (value: number, reverse = false) => {
    if (reverse) {
      if (value < 30) return 'from-green-500 to-emerald-500';
      if (value < 60) return 'from-yellow-500 to-orange-500';
      return 'from-red-500 to-pink-500';
    } else {
      if (value > 90) return 'from-green-500 to-emerald-500';
      if (value > 70) return 'from-yellow-500 to-orange-500';
      return 'from-red-500 to-pink-500';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-gray-900/60 backdrop-blur-sm border border-gray-400/30 rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Server className="w-8 h-8 text-cyan-400" />
            DevOps & Monitoring
          </h2>
          <p className="text-gray-300 mt-2">AWS ECS + Kubernetes | CI/CD Pipeline | Prometheus + Grafana</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">{deploymentStats.successRate}%</div>
          <div className="text-gray-400 text-sm">Deploy Success Rate</div>
        </div>
      </div>

      {/* System Health Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <div className="bg-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-semibold">CPU</span>
          </div>
          <div className="text-xl font-bold text-white mb-2">{systemHealth.cpu.toFixed(1)}%</div>
          <div className="bg-slate-600 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${getHealthColor(systemHealth.cpu, true)} h-2 rounded-full transition-all duration-1000`}
              style={{ width: `${systemHealth.cpu}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm font-semibold">Memory</span>
          </div>
          <div className="text-xl font-bold text-white mb-2">{systemHealth.memory.toFixed(1)}%</div>
          <div className="bg-slate-600 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${getHealthColor(systemHealth.memory, true)} h-2 rounded-full transition-all duration-1000`}
              style={{ width: `${systemHealth.memory}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <HardDrive className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-semibold">Disk</span>
          </div>
          <div className="text-xl font-bold text-white mb-2">{systemHealth.disk.toFixed(1)}%</div>
          <div className="bg-slate-600 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${getHealthColor(systemHealth.disk, true)} h-2 rounded-full transition-all duration-1000`}
              style={{ width: `${systemHealth.disk}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wifi className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-semibold">Network</span>
          </div>
          <div className="text-xl font-bold text-white mb-2">{systemHealth.network.toFixed(1)}%</div>
          <div className="bg-slate-600 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${getHealthColor(systemHealth.network)} h-2 rounded-full transition-all duration-1000`}
              style={{ width: `${systemHealth.network}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-semibold">Latency</span>
          </div>
          <div className="text-xl font-bold text-white mb-2">{systemHealth.latency.toFixed(1)}ms</div>
          <div className="bg-slate-600 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${getHealthColor(systemHealth.latency, true)} h-2 rounded-full transition-all duration-1000`}
              style={{ width: `${Math.min(100, systemHealth.latency * 2)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-semibold">Throughput</span>
          </div>
          <div className="text-xl font-bold text-white mb-2">{systemHealth.throughput}</div>
          <div className="text-xs text-gray-400">req/min</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Services Status */}
        <div className="bg-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-400" />
            Microservicios Status
          </h3>
          <div className="space-y-3">
            {services.map((service, index) => (
              <div key={index} className="bg-slate-600/50 rounded-lg p-4 border border-slate-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-semibold">{service.name}</div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(service.status)}`}>
                    {service.status === 'healthy' && <CheckCircle className="w-3 h-3" />}
                    {service.status === 'warning' && <AlertTriangle className="w-3 h-3" />}
                    {service.status === 'critical' && <AlertTriangle className="w-3 h-3" />}
                    {service.status}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Uptime</div>
                    <div className="text-green-400 font-semibold">{service.uptime}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Response</div>
                    <div className="text-blue-400 font-semibold">{service.responseTime}ms</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Requests</div>
                    <div className="text-purple-400 font-semibold">{service.requests.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Pipeline */}
        <div className="bg-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-green-400" />
            CI/CD Pipeline
          </h3>
          
          <div className="space-y-4">
            <div className="bg-slate-600/50 rounded-lg p-4 border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="text-green-400 font-semibold">✅ Build & Test</div>
                <div className="text-green-400 text-sm">2.3 min</div>
              </div>
              <div className="text-gray-300 text-sm">
                Jest + Cypress | ESLint + Prettier | Docker Build
              </div>
            </div>

            <div className="bg-slate-600/50 rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="text-blue-400 font-semibold">🚀 Deploy to Staging</div>
                <div className="text-blue-400 text-sm">1.8 min</div>
              </div>
              <div className="text-gray-300 text-sm">
                AWS ECS Fargate | Auto-scaling enabled
              </div>
            </div>

            <div className="bg-slate-600/50 rounded-lg p-4 border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="text-purple-400 font-semibold">🔍 Integration Tests</div>
                <div className="text-purple-400 text-sm">45 sec</div>
              </div>
              <div className="text-gray-300 text-sm">
                API Tests | Performance Tests | Security Scan
              </div>
            </div>

            <div className="bg-slate-600/50 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="text-yellow-400 font-semibold">📊 Production Deploy</div>
                <div className="text-yellow-400 text-sm">Blue/Green</div>
              </div>
              <div className="text-gray-300 text-sm">
                Zero-downtime deployment | Health checks
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{deploymentStats.totalDeployments}</div>
              <div className="text-gray-400 text-sm">Total Deployments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{deploymentStats.avgDeployTime} min</div>
              <div className="text-gray-400 text-sm">Avg Deploy Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure Overview */}
      <div className="mt-8 bg-slate-700/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Cloud className="w-5 h-5 text-cyan-400" />
          Arquitectura de Infraestructura
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-4 mb-3">
              <div className="text-white font-bold text-lg">AWS ECS</div>
              <div className="text-orange-200 text-sm">Container Orchestration</div>
            </div>
            <div className="text-xs text-gray-300">
              • Fargate serverless<br/>
              • Auto-scaling groups<br/>
              • Service mesh
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-4 mb-3">
              <div className="text-white font-bold text-lg">Kubernetes</div>
              <div className="text-blue-200 text-sm">Orchestration</div>
            </div>
            <div className="text-xs text-gray-300">
              • Helm charts<br/>
              • Horizontal Pod Autoscaler<br/>
              • Ingress controllers
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-4 mb-3">
              <div className="text-white font-bold text-lg">Prometheus</div>
              <div className="text-green-200 text-sm">Monitoring</div>
            </div>
            <div className="text-xs text-gray-300">
              • Metrics collection<br/>
              • Alertmanager<br/>
              • Custom dashboards
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 mb-3">
              <div className="text-white font-bold text-lg">Terraform</div>
              <div className="text-purple-200 text-sm">IaC</div>
            </div>
            <div className="text-xs text-gray-300">
              • Infrastructure as Code<br/>
              • Multi-environment<br/>
              • State management
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3">
          <Monitor className="w-5 h-5" />
          Ver Dashboard Completo
        </button>
      </div>
    </div>
  );
}
