import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  CodeIcon,
  DatabaseIcon,
  GlobeIcon,
  SmartphoneIcon,
  BrainIcon,
  LeafIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
  ShieldIcon,
  BarChartIcon,
  TruckIcon,
  ActivityIcon,
  TrophyIcon,
  SettingsIcon,
  PaletteIcon,
  RocketIcon,
  TargetIcon,
  LightbulbIcon,
  StarIcon,
  MailIcon,
  LinkedinIcon,
  GithubIcon,
  DownloadIcon,
  ExternalLinkIcon,
} from 'lucide-react'

const PortfolioPage: React.FC = () => {
     const projects = [
     {
       id: 1,
       title: "GreenRoute - Plataforma de Logística Sostenible",
       description: "Sistema completo de optimización de rutas con IA, reducción de emisiones y gestión inteligente de flotas.",
       technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AI/ML"],
       image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
       category: "Full Stack",
       features: ["Optimización de rutas", "Análisis en tiempo real", "Dashboard interactivo", "API RESTful"],
       link: "/greenroute",
       github: "#",
       live: "#",
       status: "Completado"
     },
     {
       id: 2,
       title: "E-Commerce Platform",
       description: "Plataforma de comercio electrónico completa con gestión de productos, carrito de compras y pagos.",
       technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
       image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
       category: "E-Commerce",
       features: ["Gestión de productos", "Carrito de compras", "Sistema de pagos", "Panel de administración"],
       link: "#",
       github: "#",
       live: "#",
       status: "En Progreso"
     },
     {
       id: 3,
       title: "Task Management App",
       description: "Aplicación de gestión de tareas con colaboración en tiempo real y notificaciones.",
       technologies: ["React", "Firebase", "Socket.io", "Material-UI"],
       image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
       category: "Productivity",
       features: ["Gestión de tareas", "Colaboración en tiempo real", "Notificaciones", "Estadísticas"],
       link: "#",
       github: "#",
       live: "#",
       status: "En Progreso"
     },
     {
       id: 4,
       title: "Weather Dashboard",
       description: "Dashboard meteorológico con datos en tiempo real y predicciones avanzadas.",
       technologies: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
       image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
       category: "Data Visualization",
       features: ["Datos en tiempo real", "Predicciones", "Múltiples ubicaciones", "Gráficos interactivos"],
       link: "#",
       github: "#",
       live: "#",
       status: "En Progreso"
     },
     {
       id: 5,
       title: "Social Media Dashboard",
       description: "Panel de control para gestión de redes sociales con análisis y programación de contenido.",
       technologies: ["React", "Twitter API", "Instagram API", "Node.js"],
       image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
       category: "Social Media",
       features: ["Gestión de redes", "Análisis de métricas", "Programación de contenido", "Reportes"],
       link: "#",
       github: "#",
       live: "#",
       status: "En Progreso"
     },
     {
       id: 6,
       title: "Fitness Tracking App",
       description: "Aplicación de seguimiento de fitness con rutinas personalizadas y estadísticas detalladas.",
       technologies: ["React Native", "Firebase", "HealthKit", "Chart.js"],
       image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
       category: "Mobile App",
       features: ["Seguimiento de ejercicios", "Rutinas personalizadas", "Estadísticas", "Integración con wearables"],
       link: "#",
       github: "#",
       live: "#",
       status: "En Progreso"
     }
   ]

  const skills = [
    { name: "Frontend", icon: <CodeIcon size={24} />, level: 95 },
    { name: "Backend", icon: <DatabaseIcon size={24} />, level: 90 },
    { name: "AI/ML", icon: <BrainIcon size={24} />, level: 85 },
    { name: "DevOps", icon: <SettingsIcon size={24} />, level: 80 },
    { name: "Mobile", icon: <SmartphoneIcon size={24} />, level: 85 },
    { name: "Cloud", icon: <GlobeIcon size={24} />, level: 90 }
  ]

  const experiences = [
    {
      title: "Freelance Proyectos",
      company: "Desarrollo Independiente",
      period: "2022 - Presente",
      description: "Desarrollo de proyectos freelance especializados en aplicaciones web modernas, sistemas de gestión y soluciones tecnológicas innovadoras. Trabajo con clientes de diversos sectores, entregando soluciones personalizadas y de alta calidad."
    }
  ]

     return (
     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
       {/* Floating particles background */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {[...Array(20)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute w-2 h-2 bg-blue-400/20 dark:bg-blue-400/10 rounded-full"
             style={{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
             }}
             animate={{
               y: [0, -20, 0],
               opacity: [0.2, 0.8, 0.2],
             }}
             transition={{
               duration: 3 + Math.random() * 2,
               repeat: Infinity,
               delay: Math.random() * 2,
             }}
           />
         ))}
       </div>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <PaletteIcon size={48} className="text-blue-500" />
            </motion.div>
                         <motion.h1 
               className="text-5xl md:text-7xl font-bold mb-6"
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.3 }}
             >
               <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                 Aymane El Khilaly
               </span>
             </motion.h1>
             <motion.p 
               className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
             >
               <span className="font-semibold text-blue-600 dark:text-blue-400">Desarrollador Full Stack</span> especializado en tecnologías modernas, 
               creando soluciones innovadoras para el futuro digital. 
               <span className="block mt-2 text-lg">✨ Transformando ideas en experiencias digitales extraordinarias</span>
             </motion.p>
            <div className="flex flex-wrap justify-center gap-4">
                             <motion.a
                 href="https://github.com/aymen0324"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full font-medium flex items-center gap-2"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <GithubIcon size={20} />
                 GitHub
               </motion.a>
              <Link
                to="/greenroute"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
              >
                <ExternalLinkIcon size={20} />
                Ver Proyecto GreenRoute
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
                     <motion.div
             className="text-center mb-16"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
             <motion.div
               className="inline-block mb-4 p-3 bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-cyan-900/30 rounded-full"
               initial={{ scale: 0 }}
               whileInView={{ scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
             >
               <RocketIcon size={32} className="text-emerald-600 dark:text-emerald-400" />
             </motion.div>
             <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
               Proyectos Destacados
             </h2>
             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
               Una selección de mis mejores trabajos y contribuciones que demuestran mi pasión por la innovación tecnológica
             </p>
           </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                             <motion.div
                 key={project.id}
                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1, duration: 0.6 }}
                 whileHover={{ y: -10 }}
               >
                                 <div className="relative h-48 overflow-hidden">
                   <img
                     src={project.image}
                     alt={project.title}
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute bottom-4 left-4 flex gap-2">
                     <span className="px-3 py-1 bg-emerald-500 text-white text-sm rounded-full">
                       {project.category}
                     </span>
                     <span className={`px-3 py-1 text-white text-sm rounded-full ${
                       project.status === "Completado" 
                         ? "bg-green-500" 
                         : "bg-orange-500"
                     }`}>
                       {project.status}
                     </span>
                   </div>
                 </div>
                                 <div className="p-6">
                   <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                   <p className="text-gray-600 dark:text-gray-300 mb-4">
                     {project.description}
                   </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                                     <div className="flex gap-2">
                     {project.link === "/greenroute" && (
                       <>
                         <motion.div
                           className="flex-1 relative overflow-hidden group"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                         >
                           <Link
                             to={project.link}
                             className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
                             onClick={(e) => {
                               e.preventDefault();
                               alert('🚀 ¡Redirigiendo a GreenRoute! ¡Prepárate para ver la plataforma de logística del futuro!');
                               window.location.href = project.link;
                             }}
                           >
                             {/* Animated background particles */}
                             <motion.div
                               className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20"
                               animate={{
                                 background: [
                                   "linear-gradient(45deg, #10b981, #0d9488)",
                                   "linear-gradient(45deg, #0d9488, #0891b2)",
                                   "linear-gradient(45deg, #0891b2, #10b981)"
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
                               🚀
                             </motion.div>
                             
                             <ExternalLinkIcon size={16} className="relative z-10" />
                             <span className="relative z-10">Ver Demo</span>
                           </Link>
                         </motion.div>
                         <a
                           href={project.github}
                           className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                         >
                           GitHub
                         </a>
                       </>
                     )}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
                     <motion.div
             className="text-center mb-16"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
             <motion.div
               className="inline-block mb-4 p-3 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full"
               initial={{ scale: 0 }}
               whileInView={{ scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
             >
               <BrainIcon size={32} className="text-green-600 dark:text-green-400" />
             </motion.div>
             <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
               Habilidades Técnicas
             </h2>
             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
               Tecnologías y herramientas que domino, combinando creatividad con soluciones técnicas avanzadas
             </p>
           </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {skill.level}% de dominio
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
                     <motion.div
             className="text-center mb-16"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
             <motion.div
               className="inline-block mb-4 p-3 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full"
               initial={{ scale: 0 }}
               whileInView={{ scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
             >
               <TrendingUpIcon size={32} className="text-orange-600 dark:text-orange-400" />
             </motion.div>
             <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
               Experiencia Profesional
             </h2>
             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
               Mi trayectoria en el desarrollo de software, evolucionando constantemente con las últimas tecnologías
             </p>
           </motion.div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className="text-blue-500 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{exp.period}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

             {/* Secret Section - Easter Egg */}
       <section className="py-16 px-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 relative overflow-hidden">
         {/* Hidden trigger - invisible element that reveals the secret */}
         <div 
           className="absolute top-4 right-4 w-6 h-6 opacity-0 cursor-pointer z-10"
           onClick={() => {
             const secretDiv = document.getElementById('hafsa-secret');
             if (secretDiv) {
               secretDiv.style.display = secretDiv.style.display === 'block' ? 'none' : 'block';
             }
           }}
           title="💕"
         />
         
         {/* Floating heart hint - very subtle */}
         <motion.div
           className="absolute top-6 right-6 text-pink-300 opacity-20 hover:opacity-40 cursor-pointer z-10"
           animate={{ 
             scale: [1, 1.1, 1],
             opacity: [0.2, 0.4, 0.2]
           }}
           transition={{ 
             duration: 3, 
             repeat: Infinity,
             ease: "easeInOut"
           }}
           onClick={() => {
             const secretDiv = document.getElementById('hafsa-secret');
             if (secretDiv) {
               secretDiv.style.display = secretDiv.style.display === 'block' ? 'none' : 'block';
             }
           }}
         >
           💕
         </motion.div>
         
         {/* Secret content - hidden by default */}
         <div 
           id="hafsa-secret" 
           className="hidden text-center max-w-4xl mx-auto"
           style={{ display: 'none' }}
         >
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
           >
             <motion.div
               className="inline-block mb-6 p-4 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-full"
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
             >
               <span className="text-4xl">💕</span>
             </motion.div>
             
             <h2 className="text-4xl md:text-6xl font-bold mb-6">
               <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                 Hafsa
               </span>
             </h2>
             
             <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
               Mi inspiración, mi motivación, mi todo 💖
             </p>
             
                           <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div 
                  className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-pink-200 dark:border-pink-800"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-3xl mb-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🌟
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2 text-pink-600 dark:text-pink-400">Mi Estrella</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    La luz que ilumina mi camino
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-purple-200 dark:border-purple-800"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-3xl mb-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    💫
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-400">Mi Inspiración</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    La razón de cada logro
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-pink-200 dark:border-pink-800"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-3xl mb-2"
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💝
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2 text-pink-600 dark:text-pink-400">Mi Amor</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    El amor de mi vida
                  </p>
                </motion.div>
              </motion.div>
             
             <motion.div
               className="text-center"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6, duration: 0.8 }}
             >
               <p className="text-lg text-gray-600 dark:text-gray-300 italic">
                 "Cada línea de código que escribo, cada proyecto que creo, 
                 es con la esperanza de hacerte sonreír y hacerte orgullosa. 
                 Eres mi motivación para ser mejor cada día. Te amo, Hafsa 💕"
               </p>
             </motion.div>
           </motion.div>
         </div>
       </section>

       {/* Contact Section */}
       <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
                     <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
             <motion.div
               className="inline-block mb-6 p-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full"
               initial={{ scale: 0 }}
               whileInView={{ scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
             >
               <MailIcon size={40} className="text-purple-600 dark:text-purple-400" />
             </motion.div>
             <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
               ¿Tienes un proyecto en mente?
             </h2>
             <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
               Estoy siempre abierto a nuevas oportunidades y proyectos interesantes. 
               <span className="block mt-2 text-blue-600 dark:text-blue-400 font-semibold">
                 ¡Colaboremos para crear algo extraordinario! 🚀
               </span>
             </p>
            <div className="flex flex-wrap justify-center gap-4">
                             <motion.a
                 href="https://www.linkedin.com/in/aymane-el-khilaly-42b7962a7/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full font-medium flex items-center gap-2"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <LinkedinIcon size={20} />
                 LinkedIn
               </motion.a>
                             <Link
                 to="/greenroute"
                 className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
               >
                 <RocketIcon size={20} />
                 Ver GreenRoute
               </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PortfolioPage 