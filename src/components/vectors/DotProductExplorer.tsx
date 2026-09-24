'use client';

import React, { useState } from 'react';
import { dotProduct, vectorNormL2, cosineSimilarity, angleBetweenDegrees } from '@/lib/vectorMath';
import { RotateCcw, Compass, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const DotProductExplorer: React.FC = () => {
  const [u, setU] = useState<[number, number]>([4, 1]);
  const [v, setV] = useState<[number, number]>([2, 3]);

  const dot = dotProduct(u, v);
  const normU = vectorNormL2(u);
  const normV = vectorNormL2(v);
  const cosSim = cosineSimilarity(u, v);
  const angleDeg = angleBetweenDegrees(u, v);
  const isOrthogonal = Math.abs(dot) < 0.001;

  const resetAll = () => {
    setU([4, 1]);
    setV([2, 3]);
  };

  const setPreset = (type: 'orthogonal' | 'parallel' | 'opposite' | 'acute') => {
    if (type === 'orthogonal') {
      setU([3, 2]);
      setV([-2, 3]);
    } else if (type === 'parallel') {
      setU([2, 3]);
      setV([4, 6]);
    } else if (type === 'opposite') {
      setU([3, 2]);
      setV([-3, -2]);
    } else {
      setU([4, 1]);
      setV([2, 3]);
    }
  };

  // Canvas coordinate math
  const size = 320;
  const range = 6;
  const toSvgX = (x: number) => size / 2 + (x * (size / 2)) / range;
  const toSvgY = (y: number) => size / 2 - (y * (size / 2)) / range;

  return (
    <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
        <div>
          <h4 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#416B9E]" />
            <span>Interactive Dot Product & Angle Explorer</span>
          </h4>
          <p className="text-xs text-[#64748B] mt-0.5">
            Modify vectors to inspect how angular alignment directly controls the dot product, cosine similarity, and orthogonality.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetAll} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Reset
          </Button>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-[#64748B]">Geometric Presets:</span>
        <button
          onClick={() => setPreset('acute')}
          className="px-2.5 py-1 rounded-md bg-[#F8FAFC] hover:bg-[#E5EFFB] border border-[#E2E8F0] text-[#416B9E] font-medium cursor-pointer"
        >
          Acute Angle (θ ≈ 36°)
        </button>
        <button
          onClick={() => setPreset('orthogonal')}
          className="px-2.5 py-1 rounded-md bg-[#F8FAFC] hover:bg-[#E5F3E9] border border-[#E2E8F0] text-[#3F7951] font-bold cursor-pointer"
        >
          Orthogonal (θ = 90°, u·v = 0)
        </button>
        <button
          onClick={() => setPreset('parallel')}
          className="px-2.5 py-1 rounded-md bg-[#F8FAFC] hover:bg-[#FAF2D8] border border-[#E2E8F0] text-[#806A28] font-medium cursor-pointer"
        >
          Collinear Parallel (θ = 0°)
        </button>
        <button
          onClick={() => setPreset('opposite')}
          className="px-2.5 py-1 rounded-md bg-[#F8FAFC] hover:bg-[#F6E5EB] border border-[#E2E8F0] text-[#8A4E63] font-medium cursor-pointer"
        >
          Opposite Direction (θ = 180°)
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* SVG Canvas */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] relative overflow-hidden">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[320px] aspect-square select-none">
            <defs>
              <marker id="dp-arrow-u" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#416B9E" />
              </marker>
              <marker id="dp-arrow-v" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#8FC7A3" />
              </marker>
            </defs>

            {/* Grid */}
            {[-4, -2, 2, 4].map((tick) => (
              <React.Fragment key={tick}>
                <line x1={toSvgX(tick)} y1={0} x2={toSvgX(tick)} y2={size} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2,2" />
                <line x1={0} y1={toSvgY(tick)} x2={size} y2={toSvgY(tick)} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2,2" />
              </React.Fragment>
            ))}

            <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="#CBD5E1" strokeWidth="1.5" />

            {/* Vector u */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(u[0])}
              y2={toSvgY(u[1])}
              stroke="#416B9E"
              strokeWidth="2.5"
              markerEnd="url(#dp-arrow-u)"
            />
            <text x={toSvgX(u[0]) + 6} y={toSvgY(u[1]) - 6} fontSize="11" fill="#416B9E" fontWeight="bold">
              u ({u[0]}, {u[1]})
            </text>

            {/* Vector v */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(v[0])}
              y2={toSvgY(v[1])}
              stroke="#8FC7A3"
              strokeWidth="2.5"
              markerEnd="url(#dp-arrow-v)"
            />
            <text x={toSvgX(v[0]) + 6} y={toSvgY(v[1]) - 6} fontSize="11" fill="#3F7951" fontWeight="bold">
              v ({v[0]}, {v[1]})
            </text>
          </svg>

          {/* Orthogonality Banner */}
          <div
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold text-center border mt-2 flex items-center justify-center gap-1.5 ${
              isOrthogonal
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : dot > 0
                ? 'bg-[#E5EFFB] text-[#416B9E] border-[#B9D1EE]'
                : 'bg-[#FAF2D8] text-[#806A28] border-[#EBD99A]'
            }`}
          >
            {isOrthogonal && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            <span>
              {isOrthogonal
                ? 'Vectors are Orthogonal (Perpendicular: 90°)'
                : dot > 0
                ? `Acute Alignment (θ = ${angleDeg.toFixed(1)}°)`
                : `Obtuse Alignment (θ = ${angleDeg.toFixed(1)}°)`}
            </span>
          </div>
        </div>

        {/* Live Metrics Column */}
        <div className="md:col-span-6 space-y-4 text-xs">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">Dot Product (u · v)</span>
              <span className={`text-2xl font-black font-mono ${isOrthogonal ? 'text-emerald-600' : 'text-[#0F172A]'}`}>
                {dot.toFixed(2)}
              </span>
            </div>

            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">Cosine Similarity</span>
              <span className="text-2xl font-black font-mono text-[#416B9E]">
                {cosSim.toFixed(3)}
              </span>
            </div>

            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">Angle θ (Degrees)</span>
              <span className="text-xl font-black font-mono text-[#0F172A]">{angleDeg.toFixed(1)}°</span>
            </div>

            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">Norm Product ||u|| ||v||</span>
              <span className="text-xl font-black font-mono text-[#0F172A]">
                {(normU * normV).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Coordinate Sliders */}
          <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-[#416B9E]">u_x coordinate:</span>
                <span className="font-mono font-bold text-[#0F172A]">{u[0]}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.5"
                value={u[0]}
                onChange={(e) => setU([Number(e.target.value), u[1]])}
                className="w-full accent-[#416B9E] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-[#416B9E]">u_y coordinate:</span>
                <span className="font-mono font-bold text-[#0F172A]">{u[1]}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.5"
                value={u[1]}
                onChange={(e) => setU([u[0], Number(e.target.value)])}
                className="w-full accent-[#416B9E] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-[#3F7951]">v_x coordinate:</span>
                <span className="font-mono font-bold text-[#0F172A]">{v[0]}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.5"
                value={v[0]}
                onChange={(e) => setV([Number(e.target.value), v[1]])}
                className="w-full accent-[#8FC7A3] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-[#3F7951]">v_y coordinate:</span>
                <span className="font-mono font-bold text-[#0F172A]">{v[1]}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.5"
                value={v[1]}
                onChange={(e) => setV([v[0], Number(e.target.value)])}
                className="w-full accent-[#8FC7A3] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
