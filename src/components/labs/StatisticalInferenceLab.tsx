'use client';

import React, { useState, useMemo } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, HelpCircle, Check, X } from 'lucide-react';
import {
  standardError,
  confidenceInterval,
  normalCDF,
} from '@/lib/statisticsMath';

export const StatisticalInferenceLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-4');
  const isDone = isLabCompleted('statistical-inference');

  // Sample configuration
  const [sampleSize, setSampleSize] = useState<number>(64);
  const [sampleMean, setSampleMean] = useState<number>(104.5);
  const [sampleStd, setSampleStd] = useState<number>(12.0);

  // Hypothesis configuration
  const [nullMean, setNullMean] = useState<number>(100.0);
  const [confidenceLevel, setConfidenceLevel] = useState<0.90 | 0.95 | 0.99>(0.95);

  const alpha = 1 - confidenceLevel;

  const inference = useMemo(() => {
    const se = standardError(sampleStd, sampleSize);
    const ci = confidenceInterval(sampleMean, sampleStd, sampleSize, confidenceLevel);
    const z = (sampleMean - nullMean) / se;
    // Two-tailed p-value
    const pVal = 2 * (1 - normalCDF(Math.abs(z), 0, 1));
    const rejectNull = pVal <= alpha;

    return {
      stdError: se,
      ci,
      zStat: z,
      pValue: pVal,
      rejectNull,
    };
  }, [sampleSize, sampleMean, sampleStd, nullMean, confidenceLevel, alpha]);

  const generateRandomSample = (trueCenter: number) => {
    setSampleMean(Number((trueCenter + (Math.random() - 0.5) * 6).toFixed(2)));
    setSampleStd(Number((10 + Math.random() * 4).toFixed(2)));
  };

  return (
    <div className="space-y-8">
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#EEE9F8] text-[#68539A]">
                <HelpCircle className="w-4 h-4" />
              </span>
              Hypothesis Testing & Confidence Interval Lab
            </h3>
            <p className="text-xs text-[#64748B]">
              Conduct one-sample Z-tests, compute two-sided confidence intervals, and make formal statistical decisions.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => generateRandomSample(105)}
              className="px-3 py-1.5 bg-[#F8FAFC] hover:bg-[#EEE9F8] text-[#68539A] border border-[#E2E8F0] hover:border-[#CFC2EA] rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              Simulate Significant Data
            </button>
            <button
              onClick={() => generateRandomSample(100.5)}
              className="px-3 py-1.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              Simulate Null Data
            </button>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
          <div>
            <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-1">
              Sample Size (n): {sampleSize}
            </label>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={sampleSize}
              onChange={(e) => setSampleSize(Number(e.target.value))}
              className="w-full accent-[#68539A] cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-1">
              Sample Mean (x̄)
            </label>
            <input
              type="number"
              step="0.5"
              value={sampleMean}
              onChange={(e) => setSampleMean(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#B7A3E3]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-1">
              Sample Std Dev (s)
            </label>
            <input
              type="number"
              step="0.5"
              min="1"
              value={sampleStd}
              onChange={(e) => setSampleStd(Math.max(0.1, Number(e.target.value)))}
              className="w-full px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#B7A3E3]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-1">
              Null Baseline (H₀: μ₀)
            </label>
            <input
              type="number"
              step="1"
              value={nullMean}
              onChange={(e) => setNullMean(Number(e.target.value))}
              className="w-full px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#B7A3E3]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-1">
              Confidence Level (1 - α)
            </label>
            <div className="flex gap-2">
              {([0.90, 0.95, 0.99] as (0.90 | 0.95 | 0.99)[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setConfidenceLevel(lvl)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    confidenceLevel === lvl
                      ? 'bg-[#68539A] text-white shadow-xs'
                      : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {(lvl * 100).toFixed(0)}% (α = {(1 - lvl).toFixed(2)})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistical Test Computation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">
              Standard Error (SE)
            </span>
            <span className="text-base sm:text-lg font-extrabold text-[#0F172A]">
              {inference.stdError.toFixed(3)}
            </span>
            <span className="text-[10px] text-[#64748B] block">s / √n</span>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">
              Test Statistic (Z)
            </span>
            <span className="text-base sm:text-lg font-extrabold text-[#0F172A]">
              {inference.zStat.toFixed(3)}
            </span>
            <span className="text-[10px] text-[#64748B] block">(x̄ - μ₀) / SE</span>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">
              Two-Tailed P-Value
            </span>
            <span className={`text-base sm:text-lg font-extrabold ${inference.pValue <= alpha ? 'text-emerald-700' : 'text-[#0F172A]'}`}>
              {inference.pValue < 0.0001 ? '< 0.0001' : inference.pValue.toFixed(4)}
            </span>
            <span className="text-[10px] text-[#64748B] block">Threshold α = {alpha.toFixed(2)}</span>
          </div>

          <div className="p-3.5 bg-[#EEE9F8] rounded-xl border border-[#CFC2EA]">
            <span className="text-[11px] font-bold text-[#68539A] uppercase block">
              {(confidenceLevel * 100).toFixed(0)}% Confidence Interval
            </span>
            <span className="text-sm sm:text-base font-extrabold text-[#68539A]">
              [{inference.ci.lower.toFixed(2)}, {inference.ci.upper.toFixed(2)}]
            </span>
            <span className="text-[10px] text-[#68539A] block">
              Margin: ±{inference.ci.marginOfError.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Statistical Decision Banner */}
        <div
          className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
            inference.rejectNull
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
              : 'bg-amber-50/90 border-amber-300 text-amber-950'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {inference.rejectNull ? (
              <Check className="w-5 h-5 text-emerald-700" />
            ) : (
              <X className="w-5 h-5 text-amber-700" />
            )}
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm">
              Decision: {inference.rejectNull ? 'Reject Null Hypothesis (H₀)' : 'Fail to Reject Null Hypothesis (H₀)'}
            </h4>
            <p className="text-xs leading-relaxed opacity-90">
              {inference.rejectNull
                ? `Since the p-value (${inference.pValue.toFixed(4)}) is less than or equal to the significance level α = ${alpha.toFixed(2)}, there is statistically significant evidence that the true population mean differs from μ₀ = ${nullMean}. Furthermore, the ${(confidenceLevel * 100).toFixed(0)}% confidence interval [${inference.ci.lower.toFixed(2)}, ${inference.ci.upper.toFixed(2)}] does not contain μ₀.`
                : `Since the p-value (${inference.pValue.toFixed(4)}) is greater than α = ${alpha.toFixed(2)}, there is insufficient statistical evidence to reject H₀. The observed difference (x̄ = ${sampleMean} vs μ₀ = ${nullMean}) could plausibly be attributed to random sampling variation.`}
            </p>
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-[#0F172A]">Complete Statistical Inference Lab</h4>
          <p className="text-xs text-[#64748B]">
            Mark this laboratory module completed to update your Unit 4 progress.
          </p>
        </div>

        <Button
          onClick={() => completeLab('statistical-inference')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
            isDone
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
              : 'bg-[#68539A] hover:bg-[#574482] text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {isDone ? 'Lab Completed ✓' : 'Mark Lab Completed'}
        </Button>
      </div>
    </div>
  );
};
