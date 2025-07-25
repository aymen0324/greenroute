import { motion } from "framer-motion";
import Features from "../components/Features";

export default function GreenRouteLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-black text-white flex flex-col items-center px-6">
      {/* NAVBAR */}
      <motion.nav
        className="w-full max-w-6xl flex justify-between items-center py-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold tracking-tight">GreenRoute</h1>
        <ul className="flex space-x-6 text-gray-300 text-sm">
          <li className="hover:text-white cursor-pointer transition-colors">Inicio</li>
          <li className="hover:text-white cursor-pointer transition-colors">Funcionalidades</li>
          <li className="hover:text-white cursor-pointer transition-colors">Contacto</li>
        </ul>
      </motion.nav>

      {/* HERO SECTION */}
      <motion.section
        className="flex flex-col items-center text-center mt-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Optimiza tus rutas
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10">
          Plataforma inteligente para reducir costes y emisiones CO₂. Impulsa tu logística con tecnología de vanguardia.
        </p>
        <motion.button
          className="bg-gradient-to-r from-green-400 to-lime-500 text-black font-semibold py-3 px-8 rounded-full text-lg hover:from-green-300 hover:to-lime-400 transition shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Empezar ahora
        </motion.button>
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
