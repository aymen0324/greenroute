import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Brain, 
  MessageCircle, 
  Zap, 
  Target,
  TrendingUp,
  Eye,
  Cpu,
  Database,
  Globe,
  Clock,
  CheckCircle2,
  Send,
  User,
  Bot
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IAAssistantPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "¡Hola! Soy tu asistente de IA especializado en logística verde. ¿En qué puedo ayudarte hoy?",
      time: "10:30"
    },
    {
      id: 2,
      type: "user",
      content: "¿Cuál es la ruta más eficiente para 50 entregas en Madrid?",
      time: "10:31"
    },
    {
      id: 3,
      type: "bot",
      content: "Analizando 50 puntos de entrega en Madrid... He optimizado una ruta que reduce 23% el tiempo y 18% las emisiones. ¿Te gustaría ver los detalles específicos?",
      time: "10:31"
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [aiStats, setAiStats] = useState({
    accuracy: 98.5,
    responseTime: 1.8,
    languages: 25,
    contextTokens: 32000,
    dailyQueries: 15420,
    successRate: 97.2
  });

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: inputMessage,
      time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Perfecto. He analizado tu consulta y encontré una solución optimizada que reduce costos en un 15%.",
        "Basándome en datos históricos y condiciones actuales, recomiendo la siguiente estrategia...",
        "Los algoritmos de ML sugieren una ruta alternativa que mejora la eficiencia en un 22%.",
        "He procesado 47 variables y puedo optimizar tu operación reduciendo 1.2 toneladas de CO₂."
      ];

      const botMessage = {
        id: messages.length + 2,
        type: "bot" as const,
        content: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAiStats(prev => ({
        ...prev,
        dailyQueries: prev.dailyQueries + Math.floor(Math.random() * 10),
        responseTime: Math.max(0.5, prev.responseTime + (Math.random() - 0.5) * 0.2),
        accuracy: Math.min(99.9, prev.accuracy + (Math.random() - 0.5) * 0.1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              IA Assistant
            </h1>
            <p className="text-purple-300 text-sm">ChatGPT-4 para logística verde</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* AI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Precisión IA",
              value: `${aiStats.accuracy.toFixed(1)}%`,
              icon: Target,
              color: "text-purple-400",
              bgColor: "from-purple-500/20 to-pink-500/20"
            },
            {
              title: "Tiempo Respuesta",
              value: `${aiStats.responseTime.toFixed(1)}s`,
              icon: Clock,
              color: "text-indigo-400",
              bgColor: "from-indigo-500/20 to-blue-500/20"
            },
            {
              title: "Idiomas Soportados",
              value: `${aiStats.languages}+`,
              icon: Globe,
              color: "text-cyan-400",
              bgColor: "from-cyan-500/20 to-teal-500/20"
            },
            {
              title: "Contexto",
              value: `${(aiStats.contextTokens / 1000).toFixed(0)}K tokens`,
              icon: Database,
              color: "text-green-400",
              bgColor: "from-green-500/20 to-emerald-500/20"
            },
            {
              title: "Consultas Diarias",
              value: aiStats.dailyQueries.toLocaleString(),
              icon: TrendingUp,
              color: "text-yellow-400",
              bgColor: "from-yellow-500/20 to-orange-500/20"
            },
            {
              title: "Tasa de Éxito",
              value: `${aiStats.successRate.toFixed(1)}%`,
              icon: CheckCircle2,
              color: "text-emerald-400",
              bgColor: "from-emerald-500/20 to-green-500/20"
            }
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm">
                {stat.title}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Messages */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">GreenRoute AI Assistant</h3>
                    <p className="text-sm text-gray-400">Especialista en logística sostenible</p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.type === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "user" 
                        ? "bg-gradient-to-br from-emerald-500 to-green-500" 
                        : "bg-gradient-to-br from-purple-500 to-indigo-500"
                    }`}>
                      {message.type === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`max-w-[80%] ${
                      message.type === "user" ? "text-right" : ""
                    }`}>
                      <div className={`rounded-2xl p-4 ${
                        message.type === "user"
                          ? "bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-400/20"
                          : "bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                      }`}>
                        <p className="text-white text-sm">{message.content}</p>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-6 border-t border-white/10">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Pregunta sobre optimización de rutas, eficiencia verde..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 transition-colors"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-3 text-white font-medium transition-all duration-200"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Panel */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Capacidades IA</h3>
              </div>
              <div className="space-y-4">
                {[
                  { icon: "🧠", title: "GPT-4 Integration", desc: "Procesamiento avanzado de lenguaje natural" },
                  { icon: "🔮", title: "Predicción ML", desc: "Forecasting basado en patrones históricos" },
                  { icon: "⚡", title: "Optimización Real-time", desc: "Ajustes automáticos en tiempo real" },
                  { icon: "🌍", title: "Multi-idioma", desc: "Soporte para 25+ idiomas" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-lg">{feature.icon}</div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                      <p className="text-gray-400 text-xs">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">Consultas Rápidas</h3>
              </div>
              <div className="space-y-2">
                {[
                  "Optimizar ruta para 50 entregas",
                  "Reducir emisiones CO₂ en 20%",
                  "Analizar eficiencia de flota",
                  "Predecir demanda semanal"
                ].map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(query)}
                    className="w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-3 text-sm text-gray-300 hover:text-white transition-all duration-200"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
