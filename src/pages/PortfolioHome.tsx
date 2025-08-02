import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  SparklesIcon,
  StarIcon,
  ZapIcon,
  TargetIcon,
  TrendingUpIcon,
  AwardIcon,
  EyeIcon,
  HeartIcon,
  ArrowRightIcon,
  PlayIcon,
  PauseIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  CodeIcon,
  DatabaseIcon,
  GlobeIcon,
  SmartphoneIcon,
  BrainIcon,
  RocketIcon,
  CheckCircleIcon,
  UsersIcon,
  MessageCircleIcon,
} from 'lucide-react'

const PortfolioHome: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const skills = [
    { name: "Frontend", icon: <CodeIcon size={24} />, level: 95, color: "from-blue-400 to-cyan-400" },
    { name: "Backend", icon: <DatabaseIcon size={24} />, level: 90, color: "from-purple-400 to-pink-400" },
    { name: "Mobile", icon: <SmartphoneIcon size={24} />, level: 85, color: "from-orange-400 to-red-400" },
    { name: "AI/ML", icon: <BrainIcon size={24} />, level: 80, color: "from-green-400 to-emerald-400" }
  ]



  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          animate={{
            background: [
              "linear-gradient(45deg, #1e1b4b, #7c3aed, #ec4899)",
              "linear-gradient(45deg, #7c3aed, #ec4899, #1e1b4b)",
              "linear-gradient(45deg, #ec4899, #1e1b4b, #7c3aed)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.5 }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Main Icon */}
            <motion.div
              className="flex justify-center mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="p-6 bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/20">
                <SparklesIcon size={60} className="text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Aymane El Khilaly
              </span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-8 text-white">
              Desarrollador Full Stack
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
              Transformando ideas en realidades digitales con código elegante y diseño innovador. 
              Especialista en crear soluciones que no solo funcionan, sino que inspiran.
            </p>

                         {/* CTA Buttons */}
             <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
                             <motion.a
                 href="https://github.com/aymen0324"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <GithubIcon size={18} className="sm:w-5 sm:h-5" />
                 Ver GitHub
               </motion.a>
               <motion.a
                 href="https://www.linkedin.com/in/aymane-el-khilaly-42b7962a7/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm text-sm sm:text-base"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <LinkedinIcon size={18} className="sm:w-5 sm:h-5" />
                 Conectar
               </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowRightIcon size={24} className="text-white/60 rotate-90" />
        </motion.div>
      </section>

             {/* About Section */}
       <section className="py-12 sm:py-20 px-4 relative">
         <div className="container mx-auto max-w-6xl">
           <motion.div
             className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
                         <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
               Sobre Mí
             </h2>
             <p className="text-lg sm:text-xl text-white/80 max-w-4xl mx-auto px-4">
               Soy un desarrollador full stack que combina creatividad técnica con visión estratégica. 
               Mi proyecto estrella, GreenRoute, es una plataforma revolucionaria de logística sostenible 
               que demuestra mi capacidad para crear soluciones complejas que impactan positivamente en el mundo.
             </p>
          </motion.div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: <TargetIcon size={40} />, title: "Enfoque", desc: "Soluciones centradas en el usuario" },
              { icon: <ZapIcon size={40} />, title: "Innovación", desc: "Tecnologías de vanguardia" },
              { icon: <TrendingUpIcon size={40} />, title: "Resultados", desc: "Proyectos que marcan la diferencia" }
            ].map((item, index) => (
                             <motion.div
                 key={index}
                 className="text-center p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                                 <div className="text-pink-400 mb-4">{item.icon}</div>
                 <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.title}</h3>
                 <p className="text-white/70 text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

             {/* Skills Preview */}
       <section className="py-12 sm:py-20 px-4 bg-gradient-to-br from-purple-900/50 to-pink-900/50">
         <div className="container mx-auto max-w-6xl">
           <motion.div
             className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
                         <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
               Habilidades Principales
             </h2>
          </motion.div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                                 <motion.div
                   className={`bg-gradient-to-br ${skill.color} p-4 sm:p-6 rounded-2xl shadow-2xl relative overflow-hidden`}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <div className="relative z-10 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        {skill.icon}
                      </div>
                    </div>
                    
                                         <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{skill.name}</h3>
                    
                    <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                      <motion.div
                        className={`bg-gradient-to-r ${skill.color} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 1.5 }}
                      />
                    </div>
                    
                    <p className="text-white/90 font-medium">
                      {skill.level}%
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

             {/* Featured Project */}
       <section className="py-12 sm:py-20 px-4">
         <div className="container mx-auto max-w-6xl">
           <motion.div
             className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
                         <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
               Proyecto Destacado
             </h2>
          </motion.div>

                     <motion.div
             className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-green-500/20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircleIcon size={32} className="text-green-400" />
                                   <h3 className="text-2xl sm:text-3xl font-bold text-white">GreenRoute</h3>
               </div>
               <p className="text-lg sm:text-xl text-white/80 mb-6">
                 Plataforma completa de logística sostenible con optimización de rutas, 
                 gestión de flotas, análisis en tiempo real y gamificación.
               </p>
                                 <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                   {["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Framer Motion"].map((tech) => (
                     <span key={tech} className="px-2 sm:px-3 py-1 bg-green-500/20 text-green-300 text-xs sm:text-sm rounded-full border border-green-500/30">
                       {tech}
                     </span>
                   ))}
                 </div>
                                                    <motion.div
                     className="flex flex-col sm:flex-row gap-4"
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.5 }}
                 >
                   <motion.div
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                                            <Link
                         to="/greenroute"
                         className="px-6 sm:px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                       >
                         <RocketIcon size={18} className="sm:w-5 sm:h-5" />
                         Ver Proyecto
                       </Link>
                     </motion.div>
                     <motion.div
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                       <Link
                         to="/portfolio"
                         className="px-6 sm:px-8 py-3 border-2 border-green-500/30 text-green-300 rounded-full font-medium hover:bg-green-500/10 transition-all duration-300 text-sm sm:text-base"
                       >
                         Ver Más Proyectos
                       </Link>
                   </motion.div>
                 </motion.div>
              </div>
              <div className="relative">
                <motion.div
                  className="w-full h-64 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl shadow-2xl"
                  animate={{ 
                    boxShadow: [
                      "0 25px 50px -12px rgba(34, 197, 94, 0.25)",
                      "0 25px 50px -12px rgba(16, 185, 129, 0.5)",
                      "0 25px 50px -12px rgba(34, 197, 94, 0.25)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>



             {/* Contact Section */}
       <section className="py-12 sm:py-20 px-4">
         <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
                         <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
               ¿Listo para Colaborar?
             </h2>
             <p className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8 px-4">
               Estoy emocionado de escuchar sobre tu proyecto. ¡Hagamos algo increíble juntos!
             </p>
                         <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
                             <motion.a
                 href="mailto:aymenkhilaly@gmail.com"
                 className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <MailIcon size={18} className="sm:w-5 sm:h-5" />
                 Enviar Email
               </motion.a>
                             <motion.div
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <Link
                   to="/contact"
                   className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                 >
                   Más Información
                 </Link>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PortfolioHome 