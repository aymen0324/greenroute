import React from 'react'
import { motion } from 'framer-motion'
interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
}
export function FeatureCard({
  title,
  description,
  icon,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all hover:-translate-y-2"
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay,
        duration: 0.5,
      }}
    >
      <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
        <div className="text-green-600 dark:text-green-400">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-lg">{description}</p>
    </motion.div>
  )
} 