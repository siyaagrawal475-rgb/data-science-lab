import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, Clock, BookOpen, Code, Sparkles, FileText, ChevronRight } from 'lucide-react';
import { Lesson } from '@/types';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  lesson: Lesson;
  className?: string;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, className }) => {
  const typeIcons = {
    concept: <BookOpen className="w-4 h-4 text-[#416B9E]" />,
    interactive: <Sparkles className="w-4 h-4 text-[#68539A]" />,
    derivation: <FileText className="w-4 h-4 text-[#806A28]" />,
    code: <Code className="w-4 h-4 text-[#3F7951]" />,
  };

  return (
    <div
      className={cn(
        'group flex items-center justify-between p-4 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] shadow-2xs hover:shadow-xs transition-all duration-150',
        lesson.completed ? 'bg-slate-50/50' : 'bg-white',
        className
      )}
    >
      <div className="flex items-start gap-3.5 min-w-0">
        <div className="pt-0.5 shrink-0">
          {lesson.completed ? (
            <CheckCircle2 className="w-5 h-5 text-[#3F7951]" />
          ) : (
            <Circle className="w-5 h-5 text-[#CBD5E1]" />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-semibold text-[#64748B]">Lesson {lesson.order}</span>
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] font-medium capitalize">
              {typeIcons[lesson.type]}
              {lesson.type}
            </span>
          </div>

          <h4
            className={cn(
              'text-sm sm:text-base font-bold tracking-tight text-[#172033] group-hover:text-black transition-colors truncate',
              lesson.completed && 'text-[#64748B]'
            )}
          >
            {lesson.title}
          </h4>

          <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">{lesson.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0 pl-3">
        <div className="hidden sm:flex items-center gap-1 text-xs text-[#94A3B8]">
          <Clock className="w-3.5 h-3.5" />
          <span>{lesson.durationMinutes}m</span>
        </div>

        <Link
          href={`/units/${lesson.unitId}`}
          className="p-1.5 rounded-lg text-[#94A3B8] group-hover:text-[#172033] group-hover:bg-[#F1F5F9] transition-colors"
          aria-label={`Open lesson ${lesson.title}`}
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
