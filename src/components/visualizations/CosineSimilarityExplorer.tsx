'use client';

import React, { useState } from 'react';

export const CosineSimilarityExplorer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [angle, setAngle] = useState(45);

  const rad = (angle * Math.PI) / 180;
  const cosSim = Math.cos(rad);

  // Vector 1 is fixed along [1, 0] (30 units length in SVG)
  // Vector 2 is rotated by angle
  const cx = 100;
  const cy = 100;
  const r = 70;

  const v2X = cx + r * Math.cos(rad);
  const v2Y = cy - r * Math.sin(rad);

  return (
    <div className={`p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            Cosine Similarity & Angle Meter
          </h4>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
            Angle between two unit vectors determines semantic similarity cos(θ)
          </p>
        </div>
        <div className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          cos({angle}°) = {cosSim.toFixed(4)}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        <div className="sm:col-span-6 flex justify-center bg-[#F8FAFC] dark:bg-[#172033] p-4 rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
          <svg width="200" height="200" className="overflow-visible select-none">
            {/* Coordinate axes */}
            <line x1="20" y1="100" x2="180" y2="100" stroke="#94A3B8" strokeWidth="1" />
            <line x1="100" y1="20" x2="100" y2="180" stroke="#94A3B8" strokeWidth="1" />

            {/* Arc between vectors */}
            <circle cx={cx} cy={cy} r="25" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Vector 1 (Blue fixed) */}
            <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#3B82F6" strokeWidth="3.5" strokeLinecap="round" />
            <text x={cx + r + 6} y={cy + 4} fill="#3B82F6" fontSize="10" fontWeight="bold">u</text>

            {/* Vector 2 (Purple rotating) */}
            <line x1={cx} y1={cy} x2={v2X} y2={v2Y} stroke="#A855F7" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx={v2X} cy={v2Y} r="4" fill="#A855F7" />
            <text x={v2X + 6} y={v2Y - 4} fill="#A855F7" fontSize="10" fontWeight="bold">v</text>
          </svg>
        </div>

        <div className="sm:col-span-6 space-y-4 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-[#0F172A] dark:text-[#F8FAFC]">
              <span>Angle θ (Degrees)</span>
              <span className="font-mono text-purple-600 dark:text-purple-400">{angle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="180"
              step="5"
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value))}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-[10px] text-[#94A3B8]">
              <span>0° (Identical: +1.0)</span>
              <span>90° (Orthogonal: 0.0)</span>
              <span>180° (Opposite: -1.0)</span>
            </div>
          </div>

          <div className="p-3 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-1">
            <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">Interpretation:</span>
            <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
              {angle === 0 && 'Vectors point in the exact same direction. Perfect alignment (1.000).'}
              {angle > 0 && angle < 90 && 'Vectors share positive directional correlation (Acute angle).'}
              {angle === 90 && 'Vectors are strictly orthogonal / perpendicular (Zero linear correlation).'}
              {angle > 90 && angle < 180 && 'Vectors point in opposing quadrants (Negative correlation).'}
              {angle === 180 && 'Vectors point in diametrically opposite directions (-1.000).'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
