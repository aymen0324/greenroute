// src/components/EcoChatbot.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Leaf,
  Lightbulb,
  TrendingDown,
  Calculator,
  BarChart3,
  Globe,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'suggestion' | 'calculation' | 'info';
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  action: string;
}

export default function EcoChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    {
      icon: <Calculator className="w-4 h-4" />,
      label: "Calcular CO₂ ahorrado",
      action: "calculate_co2"
    },
    {
      icon: <TrendingDown className="w-4 h-4" />,
      label: "Optimizar rutas",
      action: "optimize_routes"
    },
    {
      icon: <BarChart3 className="w-4 h-4" />,
      label: "Ver métricas verdes",
      action: "green_metrics"
    },
    {
      icon: <Lightbulb className="w-4 h-4" />,
      label: "Consejos eco",
      action: "eco_tips"
    }
  ];

  const botResponses = {
    greeting: "¡Hola! Soy EcoBot, tu asistente de sostenibilidad en GreenRoute. ¿En qué puedo ayudarte hoy?",
    calculate_co2: "📊 **Calculadora de CO₂**\n\nEn promedio, nuestros clientes reducen:\n• 30% de emisiones CO₂\n• 15% de consumo de combustible\n• 2.5 toneladas CO₂/mes por flota\n\n¿Te gustaría una estimación personalizada?",
    optimize_routes: "🗺️ **Optimización de Rutas**\n\nGreenRoute optimiza automáticamente:\n• Distancias más cortas (-20% km)\n• Evita tráfico pesado\n• Considera clima y condiciones\n• Prioriza eficiencia energética\n\n¿Qué tipo de vehículos usas?",
    green_metrics: "📈 **Métricas Ambientales**\n\n**Hoy:**\n• 🌱 450 kg CO₂ evitados\n• ⛽ 1,200 L combustible ahorrado\n• 🌍 85% rutas eco-optimizadas\n• 💡 92% eficiencia energética\n\n**Este mes:**\n• 🌱 12.8 toneladas CO₂ evitadas\n• 💰 €3,450 ahorrados en combustible",
    eco_tips: "💡 **Consejos Eco-Inteligentes**\n\n1. **Mantenimiento preventivo**: Reduce 8% consumo\n2. **Planificación consolidada**: Menos viajes, más eficiencia\n3. **Velocidad óptima**: 80-90 km/h = máxima eficiencia\n4. **Neumáticos correctos**: 3% mejora en consumo\n5. **Rutas inteligentes**: Evita pendientes pronunciadas\n\n¿Quieres más detalles sobre algún consejo?",
    fuel_efficiency: "⛽ **Eficiencia de Combustible**\n\nNuestro algoritmo considera:\n• Peso del vehículo y carga\n• Condiciones del tráfico\n• Topografía del terreno\n• Condiciones meteorológicas\n• Estilo de conducción\n\nPromedio de mejora: **18.5%** en eficiencia",
    default: "Entiendo tu consulta. Como asistente especializado en sostenibilidad, puedo ayudarte con:\n\n• 📊 Cálculos de impacto ambiental\n• 🗺️ Optimización de rutas verdes\n• 📈 Métricas de eficiencia\n• 💡 Consejos eco-inteligentes\n\n¿Sobre qué te gustaría saber más?"
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(botResponses.greeting);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text: string, type?: 'suggestion' | 'calculation' | 'info') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      type
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    addUserMessage(inputText);
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const response = getBotResponse(inputText.toLowerCase());
      addBotMessage(response);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);

    setInputText('');
  };

  const handleQuickAction = (action: string) => {
    const actionLabels = {
      calculate_co2: "Calcular CO₂ ahorrado",
      optimize_routes: "Optimizar rutas",
      green_metrics: "Ver métricas verdes",
      eco_tips: "Consejos eco"
    };

    addUserMessage(actionLabels[action as keyof typeof actionLabels]);
    setIsTyping(true);

    setTimeout(() => {
      addBotMessage(botResponses[action as keyof typeof botResponses]);
      setIsTyping(false);
    }, 800);
  };

  const getBotResponse = (input: string): string => {
    if (input.includes('co2') || input.includes('carbono') || input.includes('emision')) {
      return botResponses.calculate_co2;
    }
    if (input.includes('ruta') || input.includes('optimiz') || input.includes('camino')) {
      return botResponses.optimize_routes;
    }
    if (input.includes('metrica') || input.includes('estadistica') || input.includes('datos')) {
      return botResponses.green_metrics;
    }
    if (input.includes('consejo') || input.includes('tip') || input.includes('ayuda')) {
      return botResponses.eco_tips;
    }
    if (input.includes('combustible') || input.includes('gasolina') || input.includes('diesel')) {
      return botResponses.fuel_efficiency;
    }
    return botResponses.default;
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        return (
          <div key={index} className="flex items-start gap-2 ml-2">
            <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
            <span>{line.substring(1).trim()}</span>
          </div>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <div key={index} className="font-bold text-green-300 mt-2 mb-1">
            {line.replace(/\*\*/g, '')}
          </div>
        );
      }
      return <div key={index} className={line.trim() ? 'mb-1' : 'mb-2'}>{line}</div>;
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </button>
        <div className="absolute bottom-16 right-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
          💬 ¿Preguntas sobre sostenibilidad?
          <div className="absolute bottom-[-4px] right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-gradient-to-br from-gray-900 to-green-900 rounded-2xl shadow-2xl border border-green-500/30 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-green-900" />
          </div>
          <div>
            <h3 className="font-bold text-white">EcoBot</h3>
            <p className="text-green-100 text-xs">Asistente de Sostenibilidad</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-green-100 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.sender === 'user' 
                ? 'bg-blue-500' 
                : 'bg-green-500'
            }`}>
              {message.sender === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Leaf className="w-4 h-4 text-white" />
              )}
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              message.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-100'
            }`}>
              <div className="text-sm">
                {message.sender === 'bot' ? formatMessage(message.text) : message.text}
              </div>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-800 p-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-gray-700">
          <p className="text-gray-400 text-xs mb-3">Acciones rápidas:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.action}
                onClick={() => handleQuickAction(action.action)}
                className="flex items-center gap-2 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 hover:text-white transition-colors"
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta sobre sostenibilidad..."
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm border border-gray-600 focus:border-green-500 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white p-2 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
