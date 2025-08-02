import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  animate?: boolean;
  className?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#10B981',
  backgroundColor = '#E5E7EB',
  showPercentage = true,
  animate = true,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={animate ? { strokeDashoffset: circumference } : undefined}
          animate={animate ? { strokeDashoffset } : undefined}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      
      {showPercentage && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
          animate={animate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressRing; 