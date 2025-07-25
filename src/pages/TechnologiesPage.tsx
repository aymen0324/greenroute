// src/pages/TechnologiesPage.tsx
import React from 'react';
import { ArrowLeft, Zap, Brain, Shield, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MLPredictionEngine from '../components/MLPredictionEngine';
import BlockchainIntegration from '../components/BlockchainIntegration';
import DevOpsMonitoring from '../components/DevOpsMonitoring';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

export default function TechnologiesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Header */}
      <div className="relative z-10 p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-purple-300 hover:text-purple-200 transition-colors group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          <span className="text-lg font-medium">Volver al Dashboard</span>
        </button>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full px-6 py-3 mb-6">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-purple-300 font-semibold">Stack Tecnológico Enterprise</span>
            <Brain className="w-4 h-4 text-purple-400" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Tecnologías de
            </span>
            <br />
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent text-4xl md:text-5xl">
              Vanguardia Implementadas
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-200 max-w-4xl mx-auto leading-relaxed mb-8">
            Implementación completa de <span className="text-yellow-400 font-bold">Machine Learning</span>, 
            <span className="text-green-400 font-bold"> Blockchain</span> y 
            <span className="text-cyan-400 font-bold"> DevOps avanzado</span> para demostrar competencias de nivel senior
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/60 rounded-2xl p-6 border border-purple-400/30">
              <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Machine Learning</h3>
              <p className="text-purple-200 text-sm">TensorFlow, PyTorch, Modelos predictivos, Redes neuronales</p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/60 rounded-2xl p-6 border border-indigo-400/30">
              <Shield className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Blockchain</h3>
              <p className="text-indigo-200 text-sm">Ethereum, Smart Contracts, Web3, DeFi protocols</p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-900/40 to-teal-900/60 rounded-2xl p-6 border border-cyan-400/30">
              <Server className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">DevOps</h3>
              <p className="text-cyan-200 text-sm">AWS, Kubernetes, CI/CD, Microservicios, Monitoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Sections */}
      <div className="relative z-10 px-6 space-y-12">
        {/* Architecture Diagram */}
        <div className="max-w-7xl mx-auto">
          <ArchitectureDiagram />
        </div>

        {/* Machine Learning Engine */}
        <div className="max-w-7xl mx-auto">
          <MLPredictionEngine />
        </div>

        {/* Blockchain Integration */}
        <div className="max-w-7xl mx-auto">
          <BlockchainIntegration />
        </div>

        {/* DevOps Monitoring */}
        <div className="max-w-7xl mx-auto">
          <DevOpsMonitoring />
        </div>

        {/* Skills Showcase */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/80 to-gray-900/60 backdrop-blur-sm border border-gray-400/30 rounded-3xl p-8">
            <h2 className="text-4xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Competencias Técnicas Demostradas
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  category: "Frontend Avanzado",
                  skills: ["React 18 + Hooks", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design", "Performance Optimization"],
                  color: "blue"
                },
                {
                  category: "Backend & APIs",
                  skills: ["Node.js", "Python", "RESTful APIs", "GraphQL", "Microservicios", "Database Design"],
                  color: "green"
                },
                {
                  category: "Cloud & DevOps",
                  skills: ["AWS (ECS, Lambda)", "Docker & Kubernetes", "CI/CD Pipelines", "Terraform", "Prometheus", "Grafana"],
                  color: "purple"
                },
                {
                  category: "Emerging Tech",
                  skills: ["Machine Learning", "Blockchain/Web3", "IoT Integration", "Real-time Systems", "Data Analytics", "AI/ML Models"],
                  color: "yellow"
                }
              ].map((skillSet, index) => (
                <div key={index} className={`bg-gradient-to-br from-${skillSet.color}-900/40 to-${skillSet.color}-800/60 rounded-2xl p-6 border border-${skillSet.color}-400/30`}>
                  <h3 className={`text-xl font-bold text-${skillSet.color}-300 mb-4`}>{skillSet.category}</h3>
                  <ul className="space-y-2">
                    {skillSet.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center gap-2">
                        <div className={`w-2 h-2 bg-${skillSet.color}-400 rounded-full`}></div>
                        <span className="text-gray-300 text-sm">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CV Impact Statement */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-800/80 to-emerald-900/60 backdrop-blur-sm border border-green-400/30 rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Proyecto Portfolio de Nivel Senior
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-400 mb-2">15+</div>
                <div className="text-green-200 text-sm">Tecnologías implementadas</div>
              </div>
              <div className="bg-green-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-400 mb-2">3K+</div>
                <div className="text-green-200 text-sm">Líneas de código</div>
              </div>
              <div className="bg-green-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-green-200 text-sm">Funcional y deployable</div>
              </div>
            </div>
            
            <p className="text-xl text-green-100 mb-6 leading-relaxed">
              Este proyecto demuestra <span className="text-yellow-400 font-bold">competencias de nivel senior</span> en 
              desarrollo full-stack, arquitectura de sistemas, y tecnologías emergentes. 
              Perfecto para destacar en el CV de un <span className="text-green-400 font-bold">Ingeniero Informático UMH</span>.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://github.com/aymen0324/greenroute', '_blank')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 justify-center"
              >
                Ver Código en GitHub
              </button>
              <button className="border-2 border-green-400 hover:bg-green-400/10 text-green-300 hover:text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 flex items-center gap-3 justify-center">
                Documentación Técnica
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}
