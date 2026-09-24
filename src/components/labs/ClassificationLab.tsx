'use client';

import React, { useState, useMemo } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { Target, Check, Play, Sliders } from 'lucide-react';
import {
  fitLogisticRegression,
  knnPredict,
  calculateConfusionMatrix,
  standardizeFeatures,
  logisticProbabilities
} from '@/lib/classificationMath';

interface LabDataset {
  id: string;
  name: string;
  xLabel: string;
  yLabel: string;
  X: [number, number][];
  y: number[];
}

const DATASETS: LabDataset[] = [
  {
    id: 'customer_churn',
    name: 'Customer Churn (Usage Hours vs. Support Tickets)',
    xLabel: 'Monthly Platform Hours',
    yLabel: 'Support Tickets Filed',
    X: [
      [45, 1], [50, 2], [38, 1], [60, 2], [55, 0], [42, 3], [48, 1],
      [12, 6], [8, 8], [15, 5], [20, 7], [10, 9], [5, 6], [18, 4]
    ],
    y: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: 'credit_risk',
    name: 'Credit Risk (Income $k vs. Debt Ratio %)',
    xLabel: 'Annual Income ($k)',
    yLabel: 'Debt-to-Income Ratio (%)',
    X: [
      [85, 15], [95, 20], [78, 12], [110, 18], [90, 22], [105, 10], [80, 25],
      [35, 55], [28, 65], [42, 48], [30, 70], [25, 58], [40, 60], [32, 52]
    ],
    y: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
  }
];

export const ClassificationLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-6');
  const isDone = isLabCompleted('classification');

  const [datasetId, setDatasetId] = useState<string>('customer_churn');
  const [classifierType, setClassifierType] = useState<'logistic' | 'knn'>('logistic');
  const [threshold, setThreshold] = useState<number>(0.5);
  const [knnK, setKnnK] = useState<number>(3);
  const [queryPoint, setQueryPoint] = useState<[number, number]>([30, 4]);

  const activeDataset = useMemo(() => {
    return DATASETS.find((d) => d.id === datasetId) || DATASETS[0];
  }, [datasetId]);

  const { standardized, means, stds } = useMemo(() => {
    return standardizeFeatures(activeDataset.X);
  }, [activeDataset]);

  const logisticFit = useMemo(() => {
    return fitLogisticRegression(standardized, activeDataset.y, 0.2, 600);
  }, [standardized, activeDataset.y]);

  const predictions = useMemo(() => {
    if (classifierType === 'logistic') {
      const probs = logisticProbabilities(standardized, logisticFit.coefficients, logisticFit.intercept);
      return probs.map((p) => (p >= threshold ? 1 : 0));
    } else {
      return standardized.map((pt: number[]) => knnPredict(standardized, activeDataset.y, pt, knnK).predictedClass);
    }
  }, [classifierType, standardized, activeDataset.y, logisticFit, threshold, knnK]);

  const cm = useMemo(() => {
    return calculateConfusionMatrix(activeDataset.y, predictions);
  }, [activeDataset.y, predictions]);

  // Query Prediction
  const queryStd: [number, number] = useMemo(() => [
    (queryPoint[0] - means[0]) / (stds[0] || 1),
    (queryPoint[1] - means[1]) / (stds[1] || 1)
  ], [queryPoint, means, stds]);

  const queryResult = useMemo(() => {
    if (classifierType === 'logistic') {
      const p = logisticProbabilities([queryStd], logisticFit.coefficients, logisticFit.intercept)[0];
      return {
        predClass: p >= threshold ? 1 : 0,
        prob: p
      };
    } else {
      const res = knnPredict(standardized, activeDataset.y, queryStd, knnK);
      return {
        predClass: res.predictedClass,
        prob: res.probabilities[1] || 0
      };
    }
  }, [classifierType, queryStd, logisticFit, threshold, standardized, activeDataset.y, knnK]);

  const handleComplete = () => {
    completeLab('classification');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-[#E5BBC9]/50 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#8A4E63] font-semibold text-xs uppercase tracking-wide">
              <Target className="w-4 h-4" />
              Unit 6 Lab 1
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Supervised Classification Lab
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Select datasets, train parametric (Logistic) vs. non-parametric (k-NN) classifiers, generate predictions, and evaluate confusion matrices.
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

      {/* Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dataset */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <label htmlFor="clf-lab-ds" className="text-xs font-semibold text-slate-700 block mb-2">
            1. Select Dataset
          </label>
          <select
            id="clf-lab-ds"
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

        {/* Classifier Type */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <label className="text-xs font-semibold text-slate-700 block mb-2">
            2. Choose Classifier Architecture
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setClassifierType('logistic')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                classifierType === 'logistic'
                  ? 'bg-[#F6E5EB] text-[#8A4E63] border border-[#E5BBC9]'
                  : 'bg-slate-50 text-slate-600 border border-slate-200'
              }`}
            >
              Logistic Regression
            </button>
            <button
              type="button"
              onClick={() => setClassifierType('knn')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                classifierType === 'knn'
                  ? 'bg-[#F6E5EB] text-[#8A4E63] border border-[#E5BBC9]'
                  : 'bg-slate-50 text-slate-600 border border-slate-200'
              }`}
            >
              k-Nearest Neighbors
            </button>
          </div>
        </div>

        {/* Hyperparameter */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-700">
              {classifierType === 'logistic' ? 'Decision Threshold (τ)' : 'Neighbors (k)'}
            </label>
            <span className="font-mono font-bold text-xs text-[#8A4E63]">
              {classifierType === 'logistic' ? threshold.toFixed(2) : knnK}
            </span>
          </div>
          {classifierType === 'logistic' ? (
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
          ) : (
            <input
              type="range"
              min="1"
              max="9"
              step="2"
              value={knnK}
              onChange={(e) => setKnnK(parseInt(e.target.value))}
              className="w-full accent-[#D99AAF]"
              aria-label="k value"
            />
          )}
        </div>
      </div>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Query Simulator (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#8A4E63]" />
            Inference Query Simulator
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">
                {activeDataset.xLabel} (X₁)
              </label>
              <input
                type="number"
                value={queryPoint[0]}
                onChange={(e) => setQueryPoint([parseFloat(e.target.value) || 0, queryPoint[1]])}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">
                {activeDataset.yLabel} (X₂)
              </label>
              <input
                type="number"
                value={queryPoint[1]}
                onChange={(e) => setQueryPoint([queryPoint[0], parseFloat(e.target.value) || 0])}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-[#F6E5EB]/50 rounded-xl p-4 border border-[#E5BBC9]/60 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#8A4E63]">Model Output</span>
              <span className="font-mono font-bold text-slate-700">
                P(Class 1 | x) = {(queryResult.prob * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-600">Assigned Class:</span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  queryResult.predClass === 1
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                Class {queryResult.predClass} ({queryResult.predClass === 1 ? 'Positive / Risk' : 'Negative / Normal'})
              </span>
            </div>
          </div>
        </div>

        {/* Confusion Matrix & Metrics (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="font-semibold text-slate-900 text-sm">
            Dataset Evaluation Metrics
          </h3>

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
