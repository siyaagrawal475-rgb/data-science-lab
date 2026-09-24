'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export const MissingValueMatrix: React.FC<{ className?: string }> = ({ className = '' }) => {
  const columns = ['patient_id', 'age', 'blood_pressure', 'cholesterol', 'smoker_status', 'outcome'];
  // 10 rows with representative missing nulls
  const matrix = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1], // missing blood_pressure
    [1, 1, 1, 0, 1, 1], // missing cholesterol
    [1, 0, 1, 1, 1, 1], // missing age
    [1, 1, 1, 1, 0, 1], // missing smoker
    [1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1], // missing bp and chol
    [1, 1, 1, 1, 1, 0], // missing outcome
    [1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1], // missing age
  ];

  return (
    <div className={`p-5 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            Missing Value Nullity Matrix
          </h4>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
            Visualizing missing data patterns across columns (White = Present, Amber = Missing NaN)
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
          <AlertCircle className="w-4 h-4" />
          <span>7 Missing Fields</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#334155]">
        <div className="grid grid-cols-6 gap-1 p-2 bg-[#F8FAFC] dark:bg-[#172033] min-w-[320px]">
          {columns.map((col) => (
            <div key={col} className="text-center font-bold text-[10px] text-[#475569] dark:text-[#CBD5E1] truncate pb-1">
              {col}
            </div>
          ))}

          {matrix.map((row, rIdx) => (
            <React.Fragment key={rIdx}>
              {row.map((val, cIdx) => (
                <div
                  key={cIdx}
                  className={`h-4 rounded-xs transition-all ${
                    val === 1
                      ? 'bg-blue-500/80 dark:bg-blue-600/70'
                      : 'bg-amber-400 dark:bg-amber-500 animate-pulse'
                  }`}
                  title={`Row ${rIdx + 1}, ${columns[cIdx]}: ${val === 1 ? 'Present' : 'MISSING NaN'}`}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center text-[11px] text-[#64748B] dark:text-[#94A3B8]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-blue-500" /> Complete Valid Data
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-amber-400" /> Missing / Imputation Required
        </span>
      </div>
    </div>
  );
};
