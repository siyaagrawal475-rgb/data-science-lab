'use client';

import React from 'react';
import { Briefcase, Database, HelpCircle, Sigma, CheckCircle2, Sparkles } from 'lucide-react';
import { RealLifeExample } from '@/types/experiences';

interface RealLifeExampleCardProps {
  example: RealLifeExample;
  className?: string;
}

export const RealLifeExampleCard: React.FC<RealLifeExampleCardProps> = ({ example, className = '' }) => {
  return (
    <div className={`p-6 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-5 ${className}`}>
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] dark:border-[#334155] pb-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900">
            {example.industry}
          </span>
          <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            {example.title}
          </h3>
        </div>
      </div>

      {/* Scenario Breakdown */}
      <div className="space-y-3 text-xs leading-relaxed">
        <div className="p-3.5 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-1">
          <div className="font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Industrial Scenario:</span>
          </div>
          <p className="text-[#475569] dark:text-[#CBD5E1]">{example.scenario}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 bg-white dark:bg-[#1E293B] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-1">
            <div className="font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Dataset Variables:</span>
            </div>
            <p className="text-[#475569] dark:text-[#CBD5E1] font-mono text-[11px]">{example.dataVariables}</p>
          </div>

          <div className="p-3.5 bg-white dark:bg-[#1E293B] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-1">
            <div className="font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>What We Want to Know:</span>
            </div>
            <p className="text-[#475569] dark:text-[#CBD5E1]">{example.whatWeWantToKnow}</p>
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-[#1E293B] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-1">
          <div className="font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5">
            <Sigma className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Mathematical / Data Science Method:</span>
          </div>
          <p className="text-[#334155] dark:text-[#CBD5E1]">{example.mathematicalMethod}</p>
        </div>

        <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40 space-y-1">
          <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Empirical Result & Interpretation:</span>
          </div>
          <p className="text-emerald-900 dark:text-emerald-200">{example.resultInterpretation}</p>
        </div>

        <div className="p-3 bg-blue-50/40 dark:bg-[#172033] rounded-xl border border-blue-200/60 dark:border-blue-900/30 text-[11px] text-[#475569] dark:text-[#CBD5E1] flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#0F172A] dark:text-[#F8FAFC]">Why it matters:</strong> {example.whyItMatters}
          </p>
        </div>
      </div>
    </div>
  );
};
