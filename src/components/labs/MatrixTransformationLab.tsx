'use client';

import React, { useState } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { determinant2x2, Matrix2D, matrixVectorMultiply } from '@/lib/matrixMath';

export const MatrixTransformationLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-3');
  const isDone = isLabCompleted('transformations');

  const [matrix, setMatrix] = useState<Matrix2D>([
    [1.5, 0.5],
    [0.5, 1.2],
  ]);
  const [testPoint, setTestPoint] = useState<[number, number]>([1, 1]);

  const a = matrix[0][0];
  const b = matrix[0][1];
  const c = matrix[1][0];
  const d = matrix[1][1];

  const det = determinant2x2(matrix);
  const transformedPoint = matrixVectorMultiply(matrix, testPoint);

  const iTransformed: [number, number] = [a, c];
  const jTransformed: [number, number] = [b, d];
  const cornerTransformed: [number, number] = [a + b, c + d];

  // SVG parameters
  const size = 360;
  const center = size / 2;
  const scale = 30;

  const toSvg = (x: number, y: number) => ({
    x: center + x * scale,
    y: center - y * scale,
  });

  const origin = toSvg(0, 0);
  const ptI = toSvg(iTransformed[0], iTransformed[1]);
  const ptJ = toSvg(jTransformed[0], jTransformed[1]);
  const ptCorner = toSvg(cornerTransformed[0], cornerTransformed[1]);
  const ptTest = toSvg(testPoint[0], testPoint[1]);
  const ptTransTest = toSvg(transformedPoint[0], transformedPoint[1]);

  const gridLines = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E5F3E9] text-[#3F7951]">
              Unit 3 • Lab 3
            </span>
            <span className="text-sm text-slate-500 font-medium">Geometric Linear Transformations</span>
          </div>
          <p className="text-xs text-slate-600">
            Manipulate 2×2 transformation operators, track basis vectors, and explore spatial rotations, shears, and area scalings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMatrix([[1.5, 0.5], [0.5, 1.2]]);
              setTestPoint([1, 1]);
            }}
            className="text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>

          <Button
            onClick={() => completeLab('transformations')}
            variant={isDone ? 'outline' : 'primary'}
            size="sm"
            className={isDone ? 'border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100' : 'bg-[#3F7951] hover:bg-[#2e5c3c] text-white'}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            {isDone ? 'Completed' : 'Mark Lab Complete'}
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: SVG Transformation Grid */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
          <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">Transformed 2D Cartesian Space</h3>
            <span className="text-xs font-mono font-bold text-[#3F7951]">
              det(A) = {det.toFixed(2)}
            </span>
          </div>

          <div className="relative border border-slate-200 rounded-lg bg-slate-50/50 p-2 overflow-hidden shadow-inner">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible select-none">
              <defs>
                <marker id="lab-trans-i" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
                </marker>
                <marker id="lab-trans-j" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#059669" />
                </marker>
                <marker id="lab-trans-pt" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#7C3AED" />
                </marker>
              </defs>

              {/* Standard Coordinate Grid */}
              {gridLines.map((tick) => {
                const p1 = toSvg(tick, -5);
                const p2 = toSvg(tick, 5);
                const p3 = toSvg(-5, tick);
                const p4 = toSvg(5, tick);
                return (
                  <g key={tick} opacity={0.25}>
                    <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                  </g>
                );
              })}

              {/* Transformed Grid Lines */}
              {gridLines.map((k) => {
                const startX = k * b + (-4) * a;
                const startY = k * d + (-4) * c;
                const endX = k * b + (4) * a;
                const endY = k * d + (4) * c;
                const pStart = toSvg(startX, startY);
                const pEnd = toSvg(endX, endY);

                const startX2 = k * a + (-4) * b;
                const startY2 = k * c + (-4) * d;
                const endX2 = k * a + (4) * b;
                const endY2 = k * c + (4) * d;
                const pStart2 = toSvg(startX2, startY2);
                const pEnd2 = toSvg(endX2, endY2);

                return (
                  <g key={`trans-${k}`} opacity={0.3}>
                    <line x1={pStart.x} y1={pStart.y} x2={pEnd.x} y2={pEnd.y} stroke="#8FC7A3" strokeWidth="1" />
                    <line x1={pStart2.x} y1={pStart2.y} x2={pEnd2.x} y2={pEnd2.y} stroke="#8FC7A3" strokeWidth="1" />
                  </g>
                );
              })}

              {/* Coordinate Axes */}
              <line x1={0} y1={center} x2={size} y2={center} stroke="#94a3b8" strokeWidth="1.5" />
              <line x1={center} y1={0} x2={center} y2={size} stroke="#94a3b8" strokeWidth="1.5" />

              {/* Parallelogram area polygon */}
              <polygon
                points={`${origin.x},${origin.y} ${ptI.x},${ptI.y} ${ptCorner.x},${ptCorner.y} ${ptJ.x},${ptJ.y}`}
                fill="#8FC7A3"
                fillOpacity={0.25}
                stroke="#3F7951"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />

              {/* Transformed Vector Aî */}
              <line x1={origin.x} y1={origin.y} x2={ptI.x} y2={ptI.y} stroke="#0284C7" strokeWidth="3" markerEnd="url(#lab-trans-i)" />

              {/* Transformed Vector Aĵ */}
              <line x1={origin.x} y1={origin.y} x2={ptJ.x} y2={ptJ.y} stroke="#059669" strokeWidth="3" markerEnd="url(#lab-trans-j)" />

              {/* Test Vector Before and After */}
              <line x1={origin.x} y1={origin.y} x2={ptTest.x} y2={ptTest.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2,2" />
              <line x1={origin.x} y1={origin.y} x2={ptTransTest.x} y2={ptTransTest.y} stroke="#7C3AED" strokeWidth="2.5" markerEnd="url(#lab-trans-pt)" />

              {/* Labels */}
              <text x={ptI.x + 6} y={ptI.y - 4} fill="#0284C7" fontSize="11" fontWeight="bold">
                Aî [{a}, {c}]
              </text>
              <text x={ptJ.x + 6} y={ptJ.y + 12} fill="#059669" fontSize="11" fontWeight="bold">
                Aĵ [{b}, {d}]
              </text>
              <text x={ptTransTest.x + 6} y={ptTransTest.y} fill="#7C3AED" fontSize="11" fontWeight="bold">
                Ax [{transformedPoint[0].toFixed(1)}, {transformedPoint[1].toFixed(1)}]
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-sky-700">
              <span className="w-3 h-1 bg-sky-600 rounded-full" /> Transformed î [a, c]^T
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
              <span className="w-3 h-1 bg-emerald-600 rounded-full" /> Transformed ĵ [b, d]^T
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-purple-700">
              <span className="w-3 h-1 bg-purple-600 rounded-full" /> Transformed Point Ax
            </span>
          </div>
        </div>

        {/* Right: Controls & Calculations */}
        <div className="lg:col-span-5 space-y-4">
          {/* Sliders */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-[#3F7951] uppercase tracking-wider block">
              2×2 Matrix Operator A
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-600 block mb-0.5">a: <strong className="font-mono text-sky-800">{a}</strong></span>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={a}
                  onChange={(e) => setMatrix([[parseFloat(e.target.value), b], [c, d]])}
                  className="w-full accent-sky-600"
                />
              </div>
              <div>
                <span className="text-slate-600 block mb-0.5">b: <strong className="font-mono text-emerald-800">{b}</strong></span>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={b}
                  onChange={(e) => setMatrix([[a, parseFloat(e.target.value)], [c, d]])}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <span className="text-slate-600 block mb-0.5">c: <strong className="font-mono text-sky-800">{c}</strong></span>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={c}
                  onChange={(e) => setMatrix([[a, b], [parseFloat(e.target.value), d]])}
                  className="w-full accent-sky-600"
                />
              </div>
              <div>
                <span className="text-slate-600 block mb-0.5">d: <strong className="font-mono text-emerald-800">{d}</strong></span>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={d}
                  onChange={(e) => setMatrix([[a, b], [c, parseFloat(e.target.value)]])}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Test Vector Slider */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-purple-800 uppercase tracking-wider block">
              Sample Vector x [{testPoint[0]}, {testPoint[1]}]
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-600 block mb-0.5">x₁: {testPoint[0]}</span>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={testPoint[0]}
                  onChange={(e) => setTestPoint([parseFloat(e.target.value), testPoint[1]])}
                  className="w-full accent-purple-600"
                />
              </div>
              <div>
                <span className="text-slate-600 block mb-0.5">x₂: {testPoint[1]}</span>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={testPoint[1]}
                  onChange={(e) => setTestPoint([testPoint[0], parseFloat(e.target.value)])}
                  className="w-full accent-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Transformation Mapping Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
            <h5 className="font-bold text-slate-800 font-sans uppercase tracking-wider text-xs">
              Mapping Equation Ax = y:
            </h5>
            <div className="space-y-1 text-slate-700">
              <p>• [[{a}, {b}], [{c}, {d}]] × [{testPoint[0]}, {testPoint[1]}]^T</p>
              <p className="pt-1 border-t border-slate-200 font-bold text-purple-900 font-sans">
                ➔ Mapped Point: [{transformedPoint[0].toFixed(2)}, {transformedPoint[1].toFixed(2)}]^T
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
