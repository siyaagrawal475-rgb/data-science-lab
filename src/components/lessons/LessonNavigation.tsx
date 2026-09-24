'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { UnitId } from '@/types';

interface LessonNavigationProps {
  unitId?: UnitId;
  unitNumber: number;
  prevLesson?: { slug: string; title: string; lessonNumber: number } | null;
  nextLesson?: { slug: string; title: string; lessonNumber: number } | null;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  unitNumber,
  prevLesson,
  nextLesson,
}) => {

  return (
    <div className="pt-8 border-t border-[#E2E8F0] dark:border-[#2E3B4A] grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prevLesson ? (
        <Link
          href={`/units/${unitNumber}/${prevLesson.slug}`}
          className="group p-4 bg-white dark:bg-[#151F2B] hover:bg-[#F8FAFC] dark:hover:bg-[#1F2C3D] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] hover:border-[#CBD5E1] dark:hover:border-[#3D4F63] transition-all text-left flex items-start gap-3"
        >
          <div className="mt-1 w-8 h-8 rounded-lg bg-[#F1F5F9] dark:bg-[#202D3B] group-hover:bg-white dark:group-hover:bg-[#253548] flex items-center justify-center text-[#64748B] dark:text-[#B8C4D1] shrink-0 border border-[#E2E8F0] dark:border-[#2E3B4A]">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-[#64748B] dark:text-[#B8C4D1] block uppercase tracking-wider">
              Previous Lesson
            </span>
            <span className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] group-hover:text-[#9E513B] dark:group-hover:text-[#F4A58A] transition-colors line-clamp-1">
              {prevLesson.lessonNumber}. {prevLesson.title}
            </span>
          </div>
        </Link>
      ) : (
        <Link
          href={`/units/${unitNumber}`}
          className="group p-4 bg-white dark:bg-[#151F2B] hover:bg-[#F8FAFC] dark:hover:bg-[#1F2C3D] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] hover:border-[#CBD5E1] dark:hover:border-[#3D4F63] transition-all text-left flex items-start gap-3"
        >
          <div className="mt-1 w-8 h-8 rounded-lg bg-[#F1F5F9] dark:bg-[#202D3B] group-hover:bg-white dark:group-hover:bg-[#253548] flex items-center justify-center text-[#64748B] dark:text-[#B8C4D1] shrink-0 border border-[#E2E8F0] dark:border-[#2E3B4A]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-[#64748B] dark:text-[#B8C4D1] block uppercase tracking-wider">
              Unit Overview
            </span>
            <span className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] group-hover:text-[#9E513B] dark:group-hover:text-[#F4A58A] transition-colors line-clamp-1">
              Return to Unit {unitNumber} Syllabus
            </span>
          </div>
        </Link>
      )}

      {nextLesson ? (
        <Link
          href={`/units/${unitNumber}/${nextLesson.slug}`}
          className="group p-4 bg-white dark:bg-[#151F2B] hover:bg-[#F8FAFC] dark:hover:bg-[#1F2C3D] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] hover:border-[#CBD5E1] dark:hover:border-[#3D4F63] transition-all text-right flex items-start justify-end gap-3"
        >
          <div className="min-w-0">
            <span className="text-xs font-semibold text-[#64748B] dark:text-[#B8C4D1] block uppercase tracking-wider">
              Next Lesson
            </span>
            <span className="text-sm font-bold text-[#0F172A] dark:text-[#F1F5F9] group-hover:text-[#9E513B] dark:group-hover:text-[#F4A58A] transition-colors line-clamp-1">
              {nextLesson.lessonNumber}. {nextLesson.title}
            </span>
          </div>
          <div className="mt-1 w-8 h-8 rounded-lg bg-[#FCE5DC] dark:bg-[#432820] group-hover:bg-[#F4A58A] flex items-center justify-center text-[#9E513B] dark:text-[#F8B4A6] group-hover:text-[#33150D] shrink-0 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      ) : (
        <Link
          href={`/units/${unitNumber}`}
          className="group p-4 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/40 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-all text-right flex items-start justify-end gap-3"
        >
          <div className="min-w-0">
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block uppercase tracking-wider">
              Unit Complete!
            </span>
            <span className="text-sm font-bold text-emerald-950 dark:text-emerald-100 line-clamp-1">
              Review Unit {unitNumber} & Take Quiz
            </span>
          </div>
          <div className="mt-1 w-8 h-8 rounded-lg bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center text-emerald-800 dark:text-emerald-200 shrink-0">
            <CheckCircle className="w-4 h-4" />
          </div>
        </Link>
      )}
    </div>
  );
};
