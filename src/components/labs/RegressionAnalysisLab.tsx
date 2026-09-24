'use client';

import React, { useState, useMemo } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Check } from 'lucide-react';
import { linearRegression } from '@/lib/regressionMath';

interface LabDataset {
  id: string;
  name: string;
  xLabel: string;
  yLabel: string;
  x: number[];
  y: number[];
}

const DATASETS: LabDataset[] = [
  {
    id: 'ecommerce',
    name: 'E-Commerce Marketing (Ad Spend vs Sales)',
    xLabel: 'Ad Spend ($k)',
    yLabel: 'Sales ($k)',
    x: [2.5, 3.8, 5.0, 6.2, 7.5, 8.9, 10.1, 11.4, 12.8, 14.0],
    y: [15.2, 22.1, 28.4, 34.0, 42.1, 49.3, 56.8, 62.5, 71.0, 78.4],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing (Machine Temp vs Defect Rate)',
    xLabel: 'Operating Temp (°C)',
    yLabel: 'Defects / 1k Units',
    x: [65, 70, 75, 80, 85, 90, 95, 100, 105, 110],
    y: [4.2, 5.1, 6.8, 8.4, 11.2, 14.9, 19.5, 25.1, 31.8, 40.2],
  },
  {
    id: 'realestate',
    name: 'Real Estate (Home Size vs Price)',
    xLabel: 'Living Area (sq ft / 100)',
    yLabel: 'Sale Price ($k)',
    x: [12, 15, 18, 20, 24, 28, 32, 35, 40, 45],
    y: [220, 265, 310, 335, 410, 475, 540, 580, 660, 750],
  },
];

export const RegressionAnalysisLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-5');
  const isDone = isLabCompleted('regression');

  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('ecommerce');
  const [predictionInputX, setPredictionInputX] = useState<number>(8.0);

  const dataset = useMemo(() => {
    return DATASETS.find((d) => d.id === selectedDatasetId) || DATASETS[0];
  }, [selectedDatasetId]);

  const ols = useMemo(() => {
    return linearRegression(dataset.x, dataset.y);
  }, [dataset]);

  const predictedPointY = useMemo(() => {
    return ols.intercept + ols.slope * predictionInputX;
  }, [ols, predictionInputX]);

  return (
    <div className="space-y-8">
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#FAF2D8] text-[#806A28]">
                <TrendingUp className="w-4 h-4" />
              </span>
              Simple Linear Regression & Prediction Lab
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Estimate least-squares slopes, intercepts, residuals, and generate model predictions across empirical datasets.
            </p>
          </div>

          {/* Dataset Selector */}
          <div className="flex flex-wrap gap-2">
            {DATASETS.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDatasetId(d.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  selectedDatasetId === d.id
                    ? 'bg-[#FAF2D8] text-[#806A28] border-[#EBD99A] shadow-xs'
                    : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:bg-[#FAF2D8]/50'
                }`}
              >
                {d.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Prediction Engine Box */}
        <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0F172A]">
              Generate Point Prediction for {dataset.xLabel}:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={predictionInputX}
                onChange={(e) => setPredictionInputX(parseFloat(e.target.value) || 0)}
                className="w-32 px-3 py-2 bg-white border border-[#CBD5E1] rounded-lg text-sm font-mono font-bold text-[#0F172A]"
              />
              <span className="text-xs text-[#64748B]">
                (Observed Range: [{Math.min(...dataset.x)}, {Math.max(...dataset.x)}])
              </span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-[#64748B]">Predicted Target (ŷ)</div>
              <div className="text-lg font-mono font-bold text-[#806A28]">
                {predictedPointY.toFixed(2)}
              </div>
            </div>
            <div className="text-right text-[11px] font-mono text-[#64748B]">
              ŷ = {ols.intercept.toFixed(2)} + {ols.slope.toFixed(2)} * ({predictionInputX})
            </div>
          </div>
        </div>

        {/* Residuals Table & Calculations */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#0F172A]">Observation Residual Table</h4>
            <span className="text-[11px] text-[#64748B]">n = {dataset.x.length} observations</span>
          </div>

          <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold">
                <tr>
                  <th className="p-2.5">i</th>
                  <th className="p-2.5">{dataset.xLabel} (xᵢ)</th>
                  <th className="p-2.5">{dataset.yLabel} (yᵢ)</th>
                  <th className="p-2.5">Fitted (ŷᵢ)</th>
                  <th className="p-2.5">Residual (eᵢ = yᵢ - ŷᵢ)</th>
                  <th className="p-2.5">Squared Error (eᵢ²)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] font-mono">
                {dataset.x.map((xi, i) => {
                  const yi = dataset.y[i];
                  const yPred = ols.predictions[i];
                  const res = ols.residuals[i];
                  const sqErr = res * res;
                  return (
                    <tr key={i} className="hover:bg-[#FAF2D8]/20">
                      <td className="p-2.5 text-[#64748B]">{i + 1}</td>
                      <td className="p-2.5 font-bold text-[#0F172A]">{xi}</td>
                      <td className="p-2.5 text-[#0F172A]">{yi}</td>
                      <td className="p-2.5 text-[#806A28]">{yPred.toFixed(2)}</td>
                      <td className={`p-2.5 font-bold ${res >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {res >= 0 ? `+${res.toFixed(2)}` : res.toFixed(2)}
                      </td>
                      <td className="p-2.5 text-[#64748B]">{sqErr.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Aggregate Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-[#FAF2D8]/60 border border-[#EBD99A] rounded-xl text-center">
            <div className="text-[11px] font-semibold text-[#806A28]">Estimated Slope (β̂₁)</div>
            <div className="text-base font-mono font-bold text-[#0F172A] mt-0.5">
              {ols.slope.toFixed(3)}
            </div>
          </div>

          <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
            <div className="text-[11px] font-semibold text-[#64748B]">Estimated Intercept (β̂₀)</div>
            <div className="text-base font-mono font-bold text-[#0F172A] mt-0.5">
              {ols.intercept.toFixed(3)}
            </div>
          </div>

          <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
            <div className="text-[11px] font-semibold text-[#64748B]">Goodness of Fit (R²)</div>
            <div className="text-base font-mono font-bold text-emerald-700 mt-0.5">
              {(ols.rSquared * 100).toFixed(1)}%
            </div>
          </div>

          <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-center">
            <div className="text-[11px] font-semibold text-[#64748B]">Model RMSE</div>
            <div className="text-base font-mono font-bold text-[#0F172A] mt-0.5">
              {ols.rmse.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Completion Control */}
        <div className="pt-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#64748B]">
            {isDone ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Lab Completed & Logged to Unit 5 Progress
              </span>
            ) : (
              'Experiment with datasets and generate predictions to complete this lab.'
            )}
          </div>

          <Button
            onClick={() => completeLab('regression')}
            disabled={isDone}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              isDone
                ? 'bg-[#FAF2D8] text-[#806A28] border border-[#EBD99A] cursor-default'
                : 'bg-[#806A28] hover:bg-[#6A5720] text-white shadow-xs cursor-pointer'
            }`}
          >
            {isDone ? 'Lab Completed' : 'Complete Regression Lab'}
          </Button>
        </div>
      </div>
    </div>
  );
};
