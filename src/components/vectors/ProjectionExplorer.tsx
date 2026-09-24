"use client";

import React, { useState } from "react";
import { vectorProjection, dotProduct, vectorNormL2, vectorSubtract } from "@/lib/vectorMath";

interface ProjectionExplorerProps {
  initialU?: [number, number];
  initialV?: [number, number];
}

export function ProjectionExplorer({
  initialU = [4, 3],
  initialV = [5, 1],
}: ProjectionExplorerProps) {
  const [u, setU] = useState<[number, number]>(initialU);
  const [v, setV] = useState<[number, number]>(initialV);

  const proj = vectorProjection(u, v);
  const residual = vectorSubtract(u, proj);

  const dotUV = dotProduct(u, v);
  const dotVV = dotProduct(v, v);
  const scalarProj = dotVV !== 0 ? dotUV / Math.sqrt(dotVV) : 0;
  const normV = vectorNormL2(v);
  const normProj = vectorNormL2(proj);
  const normResidual = vectorNormL2(residual);

  // SVG parameters
  const size = 320;
  const center = size / 2;
  const scale = 24; // 24px per unit => -6 to 6 range

  const toSvgCoord = (x: number, y: number) => ({
    x: center + x * scale,
    y: center - y * scale,
  });

  const origin = toSvgCoord(0, 0);
  const ptU = toSvgCoord(u[0], u[1]);
  const ptV = toSvgCoord(v[0], v[1]);
  const ptProj = toSvgCoord(proj[0], proj[1]);

  // Extended line of v for visual reference
  const vNorm = normV > 0 ? [v[0] / normV, v[1] / normV] : [1, 0];
  const lineStart = toSvgCoord(vNorm[0] * -7, vNorm[1] * -7);
  const lineEnd = toSvgCoord(vNorm[0] * 7, vNorm[1] * 7);

  return (
    <div className="bg-white border border-[#B9D1EE] rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5EFFB] pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-800">Vector Projection Explorer</h4>
          <p className="text-xs text-slate-500">
            Decompose vector <span className="font-semibold text-[#416B9E]">u</span> into a component along <span className="font-semibold text-emerald-600">v</span> and an orthogonal residual.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setU([4, 3]);
              setV([5, 1]);
            }}
            className="px-2.5 py-1 text-xs rounded bg-[#E5EFFB] text-[#416B9E] hover:bg-[#91B9E8]/30 transition-colors font-medium"
          >
            Default
          </button>
          <button
            onClick={() => {
              setU([3, 4]);
              setV([0, 5]);
            }}
            className="px-2.5 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium"
          >
            Y-Axis
          </button>
          <button
            onClick={() => {
              setU([-2, 4]);
              setV([4, 2]);
            }}
            className="px-2.5 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium"
          >
            Obtuse
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* SVG Graphic */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative border border-slate-200 rounded-lg bg-slate-50/50 p-2 overflow-hidden shadow-inner">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible select-none">
              <defs>
                <marker id="proj-arrow-u" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#416B9E" />
                </marker>
                <marker id="proj-arrow-v" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#059669" />
                </marker>
                <marker id="proj-arrow-p" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#7C3AED" />
                </marker>
              </defs>

              {/* Grid lines */}
              {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((tick) => {
                const p1 = toSvgCoord(tick, -6);
                const p2 = toSvgCoord(tick, 6);
                const p3 = toSvgCoord(-6, tick);
                const p4 = toSvgCoord(6, tick);
                return (
                  <g key={tick} opacity={0.35}>
                    <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                  </g>
                );
              })}

              {/* Coordinate Axes */}
              <line x1={0} y1={center} x2={size} y2={center} stroke="#94a3b8" strokeWidth="1.5" />
              <line x1={center} y1={0} x2={center} y2={size} stroke="#94a3b8" strokeWidth="1.5" />

              {/* Line of action for V */}
              <line
                x1={lineStart.x}
                y1={lineStart.y}
                x2={lineEnd.x}
                y2={lineEnd.y}
                stroke="#10b981"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity={0.5}
              />

              {/* Orthogonal projection drop line (from U to Proj) */}
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
              <line
                x1={origin.x}
                y1={origin.y}
                x2={ptV.x}
                y2={ptV.y}
                stroke="#059669"
                strokeWidth="2.5"
                markerEnd="url(#proj-arrow-v)"
              />

              {/* Projected Vector proj_v(u) */}
              <line
                x1={origin.x}
                y1={origin.y}
                x2={ptProj.x}
                y2={ptProj.y}
                stroke="#7C3AED"
                strokeWidth="3.5"
                markerEnd="url(#proj-arrow-p)"
              />

              {/* Vector U */}
              <line
                x1={origin.x}
                y1={origin.y}
                x2={ptU.x}
                y2={ptU.y}
                stroke="#416B9E"
                strokeWidth="2.75"
                markerEnd="url(#proj-arrow-u)"
              />

              {/* Labels */}
              <text x={ptU.x + 8} y={ptU.y - 6} fill="#416B9E" fontSize="12" fontWeight="bold">
                u ({u[0]}, {u[1]})
              </text>
              <text x={ptV.x + 8} y={ptV.y + 14} fill="#059669" fontSize="12" fontWeight="bold">
                v ({v[0]}, {v[1]})
              </text>
              <text x={ptProj.x - 10} y={ptProj.y + 18} fill="#7C3AED" fontSize="12" fontWeight="bold">
                proj_v(u) ({proj[0]}, {proj[1]})
              </text>
              <text x={(ptU.x + ptProj.x) / 2 + 8} y={(ptU.y + ptProj.y) / 2} fill="#d97706" fontSize="11" fontWeight="600">
                residual e
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#416B9E]">
              <span className="w-3 h-1 bg-[#416B9E] rounded-full" /> Target Vector u
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
              <span className="w-3 h-1 bg-emerald-600 rounded-full" /> Base Vector v
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-purple-700">
              <span className="w-3 h-1 bg-purple-600 rounded-full" /> projᵥ(u)
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-700">
              <span className="w-3 h-1 border-b-2 border-dashed border-amber-600" /> Residual e
            </span>
          </div>
        </div>

        {/* Interactive Controls & Formula Calculations */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Vector U Controls */}
            <div className="bg-[#E5EFFB]/40 border border-[#B9D1EE] rounded-lg p-3 space-y-2">
              <span className="text-xs font-bold text-[#416B9E] uppercase tracking-wider">Vector u</span>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-0.5">
                  <span>u₁ (x):</span>
                  <span className="font-mono font-semibold">{u[0]}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={u[0]}
                  onChange={(e) => setU([parseFloat(e.target.value), u[1]])}
                  className="w-full accent-[#416B9E] cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-0.5">
                  <span>u₂ (y):</span>
                  <span className="font-mono font-semibold">{u[1]}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={u[1]}
                  onChange={(e) => setU([u[0], parseFloat(e.target.value)])}
                  className="w-full accent-[#416B9E] cursor-pointer"
                />
              </div>
            </div>

            {/* Vector V Controls */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-3 space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Vector v (Base)</span>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-0.5">
                  <span>v₁ (x):</span>
                  <span className="font-mono font-semibold">{v[0]}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={v[0]}
                  onChange={(e) => setV([parseFloat(e.target.value), v[1]])}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-0.5">
                  <span>v₂ (y):</span>
                  <span className="font-mono font-semibold">{v[1]}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={v[1]}
                  onChange={(e) => setV([v[0], parseFloat(e.target.value)])}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Mathematical Step-by-Step Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2.5 font-mono text-xs">
            <div className="text-slate-800 font-semibold font-sans border-b border-slate-200 pb-1">
              Projection Breakdown Formula:
            </div>
            <div className="text-slate-700 space-y-1">
              <p>1. Dot Product: <span className="text-slate-900 font-semibold">u · v = {u[0]}×{v[0]} + {u[1]}×{v[1]} = {dotUV.toFixed(2)}</span></p>
              <p>2. Base Norm Squared: <span className="text-slate-900 font-semibold">||v||² = {v[0]}² + {v[1]}² = {dotVV.toFixed(2)}</span></p>
              <p>
                3. Scaling Factor α: <span className="text-purple-700 font-semibold">α = (u · v) / ||v||² = {dotVV !== 0 ? (dotUV / dotVV).toFixed(3) : 0}</span>
              </p>
              <p className="pt-1 border-t border-slate-200 text-purple-900 font-bold font-sans">
                Vector proj_v(u) = α × v = [{proj[0]}, {proj[1]}]
              </p>
            </div>
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-purple-50 border border-purple-200 rounded p-2">
              <span className="text-slate-500 block text-[11px]">||proj_v(u)||</span>
              <span className="font-mono font-bold text-purple-800">{normProj.toFixed(2)}</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded p-2">
              <span className="text-slate-500 block text-[11px]">Residual ||e||</span>
              <span className="font-mono font-bold text-amber-800">{normResidual.toFixed(2)}</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2">
              <span className="text-slate-500 block text-[11px]">Scalar Proj</span>
              <span className="font-mono font-bold text-blue-800">{scalarProj.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
