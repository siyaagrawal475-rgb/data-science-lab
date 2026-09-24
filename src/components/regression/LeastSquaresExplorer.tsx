'use client';

import React, { useState, useMemo } from 'react';
import { linearRegression, predictLinear, sumSquaredErrors } from '@/lib/regressionMath';
import { Sparkles, Square } from 'lucide-react';

export const LeastSquaresExplorer: React.FC = () => {
  // Classic 5-point dataset for pristine geometric inspection
  const points = useMemo(() => [
    { x: 1, y: 2 },
    { x: 2, y: 3.5 },
    { x: 3, y: 3 },
    { x: 4, y: 5.5 },
    { x: 5, y: 6 }
  ], []);

  const xVals = useMemo(() => points.map((p) => p.x), [points]);
  const yVals = useMemo(() => points.map((p) => p.y), [points]);

  const ols = useMemo(() => linearRegression(xVals, yVals), [xVals, yVals]);

  const [slope, setSlope] = useState<number>(0.6);
  const [intercept, setIntercept] = useState<number>(2.0);
  const [showSquares, setShowSquares] = useState<boolean>(true);

  const predictions = useMemo(() => {
    return predictLinear(xVals, slope, intercept);
  }, [xVals, slope, intercept]);

  const sse = useMemo(() => {
    return sumSquaredErrors(yVals, predictions);
  }, [yVals, predictions]);

  const isAtOptimal = Math.abs(slope - ols.slope) < 0.05 && Math.abs(intercept - ols.intercept) < 0.1;

  const fitOptimal = () => {
    setSlope(parseFloat(ols.slope.toFixed(2)));
    setIntercept(parseFloat(ols.intercept.toFixed(2)));
  };

  // SVG coordinates
  const svgWidth = 540;
  const svgHeight = 340;
  const margin = { top: 25, right: 30, bottom: 40, left: 45 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const scaleX = (x: number) => margin.left + ((x - 0.5) / 5.0) * plotWidth;
  const scaleY = (y: number) => margin.top + plotHeight - ((y - 0.5) / 6.5) * plotHeight;

  return (
    <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FAF2D8] text-[#806A28]">
              <Square className="w-4 h-4" />
            </span>
            The Least-Squares Geometry Explorer
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Visualize the geometric squares attached to vertical residuals and observe how SSE minimizes at the OLS solution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSquares(!showSquares)}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              showSquares
                ? 'bg-[#FAF2D8] text-[#806A28] border-[#EBD99A]'
                : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]'
            }`}
          >
            {showSquares ? 'Hide Squares' : 'Show Squared Areas'}
          </button>
          <button
            onClick={fitOptimal}
            className="px-3 py-1.5 bg-[#806A28] hover:bg-[#6A5720] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Fit OLS Optimum
          </button>
        </div>
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#475569]">Candidate Slope (β₁):</span>
            <span className="font-mono text-[#0F172A] font-bold">{slope.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={2.0}
            step={0.02}
            value={slope}
            onChange={(e) => setSlope(parseFloat(e.target.value))}
            className="w-full accent-[#E8C878] cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#475569]">Candidate Intercept (β₀):</span>
            <span className="font-mono text-[#0F172A] font-bold">{intercept.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={-0.5}
            max={4.5}
            step={0.05}
            value={intercept}
            onChange={(e) => setIntercept(parseFloat(e.target.value))}
            className="w-full accent-[#E8C878] cursor-pointer"
          />
        </div>
      </div>

      {/* SVG Canvas with Geometric Error Squares */}
      <div className="relative bg-[#FAFAFA] rounded-xl border border-[#E2E8F0] p-3 overflow-hidden">
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

          {/* Geometric Error Squares */}
          {showSquares &&
            points.map((p, idx) => {
              const yPred = predictions[idx];
              const pyActual = scaleY(p.y);
              const pyPred = scaleY(yPred);
              const sideLen = Math.abs(pyPred - pyActual);

              if (sideLen < 1) return null;

              const xOrigin = scaleX(p.x);
              const yOrigin = Math.min(pyActual, pyPred);

              return (
                <rect
                  key={`sq-${idx}`}
                  x={xOrigin}
                  y={yOrigin}
                  width={sideLen}
                  height={sideLen}
                  fill="#FAF2D8"
                  fillOpacity="0.65"
                  stroke="#EBD99A"
                  strokeWidth="1"
                />
              );
            })}

          {/* Vertical Residual lines */}
          {points.map((p, idx) => {
            const yPred = predictions[idx];
            return (
              <line
                key={`line-res-${idx}`}
                x1={scaleX(p.x)}
                y1={scaleY(p.y)}
                x2={scaleX(p.x)}
                y2={scaleY(yPred)}
                stroke="#806A28"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Candidate Regression Line */}
          <line
            x1={scaleX(0.5)}
            y1={scaleY(intercept + slope * 0.5)}
            x2={scaleX(5.5)}
            y2={scaleY(intercept + slope * 5.5)}
            stroke="#0F172A"
            strokeWidth="2.5"
          />

          {/* Data Points */}
          {points.map((p, idx) => (
            <circle
              key={`pt-${idx}`}
              cx={scaleX(p.x)}
              cy={scaleY(p.y)}
              r="6"
              fill="#806A28"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          ))}
        </svg>

        {/* Dynamic Status Callout */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F1F5F9] text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isAtOptimal ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
              }`}
            ></span>
            <span className="font-semibold text-[#0F172A]">
              {isAtOptimal
                ? 'Global Minimum SSE Reached! (OLS Solution)'
                : 'Non-optimal candidate line: Total square area can be further minimized.'}
            </span>
          </div>
          <div className="text-[#64748B] text-[11px] font-mono">
            Optimal SSE = {ols.sse.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-[#FAF2D8]/60 border border-[#EBD99A] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#806A28]">Current Total SSE (Σ eᵢ²)</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            {sse.toFixed(2)}
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#64748B]">Optimal OLS SSE</div>
          <div className="text-lg font-mono font-bold text-emerald-700 mt-0.5">
            {ols.sse.toFixed(2)}
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#64748B]">Optimal Slope (β̂₁)</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            {ols.slope.toFixed(2)}
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#64748B]">Optimal Intercept (β̂₀)</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            {ols.intercept.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
