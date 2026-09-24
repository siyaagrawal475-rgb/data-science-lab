'use client';

import React, { useState } from 'react';
import {
  transpose,
  determinant2x2,
  inverse2x2,
  rank2x2,
  Matrix,
  matrixDimensions,
} from '@/lib/matrixMath';

export const MatrixPlayground: React.FC = () => {
  const [rows, setRows] = useState<number>(2);
  const [cols, setCols] = useState<number>(2);
  const [matrix, setMatrix] = useState<Matrix>([
    [2, 1],
    [1, 3],
  ]);

  const handleCellChange = (r: number, c: number, val: number) => {
    const next = matrix.map((rowArr, i) =>
      rowArr.map((cell, j) => (i === r && j === c ? val : cell))
    );
    setMatrix(next);
  };

  const handleResize = (newR: number, newC: number) => {
    const next: Matrix = [];
    for (let i = 0; i < newR; i++) {
      const row: number[] = [];
      for (let j = 0; j < newC; j++) {
        row.push(matrix[i]?.[j] ?? (i === j ? 1 : 0));
      }
      next.push(row);
    }
    setRows(newR);
    setCols(newC);
    setMatrix(next);
  };

  const [mRows, mCols] = matrixDimensions(matrix);
  const isSquare = mRows === mCols && mRows > 0;
  const is2x2 = mRows === 2 && mCols === 2;

  const matTranspose = transpose(matrix);
  const det = is2x2 ? determinant2x2(matrix) : null;
  const inv = is2x2 ? inverse2x2(matrix) : null;
  const rank = is2x2 ? rank2x2(matrix) : null;

  return (
    <div className="bg-white border border-[#B8DCC3] rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5F3E9] pb-3">
        <div>
          <h4 className="text-base font-semibold text-slate-800">Interactive Matrix Playground</h4>
          <p className="text-xs text-slate-500">
            Edit matrix elements, toggle dimensions, and examine transposition, determinants, and inverses.
          </p>
        </div>

        {/* Presets & Resets */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setRows(2);
              setCols(2);
              setMatrix([[2, 1], [1, 3]]);
            }}
            className="px-2.5 py-1 text-xs rounded bg-[#E5F3E9] text-[#3F7951] hover:bg-[#8FC7A3]/30 transition-colors font-medium"
          >
            2×2 Default
          </button>
          <button
            onClick={() => {
              setRows(2);
              setCols(2);
              setMatrix([[1, 0], [0, 1]]);
            }}
            className="px-2.5 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium"
          >
            Identity (I)
          </button>
          <button
            onClick={() => {
              setRows(2);
              setCols(3);
              setMatrix([[1, 2, 3], [4, 5, 6]]);
            }}
            className="px-2.5 py-1 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium"
          >
            2×3 Rectangular
          </button>
          <button
            onClick={() => {
              setRows(2);
              setCols(2);
              setMatrix([[2, 4], [1, 2]]);
            }}
            className="px-2.5 py-1 text-xs rounded bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors font-medium"
          >
            Singular (det=0)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Matrix Grid Input */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3F7951] uppercase tracking-wider">
              Matrix A ({mRows} × {mCols})
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Size:</span>
              <button
                onClick={() => handleResize(2, 2)}
                className={`px-2 py-0.5 rounded border text-xs font-mono ${rows === 2 && cols === 2 ? 'bg-[#E5F3E9] border-[#8FC7A3] text-[#3F7951] font-bold' : 'border-slate-200'}`}
              >
                2×2
              </button>
              <button
                onClick={() => handleResize(2, 3)}
                className={`px-2 py-0.5 rounded border text-xs font-mono ${rows === 2 && cols === 3 ? 'bg-[#E5F3E9] border-[#8FC7A3] text-[#3F7951] font-bold' : 'border-slate-200'}`}
              >
                2×3
              </button>
              <button
                onClick={() => handleResize(3, 3)}
                className={`px-2 py-0.5 rounded border text-xs font-mono ${rows === 3 && cols === 3 ? 'bg-[#E5F3E9] border-[#8FC7A3] text-[#3F7951] font-bold' : 'border-slate-200'}`}
              >
                3×3
              </button>
            </div>
          </div>

          {/* Matrix Brackets Display & Editor */}
          <div className="flex items-center justify-center p-6 bg-slate-50/70 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-1 font-mono text-sm">
              <span className="text-2xl font-light text-slate-400 select-none">[</span>
              <div className="flex flex-col gap-2">
                {matrix.map((rowArr, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2">
                    {rowArr.map((cell, cIdx) => (
                      <div key={cIdx} className="relative">
                        <input
                          type="number"
                          step="0.5"
                          value={cell}
                          onChange={(e) =>
                            handleCellChange(rIdx, cIdx, parseFloat(e.target.value) || 0)
                          }
                          className="w-14 h-10 text-center font-bold font-mono text-slate-800 bg-white border border-slate-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#8FC7A3] focus:border-transparent transition-all"
                        />
                        <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 text-[9px] text-slate-400 font-sans select-none">
                          a_{rIdx + 1}{cIdx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <span className="text-2xl font-light text-slate-400 select-none">]</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <span>Dimensions: <strong className="text-slate-800 font-mono">{mRows} rows × {mCols} cols</strong></span>
            <span>Type: <strong className="text-slate-800">{isSquare ? 'Square Matrix' : 'Rectangular Matrix'}</strong></span>
          </div>
        </div>

        {/* Right Column: Computed Properties */}
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Mathematical Properties & Derivations
          </span>

          {/* Transpose Display */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Transpose Matrix A^T</span>
              <span className="text-slate-500 font-mono text-[11px]">{mCols} × {mRows}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs flex justify-center items-center gap-1">
              <span>[</span>
              <div className="flex flex-col gap-1">
                {matTranspose.map((rowArr, i) => (
                  <div key={i} className="flex gap-3">
                    {rowArr.map((v, j) => (
                      <span key={j} className="w-8 text-center text-slate-800 font-semibold">{v}</span>
                    ))}
                  </div>
                ))}
              </div>
              <span>]</span>
            </div>
          </div>

          {/* Determinant & Rank (if square 2x2) */}
          {is2x2 && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200 space-y-1">
                <span className="text-[11px] font-semibold text-emerald-900 block">Determinant det(A)</span>
                <span className="text-xl font-bold font-mono text-emerald-800">
                  {det !== null ? det.toFixed(2) : 'N/A'}
                </span>
                <span className="text-[10px] text-emerald-700 block">
                  ad - bc = ({matrix[0][0]})({matrix[1][1]}) - ({matrix[0][1]})({matrix[1][0]})
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[11px] font-semibold text-slate-700 block">Matrix Rank</span>
                <span className="text-xl font-bold font-mono text-slate-900">
                  {rank !== null ? `Rank ${rank}` : 'N/A'}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {rank === 2 ? 'Full Rank (Independent)' : 'Rank Deficient (Collinear)'}
                </span>
              </div>
            </div>
          )}

          {/* Inverse Matrix Result (if 2x2) */}
          {is2x2 && (
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Inverse Matrix A⁻¹</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${inv ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {inv ? 'Invertible (det ≠ 0)' : 'Singular (Non-Invertible)'}
                </span>
              </div>

              {inv ? (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs flex justify-center items-center gap-1">
                  <span>[</span>
                  <div className="flex flex-col gap-1">
                    {inv.map((rowArr, i) => (
                      <div key={i} className="flex gap-4">
                        {rowArr.map((v, j) => (
                          <span key={j} className="w-12 text-center text-[#3F7951] font-semibold">
                            {v.toFixed(2)}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                  <span>]</span>
                </div>
              ) : (
                <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  ⚠️ Cannot compute inverse: determinant equals 0. The matrix maps 2D space onto a 1D line.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
