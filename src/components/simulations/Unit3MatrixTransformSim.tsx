'use client';

import React, { useState } from 'react';
import { Sparkles, Grid } from 'lucide-react';

export const Unit3MatrixTransformSim: React.FC = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0.5);
  const [c, setC] = useState(0);
  const [d, setD] = useState(1);

  // Transformed basis vectors:
  // T(î) = T([1, 0]) = [a, c]
  // T(ĵ) = T([0, 1]) = [b, d]
  // Transformed diagonal = [a+b, c+d]
  const det = a * d - b * c;
  const area = Math.abs(det);

  // Preset transformation matrix selectors
  const applyPreset = (presetA: number, presetB: number, presetC: number, presetD: number) => {
    setA(presetA);
    setB(presetB);
    setC(presetC);
    setD(presetD);
  };

  // SVG parameters
  const scale = 22;
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
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E5F3E9] dark:bg-[#8FC7A3]/20 text-[#3F7951] dark:text-[#BCE8CC] border border-[#B8DCC3] dark:border-[#8FC7A3]/40">
              Unit 3 Interactive Simulation
            </span>
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">Linear Transformations & Determinant</span>
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
            2D Matrix Transformation & Determinant Area Visualizer
          </h3>
        </div>
      </div>

      {/* Grid: Canvas on Left, Matrix Inputs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Interactive Canvas */}
        <div className="lg:col-span-6 flex justify-center bg-[#F8FAFC] dark:bg-[#172033] p-4 rounded-2xl border border-[#E2E8F0] dark:border-[#334155]">
          <svg width="300" height="300" className="overflow-visible select-none">
            {/* Grid lines */}
            {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((i) => (
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

            {/* Original Unit Square (Gray Dashed) */}
            <polygon
              points={`${toSvgX(0)},${toSvgY(0)} ${toSvgX(1)},${toSvgY(0)} ${toSvgX(1)},${toSvgY(1)} ${toSvgX(0)},${toSvgY(1)}`}
              fill="rgba(148, 163, 184, 0.15)"
              stroke="#94A3B8"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />

            {/* Transformed Parallelogram (Green Shaded) */}
            <polygon
              points={`${toSvgX(0)},${toSvgY(0)} ${toSvgX(a)},${toSvgY(c)} ${toSvgX(a + b)},${toSvgY(c + d)} ${toSvgX(b)},${toSvgY(d)}`}
              fill={det >= 0 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'}
              stroke={det >= 0 ? '#10B981' : '#EF4444'}
              strokeWidth="2"
            />

            {/* Transformed Basis Vector T(î) = [a, c] (Red) */}
            <line
              x1={cx}
              y1={cy}
              x2={toSvgX(a)}
              y2={toSvgY(c)}
              stroke="#EF4444"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx={toSvgX(a)} cy={toSvgY(c)} r="4" fill="#EF4444" />
            <text x={toSvgX(a) + 6} y={toSvgY(c) - 4} fill="#EF4444" fontWeight="bold" fontSize="11">
              T(î) = [{a}, {c}]
            </text>

            {/* Transformed Basis Vector T(ĵ) = [b, d] (Green) */}
            <line
              x1={cx}
              y1={cy}
              x2={toSvgX(b)}
              y2={toSvgY(d)}
              stroke="#10B981"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx={toSvgX(b)} cy={toSvgY(d)} r="4" fill="#10B981" />
            <text x={toSvgX(b) + 6} y={toSvgY(d) - 4} fill="#10B981" fontWeight="bold" fontSize="11">
              T(ĵ) = [{b}, {d}]
            </text>
          </svg>
        </div>

        {/* Matrix Entry Controls */}
        <div className="lg:col-span-6 space-y-4 text-xs">
          <div className="p-4 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-3">
            <h4 className="font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5 text-emerald-600" />
              <span>Transformation Matrix Entries A = [[a, b], [c, d]]</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                  <span>a (î_x scale)</span> <span className="font-mono text-[#0F172A] dark:text-[#F8FAFC]">{a}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={a}
                  onChange={(e) => setA(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                  <span>b (ĵ_x shear)</span> <span className="font-mono text-[#0F172A] dark:text-[#F8FAFC]">{b}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={b}
                  onChange={(e) => setB(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                  <span>c (î_y shear)</span> <span className="font-mono text-[#0F172A] dark:text-[#F8FAFC]">{c}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={c}
                  onChange={(e) => setC(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                  <span>d (ĵ_y scale)</span> <span className="font-mono text-[#0F172A] dark:text-[#F8FAFC]">{d}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={d}
                  onChange={(e) => setD(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">Quick Transformation Presets:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => applyPreset(1, 0, 0, 1)}
                className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] font-semibold hover:bg-emerald-50 cursor-pointer text-[11px]"
              >
                Identity
              </button>
              <button
                onClick={() => applyPreset(1, 1, 0, 1)}
                className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] font-semibold hover:bg-emerald-50 cursor-pointer text-[11px]"
              >
                Horizontal Shear
              </button>
              <button
                onClick={() => applyPreset(0, -1, 1, 0)}
                className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] font-semibold hover:bg-emerald-50 cursor-pointer text-[11px]"
              >
                90° Rotation
              </button>
              <button
                onClick={() => applyPreset(2, 0, 0, 2)}
                className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] font-semibold hover:bg-emerald-50 cursor-pointer text-[11px]"
              >
                2× Uniform Scaling
              </button>
              <button
                onClick={() => applyPreset(1, 2, 2, 4)}
                className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-semibold border border-rose-200 dark:border-rose-900 cursor-pointer text-[11px]"
              >
                Singular (det = 0)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Determinant det(A)</span>
          <div className={`text-base font-extrabold font-mono ${det === 0 ? 'text-rose-600 dark:text-rose-400' : 'text-[#0F172A] dark:text-[#F8FAFC]'}`}>
            {det.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#94A3B8]">{det === 0 ? 'Space collapses onto a line' : det > 0 ? 'Preserves orientation' : 'Inverts orientation'}</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Transformed Area</span>
          <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {area.toFixed(2)} units²
          </div>
          <span className="text-[10px] text-[#94A3B8]">Original unit square was 1.0</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Matrix Rank</span>
          <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-mono">
            {det === 0 ? (a === 0 && b === 0 && c === 0 && d === 0 ? '0' : '1') : '2 (Full Rank)'}
          </div>
          <span className="text-[10px] text-[#94A3B8]">{det !== 0 ? 'Dimension preserved' : 'Rank deficient'}</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Invertibility</span>
          <div className="text-base font-extrabold font-mono">
            {det !== 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400">Invertible A⁻¹</span>
            ) : (
              <span className="text-rose-600 dark:text-rose-400">Singular / No A⁻¹</span>
            )}
          </div>
          <span className="text-[10px] text-[#94A3B8]">{det !== 0 ? 'Unique solution exists' : 'Infinite or no solutions'}</span>
        </div>
      </div>

      {/* Educational Insight Box */}
      <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-[#1E293B] border border-emerald-200/70 dark:border-emerald-900/40 text-xs space-y-2">
        <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Determinant as Area Scaling:</span>
        </div>
        <p className="text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
          The columns of the matrix [a, c]ᵀ and [b, d]ᵀ are simply the landing coordinates of standard basis vectors î and ĵ. The determinant <strong>ad - bc</strong> calculates the signed area of the green parallelogram. If <strong>det = 0</strong>, both basis vectors lie on the exact same line, flattening 2D space into 1D!
        </p>
      </div>
    </div>
  );
};
