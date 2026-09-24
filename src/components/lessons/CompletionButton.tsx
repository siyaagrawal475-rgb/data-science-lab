'use client';

import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useUnitProgress } from '@/lib/progress';

import { UnitId } from '@/types';

interface CompletionButtonProps {
  unitId: UnitId;
  lessonId: string;
  onComplete?: () => void;
}


export const CompletionButton: React.FC<CompletionButtonProps> = ({
  unitId,
  lessonId,
  onComplete,
}) => {
  const { isLessonCompleted, toggleLesson } = useUnitProgress(unitId);
  const completed = isLessonCompleted(lessonId);

  const handleClick = () => {
    toggleLesson(lessonId);
    if (onComplete) onComplete();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-2xs ${
        completed
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100/80'
          : 'bg-[#F4A58A] text-[#33150D] hover:bg-[#EE8C6C] active:scale-[0.98]'
      }`}
    >
      {completed ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Marked as Completed</span>
        </>
      ) : (
        <>
          <Circle className="w-4 h-4 text-[#33150D]/60" />
          <span>Mark as Complete</span>
        </>
      )}
    </button>
  );
};
