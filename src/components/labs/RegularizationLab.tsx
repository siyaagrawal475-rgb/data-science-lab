'use client';

import React from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { Sliders, Check, Shield, Scissors } from 'lucide-react';
import { RegularizationExplorer } from '@/components/regression/RegularizationExplorer';

export const RegularizationLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-5');
  const isDone = isLabCompleted('regularization');

  return (
    <div className="space-y-8">
      {/* Interactive Regularization Explorer */}
      <RegularizationExplorer />

      {/* Structured Lab Analysis Section */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
          <h4 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FAF2D8] text-[#806A28]">
              <Sliders className="w-4 h-4" />
            </span>
            Mathematical Comparison: L2 Ridge vs. L1 Lasso
          </h4>
          <span className="text-xs font-mono text-[#64748B]">Shrinkage & Feature Selection</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-[#475569]">
          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0F172A]">
              <Shield className="w-4 h-4 text-[#806A28]" />
              <span>Ridge Regression (L2 Euclidean Norm)</span>
            </div>
            <p>
              Penalty: <code className="font-mono text-[#806A28]">λ Σ βⱼ²</code>. The smooth circular L2 constraint contour contacts the quadratic error bowl without touching the axes, shrinking all weights asymptotically toward zero without zeroing them out.
            </p>
            <div className="p-2 bg-white rounded border border-[#CBD5E1] font-mono text-center text-[#0F172A]">
              β̂_Ridge = (XᵀX + λI)⁻¹ Xᵀy
            </div>
          </div>

          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0F172A]">
              <Scissors className="w-4 h-4 text-[#806A28]" />
              <span>Lasso Regression (L1 Manhattan Norm)</span>
            </div>
            <p>
              Penalty: <code className="font-mono text-[#806A28]">λ Σ |βⱼ|</code>. The diamond-shaped L1 constraint has sharp vertices on the coordinate axes. The error bowl frequently contacts these vertices first, driving redundant feature weights to exactly 0.00.
            </p>
            <div className="p-2 bg-white rounded border border-[#CBD5E1] font-mono text-center text-[#0F172A]">
              Soft-Thresholding S(ρⱼ, nλ) / Σ xᵢⱼ²
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
              'Compare Ridge shrinkage against Lasso sparsity across different λ values to complete.'
            )}
          </div>

          <Button
            onClick={() => completeLab('regularization')}
            disabled={isDone}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              isDone
                ? 'bg-[#FAF2D8] text-[#806A28] border border-[#EBD99A] cursor-default'
                : 'bg-[#806A28] hover:bg-[#6A5720] text-white shadow-xs cursor-pointer'
            }`}
          >
            {isDone ? 'Lab Completed' : 'Complete Regularization Lab'}
          </Button>
        </div>
      </div>
    </div>
  );
};
