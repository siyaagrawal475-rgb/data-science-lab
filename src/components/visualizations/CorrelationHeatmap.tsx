'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface CorrelationHeatmapProps {
  variables: string[];
  matrix: number[][]; // N x N values between -1 and 1
}

export const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({
  variables,
  matrix,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  if (!variables || variables.length === 0 || !matrix || matrix.length === 0) {
    return (
      <div className="text-center py-10 text-xs text-slate-400">
        No correlation matrix data available.
      </div>
    );
  }

  // Get color for correlation value r from -1 to 1
  const getColor = (r: number) => {
    if (r === 1) return isDark ? 'rgba(145, 185, 232, 0.4)' : 'rgba(145, 185, 232, 0.5)';
    if (r > 0) {
      const alpha = Math.min(Math.abs(r) * 0.7 + 0.1, 0.85);
      return `rgba(145, 185, 232, ${alpha})`;
    } else {
      const alpha = Math.min(Math.abs(r) * 0.7 + 0.1, 0.85);
      return `rgba(244, 165, 138, ${alpha})`;
    }
  };

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="inline-block min-w-full">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="p-2 text-xs font-semibold text-slate-400 text-left"></th>
              {variables.map((v, i) => (
                <th
                  key={i}
                  className="p-2 text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[100px]"
                  title={v}
                >
                  {v}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <td
                  className="p-2 text-xs font-bold text-slate-700 dark:text-slate-300 text-left truncate max-w-[120px]"
                  title={variables[rowIdx]}
                >
                  {variables[rowIdx]}
                </td>
                {row.map((val, colIdx) => (
                  <td key={colIdx} className="p-1">
                    <div
                      className="p-3 rounded-lg flex flex-col items-center justify-center transition-transform hover:scale-105"
                      style={{
                        backgroundColor: getColor(val),
                      }}
                      title={`${variables[rowIdx]} & ${variables[colIdx]}: r = ${val.toFixed(3)}`}
                    >
                      <span className="font-mono text-xs font-extrabold text-slate-900 dark:text-white">
                        {val.toFixed(2)}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#F4A58A]" />
          <span>Negative Correlation (-1.0)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-700" />
          <span>Zero Correlation (0.0)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#91B9E8]" />
          <span>Positive Correlation (+1.0)</span>
        </div>
      </div>
    </div>
  );
};
