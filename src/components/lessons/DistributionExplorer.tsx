'use client';

import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Sliders, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Deterministic pseudo-random generator for pure React render compliance
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const DistributionExplorer: React.FC = () => {
  const [distType, setDistType] = useState<'normal' | 'right-skew' | 'left-skew' | 'uniform'>('normal');
  const [mean, setMean] = useState<number>(50);
  const [stdDev, setStdDev] = useState<number>(10);
  const [sampleSize, setSampleSize] = useState<number>(500);

  // Generate synthetic sample points based on parameters
  const { binLabels, binCounts, actualMean, actualMedian, actualStd } = useMemo(() => {
    const rawSamples: number[] = [];
    const numBins = 21;
    const minVal = 0;
    const maxVal = 100;
    const binWidth = (maxVal - minVal) / numBins;

    const baseSeed = (mean * 31 + stdDev * 17 + sampleSize * 13) % 10000;

    for (let i = 0; i < sampleSize; i++) {
      let val = 50;
      const r1 = Math.max(1e-6, pseudoRandom(baseSeed + i * 2 + 1));
      const r2 = pseudoRandom(baseSeed + i * 2 + 2);

      if (distType === 'normal') {
        // Box-Muller transform for normal distribution
        const z = Math.sqrt(-2.0 * Math.log(r1)) * Math.cos(2.0 * Math.PI * r2);
        val = mean + z * stdDev;
      } else if (distType === 'right-skew') {
        // Exponential / log-normal right skew
        const lambda = 1 / (stdDev * 1.5);
        const exp = -Math.log(r1) / lambda;
        val = mean - stdDev * 0.8 + exp;
      } else if (distType === 'left-skew') {
        // Inverted exponential left skew
        const lambda = 1 / (stdDev * 1.5);
        const exp = -Math.log(r1) / lambda;
        val = mean + stdDev * 0.8 - exp;
      } else {
        // Uniform distribution
        const halfSpan = stdDev * Math.sqrt(3);
        val = mean - halfSpan + r1 * (2 * halfSpan);
      }

      val = Math.max(0, Math.min(100, val));
      rawSamples.push(val);
    }

    rawSamples.sort((a, b) => a - b);

    // Compute empirical stats
    const sum = rawSamples.reduce((acc, v) => acc + v, 0);
    const m = sum / rawSamples.length;
    const med =
      rawSamples.length % 2 === 0
        ? (rawSamples[rawSamples.length / 2 - 1] + rawSamples[rawSamples.length / 2]) / 2
        : rawSamples[Math.floor(rawSamples.length / 2)];
    const variance =
      rawSamples.reduce((acc, v) => acc + Math.pow(v - m, 2), 0) / (rawSamples.length - 1);
    const s = Math.sqrt(variance);

    // Bin the samples for histogram
    const counts = new Array(numBins).fill(0);
    const labels = [];

    for (let b = 0; b < numBins; b++) {
      const lower = minVal + b * binWidth;
      const upper = lower + binWidth;
      labels.push(`${Math.round(lower)}-${Math.round(upper)}`);
    }

    rawSamples.forEach((val) => {
      let bIdx = Math.floor((val - minVal) / binWidth);
      if (bIdx >= numBins) bIdx = numBins - 1;
      if (bIdx < 0) bIdx = 0;
      counts[bIdx]++;
    });

    return {
      binLabels: labels,
      binCounts: counts,
      actualMean: m.toFixed(1),
      actualMedian: med.toFixed(1),
      actualStd: s.toFixed(1),
    };
  }, [distType, mean, stdDev, sampleSize]);

  const resetParams = () => {
    setDistType('normal');
    setMean(50);
    setStdDev(10);
    setSampleSize(500);
  };

  const chartData = {
    labels: binLabels,
    datasets: [
      {
        label: 'Observation Frequency (Histogram)',
        data: binCounts,
        backgroundColor: '#FCE5DC',
        borderColor: '#F4A58A',
        borderWidth: 1.5,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#172033',
        padding: 10,
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 }, color: '#64748B', maxRotation: 45 },
      },
      y: {
        grid: { color: '#F1F5F9' },
        ticks: { font: { size: 10 }, color: '#64748B' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
        <div>
          <h4 className="text-base font-bold text-[#172033] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#9E513B]" />
            <span>Interactive Distribution & Shape Explorer</span>
          </h4>
          <p className="text-xs text-[#64748B] mt-0.5">
            Adjust the distribution model, mean, and dispersion to see how sample frequency distributions shift.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={resetParams} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
          Reset
        </Button>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-xs">
        {/* Distribution Selector */}
        <div>
          <label className="font-semibold text-[#172033] block mb-1.5">Distribution Type</label>
          <select
            value={distType}
            onChange={(e) => setDistType(e.target.value as 'normal' | 'right-skew' | 'left-skew' | 'uniform')}
            className="w-full px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-md text-xs font-medium text-[#172033]"
          >
            <option value="normal">Normal (Gaussian)</option>
            <option value="right-skew">Right (Positive) Skew</option>
            <option value="left-skew">Left (Negative) Skew</option>
            <option value="uniform">Uniform</option>
          </select>
        </div>

        {/* Mean Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-[#172033]">Target Mean (μ):</span>
            <span className="font-mono text-[#9E513B] font-bold">{mean}</span>
          </div>
          <input
            type="range"
            min="20"
            max="80"
            value={mean}
            onChange={(e) => setMean(Number(e.target.value))}
            className="w-full accent-[#F4A58A] cursor-pointer"
          />
        </div>

        {/* Std Dev Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-[#172033]">Std Dev (σ):</span>
            <span className="font-mono text-[#9E513B] font-bold">{stdDev}</span>
          </div>
          <input
            type="range"
            min="4"
            max="20"
            value={stdDev}
            onChange={(e) => setStdDev(Number(e.target.value))}
            className="w-full accent-[#F4A58A] cursor-pointer"
          />
        </div>

        {/* Sample Size Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-[#172033]">Sample Count (N):</span>
            <span className="font-mono text-[#9E513B] font-bold">{sampleSize}</span>
          </div>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={sampleSize}
            onChange={(e) => setSampleSize(Number(e.target.value))}
            className="w-full accent-[#F4A58A] cursor-pointer"
          />
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Real-time Empirical Metrics Bar */}
      <div className="grid grid-cols-3 gap-3 p-3 bg-[#FCE5DC]/50 border border-[#EFC0B0] rounded-lg text-center">
        <div>
          <span className="text-[11px] font-semibold text-[#9E513B] block uppercase tracking-wider">Sample Mean</span>
          <span className="text-base font-bold text-[#172033]">{actualMean}</span>
        </div>
        <div>
          <span className="text-[11px] font-semibold text-[#9E513B] block uppercase tracking-wider">Sample Median</span>
          <span className="text-base font-bold text-[#172033]">{actualMedian}</span>
        </div>
        <div>
          <span className="text-[11px] font-semibold text-[#9E513B] block uppercase tracking-wider">Sample Std Dev</span>
          <span className="text-base font-bold text-[#172033]">{actualStd}</span>
        </div>
      </div>
    </div>
  );
};
