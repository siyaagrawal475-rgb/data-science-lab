'use client';

import React, { useState } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { vectorProjection, vectorSubtract, dotProduct, vectorNormL2 } from '@/lib/vectorMath';

export const VectorProjectionLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-2');
  const isDone = isLabCompleted('projection');

  const [u, setU] = useState<[number, number]>([4, 3]);
  const [v, setV] = useState<[number, number]>([5, 1]);

  const proj = vectorProjection(u, v);
  const residual = vectorSubtract(u, proj);

  const dotUV = dotProduct(u, v);
  const dotVV = dotProduct(v, v);
  const scalarProj = dotVV !== 0 ? dotUV / Math.sqrt(dotVV) : 0;
  const alpha = dotVV !== 0 ? dotUV / dotVV : 0;
  const normV = vectorNormL2(v);
  const normProj = vectorNormL2(proj);
  const normResidual = vectorNormL2(residual);

  // SVG parameters
  const size = 360;
  const center = size / 2;
  const scale = 24;

  const toSvg = (x: number, y: number) => ({
    x: center + x * scale,
    y: center - y * scale,
  });

  const origin = toSvg(0, 0);
  const ptU = toSvg(u[0], u[1]);
  const ptV = toSvg(v[0], v[1]);
  const ptProj = toSvg(proj[0], proj[1]);

  const vNorm = normV > 0 ? [v[0] / normV, v[1] / normV] : [1, 0];
  const lineStart = toSvg(vNorm[0] * -8, vNorm[1] * -8);
  const lineEnd = toSvg(vNorm[0] * 8, vNorm[1] * 8);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E5EFFB] text-[#416B9E]">
              Unit 2 • Lab 3
            </span>
            <span className="text-sm text-slate-500 font-medium">Vector Projection & Orthogonal Decomposition</span>
          </div>
          <p className="text-xs text-slate-600">
            Decompose vectors into parallel shadows and orthogonal residuals — the foundation of Linear Regression and PCA.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setU([4, 3]);
              setV([5, 1]);
            }}
            className="text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>

          <Button
            onClick={() => completeLab('projection')}
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
        {/* Left: Graphic */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
          <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">Orthogonal Projection Geometry</h3>
            <span className="text-xs text-slate-500 font-mono">u = proj_v(u) + residual e</span>
          </div>

          <div className="relative border border-slate-200 rounded-lg bg-slate-50/50 p-2 overflow-hidden shadow-inner">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible select-none">
              <defs>
                <marker id="vp-arrow-u" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                </marker>
                <marker id="vp-arrow-v" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#059669" />
                </marker>
                <marker id="vp-arrow-p" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
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

              {/* Line of action of V */}
              <line
                x1={lineStart.x}
                y1={lineStart.y}
                x2={lineEnd.x}
                y2={lineEnd.y}
                stroke="#10b981"
                strokeWidth="1.2"
                strokeDasharray="4,4"
                opacity={0.4}
              />

              {/* Orthogonal drop line */}
              <line
                x1={ptU.x}
                y1={ptU.y}
                x2={ptProj.x}
                y2={ptProj.y}
                stroke="#d97706"
                strokeWidth="1.75"
                strokeDasharray="3,3"
              />

              {/* Vector V */}
              <line x1={origin.x} y1={origin.y} x2={ptV.x} y2={ptV.y} stroke="#059669" strokeWidth="2.5" markerEnd="url(#vp-arrow-v)" />

              {/* Projected Vector proj_v(u) */}
              <line x1={origin.x} y1={origin.y} x2={ptProj.x} y2={ptProj.y} stroke="#7C3AED" strokeWidth="3.5" markerEnd="url(#vp-arrow-p)" />

              {/* Vector U */}
              <line x1={origin.x} y1={origin.y} x2={ptU.x} y2={ptU.y} stroke="#0284C7" strokeWidth="2.75" markerEnd="url(#vp-arrow-u)" />

              {/* Labels */}
              <text x={ptU.x + 8} y={ptU.y - 6} fill="#0284C7" fontSize="12" fontWeight="bold">
                u ({u[0]}, {u[1]})
              </text>
              <text x={ptV.x + 8} y={ptV.y + 14} fill="#059669" fontSize="12" fontWeight="bold">
                v ({v[0]}, {v[1]})
              </text>
              <text x={ptProj.x - 10} y={ptProj.y + 18} fill="#7C3AED" fontSize="12" fontWeight="bold">
                proj ({proj[0]}, {proj[1]})
              </text>
              <text x={(ptU.x + ptProj.x) / 2 + 8} y={(ptU.y + ptProj.y) / 2} fill="#d97706" fontSize="11" fontWeight="600">
                residual e
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-sky-700">
              <span className="w-3 h-1 bg-sky-600 rounded-full" /> Target Vector u
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
              <span className="w-3 h-1 bg-emerald-600 rounded-full" /> Basis Vector v
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-purple-700">
              <span className="w-3 h-1 bg-purple-600 rounded-full" /> projᵥ(u)
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-700">
              <span className="w-3 h-1 border-b-2 border-dashed border-amber-600" /> Error e
            </span>
          </div>
        </div>

        {/* Right: Controls & Formulas */}
        <div className="lg:col-span-5 space-y-4">
          {/* Sliders */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            {/* Vector U */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">Target Vector u</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block mb-1">u₁ (x): {u[0]}</span>
                  <input
                    type="range"
                    min="-5"
                    max="5"
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
                    min="-5"
                    max="5"
                    step="0.5"
                    value={u[1]}
                    onChange={(e) => setU([u[0], parseFloat(e.target.value)])}
                    className="w-full accent-sky-600"
                  />
                </div>
              </div>
            </div>

            {/* Vector V */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Base Direction v</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block mb-1">v₁ (x): {v[0]}</span>
                  <input
                    type="range"
                    min="-5"
                    max="5"
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
                    min="-5"
                    max="5"
                    step="0.5"
                    value={v[1]}
                    onChange={(e) => setV([v[0], parseFloat(e.target.value)])}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-2.5">
              <span className="text-slate-500 block text-[11px]">||proj_v(u)||</span>
              <span className="font-mono font-bold text-purple-900 text-sm">{normProj.toFixed(2)}</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5">
              <span className="text-slate-500 block text-[11px]">Residual ||e||</span>
              <span className="font-mono font-bold text-amber-900 text-sm">{normResidual.toFixed(2)}</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
              <span className="text-slate-500 block text-[11px]">Scalar Proj</span>
              <span className="font-mono font-bold text-blue-900 text-sm">{scalarProj.toFixed(2)}</span>
            </div>
          </div>

          {/* Calculation Steps */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
            <h4 className="text-xs font-bold text-slate-700 font-sans uppercase tracking-wider">Orthogonal Breakdown</h4>
            <div className="space-y-1 text-slate-700">
              <p>• Dot Product: u · v = {dotUV.toFixed(2)}</p>
              <p>• Base Squared Norm: ||v||² = {dotVV.toFixed(2)}</p>
              <p>• Multiplier α = (u · v) / ||v||² = {alpha.toFixed(3)}</p>
              <p className="pt-1.5 border-t border-slate-200 text-purple-900 font-bold">
                proj_v(u) = [{proj[0]}, {proj[1]}]
              </p>
              <p className="text-amber-900 font-bold">
                residual e = u - proj_v(u) = [{residual[0].toFixed(2)}, {residual[1].toFixed(2)}]
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
