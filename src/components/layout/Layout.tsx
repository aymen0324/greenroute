import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { BackgroundEffect } from '../ui/BackgroundEffect'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-500">
      {/* GreenRoute specific background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-emerald-50/50 dark:from-green-900/20 dark:via-blue-900/10 dark:to-emerald-900/20"></div>
      
      <BackgroundEffect />
      <Navbar />
      <main className="flex-grow z-10 relative">{children}</main>
      <Footer />
    </div>
  )
} 