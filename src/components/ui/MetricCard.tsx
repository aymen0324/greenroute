import React from 'react'
import { motion } from 'framer-motion'
interface MetricCardProps {
  value: string
  label: string
  icon: React.ReactNode
  delay?: number
}
export function MetricCard({ value, label, icon, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl text-center border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all"
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay,
        duration: 0.5,
      }}
      whileHover={{
        y: -5,
      }}
    >
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
          <div className="text-green-600 dark:text-green-400">{icon}</div>
        </div>
      </div>
      <motion.div
        className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: delay + 0.3,
          type: 'spring',
          stiffness: 100,
        }}
      >
        {value}
      </motion.div>
      <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
        {label}
      </div>
    </motion.div>
  )
} 