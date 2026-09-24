'use client';

import React, { useState, useMemo } from 'react';
import {
  sigmoid,
  binaryCrossEntropy,
  fitLogisticRegression,
  calculateConfusionMatrix
} from '@/lib/classificationMath';
import { Activity, Sliders, RotateCcw } from 'lucide-react';

interface DatasetPreset {
  name: string;
  x: number[];
  y: number[];
  xLabel: string;
  description: string;
}

const PRESETS: DatasetPreset[] = [
  {
    name: 'Study Hours vs. Exam Pass (0/1)',
    x: [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5],
    y: [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    xLabel: 'Study Hours (X)',
    description: 'Clean transitional boundary around 3.5–4.0 hours.'
  },
  {
    name: 'Tumor Size (cm) vs. Malignancy (0/1)',
    x: [1.2, 1.8, 2.2, 2.9, 3.1, 3.8, 4.2, 4.8, 5.5, 6.0, 6.8, 7.5],
    y: [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
    xLabel: 'Tumor Diameter in cm (X)',
    description: 'Biomedical risk screening dataset with slight clinical overlap.'
  },
  {
    name: 'Credit Score vs. Loan Default (0/1)',
    x: [520, 560, 590, 620, 650, 680, 710, 740, 780, 810],
    y: [1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    xLabel: 'Credit Score (X)',
    description: 'Negative relationship: higher credit score reduces default probability.'
  }
];

export const LogisticRegressionExplorer: React.FC = () => {
  const [presetIdx, setPresetIdx] = useState<number>(0);
  const activePreset = PRESETS[presetIdx];

  // Standardize X for internal numerical stability
  const xMin = Math.min(...activePreset.x);
  const xMax = Math.max(...activePreset.x);
  const xSpan = xMax - xMin || 1;

  // Fit optimal MLE logistic model
  const optimalModel = useMemo(() => {
    // 2D Matrix for fitLogisticRegression
    const X_mat = activePreset.x.map((val) => [(val - xMin) / xSpan]);
    const fit = fitLogisticRegression(X_mat, activePreset.y, 0.2, 800);
    return {
      beta1_norm: fit.coefficients[0] || 0,
      beta0_norm: fit.intercept,
      loss: fit.loss
    };
  }, [activePreset, xMin, xSpan]);

  // User adjustable slope and intercept on normalized scale [0, 1]
  const [userSlope, setUserSlope] = useState<number>(optimalModel.beta1_norm);
  const [userIntercept, setUserIntercept] = useState<number>(optimalModel.beta0_norm);
  const [threshold, setThreshold] = useState<number>(0.5);

  const handlePresetChange = (idx: number) => {
    setPresetIdx(idx);
    const newPreset = PRESETS[idx];
    const nXMin = Math.min(...newPreset.x);
    const nXMax = Math.max(...newPreset.x);
    const nXSpan = nXMax - nXMin || 1;
    const X_mat = newPreset.x.map((val) => [(val - nXMin) / nXSpan]);
    const fit = fitLogisticRegression(X_mat, newPreset.y, 0.2, 800);
    setUserSlope(fit.coefficients[0] || 0);
    setUserIntercept(fit.intercept);
  };

  // Compute model probabilities
  const probabilities = useMemo(() => {
    return activePreset.x.map((val) => {
      const xNorm = (val - xMin) / xSpan;
      const z = userIntercept + userSlope * xNorm;
      return sigmoid(z);
    });
  }, [activePreset.x, xMin, xSpan, userIntercept, userSlope]);

  // Compute loss and metrics
  const logLoss = useMemo(() => {
    return binaryCrossEntropy(activePreset.y, probabilities);
  }, [activePreset.y, probabilities]);

  const predictions = useMemo(() => {
    return probabilities.map((p) => (p >= threshold ? 1 : 0));
  }, [probabilities, threshold]);

  const metrics = useMemo(() => {
    return calculateConfusionMatrix(activePreset.y, predictions);
  }, [activePreset.y, predictions]);

  // SVG dimensions
  const svgWidth = 460;
  const svgHeight = 280;
  const pad = 40;

  const scaleX = (val: number) => pad + ((val - xMin) / xSpan) * (svgWidth - 2 * pad);
  const scaleY = (p: number) => svgHeight - pad - p * (svgHeight - 2 * pad);

  // Generate smooth sigmoid curve points
  const curvePoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const rawX = xMin + (i / steps) * xSpan;
      const xNorm = (rawX - xMin) / xSpan;
      const z = userIntercept + userSlope * xNorm;
      const p = sigmoid(z);
      const px = pad + ((rawX - xMin) / xSpan) * (svgWidth - 2 * pad);
      const py = svgHeight - pad - p * (svgHeight - 2 * pad);
      pts.push({ x: px, y: py });
    }
    return pts;
  }, [xMin, xSpan, userIntercept, userSlope]);

  const pathD = useMemo(() => {
    if (curvePoints.length === 0) return '';
    return curvePoints.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');
  }, [curvePoints]);

  return (
    <div className="w-full bg-white rounded-xl border border-[#E5BBC9]/50 shadow-sm p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5BBC9]/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#F6E5EB] text-[#8A4E63]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">Logistic Regression Explorer</h3>
              <p className="text-xs text-slate-500">
                Fit the sigmoid probability curve σ(z), adjust parameters, and observe Cross-Entropy Log Loss.
              </p>
            </div>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="lr-preset-select" className="text-xs font-medium text-slate-600">
            Scenario:
          </label>
          <select
            id="lr-preset-select"
            value={presetIdx}
            onChange={(e) => handlePresetChange(Number(e.target.value))}
            className="text-xs font-medium bg-slate-50 border border-[#E5BBC9] rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#D99AAF]"
          >
            {PRESETS.map((p, idx) => (
              <option key={idx} value={idx}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Plot (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center bg-slate-50/70 rounded-xl p-3 border border-slate-100">
          <div className="w-full flex items-center justify-between px-2 mb-1">
            <span className="text-xs font-semibold text-slate-600">
              Posterior Probability P(Y = 1 | X)
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] inline-block"></span>
                Observed y = 0
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] inline-block"></span>
                Observed y = 1
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[#8A4E63] inline-block"></span>
                Sigmoid σ(z)
              </span>
            </div>
          </div>

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-[460px] h-auto bg-white rounded-lg border border-slate-200 shadow-inner"
          >
            {/* Probability Reference Lines: 0.0, 0.5, 1.0 */}
            {[0.0, 0.25, 0.5, 0.75, 1.0].map((pVal) => (
              <g key={pVal}>
                <line
                  x1={pad}
                  y1={scaleY(pVal)}
                  x2={svgWidth - pad}
                  y2={scaleY(pVal)}
                  stroke={pVal === 0.5 ? '#E2E8F0' : '#F1F5F9'}
                  strokeWidth={pVal === 0.5 ? '1.5' : '1'}
                  strokeDasharray={pVal === 0.5 ? '3 3' : undefined}
                />
                <text
                  x={pad - 6}
                  y={scaleY(pVal) + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#94A3B8"
                >
                  {pVal.toFixed(1)}
                </text>
              </g>
            ))}

            {/* Threshold Line */}
            <line
              x1={pad}
              y1={scaleY(threshold)}
              x2={svgWidth - pad}
              y2={scaleY(threshold)}
              stroke="#D99AAF"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <text
              x={svgWidth - pad - 4}
              y={scaleY(threshold) - 4}
              textAnchor="end"
              fontSize="9"
              fontWeight="bold"
              fill="#8A4E63"
            >
              τ = {threshold.toFixed(2)}
            </text>

            {/* Sigmoid Curve */}
            <path
              d={pathD}
              fill="none"
              stroke="#8A4E63"
              strokeWidth="3"
            />

            {/* Observation Projections and Points */}
            {activePreset.x.map((rawX, i) => {
              const cx = scaleX(rawX);
              const cyObs = scaleY(activePreset.y[i]);
              const cySigmoid = scaleY(probabilities[i]);
              const isClass1 = activePreset.y[i] === 1;

              return (
                <g key={i}>
                  {/* Vertical projection to sigmoid curve */}
                  <line
                    x1={cx}
                    y1={cyObs}
                    x2={cx}
                    y2={cySigmoid}
                    stroke="#CBD5E1"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  {/* Projected point on curve */}
                  <circle
                    cx={cx}
                    cy={cySigmoid}
                    r={3.5}
                    fill="#8A4E63"
                  />
                  {/* Ground truth observation point */}
                  <circle
                    cx={cx}
                    cy={cyObs}
                    r={5.5}
                    fill={isClass1 ? '#EF4444' : '#3B82F6'}
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                  />
                </g>
              );
            })}

            {/* X-Axis labels */}
            <text
              x={scaleX(xMin)}
              y={svgHeight - pad + 14}
              textAnchor="start"
              fontSize="9"
              fill="#94A3B8"
            >
              {xMin}
            </text>
            <text
              x={scaleX(xMax)}
              y={svgHeight - pad + 14}
              textAnchor="end"
              fontSize="9"
              fill="#94A3B8"
            >
              {xMax}
            </text>
            <text
              x={svgWidth / 2}
              y={svgHeight - pad + 22}
              textAnchor="middle"
              fontSize="10"
              fontWeight="500"
              fill="#64748B"
            >
              {activePreset.xLabel}
            </text>
          </svg>
        </div>

        {/* Controls & Metrics (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Parameter Sliders */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#8A4E63]" />
                Sigmoid Model Parameters
              </span>
              <button
                type="button"
                onClick={() => {
                  setUserSlope(optimalModel.beta1_norm);
                  setUserIntercept(optimalModel.beta0_norm);
                }}
                className="text-[11px] text-[#8A4E63] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset to Optimal
              </button>
            </div>

            {/* Slope Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Slope / Steepness (β₁):</span>
                <span className="font-mono font-semibold text-[#8A4E63]">
                  {userSlope.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="-12"
                max="16"
                step="0.5"
                value={userSlope}
                onChange={(e) => setUserSlope(parseFloat(e.target.value))}
                className="w-full accent-[#D99AAF] cursor-pointer"
                aria-label="Logistic Slope Parameter"
              />
            </div>

            {/* Intercept Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Intercept / Shift (β₀):</span>
                <span className="font-mono font-semibold text-[#8A4E63]">
                  {userIntercept.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.5"
                value={userIntercept}
                onChange={(e) => setUserIntercept(parseFloat(e.target.value))}
                className="w-full accent-[#D99AAF] cursor-pointer"
                aria-label="Logistic Intercept Parameter"
              />
            </div>

            {/* Threshold Slider */}
            <div className="space-y-1 pt-1 border-t border-slate-200/60">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-medium">Decision Threshold (τ):</span>
                <span className="font-mono font-semibold text-[#8A4E63]">
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
                className="w-full accent-[#D99AAF] cursor-pointer"
                aria-label="Classification Threshold"
              />
            </div>
          </div>

          {/* Loss & Confusion Matrix */}
          <div className="bg-[#F6E5EB]/40 rounded-xl p-3.5 border border-[#E5BBC9]/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8A4E63]">
                Binary Cross-Entropy Loss
              </span>
              <span className="font-mono font-bold text-sm text-[#8A4E63]">
                {logLoss.toFixed(4)}
              </span>
            </div>

            {/* Metric Summary */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white rounded-lg p-2 border border-[#E5BBC9]/40 shadow-xs">
                <div className="text-slate-400 text-[10px]">Accuracy</div>
                <div className="font-mono font-bold text-slate-800">
                  {(metrics.accuracy * 100).toFixed(1)}%
                </div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-[#E5BBC9]/40 shadow-xs">
                <div className="text-slate-400 text-[10px]">Precision</div>
                <div className="font-mono font-bold text-slate-800">
                  {(metrics.precision * 100).toFixed(1)}%
                </div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-[#E5BBC9]/40 shadow-xs">
                <div className="text-slate-400 text-[10px]">Recall</div>
                <div className="font-mono font-bold text-slate-800">
                  {(metrics.recall * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Confusion Matrix Mini Table */}
            <div className="bg-white rounded-lg p-2 border border-[#E5BBC9]/40 text-[11px] space-y-1">
              <div className="text-slate-500 font-semibold text-[10px]">Confusion Matrix</div>
              <div className="grid grid-cols-2 gap-1 font-mono text-center">
                <div className="bg-emerald-50 text-emerald-700 py-1 rounded">
                  TP: {metrics.tp}
                </div>
                <div className="bg-rose-50 text-rose-700 py-1 rounded">
                  FP: {metrics.fp}
                </div>
                <div className="bg-rose-50 text-rose-700 py-1 rounded">
                  FN: {metrics.fn}
                </div>
                <div className="bg-emerald-50 text-emerald-700 py-1 rounded">
                  TN: {metrics.tn}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
