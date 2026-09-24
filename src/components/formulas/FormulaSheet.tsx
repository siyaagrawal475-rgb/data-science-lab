'use client';

import React, { useState } from 'react';
import { Copy, Check, Calculator, Filter } from 'lucide-react';
import katex from 'katex';
import { DetailedFormulaItem } from '@/data/unit1/formulas';

interface FormulaSheetProps {
  formulas: DetailedFormulaItem[];
  title?: string;
}

export const FormulaSheet: React.FC<FormulaSheetProps> = ({
  formulas,
}) => {

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(formulas.map((f) => f.category)))];

  const filteredFormulas =
    selectedCategory === 'All'
      ? formulas
      : formulas.filter((f) => f.category === selectedCategory);

  const renderKatex = (latex: string, displayMode: boolean = true) => {
    try {
      return {
        __html: katex.renderToString(latex, { displayMode, throwOnError: false }),
      };
    } catch {
      return { __html: `<span>${latex}</span>` };
    }
  };

  const copyLatex = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-[#64748B] dark:text-[#B8C4D1] mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#FCE5DC] dark:bg-[#432820] text-[#9E513B] dark:text-[#F8B4A6] border border-[#EFC0B0] dark:border-[#6B3B2E]'
                : 'bg-white dark:bg-[#151F2B] hover:bg-[#F8FAFC] dark:hover:bg-[#202D3B] text-[#64748B] dark:text-[#B8C4D1] border border-[#E2E8F0] dark:border-[#2E3B4A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of formula cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFormulas.map((f) => (
          <div
            key={f.id}
            className="p-6 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#9E513B] dark:text-[#F8B4A6] uppercase tracking-wider block">
                    {f.category}
                  </span>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F1F5F9]">{f.title}</h3>
                </div>

                <button
                  onClick={() => copyLatex(f.latex, f.id)}
                  title="Copy LaTeX"
                  className="p-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2E3B4A] bg-white dark:bg-[#1A2634] hover:bg-[#F8FAFC] dark:hover:bg-[#253548] text-[#64748B] dark:text-[#B8C4D1] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  {copiedId === f.id ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* KaTeX Display */}
              <div className="p-4 bg-[#F8FAFC] dark:bg-[#101923] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] flex items-center justify-center overflow-x-auto min-h-[72px]">
                <div
                  className="text-base sm:text-lg text-[#0F172A] dark:text-[#F1F5F9]"
                  dangerouslySetInnerHTML={renderKatex(f.latex, true)}
                />
              </div>

              {/* Meaning & Intuition */}
              <div className="space-y-1 text-xs text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                <strong className="text-[#0F172A] dark:text-[#F1F5F9] block font-semibold">Statistical Meaning:</strong>
                <p>{f.meaning}</p>
              </div>

              {/* Variables breakdown */}
              <div className="space-y-2 pt-2 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
                <span className="text-[11px] font-bold text-[#64748B] dark:text-[#B8C4D1] uppercase tracking-wider block">
                  Variables & Symbols
                </span>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  {f.variables.map((v, vIdx) => (
                    <div key={vIdx} className="flex items-baseline gap-2">
                      <span
                        className="font-mono font-semibold text-[#0F172A] dark:text-[#F1F5F9] bg-[#F1F5F9] dark:bg-[#202D3B] px-1.5 py-0.5 rounded text-[11px] shrink-0"
                        dangerouslySetInnerHTML={renderKatex(v.symbol, false)}
                      />
                      <span className="text-[#64748B] dark:text-[#B8C4D1] text-[11px]">{v.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Worked Example */}
            {f.workedExample && (
              <div className="pt-3 border-t border-emerald-100/60 dark:border-emerald-900/40 bg-[#FBFDFB] dark:bg-emerald-950/20 -mx-6 -mb-6 p-4 rounded-b-2xl space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300">
                  <Calculator className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Worked Example:</span>
                </div>
                <p className="text-[#475569] dark:text-[#CBD5E1] font-medium">{f.workedExample.dataset}</p>
                <div
                  className="p-2 bg-white dark:bg-[#101923] text-[#0F172A] dark:text-[#F1F5F9] rounded-lg border border-emerald-200/80 dark:border-emerald-800/60 text-center overflow-x-auto"
                  dangerouslySetInnerHTML={renderKatex(f.workedExample.calculation, false)}
                />
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[#64748B] dark:text-[#B8C4D1]">Result:</span>
                  <span className="font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
                    {f.workedExample.result}
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] italic">{f.workedExample.interpretation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
