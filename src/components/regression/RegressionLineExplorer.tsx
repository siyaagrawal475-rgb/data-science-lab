'use client';

import React, { useState, useMemo } from 'react';
import { linearRegression, predictLinear, sumSquaredErrors, rootMeanSquaredError, rSquared } from '@/lib/regressionMath';
import { TrendingUp, RotateCcw } from 'lucide-react';

interface DatasetPreset {
  name: string;
  xLabel: string;
  yLabel: string;
  x: number[];
  y: number[];
  description: string;
}

const PRESETS: DatasetPreset[] = [
  {
    name: 'Study vs. Exam Score',
    xLabel: 'Study Hours (X)',
    yLabel: 'Exam Score (Y)',
    x: [1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    y: [52, 60, 64, 70, 75, 78, 83, 89, 91, 95],
    description: 'Clean positive linear trend with moderate variance.'
  },
  {
    name: 'Ad Spend vs. Revenue ($k)',
    xLabel: 'Ad Budget ($k)',
    yLabel: 'Revenue ($k)',
    x: [2, 4, 6, 8, 10, 12, 14, 16],
    y: [18, 30, 42, 53, 68, 77, 91, 102],
    description: 'Strong linear commercial return scenario.'
  },
  {
    name: 'Experience vs. Salary ($k)',
    xLabel: 'Years Exp (X)',
    yLabel: 'Salary ($k)',
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [45, 52, 58, 63, 72, 79, 85, 94, 98, 108],
    description: 'Bivariate compensation dataset.'
  },
  {
    name: 'Noisy Sensor Readings',
    xLabel: 'Temperature (°C)',
    yLabel: 'Pressure (kPa)',
    x: [10, 15, 20, 25, 30, 35, 40, 45],
    y: [102, 118, 112, 135, 129, 154, 148, 165],
    description: 'Higher noise variance illustrating residual spread.'
  }
];

export const RegressionLineExplorer: React.FC = () => {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number>(0);
  const activeDataset = PRESETS[selectedPresetIdx];

  const olsResult = useMemo(() => {
    return linearRegression(activeDataset.x, activeDataset.y);
  }, [activeDataset]);

  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [manualSlope, setManualSlope] = useState<number | null>(null);
  const [manualIntercept, setManualIntercept] = useState<number | null>(null);

  const currentSlope = isCustomMode && manualSlope !== null ? manualSlope : olsResult.slope;
  const currentIntercept = isCustomMode && manualIntercept !== null ? manualIntercept : olsResult.intercept;

  const currentPredictions = useMemo(() => {
    return predictLinear(activeDataset.x, currentSlope, currentIntercept);
  }, [activeDataset.x, currentSlope, currentIntercept]);

  const currentSSE = useMemo(() => {
    return sumSquaredErrors(activeDataset.y, currentPredictions);
  }, [activeDataset.y, currentPredictions]);

  const currentRMSE = useMemo(() => {
    return rootMeanSquaredError(activeDataset.y, currentPredictions);
  }, [activeDataset.y, currentPredictions]);

  const currentR2 = useMemo(() => {
    return rSquared(activeDataset.y, currentPredictions);
  }, [activeDataset.y, currentPredictions]);

  // SVG plotting bounds
  const minX = Math.min(...activeDataset.x);
  const maxX = Math.max(...activeDataset.x);
  const minY = Math.min(...activeDataset.y);
  const maxY = Math.max(...activeDataset.y);

  const paddingX = (maxX - minX) * 0.15 || 1;
  const paddingY = (maxY - minY) * 0.2 || 1;

  const domainX: [number, number] = [Math.max(0, minX - paddingX), maxX + paddingX];
  const domainY: [number, number] = [Math.max(0, minY - paddingY), maxY + paddingY];

  const svgWidth = 560;
  const svgHeight = 320;
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const scaleX = (val: number) =>
    margin.left + ((val - domainX[0]) / (domainX[1] - domainX[0])) * plotWidth;
  const scaleY = (val: number) =>
    margin.top + plotHeight - ((val - domainY[0]) / (domainY[1] - domainY[0])) * plotHeight;

  const lineStart = { x: domainX[0], y: currentIntercept + currentSlope * domainX[0] };
  const lineEnd = { x: domainX[1], y: currentIntercept + currentSlope * domainX[1] };

  return (
    <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header & Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FAF2D8] text-[#806A28]">
              <TrendingUp className="w-4 h-4" />
            </span>
            Regression Line & Parameter Explorer
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Inspect how adjusting slope (β₁) and intercept (β₀) shifts the model and impacts error metrics.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => {
                setSelectedPresetIdx(idx);
                setIsCustomMode(false);
                setManualSlope(null);
                setManualIntercept(null);
              }}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                selectedPresetIdx === idx
                  ? 'bg-[#FAF2D8] text-[#806A28] border-[#EBD99A] shadow-xs'
                  : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:bg-[#FAF2D8]/50'
              }`}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selector & Control Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0F172A]">Mode:</label>
            <button
              onClick={() => {
                if (isCustomMode) {
                  setIsCustomMode(false);
                  setManualSlope(null);
                  setManualIntercept(null);
                } else {
                  setIsCustomMode(true);
                  setManualSlope(olsResult.slope);
                  setManualIntercept(olsResult.intercept);
                }
              }}
              className="text-xs font-semibold text-[#806A28] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              {isCustomMode ? 'Reset to OLS Optimal' : 'Manual Tuning'}
            </button>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-[#E2E8F0] text-xs text-[#475569]">
            {isCustomMode ? (
              <span className="font-medium text-[#806A28]">
                Manual Mode: Drag sliders to see how deviations from OLS increase SSE and RMSE.
              </span>
            ) : (
              <span className="font-medium text-emerald-700">
                OLS Optimal: Global minimum SSE achieved via analytical formula.
              </span>
            )}
          </div>
        </div>

        {/* Slope Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#475569]">Slope (β₁):</span>
            <span className="font-mono text-[#0F172A] font-bold">{currentSlope.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={olsResult.slope * 0.2}
            max={olsResult.slope * 2.0}
            step={0.05}
            disabled={!isCustomMode}
            value={currentSlope}
            onChange={(e) => setManualSlope(parseFloat(e.target.value))}
            className="w-full accent-[#E8C878] cursor-pointer disabled:opacity-50"
          />
          <div className="flex justify-between text-[10px] text-[#94A3B8]">
            <span>Flatter</span>
            <span>Steeper</span>
          </div>
        </div>

        {/* Intercept Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#475569]">Intercept (β₀):</span>
            <span className="font-mono text-[#0F172A] font-bold">{currentIntercept.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={olsResult.intercept - 30}
            max={olsResult.intercept + 30}
            step={0.5}
            disabled={!isCustomMode}
            value={currentIntercept}
            onChange={(e) => setManualIntercept(parseFloat(e.target.value))}
            className="w-full accent-[#E8C878] cursor-pointer disabled:opacity-50"
          />
          <div className="flex justify-between text-[10px] text-[#94A3B8]">
            <span>Lower</span>
            <span>Higher</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Scatter Plot */}
      <div className="relative bg-[#FAFAFA] rounded-xl border border-[#E2E8F0] p-3 overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto select-none"
        >
          {/* Grid lines */}
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

          {/* Vertical residual segments */}
          {activeDataset.x.map((xi, idx) => {
            const yi = activeDataset.y[idx];
            const yPred = currentPredictions[idx];
            return (
              <line
                key={`res-${idx}`}
                x1={scaleX(xi)}
                y1={scaleY(yi)}
                x2={scaleX(xi)}
                y2={scaleY(yPred)}
                stroke="#E8C878"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Fitted Regression Line */}
          <line
            x1={scaleX(lineStart.x)}
            y1={scaleY(lineStart.y)}
            x2={scaleX(lineEnd.x)}
            y2={scaleY(lineEnd.y)}
            stroke="#806A28"
            strokeWidth="2.5"
          />

          {/* Predicted points on line */}
          {activeDataset.x.map((xi, idx) => (
            <circle
              key={`pred-${idx}`}
              cx={scaleX(xi)}
              cy={scaleY(currentPredictions[idx])}
              r="3.5"
              fill="#FAF2D8"
              stroke="#806A28"
              strokeWidth="1.5"
            />
          ))}

          {/* Observed data points */}
          {activeDataset.x.map((xi, idx) => (
            <circle
              key={`obs-${idx}`}
              cx={scaleX(xi)}
              cy={scaleY(activeDataset.y[idx])}
              r="5"
              fill="#0F172A"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
          ))}

          {/* Labels & Legend */}
          <text
            x={margin.left + plotWidth / 2}
            y={svgHeight - 8}
            textAnchor="middle"
            className="text-[11px] fill-[#64748B] font-medium"
          >
            {activeDataset.xLabel}
          </text>
          <text
            x={16}
            y={margin.top + plotHeight / 2}
            textAnchor="middle"
            transform={`rotate(-90 16 ${margin.top + plotHeight / 2})`}
            className="text-[11px] fill-[#64748B] font-medium"
          >
            {activeDataset.yLabel}
          </text>
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-[#F1F5F9] text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#0F172A] inline-block"></span>
            <span className="text-[#475569]">Observed Data (yᵢ)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-[#806A28] inline-block"></span>
            <span className="text-[#475569]">Regression Line ŷ = β₀ + β₁x</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-b-2 border-dashed border-[#E8C878] inline-block"></span>
            <span className="text-[#475569]">Residual Error (eᵢ = yᵢ - ŷᵢ)</span>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-[#FAF2D8]/60 border border-[#EBD99A] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#806A28]">Fitted Equation</div>
          <div className="text-sm font-mono font-bold text-[#0F172A] mt-0.5">
            ŷ = {currentIntercept.toFixed(1)} + {currentSlope.toFixed(2)}x
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center shadow-2xs">
          <div className="text-[11px] font-semibold text-[#64748B]">Sum of Squared Errors (SSE)</div>
          <div className="text-sm font-mono font-bold text-[#0F172A] mt-0.5">
            {currentSSE.toFixed(2)}
          </div>
          {isCustomMode && (
            <div className="text-[10px] text-[#806A28] mt-0.5">
              Optimal: {olsResult.sse.toFixed(2)}
            </div>
          )}
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center shadow-2xs">
          <div className="text-[11px] font-semibold text-[#64748B]">RMSE (Typical Error)</div>
          <div className="text-sm font-mono font-bold text-[#0F172A] mt-0.5">
            {currentRMSE.toFixed(2)}
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center shadow-2xs">
          <div className="text-[11px] font-semibold text-[#64748B]">Goodness of Fit (R²)</div>
          <div className="text-sm font-mono font-bold text-[#0F172A] mt-0.5">
            {(currentR2 * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};
