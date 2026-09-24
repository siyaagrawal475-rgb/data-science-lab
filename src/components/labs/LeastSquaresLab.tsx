'use client';

import React from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { Square, Check } from 'lucide-react';
import { LeastSquaresExplorer } from '@/components/regression/LeastSquaresExplorer';

export const LeastSquaresLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-5');
  const isDone = isLabCompleted('least-squares');

  return (
    <div className="space-y-8">
      {/* Interactive Explorer Embed */}
      <LeastSquaresExplorer />

      {/* Structured Lab Analysis Section */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
          <h4 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FAF2D8] text-[#806A28]">
              <Square className="w-4 h-4" />
            </span>
            Analytical OLS Derivation & Normal Equations
          </h4>
          <span className="text-xs font-mono text-[#64748B]">SSE Minimization</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-[#475569]">
          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
            <div className="font-bold text-[#0F172A]">Partial Derivative with Respect to Intercept (β₀)</div>
            <p>
              Setting ∂SSE/∂β₀ = -2 Σ (yᵢ - β₀ - β₁xᵢ) = 0 forces the sum of residuals to equal zero:
              Σ eᵢ = 0. Dividing by sample size n immediately yields the centroid intercept rule:
            </p>
            <div className="p-2 bg-white rounded border border-[#CBD5E1] font-mono font-bold text-center text-[#806A28]">
              β̂₀ = ȳ - β̂₁x̄
            </div>
          </div>

          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
            <div className="font-bold text-[#0F172A]">Partial Derivative with Respect to Slope (β₁)</div>
            <p>
              Setting ∂SSE/∂β₁ = -2 Σ xᵢ(yᵢ - β₀ - β₁xᵢ) = 0 and substituting β₀ yields the optimal covariance-to-variance ratio:
            </p>
            <div className="p-2 bg-white rounded border border-[#CBD5E1] font-mono font-bold text-center text-[#806A28]">
              β̂₁ = Σ(xᵢ - x̄)(yᵢ - ȳ) / Σ(xᵢ - x̄)²
            </div>
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
              'Observe the geometric error square areas and fit the analytical OLS line to complete.'
            )}
          </div>

          <Button
            onClick={() => completeLab('least-squares')}
            disabled={isDone}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              isDone
                ? 'bg-[#FAF2D8] text-[#806A28] border border-[#EBD99A] cursor-default'
                : 'bg-[#806A28] hover:bg-[#6A5720] text-white shadow-xs cursor-pointer'
            }`}
          >
            {isDone ? 'Lab Completed' : 'Complete Least Squares Lab'}
          </Button>
        </div>
      </div>
    </div>
  );
};
