import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Fuel, 
  Leaf, 
  Truck, 
  Users, 
  Clock,
  BarChart3,
  Zap,
  Target,
  CheckCircle,
  AlertCircle,
  Info,
  Wrench
} from 'lucide-react'

const ROICalculatorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    currentFuelCost: '',
    currentDistance: '',
    currentVehicles: '',
    currentMaintenance: '',
    currentLabor: '',
    targetSavings: ''
  })

  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateROI = () => {
    // Validar que todos los campos tengan valores
    const hasEmptyFields = Object.values(formData).some(value => value === '')
    if (hasEmptyFields) {
      alert('Por favor, completa todos los campos')
      return
    }

    setIsCalculating(true)
    
    // Convertir strings a números
    const numericData = {
      currentFuelCost: parseFloat(formData.currentFuelCost) || 0,
      currentDistance: parseFloat(formData.currentDistance) || 0,
      currentVehicles: parseFloat(formData.currentVehicles) || 0,
      currentMaintenance: parseFloat(formData.currentMaintenance) || 0,
      currentLabor: parseFloat(formData.currentLabor) || 0,
      targetSavings: parseFloat(formData.targetSavings) || 0
    }
    
    // Simulación de cálculo
    setTimeout(() => {
      const currentTotal = numericData.currentFuelCost + numericData.currentMaintenance + numericData.currentLabor
      const estimatedSavings = currentTotal * 0.45 // 45% de ahorro estimado
      const implementationCost = currentTotal * 0.15 // 15% del costo actual
      const paybackPeriod = implementationCost / (estimatedSavings / 12) // meses
      const annualROI = ((estimatedSavings - implementationCost) / implementationCost) * 100

      setResults({
        currentTotal,
        estimatedSavings,
        implementationCost,
        paybackPeriod,
        annualROI,
        monthlySavings: estimatedSavings / 12,
        co2Reduction: numericData.currentFuelCost * 0.3, // 30% reducción CO2
        fuelSavings: numericData.currentFuelCost * 0.45
      })
      setIsCalculating(false)
    }, 2000)
  }

  const resetCalculator = () => {
    setFormData({
      currentFuelCost: '',
      currentDistance: '',
      currentVehicles: '',
      currentMaintenance: '',
      currentLabor: '',
      targetSavings: ''
    })
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
              className="inline-block mb-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Calculator size={48} className="text-green-500" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                ROI Calculator
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Calcula el retorno de inversión de implementar GreenRoute en tu empresa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <motion.div
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Datos Actuales
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Costo Mensual de Combustible (€)
                  </label>
                  <div className="relative">
                    <Fuel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={formData.currentFuelCost}
                      onChange={(e) => handleInputChange('currentFuelCost', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Distancia Mensual (km)
                  </label>
                  <div className="relative">
                    <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={formData.currentDistance}
                      onChange={(e) => handleInputChange('currentDistance', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Número de Vehículos
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={formData.currentVehicles}
                      onChange={(e) => handleInputChange('currentVehicles', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Costo Mensual de Mantenimiento (€)
                  </label>
                  <div className="relative">
                    <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={formData.currentMaintenance}
                      onChange={(e) => handleInputChange('currentMaintenance', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Costo Mensual de Personal (€)
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={formData.currentLabor}
                      onChange={(e) => handleInputChange('currentLabor', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    onClick={calculateROI}
                    disabled={isCalculating}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isCalculating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Calculando...
                      </>
                    ) : (
                      <>
                        <Calculator size={20} />
                        Calcular ROI
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    onClick={resetCalculator}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Resultados
              </h2>
              
              {results ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="text-green-500" size={20} />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                          Ahorro Anual
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        €{results.estimatedSavings.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="text-blue-500" size={20} />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                          ROI Anual
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {results.annualROI.toFixed(1)}%
                      </p>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="text-purple-500" size={20} />
                        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                          Período de Recuperación
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {results.paybackPeriod.toFixed(1)} meses
                      </p>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="text-orange-500" size={20} />
                        <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                          Reducción CO₂
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {results.co2Reduction.toFixed(1)} kg/año
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                      Resumen de Costos
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Costo Actual Mensual:</span>
                        <span className="font-medium text-gray-900 dark:text-white">€{results.currentTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Ahorro Mensual:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">€{results.monthlySavings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Costo de Implementación:</span>
                        <span className="font-medium text-orange-600 dark:text-orange-400">€{results.implementationCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CheckCircle size={20} />
                    Solicitar Demo
                  </motion.button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BarChart3 className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
                  <p className="text-gray-500 dark:text-gray-400">
                    Ingresa los datos actuales para calcular el ROI
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Beneficios de GreenRoute</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Optimización inteligente que transforma tu logística
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Fuel className="text-green-500" size={32} />,
                title: "Ahorro de Combustible",
                description: "Reduce hasta 45% el consumo de combustible con rutas optimizadas"
              },
              {
                icon: <Leaf className="text-green-500" size={32} />,
                title: "Sostenibilidad",
                description: "Reduce la huella de carbono y mejora tu imagen corporativa"
              },
              {
                icon: <Clock className="text-green-500" size={32} />,
                title: "Eficiencia Temporal",
                description: "Optimiza tiempos de entrega y reduce retrasos"
              },
              {
                icon: <Users className="text-green-500" size={32} />,
                title: "Gestión de Flotas",
                description: "Control total de vehículos y conductores en tiempo real"
              },
              {
                icon: <Zap className="text-green-500" size={32} />,
                title: "Automatización",
                description: "Procesos automatizados que reducen errores humanos"
              },
              {
                icon: <Target className="text-green-500" size={32} />,
                title: "ROI Garantizado",
                description: "Retorno de inversión visible en los primeros 6 meses"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ROICalculatorPage 