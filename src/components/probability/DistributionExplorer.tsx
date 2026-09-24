'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  normalPDF,
  normalCDF,
  binomialPMF,
  poissonPMF,
  bernoulliPMF,
  uniformPDF,
} from '@/lib/statisticsMath';
import { Activity } from 'lucide-react';

type DistributionType = 'normal' | 'binomial' | 'poisson' | 'bernoulli' | 'uniform';

export const DistributionExplorer: React.FC = () => {
  const [distType, setDistType] = useState<DistributionType>('normal');

  // Normal params
  const [mu, setMu] = useState<number>(0);
  const [sigma, setSigma] = useState<number>(1);

  // Binomial params
  const [nTrials, setNTrials] = useState<number>(10);
  const [pSuccess, setPSuccess] = useState<number>(0.5);

  // Poisson params
  const [lambda, setLambda] = useState<number>(4);

  // Bernoulli params
  const [pBernoulli, setPBernoulli] = useState<number>(0.7);

  // Uniform params
  const [lowerA, setLowerA] = useState<number>(-2);
  const [upperB, setUpperB] = useState<number>(4);

  // Range highlight
  const [rangeMin, setRangeMin] = useState<number>(-1);
  const [rangeMax, setRangeMax] = useState<number>(1);

  // Computed theoretical metrics
  const { expectedValue, theoreticalVariance, distributionPoints, isDiscrete, intervalProbability } = useMemo(() => {
    if (distType === 'normal') {
      const expVal = mu;
      const varVal = sigma * sigma;
      const step = (sigma * 8) / 80;
      const pts: { x: number; y: number }[] = [];
      for (let x = mu - 4 * sigma; x <= mu + 4 * sigma; x += step) {
        pts.push({ x, y: normalPDF(x, mu, sigma) });
      }
      const pInterval = Math.max(0, normalCDF(rangeMax, mu, sigma) - normalCDF(rangeMin, mu, sigma));
      return {
        expectedValue: expVal,
        theoreticalVariance: varVal,
        distributionPoints: pts,
        isDiscrete: false,
        intervalProbability: pInterval,
      };
    }

    if (distType === 'binomial') {
      const expVal = nTrials * pSuccess;
      const varVal = nTrials * pSuccess * (1 - pSuccess);
      const pts: { x: number; y: number }[] = [];
      let sumProb = 0;
      for (let k = 0; k <= nTrials; k++) {
        const pmfVal = binomialPMF(k, nTrials, pSuccess);
        pts.push({ x: k, y: pmfVal });
        if (k >= rangeMin && k <= rangeMax) {
          sumProb += pmfVal;
        }
      }
      return {
        expectedValue: expVal,
        theoreticalVariance: varVal,
        distributionPoints: pts,
        isDiscrete: true,
        intervalProbability: sumProb,
      };
    }

    if (distType === 'poisson') {
      const expVal = lambda;
      const varVal = lambda;
      const maxK = Math.max(15, Math.ceil(lambda + 4 * Math.sqrt(lambda)));
      const pts: { x: number; y: number }[] = [];
      let sumProb = 0;
      for (let k = 0; k <= maxK; k++) {
        const pmfVal = poissonPMF(k, lambda);
        pts.push({ x: k, y: pmfVal });
        if (k >= rangeMin && k <= rangeMax) {
          sumProb += pmfVal;
        }
      }
      return {
        expectedValue: expVal,
        theoreticalVariance: varVal,
        distributionPoints: pts,
        isDiscrete: true,
        intervalProbability: sumProb,
      };
    }

    if (distType === 'bernoulli') {
      const expVal = pBernoulli;
      const varVal = pBernoulli * (1 - pBernoulli);
      const pts = [
        { x: 0, y: bernoulliPMF(0, pBernoulli) },
        { x: 1, y: bernoulliPMF(1, pBernoulli) },
      ];
      let sumProb = 0;
      if (0 >= rangeMin && 0 <= rangeMax) sumProb += pts[0].y;
      if (1 >= rangeMin && 1 <= rangeMax) sumProb += pts[1].y;
      return {
        expectedValue: expVal,
        theoreticalVariance: varVal,
        distributionPoints: pts,
        isDiscrete: true,
        intervalProbability: sumProb,
      };
    }

    // Uniform
    const expVal = (lowerA + upperB) / 2;
    const varVal = Math.pow(upperB - lowerA, 2) / 12;
    const padding = (upperB - lowerA) * 0.3;
    const pts: { x: number; y: number }[] = [];
    const step = (upperB - lowerA + 2 * padding) / 80;
    for (let x = lowerA - padding; x <= upperB + padding; x += step) {
      pts.push({ x, y: uniformPDF(x, lowerA, upperB) });
    }
    const clampedMin = Math.max(lowerA, rangeMin);
    const clampedMax = Math.min(upperB, rangeMax);
    const pInterval = clampedMax > clampedMin ? (clampedMax - clampedMin) / (upperB - lowerA) : 0;

    return {
      expectedValue: expVal,
      theoreticalVariance: varVal,
      distributionPoints: pts,
      isDiscrete: false,
      intervalProbability: pInterval,
    };
  }, [distType, mu, sigma, nTrials, pSuccess, lambda, pBernoulli, lowerA, upperB, rangeMin, rangeMax]);

  // SVG dimensions for chart
  const svgWidth = 600;
  const svgHeight = 220;
  const margin = { top: 20, right: 30, bottom: 40, left: 45 };

  const xMin = useMemo(() => {
    return distributionPoints.length > 0 ? distributionPoints[0].x : 0;
  }, [distributionPoints]);

  const xMax = useMemo(() => {
    return distributionPoints.length > 0 ? distributionPoints[distributionPoints.length - 1].x : 10;
  }, [distributionPoints]);

  const maxY = useMemo(() => {
    const maxVal = Math.max(...distributionPoints.map((p) => p.y), 0.05);
    return maxVal * 1.15;
  }, [distributionPoints]);

  const getSvgX = useCallback(
    (x: number) => {
      if (xMax === xMin) return margin.left;
      return margin.left + ((x - xMin) / (xMax - xMin)) * (svgWidth - margin.left - margin.right);
    },
    [xMin, xMax, margin.left, margin.right, svgWidth]
  );

  const getSvgY = useCallback(
    (y: number) => {
      return svgHeight - margin.bottom - (y / maxY) * (svgHeight - margin.top - margin.bottom);
    },
    [maxY, margin.bottom, margin.top, svgHeight]
  );

  const pathString = useMemo(() => {
    if (isDiscrete || distributionPoints.length === 0) return '';
    return distributionPoints.reduce((acc, pt, idx) => {
      const sx = getSvgX(pt.x);
      const sy = getSvgY(pt.y);
      return idx === 0 ? `M ${sx} ${sy}` : `${acc} L ${sx} ${sy}`;
    }, '');
  }, [isDiscrete, distributionPoints, getSvgX, getSvgY]);

  return (
    <div className="p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#EEE9F8] text-[#68539A]">
              <Activity className="w-4 h-4" />
            </span>
            Probability Distribution Explorer
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Interact with discrete PMFs and continuous PDFs to visualize parameters, shape, and interval probabilities.
          </p>
        </div>

        {/* Distribution Selection Pill Tabs */}
        <div className="flex flex-wrap gap-1 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl self-start sm:self-auto">
          {(['normal', 'binomial', 'poisson', 'bernoulli', 'uniform'] as DistributionType[]).map((t) => (
            <button
              key={t}
              onClick={() => setDistType(t)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                distType === t
                  ? 'bg-white text-[#68539A] shadow-xs border border-[#CFC2EA]'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
        {distType === 'normal' && (
          <>
            <div>
              <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                <span>Mean (μ): {mu.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.5"
                value={mu}
                onChange={(e) => setMu(Number(e.target.value))}
                className="w-full accent-[#68539A] cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                <span>Std Dev (σ): {sigma.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.2"
                value={sigma}
                onChange={(e) => setSigma(Number(e.target.value))}
                className="w-full accent-[#68539A] cursor-pointer"
              />
            </div>
          </>
        )}

        {distType === 'binomial' && (
          <>
            <div>
              <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                <span>Trials (n): {nTrials}</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                step="1"
                value={nTrials}
                onChange={(e) => setNTrials(Number(e.target.value))}
                className="w-full accent-[#68539A] cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                <span>Success Prob (p): {pSuccess.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.95"
                step="0.05"
                value={pSuccess}
                onChange={(e) => setPSuccess(Number(e.target.value))}
                className="w-full accent-[#68539A] cursor-pointer"
              />
            </div>
          </>
        )}

        {distType === 'poisson' && (
          <div>
            <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
              <span>Rate (λ): {lambda.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="12"
              step="0.5"
              value={lambda}
              onChange={(e) => setLambda(Number(e.target.value))}
              className="w-full accent-[#68539A] cursor-pointer"
            />
          </div>
        )}

        {distType === 'bernoulli' && (
          <div>
            <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
              <span>Success Prob (p): {pBernoulli.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={pBernoulli}
              onChange={(e) => setPBernoulli(Number(e.target.value))}
              className="w-full accent-[#68539A] cursor-pointer"
            />
          </div>
        )}

        {distType === 'uniform' && (
          <>
            <div>
              <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                <span>Lower Bound (a): {lowerA}</span>
              </div>
              <input
                type="range"
                min="-5"
                max="2"
                step="1"
                value={lowerA}
                onChange={(e) => setLowerA(Number(e.target.value))}
                className="w-full accent-[#68539A] cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
                <span>Upper Bound (b): {upperB}</span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                step="1"
                value={upperB}
                onChange={(e) => setUpperB(Number(e.target.value))}
                className="w-full accent-[#68539A] cursor-pointer"
              />
            </div>
          </>
        )}

        {/* Interval Range Bounds */}
        <div>
          <div className="flex justify-between text-xs font-bold text-[#475569] mb-1">
            <span>Interval [a, b]: [{rangeMin}, {rangeMax}]</span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={rangeMin}
              onChange={(e) => setRangeMin(Number(e.target.value))}
              className="w-1/2 px-2 py-1 bg-white border border-[#E2E8F0] rounded text-xs"
              placeholder="Min"
            />
            <input
              type="number"
              value={rangeMax}
              onChange={(e) => setRangeMax(Number(e.target.value))}
              className="w-1/2 px-2 py-1 bg-white border border-[#E2E8F0] rounded text-xs"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Distribution Chart (SVG) */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-[#0F172A]">
          <span>
            {isDiscrete ? 'Probability Mass Function (PMF)' : 'Probability Density Function (PDF)'}
          </span>
          <span className="text-[#68539A]">
            P({rangeMin} ≤ X ≤ {rangeMax}) = {(intervalProbability * 100).toFixed(2)}%
          </span>
        </div>

        <div className="w-full overflow-x-auto bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] flex justify-center">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-[600px] h-[220px]"
          >
            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
              const yVal = frac * maxY;
              const sy = getSvgY(yVal);
              return (
                <g key={frac}>
                  <line
                    x1={margin.left}
                    y1={sy}
                    x2={svgWidth - margin.right}
                    y2={sy}
                    stroke="#E2E8F0"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={margin.left - 8}
                    y={sy + 3}
                    fontSize="9"
                    fill="#94A3B8"
                    textAnchor="end"
                  >
                    {yVal.toFixed(2)}
                  </text>
                </g>
              );
            })}

            {/* X-Axis */}
            <line
              x1={margin.left}
              y1={svgHeight - margin.bottom}
              x2={svgWidth - margin.right}
              y2={svgHeight - margin.bottom}
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />

            {/* Render Discrete Bars */}
            {isDiscrete &&
              distributionPoints.map((pt) => {
                const sx = getSvgX(pt.x);
                const sy = getSvgY(pt.y);
                const isHighlighted = pt.x >= rangeMin && pt.x <= rangeMax;
                return (
                  <g key={pt.x}>
                    {/* Vertical stem */}
                    <line
                      x1={sx}
                      y1={svgHeight - margin.bottom}
                      x2={sx}
                      y2={sy}
                      stroke={isHighlighted ? '#68539A' : '#94A3B8'}
                      strokeWidth={isHighlighted ? '3' : '2'}
                    />
                    {/* Top dot */}
                    <circle
                      cx={sx}
                      cy={sy}
                      r={isHighlighted ? '4.5' : '3.5'}
                      fill={isHighlighted ? '#68539A' : '#64748B'}
                    />
                    {/* X-Label */}
                    <text
                      x={sx}
                      y={svgHeight - margin.bottom + 14}
                      fontSize="9"
                      fill="#64748B"
                      textAnchor="middle"
                    >
                      {pt.x}
                    </text>
                  </g>
                );
              })}

            {/* Render Continuous Curve and Fill Area */}
            {!isDiscrete && (
              <>
                {/* Area Fill for interval */}
                <path
                  d={`${pathString} L ${getSvgX(xMax)} ${svgHeight - margin.bottom} L ${getSvgX(xMin)} ${svgHeight - margin.bottom} Z`}
                  fill="#EEE9F8"
                  opacity="0.6"
                />
                {/* Curve line */}
                <path
                  d={pathString}
                  fill="none"
                  stroke="#68539A"
                  strokeWidth="2.5"
                />
                {/* X labels at ticks */}
                {[-4, -2, 0, 2, 4, 6, 8]
                  .filter((v) => v >= xMin && v <= xMax)
                  .map((tick) => (
                    <text
                      key={tick}
                      x={getSvgX(tick)}
                      y={svgHeight - margin.bottom + 14}
                      fontSize="9"
                      fill="#64748B"
                      textAnchor="middle"
                    >
                      {tick}
                    </text>
                  ))}
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Computed Summary Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          <span className="text-[11px] font-bold text-[#64748B] uppercase block">
            Expected Value E[X]
          </span>
          <span className="text-base sm:text-lg font-extrabold text-[#0F172A]">
            {expectedValue.toFixed(3)}
          </span>
        </div>

        <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          <span className="text-[11px] font-bold text-[#64748B] uppercase block">
            Variance Var(X)
          </span>
          <span className="text-base sm:text-lg font-extrabold text-[#0F172A]">
            {theoreticalVariance.toFixed(3)}
          </span>
        </div>

        <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          <span className="text-[11px] font-bold text-[#64748B] uppercase block">
            Std Dev σ
          </span>
          <span className="text-base sm:text-lg font-extrabold text-[#0F172A]">
            {Math.sqrt(theoreticalVariance).toFixed(3)}
          </span>
        </div>

        <div className="p-3 bg-[#EEE9F8] rounded-xl border border-[#CFC2EA]">
          <span className="text-[11px] font-bold text-[#68539A] uppercase block">
            P({rangeMin} ≤ X ≤ {rangeMax})
          </span>
          <span className="text-base sm:text-lg font-extrabold text-[#68539A]">
            {(intervalProbability * 100).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};
