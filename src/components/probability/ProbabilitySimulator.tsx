'use client';

import React, { useState, useMemo } from 'react';
import { Play, RotateCcw, Award, Dices, CircleDot } from 'lucide-react';

type ExperimentType = 'coin' | 'die';

export const ProbabilitySimulator: React.FC = () => {
  const [experiment, setExperiment] = useState<ExperimentType>('coin');
  const [targetOutcome, setTargetOutcome] = useState<string>('Heads');
  const [batchSize, setBatchSize] = useState<number>(100);
  const [totalTrials, setTotalTrials] = useState<number>(0);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    Heads: 0,
    Tails: 0,
  });

  const theoreticalProbability = useMemo(() => {
    return experiment === 'coin' ? 0.5 : 1 / 6;
  }, [experiment]);

  const handleExperimentChange = (type: ExperimentType) => {
    setExperiment(type);
    if (type === 'coin') {
      setTargetOutcome('Heads');
      setCounts({ Heads: 0, Tails: 0 });
    } else {
      setTargetOutcome('1');
      setCounts({ '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 });
    }
    setTotalTrials(0);
  };

  const runSimulation = () => {
    const newCounts = { ...counts };
    if (experiment === 'coin') {
      for (let i = 0; i < batchSize; i++) {
        const res = Math.random() < 0.5 ? 'Heads' : 'Tails';
        newCounts[res] = (newCounts[res] || 0) + 1;
      }
    } else {
      for (let i = 0; i < batchSize; i++) {
        const roll = String(Math.floor(Math.random() * 6) + 1);
        newCounts[roll] = (newCounts[roll] || 0) + 1;
      }
    }
    setCounts(newCounts);
    setTotalTrials((prev) => prev + batchSize);
  };

  const resetSimulation = () => {
    if (experiment === 'coin') {
      setCounts({ Heads: 0, Tails: 0 });
    } else {
      setCounts({ '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 });
    }
    setTotalTrials(0);
  };

  const targetCount = counts[targetOutcome] || 0;
  const empiricalProbability = totalTrials > 0 ? targetCount / totalTrials : 0;
  const estimationError = totalTrials > 0 ? Math.abs(empiricalProbability - theoreticalProbability) : 0;

  const outcomes = Object.keys(counts);

  return (
    <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#EEE9F8] text-[#68539A]">
              {experiment === 'coin' ? <CircleDot className="w-4 h-4" /> : <Dices className="w-4 h-4" />}
            </span>
            Probability Empirical Simulator
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Test the Law of Large Numbers by observing empirical frequency convergence toward theoretical probability.
          </p>
        </div>

        {/* Experiment Selector Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl self-start sm:self-auto">
          <button
            onClick={() => handleExperimentChange('coin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              experiment === 'coin'
                ? 'bg-white text-[#68539A] shadow-xs border border-[#CFC2EA]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Fair Coin Flip
          </button>
          <button
            onClick={() => handleExperimentChange('die')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              experiment === 'die'
                ? 'bg-white text-[#68539A] shadow-xs border border-[#CFC2EA]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            6-Sided Fair Die
          </button>
        </div>
      </div>

      {/* Control Buttons & Batch Config */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-1">
            Target Outcome
          </label>
          <select
            value={targetOutcome}
            onChange={(e) => setTargetOutcome(e.target.value)}
            className="w-full px-3 py-2 text-xs font-semibold bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#B7A3E3]"
          >
            {outcomes.map((o) => (
              <option key={o} value={o}>
                Outcome: {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-1">
            Batch Size (Trials)
          </label>
          <select
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            className="w-full px-3 py-2 text-xs font-semibold bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#B7A3E3]"
          >
            <option value={10}>+10 Trials</option>
            <option value={50}>+50 Trials</option>
            <option value={100}>+100 Trials</option>
            <option value={500}>+500 Trials</option>
            <option value={1000}>+1,000 Trials</option>
            <option value={5000}>+5,000 Trials</option>
          </select>
        </div>

        <div className="flex gap-2 sm:col-span-2 pt-5">
          <button
            onClick={runSimulation}
            className="flex-1 py-2 px-4 bg-[#68539A] hover:bg-[#574482] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Run +{batchSize.toLocaleString()} Trials
          </button>
          <button
            onClick={resetSimulation}
            disabled={totalTrials === 0}
            className="py-2 px-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0] rounded-xl text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Probability Convergence Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
            Total Trials
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#0F172A]">
            {totalTrials.toLocaleString()}
          </span>
        </div>

        <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
            Theoretical P({targetOutcome})
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#68539A]">
            {theoreticalProbability.toFixed(4)}{' '}
            <span className="text-xs font-normal text-[#64748B]">
              ({(theoreticalProbability * 100).toFixed(1)}%)
            </span>
          </span>
        </div>

        <div className="p-3.5 bg-[#EEE9F8] rounded-xl border border-[#CFC2EA] space-y-1">
          <span className="text-[11px] font-bold text-[#68539A] uppercase tracking-wider block">
            Empirical P̂({targetOutcome})
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#68539A]">
            {totalTrials > 0 ? empiricalProbability.toFixed(4) : '—'}{' '}
            {totalTrials > 0 && (
              <span className="text-xs font-normal text-[#68539A]">
                ({(empiricalProbability * 100).toFixed(1)}%)
              </span>
            )}
          </span>
        </div>

        <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
            Absolute Error
          </span>
          <span className={`text-lg sm:text-xl font-extrabold ${estimationError < 0.01 && totalTrials > 0 ? 'text-emerald-600' : 'text-[#0F172A]'}`}>
            {totalTrials > 0 ? estimationError.toFixed(4) : '—'}
          </span>
        </div>
      </div>

      {/* Outcome Frequencies Visualizer Bars */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
          <span>Outcome Relative Frequency Distribution</span>
          <span className="text-[#64748B] font-mono">
            Dashed line = Theoretical ({(theoreticalProbability * 100).toFixed(1)}%)
          </span>
        </div>

        <div className="space-y-2.5">
          {outcomes.map((outcome) => {
            const count = counts[outcome] || 0;
            const pct = totalTrials > 0 ? (count / totalTrials) * 100 : 0;
            const isSelected = outcome === targetOutcome;

            return (
              <div key={outcome} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-semibold ${isSelected ? 'text-[#68539A]' : 'text-[#334155]'}`}>
                    {outcome} {isSelected && '★'}
                  </span>
                  <span className="text-[#64748B] font-mono">
                    {count.toLocaleString()} hits ({pct.toFixed(2)}%)
                  </span>
                </div>

                <div className="relative h-6 bg-[#F1F5F9] rounded-lg overflow-hidden border border-[#E2E8F0]">
                  {/* Theoretical marker line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 border-r border-dashed border-red-500 z-10"
                    style={{ left: `${theoreticalProbability * 100}%` }}
                    title={`Theoretical: ${(theoreticalProbability * 100).toFixed(1)}%`}
                  />

                  {/* Empirical progress fill */}
                  <div
                    className={`h-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#B7A3E3] to-[#68539A]'
                        : 'bg-[#94A3B8]/50'
                    }`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational Insight Callout */}
      <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-start gap-2 text-xs text-[#475569] leading-relaxed">
        <Award className="w-4 h-4 text-[#68539A] shrink-0 mt-0.5" />
        <span>
          <strong>Law of Large Numbers in Action:</strong> Notice how running small batches (e.g. 10 trials) produces high sample error, whereas scaling up to 1,000+ trials consistently causes empirical frequencies to converge directly on the theoretical probability line.
        </span>
      </div>
    </div>
  );
};
