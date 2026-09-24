'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisualizationCardProps {
  title: string;
  subtitle?: string;
  takeaway?: string;
  badge?: string;
  accentColor?: string;
  children: React.ReactNode;
  footerControls?: React.ReactNode;
  className?: string;
}

export const VisualizationCard: React.FC<VisualizationCardProps> = ({
  title,
  subtitle,
  takeaway,
  badge,
  accentColor = '#91B9E8',
  children,
  footerControls,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-[#151F2B] border border-slate-200 dark:border-[#2E3B4A] rounded-2xl shadow-xs overflow-hidden transition-all',
        className
      )}
    >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-[#2E3B4A] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            {badge && (
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${accentColor}25`,
                  color: accentColor,
                }}
              >
                {badge}
              </span>
            )}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Main Visualization Canvas/Plot Slot */}
      <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-[#101923] flex items-center justify-center min-h-[260px]">
        <div className="w-full">{children}</div>
      </div>

      {/* Footer / Educational Takeaway & Controls */}
      {(takeaway || footerControls) && (
        <div className="p-4 sm:p-5 bg-white dark:bg-[#151F2B] border-t border-slate-100 dark:border-[#2E3B4A] space-y-3">
          {takeaway && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#1B2735] border border-slate-200/60 dark:border-[#2E3B4A] text-xs text-slate-700 dark:text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Mathematical Takeaway:{' '}
                </span>
                {takeaway}
              </div>
            </div>
          )}
          {footerControls && <div>{footerControls}</div>}
        </div>
      )}
    </div>
  );
};
