'use client';

import React, { useState } from 'react';
import { Sparkles, Move } from 'lucide-react';

export const Unit2VectorSpaceSim: React.FC = () => {
  const [ux, setUx] = useState(3);
  const [uy, setUy] = useState(2);
  const [vx, setVx] = useState(1);
  const [vy, setVy] = useState(4);

  // Vector calculations
  const dotProduct = ux * vx + uy * vy;
  const normU = Math.sqrt(ux * ux + uy * uy);
  const normV = Math.sqrt(vx * vx + vy * vy);
  const cosTheta = normU > 0 && normV > 0 ? Math.max(-1, Math.min(1, dotProduct / (normU * normV))) : 0;
  const angleDeg = (Math.acos(cosTheta) * 180) / Math.PI;

  // Projection of u onto v: (u · v / ||v||²) * v
  const projScalar = normV > 0 ? dotProduct / (normV * normV) : 0;
  const projX = projScalar * vx;
  const projY = projScalar * vy;

  // Resultant u + v
  const resX = ux + vx;
  const resY = uy + vy;

  // SVG coordinate transformation (origin at center: 150, 150; scale: 20px per unit)
  const scale = 18;
  const cx = 150;
  const cy = 150;

  const toSvgX = (x: number) => cx + x * scale;
  const toSvgY = (y: number) => cy - y * scale;

  return (
    <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-6">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#334155] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E5EFFB] dark:bg-[#91B9E8]/20 text-[#416B9E] dark:text-[#C6DEFA] border border-[#B9D1EE] dark:border-[#91B9E8]/40">
              Unit 2 Interactive Simulation
            </span>
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">Linear Algebra Coordinate Plane</span>
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
            2D Vector Space, Dot Product & Projection Explorer
          </h3>
        </div>
      </div>

      {/* Grid: Interactive Canvas on Left, Controls & Metrics on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Interactive Plane */}
        <div className="lg:col-span-6 flex justify-center bg-[#F8FAFC] dark:bg-[#172033] p-4 rounded-2xl border border-[#E2E8F0] dark:border-[#334155]">
          <svg width="300" height="300" className="overflow-visible select-none">
            {/* Grid lines */}
            {[-6, -4, -2, 0, 2, 4, 6].map((i) => (
              <React.Fragment key={i}>
                <line
                  x1={toSvgX(i)}
                  y1={0}
                  x2={toSvgX(i)}
                  y2={300}
                  stroke={i === 0 ? '#64748B' : '#E2E8F0'}
                  strokeWidth={i === 0 ? 1.5 : 0.8}
                  className="dark:stroke-[#334155]"
                />
                <line
                  x1={0}
                  y1={toSvgY(i)}
                  x2={300}
                  y2={toSvgY(i)}
                  stroke={i === 0 ? '#64748B' : '#E2E8F0'}
                  strokeWidth={i === 0 ? 1.5 : 0.8}
                  className="dark:stroke-[#334155]"
                />
              </React.Fragment>
            ))}

            {/* Projection vector (dashed green) */}
            <line
              x1={cx}
              y1={cy}
              x2={toSvgX(projX)}
              y2={toSvgY(projY)}
              stroke="#10B981"
              strokeWidth="3"
              strokeDasharray="4 2"
            />

            {/* Orthogonal drop line from u to proj */}
            <line
              x1={toSvgX(ux)}
              y1={toSvgY(uy)}
              x2={toSvgX(projX)}
              y2={toSvgY(projY)}
              stroke="#94A3B8"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Vector u (Blue) */}
            <line
              x1={cx}
              y1={cy}
              x2={toSvgX(ux)}
              y2={toSvgY(uy)}
              stroke="#3B82F6"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx={toSvgX(ux)} cy={toSvgY(uy)} r="5" fill="#3B82F6" />
            <text x={toSvgX(ux) + 6} y={toSvgY(uy) - 6} fill="#3B82F6" fontWeight="bold" fontSize="12">
              u ({ux}, {uy})
            </text>

            {/* Vector v (Purple) */}
            <line
              x1={cx}
              y1={cy}
              x2={toSvgX(vx)}
              y2={toSvgY(vy)}
              stroke="#A855F7"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx={toSvgX(vx)} cy={toSvgY(vy)} r="5" fill="#A855F7" />
            <text x={toSvgX(vx) + 6} y={toSvgY(vy) - 6} fill="#A855F7" fontWeight="bold" fontSize="12">
              v ({vx}, {vy})
            </text>

            {/* Resultant Vector u + v (Amber, optional dotted) */}
            <line
              x1={cx}
              y1={cy}
              x2={toSvgX(resX)}
              y2={toSvgY(resY)}
              stroke="#F59E0B"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <circle cx={toSvgX(resX)} cy={toSvgY(resY)} r="3.5" fill="#F59E0B" />
            <text x={toSvgX(resX) + 6} y={toSvgY(resY) + 12} fill="#F59E0B" fontWeight="600" fontSize="10">
              u+v ({resX}, {resY})
            </text>
          </svg>
        </div>

        {/* Sliders & Coordinate Controls */}
        <div className="lg:col-span-6 space-y-4 text-xs">
          <div className="p-4 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-3">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5" />
              <span>Vector u Coordinates (Blue)</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                  <span>u_x</span> <span className="font-mono text-[#0F172A] dark:text-[#F8FAFC]">{ux}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={ux}
                  onChange={(e) => setUx(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                  <span>u_y</span> <span className="font-mono text-[#0F172A] dark:text-[#F8FAFC]">{uy}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={uy}
                  onChange={(e) => setUy(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-3">
            <h4 className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5" />
              <span>Vector v Coordinates (Purple)</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                  <span>v_x</span> <span className="font-mono text-[#0F172A] dark:text-[#F8FAFC]">{vx}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={vx}
                  onChange={(e) => setVx(parseInt(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                  <span>v_y</span> <span className="font-mono text-[#0F172A] dark:text-[#F8FAFC]">{vy}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={vy}
                  onChange={(e) => setVy(parseInt(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Output */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Dot Product (u · v)</span>
          <div className="text-base font-extrabold text-[#0F172A] dark:text-[#F8FAFC] font-mono">
            {dotProduct}
          </div>
          <span className="text-[10px] text-[#94A3B8]">{dotProduct === 0 ? 'Strictly Orthogonal (90°)' : dotProduct > 0 ? 'Acute (<90°)' : 'Obtuse (>90°)'}</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Cosine Similarity</span>
          <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-mono">
            {cosTheta.toFixed(4)}
          </div>
          <span className="text-[10px] text-[#94A3B8]">cos(θ) ∈ [-1, +1]</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Angle (θ)</span>
          <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-mono">
            {angleDeg.toFixed(1)}°
          </div>
          <span className="text-[10px] text-[#94A3B8]">Angle between u and v</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Projection proj_v(u)</span>
          <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            ({projX.toFixed(2)}, {projY.toFixed(2)})
          </div>
          <span className="text-[10px] text-[#94A3B8]">Parallel component along v</span>
        </div>
      </div>

      {/* Educational Explanation Box */}
      <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-[#1E293B] border border-blue-200/70 dark:border-blue-900/40 text-xs space-y-2">
        <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Vector Geometry Insights:</span>
        </div>
        <p className="text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
          Try dragging vectors so that <strong>u · v = 0</strong> (e.g. u = [2, 0] and v = [0, 3]). Notice how the angle becomes exactly <strong>90.0°</strong> and the projection vanishes to (0, 0). When vectors point in identical directions, Cosine Similarity equals <strong>+1.0000</strong>.
        </p>
      </div>
    </div>
  );
};
