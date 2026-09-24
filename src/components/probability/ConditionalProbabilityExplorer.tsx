'use client';

import React, { useState, useMemo } from 'react';
import { conditionalProbability } from '@/lib/statisticsMath';
import { GitCompare, CheckCircle2, AlertCircle } from 'lucide-react';

export const ConditionalProbabilityExplorer: React.FC = () => {
  const [probA, setProbA] = useState<number>(0.50);
  const [probB, setProbB] = useState<number>(0.40);
  const [probJoint, setProbJoint] = useState<number>(0.20);

  // Maximum valid joint probability is min(P(A), P(B))
  const maxJoint = useMemo(() => Math.min(probA, probB), [probA, probB]);
  // Minimum valid joint probability to ensure P(A ∪ B) <= 1 is max(0, P(A) + P(B) - 1)
  const minJoint = useMemo(() => Math.max(0, probA + probB - 1), [probA, probB]);

  // Clamp joint prob within valid theoretical bounds
  const validJoint = useMemo(() => {
    return Math.max(minJoint, Math.min(maxJoint, probJoint));
  }, [probJoint, minJoint, maxJoint]);

  const probUnion = useMemo(() => {
    return Math.min(1, Math.max(0, probA + probB - validJoint));
  }, [probA, probB, validJoint]);

  const probAGivenB = useMemo(() => {
    return conditionalProbability(validJoint, probB);
  }, [validJoint, probB]);

  const probBGivenA = useMemo(() => {
    return conditionalProbability(validJoint, probA);
  }, [validJoint, probA]);

  const independentJoint = useMemo(() => probA * probB, [probA, probB]);
  const isIndependent = useMemo(() => {
    return Math.abs(validJoint - independentJoint) < 0.01;
  }, [validJoint, independentJoint]);

  const handleProbAChange = (newA: number) => {
    setProbA(newA);
    const newMaxJoint = Math.min(newA, probB);
    const newMinJoint = Math.max(0, newA + probB - 1);
    if (probJoint > newMaxJoint) setProbJoint(newMaxJoint);
    if (probJoint < newMinJoint) setProbJoint(newMinJoint);
  };

  const handleProbBChange = (newB: number) => {
    setProbB(newB);
    const newMaxJoint = Math.min(probA, newB);
    const newMinJoint = Math.max(0, probA + newB - 1);
    if (probJoint > newMaxJoint) setProbJoint(newMaxJoint);
    if (probJoint < newMinJoint) setProbJoint(newMinJoint);
  };

  const setIndependencePreset = () => {
    setProbJoint(Number((probA * probB).toFixed(3)));
  };

  const setDisjointPreset = () => {
    setProbJoint(0);
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#EEE9F8] text-[#68539A]">
              <GitCompare className="w-4 h-4" />
            </span>
            Conditional Probability & Independence Explorer
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Adjust marginal events and overlap to inspect conditional likelihoods P(A | B) and test independence.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex gap-2">
          <button
            onClick={setIndependencePreset}
            className="px-3 py-1.5 bg-[#F8FAFC] hover:bg-[#EEE9F8] text-[#68539A] border border-[#E2E8F0] hover:border-[#CFC2EA] rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            Make Independent
          </button>
          <button
            onClick={setDisjointPreset}
            disabled={probA + probB > 1}
            className="px-3 py-1.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] rounded-xl text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Make Disjoint
          </button>
        </div>
      </div>

      {/* Probability Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
        <div>
          <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
            <span>P(Event A): {(probA * 100).toFixed(0)}%</span>
            <span className="text-[#68539A] font-mono">{probA.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.95"
            step="0.05"
            value={probA}
            onChange={(e) => handleProbAChange(Number(e.target.value))}
            className="w-full accent-[#68539A] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
            <span>P(Event B): {(probB * 100).toFixed(0)}%</span>
            <span className="text-[#68539A] font-mono">{probB.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.95"
            step="0.05"
            value={probB}
            onChange={(e) => handleProbBChange(Number(e.target.value))}
            className="w-full accent-[#68539A] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
            <span>Joint P(A ∩ B): {(validJoint * 100).toFixed(0)}%</span>
            <span className="text-[#68539A] font-mono">{validJoint.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={minJoint}
            max={maxJoint}
            step="0.01"
            value={validJoint}
            onChange={(e) => setProbJoint(Number(e.target.value))}
            className="w-full accent-[#68539A] cursor-pointer"
          />
          <span className="text-[10px] text-[#94A3B8] block mt-0.5">
            Valid range: [{minJoint.toFixed(2)}, {maxJoint.toFixed(2)}]
          </span>
        </div>
      </div>

      {/* Visual Venn / Overlap Box Representation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
          <span>Probability Sample Space Partition S = 1.0</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]">
            P(A ∪ B) = {probUnion.toFixed(2)}
          </span>
        </div>

        <div className="relative w-full h-32 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0] overflow-hidden flex items-center justify-center p-4">
          <svg viewBox="0 0 500 120" className="w-full h-full">
            {/* Event A Circle */}
            <circle
              cx={210}
              cy={60}
              r={Math.sqrt(probA) * 55 + 15}
              fill="#B7A3E3"
              fillOpacity="0.45"
              stroke="#68539A"
              strokeWidth="2"
            />
            {/* Event B Circle */}
            <circle
              cx={290 - (validJoint / (maxJoint || 1)) * 40}
              cy={60}
              r={Math.sqrt(probB) * 55 + 15}
              fill="#91B9E8"
              fillOpacity="0.4"
              stroke="#416B9E"
              strokeWidth="2"
            />
            {/* Labels */}
            <text x={170} y={65} fontSize="12" fontWeight="bold" fill="#68539A">
              A only ({((probA - validJoint) * 100).toFixed(0)}%)
            </text>
            <text x={250} y={65} fontSize="11" fontWeight="bold" fill="#0F172A" textAnchor="middle">
              A ∩ B ({ (validJoint * 100).toFixed(0) }%)
            </text>
            <text x={330} y={65} fontSize="12" fontWeight="bold" fill="#416B9E">
              B only ({((probB - validJoint) * 100).toFixed(0)}%)
            </text>
          </svg>
        </div>
      </div>

      {/* Computed Conditional Likelihood Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-[#EEE9F8] rounded-xl border border-[#CFC2EA]">
          <span className="text-[11px] font-bold text-[#68539A] uppercase block">
            P(A | B) = P(A ∩ B) / P(B)
          </span>
          <span className="text-lg font-extrabold text-[#68539A]">
            {probAGivenB !== null ? `${(probAGivenB * 100).toFixed(1)}%` : 'Undefined'}
          </span>
          <span className="text-[10px] text-[#68539A] block mt-0.5">
            {probAGivenB !== null ? `(${validJoint.toFixed(2)} / ${probB.toFixed(2)})` : 'P(B) = 0'}
          </span>
        </div>

        <div className="p-3.5 bg-[#EEE9F8] rounded-xl border border-[#CFC2EA]">
          <span className="text-[11px] font-bold text-[#68539A] uppercase block">
            P(B | A) = P(A ∩ B) / P(A)
          </span>
          <span className="text-lg font-extrabold text-[#68539A]">
            {probBGivenA !== null ? `${(probBGivenA * 100).toFixed(1)}%` : 'Undefined'}
          </span>
          <span className="text-[10px] text-[#68539A] block mt-0.5">
            {probBGivenA !== null ? `(${validJoint.toFixed(2)} / ${probA.toFixed(2)})` : 'P(A) = 0'}
          </span>
        </div>

        <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          <span className="text-[11px] font-bold text-[#64748B] uppercase block">
            P(A ∪ B) Total Union
          </span>
          <span className="text-lg font-extrabold text-[#0F172A]">
            {(probUnion * 100).toFixed(1)}%
          </span>
          <span className="text-[10px] text-[#64748B] block mt-0.5">
            {probA.toFixed(2)} + {probB.toFixed(2)} - {validJoint.toFixed(2)}
          </span>
        </div>

        <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          <span className="text-[11px] font-bold text-[#64748B] uppercase block">
            Independence Status
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            {isIndependent ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span className={`text-xs font-bold ${isIndependent ? 'text-emerald-700' : 'text-amber-700'}`}>
              {isIndependent ? 'Independent' : 'Dependent'}
            </span>
          </div>
          <span className="text-[10px] text-[#94A3B8] block mt-0.5">
            P(A)·P(B) = {independentJoint.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
