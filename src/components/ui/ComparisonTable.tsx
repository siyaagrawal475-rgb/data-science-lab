'use client';

import React, { useState } from 'react';
import { Search, Info } from 'lucide-react';
import { ComparisonTableData } from '@/types/experiences';

interface ComparisonTableProps {
  data: ComparisonTableData;
  className?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ data, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredRows = data.rows.filter((row) =>
    Object.values(row).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={`p-6 bg-white dark:bg-[#111827] rounded-2xl border border-[#E2E8F0] dark:border-[#334155] shadow-xs space-y-5 ${className}`}>
      {/* Header & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">{data.title}</h3>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{data.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search concepts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="sm:hidden flex bg-[#F1F5F9] dark:bg-[#1E293B] p-0.5 rounded-lg border border-[#E2E8F0] dark:border-[#334155]">
            <button
              onClick={() => setViewMode('table')}
              className={`px-2 py-1 text-[10px] font-bold rounded ${viewMode === 'table' ? 'bg-white dark:bg-[#111827] shadow-xs text-[#0F172A] dark:text-[#F8FAFC]' : 'text-[#64748B]'}`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2 py-1 text-[10px] font-bold rounded ${viewMode === 'cards' ? 'bg-white dark:bg-[#111827] shadow-xs text-[#0F172A] dark:text-[#F8FAFC]' : 'text-[#64748B]'}`}
            >
              Cards
            </button>
          </div>
        </div>
      </div>

      {/* Table View (Desktop + Mobile fallback) */}
      <div className={`${viewMode === 'cards' ? 'hidden sm:block' : 'block'} overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#334155]`}>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8FAFC] dark:bg-[#1E293B] border-b border-[#E2E8F0] dark:border-[#334155]">
              {data.headers.map((header) => (
                <th
                  key={header.key}
                  className={`p-3.5 font-bold uppercase tracking-wider text-[11px] ${
                    header.primary
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20'
                      : 'text-[#475569] dark:text-[#CBD5E1]'
                  }`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#334155]">
            {filteredRows.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-[#F8FAFC] dark:hover:bg-[#172033] transition-colors"
              >
                {data.headers.map((header) => (
                  <td
                    key={header.key}
                    className={`p-3.5 align-top leading-relaxed ${
                      header.key === 'aspect' || header.key === 'parameter' || header.key === 'feature'
                        ? 'font-bold text-[#0F172A] dark:text-[#F8FAFC] bg-[#FAFAFA] dark:bg-[#172033]/50'
                        : 'text-[#334155] dark:text-[#CBD5E1]'
                    }`}
                  >
                    {row[header.key] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards View (Mobile responsive) */}
      <div className={`${viewMode === 'table' ? 'hidden' : 'block sm:hidden'} space-y-3`}>
        {filteredRows.map((row, idx) => (
          <div
            key={idx}
            className="p-4 bg-[#F8FAFC] dark:bg-[#172033] rounded-xl border border-[#E2E8F0] dark:border-[#334155] space-y-2 text-xs"
          >
            <div className="font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC] pb-1 border-b border-[#E2E8F0] dark:border-[#334155]">
              {row.aspect || Object.values(row)[0]}
            </div>
            <div className="space-y-1.5 pt-1">
              {data.headers
                .filter((h) => h.key !== 'aspect' && h.key !== 'parameter' && h.key !== 'feature')
                .map((header) => (
                  <div key={header.key} className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                      {header.label}
                    </span>
                    <span className="text-[#0F172A] dark:text-[#CBD5E1] font-medium leading-relaxed">
                      {row[header.key] || '—'}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary / Key Takeaway */}
      {(data.keyTakeaway || data.summaryNote) && (
        <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-[#1E293B] border border-blue-200 dark:border-blue-900/50 flex items-start gap-2.5 text-xs">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-[#334155] dark:text-[#CBD5E1]">
            {data.keyTakeaway && (
              <p>
                <strong className="text-[#0F172A] dark:text-[#F8FAFC]">Key Takeaway:</strong>{' '}
                {data.keyTakeaway}
              </p>
            )}
            {data.summaryNote && (
              <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                {data.summaryNote}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
