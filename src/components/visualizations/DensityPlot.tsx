'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, Sliders } from 'lucide-react';

interface DensityPlotProps {
  data?: number[];
  label?: string;
  accentColor?: string;
  className?: string;
}

export const DensityPlot: React.FC<DensityPlotProps> = ({
  data = [12, 14, 15, 18, 19, 20, 22, 22, 23, 24, 25, 26, 28, 30, 32, 35, 40, 42, 45, 50],
  label = 'Kernel Density Estimation (KDE)',
  accentColor = '#F4A58A',
  className = '',
}) => {
  const [bandwidth, setBandwidth] = useState(3.0);

  // Gaussian Kernel Density Estimation computation
  const { curvePoints, minX, maxX, peakDensity } = useMemo(() => {
    const sorted = [...data].sort((a, b) => a - b);
    const min = Math.floor(sorted[0] - bandwidth * 2);
    const max = Math.ceil(sorted[sorted.length - 1] + bandwidth * 2);
    const step = (max - min) / 60;
    const n = data.length;

    const points: { x: number; density: number }[] = [];
    let maxD = 0;

    for (let x = min; x <= max; x += step) {
      let sumKernel = 0;
      for (let i = 0; i < n; i++) {
        const u = (x - data[i]) / bandwidth;
        // Standard Gaussian kernel (1 / √(2π)) * e^(-0.5 * u²)
        const k = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * u * u);
        sumKernel += k;
      }
      const density = (1 / (n * bandwidth)) * sumKernel;
      if (density > maxD) maxD = density;
      points.push({ x, density });
    }

    return {
      curvePoints: points,
      minX: min,
      maxX: max,
      peakDensity: Math.max(maxD, 0.001),
    };
  }, [data, bandwidth]);

  // SVG coordinate transformation (Width: 320, Height: 160)
  const toSvgX = (x: number) => 30 + ((x - minX) / (maxX - minX)) * 260;
  const toSvgY = (d: number) => 140 - (d / peakDensity) * 110;

  const svgPath = curvePoints.map((p) => `${toSvgX(p.x)},${toSvgY(p.density)}`).join(' ');
  const areaPath = `${toSvgX(minX)},140 ${svgPath} ${toSvgX(maxX)},140`;

  return (
    <div className={`p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">{label}</h4>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Continuous probability density with Gaussian smoothing</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Sliders className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#64748B] dark:text-[#94A3B8]">Bandwidth (h):</span>
          <input
            type="range"
            min="0.8"
            max="8.0"
            step="0.2"
            value={bandwidth}
            onChange={(e) => setBandwidth(parseFloat(e.target.value))}
            className="w-24 accent-[#F4A58A]"
          />
          <span className="font-mono font-bold text-[#0F172A] dark:text-[#F8FAFC]">{bandwidth.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex justify-center bg-[#F8FAFC] dark:bg-[#172033] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
        <svg width="320" height="160" className="overflow-visible select-none">
          {/* Axis line */}
          <line x1="30" y1="140" x2="290" y2="140" stroke="#94A3B8" strokeWidth="1.2" />
          <line x1="30" y1="20" x2="30" y2="140" stroke="#94A3B8" strokeWidth="1.2" />

          {/* Shaded Density Area */}
          <polygon
            points={areaPath}
            fill={accentColor}
            fillOpacity="0.25"
          />

          {/* Smooth Density Line */}
          <polyline
            points={svgPath}
            fill="none"
            stroke={accentColor}
            strokeWidth="3"
          />

          {/* Rug plot at bottom for raw data points */}
          {data.map((val, idx) => (
            <line
              key={idx}
              x1={toSvgX(val)}
              y1="140"
              x2={toSvgX(val)}
              y2="132"
              stroke="#64748B"
              strokeWidth="1.2"
            />
          ))}

          {/* Min and Max X labels */}
          <text x="30" y="154" fill="#94A3B8" fontSize="9" textAnchor="middle">{minX}</text>
          <text x="290" y="154" fill="#94A3B8" fontSize="9" textAnchor="middle">{maxX}</text>
          <text x="160" y="154" fill="#64748B" fontSize="10" textAnchor="middle" fontWeight="bold">Value Domain</text>
        </svg>
      </div>

      <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-xs flex items-start gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#F4A58A] shrink-0 mt-0.5" />
        <p className="text-[#475569] dark:text-[#CBD5E1]">
          <strong>What this shows:</strong> KDE estimates the underlying probability density function f(x) by placing a Gaussian bell curve over each data point. Lower bandwidth creates sharper local peaks; higher bandwidth produces a smoother global curve.
        </p>
      </div>
    </div>
  );
};
