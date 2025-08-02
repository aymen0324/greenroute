import React from 'react'
import { motion } from 'framer-motion'
import {
  BarChartIcon,
  TruckIcon,
  BrainIcon,
  LineChartIcon,
  TrophyIcon,
  ActivityIcon,
  ChevronRightIcon,
  LeafIcon,
  FuelIcon,
  GaugeIcon,
  UsersIcon,
  MapIcon,
  RouteIcon,
  SettingsIcon,
  CheckCircleIcon,
  StarIcon,
  ShieldIcon,
  BadgeCheckIcon,
  GlobeIcon,
  ClockIcon,
  ZapIcon,
  ArrowRightIcon,
  PlayIcon,
} from 'lucide-react'
import { FeatureCard } from '../components/ui/FeatureCard'
import { MetricCard } from '../components/ui/MetricCard'

export function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-block mb-4 p-2 bg-green-100 dark:bg-green-900/30 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <LeafIcon size={36} className="text-green-500" />
              </motion.div>
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Revolutionize
                </span>{' '}
                Your Logistics Operations
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Reduce costs by{' '}
                <span className="font-bold text-green-500">45%</span> and
                environmental impact with AI-powered route optimization and
                intelligent fleet management.
              </motion.p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full font-medium flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 relative overflow-hidden group"
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20, boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.7)" }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 0 20px rgba(34, 197, 94, 0)",
                    transition: { duration: 0.6 }
                  }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  onClick={() => {
                    // Show trial signup modal or redirect
                    const email = prompt('📧 ¡Inicia tu prueba gratuita! Ingresa tu email:');
                    if (email) {
                      alert(`🎉 ¡Perfecto! Te hemos enviado un email a ${email} con los detalles de tu prueba gratuita. ¡Prepárate para revolucionar tu logística!`);
                    }
                  }}
                >
                  {/* Animated background particles */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20"
                    animate={{
                      background: [
                        "linear-gradient(45deg, #22c55e, #10b981)",
                        "linear-gradient(45deg, #10b981, #059669)",
                        "linear-gradient(45deg, #059669, #22c55e)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Floating sparkles */}
                  <motion.div
                    className="absolute -top-1 -right-1 text-yellow-300 opacity-0 group-hover:opacity-100"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🎯
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 -left-1 text-yellow-300 opacity-0 group-hover:opacity-100"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    💎
                  </motion.div>
                  
                  {/* Pulsing ring effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-green-400 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  
                  <span className="relative z-10">Start Free Trial</span>
                  <ArrowRightIcon size={18} className="relative z-10" />
                </motion.button>
                <motion.button
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 relative overflow-hidden group"
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20, boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.7)" }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 0 20px rgba(34, 197, 94, 0)",
                    transition: { duration: 0.6 }
                  }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  onClick={() => {
                    // Show demo video or redirect to demo page
                    const demoOptions = ['🎬 Ver Demo en Vivo', '📊 Dashboard Interactivo', '🚛 Simulación de Rutas'];
                    const choice = prompt('🎬 ¿Qué demo te gustaría ver?\n\n1. Ver Demo en Vivo\n2. Dashboard Interactivo\n3. Simulación de Rutas\n\nEscribe el número (1-3):');
                    
                    if (choice) {
                      const options = ['Demo en Vivo', 'Dashboard Interactivo', 'Simulación de Rutas'];
                      const selected = options[parseInt(choice) - 1] || 'Demo en Vivo';
                      alert(`🎬 ¡Perfecto! Te estamos preparando el demo de "${selected}". ¡Prepárate para ver la magia de GreenRoute en acción!`);
                    }
                  }}
                >
                  {/* Animated background particles */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-10"
                    animate={{
                      background: [
                        "linear-gradient(45deg, #22c55e, #10b981)",
                        "linear-gradient(45deg, #10b981, #059669)",
                        "linear-gradient(45deg, #059669, #22c55e)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Floating sparkles */}
                  <motion.div
                    className="absolute -top-1 -right-1 text-yellow-300 opacity-0 group-hover:opacity-100"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🎬
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 -left-1 text-yellow-300 opacity-0 group-hover:opacity-100"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🚀
                  </motion.div>
                  
                  <PlayIcon size={18} className="text-green-500 relative z-10" />
                  <span className="relative z-10">Watch Demo</span>
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="GreenRoute Dashboard"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">Intelligent Dashboard</h3>
                    <p>Real-time analytics and route optimization</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MetricCard
              value="500+"
              label="Companies"
              icon={<UsersIcon size={24} />}
              delay={0.1}
            />
            <MetricCard
              value="2.5M"
              label="Routes Optimized"
              icon={<RouteIcon size={24} />}
              delay={0.2}
            />
            <MetricCard
              value="45%"
              label="Fuel Savings"
              icon={<FuelIcon size={24} />}
              delay={0.3}
            />
            <MetricCard
              value="30%"
              label="CO₂ Reduction"
              icon={<LeafIcon size={24} />}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <ZapIcon size={24} className="text-green-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Logistics Platform
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              All the tools you need to optimize your logistics operations in
              one integrated platform.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="ROI Calculator"
              description="Interactive tool to analyze return on investment for route optimization."
              icon={<BarChartIcon size={24} />}
              delay={0.1}
            />
            <FeatureCard
              title="Fleet Management"
              description="Comprehensive system to track and manage your vehicle fleet efficiently."
              icon={<TruckIcon size={24} />}
              delay={0.2}
            />
            <FeatureCard
              title="AI Optimizer"
              description="Advanced algorithms that learn and adapt to optimize routes in real-time."
              icon={<BrainIcon size={24} />}
              delay={0.3}
            />
            <FeatureCard
              title="Analytics Dashboard"
              description="Real-time insights into your logistics operations with detailed metrics."
              icon={<LineChartIcon size={24} />}
              delay={0.4}
            />
            <FeatureCard
              title="Driver Gamification"
              description="Motivate drivers with gamified elements that reward efficient driving."
              icon={<TrophyIcon size={24} />}
              delay={0.5}
            />
            <FeatureCard
              title="Live Monitoring"
              description="Track operations in real-time with detailed maps and status updates."
              icon={<ActivityIcon size={24} />}
              delay={0.6}
            />
          </div>
        </div>
      </section>
    </div>
  )
} 