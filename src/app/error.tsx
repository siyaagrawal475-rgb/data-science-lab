'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log non-intrusively to console for debugging
    console.error('Data Science Lab runtime error caught:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#151F2B] border border-[#E2E8F0] dark:border-[#2E3B4A] rounded-2xl p-8 shadow-xs text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-2xs border border-amber-200 dark:border-amber-800">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Application Error
          </span>
          <h1 className="text-2xl font-extrabold text-[#172033] dark:text-[#F1F5F9]">
            Something unexpected occurred
          </h1>
          <p className="text-sm text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
            The workspace encountered a temporary state issue while processing the visualization or calculation.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Button
            onClick={() => reset()}
            variant="primary"
            size="md"
            fullWidth
            leftIcon={<RefreshCcw className="w-4 h-4" />}
          >
            Retry Calculation
          </Button>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              fullWidth
              leftIcon={<LayoutDashboard className="w-4 h-4" />}
            >
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
