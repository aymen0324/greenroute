// src/components/EcoImpactCalculator.tsx
import React, { useState, useEffect } from 'react';
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
  Globe
} from 'lucide-react';

interface ImpactData {
  co2Saved: number;
  fuelSaved: number;
  moneySaved: number;
  treesEquivalent: number;
  distanceOptimized: number;
  efficiencyGain: number;
}

export default function EcoImpactCalculator() {
  const [vehicleType, setVehicleType] = useState('van');
  const [monthlyKm, setMonthlyKm] = useState(2000);
  const [fuelPrice, setFuelPrice] = useState(1.45);
  const [impact, setImpact] = useState<ImpactData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    co2: 0,
    fuel: 0,
    money: 0,
    trees: 0
  });

  const vehicleTypes = {
    van: { name: 'Furgoneta', consumption: 8.5, co2Factor: 2.31 },
    truck: { name: 'Camión ligero', consumption: 12.0, co2Factor: 2.31 },
    heavyTruck: { name: 'Camión pesado', consumption: 35.0, co2Factor: 2.31 },
    bus: { name: 'Autobús', consumption: 25.0, co2Factor: 2.31 },
    motorcycle: { name: 'Motocicleta', consumption: 4.2, co2Factor: 2.31 }
  };

  const calculateImpact = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const vehicle = vehicleTypes[vehicleType as keyof typeof vehicleTypes];
      const baseConsumption = (monthlyKm / 100) * vehicle.consumption;
      
      // GreenRoute optimization factors
      const routeOptimization = 0.18; // 18% route optimization
      const ecoModeOptimization = 0.12; // 12% eco-driving
      const trafficOptimization = 0.08; // 8% traffic avoidance
      
      const totalOptimization = routeOptimization + ecoModeOptimization + trafficOptimization;
      
      const fuelSaved = baseConsumption * totalOptimization;
      const co2Saved = fuelSaved * vehicle.co2Factor;
      const moneySaved = fuelSaved * fuelPrice;
      const treesEquivalent = co2Saved / 21; // 1 tree absorbs ~21kg CO2/year
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
      setIsCalculating(false);
      
      // Animate values
      animateValues(newImpact);
    }, 2000);
  };

  const animateValues = (targetImpact: ImpactData) => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setAnimatedValues({
        co2: Math.round(targetImpact.co2Saved * easeOutQuart * 10) / 10,
        fuel: Math.round(targetImpact.fuelSaved * easeOutQuart * 10) / 10,
        money: Math.round(targetImpact.moneySaved * easeOutQuart * 100) / 100,
        trees: Math.round(targetImpact.treesEquivalent * easeOutQuart * 10) / 10
      });
      
      currentStep++;
      
      if (currentStep > steps) {
        clearInterval(interval);
      }
    }, stepDuration);
  };

  useEffect(() => {
    calculateImpact();
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 rounded-2xl p-8 border border-green-500/30 shadow-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
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
          />
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
          />
        </div>
      </div>

      {/* Calculate Button */}
      <div className="text-center mb-8">
        <button
          onClick={calculateImpact}
          disabled={isCalculating}
          className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg flex items-center mx-auto"
        >
          <Calculator className="w-5 h-5 mr-2" />
          {isCalculating ? 'Calculando impacto...' : 'Recalcular Impacto'}
        </button>
      </div>

      {/* Results */}
      {impact && (
        <div className="space-y-6">
          {/* Main Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-800/50 rounded-xl p-6 text-center border border-green-600/30">
              <Leaf className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {animatedValues.co2}
              </div>
              <div className="text-green-200 text-sm">kg CO₂ ahorrados/mes</div>
            </div>

            <div className="bg-blue-800/50 rounded-xl p-6 text-center border border-blue-600/30">
              <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {animatedValues.fuel}L
              </div>
              <div className="text-blue-200 text-sm">Combustible ahorrado</div>
            </div>

            <div className="bg-yellow-800/50 rounded-xl p-6 text-center border border-yellow-600/30">
              <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                €{animatedValues.money}
              </div>
              <div className="text-yellow-200 text-sm">Ahorros mensuales</div>
            </div>

            <div className="bg-emerald-800/50 rounded-xl p-6 text-center border border-emerald-600/30">
              <Globe className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {animatedValues.trees}
              </div>
              <div className="text-emerald-200 text-sm">Árboles equivalentes</div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-green-800/30 rounded-xl p-6 border border-green-600/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-400" />
              Desglose de Optimización
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">18%</div>
                <div className="text-green-200 text-sm">Optimización de rutas</div>
                <div className="text-gray-400 text-xs">Algoritmos IA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">12%</div>
                <div className="text-blue-200 text-sm">Conducción eco</div>
                <div className="text-gray-400 text-xs">Coaching en tiempo real</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">8%</div>
                <div className="text-purple-200 text-sm">Evitar tráfico</div>
                <div className="text-gray-400 text-xs">Datos en tiempo real</div>
              </div>
            </div>
          </div>

          {/* Annual Projection */}
          <div className="bg-gradient-to-r from-green-800/30 to-blue-800/30 rounded-xl p-6 border border-green-600/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-green-400" />
              Proyección Anual
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {(impact.co2Saved * 12).toFixed(1)} kg
                </div>
                <div className="text-green-200 text-sm">CO₂ anual ahorrado</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  €{(impact.moneySaved * 12).toFixed(0)}
                </div>
                <div className="text-blue-200 text-sm">Ahorros anuales</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {(impact.treesEquivalent * 12).toFixed(1)}
                </div>
                <div className="text-yellow-200 text-sm">Árboles equivalentes/año</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {impact.efficiencyGain}%
                </div>
                <div className="text-purple-200 text-sm">Mejora total eficiencia</div>
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              Logros Ambientales
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {impact.co2Saved > 100 && (
                <div className="bg-green-700 text-green-100 px-4 py-2 rounded-full text-sm flex items-center">
                  🌱 Eco Warrior
                </div>
              )}
              {impact.moneySaved > 100 && (
                <div className="bg-blue-700 text-blue-100 px-4 py-2 rounded-full text-sm flex items-center">
                  💰 Smart Saver
                </div>
              )}
              {impact.treesEquivalent > 5 && (
                <div className="bg-emerald-700 text-emerald-100 px-4 py-2 rounded-full text-sm flex items-center">
                  🌳 Forest Guardian
                </div>
              )}
              {impact.efficiencyGain > 30 && (
                <div className="bg-purple-700 text-purple-100 px-4 py-2 rounded-full text-sm flex items-center">
                  ⚡ Efficiency Master
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isCalculating && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
            <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-green-200 text-lg font-medium">Analizando impacto ambiental...</div>
          <div className="text-green-400 text-sm mt-2">Procesando datos con IA avanzada</div>
        </div>
      )}
    </div>
  );
}
