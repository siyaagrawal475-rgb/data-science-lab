'use client';

import React, { useState } from 'react';
import { Sparkles, Sliders } from 'lucide-react';

export const PolynomialFitPlot: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [degree, setDegree] = useState(2);

  // 8 noisy non-linear training points: y = sin(x) + noise
  const rawPoints = [
    { x: 0.5, y: 0.45 },
    { x: 1.2, y: 0.95 },
    { x: 2.0, y: 0.88 },
    { x: 2.8, y: 0.32 },
    { x: 3.5, y: -0.38 },
    { x: 4.2, y: -0.92 },
    { x: 5.0, y: -0.85 },
    { x: 5.8, y: -0.22 },
  ];

  const toSvgX = (x: number) => 35 + (x / 6.5) * 240;
  const toSvgY = (y: number) => 120 - (y / 1.5) * 80;

  // Approximate polynomial fit curves for degree 1 (linear underfit), degree 2-3 (good fit), and degree 7 (wild overfit)
  const curvePoints: string[] = [];
  for (let x = 0.3; x <= 6.0; x += 0.1) {
    let y = 0;
    if (degree === 1) {
      // Linear fit
      y = 0.8 - 0.25 * x;
    } else if (degree === 2) {
      // Quadratic fit
      y = 0.3 + 0.6 * x - 0.12 * x * x;
    } else if (degree === 3) {
      // Cubic fit (resembles true sine)
      y = Math.sin(x * 0.9);
    } else {
      // Overfit high-degree oscillation
      y = Math.sin(x * 0.9) + 0.6 * Math.sin(x * 4.5);
    }
    curvePoints.push(`${toSvgX(x)},${toSvgY(y)}`);
  }

  return (
    <div className={`p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            Polynomial Regression: Underfitting vs Overfitting
          </h4>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
            Adjust polynomial degree to observe bias-variance trade-off
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Sliders className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#64748B] dark:text-[#94A3B8]">Degree (d):</span>
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={degree}
            onChange={(e) => setDegree(parseInt(e.target.value))}
            className="w-20 accent-amber-500"
          />
          <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
            {degree === 1 ? '1 (Linear Underfit)' : degree === 2 ? '2 (Quadratic)' : degree === 3 ? '3 (Optimal Fit)' : '7 (Extreme Overfit)'}
          </span>
        </div>
      </div>

      <div className="flex justify-center bg-[#F8FAFC] dark:bg-[#172033] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
        <svg width="300" height="200" className="overflow-visible select-none">
          {/* Axis lines */}
          <line x1="35" y1="120" x2="285" y2="120" stroke="#94A3B8" strokeWidth="1" />
          <line x1="35" y1="20" x2="35" y2="190" stroke="#94A3B8" strokeWidth="1" />

          {/* Polynomial Fit Curve */}
          <polyline
            points={curvePoints.join(' ')}
            fill="none"
            stroke={degree === 1 ? '#EF4444' : degree <= 3 ? '#10B981' : '#F59E0B'}
            strokeWidth="3"
          />

          {/* Training Data Points */}
          {rawPoints.map((pt, i) => (
            <circle
              key={i}
              cx={toSvgX(pt.x)}
              cy={toSvgY(pt.y)}
              r="4.5"
              fill="#3B82F6"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
          ))}

          <text x="280" y="115" fill="#64748B" fontSize="9">x</text>
          <text x="25" y="25" fill="#64748B" fontSize="9">y</text>
        </svg>
      </div>

      <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-xs flex items-start gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[#475569] dark:text-[#CBD5E1]">
          {degree === 1 && (
            <span><strong>Degree 1 (High Bias / Underfitting):</strong> A straight line is too rigid to capture the curvature of the data, producing high training and test error.</span>
          )}
          {degree === 2 && (
            <span><strong>Degree 2 (Good Balance):</strong> Parabolic curve captures the broad rise and fall with low variance.</span>
          )}
          {degree === 3 && (
            <span><strong>Degree 3 (Optimal Generalization):</strong> Captures the underlying sinusoidal signal without memorizing local noise.</span>
          )}
          {degree >= 4 && (
            <span><strong>High Degree (High Variance / Overfitting):</strong> The polynomial twists excessively to pass through every individual data point, failing disastrously on new unseen data.</span>
          )}
        </p>
      </div>
    </div>
  );
};
