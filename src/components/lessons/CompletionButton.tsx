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

const UNIT_COLORS: Record<string, { bg: string; text: string; hover: string; border: string }> = {
  'unit-1': { bg: '#F4A58A', text: '#33150D', hover: '#EE8C6C', border: '#EFC0B0' },
  'unit-2': { bg: '#91B9E8', text: '#0C2B4E', hover: '#7BA8DE', border: '#B9D1EE' },
  'unit-3': { bg: '#8FC7A3', text: '#0F381F', hover: '#7BB891', border: '#B8DCC3' },
  'unit-4': { bg: '#B7A3E3', text: '#2A184D', hover: '#A38ED4', border: '#CFC2EA' },
  'unit-5': { bg: '#E8C878', text: '#3B2E0A', hover: '#D9B55D', border: '#EBD99A' },
  'unit-6': { bg: '#D99AAF', text: '#3D1524', hover: '#C9839A', border: '#E5BBC9' },
};

export const CompletionButton: React.FC<CompletionButtonProps> = ({
  unitId,
  lessonId,
  onComplete,
}) => {
  const { isLessonCompleted, toggleLesson } = useUnitProgress(unitId);
  const completed = isLessonCompleted(lessonId);
  const colors = UNIT_COLORS[unitId] || UNIT_COLORS['unit-1'];

  const handleClick = () => {
    toggleLesson(lessonId);
    if (onComplete) onComplete();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      style={
        !completed
          ? {
              backgroundColor: colors.bg,
              color: colors.text,
            }
          : undefined
      }
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-2xs hover-lift active:scale-[0.98] ${
        completed
          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/40'
          : 'hover:brightness-95'
      }`}
    >
      {completed ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Completed</span>
        </>
      ) : (
        <>
          <Circle className="w-4 h-4 opacity-70" />
          <span>Mark as Complete</span>
        </>
      )}
    </button>
  );
};
