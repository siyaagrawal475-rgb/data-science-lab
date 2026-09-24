'use client';

import React from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';
import { useStudyTimer } from '@/lib/progress';

export const StudyTimerWidget: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isRunning, toggleTimer, resetTimer, formattedTime } = useStudyTimer();

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] bg-white dark:bg-[#151F2B] text-xs text-[#172033] dark:text-[#F1F5F9] shadow-2xs">
        <Timer className={`w-3.5 h-3.5 ${isRunning ? 'text-emerald-500 animate-pulse' : 'text-[#94A3B8] dark:text-[#7F8B99]'}`} />
        <span className="font-mono font-bold text-xs">{formattedTime}</span>
        <button
          onClick={toggleTimer}
          aria-label={isRunning ? 'Pause study timer' : 'Start study timer'}
          className="p-1 rounded-md hover:bg-[#F1F5F9] dark:hover:bg-[#202D3B] text-[#64748B] dark:text-[#B8C4D1] cursor-pointer"
        >
          {isRunning ? <Pause className="w-3 h-3 text-amber-500" /> : <Play className="w-3 h-3 text-emerald-500" />}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] dark:text-[#B8C4D1] uppercase tracking-wider">
          <Timer className="w-4 h-4 text-[#416B9E] dark:text-[#91B9E8]" />
          <span>Active Study Timer</span>
        </div>
        {isRunning && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Tracking
          </span>
        )}
      </div>

      <div className="text-2xl sm:text-3xl font-mono font-extrabold text-[#172033] dark:text-[#F1F5F9]">
        {formattedTime}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={toggleTimer}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-[#172033] dark:bg-[#202D3B] text-white hover:bg-black dark:hover:bg-[#2B3C4E]'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Focus</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Start Focus Session</span>
            </>
          )}
        </button>

        <button
          onClick={resetTimer}
          title="Reset timer"
          className="p-2 rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] text-[#64748B] dark:text-[#B8C4D1] hover:bg-[#F8FAFC] dark:hover:bg-[#202D3B] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
