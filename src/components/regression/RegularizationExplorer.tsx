'use client';

import React, { useState, useMemo } from 'react';
import {
  standardizeFeatures,
  matrixOLS,
  ridgeRegression,
  lassoRegression,
  MultipleRegressionResult
} from '@/lib/regressionMath';
import { Sliders, Shield, Scissors, Info } from 'lucide-react';

const FEATURE_NAMES = [
  'Square Footage (x₁)',
  'Number of Bedrooms (x₂)',
  'Property Age (x₃)',
  'Distance to Transit (x₄)',
  'School District Score (x₅)'
];

// Raw housing pricing dataset (n = 12 instances, p = 5 features)
const RAW_X = [
  [1200, 2, 15, 2.5, 7.8],
  [1450, 3, 10, 1.8, 8.2],
  [1700, 3, 5, 1.2, 8.9],
  [1950, 4, 20, 3.1, 7.5],
  [2200, 4, 2, 0.8, 9.4],
  [2400, 4, 12, 1.5, 8.7],
  [2700, 5, 8, 0.9, 9.1],
  [1350, 2, 25, 4.0, 6.8],
  [1600, 3, 18, 2.2, 7.9],
  [2100, 4, 6, 1.1, 8.8],
  [2550, 5, 3, 0.7, 9.6],
  [1800, 3, 14, 2.0, 8.0]
];

// Target prices in thousands ($k)
const RAW_Y = [285, 340, 410, 395, 520, 490, 580, 260, 355, 475, 595, 390];

