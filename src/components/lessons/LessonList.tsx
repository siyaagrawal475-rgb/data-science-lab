import React from 'react';
import { Lesson } from '@/types';
import { LessonCard } from '@/components/cards/LessonCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonListProps {
  lessons: Lesson[];
  className?: string;
}

export const LessonList: React.FC<LessonListProps> = ({ lessons, className }) => {
  if (lessons.length === 0) {
    return (
      <EmptyState
        icon={<BookOpen className="w-6 h-6 text-[#94A3B8]" />}
        title="No Lessons Available"
        description="Lessons for this section are being prepared. Check back soon."
      />
    );
  }

  return (
    <div className={cn('space-y-2.5', className)}>
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
};
