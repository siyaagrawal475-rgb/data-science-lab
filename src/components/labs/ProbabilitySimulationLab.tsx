'use client';

import React, { useState, useMemo } from 'react';
import { useUnitProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, RotateCcw, Play, Dices, Award } from 'lucide-react';

type LabExperiment = 'coin-fair' | 'coin-biased' | 'die-6' | 'die-20' | 'cards-suits';

export const ProbabilitySimulationLab: React.FC = () => {
  const { isLabCompleted, completeLab } = useUnitProgress('unit-4');
  const isDone = isLabCompleted('probability');

  const [experiment, setExperiment] = useState<LabExperiment>('coin-fair');
  const [biasP, setBiasP] = useState<number>(0.70); // For biased coin
  const [counts, setCounts] = useState<{ [outcome: string]: number }>({
    Heads: 0,
    Tails: 0,
  });
  const [totalTrials, setTotalTrials] = useState<number>(0);

  // Setup outcomes and theoretical probabilities
  const outcomeConfig = useMemo(() => {
    if (experiment === 'coin-fair') {
      return {
        outcomes: ['Heads', 'Tails'],
        theoretical: { Heads: 0.5, Tails: 0.5 },
        sampler: () => (Math.random() < 0.5 ? 'Heads' : 'Tails'),
      };
    }
    if (experiment === 'coin-biased') {
      return {
        outcomes: ['Heads', 'Tails'],
        theoretical: { Heads: biasP, Tails: 1 - biasP },
        sampler: () => (Math.random() < biasP ? 'Heads' : 'Tails'),
      };
    }
    if (experiment === 'die-6') {
      const p = 1 / 6;
      return {
        outcomes: ['1', '2', '3', '4', '5', '6'],
        theoretical: { '1': p, '2': p, '3': p, '4': p, '5': p, '6': p },
        sampler: () => String(Math.floor(Math.random() * 6) + 1),
      };
    }
    if (experiment === 'die-20') {
      const outcomes = Array.from({ length: 20 }, (_, i) => String(i + 1));
      const p = 1 / 20;
      const th: { [k: string]: number } = {};
      outcomes.forEach((o) => (th[o] = p));
      return {
        outcomes,
        theoretical: th,
        sampler: () => String(Math.floor(Math.random() * 20) + 1),
      };
    }
    // Card suits
    return {
      outcomes: ['Hearts ♥', 'Diamonds ♦', 'Clubs ♣', 'Spades ♠'],
      theoretical: { 'Hearts ♥': 0.25, 'Diamonds ♦': 0.25, 'Clubs ♣': 0.25, 'Spades ♠': 0.25 },
      sampler: () => {
        const suits = ['Hearts ♥', 'Diamonds ♦', 'Clubs ♣', 'Spades ♠'];
        return suits[Math.floor(Math.random() * 4)];
      },
    };
  }, [experiment, biasP]);

  const handleExperimentChange = (exp: LabExperiment) => {
    setExperiment(exp);
    setTotalTrials(0);
    const newCounts: { [k: string]: number } = {};
    if (exp === 'coin-fair' || exp === 'coin-biased') {
      newCounts['Heads'] = 0;
      newCounts['Tails'] = 0;
    } else if (exp === 'die-6') {
      ['1', '2', '3', '4', '5', '6'].forEach((k) => (newCounts[k] = 0));
    } else if (exp === 'die-20') {
      Array.from({ length: 20 }, (_, i) => String(i + 1)).forEach((k) => (newCounts[k] = 0));
    } else {
      ['Hearts ♥', 'Diamonds ♦', 'Clubs ♣', 'Spades ♠'].forEach((k) => (newCounts[k] = 0));
    }
    setCounts(newCounts);
  };

  const runTrials = (numRuns: number) => {
    const updated = { ...counts };
    for (let i = 0; i < numRuns; i++) {
      const outcome = outcomeConfig.sampler();
      updated[outcome] = (updated[outcome] || 0) + 1;
    }
    setCounts(updated);
    setTotalTrials((prev) => prev + numRuns);
  };

  const resetTrials = () => {
    const cleared: { [k: string]: number } = {};
    outcomeConfig.outcomes.forEach((k) => (cleared[k] = 0));
    setCounts(cleared);
    setTotalTrials(0);
  };

  return (
    <div className="space-y-8">
      {/* Workspace Card */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#EEE9F8] text-[#68539A]">
                <Dices className="w-4 h-4" />
              </span>
              Stochastic Experiment Engine
            </h3>
            <p className="text-xs text-[#64748B]">
              Configure random experiments, generate high-throughput Monte Carlo trials, and quantify convergence errors.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl self-start sm:self-auto">
            {(
              [
                ['coin-fair', 'Fair Coin'],
                ['coin-biased', 'Biased Coin'],
                ['die-6', 'D6 Die'],
                ['die-20', 'D20 Die'],
                ['cards-suits', 'Card Suits'],
              ] as [LabExperiment, string][]
            ).map(([exp, label]) => (
              <button
                key={exp}
                onClick={() => handleExperimentChange(exp)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  experiment === exp
                    ? 'bg-white text-[#68539A] shadow-xs border border-[#CFC2EA]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Experiment Specific Config */}
        {experiment === 'coin-biased' && (
          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#475569]">
              <span>Heads Bias Probability P(Heads): {(biasP * 100).toFixed(0)}%</span>
              <span className="text-[#68539A] font-mono">Tails: {((1 - biasP) * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.90"
              step="0.05"
              value={biasP}
              onChange={(e) => {
                setBiasP(Number(e.target.value));
                setTotalTrials(0);
                setCounts({ Heads: 0, Tails: 0 });
              }}
              className="w-full accent-[#68539A] cursor-pointer"
            />
          </div>
        )}

        {/* Batch Trial Action Buttons */}
        <div className="flex flex-wrap gap-2.5 items-center">
          <button
            onClick={() => runTrials(1)}
            className="py-2 px-3.5 bg-[#F8FAFC] hover:bg-[#EEE9F8] text-[#68539A] border border-[#E2E8F0] hover:border-[#CFC2EA] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current" /> +1 Trial
          </button>
          <button
            onClick={() => runTrials(100)}
            className="py-2 px-3.5 bg-[#EEE9F8] hover:bg-[#E2DAF2] text-[#68539A] border border-[#CFC2EA] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current" /> +100 Trials
          </button>
          <button
            onClick={() => runTrials(1000)}
            className="py-2 px-4 bg-[#68539A] hover:bg-[#574482] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> +1,000 Trials
          </button>
          <button
            onClick={() => runTrials(10000)}
            className="py-2 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> +10,000 Trials
          </button>
          <button
            onClick={resetTrials}
            disabled={totalTrials === 0}
            className="py-2 px-3.5 bg-white hover:bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] rounded-xl text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>

          <span className="text-xs text-[#64748B] ml-auto font-mono">
            Total Trials: <strong>{totalTrials.toLocaleString()}</strong>
          </span>
        </div>

        {/* Empirical vs Theoretical Frequency Table */}
        <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#0F172A] font-semibold">
              <tr>
                <th className="py-2.5 px-3 sm:px-4">Outcome</th>
                <th className="py-2.5 px-3 sm:px-4">Observed Count</th>
                <th className="py-2.5 px-3 sm:px-4">Empirical P̂</th>
                <th className="py-2.5 px-3 sm:px-4">Theoretical P</th>
                <th className="py-2.5 px-3 sm:px-4">Absolute Error |P̂ - P|</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-[#475569]">
              {outcomeConfig.outcomes.map((outcome) => {
                const count = counts[outcome] || 0;
                const empProb = totalTrials > 0 ? count / totalTrials : 0;
                const theoProb = outcomeConfig.theoretical[outcome] || 0;
                const err = totalTrials > 0 ? Math.abs(empProb - theoProb) : 0;

                return (
                  <tr key={outcome} className="hover:bg-[#F8FAFC]/60 transition-colors">
                    <td className="py-2.5 px-3 sm:px-4 font-bold text-[#0F172A]">
                      {outcome}
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 font-mono">
                      {count.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 font-mono text-[#68539A] font-bold">
                      {totalTrials > 0 ? `${(empProb * 100).toFixed(2)}%` : '—'}
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 font-mono text-[#475569]">
                      {(theoProb * 100).toFixed(2)}%
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 font-mono">
                      {totalTrials > 0 ? (
                        <span className={err < 0.01 ? 'text-emerald-600 font-bold' : 'text-[#0F172A]'}>
                          {err.toFixed(4)}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Educational Takeaway Box */}
        <div className="p-4 bg-[#EEE9F8] rounded-xl border border-[#CFC2EA] flex items-start gap-3 text-xs text-[#68539A] leading-relaxed">
          <Award className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>Lab Insight:</strong> Notice how as trials reach 10,000+, the absolute error for every single outcome shrinks below 0.005. This empirically proves the Law of Large Numbers that justifies treating relative frequencies as probabilities in large datasets.
          </span>
        </div>
      </div>

      {/* Lab Completion Bar */}
      <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-[#0F172A]">Complete Probability Simulation Lab</h4>
          <p className="text-xs text-[#64748B]">
            Mark this laboratory module completed to update your Unit 4 progress.
          </p>
        </div>

        <Button
          onClick={() => completeLab('probability')}
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
