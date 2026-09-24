'use client';

import React, { useState } from 'react';
import { vectorAdd, vectorSubtract, scalarMultiply, vectorNormL2 } from '@/lib/vectorMath';
import { RotateCcw, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const VectorPlayground: React.FC = () => {
  // Vectors u and v in 2D space
  const [u, setU] = useState<[number, number]>([3, 2]);
  const [v, setV] = useState<[number, number]>([1, 4]);
  const [scalarU, setScalarU] = useState<number>(1);
  const [scalarV, setScalarV] = useState<number>(1);
  const [showSum, setShowSum] = useState<boolean>(true);
  const [showDiff, setShowDiff] = useState<boolean>(false);

  const scaledU = scalarMultiply(u, scalarU);
  const scaledV = scalarMultiply(v, scalarV);
  const sumVec = vectorAdd(scaledU, scaledV);
  const diffVec = vectorSubtract(scaledU, scaledV);

  const resetAll = () => {
    setU([3, 2]);
    setV([1, 4]);
    setScalarU(1);
    setScalarV(1);
    setShowSum(true);
    setShowDiff(false);
  };

  // SVG coordinate transformation constants
  // Domain: -8 to +8 on both axes
  const size = 320;
  const range = 8;
  const toSvgX = (x: number) => size / 2 + (x * (size / 2)) / range;
  const toSvgY = (y: number) => size / 2 - (y * (size / 2)) / range;

  return (
    <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
        <div>
          <h4 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#416B9E]" />
            <span>2D Vector Operations Playground</span>
          </h4>
          <p className="text-xs text-[#64748B] mt-0.5">
            Interactively scale vectors, calculate vector addition and subtraction, and observe geometric displacements.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={resetAll} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
          Reset
        </Button>
      </div>

      {/* Grid Layout: Canvas Left, Controls Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* SVG Coordinate Canvas */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] relative overflow-hidden">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full max-w-[320px] aspect-square select-none overflow-visible"
          >
            <defs>
              {/* Arrow markers */}
              <marker id="arrow-u" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#416B9E" />
              </marker>
              <marker id="arrow-v" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#8FC7A3" />
              </marker>
              <marker id="arrow-sum" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#9E513B" />
              </marker>
              <marker id="arrow-diff" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#B7A3E3" />
              </marker>
            </defs>

            {/* Grid lines */}
            {[-6, -4, -2, 2, 4, 6].map((tick) => (
              <React.Fragment key={tick}>
                <line
                  x1={toSvgX(tick)}
                  y1={0}
                  x2={toSvgX(tick)}
                  y2={size}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <line
                  x1={0}
                  y1={toSvgY(tick)}
                  x2={size}
                  y2={toSvgY(tick)}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              </React.Fragment>
            ))}

            {/* Axes */}
            <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="#CBD5E1" strokeWidth="1.5" />

            {/* Origin Label */}
            <text x={size / 2 - 10} y={size / 2 + 14} fontSize="10" fill="#94A3B8" fontWeight="600">
              (0,0)
            </text>

            {/* Parallelogram helper dashed lines if sum is shown */}
            {showSum && (
              <>
                <line
                  x1={toSvgX(scaledU[0])}
                  y1={toSvgY(scaledU[1])}
                  x2={toSvgX(sumVec[0])}
                  y2={toSvgY(sumVec[1])}
                  stroke="#8FC7A3"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  opacity="0.7"
                />
                <line
                  x1={toSvgX(scaledV[0])}
                  y1={toSvgY(scaledV[1])}
                  x2={toSvgX(sumVec[0])}
                  y2={toSvgY(sumVec[1])}
                  stroke="#416B9E"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  opacity="0.7"
                />
              </>
            )}

            {/* Vector u */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(scaledU[0])}
              y2={toSvgY(scaledU[1])}
              stroke="#416B9E"
              strokeWidth="2.5"
              markerEnd="url(#arrow-u)"
            />
            <text
              x={toSvgX(scaledU[0]) + 6}
              y={toSvgY(scaledU[1]) - 6}
              fontSize="11"
              fill="#416B9E"
              fontWeight="bold"
            >
              u ({scaledU[0].toFixed(1)}, {scaledU[1].toFixed(1)})
            </text>

            {/* Vector v */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(scaledV[0])}
              y2={toSvgY(scaledV[1])}
              stroke="#8FC7A3"
              strokeWidth="2.5"
              markerEnd="url(#arrow-v)"
            />
            <text
              x={toSvgX(scaledV[0]) + 6}
              y={toSvgY(scaledV[1]) - 6}
              fontSize="11"
              fill="#3F7951"
              fontWeight="bold"
            >
              v ({scaledV[0].toFixed(1)}, {scaledV[1].toFixed(1)})
            </text>

            {/* Sum Vector u + v */}
            {showSum && (
              <>
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(0)}
                  x2={toSvgX(sumVec[0])}
                  y2={toSvgY(sumVec[1])}
                  stroke="#9E513B"
                  strokeWidth="2.5"
                  markerEnd="url(#arrow-sum)"
                />
                <text
                  x={toSvgX(sumVec[0]) + 6}
                  y={toSvgY(sumVec[1]) - 6}
                  fontSize="11"
                  fill="#9E513B"
                  fontWeight="bold"
                >
                  u+v ({sumVec[0].toFixed(1)}, {sumVec[1].toFixed(1)})
                </text>
              </>
            )}

            {/* Difference Vector u - v */}
            {showDiff && (
              <>
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(0)}
                  x2={toSvgX(diffVec[0])}
                  y2={toSvgY(diffVec[1])}
                  stroke="#68539A"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  markerEnd="url(#arrow-diff)"
                />
                <text
                  x={toSvgX(diffVec[0]) + 6}
                  y={toSvgY(diffVec[1]) - 6}
                  fontSize="11"
                  fill="#68539A"
                  fontWeight="bold"
                >
                  u-v ({diffVec[0].toFixed(1)}, {diffVec[1].toFixed(1)})
                </text>
              </>
            )}
          </svg>

          {/* Canvas Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs pt-3 border-t border-[#E2E8F0] w-full">
            <span className="flex items-center gap-1 font-bold text-[#416B9E]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#416B9E]" /> Vector u
            </span>
            <span className="flex items-center gap-1 font-bold text-[#3F7951]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8FC7A3]" /> Vector v
            </span>
            {showSum && (
              <span className="flex items-center gap-1 font-bold text-[#9E513B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F4A58A]" /> Sum (u+v)
              </span>
            )}
            {showDiff && (
              <span className="flex items-center gap-1 font-bold text-[#68539A]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B7A3E3]" /> Diff (u-v)
              </span>
            )}
          </div>
        </div>

        {/* Controls Column */}
        <div className="md:col-span-6 space-y-4 text-xs">
          {/* Vector u Controls */}
          <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2.5">
            <div className="flex justify-between items-center font-bold text-[#0F172A]">
              <span className="text-[#416B9E] font-extrabold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#416B9E]" /> Vector u Coordinates
              </span>
              <span className="font-mono text-[#64748B]">||u|| = {vectorNormL2(scaledU).toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#64748B] block mb-1">u_x: {u[0]}</label>
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
                <label className="text-[#64748B] block mb-1">u_y: {u[1]}</label>
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
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-[#64748B]">
                <span>Scalar Scale c_u:</span>
                <span className="font-mono font-bold text-[#0F172A]">{scalarU}x</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.25"
                value={scalarU}
                onChange={(e) => setScalarU(Number(e.target.value))}
                className="w-full accent-[#416B9E] cursor-pointer"
              />
            </div>
          </div>

          {/* Vector v Controls */}
          <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2.5">
            <div className="flex justify-between items-center font-bold text-[#0F172A]">
              <span className="text-[#3F7951] font-extrabold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8FC7A3]" /> Vector v Coordinates
              </span>
              <span className="font-mono text-[#64748B]">||v|| = {vectorNormL2(scaledV).toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#64748B] block mb-1">v_x: {v[0]}</label>
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
                <label className="text-[#64748B] block mb-1">v_y: {v[1]}</label>
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

            <div>
              <div className="flex justify-between text-[11px] text-[#64748B]">
                <span>Scalar Scale c_v:</span>
                <span className="font-mono font-bold text-[#0F172A]">{scalarV}x</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.25"
                value={scalarV}
                onChange={(e) => setScalarV(Number(e.target.value))}
                className="w-full accent-[#8FC7A3] cursor-pointer"
              />
            </div>
          </div>

          {/* Display Toggles */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowSum(!showSum)}
              className={`flex-1 py-2 px-3 rounded-lg border font-semibold transition-all cursor-pointer ${
                showSum
                  ? 'bg-[#FCE5DC] text-[#9E513B] border-[#EFC0B0]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0]'
              }`}
            >
              {showSum ? '✓ Hide Sum (u+v)' : '+ Show Sum (u+v)'}
            </button>
            <button
              onClick={() => setShowDiff(!showDiff)}
              className={`flex-1 py-2 px-3 rounded-lg border font-semibold transition-all cursor-pointer ${
                showDiff
                  ? 'bg-[#EEE9F8] text-[#68539A] border-[#CFC2EA]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0]'
              }`}
            >
              {showDiff ? '✓ Hide Diff (u-v)' : '- Show Diff (u-v)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
