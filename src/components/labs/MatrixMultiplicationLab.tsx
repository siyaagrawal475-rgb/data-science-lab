'use client';

import React, { useState } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import {
  matrixMultiply,
  matrixDimensions,
  isMultiplicationCompatible,
  Matrix,
} from '@/lib/matrixMath';

export const MatrixMultiplicationLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-3');
  const isDone = isLabCompleted('matrix-multiplication');

  const [matrixA, setMatrixA] = useState<Matrix>([
    [1, 2, 0],
    [3, -1, 4],
  ]);
  const [matrixB, setMatrixB] = useState<Matrix>([
    [2, 1],
    [0, 3],
    [-1, 2],
  ]);
  const [activeCell, setActiveCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });

  const [rA, cA] = matrixDimensions(matrixA);
  const [rB, cB] = matrixDimensions(matrixB);
  const isCompatible = isMultiplicationCompatible(matrixA, matrixB);

  let resultMatrix: Matrix | null = null;
  if (isCompatible) {
    try {
      resultMatrix = matrixMultiply(matrixA, matrixB);
    } catch {
      resultMatrix = null;
    }
  }

  const handleCellA = (r: number, c: number, v: number) => {
    const next = matrixA.map((rowArr, i) =>
      rowArr.map((cell, j) => (i === r && j === c ? v : cell))
    );
    setMatrixA(next);
  };

  const handleCellB = (r: number, c: number, v: number) => {
    const next = matrixB.map((rowArr, i) =>
      rowArr.map((cell, j) => (i === r && j === c ? v : cell))
    );
    setMatrixB(next);
  };

  const rowA = matrixA[activeCell.r] || [];
  const colB = matrixB.map((row) => row[activeCell.c] ?? 0);
  const terms = rowA.map((a, k) => ({
    a,
    b: colB[k] ?? 0,
    prod: a * (colB[k] ?? 0),
  }));
  const cellSum = terms.reduce((acc, t) => acc + t.prod, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E5F3E9] text-[#3F7951]">
              Unit 3 • Lab 2
            </span>
            <span className="text-sm text-slate-500 font-medium">Matrix Multiplication & Dimension Engine</span>
          </div>
          <p className="text-xs text-slate-600">
            Verify dimension compatibility and trace row-by-column inner product summations across rectangular matrix pairs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMatrixA([[1, 2, 0], [3, -1, 4]]);
              setMatrixB([[2, 1], [0, 3], [-1, 2]]);
              setActiveCell({ r: 0, c: 0 });
            }}
            className="text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>

          <Button
            onClick={() => completeLab('matrix-multiplication')}
            variant={isDone ? 'outline' : 'primary'}
            size="sm"
            className={isDone ? 'border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100' : 'bg-[#3F7951] hover:bg-[#2e5c3c] text-white'}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            {isDone ? 'Completed' : 'Mark Lab Complete'}
          </Button>
        </div>
      </div>

      {/* Dimension verification callout */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <span className="font-bold text-slate-800">Dimensional Equation:</span>
          <p className="text-slate-600 font-mono">
            A({rA} × <span className="text-sky-700 font-bold">{cA}</span>) @ B(<span className="text-emerald-700 font-bold">{rB}</span> × {cB}) ➔ C({rA} × {cB})
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full font-bold text-xs ${isCompatible ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>
          {isCompatible ? '✓ Dimensions Compatible' : '✗ Inner Dimensions Mismatch'}
        </span>
      </div>

      {/* Matrix Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Matrix A (2x3) */}
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-sky-800">
            <span>Matrix A ({rA}×{cA})</span>
            <span className="text-[11px] font-normal text-sky-600">Row {activeCell.r + 1} Selected</span>
          </div>

          <div className="p-2 bg-slate-50 rounded-lg flex justify-center">
            <div className="flex flex-col gap-1.5">
              {matrixA.map((rowArr, rIdx) => (
                <div key={rIdx} className="flex gap-1.5">
                  {rowArr.map((cell, cIdx) => (
                    <input
                      key={cIdx}
                      type="number"
                      value={cell}
                      onChange={(e) => handleCellA(rIdx, cIdx, parseFloat(e.target.value) || 0)}
                      className={`w-11 h-9 text-center font-mono font-bold text-xs rounded border transition-all ${
                        rIdx === activeCell.r
                          ? 'bg-sky-100 border-sky-400 text-sky-950 ring-2 ring-sky-300'
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Multiply Symbol */}
        <div className="lg:col-span-1 text-center font-bold text-slate-400 text-xl">
          ×
        </div>

        {/* Matrix B (3x2) */}
        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-emerald-800">
            <span>Matrix B ({rB}×{cB})</span>
            <span className="text-[11px] font-normal text-emerald-600">Col {activeCell.c + 1} Selected</span>
          </div>

          <div className="p-2 bg-slate-50 rounded-lg flex justify-center">
            <div className="flex flex-col gap-1.5">
              {matrixB.map((rowArr, rIdx) => (
                <div key={rIdx} className="flex gap-1.5">
                  {rowArr.map((cell, cIdx) => (
                    <input
                      key={cIdx}
                      type="number"
                      value={cell}
                      onChange={(e) => handleCellB(rIdx, cIdx, parseFloat(e.target.value) || 0)}
                      className={`w-11 h-9 text-center font-mono font-bold text-xs rounded border transition-all ${
                        cIdx === activeCell.c
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300'
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Equals Symbol */}
        <div className="lg:col-span-1 text-center font-bold text-slate-400 text-xl">
          =
        </div>

        {/* Product Matrix C (2x2) */}
        <div className="lg:col-span-3 bg-[#E5F3E9]/60 p-4 rounded-xl border border-[#B8DCC3] shadow-sm space-y-2">
          <div className="text-xs font-bold text-[#3F7951]">
            Product C ({rA}×{cB})
          </div>

          {resultMatrix ? (
            <div className="p-2 bg-white rounded-lg border border-[#B8DCC3] flex justify-center">
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                {resultMatrix.map((rowArr, rIdx) => (
                  <div key={rIdx} className="flex gap-1.5">
                    {rowArr.map((val, cIdx) => {
                      const isSel = rIdx === activeCell.r && cIdx === activeCell.c;
                      return (
                        <button
                          key={cIdx}
                          onClick={() => setActiveCell({ r: rIdx, c: cIdx })}
                          className={`w-12 h-9 text-center font-bold rounded border transition-all cursor-pointer ${
                            isSel
                              ? 'bg-[#3F7951] text-white border-[#3F7951] ring-2 ring-[#8FC7A3]'
                              : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-[#E5F3E9]'
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-xs text-red-600 text-center py-4">Incompatible</div>
          )}
        </div>
      </div>

      {/* Row-by-Column Formula Breakdown */}
      {resultMatrix && (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center text-slate-800 font-bold font-sans border-b border-slate-200 pb-1.5">
            <span>Entry c_{activeCell.r + 1}{activeCell.c + 1} Dot Product:</span>
            <span className="text-[#3F7951] font-mono text-sm">Value = {cellSum}</span>
          </div>

          <div className="space-y-1 text-slate-700">
            <p>• Vector A (Row {activeCell.r + 1}): <span className="text-sky-700 font-bold">[{rowA.join(', ')}]</span></p>
            <p>• Vector B (Col {activeCell.c + 1}): <span className="text-emerald-700 font-bold">[{colB.join(', ')}]^T</span></p>
            <p className="pt-1 text-slate-900 font-semibold">
              • Sum: {terms.map((t, idx) => (
                <span key={idx}>({t.a} × {t.b}){idx < terms.length - 1 ? ' + ' : ''}</span>
              ))} = <span className="text-[#3F7951] font-bold">{cellSum}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
