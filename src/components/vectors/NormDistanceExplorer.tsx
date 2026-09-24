'use client';

import React, { useState } from 'react';
import { vectorNormL1, vectorNormL2, euclideanDistance } from '@/lib/vectorMath';
import { RotateCcw, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const NormDistanceExplorer: React.FC = () => {
  const [pointA, setPointA] = useState<[number, number]>([1, 1]);
  const [pointB, setPointB] = useState<[number, number]>([5, 4]);

  const normL1_A = vectorNormL1(pointA);
  const normL2_A = vectorNormL2(pointA);

  const normL1_B = vectorNormL1(pointB);
  const normL2_B = vectorNormL2(pointB);

  const distEuclidean = euclideanDistance(pointA, pointB);
  const distManhattan = Math.abs(pointB[0] - pointA[0]) + Math.abs(pointB[1] - pointA[1]);

  const resetAll = () => {
    setPointA([1, 1]);
    setPointB([5, 4]);
  };

  const size = 320;
  const range = 7;
  const toSvgX = (x: number) => size / 2 + (x * (size / 2)) / range;
  const toSvgY = (y: number) => size / 2 - (y * (size / 2)) / range;

  return (
    <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
        <div>
          <h4 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#416B9E]" />
            <span>Vector Norms & Distance Metric Explorer</span>
          </h4>
          <p className="text-xs text-[#64748B] mt-0.5">
            Compare straight-line Euclidean L2 distance against grid-constrained Manhattan L1 distance between points.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={resetAll} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* SVG Canvas */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[320px] aspect-square select-none">
            {/* Grid */}
            {[-6, -4, -2, 2, 4, 6].map((tick) => (
              <React.Fragment key={tick}>
                <line x1={toSvgX(tick)} y1={0} x2={toSvgX(tick)} y2={size} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2,2" />
                <line x1={0} y1={toSvgY(tick)} x2={size} y2={toSvgY(tick)} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2,2" />
              </React.Fragment>
            ))}

            <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="#CBD5E1" strokeWidth="1.5" />

            {/* L1 Manhattan Path (Dashed Gold Step) */}
            <polyline
              points={`${toSvgX(pointA[0])},${toSvgY(pointA[1])} ${toSvgX(pointB[0])},${toSvgY(pointA[1])} ${toSvgX(pointB[0])},${toSvgY(pointB[1])}`}
              fill="none"
              stroke="#E8C878"
              strokeWidth="2.5"
              strokeDasharray="4,4"
            />

            {/* L2 Euclidean Hypotenuse (Solid Navy) */}
            <line
              x1={toSvgX(pointA[0])}
              y1={toSvgY(pointA[1])}
              x2={toSvgX(pointB[0])}
              y2={toSvgY(pointB[1])}
              stroke="#416B9E"
              strokeWidth="3"
            />

            {/* Point A */}
            <circle cx={toSvgX(pointA[0])} cy={toSvgY(pointA[1])} r="5" fill="#416B9E" />
            <text x={toSvgX(pointA[0]) - 20} y={toSvgY(pointA[1]) - 8} fontSize="11" fill="#416B9E" fontWeight="bold">
              A ({pointA[0]}, {pointA[1]})
            </text>

            {/* Point B */}
            <circle cx={toSvgX(pointB[0])} cy={toSvgY(pointB[1])} r="5" fill="#9E513B" />
            <text x={toSvgX(pointB[0]) + 8} y={toSvgY(pointB[1]) - 8} fontSize="11" fill="#9E513B" fontWeight="bold">
              B ({pointB[0]}, {pointB[1]})
            </text>
          </svg>

          {/* Legend */}
          <div className="flex items-center justify-around gap-4 text-xs pt-3 border-t border-[#E2E8F0] w-full">
            <span className="flex items-center gap-1 font-bold text-[#416B9E]">
              <span className="w-3 h-0.5 bg-[#416B9E]" /> L2 Euclidean Distance
            </span>
            <span className="flex items-center gap-1 font-bold text-[#806A28]">
              <span className="w-3 h-0.5 bg-[#E8C878] border-b border-dashed" /> L1 Manhattan Distance
            </span>
          </div>
        </div>

        {/* Numeric Panels & Sliders */}
        <div className="md:col-span-6 space-y-4 text-xs">
          {/* Distance Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[11px] font-bold text-[#416B9E] uppercase tracking-wider block">
                Euclidean Dist d_2(A,B)
              </span>
              <span className="text-2xl font-black font-mono text-[#0F172A]">
                {distEuclidean.toFixed(2)}
              </span>
              <span className="text-[10px] text-[#64748B] block">Straight line hypotenuse</span>
            </div>

            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[11px] font-bold text-[#806A28] uppercase tracking-wider block">
                Manhattan Dist d_1(A,B)
              </span>
              <span className="text-2xl font-black font-mono text-[#0F172A]">
                {distManhattan.toFixed(1)}
              </span>
              <span className="text-[10px] text-[#64748B] block">|Δx| + |Δy| grid steps</span>
            </div>
          </div>

          {/* Coordinate Sliders */}
          <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2.5">
            <span className="font-bold text-[#0F172A] block">Point A Coordinates:</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#64748B] block mb-1">A_x: {pointA[0]}</label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={pointA[0]}
                  onChange={(e) => setPointA([Number(e.target.value), pointA[1]])}
                  className="w-full accent-[#416B9E] cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[#64748B] block mb-1">A_y: {pointA[1]}</label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={pointA[1]}
                  onChange={(e) => setPointA([pointA[0], Number(e.target.value)])}
                  className="w-full accent-[#416B9E] cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-between text-[11px] text-[#64748B]">
              <span>||A||_1 = {normL1_A.toFixed(1)}</span>
              <span>||A||_2 = {normL2_A.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2.5">
            <span className="font-bold text-[#0F172A] block">Point B Coordinates:</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#64748B] block mb-1">B_x: {pointB[0]}</label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={pointB[0]}
                  onChange={(e) => setPointB([Number(e.target.value), pointB[1]])}
                  className="w-full accent-[#9E513B] cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[#64748B] block mb-1">B_y: {pointB[1]}</label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={pointB[1]}
                  onChange={(e) => setPointB([pointB[0], Number(e.target.value)])}
                  className="w-full accent-[#9E513B] cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-between text-[11px] text-[#64748B]">
              <span>||B||_1 = {normL1_B.toFixed(1)}</span>
              <span>||B||_2 = {normL2_B.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
