'use client';

import React, { useState, useMemo } from 'react';
import {
  calculateConfusionMatrix,
  calculateRocCurve,
  classificationThreshold
} from '@/lib/classificationMath';
import { Grid, Sliders, AlertTriangle } from 'lucide-react';

interface ScenarioPreset {
  name: string;
  description: string;
  nTotal: number;
  posRatio: number;
  // Generated synthetic probabilities
  probs: number[];
  labels: number[];
}

// Generate realistic synthetic prediction scores for 3 distinct data science scenarios
const createScenario = (name: string, description: string, n: number, posRatio: number): ScenarioPreset => {
  const labels: number[] = [];
  const probs: number[] = [];

  // Seeded deterministic generation
  let seed = 42;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const nPos = Math.round(n * posRatio);
  const nNeg = n - nPos;

  // Positive class probabilities centered around ~0.75
  for (let i = 0; i < nPos; i++) {
    labels.push(1);
    const p = Math.min(0.98, Math.max(0.1, 0.72 + (rand() - 0.5) * 0.4));
    probs.push(p);
  }

  // Negative class probabilities centered around ~0.25
  for (let i = 0; i < nNeg; i++) {
    labels.push(0);
    const p = Math.min(0.9, Math.max(0.02, 0.22 + (rand() - 0.5) * 0.35));
    probs.push(p);
  }

  return { name, description, nTotal: n, posRatio, probs, labels };
};

const SCENARIOS: ScenarioPreset[] = [
  createScenario(
    'Balanced Customer Churn (50/50)',
    'Evenly distributed dataset where accuracy and F1 score remain well-aligned.',
    200,
    0.50
  ),
  createScenario(
    'Moderate Cancer Screening (80/20)',
    '20% positive prevalence. Missing positive cases (FN) carries serious clinical cost.',
    200,
    0.20
  ),
  createScenario(
    'Severe Financial Fraud (98/2)',
    '2% positive prevalence. Demonstrates the Accuracy Paradox where 98% accuracy can have 0% recall.',
    200,
    0.02
  )
];

