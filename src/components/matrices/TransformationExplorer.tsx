'use client';

import React, { useState } from 'react';
import { determinant2x2, Matrix2D } from '@/lib/matrixMath';

export const TransformationExplorer: React.FC = () => {
  const [matrix, setMatrix] = useState<Matrix2D>([
    [1.5, 0.5],
    [0.5, 1.2],
  ]);

  const a = matrix[0][0];
  const b = matrix[0][1];
  const c = matrix[1][0];
  const d = matrix[1][1];

  const det = determinant2x2(matrix);

  // Basis landings:
  // T(î) = A [1, 0]^T = [a, c]^T
  // T(ĵ) = A [0, 1]^T = [b, d]^T
  const iTransformed: [number, number] = [a, c];
  const jTransformed: [number, number] = [b, d];
  const cornerTransformed: [number, number] = [a + b, c + d];

  // SVG parameters
  const size = 340;
  const center = size / 2;
  const scale = 32; // 32px per unit => -5 to 5 range

  const toSvg = (x: number, y: number) => ({
    x: center + x * scale,
    y: center - y * scale,
  });

  const origin = toSvg(0, 0);
  const ptI = toSvg(iTransformed[0], iTransformed[1]);
  const ptJ = toSvg(jTransformed[0], jTransformed[1]);
  const ptCorner = toSvg(cornerTransformed[0], cornerTransformed[1]);

  // Transformed grid lines (generate grid from -4 to 4)
  const gridLines = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <div className="bg-white border border-[#B8DCC3] rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5F3E9] pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-800">Linear Transformation Explorer</h4>
          <p className="text-xs text-slate-500">
            Observe how a 2×2 matrix transforms the entire 2D Cartesian grid while keeping lines straight and parallel.
          </p>
        </div>

        {/* Transformation Presets */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setMatrix([[1, 0], [0, 1]])}
            className="px-2 py-1 text-xs rounded bg-[#E5F3E9] text-[#3F7951] hover:bg-[#8FC7A3]/30 font-medium"
          >
            Identity (No Change)
          </button>
          <button
            onClick={() => setMatrix([[1.5, 0], [0, 1.5]])}
            className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
          >
            Scale 1.5×
          </button>
          <button
            onClick={() => setMatrix([[0, -1], [1, 0]])}
            className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
          >
            Rotate 90°
          </button>
          <button
            onClick={() => setMatrix([[1, 1], [0, 1]])}
            className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
          >
            Shear (x + y)
          </button>
          <button
            onClick={() => setMatrix([[1, 0], [0, -1]])}
            className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
          >
            Reflect X
          </button>
          <button
            onClick={() => setMatrix([[1, 2], [0.5, 1]])}
            className="px-2 py-1 text-xs rounded bg-amber-50 text-amber-800 hover:bg-amber-100 font-medium"
          >
            Collapse (det=0)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Graphic */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative border border-slate-200 rounded-lg bg-slate-50/50 p-2 overflow-hidden shadow-inner">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible select-none">
              <defs>
                <marker id="trans-arrow-i" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                </marker>
                <marker id="trans-arrow-j" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#059669" />
                </marker>
              </defs>

              {/* Background Reference Standard Grid */}
              {gridLines.map((tick) => {
                const p1 = toSvg(tick, -5);
                const p2 = toSvg(tick, 5);
                const p3 = toSvg(-5, tick);
                const p4 = toSvg(5, tick);
                return (
                  <g key={tick} opacity={0.25}>
                    <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                  </g>
                );
              })}

              {/* Transformed Grid Lines */}
              {gridLines.map((k) => {
                // Lines parallel to T(î): k * T(ĵ) + t * T(î)
                const startX = k * b + (-4) * a;
                const startY = k * d + (-4) * c;
                const endX = k * b + (4) * a;
                const endY = k * d + (4) * c;
                const pStart = toSvg(startX, startY);
                const pEnd = toSvg(endX, endY);

                // Lines parallel to T(ĵ): k * T(î) + t * T(ĵ)
                const startX2 = k * a + (-4) * b;
                const startY2 = k * c + (-4) * d;
                const endX2 = k * a + (4) * b;
                const endY2 = k * c + (4) * d;
                const pStart2 = toSvg(startX2, startY2);
                const pEnd2 = toSvg(endX2, endY2);

                return (
                  <g key={`trans-${k}`} opacity={0.35}>
                    <line x1={pStart.x} y1={pStart.y} x2={pEnd.x} y2={pEnd.y} stroke="#8FC7A3" strokeWidth="1" />
                    <line x1={pStart2.x} y1={pStart2.y} x2={pEnd2.x} y2={pEnd2.y} stroke="#8FC7A3" strokeWidth="1" />
                  </g>
                );
              })}

              {/* Axes */}
              <line x1={0} y1={center} x2={size} y2={center} stroke="#94a3b8" strokeWidth="1.5" />
              <line x1={center} y1={0} x2={center} y2={size} stroke="#94a3b8" strokeWidth="1.5" />

              {/* Transformed Unit Area (Parallelogram) Polygon */}
              <polygon
                points={`${origin.x},${origin.y} ${ptI.x},${ptI.y} ${ptCorner.x},${ptCorner.y} ${ptJ.x},${ptJ.y}`}
                fill="#8FC7A3"
                fillOpacity={0.25}
                stroke="#3F7951"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />

              {/* Transformed Vector Aî */}
              <line
                x1={origin.x}
                y1={origin.y}
                x2={ptI.x}
                y2={ptI.y}
                stroke="#0284C7"
                strokeWidth="3.5"
                markerEnd="url(#trans-arrow-i)"
              />

              {/* Transformed Vector Aĵ */}
              <line
                x1={origin.x}
                y1={origin.y}
                x2={ptJ.x}
                y2={ptJ.y}
                stroke="#059669"
                strokeWidth="3.5"
                markerEnd="url(#trans-arrow-j)"
              />

              {/* Labels */}
              <text x={ptI.x + 8} y={ptI.y - 4} fill="#0284C7" fontSize="12" fontWeight="bold">
                T(î) [{a}, {c}]
              </text>
              <text x={ptJ.x + 8} y={ptJ.y + 12} fill="#059669" fontSize="12" fontWeight="bold">
                T(ĵ) [{b}, {d}]
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-sky-700">
              <span className="w-3 h-1 bg-sky-600 rounded-full" /> Col 1: Transformed î
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
              <span className="w-3 h-1 bg-emerald-600 rounded-full" /> Col 2: Transformed ĵ
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-[#3F7951]">
              <span className="w-3 h-2 bg-[#8FC7A3]/40 border border-[#3F7951] rounded-xs" /> Unit Parallelogram Area
            </span>
          </div>
        </div>

        {/* Right Column: Matrix Sliders & Transform Metrics */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#E5F3E9]/40 border border-[#B8DCC3] rounded-xl p-4 space-y-3">
            <span className="text-xs font-bold text-[#3F7951] uppercase tracking-wider block">
              Transformation Matrix A
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>Col 1 x (a):</span>
                  <span className="font-mono font-bold text-sky-800">{a}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={a}
                  onChange={(e) => setMatrix([[parseFloat(e.target.value), b], [c, d]])}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>Col 2 x (b):</span>
                  <span className="font-mono font-bold text-emerald-800">{b}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={b}
                  onChange={(e) => setMatrix([[a, parseFloat(e.target.value)], [c, d]])}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>Col 1 y (c):</span>
                  <span className="font-mono font-bold text-sky-800">{c}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={c}
                  onChange={(e) => setMatrix([[a, b], [parseFloat(e.target.value), d]])}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>Col 2 y (d):</span>
                  <span className="font-mono font-bold text-emerald-800">{d}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={d}
                  onChange={(e) => setMatrix([[a, b], [c, parseFloat(e.target.value)]])}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Area & Determinant Status Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center text-slate-800 font-semibold font-sans border-b border-slate-200 pb-1">
              <span>Determinant (Area Scaling):</span>
              <span className={`font-bold font-mono text-sm ${Math.abs(det) < 0.001 ? 'text-red-600' : 'text-[#3F7951]'}`}>
                det(A) = {det.toFixed(2)}
              </span>
            </div>

            <div className="space-y-1 text-slate-600 font-sans text-xs">
              <p>
                • Unit square area (1.0) is scaled by factor: <strong className="font-mono text-slate-800">{Math.abs(det).toFixed(2)}</strong>
              </p>
              <p>
                • Spatial Orientation:{' '}
                <strong className={det >= 0 ? 'text-emerald-700' : 'text-amber-700'}>
                  {det > 0 ? 'Preserved (Standard)' : det < 0 ? 'Flipped / Inverted (Reflection)' : 'Collapsed to 1D Line'}
                </strong>
              </p>
              <p>
                • Invertibility:{' '}
                <strong className={Math.abs(det) > 0.001 ? 'text-emerald-700' : 'text-red-700'}>
                  {Math.abs(det) > 0.001 ? 'Invertible (No Information Loss)' : 'Singular (Information Lost)'}
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
