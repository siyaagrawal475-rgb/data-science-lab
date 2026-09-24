'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Play, RotateCcw, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Unit5GradientDescentSim: React.FC = () => {
  const [learningRate, setLearningRate] = useState(0.15);
  const [theta, setTheta] = useState(4.0);
  const [history, setHistory] = useState<number[]>([4.0]);
  const [isAutoRunning, setIsAutoRunning] = useState(false);

  // Parabolic convex cost function: J(θ) = 0.5 * (θ - 1)² + 2
  // Derivative dJ/dθ = θ - 1
  // Minimum at θ* = 1.0, J(θ*) = 2.0
  const costFunction = (t: number) => 0.5 * Math.pow(t - 1, 2) + 2;
  const gradient = (t: number) => t - 1;

  const currentCost = costFunction(theta);
  const currentGrad = gradient(theta);

  // Single step of gradient descent: θ := θ - α * dJ/dθ
  const step = () => {
    setTheta((prev) => {
      const next = prev - learningRate * gradient(prev);
      setHistory((h) => [...h, next]);
      return next;
    });
  };

  const reset = () => {
    setIsAutoRunning(false);
    setTheta(4.0);
    setHistory([4.0]);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isAutoRunning) {
      timer = setInterval(() => {
        setTheta((prev) => {
          if (Math.abs(gradient(prev)) < 0.001 || history.length > 50) {
            setIsAutoRunning(false);
            return prev;
          }
          const next = prev - learningRate * gradient(prev);
          setHistory((h) => [...h, next]);
          return next;
        });
      }, 300);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoRunning, learningRate, history.length]);

  // SVG coordinate transformation (X: [-2, 5], Y: [0, 12])
  const toSvgX = (x: number) => 30 + ((x + 2) / 7) * 240;
  const toSvgY = (y: number) => 220 - (y / 12) * 190;

  // Generate curve points for J(θ)
  const curvePoints: string[] = [];
  for (let x = -2; x <= 5; x += 0.2) {
    const y = costFunction(x);
    curvePoints.push(`${toSvgX(x)},${toSvgY(y)}`);
  }

  return (
    <div className="p-6 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-6">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-[#334155] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF2D8] dark:bg-[#E8C878]/20 text-[#806A28] dark:text-[#FBE6A6] border border-[#EBD99A] dark:border-[#E8C878]/40">
              Unit 5 Interactive Simulation
            </span>
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">Optimization & Loss Minimization</span>
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
            Visual Gradient Descent & Convex Cost Function Playground
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAutoRunning((r) => !r)}
            leftIcon={<Play className="w-3.5 h-3.5" />}
          >
            {isAutoRunning ? 'Pause Optimization' : 'Auto Step (Play)'}
          </Button>
        </div>
      </div>

      {/* Main Grid: Loss Curve on Left, Controls on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Cost Function Curve */}
        <div className="lg:col-span-7 flex justify-center bg-[#F8FAFC] dark:bg-[#172033] p-4 rounded-2xl border border-[#E2E8F0] dark:border-[#334155]">
          <svg width="300" height="240" className="overflow-visible select-none">
            {/* Axis lines */}
            <line x1="30" y1="220" x2="280" y2="220" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="30" y1="20" x2="30" y2="220" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="270" y="235" fill="#64748B" fontSize="10" fontWeight="bold">θ</text>
            <text x="10" y="25" fill="#64748B" fontSize="10" fontWeight="bold">J(θ)</text>

            {/* Parabolic Loss Curve J(θ) */}
            <polyline
              points={curvePoints.join(' ')}
              fill="none"
              stroke="#E8C878"
              strokeWidth="3.5"
            />

            {/* Global Minimum Marker (θ* = 1.0) */}
            <circle cx={toSvgX(1.0)} cy={toSvgY(2.0)} r="4" fill="#10B981" />
            <text x={toSvgX(1.0) - 15} y={toSvgY(2.0) + 16} fill="#10B981" fontSize="9" fontWeight="bold">
              Min (1.0, 2.0)
            </text>

            {/* Trajectory history steps */}
            {history.map((hVal, idx) => (
              <React.Fragment key={idx}>
                <circle
                  cx={toSvgX(hVal)}
                  cy={toSvgY(costFunction(hVal))}
                  r="3"
                  fill="#94A3B8"
                  opacity={0.6}
                />
                {idx > 0 && (
                  <line
                    x1={toSvgX(history[idx - 1])}
                    y1={toSvgY(costFunction(history[idx - 1]))}
                    x2={toSvgX(hVal)}
                    y2={toSvgY(costFunction(hVal))}
                    stroke="#F59E0B"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                  />
                )}
              </React.Fragment>
            ))}

            {/* Current Parameter Position (Large Amber Circle) */}
            <circle
              cx={toSvgX(theta)}
              cy={toSvgY(currentCost)}
              r="6.5"
              fill="#F59E0B"
              stroke="#FFFFFF"
              strokeWidth="2"
            />

            {/* Tangent line at current point */}
            <line
              x1={toSvgX(theta - 0.8)}
              y1={toSvgY(currentCost - 0.8 * currentGrad)}
              x2={toSvgX(theta + 0.8)}
              y2={toSvgY(currentCost + 0.8 * currentGrad)}
              stroke="#EF4444"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Controls Panel */}
        <div className="lg:col-span-5 space-y-4 text-xs">
          <div className="p-4 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-3">
            <h4 className="font-bold text-[#806A28] dark:text-[#FBE6A6] flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Hyperparameter Controls</span>
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                <span>Learning Rate (α)</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">{learningRate}</span>
              </div>
              <input
                type="range"
                min="0.02"
                max="1.8"
                step="0.02"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-[#94A3B8]">
                <span>0.02 (Slow)</span>
                <span>0.50 (Optimal)</span>
                <span>1.80 (Overshoot / Diverge)</span>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={step} className="w-full">
                Step Gradient Descent Once (θ := θ - α∇J)
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Parameter θ</span>
          <div className="text-base font-extrabold text-[#0F172A] dark:text-[#F8FAFC] font-mono">
            {theta.toFixed(4)}
          </div>
          <span className="text-[10px] text-[#94A3B8]">Target minimum θ* = 1.000</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Cost J(θ)</span>
          <div className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono">
            {currentCost.toFixed(4)}
          </div>
          <span className="text-[10px] text-[#94A3B8]">Loss value to minimize</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Gradient ∇J(θ)</span>
          <div className="text-base font-extrabold text-rose-600 dark:text-rose-400 font-mono">
            {currentGrad.toFixed(4)}
          </div>
          <span className="text-[10px] text-[#94A3B8]">Slope of tangent line</span>
        </div>

        <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-0.5">
          <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase">Iterations Done</span>
          <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-mono">
            {history.length - 1} steps
          </div>
          <span className="text-[10px] text-[#94A3B8]">Optimization epoch count</span>
        </div>
      </div>

      {/* Educational Box */}
      <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-[#1E293B] border border-amber-200/70 dark:border-amber-900/40 text-xs space-y-2">
        <div className="font-bold text-[#806A28] dark:text-[#FBE6A6] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Gradient Descent Dynamics:</span>
        </div>
        <p className="text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
          Try setting <strong>Learning Rate α = 1.6</strong>. Notice how the optimizer overshoots the valley and oscillates wildly! At <strong>α = 0.15</strong>, it takes steady, decreasing steps as the slope ∇J flattens near the minimum.
        </p>
      </div>
    </div>
  );
};
