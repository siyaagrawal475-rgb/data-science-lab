import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 py-16">
      <div className="p-3 rounded-2xl bg-[#E5EFFB] dark:bg-[#202D3B] text-[#416B9E] dark:text-[#91B9E8] shadow-xs">
        <Loader2 className="w-7 h-7 animate-spin" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9]">
          Loading Data Science Lab...
        </p>
        <p className="text-xs text-[#64748B] dark:text-[#7F8B99]">
          Preparing interactive mathematical models and curriculum workspaces
        </p>
      </div>
    </div>
  );
}
