import React from 'react';
import Link from 'next/link';
import { Compass, BookOpen, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#151F2B] border border-[#E2E8F0] dark:border-[#2E3B4A] rounded-2xl p-8 shadow-xs text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#E5EFFB] dark:bg-[#202D3B] text-[#416B9E] dark:text-[#91B9E8] flex items-center justify-center mx-auto shadow-2xs">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] dark:text-[#7F8B99]">
            Error 404
          </span>
          <h1 className="text-2xl font-extrabold text-[#172033] dark:text-[#F1F5F9]">
            Page Not Found
          </h1>
          <p className="text-sm text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
            The curriculum lesson, interactive lab, or resource you requested could not be located or has moved.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              fullWidth
              leftIcon={<LayoutDashboard className="w-4 h-4" />}
            >
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              fullWidth
              leftIcon={<BookOpen className="w-4 h-4" />}
            >
              Curriculum Hub
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
