'use client';

import React, { useState, useMemo } from 'react';
import { Play, RotateCcw, BarChart3, Award } from 'lucide-react';
import { mean, standardDeviation, standardError } from '@/lib/statisticsMath';

type PopulationShape = 'uniform' | 'exponential' | 'bimodal' | 'normal';

export const SamplingDistributionExplorer: React.FC = () => {
  const [popShape, setPopShape] = useState<PopulationShape>('exponential');
  const [sampleSize, setSampleSize] = useState<number>(30);
  const [sampleMeans, setSampleMeans] = useState<number[]>([]);

  // Theoretical population parameters
  const { popMean, popStd, generateOneValue } = useMemo(() => {
    if (popShape === 'uniform') {
      // Uniform [0, 10]
      const mu = 5.0;
      const sigma = Math.sqrt(100 / 12); // ~2.887
      return {
        popMean: mu,
        popStd: sigma,
        generateOneValue: () => Math.random() * 10,
      };
    }
    if (popShape === 'exponential') {
      // Exponential with scale=4 (mean=4, std=4, right skewed)
      const mu = 4.0;
      const sigma = 4.0;
      return {
        popMean: mu,
        popStd: sigma,
        generateOneValue: () => -4.0 * Math.log(1 - Math.random()),
      };
    }
    if (popShape === 'bimodal') {
      // 50% from Normal(2, 0.8), 50% from Normal(8, 0.8)
      const mu = 5.0;
      const sigma = Math.sqrt(0.8 ** 2 + 3 ** 2); // ~3.10
      return {
        popMean: mu,
        popStd: sigma,
        generateOneValue: () => {
          const isLeft = Math.random() < 0.5;
          const center = isLeft ? 2 : 8;
          // Box-Muller normal sample
          const u1 = Math.max(1e-6, Math.random());
          const u2 = Math.random();
          const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
          return center + z * 0.8;
        },
      };
    }
    // Normal (mean=5, std=1.5)
    const mu = 5.0;
    const sigma = 1.5;
    return {
      popMean: mu,
      popStd: sigma,
      generateOneValue: () => {
        const u1 = Math.max(1e-6, Math.random());
        const u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return 5.0 + z * 1.5;
      },
    };
  }, [popShape]);

  const theoreticalSE = useMemo(() => {
    return standardError(popStd, sampleSize);
  }, [popStd, sampleSize]);

  // Draw batch of sample means
  const drawSamples = (numBatches: number) => {
    const newMeans: number[] = [];
    for (let b = 0; b < numBatches; b++) {
      let sum = 0;
      for (let i = 0; i < sampleSize; i++) {
        sum += generateOneValue();
      }
      newMeans.push(sum / sampleSize);
    }
    setSampleMeans((prev) => [...prev, ...newMeans]);
  };

  const handleShapeChange = (shape: PopulationShape) => {
    setPopShape(shape);
    setSampleMeans([]);
  };

  const handleSizeChange = (size: number) => {
    setSampleSize(size);
    setSampleMeans([]);
  };

  const resetSimulation = () => {
    setSampleMeans([]);
  };

  // Empirical stats of sample means
  const empiricalMeanOfMeans = sampleMeans.length > 0 ? mean(sampleMeans) : 0;
  const empiricalSE = sampleMeans.length > 1 ? standardDeviation(sampleMeans, true) : 0;

  // Build histogram of sample means
  const numBins = 24;
  const histRangeMin = popMean - 3.5 * (popStd / Math.sqrt(2));
  const histRangeMax = popMean + 3.5 * (popStd / Math.sqrt(2));
  const binWidth = (histRangeMax - histRangeMin) / numBins;

  const histogramBins = useMemo(() => {
    const bins = Array(numBins).fill(0);
    sampleMeans.forEach((val) => {
      const idx = Math.floor((val - histRangeMin) / binWidth);
      if (idx >= 0 && idx < numBins) {
        bins[idx]++;
      }
    });
    return bins;
  }, [sampleMeans, numBins, histRangeMin, binWidth]);

  const maxBinCount = Math.max(...histogramBins, 1);

  return (
    <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header & Population Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#EEE9F8] text-[#68539A]">
              <BarChart3 className="w-4 h-4" />
            </span>
            Central Limit Theorem & Sampling Distribution
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Draw repeated random samples to observe how the distribution of sample means approaches Gaussian normality.
          </p>
        </div>

        {/* Population Shape Toggle */}
        <div className="flex flex-wrap gap-1 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl self-start sm:self-auto">
          {(['exponential', 'uniform', 'bimodal', 'normal'] as PopulationShape[]).map((shape) => (
            <button
              key={shape}
              onClick={() => handleShapeChange(shape)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                popShape === shape
                  ? 'bg-white text-[#68539A] shadow-xs border border-[#CFC2EA]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {shape}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
        <div>
          <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
            <span>Sample Size (n): {sampleSize}</span>
            <span className="text-[#68539A] font-mono">SE = {theoreticalSE.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="2"
            max="100"
            step="1"
            value={sampleSize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="w-full accent-[#68539A] cursor-pointer"
          />
          <span className="text-[10px] text-[#94A3B8] block mt-0.5">
            Higher n narrows the sampling distribution
          </span>
        </div>

        <div className="sm:col-span-2 flex flex-wrap gap-2 pt-2 sm:pt-0">
          <button
            onClick={() => drawSamples(100)}
            className="py-2 px-3.5 bg-[#68539A] hover:bg-[#574482] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Draw +100 Samples
          </button>
          <button
            onClick={() => drawSamples(500)}
            className="py-2 px-3.5 bg-[#EEE9F8] hover:bg-[#E2DAF2] text-[#68539A] border border-[#CFC2EA] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Draw +500 Samples
          </button>
          <button
            onClick={resetSimulation}
            disabled={sampleMeans.length === 0}
            className="py-2 px-3 bg-white hover:bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] rounded-xl text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Sampling Distribution Histogram Visualizer */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-[#0F172A]">
          <span>
            Distribution of Sample Means (Total Runs: {sampleMeans.length.toLocaleString()})
          </span>
          <span className="text-[#68539A] font-mono">
            {sampleMeans.length === 0 ? 'Click "Draw Samples" to begin' : 'Approaching Normal Bell Curve'}
          </span>
        </div>

        <div className="w-full h-44 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-4 flex items-end justify-between gap-1 relative overflow-hidden">
          {sampleMeans.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-xs text-[#94A3B8] space-y-1">
              <span>No samples drawn yet.</span>
              <span>Select sample size n and click Draw Samples.</span>
            </div>
          ) : (
            histogramBins.map((count, idx) => {
              const binHeightPct = (count / maxBinCount) * 100;
              const binCenter = histRangeMin + (idx + 0.5) * binWidth;
              const isCenter = Math.abs(binCenter - popMean) < binWidth;

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center justify-end h-full group relative"
                >
                  <div
                    className={`w-full rounded-t transition-all duration-200 ${
                      isCenter
                        ? 'bg-[#68539A]'
                        : 'bg-[#B7A3E3]/80 hover:bg-[#68539A]'
                    }`}
                    style={{ height: `${Math.max(4, binHeightPct)}%` }}
                  />
                </div>
              );
            })
          )}

          {/* Theoretical Mean Target Marker */}
          {sampleMeans.length > 0 && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <span className="text-[10px] font-bold text-[#68539A] bg-white px-2 py-0.5 rounded border border-[#CFC2EA] shadow-xs">
                True μ = {popMean.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CLT Convergence Comparison Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          <span className="text-[11px] font-bold text-[#64748B] uppercase block">
            Population Mean (μ)
          </span>
          <span className="text-base sm:text-lg font-extrabold text-[#0F172A]">
            {popMean.toFixed(2)}
          </span>
        </div>

        <div className="p-3.5 bg-[#EEE9F8] rounded-xl border border-[#CFC2EA]">
          <span className="text-[11px] font-bold text-[#68539A] uppercase block">
            Mean of Sample Means (x̄)
          </span>
          <span className="text-base sm:text-lg font-extrabold text-[#68539A]">
            {sampleMeans.length > 0 ? empiricalMeanOfMeans.toFixed(3) : '—'}
          </span>
        </div>

        <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          <span className="text-[11px] font-bold text-[#64748B] uppercase block">
            Theoretical SE (σ / √n)
          </span>
          <span className="text-base sm:text-lg font-extrabold text-[#0F172A]">
            {theoreticalSE.toFixed(3)}
          </span>
        </div>

        <div className="p-3.5 bg-[#EEE9F8] rounded-xl border border-[#CFC2EA]">
          <span className="text-[11px] font-bold text-[#68539A] uppercase block">
            Empirical SE (s_x̄)
          </span>
          <span className="text-base sm:text-lg font-extrabold text-[#68539A]">
            {sampleMeans.length > 1 ? empiricalSE.toFixed(3) : '—'}
          </span>
        </div>
      </div>

      {/* Educational Callout */}
      <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-start gap-2 text-xs text-[#475569] leading-relaxed">
        <Award className="w-4 h-4 text-[#68539A] shrink-0 mt-0.5" />
        <span>
          <strong>Central Limit Theorem Key Insight:</strong> Even when drawing from heavily skewed Exponential or Bimodal populations, the distribution of the sample mean x̄ forms a symmetric, bell-shaped Gaussian curve whose standard deviation shrinks as 1 / √n.
        </span>
      </div>
    </div>
  );
};
