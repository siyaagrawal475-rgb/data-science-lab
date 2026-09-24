'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface BoxPlotProps {
  data: number[];
  label?: string;
  accentColor?: string;
}

export const BoxPlot: React.FC<BoxPlotProps> = ({
  data,
  label = 'Distribution Summary',
  accentColor = '#8FC7A3',
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 text-xs text-slate-400">
        No data available for box plot.
      </div>
    );
  }

  // Calculate sorted values and quartiles
  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  const getPercentile = (p: number) => {
    const idx = (sorted.length - 1) * p;
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;
    if (lower === upper) return sorted[lower];
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  };

  const q1 = getPercentile(0.25);
  const median = getPercentile(0.5);
  const q3 = getPercentile(0.75);

  const totalRange = max - min === 0 ? 1 : max - min;
  const scale = (v: number) => {
    return Math.max(5, Math.min(95, ((v - min) / totalRange) * 80 + 10));
  };

  const minPos = scale(min);
  const q1Pos = scale(q1);
  const medianPos = scale(median);
  const q3Pos = scale(q3);
  const maxPos = scale(max);

  return (
    <div className="w-full space-y-4 py-2">
      <div className="text-center text-xs font-semibold text-slate-700 dark:text-slate-300">
        {label} (N = {data.length})
      </div>

      {/* SVG Box and Whisker Plot */}
      <div className="relative h-28 w-full flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          {/* Whisker line */}
          <line
            x1={minPos}
            y1="20"
            x2={maxPos}
            y2="20"
            stroke={isDark ? '#94A3B8' : '#64748B'}
            strokeWidth="1.5"
            strokeDasharray="1,1"
          />

          {/* Min & Max End caps */}
          <line
            x1={minPos}
            y1="12"
            x2={minPos}
            y2="28"
            stroke={isDark ? '#CBD5E1' : '#475569'}
            strokeWidth="2"
          />
          <line
            x1={maxPos}
            y1="12"
            x2={maxPos}
            y2="28"
            stroke={isDark ? '#CBD5E1' : '#475569'}
            strokeWidth="2"
          />

          {/* IQR Box (Q1 to Q3) */}
          <rect
            x={q1Pos}
            y="8"
            width={Math.max(q3Pos - q1Pos, 1)}
            height="24"
            fill={`${accentColor}40`}
            stroke={accentColor}
            strokeWidth="2"
            rx="2"
          />

          {/* Median line */}
          <line
            x1={medianPos}
            y1="8"
            x2={medianPos}
            y2="32"
            stroke={isDark ? '#FFFFFF' : '#1E293B'}
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {/* Metrics Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Min</div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200">{min.toFixed(2)}</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Q1 (25%)</div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200">{q1.toFixed(2)}</div>
        </div>
        <div
          className="p-2 rounded-lg border font-semibold"
          style={{
            backgroundColor: `${accentColor}20`,
            borderColor: `${accentColor}60`,
          }}
        >
          <div className="text-[10px] uppercase text-slate-600 dark:text-slate-300">Median (Q2)</div>
          <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{median.toFixed(2)}</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Q3 (75%)</div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200">{q3.toFixed(2)}</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Max</div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200">{max.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
