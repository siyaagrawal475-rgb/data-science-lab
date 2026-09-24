'use client';

import React, { useMemo } from 'react';
import { Sparkles } from 'lucide-react';

interface ECDFPlotProps {
  data?: number[];
  label?: string;
  accentColor?: string;
  className?: string;
}

export const ECDFPlot: React.FC<ECDFPlotProps> = ({
  data = [10, 15, 18, 22, 25, 28, 30, 35, 38, 42, 45, 52, 60, 75],
  label = 'Empirical Cumulative Distribution Function (ECDF)',
  accentColor = '#416B9E',
  className = '',
}) => {
  const { sortedData, minVal, maxVal } = useMemo(() => {
    const s = [...data].sort((a, b) => a - b);
    return {
      sortedData: s,
      minVal: s[0],
      maxVal: s[s.length - 1],
    };
  }, [data]);

  const n = sortedData.length;
  const toSvgX = (x: number) => 35 + ((x - minVal) / Math.max(1, maxVal - minVal)) * 250;
  const toSvgY = (pct: number) => 140 - pct * 115;

  // Build step line points
  const stepPoints: string[] = [];
  stepPoints.push(`${toSvgX(minVal)},${toSvgY(0)}`);

  sortedData.forEach((val, idx) => {
    const prevPct = idx / n;
    const currPct = (idx + 1) / n;
    stepPoints.push(`${toSvgX(val)},${toSvgY(prevPct)}`);
    stepPoints.push(`${toSvgX(val)},${toSvgY(currPct)}`);
  });

  return (
    <div className={`p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-4 ${className}`}>
      <div>
        <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">{label}</h4>
        <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Fraction of data points less than or equal to value x (F_n(x))</p>
      </div>

      <div className="flex justify-center bg-[#F8FAFC] dark:bg-[#172033] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
        <svg width="320" height="160" className="overflow-visible select-none">
          {/* Axis lines */}
          <line x1="35" y1="140" x2="290" y2="140" stroke="#94A3B8" strokeWidth="1.2" />
          <line x1="35" y1="20" x2="35" y2="140" stroke="#94A3B8" strokeWidth="1.2" />

          {/* Y Axis percentage markers */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((p) => (
            <React.Fragment key={p}>
              <line x1="30" y1={toSvgY(p)} x2="290" y2={toSvgY(p)} stroke="#E2E8F0" strokeWidth="0.6" className="dark:stroke-[#334155]" />
              <text x="26" y={toSvgY(p) + 3} fill="#94A3B8" fontSize="8" textAnchor="end">{(p * 100).toFixed(0)}%</text>
            </React.Fragment>
          ))}

          {/* 50th Percentile (Median) Guideline */}
          <line x1="35" y1={toSvgY(0.5)} x2="290" y2={toSvgY(0.5)} stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />

          {/* ECDF Step Curve */}
          <polyline
            points={stepPoints.join(' ')}
            fill="none"
            stroke={accentColor}
            strokeWidth="2.5"
          />

          {/* Data Points */}
          {sortedData.map((val, idx) => (
            <circle
              key={idx}
              cx={toSvgX(val)}
              cy={toSvgY((idx + 1) / n)}
              r="2.5"
              fill={accentColor}
            />
          ))}

          {/* X Axis labels */}
          <text x="35" y="154" fill="#94A3B8" fontSize="9" textAnchor="middle">{minVal}</text>
          <text x="285" y="154" fill="#94A3B8" fontSize="9" textAnchor="middle">{maxVal}</text>
          <text x="160" y="154" fill="#64748B" fontSize="10" textAnchor="middle" fontWeight="bold">Value x</text>
        </svg>
      </div>

      <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-xs flex items-start gap-2">
        <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <p className="text-[#475569] dark:text-[#CBD5E1]">
          <strong>What this shows:</strong> Unlike a histogram, an ECDF requires zero binning assumptions. You can read any percentile directly off the curve (e.g. the 50% horizontal line intersects at the exact sample Median).
        </p>
      </div>
    </div>
  );
};
