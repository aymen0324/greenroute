import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Star, Award, Target, TrendingUp, Users, Zap, Rocket,
  Crown, Medal, Gift, Sparkles, Heart, Shield,
  CheckCircle, Clock, Calendar, Activity, BarChart3, PieChart, Leaf,
  ChevronDown, ChevronUp
} from 'lucide-react';

const GamificationPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const periods = [
    { id: 'week', label: 'Esta Semana', icon: <Calendar size={16} /> },
    { id: 'month', label: 'Este Mes', icon: <Calendar size={16} /> },
    { id: 'quarter', label: 'Este Trimestre', icon: <Calendar size={16} /> },
    { id: 'year', label: 'Este Año', icon: <Calendar size={16} /> }
  ];

  const gamificationData = {
    totalPoints: 28470,
    level: 15,
    rank: 'Maestro',
    streak: 28,
    achievements: 23,
    challenges: 8,
    rewards: 12
  };

  const leaderboard = [
    { 
      id: 1, 
      name: 'Carlos M.', 
      points: 28470, 
      level: 15, 
      rank: 'Maestro', 
      avatar: 'CM',
      streak: 28,
      achievements: 23
    },
    { 
      id: 2, 
      name: 'Ana L.', 
      points: 26540, 
      level: 14, 
      rank: 'Experto', 
      avatar: 'AL',
      streak: 25,
      achievements: 21
    },
    { 
      id: 3, 
      name: 'Miguel R.', 
      points: 24890, 
      level: 13, 
      rank: 'Avanzado', 
      avatar: 'MR',
      streak: 22,
      achievements: 19
    },
    { 
      id: 4, 
      name: 'Laura S.', 
      points: 23120, 
      level: 12, 
      rank: 'Intermedio', 
      avatar: 'LS',
      streak: 20,
      achievements: 18
    },
    { 
      id: 5, 
      name: 'Pedro V.', 
      points: 21560, 
      level: 11, 
      rank: 'Principiante', 
      avatar: 'PV',
      streak: 18,
      achievements: 16
    }
  ];

  const achievements = [
    { 
      id: 1, 
      name: 'Primera Ruta', 
      description: 'Completa tu primera ruta optimizada',
      icon: <Trophy size={20} className="lg:w-6 lg:h-6" />,
      progress: 100,
      completed: true,
      points: 100
    },
    { 
      id: 2, 
      name: 'Eficiencia Verde', 
      description: 'Ahorra 1000L de combustible',
      icon: <Leaf size={20} className="lg:w-6 lg:h-6" />,
      progress: 85,
      completed: false,
      points: 500
    },
    { 
      id: 3, 
      name: 'Racha Perfecta', 
      description: 'Mantén 30 días de eficiencia >90%',
      icon: <span className="text-xl lg:text-2xl">🔥</span>,
      progress: 67,
      completed: false,
      points: 750
    },
    { 
      id: 4, 
      name: 'Maestro de Rutas', 
      description: 'Optimiza 100 rutas',
      icon: <Crown size={20} className="lg:w-6 lg:h-6" />,
      progress: 45,
      completed: false,
      points: 1000
    }
  ];

  const challenges = [
    { 
      id: 1, 
      name: 'Desafío Semanal', 
      description: 'Completa 20 rutas esta semana',
      icon: <Target size={20} className="lg:w-6 lg:h-6" />,
      progress: 15,
      total: 20,
      reward: 200,
      expires: '2025-01-28'
    },
    { 
      id: 2, 
      name: 'Eficiencia Extrema', 
      description: 'Mantén eficiencia >95% por 7 días',
      icon: <Zap size={20} className="lg:w-6 lg:h-6" />,
      progress: 5,
      total: 7,
      reward: 300,
      expires: '2025-01-30'
    },
    { 
      id: 3, 
      name: 'Ahorro Verde', 
      description: 'Ahorra 500L de combustible',
      icon: <Leaf size={20} className="lg:w-6 lg:h-6" />,
      progress: 320,
      total: 500,
      reward: 400,
      expires: '2025-02-05'
    }
  ];

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Maestro': return 'bg-gradient-to-br from-yellow-500 to-orange-500';
      case 'Experto': return 'bg-gradient-to-br from-purple-500 to-pink-500';
      case 'Avanzado': return 'bg-gradient-to-br from-blue-500 to-cyan-500';
      case 'Intermedio': return 'bg-gradient-to-br from-green-500 to-emerald-500';
      default: return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    color: string;
    suffix?: string;
  }> = ({ title, value, icon: Icon, color, suffix = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.3 }
      }}
      className="relative overflow-hidden rounded-2xl p-6 lg:p-8 border border-white/10 backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <motion.div 
          className={`p-3 lg:p-4 rounded-xl ${color} shadow-lg`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
        </motion.div>
      </div>
      
      <motion.div 
        className="text-2xl lg:text-4xl font-black mb-2 lg:mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
        whileHover={{ scale: 1.05 }}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </motion.div>
      
      <div className="text-gray-300 text-sm lg:text-lg font-semibold">{title}</div>
    </motion.div>
  );

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-black via-yellow-900/20 via-orange-900/20 to-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="space-y-4 text-center">
            <motion.div className="flex items-center justify-center gap-3 sm:gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-4xl sm:text-5xl lg:text-6xl"
              >
                🏆
              </motion.div>
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                GAMIFICACIÓN
              </motion.h2>
            </motion.div>
            <motion.p 
              className="text-gray-300 text-base sm:text-lg lg:text-xl font-medium max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Convierte la logística en una aventura épica con recompensas y logros
            </motion.p>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-xl border border-white/30 text-white rounded-xl font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              Configuración de Gamificación
            </motion.button>
          </div>

          {/* Controls - Desktop */}
          <motion.div 
            className="hidden lg:flex items-center gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex gap-2">
              {periods.map((period) => (
                <motion.button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === period.id
                      ? 'bg-yellow-600 text-white'
                      : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {period.icon}
                  {period.label}
                </motion.button>
              ))}
            </div>

            <motion.button 
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 ${
                showLeaderboard
                  ? 'bg-orange-600 text-white'
                  : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trophy size={20} />
              Ranking
            </motion.button>
          </motion.div>

          {/* Controls - Mobile */}
          {isMobileMenuOpen && (
            <motion.div 
              className="lg:hidden space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-2 gap-2">
                {periods.map((period) => (
                  <motion.button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                      selectedPeriod === period.id
                        ? 'bg-yellow-600 text-white'
                        : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {period.icon}
                    {period.label}
                  </motion.button>
                ))}
              </div>

              <motion.button 
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                  showLeaderboard
                    ? 'bg-orange-600 text-white'
                    : 'bg-black/50 backdrop-blur-xl border border-white/30 text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trophy size={20} />
                Ranking
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* KPIs principales */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <MetricCard
            title="Puntos Totales"
            value={gamificationData.totalPoints}
            icon={Star}
            color="bg-gradient-to-br from-yellow-500 to-orange-500"
          />
          
          <MetricCard
            title="Nivel Actual"
            value={gamificationData.level}
            icon={TrendingUp}
            color="bg-gradient-to-br from-blue-500 to-cyan-500"
          />
          
          <MetricCard
            title="Racha Actual"
            value={gamificationData.streak}
            icon={() => <span className="text-xl lg:text-2xl">🔥</span>}
            color="bg-gradient-to-br from-red-500 to-pink-500"
            suffix=" días"
          />
          
          <MetricCard
            title="Logros"
            value={gamificationData.achievements}
            icon={Award}
            color="bg-gradient-to-br from-purple-500 to-pink-500"
          />
        </motion.div>

        {/* Perfil del Usuario */}
        <motion.div 
          className="relative overflow-hidden rounded-2xl p-6 lg:p-10 border border-white/10 backdrop-blur-2xl bg-gradient-to-br from-black/40 to-black/20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div className="flex items-center gap-4 lg:gap-6">
                <motion.div 
                  className={`w-16 h-16 lg:w-24 lg:h-24 rounded-full flex items-center justify-center text-white text-lg lg:text-2xl font-bold ${getRankColor(gamificationData.rank)}`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  CM
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-xl lg:text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    Carlos M.
                  </motion.h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 text-sm lg:text-base">
                    <span className="text-gray-300">Nivel {gamificationData.level}</span>
                    <span className="hidden sm:inline text-gray-300">•</span>
                    <span className="text-yellow-400 font-bold">{gamificationData.rank}</span>
                    <span className="hidden sm:inline text-gray-300">•</span>
                    <span className="text-gray-300">{gamificationData.totalPoints.toLocaleString()} pts</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center sm:text-right">
                <div className="text-xl lg:text-2xl font-bold text-yellow-400 mb-1">
                  {gamificationData.streak} días
                </div>
                <div className="text-gray-300 text-xs lg:text-sm">Racha Actual</div>
              </div>
            </div>

            {/* Barra de Progreso */}
            <div className="mb-6">
              <div className="flex justify-between text-xs lg:text-sm text-gray-300 mb-2">
                <span>Nivel {gamificationData.level}</span>
                <span>Nivel {gamificationData.level + 1}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 lg:h-3">
                <motion.div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 lg:h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1, delay: 2.0 }}
                />
              </div>
              <div className="text-center text-gray-300 text-xs lg:text-sm mt-2">
                7,530 / 10,000 puntos para el siguiente nivel
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contenido Principal */}
        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0 }}
        >
          {/* Logros */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl p-6 lg:p-10 border border-white/10 backdrop-blur-2xl bg-gradient-to-br from-black/40 to-black/20"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
            <div className="relative z-10">
              <motion.h3 
                className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 lg:mb-8"
                whileHover={{ scale: 1.05 }}
              >
                🏅 Logros y Recompensas
              </motion.h3>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className="p-4 lg:p-6 bg-black/30 rounded-xl lg:rounded-2xl border border-white/10 backdrop-blur-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className={`p-2 lg:p-3 rounded-lg lg:rounded-xl ${achievement.completed ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm lg:text-base">{achievement.name}</h4>
                          <p className="text-gray-300 text-xs lg:text-sm">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-yellow-400 font-bold text-sm lg:text-base">{achievement.points} pts</div>
                        {achievement.completed && (
                          <div className="text-green-400 text-xs lg:text-sm">✓ Completado</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full ${achievement.completed ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${achievement.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                    <div className="text-center text-gray-300 text-xs lg:text-sm mt-2">
                      {achievement.progress}% completado
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Desafíos y Ranking */}
          <motion.div 
            className="space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            {/* Desafíos */}
            <motion.div 
              className="relative overflow-hidden rounded-2xl p-6 lg:p-10 border border-white/10 backdrop-blur-2xl bg-gradient-to-br from-black/40 to-black/20"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
              <div className="relative z-10">
                <motion.h3 
                  className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 lg:mb-8"
                  whileHover={{ scale: 1.05 }}
                >
                  ⚡ Desafíos Activos
                </motion.h3>
                
                <div className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      className="p-4 lg:p-6 bg-black/30 rounded-xl lg:rounded-2xl border border-white/10 backdrop-blur-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 lg:gap-4">
                          <div className="p-2 lg:p-3 bg-blue-500/20 text-blue-400 rounded-lg lg:rounded-xl">
                            {challenge.icon}
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-sm lg:text-base">{challenge.name}</h4>
                            <p className="text-gray-300 text-xs lg:text-sm">{challenge.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-400 font-bold text-sm lg:text-base">{challenge.reward} pts</div>
                          <div className="text-gray-300 text-xs">{challenge.expires}</div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                      <div className="text-center text-gray-300 text-xs lg:text-sm mt-2">
                        {challenge.progress} / {challenge.total} completado
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Ranking */}
            {showLeaderboard && (
              <motion.div 
                className="relative overflow-hidden rounded-2xl p-6 lg:p-10 border border-white/10 backdrop-blur-2xl bg-gradient-to-br from-black/40 to-black/20"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
                <div className="relative z-10">
                  <motion.h3 
                    className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-6 lg:mb-8"
                    whileHover={{ scale: 1.05 }}
                  >
                    🏆 Ranking de Conductores
                  </motion.h3>
                  
                  <div className="space-y-4">
                    {leaderboard.map((user, index) => (
                      <motion.div
                        key={user.id}
                        className="p-4 lg:p-6 bg-black/30 rounded-xl lg:rounded-2xl border border-white/10 backdrop-blur-xl"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ scale: 1.02, x: -5 }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3 lg:gap-4">
                            <div className="flex items-center gap-2 lg:gap-3">
                              <div className="text-lg lg:text-2xl font-bold text-yellow-400">
                                #{index + 1}
                              </div>
                              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base ${getRankColor(user.rank)}`}>
                                {user.avatar}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-sm lg:text-base">{user.name}</h4>
                              <p className="text-gray-300 text-xs lg:text-sm">{user.rank} • Nivel {user.level}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-yellow-400 font-bold text-sm lg:text-base">{user.points.toLocaleString()} pts</div>
                            <div className="text-gray-300 text-xs lg:text-sm">{user.achievements} logros</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GamificationPage; 