export const RegularizationExplorer: React.FC = () => {
  const [modelType, setModelType] = useState<'ridge' | 'lasso'>('lasso');
  const [lambda, setLambda] = useState<number>(2.5);

  // Standardize features
  const { standardized: stdX } = useMemo(() => {
    return standardizeFeatures(RAW_X);
  }, []);

  // Compute unregularized OLS baseline
  const olsBaseline = useMemo(() => {
    return matrixOLS(stdX, RAW_Y, true);
  }, [stdX]);

  // Compute regularized model
  const regResult: MultipleRegressionResult = useMemo(() => {
    if (modelType === 'ridge') {
      return ridgeRegression(stdX, RAW_Y, lambda, true);
    } else {
      return lassoRegression(stdX, RAW_Y, lambda, 1500, 1e-6);
    }
  }, [modelType, stdX, lambda]);

  const activeFeaturesCount = regResult.coefficients.filter(
    (c) => Math.abs(c) > 0.01
  ).length;

  // Maximum coefficient magnitude for bar chart scaling
  const maxCoeffMagnitude = useMemo(() => {
    const allCoeffs = [...olsBaseline.coefficients, ...regResult.coefficients];
    return Math.max(...allCoeffs.map((c) => Math.abs(c)), 10);
  }, [olsBaseline, regResult]);

  return (
    <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FAF2D8] text-[#806A28]">
              <Sliders className="w-4 h-4" />
            </span>
            Ridge (L2) & Lasso (L1) Regularization Explorer
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Compare L2 coefficient shrinkage against L1 exact sparsity as penalty strength (λ) increases.
          </p>
        </div>

        {/* Model Type Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setModelType('ridge')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              modelType === 'ridge'
                ? 'bg-[#806A28] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Ridge (L2 Shrinkage)
          </button>
          <button
            onClick={() => setModelType('lasso')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              modelType === 'lasso'
                ? 'bg-[#806A28] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            Lasso (L1 Sparsity)
          </button>
        </div>
      </div>

      {/* Lambda Slider Control */}
      <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-[#0F172A]">
              Regularization Strength (λ):
            </label>
            <span className="font-mono font-bold text-sm px-2 py-0.5 bg-[#FAF2D8] text-[#806A28] rounded-md border border-[#EBD99A]">
              λ = {lambda.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-1.5">
            {[0, 1.0, 5.0, 15.0, 40.0].map((val) => (
              <button
                key={val}
                onClick={() => setLambda(val)}
                className="px-2 py-0.5 text-[11px] font-semibold bg-white border border-[#CBD5E1] rounded hover:bg-[#FAF2D8] text-[#475569] cursor-pointer"
              >
                {val === 0 ? 'λ=0 (OLS)' : `λ=${val}`}
              </button>
            ))}
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={50}
          step={0.5}
          value={lambda}
          onChange={(e) => setLambda(parseFloat(e.target.value))}
          className="w-full accent-[#E8C878] cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-[#94A3B8]">
          <span>λ = 0 (Unregularized OLS)</span>
          <span>Moderate Penalty</span>
          <span>λ = 50 (Heavy Regularization / Sparsity)</span>
        </div>
      </div>

      {/* Real-Time Coefficients Bar Chart */}
      <div className="space-y-3 bg-[#FAFAFA] p-4 rounded-xl border border-[#E2E8F0]">
        <div className="flex items-center justify-between text-xs pb-1 border-b border-[#E2E8F0]">
          <span className="font-bold text-[#0F172A]">Standardized Feature Weights (β̂ⱼ)</span>
          <span className="text-[11px] text-[#64748B]">
            Active Features: <strong className="text-[#806A28]">{activeFeaturesCount} of 5</strong>
          </span>
        </div>

        <div className="space-y-3">
          {FEATURE_NAMES.map((name, j) => {
            const rawCoeff = regResult.coefficients[j] ?? 0;
            const olsCoeff = olsBaseline.coefficients[j] ?? 0;
            const isZero = Math.abs(rawCoeff) < 0.01;
            const barWidthPercent = (Math.abs(rawCoeff) / maxCoeffMagnitude) * 100;
            const olsWidthPercent = (Math.abs(olsCoeff) / maxCoeffMagnitude) * 100;

            return (
              <div key={name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#334155]">{name}</span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    {isZero ? (
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-700 font-bold rounded text-[10px]">
                        0.00 (Zeroed / Dropped)
                      </span>
                    ) : (
                      <span className="font-bold text-[#0F172A]">{rawCoeff.toFixed(2)}</span>
                    )}
                    <span className="text-[10px] text-[#94A3B8]">(OLS: {olsCoeff.toFixed(2)})</span>
                  </div>
                </div>

                {/* Progress bar comparison */}
                <div className="h-3 w-full bg-[#E2E8F0] rounded-full overflow-hidden relative">
                  {/* OLS ghost bar */}
                  <div
                    className="absolute top-0 bottom-0 bg-slate-300 rounded-full opacity-60"
                    style={{ width: `${Math.min(100, olsWidthPercent)}%` }}
                  ></div>
                  {/* Active regularized bar */}
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isZero
                        ? 'bg-transparent'
                        : rawCoeff > 0
                        ? 'bg-[#806A28]'
                        : 'bg-amber-600'
                    }`}
                    style={{ width: `${Math.min(100, barWidthPercent)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Insight Box */}
      <div className="p-4 bg-[#FAF2D8]/60 rounded-xl border border-[#EBD99A] text-xs text-[#806A28] flex items-start gap-2.5">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#0F172A]">
            {modelType === 'ridge' ? 'Ridge Regression (L2):' : 'Lasso Regression (L1):'}
          </strong>{' '}
          {modelType === 'ridge'
            ? 'Smoothly shrinks all weights toward 0 as λ increases, stabilizing the matrix against multicollinearity without eliminating any feature entirely.'
            : 'Performs automated feature selection! As λ increases, the least informative features (e.g., Property Age, Distance) drop to exactly 0.00, simplifying the model into a sparse predictor.'}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-[#FAF2D8]/60 border border-[#EBD99A] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#806A28]">Active Features</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            {activeFeaturesCount} / 5
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#64748B]">R² (Explained Variance)</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            {(regResult.rSquared * 100).toFixed(1)}%
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#64748B]">Model RMSE</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            ${regResult.rmse.toFixed(1)}k
          </div>
        </div>

        <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
          <div className="text-[11px] font-semibold text-[#64748B]">Intercept (β₀)</div>
          <div className="text-lg font-mono font-bold text-[#0F172A] mt-0.5">
            ${regResult.intercept.toFixed(1)}k
          </div>
        </div>
      </div>
    </div>
  );
};
