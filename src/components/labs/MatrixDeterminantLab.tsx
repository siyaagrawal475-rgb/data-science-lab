'use client';

import React, { useState } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { determinant2x2, inverse2x2, Matrix2D } from '@/lib/matrixMath';

export const MatrixDeterminantLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-3');
  const isDone = isLabCompleted('determinants');

  const [matrix, setMatrix] = useState<Matrix2D>([
    [4, 2],
    [1, 3],
  ]);

  const a = matrix[0][0];
  const b = matrix[0][1];
  const c = matrix[1][0];
  const d = matrix[1][1];

  const det = determinant2x2(matrix);
  const inv = inverse2x2(matrix);

  // SVG parameters
  const size = 340;
  const center = size / 2;
  const scale = 26;

  const toSvg = (x: number, y: number) => ({
    x: center + x * scale,
    y: center - y * scale,
  });

  const origin = toSvg(0, 0);
  const ptV1 = toSvg(a, c);
  const ptV2 = toSvg(b, d);
  const ptCorner = toSvg(a + b, c + d);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E5F3E9] text-[#3F7951]">
              Unit 3 • Lab 4
            </span>
            <span className="text-sm text-slate-500 font-medium">Determinant & Invertibility Analysis Lab</span>
          </div>
          <p className="text-xs text-slate-600">
            Evaluate determinants, verify invertibility conditions, inspect inverse matrices, and visualize signed area transformations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMatrix([[4, 2], [1, 3]])}
            className="text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>

          <Button
            onClick={() => completeLab('determinants')}
            variant={isDone ? 'outline' : 'primary'}
            size="sm"
            className={isDone ? 'border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100' : 'bg-[#3F7951] hover:bg-[#2e5c3c] text-white'}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            {isDone ? 'Completed' : 'Mark Lab Complete'}
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Geometric Area SVG */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
          <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">Geometric Determinant Area</h3>
            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${inv ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {inv ? 'Invertible Matrix' : 'Singular (det = 0)'}
            </span>
          </div>

          <div className="relative border border-slate-200 rounded-lg bg-slate-50/50 p-2 overflow-hidden shadow-inner">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible select-none">
              <defs>
                <marker id="lab-det-1" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                </marker>
                <marker id="lab-det-2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
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

              {/* Transformed Parallelogram */}
              <polygon
                points={`${origin.x},${origin.y} ${ptV1.x},${ptV1.y} ${ptCorner.x},${ptCorner.y} ${ptV2.x},${ptV2.y}`}
                fill={det < 0 ? '#C084FC' : '#8FC7A3'}
                fillOpacity={0.35}
                stroke={det < 0 ? '#7E22CE' : '#3F7951'}
                strokeWidth="2"
              />

              {/* Column Vectors */}
              <line x1={origin.x} y1={origin.y} x2={ptV1.x} y2={ptV1.y} stroke="#0284C7" strokeWidth="3" markerEnd="url(#lab-det-1)" />
              <line x1={origin.x} y1={origin.y} x2={ptV2.x} y2={ptV2.y} stroke="#059669" strokeWidth="3" markerEnd="url(#lab-det-2)" />

              {/* Text */}
              <text x={ptV1.x + 6} y={ptV1.y - 4} fill="#0284C7" fontSize="11" fontWeight="bold">
                Col 1 [{a}, {c}]
              </text>
              <text x={ptV2.x + 6} y={ptV2.y + 12} fill="#059669" fontSize="11" fontWeight="bold">
                Col 2 [{b}, {d}]
              </text>
              <text x={(origin.x + ptCorner.x) / 2} y={(origin.y + ptCorner.y) / 2} fill="#1E293B" fontSize="12" fontWeight="bold" textAnchor="middle">
                Area = {Math.abs(det).toFixed(2)}
              </text>
            </svg>
          </div>
        </div>

        {/* Right: Matrix Editor & Inverse Calculations */}
        <div className="lg:col-span-5 space-y-4">
          {/* 2x2 Editor */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Matrix Entries (a, b, c, d)
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-600 block mb-0.5">a: <strong className="font-mono text-sky-800">{a}</strong></span>
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
                <span className="text-slate-600 block mb-0.5">b: <strong className="font-mono text-emerald-800">{b}</strong></span>
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
                <span className="text-slate-600 block mb-0.5">c: <strong className="font-mono text-sky-800">{c}</strong></span>
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
                <span className="text-slate-600 block mb-0.5">d: <strong className="font-mono text-emerald-800">{d}</strong></span>
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

          {/* Determinant Metric Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between items-center text-slate-800 font-bold font-sans">
              <span>Determinant Calculation:</span>
              <span className="text-[#3F7951] font-mono text-sm">det(A) = {det.toFixed(2)}</span>
            </div>
            <p className="text-slate-600 font-sans">
              ad - bc = ({a})({d}) - ({b})({c}) = {(a * d).toFixed(1)} - {(b * c).toFixed(1)} = {det.toFixed(2)}
            </p>
          </div>

          {/* Inverse Matrix Display */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Inverse Matrix A⁻¹</span>
              <span className="text-slate-500 font-mono text-[11px]">AA⁻¹ = I</span>
            </div>

            {inv ? (
              <div className="p-3 bg-[#E5F3E9]/50 rounded-lg border border-[#B8DCC3] font-mono text-xs flex justify-center items-center gap-2 text-[#3F7951] font-bold">
                <span>[</span>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-4">
                    <span className="w-12 text-center">{inv[0][0].toFixed(2)}</span>
                    <span className="w-12 text-center">{inv[0][1].toFixed(2)}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-12 text-center">{inv[1][0].toFixed(2)}</span>
                    <span className="w-12 text-center">{inv[1][1].toFixed(2)}</span>
                  </div>
                </div>
                <span>]</span>
              </div>
            ) : (
              <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                ⚠️ Determinant is 0. Inverse does not exist (division by zero in 1/det(A)).
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
