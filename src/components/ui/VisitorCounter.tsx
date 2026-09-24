'use client';

import React from 'react';

export const VisitorCounter: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Honest indicator without fabricating numbers
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] bg-white dark:bg-[#151F2B] text-xs text-[#64748B] dark:text-[#B8C4D1] shadow-2xs ${className}`}
      title="Visitor tracking operates in private offline mode without external data collection"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="font-medium text-[#172033] dark:text-[#F1F5F9]">Active Workspace</span>
      <span className="text-[10px] text-[#94A3B8] dark:text-[#7F8B99] hidden sm:inline">• Local Session</span>
    </div>
  );
};
