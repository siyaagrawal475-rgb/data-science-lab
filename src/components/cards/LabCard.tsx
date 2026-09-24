import React from 'react';
import Link from 'next/link';
import { FlaskConical, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Lab, UnitId } from '@/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface LabCardProps {
  lab: Lab;
  className?: string;
}

export const LabCard: React.FC<LabCardProps> = ({ lab, className }) => {
  const difficultyColors = {
    Beginner: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    Intermediate: 'text-blue-700 bg-blue-50 border-blue-200',
    Advanced: 'text-purple-700 bg-purple-50 border-purple-200',
  };

  const unitPillColors: Record<UnitId, string> = {
    'unit-1': 'text-[#9E513B] bg-[#FCE5DC] border-[#EFC0B0]',
    'unit-2': 'text-[#416B9E] bg-[#E5EFFB] border-[#B9D1EE]',
    'unit-3': 'text-[#3F7951] bg-[#E5F3E9] border-[#B8DCC3]',
    'unit-4': 'text-[#68539A] bg-[#EEE9F8] border-[#CFC2EA]',
    'unit-5': 'text-[#806A28] bg-[#FAF2D8] border-[#EBD99A]',
    'unit-6': 'text-[#8A4E63] bg-[#F6E5EB] border-[#E5BBC9]',
  };

  return (
    <div
      className={cn(
        'group flex flex-col justify-between p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-xs hover:border-[#CBD5E1] hover:shadow-sm transition-all duration-200',
        className
      )}
    >
      <div>
        {/* Header: Difficulty + Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'text-[11px] px-2 py-0.5 rounded font-semibold border',
                difficultyColors[lab.difficulty]
              )}
            >
              {lab.difficulty}
            </span>
            <span
              className={cn(
                'text-[11px] px-2 py-0.5 rounded font-semibold border uppercase',
                unitPillColors[lab.unitId]
              )}
            >
              {lab.unitId.replace('-', ' ')}
            </span>
          </div>

          {lab.completed ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-[#94A3B8]">
              <Clock className="w-3.5 h-3.5" />
              <span>{lab.durationMinutes} min</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-[#172033] group-hover:text-black tracking-tight mb-2">
          {lab.title}
        </h4>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4">{lab.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {lab.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded bg-[#F8FAFC] text-[#64748B] font-medium border border-[#E2E8F0]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        <Link href={`/labs/${lab.id}`} className="block w-full">
          <Button
            variant="outline"
            fullWidth
            size="sm"
            leftIcon={<FlaskConical className="w-4 h-4 text-[#64748B]" />}
            rightIcon={<ArrowUpRight className="w-4 h-4 text-[#94A3B8]" />}
          >
            {lab.completed ? 'Rerun Experiment' : 'Launch Interactive Lab'}
          </Button>
        </Link>
      </div>
    </div>
  );
};
