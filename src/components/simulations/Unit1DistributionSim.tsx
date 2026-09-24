'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, RefreshCw, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Unit1DistributionSim: React.FC = () => {
  const [sampleSize, setSampleSize] = useState(100);
  const [distType, setDistType] = useState<'normal' | 'right_skewed' | 'bimodal'>('normal');
  const [outlierCount, setOutlierCount] = useState(2);
  const [seed, setSeed] = useState(1);

  // Generate simulated dataset based on parameters
  const { data, mean, median, stdDev, upperFence, outliers } = useMemo(() => {
    let s = seed * 12345 + 6789;
    const prng = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };

    const raw: number[] = [];
    const randNorm = () => {
      let u = prng();
      const v = prng();
      if (u <= 0.00001) u = 0.00001;
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    for (let i = 0; i < sampleSize; i++) {
      if (distType === 'normal') {
        raw.push(50 + randNorm() * 10);
      } else if (distType === 'right_skewed') {
        raw.push(20 + Math.pow(Math.abs(randNorm()), 2) * 25);
      } else {
        // Bimodal
        const mode = i % 2 === 0 ? 30 : 70;
        raw.push(mode + randNorm() * 6);
      }
    }

    // Add extreme outliers
    for (let j = 0; j < outlierCount; j++) {
      raw.push(110 + prng() * 30);
    }

    raw.sort((a, b) => a - b);
    const n = raw.length;
    const sum = raw.reduce((a, b) => a + b, 0);
    const m = sum / n;
    const med = n % 2 === 0 ? (raw[n / 2 - 1] + raw[n / 2]) / 2 : raw[Math.floor(n / 2)];
    const variance = raw.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / (n - 1);
    const sd = Math.sqrt(variance);

    const q1 = raw[Math.floor(n * 0.25)];
    const q3 = raw[Math.floor(n * 0.75)];
    const interquartile = q3 - q1;
    const lFence = q1 - 1.5 * interquartile;
    const uFence = q3 + 1.5 * interquartile;
    const outs = raw.filter((x) => x < lFence || x > uFence);

    return {
      data: raw,
      mean: m,
      median: med,
      stdDev: sd,
      iqr: interquartile,
      lowerFence: lFence,
      upperFence: uFence,
      outliers: outs,
    };
  }, [sampleSize, distType, outlierCount, seed]);

  // Compute histogram bins (12 bins from 0 to 150)
  const bins = useMemo(() => {
    const numBins = 15;
    const binWidth = 10;
    const counts = new Array(numBins).fill(0);
    data.forEach((val) => {
      const idx = Math.min(numBins - 1, Math.max(0, Math.floor(val / binWidth)));
      counts[idx]++;
    });
    const maxCount = Math.max(...counts, 1);
    return counts.map((count, i) => ({
      range: `${i * binWidth}-${(i + 1) * binWidth}`,
      count,
      pct: (count / data.length) * 100,
      heightPct: (count / maxCount) * 100,
    }));
  }, [data]);

  return (
    <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-6">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#334155] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FCE5DC] dark:bg-[#F4A58A]/20 text-[#9E513B] dark:text-[#FFC4B3] border border-[#EFC0B0] dark:border-[#F4A58A]/40">
              Unit 1 Interactive Simulation
            </span>
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">Statistical Profiler</span>
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
            EDA Distribution & Outlier Simulator
          </h3>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setSeed((s) => s + 1)}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Resample Data
        </Button>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-xs">
        <div className="space-y-1.5">
          <label className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">Distribution Family</label>
          <div className="flex rounded-lg overflow-hidden border border-[#E2E8F0] dark:border-[#334155]">
            {(['normal', 'right_skewed', 'bimodal'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setDistType(t)}
                className={`flex-1 py-1.5 text-[11px] font-bold capitalize transition-colors cursor-pointer ${
                  distType === t
                    ? 'bg-[#172033] dark:bg-[#1E293B] text-white'
                    : 'bg-white dark:bg-[#111827] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9]'
                }`}
              >
                {t.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            <span>Sample Size (n)</span>
            <span className="font-mono text-[#F4A58A]">{sampleSize}</span>
          </div>
          <input
            type="range"
            min="30"
            max="500"
            step="10"
            value={sampleSize}
            onChange={(e) => setSampleSize(parseInt(e.target.value))}
            className="w-full accent-[#F4A58A]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            <span>Injected Outliers</span>
            <span className="font-mono text-rose-500">{outlierCount}</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={outlierCount}
            onChange={(e) => setOutlierCount(parseInt(e.target.value))}
            className="w-full accent-rose-500"
          />
        </div>
      </div>

      {/* Live Visual Histogram & Box Plot */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
          <span className="flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-[#F4A58A]" />
            <span>Empirical Histogram & Frequency Density</span>
          </span>
          <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">Total Observations: {data.length}</span>
        </div>

        <div className="h-44 flex items-end gap-1.5 pt-4 pb-2 px-2 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
          {bins.map((bin, i) => (
            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
              {bin.count > 0 && (
                <div
                  className="w-full bg-[#F4A58A] dark:bg-[#F4A58A]/80 rounded-t-sm transition-all duration-200 group-hover:bg-[#9E513B]"
                  style={{ height: `${Math.max(bin.heightPct, 4)}%` }}
                />
              )}
              <span className="text-[9px] text-[#94A3B8] font-mono mt-1 group-hover:text-[#0F172A] dark:group-hover:text-white truncate">
                {bin.range.split('-')[0]}
              </span>
              {/* Tooltip */}
              <div className="absolute -top-8 bg-[#0F172A] text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                {bin.count} items ({bin.pct.toFixed(1)}%)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Computed Summary Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Mean (x̄)</span>
          <div className="text-base font-extrabold text-[#0F172A] dark:text-[#F8FAFC] font-mono">
            {mean.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#94A3B8]">Sensitive to tail outliers</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Median (Q2)</span>
          <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {median.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#94A3B8]">Robust central position</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Std Dev (s)</span>
          <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-mono">
            {stdDev.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#94A3B8]">Spread (Bessel n-1)</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Tukey Outliers</span>
          <div className="text-base font-extrabold text-rose-600 dark:text-rose-400 font-mono">
            {outliers.length} <span className="text-xs text-[#94A3B8]">(&gt; {upperFence.toFixed(1)})</span>
          </div>
          <span className="text-[10px] text-[#94A3B8]">Beyond Q3 + 1.5×IQR</span>
        </div>
      </div>

      {/* Educational Explanation Box */}
      <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-[#1E293B] border border-orange-200/70 dark:border-orange-900/40 text-xs space-y-2">
        <div className="font-bold text-[#9E513B] dark:text-[#FFC4B3] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#F4A58A]" />
          <span>Simulation Takeaway & Dynamic Observations:</span>
        </div>
        <p className="text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
          Notice how increasing <strong>Injected Outliers</strong> dramatically inflates the <strong>Mean</strong> and <strong>Standard Deviation</strong>, while the <strong>Median</strong> remains almost entirely stable. When switching to <strong>Right-Skewed</strong> data, Mean &gt; Median naturally emerges.
        </p>
      </div>
    </div>
  );
};
