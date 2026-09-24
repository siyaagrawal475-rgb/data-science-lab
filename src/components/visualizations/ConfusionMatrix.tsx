'use client';

import React from 'react';

interface ConfusionMatrixProps {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
  accentColor?: string;
}

export const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({
  tp,
  fp,
  fn,
  tn,
  accentColor = '#D99AAF',
}) => {
  const total = tp + fp + fn + tn;
  const accuracy = total > 0 ? (tp + tn) / total : 0;
  const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
  const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
  const specificity = tn + fp > 0 ? tn / (tn + fp) : 0;
  const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  return (
    <div className="w-full space-y-4 py-2">
      {/* 2x2 Matrix Table */}
      <div className="max-w-md mx-auto">
        <div className="text-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
          Predicted Class
        </div>
        <div className="grid grid-cols-[auto_1fr_1fr] gap-2 items-center text-center">
          {/* Header Row */}
          <div></div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            Positive (1)
          </div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            Negative (0)
          </div>

          {/* Actual Positive Row */}
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 px-2 text-right">
            Actual Pos (1)
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
              True Positive (TP)
            </span>
            <span className="text-xl font-mono font-extrabold text-emerald-700 dark:text-emerald-300">
              {tp}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400">
              False Negative (FN)
            </span>
            <span className="text-xl font-mono font-extrabold text-rose-700 dark:text-rose-300">
              {fn}
            </span>
          </div>

          {/* Actual Negative Row */}
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 px-2 text-right">
            Actual Neg (0)
          </div>
          <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/30 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
              False Positive (FP)
            </span>
            <span className="text-xl font-mono font-extrabold text-amber-700 dark:text-amber-300">
              {fp}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-blue-500/15 border border-blue-500/30 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">
              True Negative (TN)
            </span>
            <span className="text-xl font-mono font-extrabold text-blue-700 dark:text-blue-300">
              {tn}
            </span>
          </div>
        </div>
      </div>

      {/* Evaluation Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs pt-2">
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#1B2735] border border-slate-200 dark:border-[#2E3B4A]">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">Accuracy</div>
          <div className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">
            {(accuracy * 100).toFixed(1)}%
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#1B2735] border border-slate-200 dark:border-[#2E3B4A]">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">Precision</div>
          <div className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">
            {(precision * 100).toFixed(1)}%
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#1B2735] border border-slate-200 dark:border-[#2E3B4A]">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">Recall / TPR</div>
          <div className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">
            {(recall * 100).toFixed(1)}%
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#1B2735] border border-slate-200 dark:border-[#2E3B4A]">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">Specificity</div>
          <div className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">
            {(specificity * 100).toFixed(1)}%
          </div>
        </div>
        <div
          className="p-2.5 rounded-xl border font-semibold"
          style={{
            backgroundColor: `${accentColor}20`,
            borderColor: `${accentColor}60`,
          }}
        >
          <div className="text-[10px] uppercase text-slate-700 dark:text-slate-300">F1 Score</div>
          <div className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">
            {f1.toFixed(3)}
          </div>
        </div>
      </div>
    </div>
  );
};
