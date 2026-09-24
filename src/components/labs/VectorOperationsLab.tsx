'use client';

import React, { useState } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { vectorAdd, vectorSubtract, scalarMultiply, vectorNormL2, dotProduct } from '@/lib/vectorMath';

export const VectorOperationsLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-2');
  const isDone = isLabCompleted('vectors');

  const [u, setU] = useState<[number, number]>([3, 2]);
  const [v, setV] = useState<[number, number]>([1, 4]);
  const [scalar, setScalar] = useState<number>(1.5);
  const [operation, setOperation] = useState<'add' | 'subtract' | 'scalar'>('add');

  let result: [number, number];
  if (operation === 'add') {
    result = vectorAdd(u, v);
  } else if (operation === 'subtract') {
    result = vectorSubtract(u, v);
  } else {
    result = scalarMultiply(u, scalar);
  }

  const normU = vectorNormL2(u);
  const normV = vectorNormL2(v);
  const normResult = vectorNormL2(result);
  const dotUV = dotProduct(u, v);

  // SVG grid settings
  const size = 360;
  const center = size / 2;
  const scale = 22;

  const toSvg = (x: number, y: number) => ({
    x: center + x * scale,
    y: center - y * scale,
  });

  const origin = toSvg(0, 0);
  const ptU = toSvg(u[0], u[1]);
  const ptV = toSvg(v[0], v[1]);
  const ptRes = toSvg(result[0], result[1]);

  return (
    <div className="space-y-6">
      {/* Top action controls & completion banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E5EFFB] text-[#416B9E]">
              Unit 2 • Lab 1
            </span>
            <span className="text-sm text-slate-500 font-medium">Vector Arithmetic Engine</span>
          </div>
          <p className="text-xs text-slate-600">
            Manipulate coordinate vectors, evaluate linear operations, and observe geometric translations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setU([3, 2]);
              setV([1, 4]);
              setScalar(1.5);
              setOperation('add');
            }}
            className="text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>

          <Button
            onClick={() => completeLab('vectors')}
            variant={isDone ? 'outline' : 'primary'}
            size="sm"
            className={isDone ? 'border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100' : 'bg-[#416B9E] hover:bg-[#32537B] text-white'}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            {isDone ? 'Completed' : 'Mark Lab Complete'}
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Vector Plotter */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
          <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">2D Cartesian Coordinate Plane</h3>
            <span className="text-xs text-slate-500 font-mono">Origin: (0, 0) | Range: [-8, 8]</span>
          </div>

          <div className="relative border border-slate-200 rounded-lg bg-slate-50/50 p-2 overflow-hidden shadow-inner">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible select-none">
              <defs>
                <marker id="lab-arrow-u" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                </marker>
                <marker id="lab-arrow-v" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#059669" />
                </marker>
                <marker id="lab-arrow-res" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#7C3AED" />
                </marker>
              </defs>

              {/* Grid lines */}
              {[-6, -4, -2, 2, 4, 6].map((tick) => {
                const p1 = toSvg(tick, -8);
                const p2 = toSvg(tick, 8);
                const p3 = toSvg(-8, tick);
                const p4 = toSvg(8, tick);
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

              {/* Parallelogram helper dashed line for addition */}
              {operation === 'add' && (
                <>
                  <line x1={ptU.x} y1={ptU.y} x2={ptRes.x} y2={ptRes.y} stroke="#059669" strokeWidth="1.5" strokeDasharray="3,3" opacity={0.5} />
                  <line x1={ptV.x} y1={ptV.y} x2={ptRes.x} y2={ptRes.y} stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3,3" opacity={0.5} />
                </>
              )}

              {/* Subtraction helper dashed line */}
              {operation === 'subtract' && (
                <line x1={ptV.x} y1={ptV.y} x2={ptU.x} y2={ptU.y} stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="3,3" opacity={0.6} />
              )}

              {/* Vector U */}
              <line x1={origin.x} y1={origin.y} x2={ptU.x} y2={ptU.y} stroke="#0284C7" strokeWidth="2.75" markerEnd="url(#lab-arrow-u)" />

              {/* Vector V (only if add or subtract) */}
              {operation !== 'scalar' && (
                <line x1={origin.x} y1={origin.y} x2={ptV.x} y2={ptV.y} stroke="#059669" strokeWidth="2.75" markerEnd="url(#lab-arrow-v)" />
              )}

              {/* Result Vector */}
              <line x1={origin.x} y1={origin.y} x2={ptRes.x} y2={ptRes.y} stroke="#7C3AED" strokeWidth="3.5" markerEnd="url(#lab-arrow-res)" />

              {/* Labels */}
              <text x={ptU.x + 6} y={ptU.y - 6} fill="#0284C7" fontSize="12" fontWeight="bold">
                u ({u[0]}, {u[1]})
              </text>
              {operation !== 'scalar' && (
                <text x={ptV.x + 6} y={ptV.y + 12} fill="#059669" fontSize="12" fontWeight="bold">
                  v ({v[0]}, {v[1]})
                </text>
              )}
              <text x={ptRes.x + 8} y={ptRes.y} fill="#7C3AED" fontSize="13" fontWeight="bold">
                {operation === 'add' ? 'u + v' : operation === 'subtract' ? 'u - v' : `${scalar}u`} ({result[0].toFixed(1)}, {result[1].toFixed(1)})
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-sky-700">
              <span className="w-3 h-1 bg-sky-600 rounded-full" /> Vector u
            </span>
            {operation !== 'scalar' && (
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
                <span className="w-3 h-1 bg-emerald-600 rounded-full" /> Vector v
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 font-medium text-purple-700">
              <span className="w-3 h-1 bg-purple-600 rounded-full" /> Result Vector
            </span>
          </div>
        </div>

        {/* Right: Controls & Computations */}
        <div className="lg:col-span-5 space-y-4">
          {/* Operation selector */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Select Operation</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setOperation('add')}
                className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                  operation === 'add'
                    ? 'bg-[#E5EFFB] border-[#91B9E8] text-[#416B9E] shadow-sm font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Addition (u + v)
              </button>
              <button
                onClick={() => setOperation('subtract')}
                className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                  operation === 'subtract'
                    ? 'bg-[#E5EFFB] border-[#91B9E8] text-[#416B9E] shadow-sm font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Subtraction (u - v)
              </button>
              <button
                onClick={() => setOperation('scalar')}
                className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                  operation === 'scalar'
                    ? 'bg-[#E5EFFB] border-[#91B9E8] text-[#416B9E] shadow-sm font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Scaling (α · u)
              </button>
            </div>
          </div>

          {/* Coordinate Sliders */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            {/* Vector U */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-sky-800">
                <span>Vector u Components</span>
                <span className="font-mono bg-sky-50 px-2 py-0.5 rounded border border-sky-200">[{u[0]}, {u[1]}]</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block mb-1">u₁ (x): {u[0]}</span>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="0.5"
                    value={u[0]}
                    onChange={(e) => setU([parseFloat(e.target.value), u[1]])}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">u₂ (y): {u[1]}</span>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="0.5"
                    value={u[1]}
                    onChange={(e) => setU([u[0], parseFloat(e.target.value)])}
                    className="w-full accent-sky-600"
                  />
                </div>
              </div>
            </div>

            {/* Vector V or Scalar */}
            {operation !== 'scalar' ? (
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs font-bold text-emerald-800">
                  <span>Vector v Components</span>
                  <span className="font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">[{v[0]}, {v[1]}]</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block mb-1">v₁ (x): {v[0]}</span>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      step="0.5"
                      value={v[0]}
                      onChange={(e) => setV([parseFloat(e.target.value), v[1]])}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">v₂ (y): {v[1]}</span>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      step="0.5"
                      value={v[1]}
                      onChange={(e) => setV([v[0], parseFloat(e.target.value)])}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs font-bold text-[#416B9E]">
                  <span>Scalar Multiplier (α)</span>
                  <span className="font-mono bg-[#E5EFFB] px-2 py-0.5 rounded border border-[#B9D1EE]">{scalar}</span>
                </div>
                <div>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.25"
                    value={scalar}
                    onChange={(e) => setScalar(parseFloat(e.target.value))}
                    className="w-full accent-[#416B9E]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Numerical Analytics Result */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Numerical Metrics</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-500 text-[11px] block font-sans">Magnitude ||u||:</span>
                <span className="font-bold text-slate-800">{normU.toFixed(3)}</span>
              </div>
              {operation !== 'scalar' ? (
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-slate-500 text-[11px] block font-sans">Magnitude ||v||:</span>
                  <span className="font-bold text-slate-800">{normV.toFixed(3)}</span>
                </div>
              ) : (
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-slate-500 text-[11px] block font-sans">Scale Factor:</span>
                  <span className="font-bold text-slate-800">{scalar}</span>
                </div>
              )}
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-500 text-[11px] block font-sans">Result ||w||:</span>
                <span className="font-bold text-purple-700">{normResult.toFixed(3)}</span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-500 text-[11px] block font-sans">Dot Product u · v:</span>
                <span className="font-bold text-slate-800">{dotUV.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
