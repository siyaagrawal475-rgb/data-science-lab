'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, ArrowRight, Play } from 'lucide-react';

import { useUnitProgress } from '@/lib/progress';
import { LessonData } from '@/data/unit1/lessons';

import { UnitId } from '@/types';

interface LearningPathProps {
  unitId: UnitId;
  unitNumber: number;
  lessons: LessonData[];
}


export const LearningPath: React.FC<LearningPathProps> = ({
  unitId,
  unitNumber,
  lessons,
}) => {
  const { progress } = useUnitProgress(unitId);

  return (
    <div className="space-y-3">
      {lessons.map((lesson, idx) => {
        const isCompleted = progress.completedLessons.includes(lesson.id);
        const isFirstIncomplete = !isCompleted && (
          idx === 0 || progress.completedLessons.includes(lessons[idx - 1].id)
        );
        const isInProgress = isFirstIncomplete && !isCompleted && progress.completedLessons.length > 0;

        let stateLabel = 'Not started';
        let badgeColor = 'bg-[#F1F5F9] dark:bg-[#202D3B] text-[#64748B] dark:text-[#CBD5E1] border-[#E2E8F0] dark:border-[#2E3B4A]';

        if (isCompleted) {
          stateLabel = 'Completed';
          badgeColor = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
        } else if (isInProgress || isFirstIncomplete) {
          stateLabel = 'In progress';
          badgeColor = 'bg-[#FCE5DC] dark:bg-[#432820] text-[#9E513B] dark:text-[#F8B4A6] border-[#EFC0B0] dark:border-[#6B3B2E]';
        }

        return (
          <div
            key={lesson.id}
            className={`group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
              isCompleted
                ? 'bg-white dark:bg-[#151F2B] border-[#E2E8F0] dark:border-[#2E3B4A] hover:border-[#CBD5E1] dark:hover:border-[#3D4F63]'
                : isFirstIncomplete
                ? 'bg-white dark:bg-[#151F2B] border-[#F4A58A]/60 shadow-xs ring-1 ring-[#F4A58A]/30'
                : 'bg-white/80 dark:bg-[#151F2B]/80 border-[#E2E8F0]/80 dark:border-[#2E3B4A]/80 hover:bg-white dark:hover:bg-[#151F2B] hover:border-[#CBD5E1] dark:hover:border-[#3D4F63]'
            }`}
          >
            {/* Left Col: Step indicator & Info */}
            <div className="flex items-start gap-4 flex-1 min-w-0 pr-4">
              {/* Step indicator circle */}
              <div className="mt-0.5 shrink-0">
                {isCompleted ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : isFirstIncomplete ? (
                  <div className="w-8 h-8 rounded-full bg-[#FCE5DC] dark:bg-[#432820] flex items-center justify-center text-[#9E513B] dark:text-[#F8B4A6] font-bold text-xs">
                    <Play className="w-3.5 h-3.5 fill-[#9E513B] dark:fill-[#F8B4A6]" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#F8FAFC] dark:bg-[#202D3B] border border-[#E2E8F0] dark:border-[#2E3B4A] flex items-center justify-center text-[#94A3B8] dark:text-[#7F8B99] font-semibold text-xs">
                    {(lesson.lessonNumber || lesson.order).toString().padStart(2, '0')}
                  </div>
                )}
              </div>

              {/* Text metadata */}
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#64748B] dark:text-[#B8C4D1]">
                    Lesson {(lesson.lessonNumber || lesson.order).toString().padStart(2, '0')}
                  </span>
                  <span className="text-[#CBD5E1] dark:text-[#3D4F63]">•</span>
                  <span className="text-xs text-[#64748B] dark:text-[#B8C4D1] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#94A3B8] dark:text-[#7F8B99]" />
                    {lesson.estimatedDuration} min
                  </span>
                  <span className="text-[#CBD5E1] dark:text-[#3D4F63]">•</span>
                  <span className="text-xs text-[#64748B] dark:text-[#B8C4D1] capitalize">
                    {lesson.contentType}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${badgeColor}`}
                  >
                    {stateLabel}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#0F172A] dark:text-[#F1F5F9] group-hover:text-[#9E513B] dark:group-hover:text-[#F4A58A] transition-colors line-clamp-1">
                  {lesson.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#B8C4D1] line-clamp-2 leading-relaxed">
                  {lesson.shortDescription}
                </p>
              </div>
            </div>

            {/* Right Col: Action button */}
            <div className="mt-4 sm:mt-0 shrink-0 flex items-center justify-end">
              <Link
                href={`/units/${unitNumber}/${lesson.slug}`}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isCompleted
                    ? 'bg-[#F8FAFC] dark:bg-[#1A2634] hover:bg-[#F1F5F9] dark:hover:bg-[#253548] text-[#475569] dark:text-[#CBD5E1] border border-[#E2E8F0] dark:border-[#2E3B4A]'
                    : isFirstIncomplete
                    ? 'bg-[#F4A58A] hover:bg-[#EE8C6C] text-[#33150D] font-bold shadow-xs'
                    : 'bg-[#F8FAFC] dark:bg-[#1A2634] hover:bg-[#F1F5F9] dark:hover:bg-[#253548] text-[#64748B] dark:text-[#B8C4D1] border border-[#E2E8F0] dark:border-[#2E3B4A]'
                }`}
              >
                <span>
                  {isCompleted
                    ? 'Review Lesson'
                    : isInProgress
                    ? 'Continue'
                    : 'Start Lesson'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
