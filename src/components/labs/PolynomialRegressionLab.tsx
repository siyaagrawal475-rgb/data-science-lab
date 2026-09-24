'use client';

import React from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { Layers, Check } from 'lucide-react';
import { PolynomialRegressionExplorer } from '@/components/regression/PolynomialRegressionExplorer';

export const PolynomialRegressionLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-5');
  const isDone = isLabCompleted('polynomial-regression');

  return (
    <div className="space-y-8">
      {/* Interactive Polynomial Explorer */}
      <PolynomialRegressionExplorer />

      {/* Applied Theory & Matrix Design Analysis */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
          <h4 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FAF2D8] text-[#806A28]">
              <Layers className="w-4 h-4" />
            </span>
            Vandermonde Feature Matrix & The Bias-Variance Tradeoff
          </h4>
          <span className="text-xs font-mono text-[#64748B]">Capacity & Generalization</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-[#475569]">
          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1.5">
            <div className="font-bold text-[#0F172A]">Degree 1: High Bias (Underfitting)</div>
            <p>
              A rigid straight line ŷ = β₀ + β₁x lacks sufficient expressive power to capture curved physical or economic phenomena, resulting in high training error and high validation error.
            </p>
          </div>

          <div className="p-4 bg-[#FAF2D8]/50 rounded-xl border border-[#EBD99A] space-y-1.5">
            <div className="font-bold text-[#806A28]">Degree 2-3: Optimal Capacity</div>
            <p>
              Smooth quadratic and cubic curves capture true non-linear inflection points without chasing noise, achieving minimal validation error on holdout data.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1.5">
            <div className="font-bold text-[#0F172A]">Degree 5+: High Variance (Overfitting)</div>
            <p>
              The polynomial oscillates wildly to interpolate every training point. Training error drops toward zero, but out-of-sample prediction error explodes.
            </p>
          </div>
        </div>

        {/* Completion Control */}
        <div className="pt-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#64748B]">
            {isDone ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Lab Completed & Logged to Unit 5 Progress
              </span>
            ) : (
              'Vary polynomial degrees and inspect the training vs validation error divergence to complete.'
            )}
          </div>

          <Button
            onClick={() => completeLab('polynomial-regression')}
            disabled={isDone}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              isDone
                ? 'bg-[#FAF2D8] text-[#806A28] border border-[#EBD99A] cursor-default'
                : 'bg-[#806A28] hover:bg-[#6A5720] text-white shadow-xs cursor-pointer'
            }`}
          >
            {isDone ? 'Lab Completed' : 'Complete Polynomial Regression Lab'}
          </Button>
        </div>
      </div>
    </div>
  );
};
