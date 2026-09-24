'use client';

import React, { useState, useMemo } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';
import { bayesTheorem } from '@/lib/statisticsMath';

type BayesScenario = 'fraud' | 'disease' | 'spam';

export const BayesLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-4');
  const isDone = isLabCompleted('bayes');

  const [scenario, setScenario] = useState<BayesScenario>('fraud');
  const [prior, setPrior] = useState<number>(0.01); // 1%
  const [sensitivity, setSensitivity] = useState<number>(0.96); // 96%
  const [falsePositiveRate, setFalsePositiveRate] = useState<number>(0.04); // 4%

  const handleScenarioSelect = (sc: BayesScenario) => {
    setScenario(sc);
    if (sc === 'fraud') {
      setPrior(0.01);
      setSensitivity(0.96);
      setFalsePositiveRate(0.04);
    } else if (sc === 'disease') {
      setPrior(0.002);
      setSensitivity(0.99);
      setFalsePositiveRate(0.03);
    } else {
      setPrior(0.25);
      setSensitivity(0.92);
      setFalsePositiveRate(0.08);
    }
  };

  const bayes = useMemo(() => {
    return bayesTheorem(prior, sensitivity, falsePositiveRate);
  }, [prior, sensitivity, falsePositiveRate]);

  // Scaled contingency matrix for 100,000 population
  const totalPop = 100000;
  const numActualTrue = Math.round(totalPop * prior);
  const numActualFalse = totalPop - numActualTrue;

  const truePositives = Math.round(numActualTrue * sensitivity);
  const falseNegatives = numActualTrue - truePositives;

  const falsePositives = Math.round(numActualFalse * falsePositiveRate);
  const trueNegatives = numActualFalse - falsePositives;

  const totalFlagged = truePositives + falsePositives;

  return (
    <div className="space-y-8">
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
        {/* Header & Scenarios */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#EEE9F8] text-[#68539A]">
                <Sparkles className="w-4 h-4" />
              </span>
              Bayesian Evidence Updating Lab
            </h3>
            <p className="text-xs text-[#64748B]">
              Compute posterior probabilities and audit the base rate fallacy across realistic classification domains.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl self-start sm:self-auto">
            {(
              [
                ['fraud', 'Payment Fraud'],
                ['disease', 'Rare Disease'],
                ['spam', 'Spam Filtering'],
              ] as [BayesScenario, string][]
            ).map(([sc, label]) => (
              <button
                key={sc}
                onClick={() => handleScenarioSelect(sc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  scenario === sc
                    ? 'bg-white text-[#68539A] shadow-xs border border-[#CFC2EA]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
          <div>
            <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
              <span>Prior Base Rate P(A): {(prior * 100).toFixed(2)}%</span>
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
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
              <span>Sensitivity P(Alert | A): {(sensitivity * 100).toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0.50"
              max="0.999"
              step="0.005"
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full accent-[#68539A] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
              <span>False Positive Rate P(Alert | A^c): {(falsePositiveRate * 100).toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0.005"
              max="0.20"
              step="0.005"
              value={falsePositiveRate}
              onChange={(e) => setFalsePositiveRate(Number(e.target.value))}
              className="w-full accent-[#68539A] cursor-pointer"
            />
          </div>
        </div>

        {/* 2x2 Contingency Matrix (100,000 entities) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
            Simulated Confusion Matrix (Cohort: 100,000 Transactions / Patients)
          </h4>

          <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#0F172A] font-semibold">
                <tr>
                  <th className="py-2.5 px-3 sm:px-4">Ground Truth</th>
                  <th className="py-2.5 px-3 sm:px-4">Alert Triggered (Test +)</th>
                  <th className="py-2.5 px-3 sm:px-4">No Alert (Test -)</th>
                  <th className="py-2.5 px-3 sm:px-4">Total Actual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] text-[#475569]">
                <tr className="hover:bg-[#F8FAFC]/50">
                  <td className="py-2.5 px-3 sm:px-4 font-bold text-[#68539A]">
                    Condition Present (A)
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 bg-emerald-50/60 font-mono text-emerald-950 font-bold">
                    {truePositives.toLocaleString()} (TP)
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 font-mono text-[#64748B]">
                    {falseNegatives.toLocaleString()} (FN)
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 font-mono font-bold text-[#0F172A]">
                    {numActualTrue.toLocaleString()}
                  </td>
                </tr>
                <tr className="hover:bg-[#F8FAFC]/50">
                  <td className="py-2.5 px-3 sm:px-4 font-bold text-[#475569]">
                    Condition Absent (A^c)
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 bg-red-50/60 font-mono text-red-950 font-bold">
                    {falsePositives.toLocaleString()} (FP)
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 font-mono text-[#0F172A]">
                    {trueNegatives.toLocaleString()} (TN)
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 font-mono font-bold text-[#0F172A]">
                    {numActualFalse.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Posterior Result Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">
              Prior Probability P(A)
            </span>
            <span className="text-xl font-extrabold text-[#0F172A]">
              {(prior * 100).toFixed(2)}%
            </span>
            <span className="text-[10px] text-[#64748B] block">Initial baseline prevalence</span>
          </div>

          <div className="p-4 bg-[#EEE9F8] rounded-xl border border-[#CFC2EA] space-y-1">
            <span className="text-[11px] font-bold text-[#68539A] uppercase block">
              Posterior Probability P(A | Alert)
            </span>
            <span className="text-2xl font-black text-[#68539A]">
              {(bayes.posterior * 100).toFixed(2)}%
            </span>
            <span className="text-[10px] text-[#68539A] block">
              TP / (TP + FP) = {truePositives} / {totalFlagged}
            </span>
          </div>

          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">
              False Alarm Rate
            </span>
            <span className="text-xl font-extrabold text-red-600">
              {totalFlagged > 0 ? `${((falsePositives / totalFlagged) * 100).toFixed(1)}%` : '0%'}
            </span>
            <span className="text-[10px] text-[#64748B] block">Proportion of alerts that are benign</span>
          </div>
        </div>

        {/* Warning Callout on Medical/Scientific Context */}
        <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 flex items-start gap-3 text-xs text-amber-950 leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Educational Note:</strong> This laboratory simulates the mathematical mechanics of Bayesian updating for data science classification models (like spam and fraud filters) and illustrative medical test statistics. It does not provide real-world medical advice.
          </span>
        </div>
      </div>

      {/* Completion Banner */}
      <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-[#0F172A]">Complete Bayes’ Theorem Lab</h4>
          <p className="text-xs text-[#64748B]">
            Mark this laboratory module completed to update your Unit 4 progress.
          </p>
        </div>

        <Button
          onClick={() => completeLab('bayes')}
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
