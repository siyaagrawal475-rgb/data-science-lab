import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, FlaskConical, ArrowRight } from 'lucide-react';
import { UnitInfo, UnitId } from '@/types';
import { UnitBadge } from '@/components/ui/UnitBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  unit: UnitInfo;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ unit, className }) => {
  const isStarted = unit.progressPercent > 0;
  const isCompleted = unit.progressPercent === 100;

  const cardBorderHighlights: Record<UnitId, string> = {
    'unit-1': 'hover:border-[#EFC0B0] dark:hover:border-[#F4A58A]',
    'unit-2': 'hover:border-[#B9D1EE] dark:hover:border-[#91B9E8]',
    'unit-3': 'hover:border-[#B8DCC3] dark:hover:border-[#8FC7A3]',
    'unit-4': 'hover:border-[#CFC2EA] dark:hover:border-[#B7A3E3]',
    'unit-5': 'hover:border-[#EBD99A] dark:hover:border-[#E8C878]',
    'unit-6': 'hover:border-[#E5BBC9] dark:hover:border-[#D99AAF]',
  };

  const topColorBar: Record<UnitId, string> = {
    'unit-1': 'bg-[#F4A58A]',
    'unit-2': 'bg-[#91B9E8]',
    'unit-3': 'bg-[#8FC7A3]',
    'unit-4': 'bg-[#B7A3E3]',
    'unit-5': 'bg-[#E8C878]',
    'unit-6': 'bg-[#D99AAF]',
  };

  const unitHoverColors: Record<UnitId, string> = {
    'unit-1': 'group-hover:text-[#9E513B] dark:group-hover:text-[#FFC4B3]',
    'unit-2': 'group-hover:text-[#416B9E] dark:group-hover:text-[#C6DEFA]',
    'unit-3': 'group-hover:text-[#3F7951] dark:group-hover:text-[#BCE8CC]',
    'unit-4': 'group-hover:text-[#68539A] dark:group-hover:text-[#DFD3F8]',
    'unit-5': 'group-hover:text-[#806A28] dark:group-hover:text-[#FBE6A6]',
    'unit-6': 'group-hover:text-[#8A4E63] dark:group-hover:text-[#FACCDA]',
  };
  const hoverColor = unitHoverColors[unit.id] || unitHoverColors['unit-1'];
  const borderHighlight = cardBorderHighlights[unit.id] || cardBorderHighlights['unit-1'];
  const colorBar = topColorBar[unit.id] || topColorBar['unit-1'];

  return (
    <div
      className={cn(
        'group flex flex-col justify-between bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden relative',
        borderHighlight,
        className
      )}
    >
      {/* Top Unit Indicator Bar */}
      <div className={cn('h-1.5 w-full', colorBar)} />

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header row: Badge + Meta */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <UnitBadge unitId={unit.id} unitNumber={unit.unitNumber} size="sm" />
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#B8C4D1] font-medium">
              <Clock className="w-3.5 h-3.5 text-[#94A3B8] dark:text-[#7F8B99]" />
              <span>{unit.estimatedHours}h study</span>
            </div>
          </div>

          {/* Title */}
          <h3 className={cn('text-lg sm:text-xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight mb-2 transition-colors', hoverColor)}>
            <Link href={`/units/${unit.id}`} className="hover:underline focus:outline-hidden">
              {unit.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#B8C4D1] leading-relaxed mb-4 line-clamp-2">
            {unit.description}
          </p>

          {/* Topic Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {unit.topics.slice(0, 3).map((topic, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded-md bg-[#F1F5F9] dark:bg-[#202D3B] text-[#475569] dark:text-[#CBD5E1] font-medium border border-[#E2E8F0] dark:border-[#2E3B4A]"
              >
                {topic}
              </span>
            ))}
            {unit.topics.length > 3 && (
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#F8FAFC] dark:bg-[#1B2735] text-[#94A3B8] dark:text-[#7F8B99] font-medium border border-[#E2E8F0] dark:border-[#2E3B4A]">
                +{unit.topics.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div>
          {/* Curriculum Stats Counters */}
          <div className="grid grid-cols-2 gap-2 py-3 border-t border-[#F1F5F9] dark:border-[#2E3B4A] text-xs text-[#64748B] dark:text-[#B8C4D1] mb-4">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#94A3B8] dark:text-[#7F8B99]" />
              <span>{unit.totalLessons} Lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-[#94A3B8] dark:text-[#7F8B99]" />
              <span>{unit.totalLabs} Labs</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-xs font-medium mb-1.5">
              <span className="text-[#64748B] dark:text-[#B8C4D1]">
                {isCompleted ? 'Completed' : isStarted ? 'In Progress' : 'Not Started'}
              </span>
              <span className="font-semibold text-[#172033] dark:text-[#F1F5F9]">{unit.progressPercent}%</span>
            </div>
            <ProgressBar progress={unit.progressPercent} unitId={unit.id} height="sm" />
          </div>

          {/* Action Button */}
          <Link href={`/units/${unit.id}`} className="block w-full">
            <Button
              variant={isStarted ? 'unit' : 'secondary'}
              unitId={unit.id}
              fullWidth
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isCompleted ? 'Review Unit' : isStarted ? 'Continue Unit' : 'Start Unit'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
