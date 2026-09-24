'use client';

import React, { useState, useMemo } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Activity, Award } from 'lucide-react';
import {
  normalCDF,
  binomialPMF,
  poissonPMF,
} from '@/lib/statisticsMath';

type DistFamily = 'normal' | 'binomial' | 'poisson' | 'uniform';

export const DistributionLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-4');
  const isDone = isLabCompleted('distributions');

  const [distFamily, setDistFamily] = useState<DistFamily>('normal');

  // Normal
  const [mu, setMu] = useState<number>(100);
  const [sigma, setSigma] = useState<number>(15);

  // Binomial
  const [n, setN] = useState<number>(20);
  const [p, setP] = useState<number>(0.4);

  // Poisson
  const [lambda, setLambda] = useState<number>(6);

  // Uniform
  const [a, setA] = useState<number>(10);
  const [b, setB] = useState<number>(50);

  // Interval query [x1, x2]
  const [queryMin, setQueryMin] = useState<number>(85);
  const [queryMax, setQueryMax] = useState<number>(115);

  const stats = useMemo(() => {
    if (distFamily === 'normal') {
      const exp = mu;
      const vr = sigma * sigma;
      const prob = Math.max(0, normalCDF(queryMax, mu, sigma) - normalCDF(queryMin, mu, sigma));
      return {
        name: `Normal 𝒩(μ=${mu}, σ=${sigma})`,
        mean: exp,
        variance: vr,
        stdDev: sigma,
        intervalProb: prob,
        formula: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} \\exp\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)',
      };
    }
    if (distFamily === 'binomial') {
      const exp = n * p;
      const vr = n * p * (1 - p);
      let prob = 0;
      for (let k = Math.max(0, Math.ceil(queryMin)); k <= Math.min(n, Math.floor(queryMax)); k++) {
        prob += binomialPMF(k, n, p);
      }
      return {
        name: `Binomial(n=${n}, p=${p})`,
        mean: exp,
        variance: vr,
        stdDev: Math.sqrt(vr),
        intervalProb: prob,
        formula: 'P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}',
      };
    }
    if (distFamily === 'poisson') {
      const exp = lambda;
      const vr = lambda;
      let prob = 0;
      for (let k = Math.max(0, Math.ceil(queryMin)); k <= Math.floor(queryMax); k++) {
        prob += poissonPMF(k, lambda);
      }
      return {
        name: `Poisson(λ=${lambda})`,
        mean: exp,
        variance: vr,
        stdDev: Math.sqrt(vr),
        intervalProb: prob,
        formula: 'P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}',
      };
    }
    // Uniform
    const exp = (a + b) / 2;
    const vr = Math.pow(b - a, 2) / 12;
    const clampedMin = Math.max(a, queryMin);
    const clampedMax = Math.min(b, queryMax);
    const prob = clampedMax > clampedMin ? (clampedMax - clampedMin) / (b - a) : 0;
    return {
      name: `Uniform(a=${a}, b=${b})`,
      mean: exp,
      variance: vr,
      stdDev: Math.sqrt(vr),
      intervalProb: prob,
      formula: 'f(x) = \\frac{1}{b - a} \\quad \\text{for } a \\le x \\le b',
    };
  }, [distFamily, mu, sigma, n, p, lambda, a, b, queryMin, queryMax]);

  return (
    <div className="space-y-8">
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#EEE9F8] text-[#68539A]">
                <Activity className="w-4 h-4" />
              </span>
              Parametric Distribution Modeling Lab
            </h3>
            <p className="text-xs text-[#64748B]">
              Fit probability models, evaluate statistical moments, and calculate tail/interval probabilities.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl self-start sm:self-auto">
            {(['normal', 'binomial', 'poisson', 'uniform'] as DistFamily[]).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setDistFamily(f);
                  if (f === 'normal') { setQueryMin(85); setQueryMax(115); }
                  if (f === 'binomial') { setQueryMin(5); setQueryMax(12); }
                  if (f === 'poisson') { setQueryMin(3); setQueryMax(9); }
                  if (f === 'uniform') { setQueryMin(20); setQueryMax(40); }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  distFamily === f
                    ? 'bg-white text-[#68539A] shadow-xs border border-[#CFC2EA]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Parameter Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
          {distFamily === 'normal' && (
            <>
              <div>
                <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                  <span>Location / Mean (μ): {mu}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="5"
                  value={mu}
                  onChange={(e) => setMu(Number(e.target.value))}
                  className="w-full accent-[#68539A] cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                  <span>Scale / Std Dev (σ): {sigma}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={sigma}
                  onChange={(e) => setSigma(Number(e.target.value))}
                  className="w-full accent-[#68539A] cursor-pointer"
                />
              </div>
            </>
          )}

          {distFamily === 'binomial' && (
            <>
              <div>
                <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                  <span>Number of Trials (n): {n}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={n}
                  onChange={(e) => setN(Number(e.target.value))}
                  className="w-full accent-[#68539A] cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                  <span>Success Probability (p): {p.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.95"
                  step="0.05"
                  value={p}
                  onChange={(e) => setP(Number(e.target.value))}
                  className="w-full accent-[#68539A] cursor-pointer"
                />
              </div>
            </>
          )}

          {distFamily === 'poisson' && (
            <div>
              <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                <span>Arrival Rate (λ): {lambda}</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={lambda}
                onChange={(e) => setLambda(Number(e.target.value))}
                className="w-full accent-[#68539A] cursor-pointer"
              />
            </div>
          )}

          {distFamily === 'uniform' && (
            <>
              <div>
                <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                  <span>Lower Bound (a): {a}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="5"
                  value={a}
                  onChange={(e) => setA(Number(e.target.value))}
                  className="w-full accent-[#68539A] cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                  <span>Upper Bound (b): {b}</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="100"
                  step="5"
                  value={b}
                  onChange={(e) => setB(Number(e.target.value))}
                  className="w-full accent-[#68539A] cursor-pointer"
                />
              </div>
            </>
          )}

          {/* Interval Query Range Inputs */}
          <div>
            <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
              <span>Query Interval [x₁, x₂]</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={queryMin}
                onChange={(e) => setQueryMin(Number(e.target.value))}
                className="w-1/2 px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold"
                placeholder="x1"
              />
              <input
                type="number"
                value={queryMax}
                onChange={(e) => setQueryMax(Number(e.target.value))}
                className="w-1/2 px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold"
                placeholder="x2"
              />
            </div>
          </div>
        </div>

        {/* Theoretical Statistics Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">
              Expected Value E[X]
            </span>
            <span className="text-lg font-extrabold text-[#0F172A]">
              {stats.mean.toFixed(2)}
            </span>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">
              Variance Var(X)
            </span>
            <span className="text-lg font-extrabold text-[#0F172A]">
              {stats.variance.toFixed(2)}
            </span>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">
              Standard Deviation σ
            </span>
            <span className="text-lg font-extrabold text-[#0F172A]">
              {stats.stdDev.toFixed(2)}
            </span>
          </div>

          <div className="p-3.5 bg-[#EEE9F8] rounded-xl border border-[#CFC2EA] space-y-1">
            <span className="text-[11px] font-bold text-[#68539A] uppercase block">
              P({queryMin} ≤ X ≤ {queryMax})
            </span>
            <span className="text-xl font-black text-[#68539A]">
              {(stats.intervalProb * 100).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Educational Takeaway */}
        <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-start gap-3 text-xs text-[#475569] leading-relaxed">
          <Award className="w-4 h-4 text-[#68539A] shrink-0 mt-0.5" />
          <span>
            <strong>Statistical Modeling Takeaway:</strong> In real-world data science, choosing the correct parametric family allows predicting tail risks and cumulative probabilities with extreme computational efficiency, rather than computing raw empirical counts across billions of rows.
          </span>
        </div>
      </div>

      {/* Completion Banner */}
      <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-[#0F172A]">Complete Distribution Lab</h4>
          <p className="text-xs text-[#64748B]">
            Mark this laboratory module completed to record your Unit 4 progress.
          </p>
        </div>

        <Button
          onClick={() => completeLab('distributions')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
            isDone
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
              : 'bg-[#68539A] hover:bg-[#574482] text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {isDone ? 'Lab Completed ✓' : 'Mark Lab Completed'}
        </Button>
      </div>
    </div>
  );
};
