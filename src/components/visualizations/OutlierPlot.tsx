'use client';

import React, { useMemo } from 'react';

interface OutlierPlotProps {
  data?: number[];
  label?: string;
  className?: string;
}

export const OutlierPlot: React.FC<OutlierPlotProps> = ({
  data = [12, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 22, 23, 24, 25, 26, 28, 55, 62],
  label = 'Tukey 1.5×IQR Outlier Diagnostic Strip Plot',
  className = '',
}) => {
  const { q1, median, q3, iqr, upperFence, normalPoints, outlierPoints, minVal, maxVal } = useMemo(() => {
    const sorted = [...data].sort((a, b) => a - b);
    const n = sorted.length;
    const q1Val = sorted[Math.floor(n * 0.25)];
    const medVal = sorted[Math.floor(n * 0.5)];
    const q3Val = sorted[Math.floor(n * 0.75)];
    const iqrVal = q3Val - q1Val;
    const lFence = q1Val - 1.5 * iqrVal;
    const uFence = q3Val + 1.5 * iqrVal;

    const normals = sorted.filter((x) => x >= lFence && x <= uFence);
    const outs = sorted.filter((x) => x < lFence || x > uFence);

    return {
      q1: q1Val,
      median: medVal,
      q3: q3Val,
      iqr: iqrVal,
      lowerFence: lFence,
      upperFence: uFence,
      normalPoints: normals,
      outlierPoints: outs,
      minVal: sorted[0],
      maxVal: sorted[sorted.length - 1],
    };
  }, [data]);

  const toSvgX = (x: number) => 30 + ((x - minVal) / Math.max(1, maxVal - minVal)) * 260;

  return (
    <div className={`p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">{label}</h4>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Points outside [Q1 - 1.5×IQR, Q3 + 1.5×IQR] are flagged in red</p>
        </div>
        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-900">
          {outlierPoints.length} Outliers Detected
        </span>
      </div>

      <div className="flex justify-center bg-[#F8FAFC] dark:bg-[#172033] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
        <svg width="320" height="120" className="overflow-visible select-none">
          {/* Axis line */}
          <line x1="30" y1="80" x2="290" y2="80" stroke="#94A3B8" strokeWidth="1.5" />

          {/* IQR Box [Q1, Q3] */}
          <rect
            x={toSvgX(q1)}
            y="45"
            width={Math.max(4, toSvgX(q3) - toSvgX(q1))}
            height="35"
            fill="rgba(59, 130, 246, 0.15)"
            stroke="#3B82F6"
            strokeWidth="1.5"
            rx="3"
          />

          {/* Median line */}
          <line
            x1={toSvgX(median)}
            y1="40"
            x2={toSvgX(median)}
            y2="85"
            stroke="#1D4ED8"
            strokeWidth="2.5"
          />

          {/* Upper Fence line (Amber dashed) */}
          <line
            x1={toSvgX(upperFence)}
            y1="25"
            x2={toSvgX(upperFence)}
            y2="95"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <text x={toSvgX(upperFence)} y="20" fill="#F59E0B" fontSize="8" textAnchor="middle" fontWeight="bold">
            Upper Fence ({upperFence.toFixed(1)})
          </text>

          {/* Normal Points (Blue) */}
          {normalPoints.map((val, idx) => (
            <circle
              key={idx}
              cx={toSvgX(val)}
              cy={62 + ((idx % 3) - 1) * 6}
              r="3.5"
              fill="#3B82F6"
              fillOpacity="0.7"
            />
          ))}

          {/* Outlier Points (Red with ring) */}
          {outlierPoints.map((val, idx) => (
            <React.Fragment key={idx}>
              <circle
                cx={toSvgX(val)}
                cy="62"
                r="5"
                fill="#EF4444"
                stroke="#B91C1C"
                strokeWidth="1.5"
              />
              <text x={toSvgX(val)} y="100" fill="#EF4444" fontSize="9" textAnchor="middle" fontWeight="bold">
                {val}
              </text>
            </React.Fragment>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2.5 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-center">
          <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] block">Q1 / Median / Q3</span>
          <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] font-mono">{q1} / {median} / {q3}</span>
        </div>
        <div className="p-2.5 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-center">
          <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] block">IQR (Q3 - Q1)</span>
          <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">{iqr}</span>
        </div>
        <div className="p-2.5 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-center">
          <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] block">Outlier Threshold</span>
          <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">&gt; {upperFence.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};
