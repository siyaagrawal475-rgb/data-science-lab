'use client';

import React, { useState, useMemo } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { Grid, Check, Play, DollarSign } from 'lucide-react';
import {
  calculateConfusionMatrix,
  calculateRocCurve,
  classificationThreshold
} from '@/lib/classificationMath';

interface LabScenario {
  id: string;
  name: string;
  description: string;
  posRatio: number;
  costFP: number; // Cost of false positive
  costFN: number; // Cost of false negative
  probs: number[];
  labels: number[];
}

const generateScenarioData = (
  id: string,
  name: string,
  description: string,
  posRatio: number,
  costFP: number,
  costFN: number,
  n: number = 200
): LabScenario => {
  const labels: number[] = [];
  const probs: number[] = [];

  let seed = 123;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const nPos = Math.round(n * posRatio);
  const nNeg = n - nPos;

  for (let i = 0; i < nPos; i++) {
    labels.push(1);
    const p = Math.min(0.98, Math.max(0.12, 0.74 + (rand() - 0.5) * 0.42));
    probs.push(p);
  }

  for (let i = 0; i < nNeg; i++) {
    labels.push(0);
    const p = Math.min(0.88, Math.max(0.02, 0.24 + (rand() - 0.5) * 0.38));
    probs.push(p);
  }

  return { id, name, description, posRatio, costFP, costFN, probs, labels };
};

const SCENARIOS: LabScenario[] = [
  generateScenarioData(
    'fraud',
    'Financial Fraud Detection (Imbalance 5%, High FN Cost)',
    'Missing fraud (FN) costs $500 in direct loss; flagging a legitimate card (FP) costs $15 in review fees.',
    0.05,
    15,
    500
  ),
  generateScenarioData(
    'spam',
    'Email Spam Filtering (Imbalance 30%, High FP Cost)',
    'Sending crucial work email to spam folder (FP) costs $100 in lost productivity; seeing spam (FN) costs $2.',
    0.30,
    100,
    2
  ),
  generateScenarioData(
    'medical',
    'Oncology Biopsy Screening (Imbalance 15%, Extreme FN Cost)',
    'Missing a malignant tumor (FN) is life-threatening ($2,000 penalty); unnecessary biopsy (FP) costs $80.',
    0.15,
    80,
    2000
  )
];

