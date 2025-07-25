import React from "react";
import { motion } from "framer-motion";
import { Leaf, Map, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Eficiencia Verde",
    description: "Reduce automáticamente el consumo de combustible y las emisiones gracias a rutas optimizadas.",
    icon: Leaf,
    color: "text-green-400",
    link: "/eficiencia-verde",
  },
  {
    title: "Optimización de Rutas",
    description: "Algoritmos en tiempo real que encuentran siempre el camino más eficiente y sostenible.",
    icon: Map,
    color: "text-blue-400",
    link: "/rutas-optimizadas",
  },
  {
    title: "Escalabilidad Instantánea",
    description: "Arquitectura backend desplegada en AWS ECS con máxima fiabilidad y rendimiento.",
    icon: Zap,
    color: "text-yellow-400",
    link: "/escalabilidad",
  },
];

export default function Features() {
  return (
    <motion.section
      className="py-20 px-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Características Principales
        </h2>
        <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
          Descubre cómo GreenRoute transforma tu logística combinando tecnología inteligente, eficiencia operativa y sostenibilidad ambiental.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map(({ title, description, icon: Icon, color, link }, idx) => (
          <Link to={link} key={idx} style={{ textDecoration: "none" }}>
            <motion.div
              className="bg-[#121212] p-8 rounded-2xl shadow-lg border border-[#222] hover:shadow-green-400/10 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              aria-label={title}
            >
              <Icon className={`w-10 h-10 mb-4 ${color}`} />
              <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
