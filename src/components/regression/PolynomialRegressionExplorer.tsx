'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { polynomialRegression, predictPolynomial, rootMeanSquaredError } from '@/lib/regressionMath';
import { AlertTriangle, CheckCircle, TrendingUp, Layers } from 'lucide-react';

interface PolyDataset {
  name: string;
  trainX: number[];
  trainY: number[];
  valX: number[];
  valY: number[];
  optimalDegree: number;
  description: string;
}

const POLY_DATASETS: PolyDataset[] = [
  {
    name: 'Quadratic Trajectory (d=2)',
    trainX: [-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0],
    trainY: [4.2, 2.8, 1.9, 1.1, 1.0, 1.4, 2.1, 3.1, 4.9],
    valX: [-1.8, -0.8, 0.2, 1.2, 1.8],
    valY: [3.4, 1.4, 1.1, 2.6, 4.1],
    optimalDegree: 2,
    description: 'Parabolic dataset where degree 2 captures the true physical path.'
  },
  {
    name: 'Cubic S-Curve (d=3)',
    trainX: [-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0],
    trainY: [-6.8, -2.5, -0.2, 0.8, 0.0, -0.9, 0.1, 2.6, 7.1],
    valX: [-1.8, -0.7, 0.3, 1.3, 1.7],
    valY: [-4.9, 0.4, -0.6, 1.2, 4.5],
    optimalDegree: 3,
    description: 'Cubic inflection with two inflection turns.'
  },
  {
    name: 'Noisy Saturation Curve',
    trainX: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0],
    trainY: [1.2, 2.4, 3.1, 3.7, 4.1, 4.3, 4.6, 4.8, 4.9, 5.1],
    valX: [0.8, 1.8, 2.8, 3.8, 4.8],
    valY: [1.9, 3.4, 4.2, 4.7, 5.0],
    optimalDegree: 2,
    description: 'Diminishing returns curve where high degrees oscillate wildly.'
  }
];