export const ConfusionMatrixExplorer: React.FC = () => {
  const [scenarioIdx, setScenarioIdx] = useState<number>(0);
  const [threshold, setThreshold] = useState<number>(0.50);

  const activeScenario = SCENARIOS[scenarioIdx];

  // Compute predictions given threshold
  const predictions = useMemo(() => {
    return classificationThreshold(activeScenario.probs, threshold);
  }, [activeScenario.probs, threshold]);

  // Compute Confusion Matrix
  const cm = useMemo(() => {
    return calculateConfusionMatrix(activeScenario.labels, predictions);
  }, [activeScenario.labels, predictions]);

  // Compute ROC curve for the dataset
  const roc = useMemo(() => {
    return calculateRocCurve(activeScenario.labels, activeScenario.probs, 30);
  }, [activeScenario]);

  return (
    <div className="w-full bg-white rounded-xl border border-[#E5BBC9]/50 shadow-sm p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5BBC9]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#F6E5EB] text-[#8A4E63]">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">
                Confusion Matrix & Model Evaluation Explorer
              </h3>
              <p className="text-xs text-slate-500">
                Inspect the 2×2 Confusion Matrix, calibrate decision thresholds, and explore precision-recall tradeoffs.
              </p>
            </div>
          </div>
        </div>

        {/* Scenario Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="cm-scenario-select" className="text-xs font-medium text-slate-600">
            Scenario:
          </label>
          <select
            id="cm-scenario-select"
            value={scenarioIdx}
            onChange={(e) => setScenarioIdx(Number(e.target.value))}
            className="text-xs font-medium bg-slate-50 border border-[#E5BBC9] rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#D99AAF]"
          >
            {SCENARIOS.map((sc, idx) => (
              <option key={idx} value={idx}>
                {sc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Threshold Slider Bar */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
        <div className="flex justify-between text-xs items-center">
          <span className="text-slate-700 font-semibold flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#8A4E63]" />
            Operating Decision Threshold (τ):
          </span>
          <span className="font-mono font-bold text-sm text-[#8A4E63]">
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
          className="w-full accent-[#D99AAF] cursor-pointer"
          aria-label="Operating Decision Threshold"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>0.05 (Maximum Sensitivity / High Recall)</span>
          <span>0.50 (Balanced Baseline)</span>
          <span>0.95 (Maximum Specificity / High Precision)</span>
        </div>
      </div>

      {/* Main Grid: Confusion Matrix Table + Metric Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 2×2 Confusion Matrix (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              2 × 2 Confusion Matrix
            </span>
            <span className="text-xs text-slate-400">
              Total Samples: <strong>{cm.total}</strong>
            </span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-center text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-500 font-semibold">
                  <th className="p-2.5 text-left border-r border-slate-200 w-1/3">True \ Pred</th>
                  <th className="p-2.5 w-1/3 text-emerald-700 bg-emerald-50/40">Predicted Positive (1)</th>
                  <th className="p-2.5 w-1/3 text-slate-600">Predicted Negative (0)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {/* Actual Positive Row */}
                <tr>
                  <td className="p-3 text-left font-sans font-semibold text-slate-700 bg-slate-50/60 border-r border-slate-200 text-xs">
                    Actual Positive (1)
                    <span className="block text-[10px] font-normal text-slate-400">
                      Total: {cm.tp + cm.fn}
                    </span>
                  </td>
                  <td className="p-3 bg-emerald-50/60 text-emerald-800 font-bold border-r border-slate-100">
                    <div className="text-base">{cm.tp}</div>
                    <div className="text-[10px] font-sans font-medium text-emerald-600">
                      True Positive (TP)
                    </div>
                  </td>
                  <td className="p-3 bg-rose-50/60 text-rose-800 font-bold">
                    <div className="text-base">{cm.fn}</div>
                    <div className="text-[10px] font-sans font-medium text-rose-600">
                      False Negative (FN)
                    </div>
                  </td>
                </tr>

                {/* Actual Negative Row */}
                <tr>
                  <td className="p-3 text-left font-sans font-semibold text-slate-700 bg-slate-50/60 border-r border-slate-200 text-xs">
                    Actual Negative (0)
                    <span className="block text-[10px] font-normal text-slate-400">
                      Total: {cm.tn + cm.fp}
                    </span>
                  </td>
                  <td className="p-3 bg-rose-50/60 text-rose-800 font-bold border-r border-slate-100">
                    <div className="text-base">{cm.fp}</div>
                    <div className="text-[10px] font-sans font-medium text-rose-600">
                      False Positive (FP)
                    </div>
                  </td>
                  <td className="p-3 bg-emerald-50/60 text-emerald-800 font-bold">
                    <div className="text-base">{cm.tn}</div>
                    <div className="text-[10px] font-sans font-medium text-emerald-600">
                      True Negative (TN)
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Imbalance Alert under severe scenario */}
          {activeScenario.posRatio <= 0.05 && (
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Accuracy Paradox in Effect:</strong> Because 98% of observations are Negative, high accuracy (~98%) can be achieved even with severe false negative errors. Rely on <strong>Recall</strong>, <strong>Precision</strong>, and <strong>F1-Score</strong> instead.
              </div>
            </div>
          )}
        </div>

        {/* 6 Metric Dashboard (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Evaluation Metrics
            </span>
            <span className="text-xs text-slate-400">
              ROC-AUC: <strong>{roc.auc.toFixed(3)}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {/* Accuracy */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 shadow-xs">
              <div className="text-[10px] font-medium text-slate-400">Accuracy</div>
              <div className="font-mono font-bold text-base text-slate-800">
                {(cm.accuracy * 100).toFixed(1)}%
              </div>
              <div className="text-[9px] text-slate-400">(TP+TN)/Total</div>
            </div>

            {/* Precision */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 shadow-xs">
              <div className="text-[10px] font-medium text-slate-400">Precision</div>
              <div className="font-mono font-bold text-base text-slate-800">
                {(cm.precision * 100).toFixed(1)}%
              </div>
              <div className="text-[9px] text-slate-400">TP / (TP+FP)</div>
            </div>

            {/* Recall */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 shadow-xs">
              <div className="text-[10px] font-medium text-slate-400">Recall (Sensitivity)</div>
              <div className="font-mono font-bold text-base text-slate-800">
                {(cm.recall * 100).toFixed(1)}%
              </div>
              <div className="text-[9px] text-slate-400">TP / (TP+FN)</div>
            </div>

            {/* Specificity */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 shadow-xs">
              <div className="text-[10px] font-medium text-slate-400">Specificity</div>
              <div className="font-mono font-bold text-base text-slate-800">
                {(cm.specificity * 100).toFixed(1)}%
              </div>
              <div className="text-[9px] text-slate-400">TN / (TN+FP)</div>
            </div>

            {/* F1 Score */}
            <div className="bg-[#F6E5EB]/50 rounded-xl p-3 border border-[#E5BBC9]/60 shadow-xs">
              <div className="text-[10px] font-medium text-[#8A4E63]">F1-Score</div>
              <div className="font-mono font-bold text-base text-[#8A4E63]">
                {(cm.f1Score * 100).toFixed(1)}%
              </div>
              <div className="text-[9px] text-slate-500">2·P·R / (P+R)</div>
            </div>

            {/* Balanced Accuracy */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 shadow-xs">
              <div className="text-[10px] font-medium text-slate-400">Balanced Acc</div>
              <div className="font-mono font-bold text-base text-slate-800">
                {(cm.balancedAccuracy * 100).toFixed(1)}%
              </div>
              <div className="text-[9px] text-slate-400">(Recall+Spec)/2</div>
            </div>
          </div>

          {/* Operational Guidance */}
          <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-semibold text-slate-700 block">Threshold Tradeoff Guide:</span>
            <p className="text-[11px] leading-relaxed">
              • <strong>Lowering τ</strong> (e.g. 0.20) captures more positive instances (↑ Recall, ↓ False Negatives) but triggers more false alarms (↓ Precision).<br />
              • <strong>Raising τ</strong> (e.g. 0.80) ensures flagged positive alerts are high confidence (↑ Precision) but misses marginal positive cases (↓ Recall).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
