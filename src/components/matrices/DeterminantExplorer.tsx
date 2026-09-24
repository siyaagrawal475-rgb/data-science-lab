'use client';

import React, { useState } from 'react';
import { determinant2x2, Matrix2D } from '@/lib/matrixMath';

export const DeterminantExplorer: React.FC = () => {
  const [matrix, setMatrix] = useState<Matrix2D>([
    [3, 1],
    [1, 2],
  ]);

  const a = matrix[0][0];
  const b = matrix[0][1];
  const c = matrix[1][0];
  const d = matrix[1][1];

  const det = determinant2x2(matrix);
  const ad = a * d;
  const bc = b * c;

  // SVG parameters
  const size = 320;
  const center = size / 2;
  const scale = 28;

  const toSvg = (x: number, y: number) => ({
    x: center + x * scale,
    y: center - y * scale,
  });

  const origin = toSvg(0, 0);
  const ptV1 = toSvg(a, c);
  const ptV2 = toSvg(b, d);
  const ptCorner = toSvg(a + b, c + d);

  return (
    <div className="bg-white border border-[#B8DCC3] rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5F3E9] pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-800">2×2 Determinant & Area Explorer</h4>
          <p className="text-xs text-slate-500">
            Visualize how determinant <span className="font-mono font-bold text-[#3F7951]">ad - bc</span> geometrically calculates the signed area of the span parallelogram.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setMatrix([[3, 1], [1, 2]])}
            className="px-2 py-1 text-xs rounded bg-[#E5F3E9] text-[#3F7951] hover:bg-[#8FC7A3]/30 font-medium"
          >
            Area = 5
          </button>
          <button
            onClick={() => setMatrix([[2, 0], [0, 2]])}
            className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
          >
            Area = 4 (Scale)
          </button>
          <button
            onClick={() => setMatrix([[1, 2], [2, 4]])}
            className="px-2 py-1 text-xs rounded bg-amber-50 text-amber-800 hover:bg-amber-100 font-medium"
          >
            Area = 0 (Collinear)
          </button>
          <button
            onClick={() => setMatrix([[-2, 1], [1, 2]])}
            className="px-2 py-1 text-xs rounded bg-purple-50 text-purple-800 hover:bg-purple-100 font-medium"
          >
            Area = -5 (Flipped)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Graphic */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative border border-slate-200 rounded-lg bg-slate-50/50 p-2 overflow-hidden shadow-inner">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible select-none">
              <defs>
                <marker id="det-arrow-1" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                </marker>
                <marker id="det-arrow-2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#059669" />
                </marker>
              </defs>

              {/* Grid */}
              {[-5, -3, -1, 1, 3, 5].map((tick) => {
                const p1 = toSvg(tick, -6);
                const p2 = toSvg(tick, 6);
                const p3 = toSvg(-6, tick);
                const p4 = toSvg(6, tick);
                return (
                  <g key={tick} opacity={0.25}>
                    <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                  </g>
                );
              })}

              {/* Axes */}
              <line x1={0} y1={center} x2={size} y2={center} stroke="#94a3b8" strokeWidth="1.5" />
              <line x1={center} y1={0} x2={center} y2={size} stroke="#94a3b8" strokeWidth="1.5" />

              {/* Parallelogram Area Polygon */}
              <polygon
                points={`${origin.x},${origin.y} ${ptV1.x},${ptV1.y} ${ptCorner.x},${ptCorner.y} ${ptV2.x},${ptV2.y}`}
                fill={det < 0 ? '#C084FC' : '#8FC7A3'}
                fillOpacity={0.35}
                stroke={det < 0 ? '#7E22CE' : '#3F7951'}
                strokeWidth="2"
              />

              {/* Vector 1 (Col 1) */}
              <line
                x1={origin.x}
                y1={origin.y}
                x2={ptV1.x}
                y2={ptV1.y}
                stroke="#0284C7"
                strokeWidth="3"
                markerEnd="url(#det-arrow-1)"
              />

              {/* Vector 2 (Col 2) */}
              <line
                x1={origin.x}
                y1={origin.y}
                x2={ptV2.x}
                y2={ptV2.y}
                stroke="#059669"
                strokeWidth="3"
                markerEnd="url(#det-arrow-2)"
              />

              {/* Labels */}
              <text x={ptV1.x + 6} y={ptV1.y - 4} fill="#0284C7" fontSize="11" fontWeight="bold">
                v₁ [{a}, {c}]
              </text>
              <text x={ptV2.x + 6} y={ptV2.y + 12} fill="#059669" fontSize="11" fontWeight="bold">
                v₂ [{b}, {d}]
              </text>
              <text x={(origin.x + ptCorner.x) / 2} y={(origin.y + ptCorner.y) / 2} fill="#1E293B" fontSize="12" fontWeight="bold" textAnchor="middle">
                Area = {Math.abs(det).toFixed(2)}
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-sky-700">
              <span className="w-3 h-1 bg-sky-600 rounded-full" /> Column 1 [a, c]^T
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
              <span className="w-3 h-1 bg-emerald-600 rounded-full" /> Column 2 [b, d]^T
            </span>
          </div>
        </div>

        {/* Right Column: Controls & Equation Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#E5F3E9]/40 border border-[#B8DCC3] rounded-xl p-4 space-y-3">
            <span className="text-xs font-bold text-[#3F7951] uppercase tracking-wider block">
              2×2 Matrix Coordinates
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-600 block mb-0.5">Top-Left a: <strong className="font-mono text-sky-800">{a}</strong></span>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.5"
                  value={a}
                  onChange={(e) => setMatrix([[parseFloat(e.target.value), b], [c, d]])}
                  className="w-full accent-sky-600"
                />
              </div>
              <div>
                <span className="text-slate-600 block mb-0.5">Top-Right b: <strong className="font-mono text-emerald-800">{b}</strong></span>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.5"
                  value={b}
                  onChange={(e) => setMatrix([[a, parseFloat(e.target.value)], [c, d]])}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <span className="text-slate-600 block mb-0.5">Bottom-Left c: <strong className="font-mono text-sky-800">{c}</strong></span>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.5"
                  value={c}
                  onChange={(e) => setMatrix([[a, b], [parseFloat(e.target.value), d]])}
                  className="w-full accent-sky-600"
                />
              </div>
              <div>
                <span className="text-slate-600 block mb-0.5">Bottom-Right d: <strong className="font-mono text-emerald-800">{d}</strong></span>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.5"
                  value={d}
                  onChange={(e) => setMatrix([[a, b], [c, parseFloat(e.target.value)]])}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Formula calculation card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
            <h5 className="font-bold text-slate-800 font-sans uppercase tracking-wider text-xs">
              Algebraic Step Breakdown:
            </h5>
            <div className="space-y-1 text-slate-700">
              <p>1. Main diagonal product: <span className="font-bold text-slate-900">ad = ({a}) × ({d}) = {ad.toFixed(2)}</span></p>
              <p>2. Anti-diagonal product: <span className="font-bold text-slate-900">bc = ({b}) × ({c}) = {bc.toFixed(2)}</span></p>
              <p className="pt-1.5 border-t border-slate-200 text-sm font-bold text-[#3F7951] font-sans">
                det(A) = ad - bc = {ad.toFixed(2)} - {bc.toFixed(2)} = {det.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Status info */}
          <div className={`p-3 rounded-lg border text-xs ${Math.abs(det) < 0.001 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
            {Math.abs(det) < 0.001 ? (
              <p>
                ⚠️ <strong>Singular Matrix:</strong> The columns are collinear; the parallelogram collapses to zero area (1D line).
              </p>
            ) : (
              <p>
                ✓ <strong>Non-Singular Matrix:</strong> Transformed area is {Math.abs(det).toFixed(2)} square units. Invertible.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
