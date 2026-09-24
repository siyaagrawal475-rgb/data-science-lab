'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  FlaskConical,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { UNITS_DATA } from '@/lib/constants';
import { useGlobalProgress } from '@/lib/progress';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { UnitBadge } from '@/components/ui/UnitBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';

export default function ProgressPage() {
  const {
    overallPercentage,
    totalLessonsCompleted,
    totalLabsCompleted,
    totalQuizzesCompleted,
    unitPercentages,
  } = useGlobalProgress();

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <PageHeader
        title="Learning Progress & Milestones"
        description="Review your mastery percentage, completed computational labs, and overall curriculum timeline."
        breadcrumbs={[{ label: 'Progress' }]}
        actions={
          <Link href="/dashboard">
            <Button variant="primary" size="sm">
              Back to Dashboard
            </Button>
          </Link>
        }
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748B] dark:text-[#B8C4D1]">
            <span className="text-xs font-semibold uppercase tracking-wider">Curriculum Mastery</span>
            <TrendingUp className="w-4 h-4 text-[#416B9E] dark:text-[#91B9E8]" />
          </div>
          <div className="text-2xl font-bold text-[#172033] dark:text-[#F1F5F9]">{overallPercentage}%</div>
          <ProgressBar progress={overallPercentage} height="sm" />
        </div>

        <div className="p-5 bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748B] dark:text-[#B8C4D1]">
            <span className="text-xs font-semibold uppercase tracking-wider">Lessons Finished</span>
            <CheckCircle2 className="w-4 h-4 text-[#3F7951] dark:text-[#8FC7A3]" />
          </div>
          <div className="text-2xl font-bold text-[#172033] dark:text-[#F1F5F9]">
            {totalLessonsCompleted}{' '}
            <span className="text-xs font-normal text-[#64748B] dark:text-[#B8C4D1]">of 60</span>
          </div>
          <p className="text-xs text-[#64748B] dark:text-[#B8C4D1]">
            {((totalLessonsCompleted / 60) * 100).toFixed(0)}% of total lessons
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748B] dark:text-[#B8C4D1]">
            <span className="text-xs font-semibold uppercase tracking-wider">Applied Labs Done</span>
            <FlaskConical className="w-4 h-4 text-[#68539A] dark:text-[#B7A3E3]" />
          </div>
          <div className="text-2xl font-bold text-[#172033] dark:text-[#F1F5F9]">
            {totalLabsCompleted}{' '}
            <span className="text-xs font-normal text-[#64748B] dark:text-[#B8C4D1]">of 24</span>
          </div>
          <p className="text-xs text-[#64748B] dark:text-[#B8C4D1]">
            {totalQuizzesCompleted} / 6 quizzes evaluated
          </p>
        </div>
      </div>

      {/* Unit by Unit Progress Table/Cards */}
      <section className="bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] p-6 shadow-xs space-y-6">
        <SectionHeader
          title="Six-Unit Detailed Breakdown"
          subtitle="Real-time completion tracking across each core module."
        />

        <div className="space-y-4">
          {UNITS_DATA.map((unit) => {
            const currentPercent = unitPercentages[unit.id] || 0;
            const isStarted = currentPercent > 0;
            const isCompleted = currentPercent === 100;

            return (
              <div
                key={unit.id}
                className="p-4 rounded-xl border border-[#F1F5F9] dark:border-[#2E3B4A] bg-[#F8FAFC] dark:bg-[#101923] hover:bg-white dark:hover:bg-[#1A2634] hover:border-[#E2E8F0] dark:hover:border-[#3D4F63] transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <UnitBadge unitId={unit.id} unitNumber={unit.unitNumber} size="sm" />
                    <div>
                      <h4 className="text-sm font-bold text-[#172033] dark:text-[#F1F5F9]">{unit.title}</h4>
                      <p className="text-xs text-[#64748B] dark:text-[#B8C4D1]">{unit.shortTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <span className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] min-w-[40px] text-right">
                      {currentPercent}%
                    </span>
                    <Link href={`/units/${unit.unitNumber}`}>
                      <Button
                        variant={isStarted ? 'unit' : 'outline'}
                        unitId={unit.id}
                        size="sm"
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        {isCompleted ? 'Review' : isStarted ? 'Continue' : 'Start'}
                      </Button>
                    </Link>
                  </div>
                </div>

                <ProgressBar progress={currentPercent} unitId={unit.id} height="sm" />

                <div className="flex items-center justify-between text-[11px] text-[#94A3B8] dark:text-[#7F8B99]">
                  <span>{unit.totalLessons} Lessons • {unit.totalLabs} Labs</span>
                  <span>{unit.estimatedHours} Hours estimated</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
