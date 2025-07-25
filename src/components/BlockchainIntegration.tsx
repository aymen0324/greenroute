// src/components/BlockchainIntegration.tsx
import React, { useState, useEffect } from 'react';
import { Shield, Lock, CheckCircle, Link, Clock, Database } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'delivery' | 'payment' | 'carbon_offset' | 'contract';
  hash: string;
  status: 'pending' | 'confirmed' | 'validated';
  timestamp: string;
  gasUsed: number;
  value: string;
}

export default function BlockchainIntegration() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'delivery',
      hash: '0xa7b8c9d1e2f3...4567',
      status: 'confirmed',
      timestamp: '14:23:45',
      gasUsed: 21000,
      value: '0.05 ETH'
    },
    {
      id: '2',
      type: 'carbon_offset',
      hash: '0x1a2b3c4d5e6f...8901',
      status: 'validated',
      timestamp: '14:22:12',
      gasUsed: 45000,
      value: '2.3 tons CO₂'
    },
    {
      id: '3',
      type: 'payment',
      hash: '0x9f8e7d6c5b4a...3210',
      status: 'pending',
      timestamp: '14:24:01',
      gasUsed: 0,
      value: '0.12 ETH'
    }
  ]);

  const [blockchainStats, setBlockchainStats] = useState({
    totalTransactions: 45672,
    carbonCredits: 12847,
    smartContracts: 234,
    gasEfficiency: 94.7,
    networkUptime: 99.98
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockchainStats(prev => ({
        ...prev,
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 3),
        carbonCredits: prev.carbonCredits + Math.floor(Math.random() * 2),
        gasEfficiency: Math.max(90, Math.min(99, prev.gasEfficiency + (Math.random() - 0.5) * 0.5)),
        networkUptime: Math.max(99.5, Math.min(100, prev.networkUptime + (Math.random() - 0.5) * 0.01))
      }));

      // Actualizar estado de transacciones
      setTransactions(prev => prev.map(tx => {
        if (tx.status === 'pending' && Math.random() > 0.7) {
          return { ...tx, status: 'confirmed' };
        }
        if (tx.status === 'confirmed' && Math.random() > 0.8) {
          return { ...tx, status: 'validated' };
        }
        return tx;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-900/30';
      case 'confirmed': return 'text-blue-400 bg-blue-900/30';
      case 'validated': return 'text-green-400 bg-green-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'delivery': return '🚚';
      case 'payment': return '💰';
      case 'carbon_offset': return '🌱';
      case 'contract': return '📋';
      default: return '⚡';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-indigo-900/60 backdrop-blur-sm border border-indigo-400/30 rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-400" />
            Blockchain & Smart Contracts
          </h2>
          <p className="text-indigo-200 mt-2">Ethereum + Polygon | Trazabilidad Inmutable</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">{blockchainStats.networkUptime.toFixed(2)}%</div>
          <div className="text-indigo-300 text-sm">Network Uptime</div>
        </div>
      </div>

      {/* Estadísticas Blockchain */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/60 rounded-xl p-4 border border-indigo-400/30">
          <div className="text-indigo-400 text-sm font-semibold mb-1">Transacciones</div>
          <div className="text-xl font-bold text-white">{blockchainStats.totalTransactions.toLocaleString()}</div>
          <div className="text-indigo-300 text-xs">Total procesadas</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/60 rounded-xl p-4 border border-green-400/30">
          <div className="text-green-400 text-sm font-semibold mb-1">Créditos CO₂</div>
          <div className="text-xl font-bold text-white">{blockchainStats.carbonCredits.toLocaleString()}</div>
          <div className="text-green-300 text-xs">Tokens emitidos</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/60 rounded-xl p-4 border border-blue-400/30">
          <div className="text-blue-400 text-sm font-semibold mb-1">Smart Contracts</div>
          <div className="text-xl font-bold text-white">{blockchainStats.smartContracts}</div>
          <div className="text-blue-300 text-xs">Activos</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/60 rounded-xl p-4 border border-yellow-400/30">
          <div className="text-yellow-400 text-sm font-semibold mb-1">Gas Efficiency</div>
          <div className="text-xl font-bold text-white">{blockchainStats.gasEfficiency.toFixed(1)}%</div>
          <div className="text-yellow-300 text-xs">Optimización</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/60 rounded-xl p-4 border border-purple-400/30">
          <div className="text-purple-400 text-sm font-semibold mb-1">Layer 2</div>
          <div className="text-xl font-bold text-white">Polygon</div>
          <div className="text-purple-300 text-xs">Scaling solution</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transacciones Recientes */}
        <div className="bg-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            Transacciones en Tiempo Real
          </h3>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-slate-600/50 rounded-lg p-4 border border-slate-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getTypeIcon(tx.type)}</span>
                    <div>
                      <div className="text-white font-semibold text-sm">{tx.hash}</div>
                      <div className="text-gray-400 text-xs">{tx.timestamp}</div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Gas: {tx.gasUsed.toLocaleString()}</span>
                  <span className="text-green-400 font-semibold">{tx.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Contract Details */}
        <div className="bg-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-yellow-400" />
            Smart Contracts Activos
          </h3>
          
          <div className="space-y-4">
            <div className="bg-slate-600/50 rounded-lg p-4 border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="text-green-400 font-semibold">DeliveryContract.sol</div>
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-gray-300 text-sm mb-2">
                Automatiza pagos al confirmar entrega mediante GPS + firmas digitales
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Gas optimized: 94.7%</span>
                <span className="text-green-400">1,247 ejecuciones</span>
              </div>
            </div>

            <div className="bg-slate-600/50 rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="text-blue-400 font-semibold">CarbonOffset.sol</div>
                <CheckCircle className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-gray-300 text-sm mb-2">
                Genera tokens de carbono automáticamente basado en eficiencia de rutas
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Verde certificado</span>
                <span className="text-blue-400">12,847 tokens</span>
              </div>
            </div>

            <div className="bg-slate-600/50 rounded-lg p-4 border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="text-purple-400 font-semibold">SupplyChain.sol</div>
                <CheckCircle className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-gray-300 text-sm mb-2">
                Trazabilidad completa e inmutable de toda la cadena logística
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Inmutable</span>
                <span className="text-purple-400">45,672 registros</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arquitectura Blockchain */}
      <div className="mt-8 bg-slate-700/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Link className="w-5 h-5 text-indigo-400" />
          Arquitectura Multi-Chain
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-4 mb-3">
              <div className="text-white font-bold text-lg">Ethereum</div>
              <div className="text-indigo-200 text-sm">Mainnet</div>
            </div>
            <div className="text-xs text-gray-300">
              • Contratos principales<br/>
              • Governance tokens<br/>
              • Validación final
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 mb-3">
              <div className="text-white font-bold text-lg">Polygon</div>
              <div className="text-purple-200 text-sm">Layer 2</div>
            </div>
            <div className="text-xs text-gray-300">
              • Transacciones rápidas<br/>
              • Bajo coste gas<br/>
              • Escalabilidad
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-4 mb-3">
              <div className="text-white font-bold text-lg">IPFS</div>
              <div className="text-blue-200 text-sm">Storage</div>
            </div>
            <div className="text-xs text-gray-300">
              • Almacenamiento distribuido<br/>
              • Documentos inmutables<br/>
              • Metadata NFTs
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3">
          <Shield className="w-5 h-5" />
          Ver Explorador Blockchain
        </button>
      </div>
    </div>
  );
}
