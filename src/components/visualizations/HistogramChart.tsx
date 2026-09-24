'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@/context/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface HistogramChartProps {
  data: number[];
  bins?: number;
  label?: string;
  accentColor?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export const HistogramChart: React.FC<HistogramChartProps> = ({
  data,
  bins = 8,
  label = 'Frequency',
  accentColor = '#F4A58A',
  xAxisLabel = 'Values',
  yAxisLabel = 'Frequency',
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 text-xs text-slate-400">
        No numeric data available for histogram.
      </div>
    );
  }

  // Calculate bins
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  const binWidth = range / bins;

  const binCounts = new Array(bins).fill(0);
  const binLabels = new Array(bins).fill(0).map((_, i) => {
    const start = (min + i * binWidth).toFixed(1);
    const end = (min + (i + 1) * binWidth).toFixed(1);
    return `${start} - ${end}`;
  });

  data.forEach((val) => {
    let index = Math.floor((val - min) / binWidth);
    if (index >= bins) index = bins - 1;
    if (index < 0) index = 0;
    binCounts[index]++;
  });

  const chartData = {
    labels: binLabels,
    datasets: [
      {
        label,
        data: binCounts,
        backgroundColor: `${accentColor}80`,
        borderColor: accentColor,
        borderWidth: 1.5,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
        titleColor: isDark ? '#F1F5F9' : '#0F172A',
        bodyColor: isDark ? '#CBD5E1' : '#334155',
        borderColor: isDark ? '#334155' : '#E2E8F0',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
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
          maxRotation: 45,
          minRotation: 0,
        },
        title: {
          display: !!xAxisLabel,
          text: xAxisLabel,
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
          precision: 0,
        },
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel,
          color: isDark ? '#94A3B8' : '#64748B',
          font: { size: 11, weight: 'bold' as const },
        },
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};
