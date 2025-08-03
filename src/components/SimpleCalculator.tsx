// src/components/SimpleCalculator.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Leaf, 
  TrendingDown, 
  DollarSign, 
  Truck, 
  BarChart3,
  Target,
  Award,
  Zap,
  Globe,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface ImpactData {
  co2Saved: number;
  fuelSaved: number;
  moneySaved: number;
  treesEquivalent: number;
  distanceOptimized: number;
  efficiencyGain: number;
}

export default function SimpleCalculator() {
  const [vehicleType, setVehicleType] = useState('van');
  const [monthlyKm, setMonthlyKm] = useState(2000);
  const [fuelPrice, setFuelPrice] = useState(1.45);
  const [impact, setImpact] = useState<ImpactData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vehicleTypes = {
    van: { name: 'Furgoneta', consumption: 8.5, co2Factor: 2.31 },
    truck: { name: 'Camión ligero', consumption: 12.0, co2Factor: 2.31 },
    heavyTruck: { name: 'Camión pesado', consumption: 35.0, co2Factor: 2.31 },
    bus: { name: 'Autobús', consumption: 25.0, co2Factor: 2.31 },
    motorcycle: { name: 'Motocicleta', consumption: 4.2, co2Factor: 2.31 }
  };

  const handleCalculate = () => {
    // Limpiar errores previos
    setError(null);
    
    // Validaciones básicas
    if (!monthlyKm || monthlyKm < 100) {
      setError('Introduce al menos 100 km por mes');
      return;
    }

    if (!fuelPrice || fuelPrice <= 0) {
      setError('Introduce un precio válido de combustible');
      return;
    }

    setIsCalculating(true);
    setShowResults(false);

    // Simulación de cálculo
    setTimeout(() => {
      try {
        const vehicle = vehicleTypes[vehicleType as keyof typeof vehicleTypes];
        
        // Cálculos
        const baseConsumption = (monthlyKm / 100) * vehicle.consumption;
        const routeOptimization = 0.18;
        const ecoModeOptimization = 0.12;
        const trafficOptimization = 0.08;
        const totalOptimization = routeOptimization + ecoModeOptimization + trafficOptimization;
        
        const fuelSaved = baseConsumption * totalOptimization;
        const co2Saved = fuelSaved * vehicle.co2Factor;
        const moneySaved = fuelSaved * fuelPrice;
        const treesEquivalent = co2Saved / 21;
        const distanceOptimized = monthlyKm * routeOptimization;
        const efficiencyGain = totalOptimization * 100;

        const newImpact: ImpactData = {
          co2Saved: Math.round(co2Saved * 10) / 10,
          fuelSaved: Math.round(fuelSaved * 10) / 10,
          moneySaved: Math.round(moneySaved * 100) / 100,
          treesEquivalent: Math.round(treesEquivalent * 10) / 10,
          distanceOptimized: Math.round(distanceOptimized),
          efficiencyGain: Math.round(efficiencyGain * 10) / 10
        };

        setImpact(newImpact);
        setShowResults(true);
      } catch (err) {
        setError('Error en el cálculo. Inténtalo de nuevo.');
      } finally {
        setIsCalculating(false);
      }
    }, 1500);
  };

  const StatCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    color: string;
  }) => {
    const colorClasses = {
      green: 'bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-600/30 text-green-400',
      blue: 'bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-600/30 text-blue-400',
      yellow: 'bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 border-yellow-600/30 text-yellow-400',
      emerald: 'bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 border-emerald-600/30 text-emerald-400'
    };

    return (
      <motion.div
        className={`${colorClasses[color as keyof typeof colorClasses]} rounded-xl p-6 text-center border`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-8 h-8 mx-auto mb-3" />
        <div className="text-3xl font-bold text-white mb-1">
          {value}
        </div>
        <div className="text-sm text-gray-300">
          {title}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 rounded-2xl p-8 border border-green-500/30 shadow-2xl">
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Calculator className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">Calculadora de Impacto Ambiental</h2>
        <p className="text-green-200">Descubre cuánto CO₂ y dinero puedes ahorrar con GreenRoute</p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <label className="block text-green-200 font-semibold">
            <Truck className="inline w-4 h-4 mr-1" />
            Tipo de Vehículo
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full p-3 bg-green-800 text-white rounded-lg border border-green-600 focus:border-green-400 focus:outline-none"
          >
            {Object.entries(vehicleTypes).map(([key, vehicle]) => (
              <option key={key} value={key}>{vehicle.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-green-200 font-semibold">
            <BarChart3 className="inline w-4 h-4 mr-1" />
            Kilómetros/Mes
          </label>
          <input
            type="number"
            value={monthlyKm}
            onChange={(e) => setMonthlyKm(Number(e.target.value))}
            className="w-full p-3 bg-green-800 text-white rounded-lg border border-green-600 focus:border-green-400 focus:outline-none"
            min="100"
            max="50000"
            placeholder="2000"
          />
          <div className="text-xs text-green-300">Mínimo: 100 km</div>
        </div>

        <div className="space-y-2">
          <label className="block text-green-200 font-semibold">
            <DollarSign className="inline w-4 h-4 mr-1" />
            Precio Combustible (€/L)
          </label>
          <input
            type="number"
            step="0.01"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(Number(e.target.value))}
            className="w-full p-3 bg-green-800 text-white rounded-lg border border-green-600 focus:border-green-400 focus:outline-none"
            placeholder="1.45"
            min="0.01"
            max="10"
          />
          <div className="text-xs text-green-300">Rango: 0.01€ - 10€</div>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="text-center mb-8">
        <motion.button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg flex items-center mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Calculator className="w-5 h-5 mr-2" />
          {isCalculating ? 'Calculando...' : 'Calcular Impacto'}
        </motion.button>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          className="bg-red-800/30 border border-red-600/30 rounded-xl p-4 text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Error</span>
          </div>
          <p className="text-red-200 text-sm mt-1">{error}</p>
        </motion.div>
      )}

      {/* Loading State */}
      {isCalculating && (
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
            <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-green-200 text-lg font-medium">Analizando impacto ambiental...</div>
        </motion.div>
      )}

      {/* Results */}
      {showResults && impact && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="kg CO₂ ahorrados/mes"
              value={impact.co2Saved}
              icon={Leaf}
              color="green"
            />
            <StatCard
              title="Combustible ahorrado"
              value={`${impact.fuelSaved}L`}
              icon={Zap}
              color="blue"
            />
            <StatCard
              title="Ahorros mensuales"
              value={`€${impact.moneySaved}`}
              icon={DollarSign}
              color="yellow"
            />
            <StatCard
              title="Árboles equivalentes"
              value={impact.treesEquivalent}
              icon={Globe}
              color="emerald"
            />
          </div>

          {/* Success Message */}
          <motion.div
            className="bg-green-800/30 border border-green-600/30 rounded-xl p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">¡Cálculo completado exitosamente!</span>
            </div>
            <p className="text-green-200 text-sm mt-1">
              Los resultados muestran el impacto real de usar GreenRoute
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 