import React from 'react'
import { PortfolioNavbar } from './PortfolioNavbar'
import { motion } from 'framer-motion'
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  SparklesIcon,
  Sun,
  Moon,
} from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'

export function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative">
      {/* Override any dark mode classes */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
      
      <div className="relative z-10">
        <PortfolioNavbar />
        
        <main className="relative z-10">
          {children}
        </main>
        
        {/* Portfolio Footer */}
        <footer className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-md border-t border-white/10 relative z-10">
          <div className="container mx-auto px-4 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Brand Section */}
              <div className="text-center md:text-left">
                <motion.div
                  className="flex items-center justify-center md:justify-start mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="p-2 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg mr-3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <SparklesIcon size={24} className="text-pink-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Aymane El Khilaly
                  </h3>
                </motion.div>
                <p className="text-gray-300 text-sm sm:text-base">
                  Desarrollador Full Stack que transforma visiones en realidades digitales. 
                  Especializado en crear experiencias únicas que conectan tecnología con innovación.
                </p>
              </div>
              
              {/* Quick Links */}
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4 text-white">
                  Enlaces Rápidos
                </h4>
                <div className="space-y-2 text-sm sm:text-base">
                  <a href="/" className="block text-gray-300 hover:text-pink-400 transition-colors">
                    Inicio
                  </a>
                  <a href="/portfolio" className="block text-gray-300 hover:text-pink-400 transition-colors">
                    Proyectos
                  </a>
                  <a href="/skills" className="block text-gray-300 hover:text-pink-400 transition-colors">
                    Habilidades
                  </a>
                  <a href="/greenroute" className="block text-gray-300 hover:text-pink-400 transition-colors">
                    GreenRoute
                  </a>
                </div>
              </div>
              
              {/* Contact & Social */}
              <div className="text-center md:text-right">
                <h4 className="text-lg font-semibold mb-4 text-white">
                  Conecta Conmigo
                </h4>
                <div className="flex justify-center md:justify-end space-x-4 mb-4">
                  <motion.a
                    href="https://github.com/aymen0324"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <GithubIcon size={20} className="text-white" />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/aymane-el-khilaly-42b7962a7/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LinkedinIcon size={20} className="text-white" />
                  </motion.a>
                  <motion.a
                    href="mailto:aymenkhilaly@gmail.com"
                    className="p-2 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MailIcon size={20} className="text-white" />
                  </motion.a>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">
                  Abierto a colaboraciones innovadoras y proyectos desafiantes
                </p>
              </div>
            </div>
            
            <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © 2025 Aymane El Khilaly. Creado con pasión, código y React.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Controls - Only Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-full shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>
    </div>
  )
} 