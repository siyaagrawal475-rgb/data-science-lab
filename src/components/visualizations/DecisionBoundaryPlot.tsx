'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface DataPoint {
  x: number;
  y: number;
  label: 0 | 1;
}

interface DecisionBoundaryPlotProps {
  points?: DataPoint[];
  boundaryFunction?: (x: number) => number;
  xLabel?: string;
  yLabel?: string;
  accentClass0?: string;
  accentClass1?: string;
}

export const DecisionBoundaryPlot: React.FC<DecisionBoundaryPlotProps> = ({
  points = [
    { x: 2, y: 3, label: 0 },
    { x: 3, y: 2, label: 0 },
    { x: 2.5, y: 4, label: 0 },
    { x: 4, y: 3, label: 0 },
    { x: 5, y: 6, label: 1 },
    { x: 6, y: 5, label: 1 },
    { x: 6.5, y: 7, label: 1 },
    { x: 7, y: 6.5, label: 1 },
  ],
  boundaryFunction = (x: number) => -1.1 * x + 9,
  xLabel = 'Feature 1 (X₁)',
  yLabel = 'Feature 2 (X₂)',
  accentClass0 = '#91B9E8',
  accentClass1 = '#D99AAF',
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // SVG coordinate ranges
  const minX = 0;
  const maxX = 10;
  const minY = 0;
  const maxY = 10;

  const toSvgX = (x: number) => ((x - minX) / (maxX - minX)) * 280 + 30;
  const toSvgY = (y: number) => 220 - ((y - minY) / (maxY - minY)) * 180;

  // Boundary points
  const boundaryStart = { x: minX, y: boundaryFunction(minX) };
  const boundaryEnd = { x: maxX, y: boundaryFunction(maxX) };

  return (
    <div className="w-full flex flex-col items-center py-2 space-y-3">
      <div className="w-full max-w-md bg-slate-50 dark:bg-[#101923] border border-slate-200 dark:border-[#2E3B4A] rounded-xl p-3">
        <svg className="w-full h-60" viewBox="0 0 340 240">
          {/* Shaded decision regions */}
          <polygon
            points={`${toSvgX(minX)},${toSvgY(minY)} ${toSvgX(maxX)},${toSvgY(minY)} ${toSvgX(boundaryEnd.x)},${toSvgY(boundaryEnd.y)} ${toSvgX(boundaryStart.x)},${toSvgY(boundaryStart.y)}`}
            fill={`${accentClass0}20`}
          />
          <polygon
            points={`${toSvgX(minX)},${toSvgY(maxY)} ${toSvgX(maxX)},${toSvgY(maxY)} ${toSvgX(boundaryEnd.x)},${toSvgY(boundaryEnd.y)} ${toSvgX(boundaryStart.x)},${toSvgY(boundaryStart.y)}`}
            fill={`${accentClass1}20`}
          />

          {/* Grid lines */}
          {[2, 4, 6, 8].map((v) => (
            <React.Fragment key={v}>
              <line
                x1={toSvgX(v)}
                y1={toSvgY(minY)}
                x2={toSvgX(v)}
                y2={toSvgY(maxY)}
                stroke={isDark ? '#2E3B4A' : '#E2E8F0'}
                strokeDasharray="2,2"
              />
              <line
                x1={toSvgX(minX)}
                y1={toSvgY(v)}
                x2={toSvgX(maxX)}
                y2={toSvgY(v)}
                stroke={isDark ? '#2E3B4A' : '#E2E8F0'}
                strokeDasharray="2,2"
              />
            </React.Fragment>
          ))}

          {/* Axes */}
          <line
            x1={toSvgX(minX)}
            y1={toSvgY(minY)}
            x2={toSvgX(maxX)}
            y2={toSvgY(minY)}
            stroke={isDark ? '#64748B' : '#94A3B8'}
            strokeWidth="1.5"
          />
          <line
            x1={toSvgX(minX)}
            y1={toSvgY(minY)}
            x2={toSvgX(minX)}
            y2={toSvgY(maxY)}
            stroke={isDark ? '#64748B' : '#94A3B8'}
            strokeWidth="1.5"
          />

          {/* Decision Boundary Line */}
          <line
            x1={toSvgX(boundaryStart.x)}
            y1={toSvgY(boundaryStart.y)}
            x2={toSvgX(boundaryEnd.x)}
            y2={toSvgY(boundaryEnd.y)}
            stroke="#6366F1"
            strokeWidth="2.5"
            strokeDasharray="4,4"
          />

          {/* Data Points */}
          {points.map((pt, i) => {
            const isClass1 = pt.label === 1;
            return (
              <circle
                key={i}
                cx={toSvgX(pt.x)}
                cy={toSvgY(pt.y)}
                r="5"
                fill={isClass1 ? accentClass1 : accentClass0}
                stroke={isDark ? '#151F2B' : '#FFFFFF'}
                strokeWidth="1.5"
              />
            );
          })}

          {/* Labels */}
          <text
            x="170"
            y="235"
            textAnchor="middle"
            className="text-[10px] font-bold fill-slate-500 dark:fill-slate-400"
          >
            {xLabel}
          </text>
          <text
            x="12"
            y="120"
            textAnchor="middle"
            transform="rotate(-90 12 120)"
            className="text-[10px] font-bold fill-slate-500 dark:fill-slate-400"
          >
            {yLabel}
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: accentClass0 }}
          />
          <span>Class 0 Region</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: accentClass1 }}
          />
          <span>Class 1 Region</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-0.5 bg-indigo-500 border-t border-dashed" />
          <span>Decision Boundary (P = 0.5)</span>
        </div>
      </div>
    </div>
  );
};
