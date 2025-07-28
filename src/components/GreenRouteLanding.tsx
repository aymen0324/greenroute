import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Features from "../components/Features";

// Floating particles component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; color: string }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 2,
      color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 20px ${particle.color}`,
          }}
          animate={{
            y: [-20, -100, -20],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated background grid
const AnimatedGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <svg className="w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="1"/>
          </pattern>
          <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 0.3 }} />
            <stop offset="50%" style={{ stopColor: "#3b82f6", stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: "#8b5cf6", stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#fadeGradient)" />
      </svg>
    </div>
  );
};

// Glowing orbs animation
const GlowingOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(15px)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
          x: [0, -40, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.8, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};

export default function GreenRouteLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-black text-white flex flex-col items-center px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingParticles />
      <AnimatedGrid />
      <GlowingOrbs />
      
      {/* Mouse Follower Effect */}
      <motion.div
        className="fixed pointer-events-none z-10"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(30px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* NAVBAR */}
      <motion.nav
        className="w-full max-w-6xl flex justify-between items-center py-6 relative z-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-2xl font-bold tracking-tight"
          whileHover={{ 
            textShadow: "0 0 20px #10b981",
            scale: 1.05 
          }}
          transition={{ duration: 0.3 }}
        >
          GreenRoute
        </motion.h1>
        <ul className="flex space-x-6 text-gray-300 text-sm">
          {['Inicio', 'Funcionalidades', 'Contacto'].map((item, index) => (
            <motion.li 
              key={item}
              className="hover:text-white cursor-pointer transition-colors relative"
              whileHover={{ 
                scale: 1.1,
                textShadow: "0 0 10px rgba(16, 185, 129, 0.8)"
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {item}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* HERO SECTION */}
      <motion.section
        className="flex flex-col items-center text-center mt-10 relative z-20"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Title with Typewriter Effect */}
        <motion.div className="relative">
          <motion.h2 
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.span
              className="inline-block"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Optimiza
            </motion.span>{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ 
                scale: 1.1,
                textShadow: "0 0 30px rgba(16, 185, 129, 0.8)"
              }}
            >
              tus
            </motion.span>{" "}
            <motion.span
              className="inline-block"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              rutas
            </motion.span>
          </motion.h2>
          
          {/* Floating Icons around title */}
          <motion.div
            className="absolute -top-8 -left-8 text-green-400"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🚀
          </motion.div>
          <motion.div
            className="absolute -top-4 -right-8 text-blue-400"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            🌍
          </motion.div>
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-purple-400"
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            ⚡
          </motion.div>
        </motion.div>

        <motion.p 
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Plataforma inteligente para reducir costes y emisiones CO₂.
          </motion.span>{" "}
          <motion.span
            className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            Impulsa tu logística con tecnología de vanguardia.
          </motion.span>
        </motion.p>

        {/* Enhanced CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="relative"
        >
          <motion.button
            className="relative bg-gradient-to-r from-green-400 to-lime-500 text-black font-semibold py-4 px-10 rounded-full text-lg shadow-2xl overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 50px rgba(16, 185, 129, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Button background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-lime-400 to-green-500 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            
            {/* Button text */}
            <span className="relative z-10 flex items-center gap-2">
              <span>Empezar ahora</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            
            {/* Glowing border */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-400/50"
              animate={{
                borderColor: ["rgba(16, 185, 129, 0.5)", "rgba(16, 185, 129, 1)", "rgba(16, 185, 129, 0.5)"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
          
          {/* Pulsating ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-400/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.div>

        {/* Statistics with animated counters */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          {[
            { number: "97%", label: "Precisión IA", color: "text-green-400" },
            { number: "45%", label: "Ahorro Combustible", color: "text-blue-400" },
            { number: "60%", label: "Reducción CO₂", color: "text-purple-400" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6 + index * 0.2 }}
            >
              <motion.div
                className={`text-3xl font-bold ${stat.color}`}
                animate={{
                  textShadow: [
                    "0 0 10px rgba(16, 185, 129, 0)",
                    "0 0 20px rgba(16, 185, 129, 0.8)",
                    "0 0 10px rgba(16, 185, 129, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-400 text-sm group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* FEATURES SECTION */}
      <Features />

      {/* FOOTER */}
      <motion.footer
        className="mt-32 mb-8 text-sm text-gray-500 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        &copy; 2025 GreenRoute. Todos los derechos reservados.
      </motion.footer>
    </div>
  );
}
