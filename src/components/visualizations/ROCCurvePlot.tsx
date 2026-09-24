import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

export const ROCCurvePlot: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeThreshold, setActiveThreshold] = useState(0.4);

  // Simulated ROC Points (FPR, TPR)
  const rocPoints = [
    { threshold: 1.0, fpr: 0.0, tpr: 0.0 },
    { threshold: 0.8, fpr: 0.05, tpr: 0.45 },
    { threshold: 0.6, fpr: 0.12, tpr: 0.72 },
    { threshold: 0.4, fpr: 0.20, tpr: 0.88 },
    { threshold: 0.2, fpr: 0.45, tpr: 0.96 },
    { threshold: 0.0, fpr: 1.0, tpr: 1.0 },
  ];

  const auc = 0.895;

  const toSvgX = (fpr: number) => 35 + fpr * 240;
  const toSvgY = (tpr: number) => 215 - tpr * 180;

  const pathPoints = rocPoints.map((p) => `${toSvgX(p.fpr)},${toSvgY(p.tpr)}`).join(' ');
  const areaPoints = `${toSvgX(0)},215 ${pathPoints} ${toSvgX(1)},215`;

  // Find point closest to current slider threshold
  const currentPt = rocPoints.reduce((prev, curr) =>
    Math.abs(curr.threshold - activeThreshold) < Math.abs(prev.threshold - activeThreshold) ? curr : prev
  );

  return (
    <div className={`p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            Receiver Operating Characteristic (ROC) Curve
          </h4>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
            True Positive Rate (Sensitivity) vs False Positive Rate (1 - Specificity)
          </p>
        </div>
        <div className="text-xs font-bold px-2.5 py-1 rounded-full bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
          AUC = {auc.toFixed(3)} (Excellent)
        </div>
      </div>

      {/* Interactive Threshold Slider */}
      <div className="p-3 bg-[#F8FAFC] dark:bg-[#1E293B] rounded-xl border border-[#E2E8F0] dark:border-[#334155] flex items-center gap-3">
        <Sliders className="w-4 h-4 text-pink-500 shrink-0" />
        <span className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] whitespace-nowrap">
          Decision Threshold: {activeThreshold.toFixed(2)}
        </span>
        <input
          type="range"
          min="0.0"
          max="1.0"
          step="0.2"
          value={activeThreshold}
          onChange={(e) => setActiveThreshold(parseFloat(e.target.value))}
          className="w-full accent-pink-500 cursor-pointer"
        />
      </div>

      <div className="flex justify-center bg-[#F8FAFC] dark:bg-[#172033] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
        <svg width="300" height="240" className="overflow-visible select-none">
          {/* Axis lines */}
          <line x1="35" y1="215" x2="285" y2="215" stroke="#94A3B8" strokeWidth="1.2" />
          <line x1="35" y1="35" x2="35" y2="215" stroke="#94A3B8" strokeWidth="1.2" />

          {/* Random Guess 45-degree Diagonal Line (Dashed) */}
          <line x1="35" y1="215" x2="275" y2="35" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x="180" y="145" fill="#94A3B8" fontSize="8" transform="rotate(-38, 180, 145)">
            Random Baseline (AUC = 0.50)
          </text>

          {/* Shaded Area under curve */}
          <polygon points={areaPoints} fill="rgba(217, 154, 175, 0.20)" />

          {/* ROC Curve */}
          <polyline
            points={pathPoints}
            fill="none"
            stroke="#D99AAF"
            strokeWidth="3"
          />

          {/* Points on ROC */}
          {rocPoints.map((p, i) => (
            <circle
              key={i}
              cx={toSvgX(p.fpr)}
              cy={toSvgY(p.tpr)}
              r="3.5"
              fill="#D99AAF"
            />
          ))}

          {/* Active Threshold Indicator Point */}
          <circle
            cx={toSvgX(currentPt.fpr)}
            cy={toSvgY(currentPt.tpr)}
            r="6"
            fill="#EC4899"
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {/* Axis Labels */}
          <text x="160" y="234" fill="#64748B" fontSize="10" textAnchor="middle" fontWeight="bold">
            False Positive Rate (FPR)
          </text>
          <text x="15" y="125" fill="#64748B" fontSize="10" textAnchor="middle" fontWeight="bold" transform="rotate(-90, 15, 125)">
            True Positive Rate (TPR)
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2.5 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-center">
          <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] block">Threshold t</span>
          <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] font-mono">{currentPt.threshold.toFixed(2)}</span>
        </div>
        <div className="p-2.5 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-center">
          <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] block">TPR (Sensitivity)</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{(currentPt.tpr * 100).toFixed(0)}%</span>
        </div>
        <div className="p-2.5 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-center">
          <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] block">FPR (1 - Spec)</span>
          <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">{(currentPt.fpr * 100).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};