export const ModelEvaluationLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-6');
  const isDone = isLabCompleted('model-evaluation');

  const [scenarioId, setScenarioId] = useState<string>('fraud');
  const [threshold, setThreshold] = useState<number>(0.50);

  const scenario = useMemo(() => {
    return SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
  }, [scenarioId]);

  const predictions = useMemo(() => {
    return classificationThreshold(scenario.probs, threshold);
  }, [scenario.probs, threshold]);

  const cm = useMemo(() => {
    return calculateConfusionMatrix(scenario.labels, predictions);
  }, [scenario.labels, predictions]);

  const roc = useMemo(() => {
    return calculateRocCurve(scenario.labels, scenario.probs, 30);
  }, [scenario]);

  // Operational cost calculation: Cost = FP * C_FP + FN * C_FN
  const totalCost = useMemo(() => {
    return cm.fp * scenario.costFP + cm.fn * scenario.costFN;
  }, [cm, scenario]);

  const handleComplete = () => {
    completeLab('model-evaluation');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-[#E5BBC9]/50 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#8A4E63] font-semibold text-xs uppercase tracking-wide">
              <Grid className="w-4 h-4" />
              Unit 6 Lab 4
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Classification Model Evaluation Lab
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Calibrate decision thresholds across imbalanced datasets and optimize asymmetric operational cost matrices.
            </p>
          </div>

          <Button
            onClick={handleComplete}
            disabled={isDone}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              isDone
                ? 'bg-emerald-100 text-emerald-800 cursor-default'
                : 'bg-[#D99AAF] text-slate-900 hover:bg-[#d08a9f] shadow-xs'
            }`}
          >
            {isDone ? (
              <>
                <Check className="w-4 h-4" /> Lab Completed
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Mark as Complete
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <label htmlFor="eval-lab-sc" className="text-xs font-semibold text-slate-700 block mb-2">
            1. Select Real-World Evaluation Domain
          </label>
          <select
            id="eval-lab-sc"
            value={scenarioId}
            onChange={(e) => setScenarioId(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#D99AAF]"
          >
            {SCENARIOS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-500 mt-1.5">{scenario.description}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-700">
              2. Decision Threshold (τ)
            </label>
            <span className="font-mono font-bold text-xs text-[#8A4E63]">
              τ = {threshold.toFixed(2)}
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
            aria-label="Threshold"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0.05 (High Sensitivity)</span>
            <span>0.50</span>
            <span>0.95 (High Specificity)</span>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Confusion Matrix (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-900 text-sm">
              Confusion Matrix Outcomes
            </h3>
            <span className="text-xs text-slate-400">N = {cm.total}</span>
          </div>

          <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-center text-xs">
              <thead className="bg-slate-100/80 text-slate-600 font-semibold text-[11px]">
                <tr>
                  <th className="p-2.5 text-left border-r border-slate-200">True \ Pred</th>
                  <th className="p-2.5">Pred 1 (Positive)</th>
                  <th className="p-2.5">Pred 0 (Negative)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                <tr>
                  <td className="p-3 text-left font-sans font-semibold bg-slate-100/50 border-r border-slate-200 text-xs">
                    Actual 1 (Pos)
                  </td>
                  <td className="p-3 bg-emerald-50 text-emerald-900 font-bold border-r border-slate-200">
                    <div className="text-base">{cm.tp}</div>
                    <div className="text-[10px] font-sans text-emerald-600">True Positive</div>
                  </td>
                  <td className="p-3 bg-rose-50 text-rose-900 font-bold">
                    <div className="text-base">{cm.fn}</div>
                    <div className="text-[10px] font-sans text-rose-600">False Negative</div>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-left font-sans font-semibold bg-slate-100/50 border-r border-slate-200 text-xs">
                    Actual 0 (Neg)
                  </td>
                  <td className="p-3 bg-rose-50 text-rose-900 font-bold border-r border-slate-200">
                    <div className="text-base">{cm.fp}</div>
                    <div className="text-[10px] font-sans text-rose-600">False Positive</div>
                  </td>
                  <td className="p-3 bg-emerald-50 text-emerald-900 font-bold">
                    <div className="text-base">{cm.tn}</div>
                    <div className="text-[10px] font-sans text-emerald-600">True Negative</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Operational Cost Matrix Result */}
          <div className="bg-[#F6E5EB]/40 rounded-xl p-3.5 border border-[#E5BBC9]/60 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#8A4E63] flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Total Misclassification Cost:
              </div>
              <div className="text-[10px] text-slate-500">
                {cm.fp} FP × ${scenario.costFP} + {cm.fn} FN × ${scenario.costFN}
              </div>
            </div>
            <div className="font-mono font-bold text-lg text-slate-900">
              ${totalCost.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Evaluation Metrics (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-900 text-sm">
              Performance Metric Suite
            </h3>
            <span className="text-xs font-mono text-slate-500">
              ROC-AUC: <strong>{roc.auc.toFixed(3)}</strong>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
              <div className="text-[10px] text-slate-400">Accuracy</div>
              <div className="font-mono font-bold text-slate-800 text-sm">
                {(cm.accuracy * 100).toFixed(1)}%
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
              <div className="text-[10px] text-slate-400">Precision</div>
              <div className="font-mono font-bold text-slate-800 text-sm">
                {(cm.precision * 100).toFixed(1)}%
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
              <div className="text-[10px] text-slate-400">Recall</div>
              <div className="font-mono font-bold text-slate-800 text-sm">
                {(cm.recall * 100).toFixed(1)}%
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
              <div className="text-[10px] text-slate-400">Specificity</div>
              <div className="font-mono font-bold text-slate-800 text-sm">
                {(cm.specificity * 100).toFixed(1)}%
              </div>
            </div>
            <div className="bg-[#F6E5EB]/50 rounded-lg p-2.5 border border-[#E5BBC9]/60">
              <div className="text-[10px] text-[#8A4E63] font-semibold">F1-Score</div>
              <div className="font-mono font-bold text-[#8A4E63] text-sm">
                {(cm.f1Score * 100).toFixed(1)}%
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
              <div className="text-[10px] text-slate-400">Balanced Acc</div>
              <div className="font-mono font-bold text-slate-800 text-sm">
                {(cm.balancedAccuracy * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
