'use client';

import React, { useState, useMemo } from 'react';
import { linearRegression, totalSumOfSquares } from '@/lib/regressionMath';
import { AlertCircle, CheckCircle, Activity } from 'lucide-react';

interface DiagnosticPreset {
  name: string;
  category: 'ideal' | 'nonlinear' | 'heteroscedastic' | 'outlier';
  x: number[];
  y: number[];
  diagnosisTitle: string;
  diagnosisExplanation: string;
  remedy: string;
}

const DIAGNOSTIC_PRESETS: DiagnosticPreset[] = [
  {
    name: 'Ideal Homoscedastic',
    category: 'ideal',
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [3.2, 4.9, 7.1, 8.8, 11.2, 12.9, 15.1, 16.8, 19.3, 21.0, 23.2, 24.8],
    diagnosisTitle: 'Homoscedastic & Linear (Gauss-Markov Compliant)',
    diagnosisExplanation: 'Residuals bounce randomly around the e = 0 horizontal axis with constant variance. No visible curves, funnels, or systematic trends.',
    remedy: 'Standard OLS model is valid and optimal.'
  },
  {
    name: 'Nonlinear Curvature',
    category: 'nonlinear',
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [2, 5, 10, 17, 26, 37, 50, 65, 82, 101, 122, 145],
    diagnosisTitle: 'Curvature Pattern (Linearity Violation)',
    diagnosisExplanation: 'Residuals exhibit a distinct parabolic U-shape: systematically positive at extremes and negative in the center.',
    remedy: 'Add polynomial feature (x²) or apply non-linear log transformation.'
  },
  {
    name: 'Heteroscedastic Funnel',
    category: 'heteroscedastic',
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [2.1, 3.8, 6.2, 7.5, 11.9, 10.8, 17.5, 13.2, 23.4, 18.0, 29.5, 21.2],
    diagnosisTitle: 'Heteroscedasticity (Funnel / Megaphone Spread)',
    diagnosisExplanation: 'Residual variance increases significantly as fitted values grow larger, violating the equal error variance assumption.',
    remedy: 'Apply log-transform to target Y or use Weighted Least Squares (WLS).'
  },
  {
    name: 'Influential Outlier',
    category: 'outlier',
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 58],
    diagnosisTitle: 'High-Leverage Influential Outlier',
    diagnosisExplanation: 'Point x=12, y=58 possesses both extreme leverage and an enormous residual, tilting the slope upwards.',
    remedy: 'Audit data point for sensor/collection error or apply robust regression.'
  }
];

export const ResidualExplorer: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const preset = DIAGNOSTIC_PRESETS[selectedIdx];

  const ols = useMemo(() => linearRegression(preset.x, preset.y), [preset]);

  const residuals = ols.residuals;
  const sst = useMemo(() => totalSumOfSquares(preset.y), [preset.y]);

  // Plots dimensions
  const svgWidth = 520;
  const svgHeight = 220;
  const margin = { top: 15, right: 20, bottom: 35, left: 45 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  // Scaling for Residuals vs Fitted
  const minFitted = Math.min(...ols.predictions);
  const maxFitted = Math.max(...ols.predictions);
  const maxAbsRes = Math.max(...residuals.map((r) => Math.abs(r)), 1);

  const scaleFitted = (val: number) =>
    margin.left + ((val - minFitted) / (maxFitted - minFitted || 1)) * plotWidth;
  const scaleRes = (res: number) =>
    margin.top + plotHeight / 2 - (res / (maxAbsRes * 1.2)) * (plotHeight / 2);

  return (
    <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FAF2D8] text-[#806A28]">
              <Activity className="w-4 h-4" />
            </span>
            Residual & Model Fit Diagnostic Explorer
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Evaluate residual distributions, detect pattern violations (linearity, homoscedasticity, outliers), and inspect R².
          </p>
        </div>

        {/* Diagnostic Presets */}
        <div className="flex flex-wrap gap-1.5">
          {DIAGNOSTIC_PRESETS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setSelectedIdx(idx)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-[#FAF2D8] text-[#806A28] border-[#EBD99A] shadow-xs'
                  : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:bg-[#FAF2D8]/50'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Residuals vs Fitted Plot */}
      <div className="bg-[#FAFAFA] rounded-xl border border-[#E2E8F0] p-3 space-y-2">
        <div className="flex items-center justify-between text-xs px-2">
          <span className="font-bold text-[#0F172A]">Diagnostic Plot: Residuals (eᵢ) vs. Fitted Values (ŷᵢ)</span>
          <span className="text-[#64748B] text-[11px]">Zero-line reference (e = 0)</span>
        </div>

        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none">
          {/* Zero Error Baseline */}
          <line
            x1={margin.left}
            y1={scaleRes(0)}
            x2={margin.left + plotWidth}
            y2={scaleRes(0)}
            stroke="#806A28"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Axes */}
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={margin.top + plotHeight}
            stroke="#CBD5E1"
            strokeWidth="1"
          />
          <line
            x1={margin.left}
            y1={margin.top + plotHeight}
            x2={margin.left + plotWidth}
            y2={margin.top + plotHeight}
            stroke="#CBD5E1"
            strokeWidth="1"
          />

          {/* Residual Points and Connecting Stems */}
          {preset.x.map((xi, idx) => {
            const yPred = ols.predictions[idx];
            const r = residuals[idx];
            const px = scaleFitted(yPred);
            const py = scaleRes(r);
            const p0 = scaleRes(0);

            return (
              <g key={`res-point-${idx}`}>
                <line x1={px} y1={p0} x2={px} y2={py} stroke="#EBD99A" strokeWidth="1.5" />
                <circle
                  cx={px}
                  cy={py}
                  r="4.5"
                  fill={Math.abs(r) > maxAbsRes * 0.7 ? '#B91C1C' : '#806A28'}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          <text
            x={margin.left + plotWidth / 2}
            y={svgHeight - 6}
            textAnchor="middle"
            className="text-[10px] fill-[#64748B] font-medium"
          >
            Fitted Values (ŷ)
          </text>
          <text
            x={14}
            y={margin.top + plotHeight / 2}
            textAnchor="middle"
            transform={`rotate(-90 14 ${margin.top + plotHeight / 2})`}
            className="text-[10px] fill-[#64748B] font-medium"
          >
            Residual Error (eᵢ)
          </text>
        </svg>
      </div>

      {/* Diagnostic Analysis Panel */}
      <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
        <div className="flex items-center gap-2">
          {preset.category === 'ideal' ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span className="text-xs font-bold text-[#0F172A]">{preset.diagnosisTitle}</span>
        </div>
        <p className="text-xs text-[#475569] leading-relaxed">{preset.diagnosisExplanation}</p>
        <div className="pt-1.5 border-t border-[#E2E8F0] flex items-center gap-1.5 text-xs text-[#806A28] font-semibold">
          <span>Recommended Remediation:</span>
          <span className="text-[#0F172A] font-normal">{preset.remedy}</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-[#FAF2D8]/60 border border-[#EBD99A] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#806A28]">Goodness of Fit (R²)</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            {(ols.rSquared * 100).toFixed(1)}%
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#64748B]">RMSE (Error Spread)</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            {ols.rmse.toFixed(2)}
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#64748B]">Total SSE (Σ eᵢ²)</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            {ols.sse.toFixed(2)}
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#64748B]">Total SST (Variance)</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            {sst.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
