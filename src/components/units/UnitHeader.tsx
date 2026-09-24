'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, PlayCircle, Award, CheckCircle2 } from 'lucide-react';
import { UnitBadge } from '@/components/ui/UnitBadge';
import { Button } from '@/components/ui/Button';
import { useUnitProgress } from '@/lib/progress';

import { UnitId } from '@/types';

interface UnitHeaderProps {
  unitId: UnitId;
  unitNumber: number;

  title: string;
  description: string;
  totalLessons: number;
  totalLabs: number;
  totalQuizzes: number;
  estimatedHours: number;
  firstLessonSlug: string;
}

export const UnitHeader: React.FC<UnitHeaderProps> = ({
  unitId,
  unitNumber,
  title,
  description,
  totalLessons,
  totalLabs,
  totalQuizzes,
  estimatedHours,
  firstLessonSlug,
}) => {
  const { percentage, progress } = useUnitProgress(unitId, totalLessons, totalLabs);
  const completedLessonsCount = progress.completedLessons.length;
  const isComplete = percentage === 100;

  return (
    <header className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#64748B] dark:text-[#B8C4D1]">
        <Link href="/" className="hover:text-[#0F172A] dark:hover:text-white transition-colors">
          Curriculum
        </Link>
        <span>/</span>
        <span className="font-semibold text-[#0F172A] dark:text-[#F1F5F9]">Unit {unitNumber.toString().padStart(2, '0')}</span>
      </nav>

      {/* Main Banner */}
      <div className="p-6 sm:p-8 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-6 relative overflow-hidden">
        {/* Subtle decorative background tint */}
        <div 
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-25 dark:opacity-15"
          style={{ backgroundColor: `var(--unit-${unitNumber}-primary)` }}
        />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <UnitBadge unitId={unitId} unitNumber={unitNumber} size="md" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#B8C4D1]">
                {totalLessons} Lessons • {totalLabs} Applied Labs • {totalQuizzes} Assessment
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F1F5F9]">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/">
              <Button
                variant="outline"
                size="md"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                All Units
              </Button>
            </Link>

            <Link href={`/units/${unitNumber}/${firstLessonSlug}`}>
              <Button
                variant="unit"
                unitId={unitId}
                size="md"
                leftIcon={<PlayCircle className="w-4 h-4" />}
              >
                {completedLessonsCount > 0 ? 'Continue Learning' : 'Start Unit'}
              </Button>
            </Link>
          </div>
        </div>

        {/* Progress and Metadata Bar */}
        <div className="pt-6 border-t border-[#F1F5F9] dark:border-[#2E3B4A] grid grid-cols-1 sm:grid-cols-3 gap-4 items-center relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] flex items-center justify-center text-[#475569] dark:text-[#CBD5E1]">
              <Clock className="w-5 h-5 text-[#64748B] dark:text-[#B8C4D1]" />
            </div>
            <div>
              <span className="text-xs text-[#64748B] dark:text-[#B8C4D1] block font-medium">Estimated Time</span>
              <span className="text-sm font-semibold text-[#0F172A] dark:text-[#F1F5F9]">{estimatedHours} Hours</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A] flex items-center justify-center text-[#475569] dark:text-[#CBD5E1]">
              <BookOpen className="w-5 h-5 text-[#64748B] dark:text-[#B8C4D1]" />
            </div>
            <div>
              <span className="text-xs text-[#64748B] dark:text-[#B8C4D1] block font-medium">Modules Completed</span>
              <span className="text-sm font-semibold text-[#0F172A] dark:text-[#F1F5F9]">
                {completedLessonsCount} / {totalLessons} Lessons
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#475569] dark:text-[#CBD5E1] flex items-center gap-1.5">
                {isComplete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Award className="w-3.5 h-3.5 text-[#64748B] dark:text-[#B8C4D1]" />
                )}
                Unit Mastery
              </span>
              <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">{percentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#F1F5F9] dark:bg-[#202D3B] rounded-full overflow-hidden border border-[#E2E8F0]/50 dark:border-[#2E3B4A]">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: 'var(--unit-1-primary, #F4A58A)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
