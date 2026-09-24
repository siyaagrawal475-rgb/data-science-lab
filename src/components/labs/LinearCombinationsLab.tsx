'use client';

import React, { useState } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { linearCombination, vectorNormL2 } from '@/lib/vectorMath';

export const LinearCombinationsLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-2');
  const isDone = isLabCompleted('linear-combinations');

  const [v1, setV1] = useState<[number, number]>([2, 1]);
  const [v2, setV2] = useState<[number, number]>([-1, 2]);
  const [c1, setC1] = useState<number>(1.5);
  const [c2, setC2] = useState<number>(1);

  const term1: [number, number] = [v1[0] * c1, v1[1] * c1];
  const term2: [number, number] = [v2[0] * c2, v2[1] * c2];
  const result = linearCombination([v1, v2], [c1, c2]);

  const det = v1[0] * v2[1] - v1[1] * v2[0];
  const isCollinear = Math.abs(det) < 0.001;

  // SVG parameters
  const size = 360;
  const center = size / 2;
  const scale = 22;

  const toSvg = (x: number, y: number) => ({
    x: center + x * scale,
    y: center - y * scale,
  });

  const origin = toSvg(0, 0);
  const ptTerm1 = toSvg(term1[0], term1[1]);
  const ptTerm2 = toSvg(term2[0], term2[1]);
  const ptResult = toSvg(result[0], result[1]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E5EFFB] text-[#416B9E]">
              Unit 2 • Lab 4
            </span>
            <span className="text-sm text-slate-500 font-medium">Linear Combinations, Span & Basis Lab</span>
          </div>
          <p className="text-xs text-slate-600">
            Synthesize arbitrary vectors in ℝ² through weighted linear combinations of basis directions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setV1([2, 1]);
              setV2([-1, 2]);
              setC1(1.5);
              setC2(1);
            }}
            className="text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>

          <Button
            onClick={() => completeLab('linear-combinations')}
            variant={isDone ? 'outline' : 'primary'}
            size="sm"
            className={isDone ? 'border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100' : 'bg-[#416B9E] hover:bg-[#32537B] text-white'}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            {isDone ? 'Completed' : 'Mark Lab Complete'}
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Vector Graphic */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
          <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">Linear Span & Synthesis Plane</h3>
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${isCollinear ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>
              {isCollinear ? 'Dimension 1 (Line)' : 'Dimension 2 (Full ℝ² Span)'}
            </span>
          </div>

          <div className="relative border border-slate-200 rounded-lg bg-slate-50/50 p-2 overflow-hidden shadow-inner">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible select-none">
              <defs>
                <marker id="lc-arrow-1" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                </marker>
                <marker id="lc-arrow-2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#059669" />
                </marker>
                <marker id="lc-arrow-res" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#7C3AED" />
                </marker>
              </defs>

              {/* Grid */}
              {[-6, -4, -2, 2, 4, 6].map((tick) => {
                const p1 = toSvg(tick, -7);
                const p2 = toSvg(tick, 7);
                const p3 = toSvg(-7, tick);
                const p4 = toSvg(7, tick);
                return (
                  <g key={tick} opacity={0.3}>
                    <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                  </g>
                );
              })}

              {/* Axes */}
              <line x1={0} y1={center} x2={size} y2={center} stroke="#94a3b8" strokeWidth="1.5" />
              <line x1={center} y1={0} x2={center} y2={size} stroke="#94a3b8" strokeWidth="1.5" />

              {/* Parallelogram addition lines */}
              <line x1={ptTerm1.x} y1={ptTerm1.y} x2={ptResult.x} y2={ptResult.y} stroke="#059669" strokeWidth="1.5" strokeDasharray="3,3" opacity={0.5} />
              <line x1={ptTerm2.x} y1={ptTerm2.y} x2={ptResult.x} y2={ptResult.y} stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3,3" opacity={0.5} />

              {/* Vector c1*v1 */}
              <line x1={origin.x} y1={origin.y} x2={ptTerm1.x} y2={ptTerm1.y} stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#lc-arrow-1)" />

              {/* Vector c2*v2 */}
              <line x1={origin.x} y1={origin.y} x2={ptTerm2.x} y2={ptTerm2.y} stroke="#059669" strokeWidth="2.5" markerEnd="url(#lc-arrow-2)" />

              {/* Result Vector w */}
              <line x1={origin.x} y1={origin.y} x2={ptResult.x} y2={ptResult.y} stroke="#7C3AED" strokeWidth="3.5" markerEnd="url(#lc-arrow-res)" />

              {/* Labels */}
              <text x={ptTerm1.x + 6} y={ptTerm1.y - 6} fill="#0284C7" fontSize="11" fontWeight="bold">
                c₁v₁ ({term1[0].toFixed(1)}, {term1[1].toFixed(1)})
              </text>
              <text x={ptTerm2.x + 6} y={ptTerm2.y + 12} fill="#059669" fontSize="11" fontWeight="bold">
                c₂v₂ ({term2[0].toFixed(1)}, {term2[1].toFixed(1)})
              </text>
              <text x={ptResult.x + 6} y={ptResult.y} fill="#7C3AED" fontSize="12" fontWeight="bold">
                w ({result[0].toFixed(1)}, {result[1].toFixed(1)})
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-sky-700">
              <span className="w-3 h-1 bg-sky-600 rounded-full" /> Scaled c₁v₁
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
              <span className="w-3 h-1 bg-emerald-600 rounded-full" /> Scaled c₂v₂
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-purple-700">
              <span className="w-3 h-1 bg-purple-600 rounded-full" /> Result w
            </span>
          </div>
        </div>

        {/* Right: Controls & Computations */}
        <div className="lg:col-span-5 space-y-4">
          {/* Scalar Controls */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Linear Weights (Coefficients)</span>
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span>Scalar c₁:</span>
                <span className="font-mono font-bold text-sky-700">{c1}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.25"
                value={c1}
                onChange={(e) => setC1(parseFloat(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span>Scalar c₂:</span>
                <span className="font-mono font-bold text-emerald-700">{c2}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.25"
                value={c2}
                onChange={(e) => setC2(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Basis Vector Definitions */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 space-y-1.5">
              <span className="font-bold text-sky-900 block">Basis Vector v₁</span>
              <div className="flex items-center gap-1">
                <span>x:</span>
                <input
                  type="number"
                  value={v1[0]}
                  onChange={(e) => setV1([parseFloat(e.target.value) || 0, v1[1]])}
                  className="w-12 border border-sky-300 rounded px-1.5 py-0.5 bg-white text-center text-xs"
                />
                <span>y:</span>
                <input
                  type="number"
                  value={v1[1]}
                  onChange={(e) => setV1([v1[0], parseFloat(e.target.value) || 0])}
                  className="w-12 border border-sky-300 rounded px-1.5 py-0.5 bg-white text-center text-xs"
                />
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 space-y-1.5">
              <span className="font-bold text-emerald-900 block">Basis Vector v₂</span>
              <div className="flex items-center gap-1">
                <span>x:</span>
                <input
                  type="number"
                  value={v2[0]}
                  onChange={(e) => setV2([parseFloat(e.target.value) || 0, v2[1]])}
                  className="w-12 border border-emerald-300 rounded px-1.5 py-0.5 bg-white text-center text-xs"
                />
                <span>y:</span>
                <input
                  type="number"
                  value={v2[1]}
                  onChange={(e) => setV2([v2[0], parseFloat(e.target.value) || 0])}
                  className="w-12 border border-emerald-300 rounded px-1.5 py-0.5 bg-white text-center text-xs"
                />
              </div>
            </div>
          </div>

          {/* Equation & Span summary */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
            <h4 className="text-xs font-bold text-slate-700 font-sans uppercase tracking-wider">Combination Algebraic State</h4>
            <div className="p-2.5 bg-white border border-slate-200 rounded text-slate-900">
              w = {c1}·[{v1[0]}, {v1[1]}] + {c2}·[{v2[0]}, {v2[1]}] = [{result[0].toFixed(2)}, {result[1].toFixed(2)}]
            </div>
            <p className="text-slate-600 font-sans text-xs">
              Resultant Magnitude: <span className="font-mono font-bold text-purple-800">{vectorNormL2(result).toFixed(3)}</span>
            </p>
            <p className="text-slate-500 font-sans text-[11px] pt-1">
              Span Concept: Any point (x, y) in ℝ² can be uniquely expressed as a linear combination of these basis vectors when det ≠ 0.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
