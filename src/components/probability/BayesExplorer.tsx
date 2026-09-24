'use client';

import React, { useState, useMemo } from 'react';
import { bayesTheorem } from '@/lib/statisticsMath';
import { Sparkles, AlertTriangle, Check, ShieldAlert } from 'lucide-react';

export const BayesExplorer: React.FC = () => {
  const [prior, setPrior] = useState<number>(0.01); // 1%
  const [sensitivity, setSensitivity] = useState<number>(0.95); // 95% TPR
  const [falsePositiveRate, setFalsePositiveRate] = useState<number>(0.05); // 5% FPR

  const bayes = useMemo(() => {
    return bayesTheorem(prior, sensitivity, falsePositiveRate);
  }, [prior, sensitivity, falsePositiveRate]);

  // Population frequency breakdown (out of 10,000 people/samples)
  const population = 10000;
  const numConditionTrue = Math.round(population * prior);
  const numConditionFalse = population - numConditionTrue;

  const truePositives = Math.round(numConditionTrue * sensitivity);
  const falseNegatives = numConditionTrue - truePositives;

  const falsePositives = Math.round(numConditionFalse * falsePositiveRate);
  const trueNegatives = numConditionFalse - falsePositives;

  const totalPositiveTests = truePositives + falsePositives;

  // Preset scenarios
  const applyPreset = (p: number, sens: number, fpr: number) => {
    setPrior(p);
    setSensitivity(sens);
    setFalsePositiveRate(fpr);
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header & Preset Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#EEE9F8] text-[#68539A]">
              <Sparkles className="w-4 h-4" />
            </span>
            Bayesian Inference & Base-Rate Explorer
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Visualize why rare base rates produce high false positive proportions despite accurate tests.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
          <button
            onClick={() => applyPreset(0.01, 0.95, 0.05)}
            className="px-2.5 py-1 bg-[#F8FAFC] hover:bg-[#EEE9F8] text-[#68539A] border border-[#E2E8F0] hover:border-[#CFC2EA] rounded-lg text-xs font-semibold transition-all cursor-pointer"
          >
            Rare Fraud (1%)
          </button>
          <button
            onClick={() => applyPreset(0.001, 0.99, 0.02)}
            className="px-2.5 py-1 bg-[#F8FAFC] hover:bg-[#EEE9F8] text-[#68539A] border border-[#E2E8F0] hover:border-[#CFC2EA] rounded-lg text-xs font-semibold transition-all cursor-pointer"
          >
            Rare Disease (0.1%)
          </button>
          <button
            onClick={() => applyPreset(0.20, 0.90, 0.08)}
            className="px-2.5 py-1 bg-[#F8FAFC] hover:bg-[#EEE9F8] text-[#68539A] border border-[#E2E8F0] hover:border-[#CFC2EA] rounded-lg text-xs font-semibold transition-all cursor-pointer"
          >
            Spam Filter (20%)
          </button>
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
        <div>
          <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
            <span>Prior P(A): {(prior * 100).toFixed(2)}%</span>
            <span className="text-[#68539A] font-mono">{prior.toFixed(4)}</span>
          </div>
          <input
            type="range"
            min="0.001"
            max="0.50"
            step="0.001"
            value={prior}
            onChange={(e) => setPrior(Number(e.target.value))}
            className="w-full accent-[#68539A] cursor-pointer"
          />
          <span className="text-[10px] text-[#94A3B8] block mt-0.5">Base rate in general population</span>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
            <span>Sensitivity P(B | A): {(sensitivity * 100).toFixed(1)}%</span>
            <span className="text-[#68539A] font-mono">{sensitivity.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.50"
            max="0.99"
            step="0.01"
            value={sensitivity}
            onChange={(e) => setSensitivity(Number(e.target.value))}
            className="w-full accent-[#68539A] cursor-pointer"
          />
          <span className="text-[10px] text-[#94A3B8] block mt-0.5">True positive detection rate</span>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
            <span>False Alarm P(B | A^c): {(falsePositiveRate * 100).toFixed(1)}%</span>
            <span className="text-[#68539A] font-mono">{falsePositiveRate.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.25"
            step="0.005"
            value={falsePositiveRate}
            onChange={(e) => setFalsePositiveRate(Number(e.target.value))}
            className="w-full accent-[#68539A] cursor-pointer"
          />
          <span className="text-[10px] text-[#94A3B8] block mt-0.5">False positive rate on benign cases</span>
        </div>
      </div>

      {/* 10,000 Population Frequency Tree Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          Population Natural Frequency Tree (10,000 Individuals)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Condition Positive Branch */}
          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2.5">
            <div className="flex justify-between items-center text-xs font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">
              <span className="flex items-center gap-1.5 text-[#68539A]">
                <ShieldAlert className="w-4 h-4" /> Condition Present (A)
              </span>
              <span className="font-mono">{numConditionTrue.toLocaleString()} / 10,000</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="text-[11px] font-bold text-emerald-900 block">True Positive (TP)</span>
                <span className="text-sm font-extrabold text-emerald-800">{truePositives}</span>
                <span className="text-[10px] text-emerald-700 block">Tested Positive</span>
              </div>
              <div className="p-2.5 bg-[#F1F5F9] rounded-lg border border-[#E2E8F0]">
                <span className="text-[11px] font-bold text-[#64748B] block">False Negative (FN)</span>
                <span className="text-sm font-extrabold text-[#0F172A]">{falseNegatives}</span>
                <span className="text-[10px] text-[#64748B] block">Missed Detection</span>
              </div>
            </div>
          </div>

          {/* Condition Negative Branch */}
          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2.5">
            <div className="flex justify-between items-center text-xs font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">
              <span className="flex items-center gap-1.5 text-[#64748B]">
                <Check className="w-4 h-4 text-emerald-600" /> Condition Absent (A^c)
              </span>
              <span className="font-mono">{numConditionFalse.toLocaleString()} / 10,000</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-red-50 rounded-lg border border-red-200">
                <span className="text-[11px] font-bold text-red-900 block">False Positive (FP)</span>
                <span className="text-sm font-extrabold text-red-800">{falsePositives}</span>
                <span className="text-[10px] text-red-700 block">False Alarm</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-[#E2E8F0]">
                <span className="text-[11px] font-bold text-[#64748B] block">True Negative (TN)</span>
                <span className="text-sm font-extrabold text-[#0F172A]">{trueNegatives.toLocaleString()}</span>
                <span className="text-[10px] text-[#64748B] block">Correctly Cleared</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bayes Posterior Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase block">
            Total Positive Signals P(B)
          </span>
          <span className="text-lg font-extrabold text-[#0F172A]">
            {(bayes.evidence * 100).toFixed(2)}%
          </span>
          <span className="text-[10px] text-[#64748B] block">
            {totalPositiveTests.toLocaleString()} total alerts in 10,000
          </span>
        </div>

        <div className="p-3.5 bg-[#EEE9F8] rounded-xl border border-[#CFC2EA] space-y-1">
          <span className="text-[11px] font-bold text-[#68539A] uppercase block">
            Posterior P(A | B)
          </span>
          <span className="text-xl font-black text-[#68539A]">
            {(bayes.posterior * 100).toFixed(2)}%
          </span>
          <span className="text-[10px] text-[#68539A] block">
            TP / (TP + FP) = {truePositives} / {totalPositiveTests}
          </span>
        </div>

        <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase block">
            False Discovery Proportion
          </span>
          <span className="text-lg font-extrabold text-red-600">
            {totalPositiveTests > 0 ? `${((falsePositives / totalPositiveTests) * 100).toFixed(1)}%` : '0%'}
          </span>
          <span className="text-[10px] text-[#64748B] block">
            FP / (TP + FP) = {falsePositives} / {totalPositiveTests}
          </span>
        </div>
      </div>

      {/* Educational Base Rate Alert */}
      <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 flex items-start gap-3 text-xs text-amber-950 leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>The Base Rate Fallacy Explained:</strong> When prior prevalence is low ({ (prior * 100).toFixed(1) }%), the vast majority of the population is benign. Thus even a small 5% false alarm rate on the 9,900 healthy cases produces {falsePositives} false alarms—outnumbering the {truePositives} true positives!
        </div>
      </div>
    </div>
  );
};
