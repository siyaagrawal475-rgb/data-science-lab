'use client';

import React, { useState, useMemo } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { Activity, Check, Play } from 'lucide-react';
import {
  fitLogisticRegression,
  calculateConfusionMatrix,
  standardizeFeatures
} from '@/lib/classificationMath';

interface LabDataset {
  id: string;
  name: string;
  xLabel: string;
  x: number[];
  y: number[];
}

const DATASETS: LabDataset[] = [
  {
    id: 'admissions',
    name: 'University Admissions (Exam Score vs. Admission 0/1)',
    xLabel: 'Entrance Exam Score',
    x: [45, 52, 58, 62, 65, 70, 74, 78, 82, 85, 90, 95],
    y: [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1]
  },
  {
    id: 'biomarker',
    name: 'Cardiology Screening (Troponin Level vs. Cardiac Event 0/1)',
    xLabel: 'Serum Biomarker (ng/mL)',
    x: [0.01, 0.03, 0.05, 0.08, 0.12, 0.15, 0.22, 0.28, 0.35, 0.42],
    y: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
  }
];

export const LogisticRegressionLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-6');
  const isDone = isLabCompleted('logistic-regression');

  const [datasetId, setDatasetId] = useState<string>('admissions');
  const [threshold, setThreshold] = useState<number>(0.50);
  const [learningRate, setLearningRate] = useState<number>(0.2);

  const dataset = useMemo(() => {
    return DATASETS.find((d) => d.id === datasetId) || DATASETS[0];
  }, [datasetId]);

  // Standardize X for numerical optimization
  const X_mat = useMemo(() => dataset.x.map((val) => [val]), [dataset]);
  const { standardized } = useMemo(() => standardizeFeatures(X_mat), [X_mat]);

  // Fit Logistic Regression
  const model = useMemo(() => {
    return fitLogisticRegression(standardized, dataset.y, learningRate, 700);
  }, [standardized, dataset.y, learningRate]);

  // Predictions given threshold
  const predictions = useMemo(() => {
    return model.probabilities.map((p) => (p >= threshold ? 1 : 0));
  }, [model.probabilities, threshold]);

  const cm = useMemo(() => {
    return calculateConfusionMatrix(dataset.y, predictions);
  }, [dataset.y, predictions]);

  const handleComplete = () => {
    completeLab('logistic-regression');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-[#E5BBC9]/50 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#8A4E63] font-semibold text-xs uppercase tracking-wide">
              <Activity className="w-4 h-4" />
              Unit 6 Lab 2
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Logistic Regression Lab
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Fit logistic regression models via gradient descent, inspect Binary Cross-Entropy log loss, and calibrate operational decision thresholds.
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

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <label htmlFor="lr-lab-ds" className="text-xs font-semibold text-slate-700 block mb-2">
            1. Select Dataset
          </label>
          <select
            id="lr-lab-ds"
            value={datasetId}
            onChange={(e) => setDatasetId(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#D99AAF]"
          >
            {DATASETS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-700">
              2. Decision Threshold (τ)
            </label>
            <span className="font-mono font-bold text-xs text-[#8A4E63]">
              {threshold.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0.10"
            max="0.90"
            step="0.05"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full accent-[#D99AAF]"
            aria-label="Threshold"
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-700">
              3. Learning Rate (α)
            </label>
            <span className="font-mono font-bold text-xs text-[#8A4E63]">
              {learningRate}
            </span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.50"
            step="0.05"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-full accent-[#D99AAF]"
            aria-label="Learning Rate"
          />
        </div>
      </div>

      {/* Model Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sample-by-Sample Probability Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-900 text-sm">
              Predicted Probabilities & Residual Log Loss
            </h3>
            <span className="text-xs font-mono text-[#8A4E63] font-bold">
              Total Log Loss: {model.loss.toFixed(4)}
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto border border-slate-100 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold sticky top-0">
                <tr>
                  <th className="p-2.5">Obs #</th>
                  <th className="p-2.5">{dataset.xLabel}</th>
                  <th className="p-2.5">True (y)</th>
                  <th className="p-2.5">P(Y=1|x)</th>
                  <th className="p-2.5">Pred (ŷ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {dataset.x.map((val, i) => {
                  const prob = model.probabilities[i];
                  const pred = predictions[i];
                  const isMatch = pred === dataset.y[i];

                  return (
                    <tr key={i} className={isMatch ? 'hover:bg-slate-50' : 'bg-rose-50/50'}>
                      <td className="p-2.5 text-slate-400 font-sans">#{i + 1}</td>
                      <td className="p-2.5 text-slate-800">{val}</td>
                      <td className="p-2.5 font-bold">{dataset.y[i]}</td>
                      <td className="p-2.5 text-[#8A4E63] font-bold">
                        {(prob * 100).toFixed(1)}%
                      </td>
                      <td className="p-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isMatch
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {pred}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Metrics & Confusion Matrix (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="font-semibold text-slate-900 text-sm">
            Fitted Model Summary
          </h3>

          <div className="bg-[#F6E5EB]/40 rounded-xl p-3 border border-[#E5BBC9]/60 text-xs space-y-1 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Weight β₁ (std):</span>
              <span className="font-bold text-slate-800">
                {(model.coefficients[0] || 0).toFixed(3)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Intercept β₀:</span>
              <span className="font-bold text-slate-800">
                {model.intercept.toFixed(3)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Iterations / Epochs:</span>
              <span className="font-bold text-slate-800">{model.iterations}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
              <div className="text-[10px] text-slate-400">Accuracy</div>
              <div className="font-mono font-bold text-slate-800">
                {(cm.accuracy * 100).toFixed(1)}%
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
              <div className="text-[10px] text-slate-400">Precision</div>
              <div className="font-mono font-bold text-slate-800">
                {(cm.precision * 100).toFixed(1)}%
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
              <div className="text-[10px] text-slate-400">Recall</div>
              <div className="font-mono font-bold text-slate-800">
                {(cm.recall * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-xs font-mono grid grid-cols-2 gap-2 text-center">
            <div className="bg-emerald-50 text-emerald-800 p-2 rounded">
              TP: {cm.tp}
            </div>
            <div className="bg-rose-50 text-rose-800 p-2 rounded">
              FP: {cm.fp}
            </div>
            <div className="bg-rose-50 text-rose-800 p-2 rounded">
              FN: {cm.fn}
            </div>
            <div className="bg-emerald-50 text-emerald-800 p-2 rounded">
              TN: {cm.tn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
