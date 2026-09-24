"use client";

import React, { useState } from "react";
import { linearCombination, vectorNormL2 } from "@/lib/vectorMath";

interface LinearCombinationPlaygroundProps {
  initialV1?: [number, number];
  initialV2?: [number, number];
}

export function LinearCombinationPlayground({
  initialV1 = [2, 1],
  initialV2 = [-1, 2],
}: LinearCombinationPlaygroundProps) {
  const [v1, setV1] = useState<[number, number]>(initialV1);
  const [v2, setV2] = useState<[number, number]>(initialV2);
  const [c1, setC1] = useState<number>(1.5);
  const [c2, setC2] = useState<number>(1);

  const term1: [number, number] = [v1[0] * c1, v1[1] * c1];
  const term2: [number, number] = [v2[0] * c2, v2[1] * c2];
  const result = linearCombination([v1, v2], [c1, c2]);

  // Check linear independence: det([v1 v2]) != 0
  const det = v1[0] * v2[1] - v1[1] * v2[0];
  const isCollinear = Math.abs(det) < 0.001;

  // SVG parameters
  const size = 320;
  const center = size / 2;
  const scale = 22;

  const toSvgCoord = (x: number, y: number) => ({
    x: center + x * scale,
    y: center - y * scale,
  });

  const origin = toSvgCoord(0, 0);
  const ptTerm1 = toSvgCoord(term1[0], term1[1]);
  const ptTerm2 = toSvgCoord(term2[0], term2[1]);
  const ptResult = toSvgCoord(result[0], result[1]);

  return (
    <div className="bg-white border border-[#B9D1EE] rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5EFFB] pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-800">Linear Combination Playground</h4>
          <p className="text-xs text-slate-500">
            Form <span className="font-mono font-semibold text-indigo-600">w = c₁v₁ + c₂v₂</span> by adjusting scalar weights and basis directions.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => {
              setV1([2, 0]);
              setV2([0, 2]);
              setC1(1.5);
              setC2(1.5);
            }}
            className="px-2 py-1 text-xs rounded bg-[#E5EFFB] text-[#416B9E] hover:bg-[#91B9E8]/30 transition-colors font-medium"
          >
            Standard Basis (i, j)
          </button>
          <button
            onClick={() => {
              setV1([2, 1]);
              setV2([-1, 2]);
              setC1(1.5);
              setC2(1);
            }}
            className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium"
          >
            Orthogonal Pair
          </button>
          <button
            onClick={() => {
              setV1([2, 1]);
              setV2([4, 2]);
              setC1(1);
              setC2(0.5);
            }}
            className="px-2 py-1 text-xs rounded bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors font-medium"
          >
            Linearly Dependent (1D Span)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* SVG Plane */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative border border-slate-200 rounded-lg bg-slate-50/50 p-2 overflow-hidden shadow-inner">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible select-none">
              <defs>
                <marker id="comb-arrow-1" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                </marker>
                <marker id="comb-arrow-2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#059669" />
                </marker>
                <marker id="comb-arrow-res" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#6366F1" />
                </marker>
              </defs>

              {/* Grid */}
              {[-6, -4, -2, 2, 4, 6].map((tick) => {
                const p1 = toSvgCoord(tick, -7);
                const p2 = toSvgCoord(tick, 7);
                const p3 = toSvgCoord(-7, tick);
                const p4 = toSvgCoord(7, tick);
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

              {/* Parallelogram dashed lines: from c1*v1 to Result and c2*v2 to Result */}
              <line
                x1={ptTerm1.x}
                y1={ptTerm1.y}
                x2={ptResult.x}
                y2={ptResult.y}
                stroke="#059669"
                strokeWidth="1.5"
                strokeDasharray="3,3"
                opacity={0.6}
              />
              <line
                x1={ptTerm2.x}
                y1={ptTerm2.y}
                x2={ptResult.x}
                y2={ptResult.y}
                stroke="#0284C7"
                strokeWidth="1.5"
                strokeDasharray="3,3"
                opacity={0.6}
              />

              {/* Vector c1*v1 */}
              <line
                x1={origin.x}
                y1={origin.y}
                x2={ptTerm1.x}
                y2={ptTerm1.y}
                stroke="#0284C7"
                strokeWidth="2.5"
                markerEnd="url(#comb-arrow-1)"
              />

              {/* Vector c2*v2 */}
              <line
                x1={origin.x}
                y1={origin.y}
                x2={ptTerm2.x}
                y2={ptTerm2.y}
                stroke="#059669"
                strokeWidth="2.5"
                markerEnd="url(#comb-arrow-2)"
              />

              {/* Result vector w */}
              <line
                x1={origin.x}
                y1={origin.y}
                x2={ptResult.x}
                y2={ptResult.y}
                stroke="#6366F1"
                strokeWidth="3.5"
                markerEnd="url(#comb-arrow-res)"
              />

              {/* Labels */}
              <text x={ptTerm1.x + 6} y={ptTerm1.y - 6} fill="#0284C7" fontSize="11" fontWeight="bold">
                c₁v₁ ({term1[0].toFixed(1)}, {term1[1].toFixed(1)})
              </text>
              <text x={ptTerm2.x + 6} y={ptTerm2.y + 12} fill="#059669" fontSize="11" fontWeight="bold">
                c₂v₂ ({term2[0].toFixed(1)}, {term2[1].toFixed(1)})
              </text>
              <text x={ptResult.x + 6} y={ptResult.y} fill="#6366F1" fontSize="12" fontWeight="bold">
                w ({result[0].toFixed(1)}, {result[1].toFixed(1)})
              </text>
            </svg>
          </div>

          {/* Span warning / info banner */}
          <div className="mt-2 w-full text-center">
            {isCollinear ? (
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-medium">
                ⚠️ Linearly Dependent: Span is constrained to a 1D line!
              </span>
            ) : (
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-medium">
                ✓ Linearly Independent: Spans the entire 2D plane (ℝ²)
              </span>
            )}
          </div>
        </div>

        {/* Sliders and Equation breakdown */}
        <div className="lg:col-span-6 space-y-4">
          {/* Scalar Sliders */}
          <div className="bg-[#E5EFFB]/40 border border-[#B9D1EE] rounded-lg p-3 space-y-3">
            <span className="text-xs font-bold text-[#416B9E] uppercase tracking-wider">Scalar Multipliers</span>
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span>Scalar c₁ (weights v₁):</span>
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
                <span>Scalar c₂ (weights v₂):</span>
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

          {/* Basis Vectors Coordinates */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-sky-50 border border-sky-200 rounded p-2.5 space-y-1.5">
              <span className="font-bold text-sky-900 block">Basis v₁: [{v1[0]}, {v1[1]}]</span>
              <div className="flex items-center gap-1 text-[11px]">
                <span>x:</span>
                <input
                  type="number"
                  value={v1[0]}
                  onChange={(e) => setV1([parseFloat(e.target.value) || 0, v1[1]])}
                  className="w-12 border border-sky-300 rounded px-1 py-0.5 bg-white text-center"
                />
                <span>y:</span>
                <input
                  type="number"
                  value={v1[1]}
                  onChange={(e) => setV1([v1[0], parseFloat(e.target.value) || 0])}
                  className="w-12 border border-sky-300 rounded px-1 py-0.5 bg-white text-center"
                />
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded p-2.5 space-y-1.5">
              <span className="font-bold text-emerald-900 block">Basis v₂: [{v2[0]}, {v2[1]}]</span>
              <div className="flex items-center gap-1 text-[11px]">
                <span>x:</span>
                <input
                  type="number"
                  value={v2[0]}
                  onChange={(e) => setV2([parseFloat(e.target.value) || 0, v2[1]])}
                  className="w-12 border border-emerald-300 rounded px-1 py-0.5 bg-white text-center"
                />
                <span>y:</span>
                <input
                  type="number"
                  value={v2[1]}
                  onChange={(e) => setV2([v2[0], parseFloat(e.target.value) || 0])}
                  className="w-12 border border-emerald-300 rounded px-1 py-0.5 bg-white text-center"
                />
              </div>
            </div>
          </div>

          {/* Equation result */}
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-lg p-3 text-xs space-y-1.5">
            <span className="text-[11px] uppercase font-bold text-indigo-800 tracking-wider">Combination Expression</span>
            <div className="font-mono text-slate-800 text-xs bg-white border border-indigo-100 rounded p-2">
              w = {c1}·[{v1[0]}, {v1[1]}] + {c2}·[{v2[0]}, {v2[1]}] = [{result[0].toFixed(2)}, {result[1].toFixed(2)}]
            </div>
            <p className="text-[11px] text-slate-600">
              Length of resultant vector ||w|| = <span className="font-mono font-semibold">{vectorNormL2(result).toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
