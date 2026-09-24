'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, RefreshCw, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Unit4ProbabilityCLTSim: React.FC = () => {
  const [baseDist, setBaseDist] = useState<'uniform' | 'exponential' | 'dice'>('dice');
  const [sampleSizeN, setSampleSizeN] = useState(30);
  const [numTrials, setNumTrials] = useState(1000);
  const [seed, setSeed] = useState(1);

  // Generate sampling distribution of means
  const { sampleMeans, popMean, popStd, sampleMeanOfMeans, stdErrorOfMeans } = useMemo(() => {
    let s = seed * 54321 + 13579;
    const prng = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };

    const means: number[] = [];

    // Helper to sample single value from base distribution
    const sampleOne = (): number => {
      if (baseDist === 'uniform') {
        return prng() * 10; // Uniform [0, 10], μ=5, σ=2.887
      } else if (baseDist === 'exponential') {
        const u = Math.max(0.00001, prng());
        return -Math.log(1 - u) * 5; // Exp(λ=0.2), μ=5, σ=5
      } else {
        // 6-sided dice roll: 1, 2, 3, 4, 5, 6, μ=3.5, σ=1.708
        return Math.floor(prng() * 6) + 1;
      }
    };

    let pMean = 3.5;
    let pStd = 1.708;
    if (baseDist === 'uniform') {
      pMean = 5.0;
      pStd = 10 / Math.sqrt(12);
    } else if (baseDist === 'exponential') {
      pMean = 5.0;
      pStd = 5.0;
    }

    // Run Monte Carlo trials
    for (let t = 0; t < numTrials; t++) {
      let sum = 0;
      for (let s = 0; s < sampleSizeN; s++) {
        sum += sampleOne();
      }
      means.push(sum / sampleSizeN);
    }

    const mOfMeans = means.reduce((a, b) => a + b, 0) / means.length;
    const seOfMeans = Math.sqrt(
      means.reduce((acc, val) => acc + Math.pow(val - mOfMeans, 2), 0) / (means.length - 1)
    );

    return {
      sampleMeans: means,
      popMean: pMean,
      popStd: pStd,
      sampleMeanOfMeans: mOfMeans,
      stdErrorOfMeans: seOfMeans,
    };
  }, [baseDist, sampleSizeN, numTrials, seed]);

  // Compute histogram of sample means (20 bins)
  const bins = useMemo(() => {
    const minVal = popMean - 3 * (popStd / Math.sqrt(sampleSizeN));
    const maxVal = popMean + 3 * (popStd / Math.sqrt(sampleSizeN));
    const numBins = 20;
    const binWidth = Math.max(0.01, (maxVal - minVal) / numBins);

    const counts = new Array(numBins).fill(0);
    sampleMeans.forEach((val) => {
      const idx = Math.min(numBins - 1, Math.max(0, Math.floor((val - minVal) / binWidth)));
      counts[idx]++;
    });

    const maxCount = Math.max(...counts, 1);
    return counts.map((count, i) => ({
      center: (minVal + (i + 0.5) * binWidth).toFixed(2),
      count,
      heightPct: (count / maxCount) * 100,
    }));
  }, [sampleMeans, popMean, popStd, sampleSizeN]);

  const theoreticalSE = popStd / Math.sqrt(sampleSizeN);

  return (
    <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-6">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#334155] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EEE9F8] dark:bg-[#B7A3E3]/20 text-[#68539A] dark:text-[#DFD3F8] border border-[#CFC2EA] dark:border-[#B7A3E3]/40">
              Unit 4 Interactive Simulation
            </span>
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">Monte Carlo Sampling</span>
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
            Central Limit Theorem & Sampling Distribution Simulator
          </h3>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setSeed((s) => s + 1)}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Rerun Monte Carlo
        </Button>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-xs">
        <div className="space-y-1.5">
          <label className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">Parent Population Distribution</label>
          <div className="flex rounded-lg overflow-hidden border border-[#E2E8F0] dark:border-[#334155]">
            {(['dice', 'exponential', 'uniform'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setBaseDist(t)}
                className={`flex-1 py-1.5 text-[11px] font-bold capitalize transition-colors cursor-pointer ${
                  baseDist === t
                    ? 'bg-[#172033] dark:bg-[#1E293B] text-white'
                    : 'bg-white dark:bg-[#111827] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            <span>Sample Size per Trial (n)</span>
            <span className="font-mono text-purple-600 dark:text-purple-400">{sampleSizeN}</span>
          </div>
          <input
            type="range"
            min="2"
            max="100"
            step="1"
            value={sampleSizeN}
            onChange={(e) => setSampleSizeN(parseInt(e.target.value))}
            className="w-full accent-purple-600"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            <span>Monte Carlo Trials</span>
            <span className="font-mono text-purple-600 dark:text-purple-400">{numTrials}</span>
          </div>
          <input
            type="range"
            min="200"
            max="3000"
            step="100"
            value={numTrials}
            onChange={(e) => setNumTrials(parseInt(e.target.value))}
            className="w-full accent-purple-600"
          />
        </div>
      </div>

      {/* Sampling Distribution Histogram */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>Distribution of Sample Means X̄ (Approaching Normal Bell Curve)</span>
          </span>
          <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
            Theoretical Mean μ = {popMean.toFixed(2)}, Theoretical SE = {theoreticalSE.toFixed(3)}
          </span>
        </div>

        <div className="h-44 flex items-end gap-1 pt-4 pb-2 px-2 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
          {bins.map((bin, i) => (
            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
              {bin.count > 0 && (
                <div
                  className="w-full bg-[#B7A3E3] dark:bg-[#B7A3E3]/80 rounded-t-xs transition-all duration-200 group-hover:bg-[#68539A]"
                  style={{ height: `${Math.max(bin.heightPct, 4)}%` }}
                />
              )}
              {i % 4 === 0 && (
                <span className="text-[9px] text-[#94A3B8] font-mono mt-1 group-hover:text-[#0F172A] dark:group-hover:text-white">
                  {bin.center}
                </span>
              )}
              <div className="absolute -top-8 bg-[#0F172A] text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                {bin.count} trials ({bin.center})
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistical Convergence Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Population Mean (μ)</span>
          <div className="text-base font-extrabold text-[#0F172A] dark:text-[#F8FAFC] font-mono">
            {popMean.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#94A3B8]">True population center</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Simulated Mean E[X̄]</span>
          <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {sampleMeanOfMeans.toFixed(3)}
          </div>
          <span className="text-[10px] text-[#94A3B8]">Converges to μ</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Theoretical SE (σ/√n)</span>
          <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-mono">
            {theoreticalSE.toFixed(3)}
          </div>
          <span className="text-[10px] text-[#94A3B8]">Shrinks as √n grows</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Simulated SE (s_x̄)</span>
          <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-mono">
            {stdErrorOfMeans.toFixed(3)}
          </div>
          <span className="text-[10px] text-[#94A3B8]">Empirical standard error</span>
        </div>
      </div>

      {/* Educational Box */}
      <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-[#1E293B] border border-purple-200/70 dark:border-purple-900/40 text-xs space-y-2">
        <div className="font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>The Magic of Central Limit Theorem:</span>
        </div>
        <p className="text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
          Even when sampling from a heavily asymmetric <strong>Exponential</strong> or flat <strong>Uniform</strong> distribution, as sample size <strong>n exceeds 30</strong>, the sampling distribution of the mean transforms into a clean, symmetric <strong>Gaussian Bell Curve</strong> with spread exactly equal to <strong>σ / √n</strong>.
        </p>
      </div>
    </div>
  );
};
