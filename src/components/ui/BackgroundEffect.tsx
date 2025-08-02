import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
export function BackgroundEffect() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500"></div>
      {/* Particles */}
      <div className="absolute inset-0">
        <Particles />
      </div>
      {/* Wave effect */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <Wave />
      </div>
    </div>
  )
}
function Particles() {
  const particles = Array.from({
    length: 20,
  }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 20 + 10,
  }))
  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-green-400 dark:bg-green-500 opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}
function Wave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const waves = [
      {
        wavelength: width / 2,
        amplitude: 50,
        speed: 0.05,
        color: '#22c55e',
      },
      {
        wavelength: width / 1.5,
        amplitude: 30,
        speed: 0.03,
        color: '#3b82f6',
      },
    ]
    let time = 0
    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    const drawWave = (wave: (typeof waves)[0]) => {
      ctx.beginPath()
      ctx.moveTo(0, height / 2)
      for (let x = 0; x < width; x++) {
        const y =
          Math.sin(x / wave.wavelength + time * wave.speed) * wave.amplitude +
          height / 2
        ctx.lineTo(x, y)
      }
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fillStyle = wave.color
      ctx.globalAlpha = 0.1
      ctx.fill()
    }
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      waves.forEach(drawWave)
      time += 0.05
      requestAnimationFrame(animate)
    }
    window.addEventListener('resize', resizeCanvas)
    animate()
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])
  return <canvas ref={canvasRef} className="w-full h-full" />
} 