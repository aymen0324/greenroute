// src/components/ArchitectureDiagram.tsx
import React, { useState, useEffect } from 'react';
import { 
  Database, Server, Cloud, Cpu, Network, 
  Shield, Brain, Zap, Globe, Activity
} from 'lucide-react';

export default function ArchitectureDiagram() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [connectionPulse, setConnectionPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionPulse(prev => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const layers = [
    {
      id: 'frontend',
      name: 'Frontend Layer',
      description: 'React 18 + TypeScript + Tailwind CSS',
      icon: Globe,
      color: 'blue',
      position: { top: '10%', left: '20%' },
      technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    },
    {
      id: 'api',
      name: 'API Gateway',
      description: 'Load Balancer + Rate Limiting',
      icon: Network,
      color: 'green',
      position: { top: '10%', left: '50%' },
      technologies: ['AWS API Gateway', 'Rate Limiting', 'CORS', 'JWT Auth']
    },
    {
      id: 'microservices',
      name: 'Microservices',
      description: 'Dockerized services on ECS',
      icon: Server,
      color: 'purple',
      position: { top: '30%', left: '35%' },
      technologies: ['Node.js', 'Python FastAPI', 'Docker', 'ECS Fargate']
    },
    {
      id: 'ml',
      name: 'ML Engine',
      description: 'TensorFlow + PyTorch models',
      icon: Brain,
      color: 'pink',
      position: { top: '30%', left: '65%' },
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'CUDA']
    },
    {
      id: 'blockchain',
      name: 'Blockchain Node',
      description: 'Ethereum + Smart Contracts',
      icon: Shield,
      color: 'yellow',
      position: { top: '50%', left: '20%' },
      technologies: ['Ethereum', 'Solidity', 'Web3.js', 'IPFS']
    },
    {
      id: 'database',
      name: 'Database Cluster',
      description: 'PostgreSQL + Redis Cache',
      icon: Database,
      color: 'cyan',
      position: { top: '70%', left: '35%' },
      technologies: ['PostgreSQL', 'Redis', 'MongoDB', 'Elasticsearch']
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      description: 'Prometheus + Grafana + ELK',
      icon: Activity,
      color: 'orange',
      position: { top: '70%', left: '65%' },
      technologies: ['Prometheus', 'Grafana', 'ELK Stack', 'Jaeger']
    },
    {
      id: 'infrastructure',
      name: 'Cloud Infrastructure',
      description: 'AWS Multi-AZ deployment',
      icon: Cloud,
      color: 'indigo',
      position: { top: '90%', left: '50%' },
      technologies: ['AWS ECS', 'RDS', 'ElastiCache', 'CloudWatch']
    }
  ];

  const connections = [
    { from: 'frontend', to: 'api' },
    { from: 'api', to: 'microservices' },
    { from: 'api', to: 'ml' },
    { from: 'microservices', to: 'blockchain' },
    { from: 'microservices', to: 'database' },
    { from: 'ml', to: 'database' },
    { from: 'database', to: 'monitoring' },
    { from: 'ml', to: 'monitoring' },
    { from: 'infrastructure', to: 'database' },
    { from: 'infrastructure', to: 'monitoring' }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/60 backdrop-blur-sm border border-purple-400/30 rounded-3xl p-8 relative overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <Cpu className="w-8 h-8 text-purple-400" />
          Arquitectura del Sistema
        </h2>
        <p className="text-purple-200 mt-2">Microservicios + Cloud Native + AI/ML Pipeline</p>
      </div>

      {/* Architecture Diagram */}
      <div className="relative h-96 mb-8 bg-slate-800/30 rounded-2xl p-6">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#6366f1" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((conn, index) => {
            const fromLayer = layers.find(l => l.id === conn.from);
            const toLayer = layers.find(l => l.id === conn.to);
            if (!fromLayer || !toLayer) return null;

            const fromX = parseFloat(fromLayer.position.left) + 10;
            const fromY = parseFloat(fromLayer.position.top) + 5;
            const toX = parseFloat(toLayer.position.left) + 10;
            const toY = parseFloat(toLayer.position.top) + 5;

            return (
              <line
                key={index}
                x1={`${fromX}%`}
                y1={`${fromY}%`}
                x2={`${toX}%`}
                y2={`${toY}%`}
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="5,5"
                className={`transition-all duration-1000 ${
                  connectionPulse === index % 4 ? 'opacity-100' : 'opacity-30'
                }`}
              />
            );
          })}
        </svg>

        {/* Architecture Nodes */}
        {layers.map((layer) => {
          const Icon = layer.icon;
          return (
            <div
              key={layer.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                activeLayer === layer.id ? 'scale-110 z-20' : 'hover:scale-105 z-10'
              }`}
              style={{
                top: layer.position.top,
                left: layer.position.left,
              }}
              onMouseEnter={() => setActiveLayer(layer.id)}
              onMouseLeave={() => setActiveLayer(null)}
            >
              <div className={`bg-gradient-to-br from-${layer.color}-600 to-${layer.color}-800 rounded-xl p-4 border border-${layer.color}-400/50 shadow-xl min-w-24 text-center`}>
                <Icon className={`w-8 h-8 text-${layer.color}-200 mx-auto mb-2`} />
                <div className="text-white font-semibold text-sm">{layer.name}</div>
                <div className={`text-${layer.color}-200 text-xs mt-1`}>{layer.description}</div>
                
                {/* Tooltip */}
                {activeLayer === layer.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-slate-800 rounded-lg p-3 border border-gray-600 shadow-xl z-30 min-w-48">
                    <div className="text-white font-semibold mb-2">{layer.name}</div>
                    <div className="space-y-1">
                      {layer.technologies.map((tech, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-2 h-2 bg-${layer.color}-400 rounded-full`}></div>
                          <span className="text-gray-300 text-xs">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Data Flow Indicators */}
        <div className="absolute top-4 right-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-sm">Data Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-500"></div>
            <span className="text-blue-300 text-sm">API Calls</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
            <span className="text-purple-300 text-sm">ML Pipeline</span>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-700/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Performance
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Latencia API:</span>
              <span className="text-yellow-400 font-semibold">&lt; 50ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Throughput:</span>
              <span className="text-yellow-400 font-semibold">10K req/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Uptime SLA:</span>
              <span className="text-yellow-400 font-semibold">99.9%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            Security
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Encryption:</span>
              <span className="text-green-400 font-semibold">AES-256</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Auth:</span>
              <span className="text-green-400 font-semibold">JWT + OAuth2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Compliance:</span>
              <span className="text-green-400 font-semibold">ISO 27001</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-400" />
            Scalability
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Auto-scaling:</span>
              <span className="text-blue-400 font-semibold">Horizontal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Load Balancer:</span>
              <span className="text-blue-400 font-semibold">AWS ALB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Multi-AZ:</span>
              <span className="text-blue-400 font-semibold">3 Zones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
