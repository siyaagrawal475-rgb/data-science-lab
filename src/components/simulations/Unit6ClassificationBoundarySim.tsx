'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, Sliders, ShieldCheck } from 'lucide-react';

export const Unit6ClassificationBoundarySim: React.FC = () => {
  const [threshold, setThreshold] = useState(0.5);
  const noiseLevel = 0.15;

  // 20 simulated test cases with true probabilities and ground truth labels
  const data = useMemo(() => {
    const items = [
      { id: 1, baseProb: 0.95, trueLabel: 1 },
      { id: 2, baseProb: 0.89, trueLabel: 1 },
      { id: 3, baseProb: 0.84, trueLabel: 1 },
      { id: 4, baseProb: 0.82, trueLabel: 1 },
      { id: 5, baseProb: 0.77, trueLabel: 1 },
      { id: 6, baseProb: 0.71, trueLabel: 1 },
      { id: 7, baseProb: 0.65, trueLabel: 1 },
      { id: 8, baseProb: 0.58, trueLabel: 1 },
      { id: 9, baseProb: 0.54, trueLabel: 0 }, // Borderline false positive candidate
      { id: 10, baseProb: 0.49, trueLabel: 1 }, // Borderline false negative candidate
      { id: 11, baseProb: 0.45, trueLabel: 0 },
      { id: 12, baseProb: 0.41, trueLabel: 0 },
      { id: 13, baseProb: 0.35, trueLabel: 0 },
      { id: 14, baseProb: 0.30, trueLabel: 0 },
      { id: 15, baseProb: 0.25, trueLabel: 0 },
      { id: 16, baseProb: 0.20, trueLabel: 0 },
      { id: 17, baseProb: 0.15, trueLabel: 0 },
      { id: 18, baseProb: 0.10, trueLabel: 0 },
      { id: 19, baseProb: 0.05, trueLabel: 0 },
      { id: 20, baseProb: 0.02, trueLabel: 0 },
    ];

    return items.map((item) => {
      const perturbed = Math.max(0.01, Math.min(0.99, item.baseProb + (Math.sin(item.id * 3) * noiseLevel)));
      return {
        ...item,
        score: perturbed,
      };
    });
  }, [noiseLevel]);

  // Compute Confusion Matrix based on current threshold t
  const { tp, fp, tn, fn, precision, recall, f1, accuracy } = useMemo(() => {
    let tPos = 0, fPos = 0, tNeg = 0, fNeg = 0;

    data.forEach((d) => {
      const pred = d.score >= threshold ? 1 : 0;
      if (d.trueLabel === 1 && pred === 1) tPos++;
      else if (d.trueLabel === 0 && pred === 1) fPos++;
      else if (d.trueLabel === 0 && pred === 0) tNeg++;
      else if (d.trueLabel === 1 && pred === 0) fNeg++;
    });

    const prec = tPos + fPos > 0 ? (tPos / (tPos + fPos)) * 100 : 100;
    const rec = tPos + fNeg > 0 ? (tPos / (tPos + fNeg)) * 100 : 0;
    const f1Score = prec + rec > 0 ? (2 * (prec * rec)) / (prec + rec) : 0;
    const acc = ((tPos + tNeg) / data.length) * 100;

    return {
      tp: tPos,
      fp: fPos,
      tn: tNeg,
      fn: fNeg,
      precision: prec,
      recall: rec,
      f1: f1Score,
      accuracy: acc,
    };
  }, [data, threshold]);

  return (
    <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-6">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#334155] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F6E5EB] dark:bg-[#D99AAF]/20 text-[#8A4E63] dark:text-[#FACCDA] border border-[#E5BBC9] dark:border-[#D99AAF]/40">
              Unit 6 Interactive Simulation
            </span>
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">Evaluation & ROC Dynamics</span>
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
            Decision Threshold & Confusion Matrix Explorer
          </h3>
        </div>
      </div>

      {/* Threshold Slider Control */}
      <div className="p-4 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#D99AAF]" />
            <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">Classification Threshold (t)</span>
          </div>
          <span className="text-base font-extrabold font-mono text-pink-600 dark:text-pink-400">
            {threshold.toFixed(2)}
          </span>
        </div>

        <input
          type="range"
          min="0.05"
          max="0.95"
          step="0.05"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full accent-[#D99AAF]"
        />

        <div className="flex justify-between text-[10px] text-[#94A3B8]">
          <span>t = 0.05 (High Recall / Aggressive)</span>
          <span>t = 0.50 (Standard)</span>
          <span>t = 0.95 (High Precision / Conservative)</span>
        </div>
      </div>

      {/* Grid: 2x2 Confusion Matrix + Probability Spectrum */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* 2x2 Confusion Matrix Display */}
        <div className="p-4 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-3">
          <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-pink-600" />
            <span>2×2 Live Confusion Matrix (n = 20)</span>
          </h4>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-800 space-y-0.5">
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300">True Positive (TP)</span>
              <div className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">{tp}</div>
              <span className="text-[9px] text-emerald-600">Actual 1 → Pred 1</span>
            </div>

            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-300 dark:border-rose-800 space-y-0.5">
              <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300">False Positive (FP)</span>
              <div className="text-xl font-extrabold text-rose-700 dark:text-rose-300 font-mono">{fp}</div>
              <span className="text-[9px] text-rose-600">Actual 0 → Pred 1 (False Alarm)</span>
            </div>

            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-300 dark:border-rose-800 space-y-0.5">
              <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300">False Negative (FN)</span>
              <div className="text-xl font-extrabold text-rose-700 dark:text-rose-300 font-mono">{fn}</div>
              <span className="text-[9px] text-rose-600">Actual 1 → Pred 0 (Missed)</span>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-800 space-y-0.5">
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300">True Negative (TN)</span>
              <div className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">{tn}</div>
              <span className="text-[9px] text-emerald-600">Actual 0 → Pred 0</span>
            </div>
          </div>
        </div>

        {/* Probability Score Distribution Plot */}
        <div className="p-4 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-3">
          <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            Predicted Probability Distribution vs Threshold Line
          </h4>

          <div className="h-28 relative bg-white dark:bg-[#111827] rounded-lg border border-[#E2E8F0] dark:border-[#334155] p-2 flex items-center overflow-hidden">
            {/* Threshold vertical line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-pink-500 z-10"
              style={{ left: `${threshold * 100}%` }}
            >
              <span className="absolute -top-1 -translate-x-1/2 bg-pink-500 text-white text-[8px] font-bold px-1 rounded">
                t={threshold}
              </span>
            </div>

            {/* Scatter points along probability axis */}
            {data.map((d) => (
              <div
                key={d.id}
                className={`absolute w-3 h-3 rounded-full border border-white dark:border-[#111827] shadow-2xs -translate-x-1/2 transition-all ${
                  d.trueLabel === 1 ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-500'
                }`}
                style={{
                  left: `${d.score * 100}%`,
                  top: `${(d.id % 4) * 20 + 15}px`,
                }}
                title={`Item ${d.id}: p=${d.score.toFixed(2)}, True=${d.trueLabel}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-[#94A3B8]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-400" /> Negative Class (0)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Positive Class (1)
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Precision</span>
          <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-mono">
            {precision.toFixed(1)}%
          </div>
          <span className="text-[10px] text-[#94A3B8]">TP / (TP + FP)</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Recall</span>
          <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {recall.toFixed(1)}%
          </div>
          <span className="text-[10px] text-[#94A3B8]">TP / (TP + FN)</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">F1-Score</span>
          <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-mono">
            {f1.toFixed(1)}%
          </div>
          <span className="text-[10px] text-[#94A3B8]">Harmonic Mean</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Overall Accuracy</span>
          <div className="text-base font-extrabold text-[#0F172A] dark:text-[#F8FAFC] font-mono">
            {accuracy.toFixed(1)}%
          </div>
          <span className="text-[10px] text-[#94A3B8]">(TP + TN) / Total</span>
        </div>
      </div>

      {/* Educational Insight */}
      <div className="p-4 rounded-xl bg-pink-50/50 dark:bg-[#1E293B] border border-pink-200/70 dark:border-pink-900/40 text-xs space-y-2">
        <div className="font-bold text-[#8A4E63] dark:text-[#FACCDA] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>Precision-Recall Trade-off in Action:</span>
        </div>
        <p className="text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
          Slide threshold <strong>t to 0.80</strong>. Notice how <strong>Precision climbs to 100%</strong> because False Positives drop to 0, but <strong>Recall decreases</strong> because borderline true positive cases are missed. Shifting <strong>t to 0.20</strong> maximizes Recall to 100% at the cost of false alarms.
        </p>
      </div>
    </div>
  );
};
