'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@/context/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface DistributionChartProps {
  distributionType?: 'normal' | 'exponential' | 'uniform';
  mean?: number;
  stdDev?: number;
  accentColor?: string;
}

export const DistributionChart: React.FC<DistributionChartProps> = ({
  distributionType = 'normal',
  mean = 0,
  stdDev = 1,
  accentColor = '#B7A3E3',
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Generate distribution points
  const points: { x: number; y: number }[] = [];
  const minX = mean - 4 * stdDev;
  const maxX = mean + 4 * stdDev;
  const step = (maxX - minX) / 80;

  for (let x = minX; x <= maxX; x += step) {
    let y = 0;
    if (distributionType === 'normal') {
      const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
      y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    } else if (distributionType === 'exponential') {
      const lambda = 1 / stdDev;
      y = x >= 0 ? lambda * Math.exp(-lambda * x) : 0;
    } else {
      // uniform
      y = x >= minX + stdDev && x <= maxX - stdDev ? 1 / (2 * stdDev) : 0;
    }
    points.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(4)) });
  }

  const chartData = {
    labels: points.map((p) => p.x.toFixed(1)),
    datasets: [
      {
        label: `PDF (μ=${mean}, σ=${stdDev})`,
        data: points.map((p) => p.y),
        borderColor: accentColor,
        backgroundColor: `${accentColor}30`,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: isDark ? '#E2E8F0' : '#334155',
          font: { size: 11 },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
        titleColor: isDark ? '#F1F5F9' : '#0F172A',
        bodyColor: isDark ? '#CBD5E1' : '#334155',
        borderColor: isDark ? '#334155' : '#E2E8F0',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: isDark ? '#94A3B8' : '#64748B',
          font: { size: 10 },
          maxTicksLimit: 9,
        },
        title: {
          display: true,
          text: 'Random Variable X',
          color: isDark ? '#94A3B8' : '#64748B',
          font: { size: 11, weight: 'bold' as const },
        },
      },
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: isDark ? '#94A3B8' : '#64748B',
          font: { size: 10 },
        },
        title: {
          display: true,
          text: 'Probability Density f(x)',
          color: isDark ? '#94A3B8' : '#64748B',
          font: { size: 11, weight: 'bold' as const },
        },
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};
