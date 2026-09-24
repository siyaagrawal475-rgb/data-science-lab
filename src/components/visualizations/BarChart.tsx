'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowUpDown } from 'lucide-react';

interface BarChartItem {
  label: string;
  value: number;
}

interface BarChartProps {
  items?: BarChartItem[];
  title?: string;
  accentColor?: string;
  unitLabel?: string;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  items = [
    { label: 'Engineering', value: 85 },
    { label: 'Marketing', value: 42 },
    { label: 'Product', value: 58 },
    { label: 'Sales', value: 72 },
    { label: 'Customer Support', value: 34 },
    { label: 'Legal & HR', value: 20 },
  ],
  title = 'Categorical Frequency Distribution',
  accentColor = '#8FC7A3',
  unitLabel = 'Count',
  className = '',
}) => {
  const [sortOrder, setSortOrder] = useState<'default' | 'desc' | 'asc'>('default');

  const displayItems = [...items].sort((a, b) => {
    if (sortOrder === 'desc') return b.value - a.value;
    if (sortOrder === 'asc') return a.value - b.value;
    return 0;
  });

  const maxValue = Math.max(...items.map((i) => i.value), 1);
  const totalValue = items.reduce((acc, i) => acc + i.value, 0);

  return (
    <div className={`p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">{title}</h4>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Total: {totalValue} {unitLabel}</p>
        </div>

        <button
          onClick={() => setSortOrder((prev) => (prev === 'default' ? 'desc' : prev === 'desc' ? 'asc' : 'default'))}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] cursor-pointer"
        >
          <ArrowUpDown className="w-3 h-3" />
          <span>Sort: {sortOrder}</span>
        </button>
      </div>

      <div className="space-y-2.5 pt-1">
        {displayItems.map((item) => {
          const pct = (item.value / maxValue) * 100;
          const sharePct = totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(1) : '0';
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{item.label}</span>
                <span className="font-mono text-[#64748B] dark:text-[#94A3B8]">
                  {item.value} ({sharePct}%)
                </span>
              </div>
              <div className="w-full h-3.5 bg-[#F1F5F9] dark:bg-[#1E293B] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: accentColor,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-xs flex items-start gap-2">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-[#475569] dark:text-[#CBD5E1]">
          <strong>Best Practice:</strong> Bar charts represent discrete categorical counts with explicit baseline at zero. Unlike histograms, categories have no inherent continuous ordering unless sorted.
        </p>
      </div>
    </div>
  );
};
