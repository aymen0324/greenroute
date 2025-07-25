// src/components/MLPredictionEngine.tsx
import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Activity, Database, Cpu, Zap } from 'lucide-react';

interface PredictionData {
  demandForecast: number[];
  trafficPatterns: number[];
  weatherImpact: number;
  carbonOptimization: number;
  costReduction: number;
  efficiency: number;
}

export default function MLPredictionEngine() {
  const [predictions, setPredictions] = useState<PredictionData>({
    demandForecast: [85, 92, 78, 95, 88, 91, 87],
    trafficPatterns: [65, 73, 85, 92, 78, 69, 74],
    weatherImpact: 12.5,
    carbonOptimization: 34.7,
    costReduction: 28.3,
    efficiency: 94.8
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelAccuracy, setModelAccuracy] = useState(97.3);

  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions(prev => ({
        ...prev,
        demandForecast: prev.demandForecast.map(val => 
          Math.max(60, Math.min(100, val + (Math.random() - 0.5) * 8))
        ),
        trafficPatterns: prev.trafficPatterns.map(val => 
          Math.max(50, Math.min(100, val + (Math.random() - 0.5) * 10))
        ),
        weatherImpact: Math.max(0, Math.min(25, prev.weatherImpact + (Math.random() - 0.5) * 3)),
        carbonOptimization: Math.max(20, Math.min(50, prev.carbonOptimization + (Math.random() - 0.5) * 2)),
        costReduction: Math.max(15, Math.min(40, prev.costReduction + (Math.random() - 0.5) * 1.5)),
        efficiency: Math.max(90, Math.min(99, prev.efficiency + (Math.random() - 0.5) * 0.5))
      }));
      setModelAccuracy(prev => Math.max(95, Math.min(99.5, prev + (Math.random() - 0.5) * 0.2)));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const runPrediction = async () => {
    setIsProcessing(true);
    // Simular procesamiento de ML
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
  };

  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/60 backdrop-blur-sm border border-purple-400/30 rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            Motor de Machine Learning
          </h2>
          <p className="text-purple-200 mt-2">TensorFlow + PyTorch | Modelos Predictivos Avanzados</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">{modelAccuracy.toFixed(1)}%</div>
          <div className="text-purple-300 text-sm">Precisión del Modelo</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Predicción de Demanda */}
        <div className="bg-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Predicción de Demanda (7 días)
          </h3>
          <div className="space-y-3">
            {days.map((day, index) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-gray-300 w-12">{day}</span>
                <div className="flex-1 mx-4 bg-slate-600 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${predictions.demandForecast[index]}%` }}
                  ></div>
                </div>
                <span className="text-white font-semibold w-12 text-right">
                  {predictions.demandForecast[index].toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Análisis de Tráfico */}
        <div className="bg-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Patrones de Tráfico IA
          </h3>
          <div className="space-y-3">
            {days.map((day, index) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-gray-300 w-12">{day}</span>
                <div className="flex-1 mx-4 bg-slate-600 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-cyan-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${predictions.trafficPatterns[index]}%` }}
                  ></div>
                </div>
                <span className="text-white font-semibold w-12 text-right">
                  {predictions.trafficPatterns[index].toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métricas Avanzadas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/60 rounded-xl p-4 border border-yellow-400/30">
          <div className="text-yellow-400 text-sm font-semibold mb-1">Impacto Climático</div>
          <div className="text-2xl font-bold text-white">{predictions.weatherImpact.toFixed(1)}%</div>
          <div className="text-yellow-300 text-xs">Ajuste automático</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/60 rounded-xl p-4 border border-green-400/30">
          <div className="text-green-400 text-sm font-semibold mb-1">Optimización CO₂</div>
          <div className="text-2xl font-bold text-white">{predictions.carbonOptimization.toFixed(1)}%</div>
          <div className="text-green-300 text-xs">Reducción emisiones</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/60 rounded-xl p-4 border border-blue-400/30">
          <div className="text-blue-400 text-sm font-semibold mb-1">Reducción Costes</div>
          <div className="text-2xl font-bold text-white">{predictions.costReduction.toFixed(1)}%</div>
          <div className="text-blue-300 text-xs">Ahorro operacional</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/60 rounded-xl p-4 border border-purple-400/30">
          <div className="text-purple-400 text-sm font-semibold mb-1">Eficiencia Global</div>
          <div className="text-2xl font-bold text-white">{predictions.efficiency.toFixed(1)}%</div>
          <div className="text-purple-300 text-xs">Sistema completo</div>
        </div>
      </div>

      {/* Arquitectura del Modelo */}
      <div className="mt-8 bg-slate-700/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          Arquitectura del Modelo de IA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-slate-600/50 rounded-xl p-4 mb-3">
              <Cpu className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Neural Network</div>
              <div className="text-gray-400 text-sm">LSTM + Transformer</div>
            </div>
            <div className="text-xs text-gray-300">
              • 4 capas ocultas<br/>
              • 512 neuronas/capa<br/>
              • Dropout 0.3
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-slate-600/50 rounded-xl p-4 mb-3">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Random Forest</div>
              <div className="text-gray-400 text-sm">Ensemble Learning</div>
            </div>
            <div className="text-xs text-gray-300">
              • 100 árboles<br/>
              • Max depth: 15<br/>
              • Feature importance
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-slate-600/50 rounded-xl p-4 mb-3">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-white font-semibold">XGBoost</div>
              <div className="text-gray-400 text-sm">Gradient Boosting</div>
            </div>
            <div className="text-xs text-gray-300">
              • Learning rate: 0.1<br/>
              • 1000 estimadores<br/>
              • Early stopping
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={runPrediction}
          disabled={isProcessing}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center gap-3"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Entrenando Modelo...
            </>
          ) : (
            <>
              <Brain className="w-5 h-5" />
              Ejecutar Predicción ML
            </>
          )}
        </button>
      </div>
    </div>
  );
}
