import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

interface InteractiveChartProps {
  data: DataPoint[];
  type?: 'line' | 'area';
  height?: number;
  color?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
  className?: string;
}

const InteractiveChart: React.FC<InteractiveChartProps> = ({
  data,
  type = 'line',
  height = 300,
  color = '#10B981',
  showGrid = true,
  showTooltip = true,
  animate = true,
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      index
    }));
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {payload[0].value}
          </p>
        </motion.div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, index } = props;
    const isActive = activeIndex === index;

    return (
      <motion.circle
        cx={cx}
        cy={cy}
        r={isActive ? 6 : 4}
        fill={color}
        stroke="white"
        strokeWidth={2}
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? 1.2 : 1 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(null)}
        style={{ cursor: 'pointer' }}
      />
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'area' ? (
          <AreaChart data={chartData}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />}
            <XAxis 
              dataKey="name" 
              stroke="#6B7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6B7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#gradient-${color.replace('#', '')})`}
              strokeWidth={2}
              fillOpacity={0.3}
            />
            <defs>
              <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        ) : (
          <LineChart data={chartData}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />}
            <XAxis 
              dataKey="name" 
              stroke="#6B7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6B7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{ r: 8, stroke: color, strokeWidth: 2, fill: color }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default InteractiveChart; 