'use client';

import React, { useState, useMemo } from 'react';
import {
  fitLogisticRegression,
  logisticProbabilities,
  knnPredict,
  calculateConfusionMatrix,
  standardizeFeatures
} from '@/lib/classificationMath';
import { Target, Layers } from 'lucide-react';

interface DatasetPreset {
  name: string;
  description: string;
  X: [number, number][];
  y: number[];
  featureNames: [string, string];
}

const DATASETS: DatasetPreset[] = [
  {
    name: 'Linearly Separable Clusters',
    description: 'Two well-separated Gaussian clusters with a clean linear decision boundary.',
    X: [
      [1.5, 2.0], [2.0, 3.0], [2.5, 1.8], [3.0, 3.5], [1.8, 4.0], [2.8, 2.5], [3.5, 3.0],
      [6.0, 6.5], [7.0, 7.5], [6.5, 8.0], [8.0, 7.0], [7.5, 6.0], [8.5, 8.5], [6.8, 6.2]
    ],
    y: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    featureNames: ['Feature X₁', 'Feature X₂']
  },
  {
    name: 'Overlapping Medical Biomarkers',
    description: 'Moderate overlap between healthy (Class 0) and high-risk (Class 1) patients.',
    X: [
      [2.0, 2.5], [3.0, 3.2], [3.5, 2.0], [4.0, 4.5], [4.5, 3.0], [2.8, 4.0], [5.0, 3.8],
      [4.2, 4.8], [5.5, 5.2], [5.0, 6.0], [6.2, 5.5], [6.8, 7.0], [5.8, 6.8], [7.0, 6.2]
    ],
    y: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    featureNames: ['Glucose Index', 'Blood Pressure']
  },
  {
    name: 'Nonlinear Moon Distribution',
    description: 'Interlocking crescent moon distributions showcasing linear vs. KNN boundary flexibility.',
    X: [
      [1.0, 3.0], [2.0, 4.5], [3.0, 5.0], [4.0, 4.5], [5.0, 3.0], [2.5, 3.5], [3.5, 3.8],
      [3.0, 2.0], [4.0, 1.5], [5.0, 1.0], [6.0, 1.5], [7.0, 2.5], [4.5, 2.2], [5.5, 2.0]
    ],
    y: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    featureNames: ['Biomarker A', 'Biomarker B']
  }
];

