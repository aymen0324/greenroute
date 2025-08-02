import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  SunIcon,
  MoonIcon,
  MenuIcon,
  XIcon,
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  CodeIcon,
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  SparklesIcon,
} from 'lucide-react'

const navItems = [
  { name: 'Inicio', icon: <HomeIcon size={18} />, path: '/' },
  { name: 'Proyectos', icon: <BriefcaseIcon size={18} />, path: '/portfolio' },
  { name: 'Habilidades', icon: <CodeIcon size={18} />, path: '/skills' },
  { name: 'Experiencia', icon: <UserIcon size={18} />, path: '/experience' },
  { name: 'Contacto', icon: <MailIcon size={18} />, path: '/contact' },
]

export function PortfolioNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
                <motion.div
                  className="p-1.5 sm:p-2 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <SparklesIcon size={18} className="sm:w-6 sm:h-6 text-pink-400" />
                </motion.div>
                <span className="hidden sm:inline">Aymane El Khilaly</span>
                <span className="sm:hidden">Aymane</span>
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
                    className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'text-pink-400 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30'
                        : 'text-gray-300 hover:text-pink-400 hover:bg-white/10'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.a
              href="https://github.com/aymen0324"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <GithubIcon size={18} className="sm:w-5 sm:h-5 text-white" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/aymane-el-khilaly-42b7962a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <LinkedinIcon size={18} className="sm:w-5 sm:h-5 text-white" />
            </motion.a>
            
            <motion.div
              className="hidden sm:flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/greenroute" className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
                Ver GreenRoute
              </Link>
            </motion.div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-pink-400 transition-colors"
              >
                {isOpen ? <XIcon size={20} className="sm:w-6 sm:h-6" /> : <MenuIcon size={20} className="sm:w-6 sm:h-6" />}
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-br from-indigo-900/95 to-purple-900/95 backdrop-blur-md shadow-lg border-t border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-pink-400 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30'
                    : 'text-gray-300 hover:text-pink-400 hover:bg-white/10'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <motion.div
              className="mt-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/greenroute" className="w-full px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                Ver GreenRoute
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </header>
  )
} 