'use client';

import React, { useState } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import {
  matrixAdd,
  matrixSubtract,
  scalarMultiplyMatrix,
  transpose,
  determinant2x2,
  Matrix2D,
} from '@/lib/matrixMath';

export const MatrixOperationsLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-3');
  const isDone = isLabCompleted('matrices');

  const [matrixA, setMatrixA] = useState<Matrix2D>([
    [2, 4],
    [1, 3],
  ]);
  const [matrixB, setMatrixB] = useState<Matrix2D>([
    [1, -1],
    [2, 0],
  ]);
  const [scalar, setScalar] = useState<number>(2);
  const [op, setOp] = useState<'add' | 'sub' | 'scale' | 'transpose'>('add');

  const handleCellA = (r: number, c: number, v: number) => {
    const next: Matrix2D = [
      [...matrixA[0]] as [number, number],
      [...matrixA[1]] as [number, number],
    ];
    next[r][c] = v;
    setMatrixA(next);
  };

  const handleCellB = (r: number, c: number, v: number) => {
    const next: Matrix2D = [
      [...matrixB[0]] as [number, number],
      [...matrixB[1]] as [number, number],
    ];
    next[r][c] = v;
    setMatrixB(next);
  };

  let resultMatrix: number[][] = [];
  if (op === 'add') {
    resultMatrix = matrixAdd(matrixA, matrixB);
  } else if (op === 'sub') {
    resultMatrix = matrixSubtract(matrixA, matrixB);
  } else if (op === 'scale') {
    resultMatrix = scalarMultiplyMatrix(matrixA, scalar);
  } else if (op === 'transpose') {
    resultMatrix = transpose(matrixA);
  }

  const detA = determinant2x2(matrixA);
  const detB = determinant2x2(matrixB);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E5F3E9] text-[#3F7951]">
              Unit 3 • Lab 1
            </span>
            <span className="text-sm text-slate-500 font-medium">Matrix Arithmetic & Transformations</span>
          </div>
          <p className="text-xs text-slate-600">
            Execute elementwise matrix arithmetic, scalar updates, transpositions, and analyze determinant invariants.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMatrixA([[2, 4], [1, 3]]);
              setMatrixB([[1, -1], [2, 0]]);
              setScalar(2);
              setOp('add');
            }}
            className="text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>

          <Button
            onClick={() => completeLab('matrices')}
            variant={isDone ? 'outline' : 'primary'}
            size="sm"
            className={isDone ? 'border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100' : 'bg-[#3F7951] hover:bg-[#2e5c3c] text-white'}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            {isDone ? 'Completed' : 'Mark Lab Complete'}
          </Button>
        </div>
      </div>

      {/* Operation Selection */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Select Matrix Arithmetic Operation
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => setOp('add')}
            className={`py-2 text-xs font-medium rounded-lg border transition-all ${
              op === 'add'
                ? 'bg-[#E5F3E9] border-[#8FC7A3] text-[#3F7951] font-bold shadow-xs'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Addition (A + B)
          </button>
          <button
            onClick={() => setOp('sub')}
            className={`py-2 text-xs font-medium rounded-lg border transition-all ${
              op === 'sub'
                ? 'bg-[#E5F3E9] border-[#8FC7A3] text-[#3F7951] font-bold shadow-xs'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Subtraction (A - B)
          </button>
          <button
            onClick={() => setOp('scale')}
            className={`py-2 text-xs font-medium rounded-lg border transition-all ${
              op === 'scale'
                ? 'bg-[#E5F3E9] border-[#8FC7A3] text-[#3F7951] font-bold shadow-xs'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Scaling (c · A)
          </button>
          <button
            onClick={() => setOp('transpose')}
            className={`py-2 text-xs font-medium rounded-lg border transition-all ${
              op === 'transpose'
                ? 'bg-[#E5F3E9] border-[#8FC7A3] text-[#3F7951] font-bold shadow-xs'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Transpose (A^T)
          </button>
        </div>
      </div>

      {/* Main Grid: Input Matrices and Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Matrix A Editor */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-sky-800">
            <span>Matrix A (2×2)</span>
            <span className="font-mono bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              det={detA.toFixed(1)}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-2 gap-2 font-mono">
              <input
                type="number"
                value={matrixA[0][0]}
                onChange={(e) => handleCellA(0, 0, parseFloat(e.target.value) || 0)}
                className="w-14 h-10 text-center font-bold bg-white border border-slate-300 rounded shadow-inner"
              />
              <input
                type="number"
                value={matrixA[0][1]}
                onChange={(e) => handleCellA(0, 1, parseFloat(e.target.value) || 0)}
                className="w-14 h-10 text-center font-bold bg-white border border-slate-300 rounded shadow-inner"
              />
              <input
                type="number"
                value={matrixA[1][0]}
                onChange={(e) => handleCellA(1, 0, parseFloat(e.target.value) || 0)}
                className="w-14 h-10 text-center font-bold bg-white border border-slate-300 rounded shadow-inner"
              />
              <input
                type="number"
                value={matrixA[1][1]}
                onChange={(e) => handleCellA(1, 1, parseFloat(e.target.value) || 0)}
                className="w-14 h-10 text-center font-bold bg-white border border-slate-300 rounded shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Operator Symbol / Middle Control */}
        <div className="lg:col-span-1 text-center font-bold text-slate-500 text-xl">
          {op === 'add' ? '+' : op === 'sub' ? '-' : op === 'scale' ? '×' : '↦'}
        </div>

        {/* Matrix B or Scalar Input */}
        <div className="lg:col-span-3 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          {op === 'add' || op === 'sub' ? (
            <>
              <div className="flex justify-between items-center text-xs font-bold text-emerald-800">
                <span>Matrix B (2×2)</span>
                <span className="font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  det={detB.toFixed(1)}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-2 gap-2 font-mono">
                  <input
                    type="number"
                    value={matrixB[0][0]}
                    onChange={(e) => handleCellB(0, 0, parseFloat(e.target.value) || 0)}
                    className="w-14 h-10 text-center font-bold bg-white border border-slate-300 rounded shadow-inner"
                  />
                  <input
                    type="number"
                    value={matrixB[0][1]}
                    onChange={(e) => handleCellB(0, 1, parseFloat(e.target.value) || 0)}
                    className="w-14 h-10 text-center font-bold bg-white border border-slate-300 rounded shadow-inner"
                  />
                  <input
                    type="number"
                    value={matrixB[1][0]}
                    onChange={(e) => handleCellB(1, 0, parseFloat(e.target.value) || 0)}
                    className="w-14 h-10 text-center font-bold bg-white border border-slate-300 rounded shadow-inner"
                  />
                  <input
                    type="number"
                    value={matrixB[1][1]}
                    onChange={(e) => handleCellB(1, 1, parseFloat(e.target.value) || 0)}
                    className="w-14 h-10 text-center font-bold bg-white border border-slate-300 rounded shadow-inner"
                  />
                </div>
              </div>
            </>
          ) : op === 'scale' ? (
            <div className="space-y-2 py-2">
              <span className="text-xs font-bold text-[#3F7951] uppercase tracking-wider block">
                Scalar Multiplier (c)
              </span>
              <div className="text-xl font-bold font-mono text-center text-[#3F7951]">
                c = {scalar}
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.5"
                value={scalar}
                onChange={(e) => setScalar(parseFloat(e.target.value))}
                className="w-full accent-[#3F7951]"
              />
            </div>
          ) : (
            <div className="text-xs text-slate-500 text-center py-6">
              Transposition swaps rows and columns of Matrix A directly.
            </div>
          )}
        </div>

        {/* Equals Sign */}
        <div className="lg:col-span-1 text-center font-bold text-slate-500 text-xl">
          =
        </div>

        {/* Output Matrix */}
        <div className="lg:col-span-3 bg-[#E5F3E9]/50 p-5 rounded-xl border border-[#B8DCC3] shadow-sm space-y-3">
          <div className="text-xs font-bold text-[#3F7951]">
            Resulting Matrix (2×2)
          </div>

          <div className="p-3 bg-white rounded-lg border border-[#B8DCC3] flex items-center justify-center shadow-xs">
            <div className="grid grid-cols-2 gap-3 font-mono text-sm font-bold text-[#3F7951]">
              <div className="w-12 h-10 flex items-center justify-center bg-slate-50 rounded border border-slate-200">
                {resultMatrix[0]?.[0]}
              </div>
              <div className="w-12 h-10 flex items-center justify-center bg-slate-50 rounded border border-slate-200">
                {resultMatrix[0]?.[1]}
              </div>
              <div className="w-12 h-10 flex items-center justify-center bg-slate-50 rounded border border-slate-200">
                {resultMatrix[1]?.[0]}
              </div>
              <div className="w-12 h-10 flex items-center justify-center bg-slate-50 rounded border border-slate-200">
                {resultMatrix[1]?.[1]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
