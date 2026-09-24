'use client';

import React, { useState } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { dotProduct, vectorNormL2, cosineSimilarity, angleBetweenDegrees } from '@/lib/vectorMath';

export const DotProductLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-2');
  const isDone = isLabCompleted('dot-product');

  const [u, setU] = useState<[number, number]>([4, 1]);
  const [v, setV] = useState<[number, number]>([2, 4]);

  const dot = dotProduct(u, v);
  const normU = vectorNormL2(u);
  const normV = vectorNormL2(v);
  const cosSim = cosineSimilarity(u, v);
  const angleDeg = angleBetweenDegrees(u, v);

  // Determine geometric relationship
  let relation = 'Acute Angle (Positive Alignment)';
  let relationColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (Math.abs(dot) < 0.001) {
    relation = 'Orthogonal (Perpendicular, 90°)';
    relationColor = 'text-indigo-700 bg-indigo-50 border-indigo-200';
  } else if (cosSim > 0.999) {
    relation = 'Collinear / Co-directional (0°)';
    relationColor = 'text-blue-700 bg-blue-50 border-blue-200';
  } else if (cosSim < -0.999) {
    relation = 'Opposite Direction (180°)';
    relationColor = 'text-red-700 bg-red-50 border-red-200';
  } else if (dot < 0) {
    relation = 'Obtuse Angle (Opposing Directions)';
    relationColor = 'text-amber-700 bg-amber-50 border-amber-200';
  }

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

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E5EFFB] text-[#416B9E]">
              Unit 2 • Lab 2
            </span>
            <span className="text-sm text-slate-500 font-medium">Dot Product & Cosine Similarity Lab</span>
          </div>
          <p className="text-xs text-slate-600">
            Investigate how algebraic multiplication relates to geometric projections, enclosed angles, and directional alignment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setU([4, 1]);
              setV([2, 4]);
            }}
            className="text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>

          <Button
            onClick={() => completeLab('dot-product')}
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
        {/* Left: Vector Plane Visualization */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
          <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">Interactive Angle & Projection Canvas</h3>
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${relationColor}`}>
              {relation}
            </span>
          </div>

          <div className="relative border border-slate-200 rounded-lg bg-slate-50/50 p-2 overflow-hidden shadow-inner">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible select-none">
              <defs>
                <marker id="dp-lab-u" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                </marker>
                <marker id="dp-lab-v" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#059669" />
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

              {/* Vector U */}
              <line x1={origin.x} y1={origin.y} x2={ptU.x} y2={ptU.y} stroke="#0284C7" strokeWidth="3" markerEnd="url(#dp-lab-u)" />

              {/* Vector V */}
              <line x1={origin.x} y1={origin.y} x2={ptV.x} y2={ptV.y} stroke="#059669" strokeWidth="3" markerEnd="url(#dp-lab-v)" />

              {/* Labels */}
              <text x={ptU.x + 8} y={ptU.y - 6} fill="#0284C7" fontSize="12" fontWeight="bold">
                u [{u[0]}, {u[1]}]
              </text>
              <text x={ptV.x + 8} y={ptV.y + 12} fill="#059669" fontSize="12" fontWeight="bold">
                v [{v[0]}, {v[1]}]
              </text>
            </svg>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => {
                setU([3, 0]);
                setV([0, 3]);
              }}
              className="px-2.5 py-1 text-xs rounded border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium"
            >
              Set Orthogonal (90°)
            </button>
            <button
              onClick={() => {
                setU([3, 2]);
                setV([6, 4]);
              }}
              className="px-2.5 py-1 text-xs rounded border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
            >
              Set Collinear (0°)
            </button>
            <button
              onClick={() => {
                setU([3, 3]);
                setV([-3, -3]);
              }}
              className="px-2.5 py-1 text-xs rounded border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 font-medium"
            >
              Set Opposite (180°)
            </button>
          </div>
        </div>

        {/* Right: Numerical & Semantic Analysis */}
        <div className="lg:col-span-5 space-y-4">
          {/* Sliders */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            {/* Vector U */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">Vector u Coordinates</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block mb-1">u₁: {u[0]}</span>
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
                  <span className="text-slate-500 block mb-1">u₂: {u[1]}</span>
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
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Vector v Coordinates</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block mb-1">v₁: {v[0]}</span>
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
                  <span className="text-slate-500 block mb-1">v₂: {v[1]}</span>
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

          {/* Metric Comparison Cards: Dot Product vs Cosine Similarity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 block font-medium">Dot Product (u · v)</span>
              <span className="text-2xl font-bold font-mono text-slate-900">{dot.toFixed(2)}</span>
              <p className="text-[11px] text-slate-500 leading-tight">Scale-dependent sum of coordinate products.</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 block font-medium">Cosine Similarity</span>
              <span className="text-2xl font-bold font-mono text-[#416B9E]">{cosSim.toFixed(3)}</span>
              <p className="text-[11px] text-slate-500 leading-tight">Scale-invariant directional alignment [-1, 1].</p>
            </div>
          </div>

          {/* Formula Breakdown Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
            <h4 className="text-xs font-bold text-slate-700 font-sans uppercase tracking-wider">Formula Breakdown</h4>
            <div className="space-y-1 text-slate-700">
              <p>• ||u|| = √({u[0]}² + {u[1]}²) = {normU.toFixed(3)}</p>
              <p>• ||v|| = √({v[0]}² + {v[1]}²) = {normV.toFixed(3)}</p>
              <p>• Enclosed Angle θ = {angleDeg.toFixed(1)}°</p>
              <p className="pt-1 border-t border-slate-200 font-bold text-slate-900">
                cos(θ) = (u · v) / (||u|| ||v||) = {dot.toFixed(2)} / ({(normU * normV).toFixed(2)}) = {cosSim.toFixed(3)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
