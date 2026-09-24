'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useTheme, ThemeMode } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export const ThemeToggle: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Light', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { mode: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4 text-indigo-400" /> },
    { mode: 'system', label: 'System', icon: <Monitor className="w-4 h-4 text-slate-400" /> },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        {options.map((opt) => (
          <button
            key={opt.mode}
            onClick={() => setTheme(opt.mode)}
            title={`Switch to ${opt.label} mode`}
            className={cn(
              'p-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5',
              theme === opt.mode
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            )}
            aria-label={`${opt.label} theme`}
          >
            {opt.icon}
            <span className="hidden sm:inline text-[11px]">{opt.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
        aria-label="Toggle theme dropdown"
        aria-expanded={isOpen}
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="w-4 h-4 text-indigo-400" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
        <ChevronDown className={cn('w-3 h-3 text-slate-400 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700/60 mb-1">
            Theme
          </div>
          {options.map((opt) => (
            <button
              key={opt.mode}
              onClick={() => {
                setTheme(opt.mode);
                setIsOpen(false);
              }}
              className={cn(
                'w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors',
                theme === opt.mode
                  ? 'bg-slate-100 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40'
              )}
            >
              <div className="flex items-center gap-2">
                {opt.icon}
                <span>{opt.label}</span>
              </div>
              {theme === opt.mode && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
