'use client';

import React, { useState } from 'react';
import {
  matrixMultiply,
  matrixDimensions,
  isMultiplicationCompatible,
  Matrix,
} from '@/lib/matrixMath';

export const MatrixMultiplicationExplorer: React.FC = () => {
  const [matrixA, setMatrixA] = useState<Matrix>([
    [1, 2],
    [3, 4],
  ]);
  const [matrixB, setMatrixB] = useState<Matrix>([
    [2, 0],
    [1, 3],
  ]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });

  const [rA, cA] = matrixDimensions(matrixA);
  const [rB, cB] = matrixDimensions(matrixB);
  const compatible = isMultiplicationCompatible(matrixA, matrixB);

  let resultMatrix: Matrix | null = null;
  if (compatible) {
    try {
      resultMatrix = matrixMultiply(matrixA, matrixB);
    } catch {
      resultMatrix = null;
    }
  }

  const handleCellChangeA = (r: number, c: number, val: number) => {
    const next = matrixA.map((rowArr, i) =>
      rowArr.map((cell, j) => (i === r && j === c ? val : cell))
    );
    setMatrixA(next);
  };

  const handleCellChangeB = (r: number, c: number, val: number) => {
    const next = matrixB.map((rowArr, i) =>
      rowArr.map((cell, j) => (i === r && j === c ? val : cell))
    );
    setMatrixB(next);
  };

  // Step breakdown for selected cell
  const rowA = matrixA[selectedCell.r] || [];
  const colB = matrixB.map((row) => row[selectedCell.c] ?? 0);
  const terms = rowA.map((a, k) => ({
    a,
    b: colB[k] ?? 0,
    prod: a * (colB[k] ?? 0),
  }));
  const totalSum = terms.reduce((acc, t) => acc + t.prod, 0);

  return (
    <div className="bg-white border border-[#B8DCC3] rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5F3E9] pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-800">Matrix Multiplication Explorer</h4>
          <p className="text-xs text-slate-500">
            Select any cell in product matrix C to trace the exact row-by-column dot product summation.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setMatrixA([[1, 2], [3, 4]]);
              setMatrixB([[2, 0], [1, 3]]);
              setSelectedCell({ r: 0, c: 0 });
            }}
            className="px-2.5 py-1 text-xs rounded bg-[#E5F3E9] text-[#3F7951] hover:bg-[#8FC7A3]/30 font-medium"
          >
            2×2 Standard
          </button>
          <button
            onClick={() => {
              setMatrixA([[1, 2, 3], [4, 5, 6]]);
              setMatrixB([[7, 8], [9, 1], [2, 3]]);
              setSelectedCell({ r: 0, c: 0 });
            }}
            className="px-2.5 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
          >
            2×3 × 3×2
          </button>
        </div>
      </div>

      {/* Compatibility Badge */}
      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Dimensions:</span>
          <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
            A ({rA}×{cA}) × B ({rB}×{cB}) = C ({rA}×{cB})
          </span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full font-semibold ${compatible ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
          {compatible ? `✓ Compatible (Inner Dimension = ${cA})` : `✗ Incompatible (${cA} ≠ ${rB})`}
        </span>
      </div>

      {/* Matrices Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Matrix A */}
        <div className="lg:col-span-4 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-2">
          <div className="flex justify-between text-xs font-bold text-sky-800">
            <span>Matrix A ({rA}×{cA})</span>
            <span className="text-sky-600 font-normal text-[11px]">Row {selectedCell.r + 1} active</span>
          </div>

          <div className="flex items-center justify-center p-2">
            <div className="flex flex-col gap-1.5 font-mono text-xs">
              {matrixA.map((rowArr, rIdx) => (
                <div key={rIdx} className="flex gap-1.5">
                  {rowArr.map((cell, cIdx) => {
                    const isRowActive = rIdx === selectedCell.r;
                    return (
                      <input
                        key={cIdx}
                        type="number"
                        step="0.5"
                        value={cell}
                        onChange={(e) =>
                          handleCellChangeA(rIdx, cIdx, parseFloat(e.target.value) || 0)
                        }
                        className={`w-12 h-9 text-center font-bold rounded border transition-all ${
                          isRowActive
                            ? 'bg-sky-100 border-sky-400 text-sky-950 ring-2 ring-sky-300'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Multiplication Symbol */}
        <div className="lg:col-span-1 text-center font-bold text-slate-400 text-xl select-none">
          ×
        </div>

        {/* Matrix B */}
        <div className="lg:col-span-4 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-2">
          <div className="flex justify-between text-xs font-bold text-emerald-800">
            <span>Matrix B ({rB}×{cB})</span>
            <span className="text-emerald-600 font-normal text-[11px]">Col {selectedCell.c + 1} active</span>
          </div>

          <div className="flex items-center justify-center p-2">
            <div className="flex flex-col gap-1.5 font-mono text-xs">
              {matrixB.map((rowArr, rIdx) => (
                <div key={rIdx} className="flex gap-1.5">
                  {rowArr.map((cell, cIdx) => {
                    const isColActive = cIdx === selectedCell.c;
                    return (
                      <input
                        key={cIdx}
                        type="number"
                        step="0.5"
                        value={cell}
                        onChange={(e) =>
                          handleCellChangeB(rIdx, cIdx, parseFloat(e.target.value) || 0)
                        }
                        className={`w-12 h-9 text-center font-bold rounded border transition-all ${
                          isColActive
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Equals Symbol */}
        <div className="lg:col-span-1 text-center font-bold text-slate-400 text-xl select-none">
          =
        </div>

        {/* Result Matrix C */}
        <div className="lg:col-span-2 bg-[#E5F3E9]/50 p-3.5 rounded-xl border border-[#B8DCC3] space-y-2">
          <div className="text-xs font-bold text-[#3F7951]">
            Product C ({rA}×{cB})
          </div>

          {resultMatrix ? (
            <div className="flex items-center justify-center p-2">
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                {resultMatrix.map((rowArr, rIdx) => (
                  <div key={rIdx} className="flex gap-1.5">
                    {rowArr.map((val, cIdx) => {
                      const isSelected =
                        rIdx === selectedCell.r && cIdx === selectedCell.c;
                      return (
                        <button
                          key={cIdx}
                          onClick={() => setSelectedCell({ r: rIdx, c: cIdx })}
                          className={`w-12 h-9 text-center font-bold rounded border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#3F7951] text-white border-[#3F7951] ring-2 ring-[#8FC7A3] shadow-sm'
                              : 'bg-white border-[#B8DCC3] text-slate-800 hover:bg-[#E5F3E9]'
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
            <div className="text-xs text-red-600 text-center py-4">Undefined</div>
          )}
        </div>
      </div>

      {/* Step-by-Step Dot Product Callout Box */}
      {resultMatrix && (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 font-mono text-xs">
          <div className="flex justify-between items-center text-slate-800 font-semibold font-sans border-b border-slate-200 pb-1.5">
            <span>Dot Product Breakdown for Entry c_{selectedCell.r + 1}{selectedCell.c + 1}:</span>
            <span className="text-[#3F7951] font-bold font-mono text-sm">
              Result = {totalSum}
            </span>
          </div>

          <div className="space-y-1.5 text-slate-700">
            <p>
              • Row {selectedCell.r + 1} of A: <span className="text-sky-700 font-bold">[{rowA.join(', ')}]</span>
            </p>
            <p>
              • Column {selectedCell.c + 1} of B: <span className="text-emerald-700 font-bold">[{colB.join(', ')}]^T</span>
            </p>
            <p className="pt-1 text-slate-900 font-semibold">
              • Dot product sum:{' '}
              {terms.map((t, idx) => (
                <span key={idx}>
                  ({t.a} × {t.b})
                  {idx < terms.length - 1 ? ' + ' : ''}
                </span>
              ))}{' '}
              ={' '}
              {terms.map((t, idx) => (
                <span key={idx}>
                  {t.prod}
                  {idx < terms.length - 1 ? ' + ' : ''}
                </span>
              ))}{' '}
              = <span className="text-[#3F7951] font-bold text-sm">{totalSum}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
