'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface PieChartItem {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  items?: PieChartItem[];
  title?: string;
  className?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  items = [
    { label: 'Organic Search', value: 45, color: '#3B82F6' },
    { label: 'Direct Traffic', value: 25, color: '#10B981' },
    { label: 'Referral Links', value: 18, color: '#F59E0B' },
    { label: 'Social Media', value: 12, color: '#EC4899' },
  ],
  title = 'Proportional Distribution (Donut)',
  className = '',
}) => {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ≈ 251.32

  const slices = items.reduce<{
    accPct: number;
    list: Array<PieChartItem & { pct: string; strokeDasharray: string; strokeDashoffset: number }>;
  }>(
    (acc, item) => {
      const pct = item.value / (total || 1);
      const strokeDasharray = `${pct * circumference} ${circumference}`;
      const strokeDashoffset = -acc.accPct * circumference;
      return {
        accPct: acc.accPct + pct,
        list: [
          ...acc.list,
          {
            ...item,
            pct: (pct * 100).toFixed(1),
            strokeDasharray,
            strokeDashoffset,
          },
        ],
      };
    },
    { accPct: 0, list: [] }
  ).list;

  return (
    <div className={`p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-4 ${className}`}>
      <div>
        <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">{title}</h4>
        <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Part-to-whole relative composition</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
        {/* SVG Donut */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              className="dark:stroke-[#1E293B]"
              strokeWidth="16"
            />
            {slices.map((slice, i) => (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth="16"
                strokeDasharray={slice.strokeDasharray}
                strokeDashoffset={slice.strokeDashoffset}
                strokeLinecap="butt"
              />
            ))}
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">Total</span>
            <span className="text-sm font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">{total}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2 text-xs">
          {slices.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-[#475569] dark:text-[#CBD5E1] font-medium">{item.label}:</span>
              <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] font-mono">{item.value} ({item.pct}%)</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-xs flex items-start gap-2">
        <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <p className="text-[#475569] dark:text-[#CBD5E1]">
          <strong>When to use:</strong> Donut charts work best with 3 to 6 distinct categories that sum to a meaningful 100% whole.
        </p>
      </div>
    </div>
  );
};
