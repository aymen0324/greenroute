import React from "react";
import { Leaf, Map, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Features() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-6xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full px-6 py-2 mb-8">
            <span className="text-green-300 font-medium">Nueva Generación de Logística Inteligente</span>
            <ArrowRight className="w-4 h-4 text-green-400" />
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              El futuro de la
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              logística verde.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            IA avanzada, escalabilidad enterprise y sostenibilidad real.
            <br />
            <span className="text-green-400">Revoluciona tu logística</span> con tecnología de vanguardia.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => navigate('/eficiencia-verde')}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-2xl hover:scale-105 flex items-center gap-3"
            >
              Ver Demo en Vivo
            </button>
            <button 
              onClick={() => navigate('/tecnologias-avanzadas')}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-2xl hover:scale-105 flex items-center gap-3"
            >
              🚀 Stack Tecnológico
            </button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">2.8M</div>
              <div className="text-gray-400 text-sm">Toneladas CO₂ evitadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">99.98%</div>
              <div className="text-gray-400 text-sm">Uptime garantizado</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">&lt; 50ms</div>
              <div className="text-gray-400 text-sm">Latencia global</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">15K+</div>
              <div className="text-gray-400 text-sm">Empresas confiaron</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Diseñado para
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                el rendimiento.
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Cada característica está meticulosamente diseñada para ofrecer 
              la máxima eficiencia, sostenibilidad y escalabilidad.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div 
              onClick={() => navigate('/eficiencia-verde')}
              className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-2xl p-8 border border-green-500/30 cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Eficiencia Verde</h3>
              <p className="text-gray-300 mb-6">
                IA avanzada que reduce automáticamente el consumo de combustible 
                y las emisiones gracias a rutas optimizadas con machine learning.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-gray-300 text-sm">30% menos CO₂</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-gray-300 text-sm">18% ahorro combustible</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-gray-300 text-sm">ISO 14001 certificado</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-green-400 font-semibold">
                Explorar Eficiencia Verde
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => navigate('/rutas-optimizadas')}
              className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-2xl p-8 border border-blue-500/30 cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-400 to-cyan-600 flex items-center justify-center mb-6">
                <Map className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Optimización de Rutas</h3>
              <p className="text-gray-300 mb-6">
                Algoritmos en tiempo real con IA que encuentran siempre el camino 
                más eficiente, analizando tráfico, clima y 50+ variables.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-gray-300 text-sm">15% tiempo ahorrado</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-gray-300 text-sm">99.9% entregas a tiempo</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-gray-300 text-sm">Real-time updates</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-blue-400 font-semibold">
                Explorar Optimización
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => navigate('/escalabilidad')}
              className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 rounded-2xl p-8 border border-yellow-500/30 cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-600 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Escalabilidad Instantánea</h3>
              <p className="text-gray-300 mb-6">
                Arquitectura cloud-native desplegada en AWS ECS con auto-scaling, 
                máxima fiabilidad y rendimiento de clase mundial.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-gray-300 text-sm">Auto-scaling 24/7</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-gray-300 text-sm">Multi-región AWS</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-gray-300 text-sm">Container-based</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-yellow-400 font-semibold">
                Explorar Escalabilidad
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-gray-900/50 to-green-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Tecnología de
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              vanguardia.
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
            Construido con las mejores tecnologías modernas para garantizar rendimiento, escalabilidad y confiabilidad.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React 18", category: "Frontend" },
              { name: "TypeScript", category: "Language" },
              { name: "AWS ECS", category: "Cloud" },
              { name: "TensorFlow", category: "AI/ML" },
              { name: "PostgreSQL", category: "Database" },
              { name: "Redis", category: "Cache" },
              { name: "Docker", category: "DevOps" },
              { name: "Kubernetes", category: "Orchestration" }
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-white font-semibold mb-2">{tech.name}</div>
                <div className="text-gray-400 text-sm">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Listo para revolucionar
            </span>
            <br />
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              tu logística?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Únete a miles de empresas que ya transformaron su logística 
            con GreenRoute. El futuro sostenible empieza hoy.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button 
              onClick={() => navigate('/eficiencia-verde')}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-2xl hover:scale-105 flex items-center gap-3 justify-center"
            >
              Comenzar Ahora
            </button>
            <button className="border border-gray-600 hover:border-gray-400 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:bg-white/5 flex items-center gap-3 justify-center">
              Contactar Ventas
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
