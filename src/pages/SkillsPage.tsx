import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CodeIcon,
  DatabaseIcon,
  BrainIcon,
  GlobeIcon,
  SmartphoneIcon,
  SettingsIcon,
  PlayIcon,
  PauseIcon,
  BookOpenIcon,
  GraduationCapIcon,
  RocketIcon,
  ZapIcon,
  CpuIcon,
  NetworkIcon,
  ShieldIcon,
  PaletteIcon,
} from 'lucide-react'

const SkillsPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentSkill, setCurrentSkill] = useState(0)

  const skills = [
    { 
      name: "Frontend Development", 
      icon: <CodeIcon size={24} />, 
      level: 95, 
      color: "from-blue-400 to-cyan-400", 
      description: "React, TypeScript, Next.js, Tailwind CSS, Framer Motion",
      category: "Web Development"
    },
    { 
      name: "Backend Development", 
      icon: <DatabaseIcon size={24} />, 
      level: 90, 
      color: "from-purple-400 to-pink-400", 
      description: "Node.js, Express, PostgreSQL, MongoDB, Prisma",
      category: "Web Development"
    },
    { 
      name: "Programming Languages", 
      icon: <CpuIcon size={24} />, 
      level: 92, 
      color: "from-green-400 to-emerald-400", 
      description: "JavaScript, TypeScript, Python, Java, C++, HTML/CSS",
      category: "Core Skills"
    },
    { 
      name: "Mobile Development", 
      icon: <SmartphoneIcon size={24} />, 
      level: 85, 
      color: "from-orange-400 to-red-400", 
      description: "React Native, Flutter, iOS, Android, Expo",
      category: "Mobile Development"
    },
    { 
      name: "Cloud & DevOps", 
      icon: <GlobeIcon size={24} />, 
      level: 88, 
      color: "from-indigo-400 to-blue-400", 
      description: "AWS, Docker, Kubernetes, CI/CD, Git",
      category: "Infrastructure"
    },
    { 
      name: "AI & Machine Learning", 
      icon: <BrainIcon size={24} />, 
      level: 80, 
      color: "from-yellow-400 to-orange-400", 
      description: "TensorFlow, Python, Scikit-learn, OpenAI API",
      category: "Advanced Technologies"
    }
  ]

  const umhSkills = [
    {
      category: "Fundamentos de Programación",
      skills: ["Java", "C++", "Algoritmos", "Estructuras de Datos", "Programación Orientada a Objetos"]
    },
    {
      category: "Bases de Datos",
      skills: ["SQL", "MySQL", "PostgreSQL", "Diseño de BD", "Normalización"]
    },
    {
      category: "Redes y Sistemas",
      skills: ["Redes de Computadores", "Sistemas Operativos", "Arquitectura de Computadores", "Protocolos de Red"]
    },
    {
      category: "Desarrollo Web",
      skills: ["HTML/CSS", "JavaScript", "PHP", "Servidores Web", "APIs REST"]
    },
    {
      category: "Ingeniería de Software",
      skills: ["Metodologías Ágiles", "UML", "Patrones de Diseño", "Testing", "Control de Versiones"]
    },
    {
      category: "Matemáticas y Lógica",
      skills: ["Cálculo", "Álgebra", "Lógica Matemática", "Estadística", "Optimización"]
    }
  ]

  const greenRouteSkills = [
    {
      category: "Frontend Technologies",
      skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Router", "Responsive Design"]
    },
    {
      category: "Backend Technologies",
      skills: ["Node.js", "Express", "PostgreSQL", "Prisma ORM", "JWT Authentication", "REST APIs"]
    },
    {
      category: "Real-time Features",
      skills: ["WebSocket", "Live Data", "Real-time Updates", "Interactive Dashboards", "Live Monitoring"]
    },
    {
      category: "Advanced Features",
      skills: ["Route Optimization", "Gamification", "AI Integration", "PWA", "Dark Mode", "Animations"]
    },
    {
      category: "Development Tools",
      skills: ["Vite", "Git", "ESLint", "Prettier", "TypeScript", "Hot Reload"]
    },
    {
      category: "Deployment & Performance",
      skills: ["Vercel", "Netlify", "Performance Optimization", "SEO", "Accessibility", "Testing"]
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentSkill((prev) => (prev + 1) % skills.length)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isPlaying, skills.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Habilidades Técnicas
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Tecnologías y herramientas que domino con pasión y experiencia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Skills Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Habilidades Principales
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Mis competencias técnicas más destacadas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className={`bg-gradient-to-br ${skill.color} p-8 rounded-2xl shadow-2xl relative overflow-hidden`}
                  animate={currentSkill === index ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <div className="relative z-10 text-center">
                    <motion.div
                      className="flex justify-center mb-6"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                        {skill.icon}
                      </div>
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">{skill.name}</h3>
                    <p className="text-white/80 mb-6 text-sm">{skill.description}</p>
                    
                    <div className="w-full bg-white/20 rounded-full h-3 mb-3">
                      <motion.div
                        className={`bg-gradient-to-r ${skill.color} h-3 rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 1.5 }}
                      />
                    </div>
                    
                    <p className="text-white/90 font-medium">
                      {skill.level}% de dominio
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Play/Pause Controls */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* UMH Skills Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Formación en UMH
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Habilidades y conocimientos adquiridos en la Universidad Miguel Hernández
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {umhSkills.map((category, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCapIcon size={24} className="text-green-500" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GreenRoute Skills Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tecnologías en GreenRoute
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Habilidades específicas implementadas en el proyecto GreenRoute
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {greenRouteSkills.map((category, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <RocketIcon size={24} className="text-blue-500" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Technologies Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Otras Tecnologías
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Herramientas y frameworks adicionales que utilizo
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "JavaScript", "TypeScript", "Python", "Java", "C++", "SQL",
              "React", "Vue.js", "Angular", "Next.js", "Nuxt.js", "Svelte",
              "Node.js", "Express", "FastAPI", "Django", "Spring", "Laravel",
              "PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase", "Supabase",
              "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform",
              "Git", "GitHub", "GitLab", "Jenkins", "CircleCI", "GitHub Actions",
              "Figma", "Adobe XD", "Sketch", "InVision", "Zeplin", "Storybook"
            ].map((tech, index) => (
              <motion.div
                key={tech}
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg text-center hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800/30 dark:hover:to-pink-800/30 transition-all duration-300 border border-purple-200 dark:border-purple-800"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SkillsPage 