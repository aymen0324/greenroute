import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Smartphone, 
  Download, 
  Wifi, 
  WifiOff,
  Battery,
  Camera,
  MapPin,
  Bell,
  Fingerprint,
  Zap,
  Globe,
  CheckCircle2,
  Star,
  Users,
  TrendingUp,
  Shield,
  Rocket
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MobilePWAPage() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [installPrompt, setInstallPrompt] = useState(true);
  
  const [pwaStats, setPwaStats] = useState({
    downloads: 45678,
    activeUsers: 32450,
    offlineUsage: 87.3,
    batteryOptimization: 92.1,
    loadTime: 1.2,
    rating: 4.8
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPwaStats(prev => ({
        ...prev,
        downloads: prev.downloads + Math.floor(Math.random() * 10),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20),
        offlineUsage: Math.min(99.9, prev.offlineUsage + (Math.random() - 0.5) * 0.1),
        loadTime: Math.max(0.5, prev.loadTime + (Math.random() - 0.5) * 0.1)
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white">
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Mobile PWA
            </h1>
            <p className="text-blue-300 text-sm">App nativa multiplataforma</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* PWA Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Descargas Totales",
              value: pwaStats.downloads.toLocaleString(),
              icon: Download,
              color: "text-blue-400",
              bgColor: "from-blue-500/20 to-cyan-500/20"
            },
            {
              title: "Usuarios Activos",
              value: pwaStats.activeUsers.toLocaleString(),
              icon: Users,
              color: "text-cyan-400",
              bgColor: "from-cyan-500/20 to-teal-500/20"
            },
            {
              title: "Uso Offline",
              value: `${pwaStats.offlineUsage.toFixed(1)}%`,
              icon: WifiOff,
              color: "text-teal-400",
              bgColor: "from-teal-500/20 to-green-500/20"
            },
            {
              title: "Optimización Batería",
              value: `${pwaStats.batteryOptimization.toFixed(1)}%`,
              icon: Battery,
              color: "text-green-400",
              bgColor: "from-green-500/20 to-emerald-500/20"
            },
            {
              title: "Tiempo de Carga",
              value: `${pwaStats.loadTime.toFixed(1)}s`,
              icon: Zap,
              color: "text-yellow-400",
              bgColor: "from-yellow-500/20 to-orange-500/20"
            },
            {
              title: "Rating App Store",
              value: `${pwaStats.rating}/5`,
              icon: Star,
              color: "text-orange-400",
              bgColor: "from-orange-500/20 to-red-500/20"
            }
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                {stat.title === "Rating App Store" && (
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(pwaStats.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                    ))}
                  </div>
                )}
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

        {/* Mobile Demo & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Mobile Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[640px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-blue-900 rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center p-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="text-white font-semibold">9:41</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {isOnline ? (
                        <Wifi className="w-4 h-4 text-green-400" />
                      ) : (
                        <WifiOff className="w-4 h-4 text-red-400" />
                      )}
                      <Battery className="w-4 h-4 text-green-400" />
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="px-4 pb-4 space-y-4">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-400/20">
                      <h3 className="text-white font-bold text-lg mb-2">GreenRoute Mobile</h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                        <span className="text-sm text-gray-300">
                          {isOnline ? 'Online' : 'Modo Offline'}
                        </span>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-blue-400">247</div>
                        <div className="text-xs text-gray-400">Rutas Activas</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-green-400">92%</div>
                        <div className="text-xs text-gray-400">Eficiencia</div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2">
                      {[
                        { icon: MapPin, label: "GPS Tracking", status: "active" },
                        { icon: Camera, label: "Scan QR", status: "ready" },
                        { icon: Bell, label: "Notificaciones", status: "3 nuevas" }
                      ].map((feature, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-3 flex items-center gap-3">
                          <feature.icon className="w-5 h-5 text-blue-400" />
                          <span className="text-white text-sm flex-1">{feature.label}</span>
                          <span className="text-xs text-green-400">{feature.status}</span>
                        </div>
                      ))}
                    </div>

                    {/* Offline Toggle */}
                    <button
                      onClick={toggleOnlineStatus}
                      className={`w-full p-3 rounded-lg text-sm font-medium transition-all ${
                        isOnline 
                          ? 'bg-green-500/20 text-green-400 border border-green-400/20' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/20'
                      }`}
                    >
                      {isOnline ? 'Simular Modo Offline' : 'Volver Online'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PWA Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Características PWA Avanzadas</h3>
            
            {[
              {
                icon: WifiOff,
                title: "Modo Offline Completo",
                description: "Funcionalidad completa sin conexión a internet",
                details: ["Cache inteligente", "Sync automático", "Datos locales", "Mapas offline"],
                color: "text-teal-400",
                bgColor: "from-teal-500/10 to-cyan-500/10"
              },
              {
                icon: Download,
                title: "Instalación Nativa",
                description: "Se instala como app nativa en cualquier dispositivo",
                details: ["Add to Home Screen", "App Store listing", "Google Play", "No tiendas requeridas"],
                color: "text-blue-400",
                bgColor: "from-blue-500/10 to-indigo-500/10"
              },
              {
                icon: Zap,
                title: "Rendimiento Native",
                description: "Velocidad y fluidez equivalente a apps nativas",
                details: ["<2s tiempo carga", "60fps animaciones", "Service Workers", "Lazy loading"],
                color: "text-yellow-400",
                bgColor: "from-yellow-500/10 to-orange-500/10"
              },
              {
                icon: Shield,
                title: "Seguridad Avanzada",
                description: "HTTPS obligatorio y encriptación end-to-end",
                details: ["SSL/TLS", "Data encryption", "Secure API calls", "Token authentication"],
                color: "text-green-400",
                bgColor: "from-green-500/10 to-emerald-500/10"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${feature.bgColor} rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <feature.icon className={`w-8 h-8 ${feature.color} mt-1`} />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-gray-400">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Install Prompt */}
        {installPrompt && (
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Instalar GreenRoute PWA</h3>
                  <p className="text-gray-300 text-sm">Accede más rápido desde tu dispositivo</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setInstallPrompt(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Ahora no
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Instalar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Native APIs Demo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Bell,
              title: "Push Notifications",
              description: "Notificaciones en tiempo real",
              status: "✅ Activo"
            },
            {
              icon: Camera,
              title: "Camera Access",
              description: "Cámara para documentos",
              status: "✅ Disponible"
            },
            {
              icon: MapPin,
              title: "Geolocation API",
              description: "GPS de alta precisión",
              status: "✅ Permitido"
            },
            {
              icon: Fingerprint,
              title: "Biometric Auth",
              description: "Huella dactilar/Face ID",
              status: "✅ Configurado"
            }
          ].map((api, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300 text-center"
            >
              <api.icon className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{api.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{api.description}</p>
              <div className="text-green-400 text-xs font-semibold bg-green-500/20 px-3 py-1 rounded-full">
                {api.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
