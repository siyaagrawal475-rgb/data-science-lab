'use client';

import React from 'react';
import { Sigma, Copy, Check } from 'lucide-react';
import { FormulaItem } from '@/types';
import katex from 'katex';
import { cn } from '@/lib/utils';

interface FormulaCardProps {
  formula: FormulaItem;
  className?: string;
}

export const FormulaCard: React.FC<FormulaCardProps> = ({ formula, className }) => {
  const [copied, setCopied] = React.useState(false);

  const renderKatex = (latex: string) => {
    try {
      return { __html: katex.renderToString(latex, { displayMode: true, throwOnError: false }) };
    } catch {
      return { __html: `<pre>${latex}</pre>` };
    }
  };

  const copyLatex = () => {
    navigator.clipboard.writeText(formula.latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'p-5 sm:p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4 transition-colors',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#F1F5F9] dark:bg-[#202D3B] text-[#172033] dark:text-[#F1F5F9]">
            <Sigma className="w-4 h-4 text-blue-500" />
          </div>
          <h4 className="text-base font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight">{formula.title}</h4>
        </div>

        <button
          onClick={copyLatex}
          title="Copy LaTeX source"
          className="p-1.5 text-[#94A3B8] hover:text-[#172033] dark:hover:text-[#F1F5F9] hover:bg-[#F1F5F9] dark:hover:bg-[#202D3B] rounded-lg transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* KaTeX Rendered Formula */}
      <div className="p-4 bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] rounded-xl overflow-x-auto text-center flex items-center justify-center min-h-[70px]">
        <div
          className="text-base sm:text-lg text-[#172033] dark:text-[#F1F5F9]"
          dangerouslySetInnerHTML={renderKatex(formula.latex)}
        />
      </div>

      {/* Formula Description */}
      <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">{formula.description}</p>

      {/* Variables breakdown */}
      {formula.variables && formula.variables.length > 0 && (
        <div className="pt-3 border-t border-[#F1F5F9] dark:border-[#2E3B4A] space-y-1.5">
          <span className="text-[11px] font-bold text-[#94A3B8] dark:text-[#7F8B99] uppercase tracking-wider block">
            Notation & Variables
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#475569] dark:text-slate-300">
            {formula.variables.map((v, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span
                  className="font-mono font-semibold text-[#172033] dark:text-[#F1F5F9] bg-[#F1F5F9] dark:bg-[#202D3B] px-1.5 py-0.5 rounded text-[11px]"
                  dangerouslySetInnerHTML={{
                    __html: katex.renderToString(v.symbol, { throwOnError: false }),
                  }}
                />
                <span className="text-[#64748B] dark:text-[#B8C4D1] text-[11px]">{v.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