export const ClassificationBoundaryExplorer: React.FC = () => {
  const [datasetIdx, setDatasetIdx] = useState<number>(0);
  const [modelType, setModelType] = useState<'logistic' | 'knn'>('logistic');
  const [threshold, setThreshold] = useState<number>(0.5);
  const [knnK, setKnnK] = useState<number>(3);
  const [queryPoint, setQueryPoint] = useState<[number, number]>([4.5, 4.5]);

  const activeData = DATASETS[datasetIdx];

  // Standardized features for stable modeling
  const { standardized: stdX, means, stds } = useMemo(() => {
    return standardizeFeatures(activeData.X);
  }, [activeData]);

  // Model fitting
  const logisticModel = useMemo(() => {
    return fitLogisticRegression(stdX, activeData.y, 0.2, 600);
  }, [stdX, activeData.y]);

  // Model predictions on training set
  const predictions = useMemo(() => {
    if (modelType === 'logistic') {
      const probs = logisticProbabilities(stdX, logisticModel.coefficients, logisticModel.intercept);
      return probs.map((p) => (p >= threshold ? 1 : 0));
    } else {
      return stdX.map((pt: number[]) => knnPredict(stdX, activeData.y, pt, knnK).predictedClass);
    }
  }, [modelType, stdX, activeData.y, logisticModel, threshold, knnK]);

  // Confusion matrix metrics
  const metrics = useMemo(() => {
    return calculateConfusionMatrix(activeData.y, predictions);
  }, [activeData.y, predictions]);

  // Query point prediction
  const queryStd: [number, number] = useMemo(() => [
    (queryPoint[0] - means[0]) / (stds[0] || 1),
    (queryPoint[1] - means[1]) / (stds[1] || 1)
  ], [queryPoint, means, stds]);

  const queryPred = useMemo(() => {
    if (modelType === 'logistic') {
      const p = logisticProbabilities([queryStd], logisticModel.coefficients, logisticModel.intercept)[0];
      return {
        predClass: p >= threshold ? 1 : 0,
        prob: p
      };
    } else {
      const res = knnPredict(stdX, activeData.y, queryStd, knnK);
      return {
        predClass: res.predictedClass,
        prob: res.probabilities[1] || 0
      };
    }
  }, [modelType, queryStd, logisticModel, threshold, stdX, activeData.y, knnK]);

  // Grid for SVG visualization
  const minX = 0;
  const maxX = 10;
  const minY = 0;
  const maxY = 10;

  const svgWidth = 460;
  const svgHeight = 360;
  const pad = 40;

  const scaleX = (val: number) => pad + ((val - minX) / (maxX - minX)) * (svgWidth - 2 * pad);
  const scaleY = (val: number) => svgHeight - pad - ((val - minY) / (maxY - minY)) * (svgHeight - 2 * pad);

  // Compute 2D Decision Boundary line for Logistic Regression in raw coordinates
  // β₀ + β₁*((x₁ - μ₁)/σ₁) + β₂*((x₂ - μ₂)/σ₂) = logit(τ)
  const boundaryLine = useMemo(() => {
    if (modelType !== 'logistic') return null;
    const b0 = logisticModel.intercept;
    const b1 = logisticModel.coefficients[0] || 0;
    const b2 = logisticModel.coefficients[1] || 0;
    const m1 = means[0] || 0;
    const s1 = stds[0] || 1;
    const m2 = means[1] || 0;
    const s2 = stds[1] || 1;

    if (Math.abs(b2) < 1e-6) return null;

    // logit(threshold)
    const clampedT = Math.max(0.01, Math.min(0.99, threshold));
    const logitT = Math.log(clampedT / (1 - clampedT));

    // Calculate x2 for x1 = minX and x1 = maxX
    const getX2 = (x1: number) => {
      const z1 = (x1 - m1) / s1;
      // b0 + b1*z1 + b2*z2 = logitT  => z2 = (logitT - b0 - b1*z1) / b2
      const z2 = (logitT - b0 - b1 * z1) / b2;
      return z2 * s2 + m2;
    };

    const yStart = getX2(minX);
    const yEnd = getX2(maxX);

    return {
      x1: scaleX(minX),
      y1: scaleY(yStart),
      x2: scaleX(maxX),
      y2: scaleY(yEnd)
    };
  }, [modelType, logisticModel, means, stds, threshold]);

  return (
    <div className="w-full bg-white rounded-xl border border-[#E5BBC9]/50 shadow-sm p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5BBC9]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#F6E5EB] text-[#8A4E63]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">2D Classification Boundary Explorer</h3>
              <p className="text-xs text-slate-500">
                Visualize linear and non-parametric decision boundaries and evaluate classification metrics.
              </p>
            </div>
          </div>
        </div>

        {/* Dataset Preset Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="cb-dataset-select" className="text-xs font-medium text-slate-600">
            Dataset:
          </label>
          <select
            id="cb-dataset-select"
            value={datasetIdx}
            onChange={(e) => setDatasetIdx(Number(e.target.value))}
            className="text-xs font-medium bg-slate-50 border border-[#E5BBC9] rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#D99AAF]"
          >
            {DATASETS.map((ds, idx) => (
              <option key={idx} value={idx}>
                {ds.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Visualization + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center bg-slate-50/70 rounded-xl p-3 border border-slate-100">
          <div className="w-full flex items-center justify-between px-2 mb-1">
            <span className="text-xs font-semibold text-slate-600">
              {activeData.featureNames[1]} vs. {activeData.featureNames[0]}
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-[#3B82F6] inline-block border border-white shadow-xs"></span>
                Class 0 (Negative)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block border border-white shadow-xs"></span>
                Class 1 (Positive)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-[#D99AAF] transform rotate-45 inline-block border border-slate-800 shadow-xs"></span>
                Query Point
              </span>
            </div>
          </div>

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-[460px] h-auto bg-white rounded-lg border border-slate-200 shadow-inner cursor-crosshair"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const clickY = e.clientY - rect.top;
              const rawX = minX + ((clickX - pad) / (svgWidth - 2 * pad)) * (maxX - minX);
              const rawY = minY + ((svgHeight - pad - clickY) / (svgHeight - 2 * pad)) * (maxY - minY);
              setQueryPoint([
                Math.max(minX, Math.min(maxX, Number(rawX.toFixed(1)))),
                Math.max(minY, Math.min(maxY, Number(rawY.toFixed(1))))
              ]);
            }}
          >
            {/* Grid lines */}
            {[2, 4, 6, 8].map((v) => (
              <g key={v}>
                <line
                  x1={scaleX(v)}
                  y1={pad}
                  x2={scaleX(v)}
                  y2={svgHeight - pad}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                />
                <line
                  x1={pad}
                  y1={scaleY(v)}
                  x2={svgWidth - pad}
                  y2={scaleY(v)}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                />
                <text
                  x={scaleX(v)}
                  y={svgHeight - pad + 14}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#94A3B8"
                >
                  {v}
                </text>
                <text
                  x={pad - 8}
                  y={scaleY(v) + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#94A3B8"
                >
                  {v}
                </text>
              </g>
            ))}

            {/* Axes */}
            <line
              x1={pad}
              y1={svgHeight - pad}
              x2={svgWidth - pad}
              y2={svgHeight - pad}
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            <line
              x1={pad}
              y1={pad}
              x2={pad}
              y2={svgHeight - pad}
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />

            {/* Logistic Decision Boundary Line */}
            {boundaryLine && (
              <line
                x1={boundaryLine.x1}
                y1={boundaryLine.y1}
                x2={boundaryLine.x2}
                y2={boundaryLine.y2}
                stroke="#8A4E63"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
            )}

            {/* Observations */}
            {activeData.X.map((pt, i) => {
              const cx = scaleX(pt[0]);
              const cy = scaleY(pt[1]);
              const isClass1 = activeData.y[i] === 1;
              const isCorrect = predictions[i] === activeData.y[i];

              return (
                <g key={i}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill={isClass1 ? '#EF4444' : '#3B82F6'}
                    stroke={isCorrect ? '#FFFFFF' : '#0F172A'}
                    strokeWidth={isCorrect ? 1.5 : 2.5}
                    className="transition-transform hover:scale-125"
                  />
                  {!isCorrect && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={9}
                      fill="none"
                      stroke="#E11D48"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  )}
                </g>
              );
            })}

            {/* Query Point Marker */}
            <g transform={`translate(${scaleX(queryPoint[0])}, ${scaleY(queryPoint[1])})`}>
              <rect
                x="-6"
                y="-6"
                width="12"
                height="12"
                fill="#D99AAF"
                stroke="#1E293B"
                strokeWidth="2"
                transform="rotate(45)"
              />
              <circle
                r="18"
                fill="none"
                stroke="#D99AAF"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </g>
          </svg>

          <p className="text-[11px] text-slate-500 mt-2 text-center">
            Click anywhere on the coordinate plane to move the <strong>Query Point</strong>.
          </p>
        </div>

        {/* Controls & Metric Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Model Switcher */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#8A4E63]" />
                Classifier Model
              </span>
              <div className="flex rounded-lg bg-slate-200/60 p-0.5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setModelType('logistic')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    modelType === 'logistic'
                      ? 'bg-white text-[#8A4E63] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Logistic
                </button>
                <button
                  type="button"
                  onClick={() => setModelType('knn')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    modelType === 'knn'
                      ? 'bg-white text-[#8A4E63] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  k-NN
                </button>
              </div>
            </div>

            {/* Threshold Slider (for Logistic) */}
            {modelType === 'logistic' && (
              <div className="space-y-1.5 pt-1 border-t border-slate-200/60">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">Decision Threshold (τ):</span>
                  <span className="font-mono font-semibold text-[#8A4E63]">{threshold.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.90"
                  step="0.05"
                  value={threshold}
                  onChange={(e) => setThreshold(parseFloat(e.target.value))}
                  className="w-full accent-[#D99AAF] cursor-pointer"
                  aria-label="Decision Threshold"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0.10 (High Sensitivity)</span>
                  <span>0.50 (Default)</span>
                  <span>0.90 (High Precision)</span>
                </div>
              </div>
            )}

            {/* k Slider (for KNN) */}
            {modelType === 'knn' && (
              <div className="space-y-1.5 pt-1 border-t border-slate-200/60">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">Number of Neighbors (k):</span>
                  <span className="font-mono font-semibold text-[#8A4E63]">{knnK}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  step="2"
                  value={knnK}
                  onChange={(e) => setKnnK(parseInt(e.target.value))}
                  className="w-full accent-[#D99AAF] cursor-pointer"
                  aria-label="Number of Neighbors k"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>k = 1 (Flexible)</span>
                  <span>k = 5</span>
                  <span>k = 9 (Smoothed)</span>
                </div>
              </div>
            )}
          </div>

          {/* Real-time Query Point Readout */}
          <div className="bg-[#F6E5EB]/50 rounded-xl p-3.5 border border-[#E5BBC9]/60 space-y-2">
            <span className="text-xs font-semibold text-[#8A4E63]">Query Point Prediction</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/80 rounded-lg p-2 border border-[#E5BBC9]/40">
                <div className="text-slate-500 text-[10px]">Coordinates</div>
                <div className="font-mono font-bold text-slate-800">
                  ({queryPoint[0]}, {queryPoint[1]})
                </div>
              </div>
              <div className="bg-white/80 rounded-lg p-2 border border-[#E5BBC9]/40">
                <div className="text-slate-500 text-[10px]">Predicted Class</div>
                <div
                  className={`font-mono font-bold ${
                    queryPred.predClass === 1 ? 'text-[#EF4444]' : 'text-[#3B82F6]'
                  }`}
                >
                  Class {queryPred.predClass} ({queryPred.predClass === 1 ? 'Positive' : 'Negative'})
                </div>
              </div>
            </div>
            <div className="text-[11px] text-slate-600 pt-1">
              Estimated Posterior P(Y = 1 | x):{' '}
              <span className="font-mono font-semibold text-[#8A4E63]">
                {(queryPred.prob * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Model Performance Metrics */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-2">
            <span className="text-xs font-semibold text-slate-700">Classification Performance</span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white rounded-lg p-2 border border-slate-200 shadow-xs">
                <div className="text-slate-400 text-[10px]">Accuracy</div>
                <div className="font-mono font-bold text-slate-800">
                  {(metrics.accuracy * 100).toFixed(1)}%
                </div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-slate-200 shadow-xs">
                <div className="text-slate-400 text-[10px]">Precision</div>
                <div className="font-mono font-bold text-slate-800">
                  {(metrics.precision * 100).toFixed(1)}%
                </div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-slate-200 shadow-xs">
                <div className="text-slate-400 text-[10px]">Recall</div>
                <div className="font-mono font-bold text-slate-800">
                  {(metrics.recall * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 pt-1 flex justify-between">
              <span>
                TP: <strong>{metrics.tp}</strong> | TN: <strong>{metrics.tn}</strong>
              </span>
              <span>
                FP: <strong>{metrics.fp}</strong> | FN: <strong>{metrics.fn}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
