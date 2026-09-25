'use client';

import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { ParsedDataset } from '@/lib/csv/parser';

interface CSVColumnSelectorProps {
  dataset: ParsedDataset;
  selectedColumn?: string;
  onSelectColumn?: (col: string) => void;
  selectedXColumn?: string;
  onSelectXColumn?: (col: string) => void;
  selectedYColumn?: string;
  onSelectYColumn?: (col: string) => void;
  selectedTarget?: string;
  onSelectTarget?: (col: string) => void;
  numericOnly?: boolean;
  label?: string;
  className?: string;
}

export const CSVColumnSelector: React.FC<CSVColumnSelectorProps> = ({
  dataset,
  selectedColumn,
  onSelectColumn,
  selectedXColumn,
  onSelectXColumn,
  selectedYColumn,
  onSelectYColumn,
  selectedTarget,
  onSelectTarget,
  numericOnly = true,
  label,
  className = '',
}) => {
  const availableColumns = numericOnly ? dataset.numericColumns : dataset.headers;

  return (
    <div className={`p-4 bg-[#F8FAFC] dark:bg-[#1E293B] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-3 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
        <SlidersHorizontal className="w-3.5 h-3.5 text-blue-500" />
        <span>{label || 'Select Active Dataset Columns'}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Single Column Selector */}
        {onSelectColumn && (
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#475569] dark:text-[#CBD5E1]">
              Target Feature:
            </label>
            <select
              value={selectedColumn || availableColumns[0]}
              onChange={(e) => onSelectColumn(e.target.value)}
              className="w-full text-xs font-medium bg-white dark:bg-[#111827] border border-[#CBD5E1] dark:border-[#334155] rounded-lg px-2.5 py-1.5 text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-blue-500"
            >
              {availableColumns.map((col) => (
                <option key={col} value={col}>
                  {col} ({dataset.schemas[col]?.type || 'any'})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* X Bivariate Column Selector */}
        {onSelectXColumn && (
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#475569] dark:text-[#CBD5E1]">
              X-Axis Variable:
            </label>
            <select
              value={selectedXColumn || availableColumns[0]}
              onChange={(e) => onSelectXColumn(e.target.value)}
              className="w-full text-xs font-medium bg-white dark:bg-[#111827] border border-[#CBD5E1] dark:border-[#334155] rounded-lg px-2.5 py-1.5 text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-blue-500"
            >
              {availableColumns.map((col) => (
                <option key={col} value={col}>
                  {col} ({dataset.schemas[col]?.type || 'any'})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Y Bivariate Column Selector */}
        {onSelectYColumn && (
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#475569] dark:text-[#CBD5E1]">
              Y-Axis Variable:
            </label>
            <select
              value={selectedYColumn || availableColumns[1] || availableColumns[0]}
              onChange={(e) => onSelectYColumn(e.target.value)}
              className="w-full text-xs font-medium bg-white dark:bg-[#111827] border border-[#CBD5E1] dark:border-[#334155] rounded-lg px-2.5 py-1.5 text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-blue-500"
            >
              {availableColumns.map((col) => (
                <option key={col} value={col}>
                  {col} ({dataset.schemas[col]?.type || 'any'})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Target Column Selector for ML */}
        {onSelectTarget && (
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#475569] dark:text-[#CBD5E1]">
              Target Prediction Column ($y$):
            </label>
            <select
              value={selectedTarget || dataset.headers[dataset.headers.length - 1]}
              onChange={(e) => onSelectTarget(e.target.value)}
              className="w-full text-xs font-medium bg-white dark:bg-[#111827] border border-[#CBD5E1] dark:border-[#334155] rounded-lg px-2.5 py-1.5 text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-blue-500"
            >
              {dataset.headers.map((col) => (
                <option key={col} value={col}>
                  {col} ({dataset.schemas[col]?.type || 'any'})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
