import React from 'react'
import { motion } from 'framer-motion'
import {
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
  StarIcon,
  AwardIcon,
  TrendingUpIcon,
  CodeIcon,
  RocketIcon,
  ClockIcon,
  CheckCircleIcon,
  PlayCircleIcon,
} from 'lucide-react'

const ExperiencePage: React.FC = () => {
  const projects = [
    {
      title: "GreenRoute - Plataforma de Logística Sostenible",
      status: "Completado",
      period: "2025",
      description: "Plataforma completa de logística sostenible con optimización de rutas, gestión de flotas, análisis en tiempo real y gamificación. Implementada con React, TypeScript, Node.js, PostgreSQL y tecnologías modernas.",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Framer Motion", "Prisma", "Express"],
      achievements: [
        "Desarrollo completo de frontend y backend",
        "Implementación de sistema de autenticación",
        "Optimización de rutas con algoritmos avanzados",
        "Dashboard interactivo con métricas en tiempo real",
        "Sistema de gamificación para conductores",
        "Interfaz responsive y PWA"
      ],
      icon: <CheckCircleIcon size={24} className="text-green-500" />,
      color: "from-green-400 to-emerald-400"
    },
    {
      title: "E-commerce Platform",
      status: "En Progreso",
      period: "2025 - Presente",
      description: "Plataforma de comercio electrónico moderna con carrito de compras, sistema de pagos, gestión de inventario y panel de administración.",
      technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Redux", "Tailwind CSS"],
      achievements: [
        "Estructura base del proyecto",
        "Sistema de autenticación",
        "Integración con pasarela de pagos"
      ],
      icon: <PlayCircleIcon size={24} className="text-blue-500" />,
      color: "from-blue-400 to-cyan-400"
    },
    {
      title: "AI Chat Assistant",
      status: "En Progreso",
      period: "2025 - Presente",
      description: "Asistente de chat inteligente con capacidades de procesamiento de lenguaje natural y integración con APIs de IA.",
      technologies: ["Python", "OpenAI API", "FastAPI", "React", "WebSocket"],
      achievements: [
        "Configuración del backend con FastAPI",
        "Integración con OpenAI API",
        "Interfaz de chat básica"
      ],
      icon: <PlayCircleIcon size={24} className="text-purple-500" />,
      color: "from-purple-400 to-pink-400"
    },
    {
      title: "Mobile Fitness App",
      status: "En Progreso",
      period: "2025 - Presente",
      description: "Aplicación móvil de fitness con seguimiento de ejercicios, planificación de rutinas y análisis de progreso.",
      technologies: ["React Native", "TypeScript", "Firebase", "Redux", "Expo"],
      achievements: [
        "Configuración del proyecto con Expo",
        "Estructura de navegación",
        "Componentes base de UI"
      ],
      icon: <PlayCircleIcon size={24} className="text-orange-500" />,
      color: "from-orange-400 to-red-400"
    }
  ]

  const education = [
    {
      degree: "Ingeniería Informática",
      institution: "Universidad Miguel Hernández (UMH)",
      period: "2021 - Presente",
      description: "Formación en desarrollo de software, algoritmos, estructuras de datos, bases de datos y tecnologías web modernas. En curso, aún no graduado."
    },
    {
      degree: "Desarrollo Web Full Stack",
      institution: "Cursos Online y Bootcamps",
      period: "2022 - 2025",
      description: "Especialización en tecnologías web modernas, frameworks y mejores prácticas de desarrollo."
    }
  ]

  const skills = [
    {
      category: "Lenguajes de Programación",
      skills: ["JavaScript", "TypeScript", "Python", "Java", "C++", "HTML/CSS", "SQL"]
    },
    {
      category: "Frameworks y Librerías",
      skills: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Framer Motion", "Redux"]
    },
    {
      category: "Bases de Datos",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"]
    },
    {
      category: "Herramientas y Tecnologías",
      skills: ["Git", "Docker", "AWS", "Vercel", "Netlify", "Figma", "Postman"]
    }
  ]

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
                Proyectos Personales
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Mi experiencia se basa en proyectos personales donde aplico y desarrollo mis habilidades técnicas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
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
              Mis Proyectos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Proyectos personales donde aplico mis conocimientos y aprendo nuevas tecnologías
            </p>
          </motion.div>
          
          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      {project.icon}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            project.status === "Completado" 
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}>
                            {project.status}
                          </span>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <CalendarIcon size={16} />
                            <span>{project.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {project.description}
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    Tecnologías Utilizadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    Características Principales
                  </h4>
                  <ul className="space-y-2">
                    {project.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <StarIcon size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
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
              Educación
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Mi formación académica en la Universidad Miguel Hernández
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {edu.degree}
                </h3>
                <p className="text-blue-500 font-medium mb-2">{edu.institution}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{edu.period}</p>
                <p className="text-gray-600 dark:text-gray-300">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Habilidades Técnicas
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Tecnologías y herramientas que he aprendido y aplicado en mis proyectos
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((category, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg"
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
    </div>
  )
}

export default ExperiencePage 