export const PolynomialRegressionExplorer: React.FC = () => {
  const [selectedDataIdx, setSelectedDataIdx] = useState<number>(0);
  const [degree, setDegree] = useState<number>(2);

  const dataset = POLY_DATASETS[selectedDataIdx];

  const modelResult = useMemo(() => {
    return polynomialRegression(dataset.trainX, dataset.trainY, degree);
  }, [dataset.trainX, dataset.trainY, degree]);

  // Validation predictions
  const valPredictions = useMemo(() => {
    if (!modelResult.isValid) return [];
    return predictPolynomial(dataset.valX, modelResult.coefficients);
  }, [dataset.valX, modelResult.isValid, modelResult.coefficients]);

  const trainRMSE = useMemo(() => {
    if (!modelResult.isValid) return 0;
    return rootMeanSquaredError(dataset.trainY, modelResult.predictions);
  }, [dataset.trainY, modelResult.isValid, modelResult.predictions]);

  const valRMSE = useMemo(() => {
    if (!modelResult.isValid || valPredictions.length === 0) return 0;
    return rootMeanSquaredError(dataset.valY, valPredictions);
  }, [dataset.valY, modelResult.isValid, valPredictions]);

  // Generate dense curve points for smooth SVG plotting
  const minX = Math.min(...dataset.trainX, ...dataset.valX);
  const maxX = Math.max(...dataset.trainX, ...dataset.valX);
  const curvePoints = useMemo(() => {
    if (!modelResult.isValid) return [];
    const steps = 80;
    const stepSize = (maxX - minX) / steps;
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = minX + i * stepSize;
      const [y] = predictPolynomial([x], modelResult.coefficients);
      pts.push({ x, y });
    }
    return pts;
  }, [minX, maxX, modelResult.isValid, modelResult.coefficients]);

  // SVG coordinate system
  const allY = useMemo(() => [...dataset.trainY, ...dataset.valY], [dataset.trainY, dataset.valY]);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  const padY = (maxY - minY) * 0.3 || 1;

  const domainY = useMemo<[number, number]>(() => [minY - padY, maxY + padY], [minY, maxY, padY]);
  const domainX = useMemo<[number, number]>(() => [minX - 0.3, maxX + 0.3], [minX, maxX]);

  const svgWidth = 540;
  const svgHeight = 280;
  const margin = { top: 20, right: 25, bottom: 35, left: 45 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const scaleX = useCallback(
    (x: number) => margin.left + ((x - domainX[0]) / (domainX[1] - domainX[0])) * plotWidth,
    [domainX, margin.left, plotWidth]
  );

  const scaleY = useCallback(
    (y: number) => {
      const clampedY = Math.max(domainY[0], Math.min(domainY[1], y));
      return margin.top + plotHeight - ((clampedY - domainY[0]) / (domainY[1] - domainY[0])) * plotHeight;
    },
    [domainY, margin.top, plotHeight]
  );

  // Build SVG path for smooth curve
  const pathD = useMemo(() => {
    if (curvePoints.length === 0) return '';
    return curvePoints.reduce((acc, pt, idx) => {
      const sx = scaleX(pt.x);
      const sy = scaleY(pt.y);
      return idx === 0 ? `M ${sx} ${sy}` : `${acc} L ${sx} ${sy}`;
    }, '');
  }, [curvePoints, scaleX, scaleY]);

  const isOverfitting = degree > dataset.optimalDegree && valRMSE > trainRMSE * 1.5;
  const isUnderfitting = degree < dataset.optimalDegree;

  return (
    <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header & Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FAF2D8] text-[#806A28]">
              <Layers className="w-4 h-4" />
            </span>
            Polynomial Degree & Complexity Explorer
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Increase polynomial degree from 1 to 5 and observe how flexibility shifts from underfitting to severe overfitting.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {POLY_DATASETS.map((d, idx) => (
            <button
              key={d.name}
              onClick={() => {
                setSelectedDataIdx(idx);
                setDegree(d.optimalDegree);
              }}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                selectedDataIdx === idx
                  ? 'bg-[#FAF2D8] text-[#806A28] border-[#EBD99A] shadow-xs'
                  : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:bg-[#FAF2D8]/50'
              }`}
            >
              {d.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Degree Selector Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-[#0F172A]">Polynomial Degree (d):</label>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((d) => (
              <button
                key={d}
                onClick={() => setDegree(d)}
                className={`w-8 h-8 rounded-lg font-mono font-bold text-xs border transition-all cursor-pointer ${
                  degree === d
                    ? 'bg-[#806A28] text-white border-[#806A28] shadow-xs'
                    : 'bg-white text-[#475569] border-[#CBD5E1] hover:bg-[#FAF2D8]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-[#64748B]">
          Model Form:{' '}
          <span className="font-mono font-bold text-[#0F172A]">
            ŷ = β₀ + {degree >= 1 && 'β₁x'} {degree >= 2 && '+ β₂x²'} {degree >= 3 && '+ β₃x³'}{' '}
            {degree >= 4 && '+ β₄x⁴'} {degree >= 5 && '+ β₅x⁵'}
          </span>
        </div>
      </div>

      {/* SVG Polynomial Curve */}
      <div className="bg-[#FAFAFA] rounded-xl border border-[#E2E8F0] p-3 overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none">
          {/* Axes */}
          <line
            x1={margin.left}
            y1={margin.top + plotHeight}
            x2={margin.left + plotWidth}
            y2={margin.top + plotHeight}
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={margin.top + plotHeight}
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />

          {/* Fitted Polynomial Curve */}
          {pathD && <path d={pathD} fill="none" stroke="#806A28" strokeWidth="2.5" />}

          {/* Training Points */}
          {dataset.trainX.map((xi, idx) => (
            <circle
              key={`train-${idx}`}
              cx={scaleX(xi)}
              cy={scaleY(dataset.trainY[idx])}
              r="5"
              fill="#0F172A"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
          ))}

          {/* Validation Points */}
          {dataset.valX.map((xi, idx) => (
            <circle
              key={`val-${idx}`}
              cx={scaleX(xi)}
              cy={scaleY(dataset.valY[idx])}
              r="5"
              fill="#E8C878"
              stroke="#806A28"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-[#F1F5F9] text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#0F172A] inline-block"></span>
            <span className="text-[#475569]">Training Data (Fit)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E8C878] border border-[#806A28] inline-block"></span>
            <span className="text-[#475569]">Validation Holdout (Test)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-[#806A28] inline-block"></span>
            <span className="text-[#475569]">Fitted Degree {degree} Curve</span>
          </div>
        </div>
      </div>

      {/* Overfitting / Underfitting Dynamic Callout */}
      <div
        className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
          isOverfitting
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : isUnderfitting
            ? 'bg-blue-50 border-blue-200 text-blue-900'
            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}
      >
        {isOverfitting ? (
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        ) : isUnderfitting ? (
          <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
        ) : (
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        )}
        <div>
          <span className="font-bold">
            {isOverfitting
              ? `High Variance (Overfitting) Warning: `
              : isUnderfitting
              ? `High Bias (Underfitting): `
              : `Optimal Capacity: `}
          </span>
          {isOverfitting
            ? `Degree ${degree} model has memorized training noise. Notice how Training RMSE is low (${trainRMSE.toFixed(2)}), but Validation RMSE has jumped to ${valRMSE.toFixed(2)}.`
            : isUnderfitting
            ? `Degree ${degree} is too rigid to capture the natural curve of the data. Both training and validation errors are elevated.`
            : `Degree ${degree} balances flexibility and generalization, yielding low errors on both train and validation splits.`}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-[#FAF2D8]/60 border border-[#EBD99A] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#806A28]">Train R² (Fit Quality)</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            {(modelResult.rSquared * 100).toFixed(1)}%
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#64748B]">Train RMSE (Loss)</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            {trainRMSE.toFixed(2)}
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#64748B]">Validation RMSE (Generalization)</div>
          <div
            className={`text-lg font-mono font-bold mt-0.5 ${
              isOverfitting ? 'text-amber-700' : 'text-emerald-700'
            }`}
          >
            {valRMSE.toFixed(2)}
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#64748B]">Active Parameters</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            {degree + 1}
          </div>
        </div>
      </div>
    </div>
  );
};
