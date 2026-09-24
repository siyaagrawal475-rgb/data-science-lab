'use client';

import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartDataset,
  TooltipItem,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { useTheme } from '@/context/ThemeContext';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Point {
  x: number;
  y: number;
  label?: string;
}

interface ScatterPlotProps {
  points: Point[];
  trendline?: { slope: number; intercept: number };
  xLabel?: string;
  yLabel?: string;
  pointColor?: string;
  trendlineColor?: string;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  points,
  trendline,
  xLabel = 'X Variable',
  yLabel = 'Y Variable',
  pointColor = '#91B9E8',
  trendlineColor = '#F4A58A',
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  if (!points || points.length === 0) {
    return (
      <div className="text-center py-10 text-xs text-slate-400">
        No point data provided for scatter plot.
      </div>
    );
  }

  const xVals = points.map((p) => p.x);
  const minX = Math.min(...xVals);
  const maxX = Math.max(...xVals);

  const datasets: (ChartDataset<'scatter', Point[]> | ChartDataset<'line', Point[]>)[] = [
    {
      type: 'scatter',
      label: 'Data Points',
      data: points,
      backgroundColor: `${pointColor}CC`,
      borderColor: pointColor,
      borderWidth: 1.5,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ];

  if (trendline) {
    const linePoints = [
      { x: minX, y: trendline.slope * minX + trendline.intercept },
      { x: maxX, y: trendline.slope * maxX + trendline.intercept },
    ];
    datasets.push({
      type: 'line',
      label: 'Fitted Trendline',
      data: linePoints,
      borderColor: trendlineColor,
      borderWidth: 2,
      pointRadius: 0,
      fill: false,
      borderDash: [4, 4],
    });
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: !!trendline,
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
        callbacks: {
          label: (context: TooltipItem<'scatter'>) => {
            const pt = context.raw as Point;
            return ` (${pt.x.toFixed(2)}, ${pt.y.toFixed(2)})`;
          },
        },
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
        },
        title: {
          display: !!xLabel,
          text: xLabel,
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
          display: !!yLabel,
          text: yLabel,
          color: isDark ? '#94A3B8' : '#64748B',
          font: { size: 11, weight: 'bold' as const },
        },
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Scatter data={{ datasets: datasets as ChartDataset<'scatter', Point[]>[] }} options={options} />
    </div>
  );
};
