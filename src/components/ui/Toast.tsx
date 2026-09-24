'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  id?: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  className,
}) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#3F7951] dark:text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#8A4E63] dark:text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#416B9E] dark:text-blue-400 shrink-0" />,
  };

  const borderColors = {
    success: 'border-[#B8DCC3] dark:border-emerald-800 bg-[#E5F3E9]/80 dark:bg-emerald-950/40',
    error: 'border-[#E5BBC9] dark:border-rose-800 bg-[#F6E5EB]/80 dark:bg-rose-950/40',
    info: 'border-[#B9D1EE] dark:border-blue-800 bg-[#E5EFFB]/80 dark:bg-blue-950/40',
  };

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border shadow-sm bg-white dark:bg-[#151F2B] max-w-md w-full transition-all duration-200',
        borderColors[type],
        className
      )}
    >
      {icons[type]}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9]">{title}</h4>
        {message && <p className="text-xs text-[#64748B] dark:text-[#B8C4D1] mt-0.5">{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close notification"
          className="text-[#94A3B8] dark:text-[#7F8B99] hover:text-[#172033] dark:hover:text-[#F1F5F9] p-0.5 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
