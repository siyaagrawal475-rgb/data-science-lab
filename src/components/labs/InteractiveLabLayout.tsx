'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FlaskConical, ArrowLeft, CheckCircle2, Clock, FileSpreadsheet, PlayCircle } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { useUnitProgress } from '@/lib/progress';
import { CSVLabWorkspace } from '@/components/csv/CSVLabWorkspace';
import { SupportedChartType } from '@/lib/csv/datasetTypes';

interface InteractiveLabLayoutProps {
  labId: string;
  unitId?: string;
  unitNumber?: number;
  title: string;
  subtitle: string;
  estimatedMinutes?: number;
  defaultChartType?: SupportedChartType;
  children: React.ReactNode;
}

export const InteractiveLabLayout: React.FC<InteractiveLabLayoutProps> = ({
  labId,
  unitId = 'unit-1',
  unitNumber = 1,
  title,
  subtitle,
  estimatedMinutes = 20,
  defaultChartType = 'scatter',
  children,
}) => {
  const { isLabCompleted, completeLab } = useUnitProgress(unitId);
  const completed = isLabCompleted(labId);
  const [labMode, setLabMode] = useState<'guided' | 'custom-csv'>('guided');

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#64748B] dark:text-slate-400">
        <Link href="/" className="hover:text-[#0F172A] dark:hover:text-slate-100 transition-colors">
          Curriculum
        </Link>
        <span>/</span>
        <Link href={`/units/${unitNumber}`} className="hover:text-[#0F172A] dark:hover:text-slate-100 transition-colors">
          Unit {unitNumber.toString().padStart(2, '0')}
        </Link>
        <span>/</span>
        <span className="font-semibold text-[#0F172A] dark:text-slate-200">Lab: {title}</span>
      </nav>

      {/* Lab Header */}
      <header className="p-6 sm:p-8 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-4 relative overflow-hidden transition-colors">
        <div
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: `var(--unit-${unitNumber}-primary, #91B9E8)` }}
        />

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FCE5DC] dark:bg-[#202D3B] text-[#9E513B] dark:text-[#F4A58A] text-xs font-bold border border-[#EFC0B0] dark:border-[#2E3B4A]">
                <FlaskConical className="w-3.5 h-3.5" />
                Applied Computational Lab
              </span>
              <span className="text-xs text-[#64748B] dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#94A3B8]" />
                {estimatedMinutes} min
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href={`/units/${unitNumber}`}>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Unit
              </Button>
            </Link>

            <button
              onClick={() => completeLab(labId)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                completed
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                  : 'bg-[#91B9E8] dark:bg-[#2E4B75] hover:bg-[#7FAAE0] text-[#172033] dark:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{completed ? 'Lab Completed' : 'Mark Lab Complete'}</span>
            </button>
          </div>
        </div>

        {/* Lab Mode Selector Tabs */}
        <div className="pt-3 border-t border-slate-100 dark:border-[#2E3B4A] flex items-center gap-2">
          <button
            onClick={() => setLabMode('guided')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              labMode === 'guided'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#202D3B]'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Guided Lab Simulation</span>
          </button>

          <button
            onClick={() => setLabMode('custom-csv')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              labMode === 'custom-csv'
                ? 'bg-blue-600 text-white dark:bg-blue-500'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#202D3B]'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-blue-500" />
            <span>Use Your Own CSV Dataset</span>
          </button>
        </div>
      </header>

      {/* Lab Main Content */}
      <main>
        {labMode === 'guided' ? (
          children
        ) : (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200 flex items-center justify-between">
              <div>
                <span className="font-bold">Custom Dataset Mode: </span>
                <span>
                  Upload your own CSV telemetry or dataset to apply what you learned in the {title}.
                </span>
              </div>
            </div>
            <CSVLabWorkspace defaultChartType={defaultChartType} />
          </div>
        )}
      </main>
    </div>
  );
};
