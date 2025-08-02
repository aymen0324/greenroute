import React, { useState } from 'react'
import { useTheme } from '../theme/ThemeProvider'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  SunIcon,
  MoonIcon,
  MenuIcon,
  XIcon,
  HomeIcon,
  BarChartIcon,
  TruckIcon,
  BrainIcon,
  LineChartIcon,
  TrophyIcon,
  ActivityIcon,
  LeafIcon,
  GithubIcon,
  LinkedinIcon,
} from 'lucide-react'

const navItems = [
  { name: 'Home', icon: <HomeIcon size={18} />, path: '/greenroute' },
  { name: 'ROI Calculator', icon: <BarChartIcon size={18} />, path: '/roi-calculator' },
  { name: 'Fleet Management', icon: <TruckIcon size={18} />, path: '/fleet-management' },
  { name: 'AI Optimizer', icon: <BrainIcon size={18} />, path: '/ai-optimizer' },
  { name: 'Analytics', icon: <LineChartIcon size={18} />, path: '/analytics' },
  { name: 'Gamification', icon: <TrophyIcon size={18} />, path: '/gamification' },
  { name: 'Live Monitoring', icon: <ActivityIcon size={18} />, path: '/live-operations' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/greenroute" className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
                <motion.div
                  className="p-2 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <LeafIcon size={24} className="text-green-500" />
                </motion.div>
                GreenRoute
              </Link>
            </motion.div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navItems.map((item) => (
                <motion.div 
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                      location.pathname === item.path
                        ? 'text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </motion.button>
            <motion.button
              className="hidden sm:flex px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium relative overflow-hidden group"
              whileTap={{ scale: 0.95 }}
              initial={{ boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.7)" }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 0 20px rgba(34, 197, 94, 0)",
                transition: { duration: 0.6 }
              }}
              onClick={() => {
                // Scroll to top and show a success message
                window.scrollTo({ top: 0, behavior: 'smooth' });
                alert('🚀 ¡Bienvenido a GreenRoute! ¡Prepárate para revolucionar tu logística!');
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
                ✨
              </motion.div>
              <motion.div
                className="absolute -bottom-1 -left-1 text-yellow-300 opacity-0 group-hover:opacity-100"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ⚡
              </motion.div>
              
              <span className="relative z-10">Get Started</span>
            </motion.button>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
              >
                {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                  location.pathname === item.path
                    ? 'text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
                    : 'text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <motion.button
              className="w-full mt-3 px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium relative overflow-hidden group"
              whileTap={{ scale: 0.95 }}
              initial={{ boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.7)" }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 0 20px rgba(34, 197, 94, 0)",
                transition: { duration: 0.6 }
              }}
              onClick={() => {
                // Scroll to top and show a success message
                window.scrollTo({ top: 0, behavior: 'smooth' });
                alert('🚀 ¡Bienvenido a GreenRoute! ¡Prepárate para revolucionar tu logística!');
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
                ✨
              </motion.div>
              <motion.div
                className="absolute -bottom-1 -left-1 text-yellow-300 opacity-0 group-hover:opacity-100"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ⚡
              </motion.div>
              
              <span className="relative z-10">Get Started</span>
            </motion.button>
            
            {/* Social Links */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center gap-4">
                <motion.a
                  href="https://github.com/aymen0324"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <GithubIcon size={20} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/aymane-el-khilaly-42b7962a7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LinkedinIcon size={20} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
} 