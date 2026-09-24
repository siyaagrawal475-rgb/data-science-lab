import React from 'react';
import { cn } from '@/lib/utils';
import { UnitId } from '@/types';

interface ProgressBarProps {
  progress: number; // 0 to 100
  unitId?: UnitId;
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  labelPosition?: 'top' | 'right' | 'none';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  unitId,
  height = 'md',
  showLabel = false,
  labelPosition = 'none',
  className,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const unitFillColors: Record<UnitId, string> = {
    'unit-1': 'bg-[#F4A58A]',
    'unit-2': 'bg-[#91B9E8]',
    'unit-3': 'bg-[#8FC7A3]',
    'unit-4': 'bg-[#B7A3E3]',
    'unit-5': 'bg-[#E8C878]',
    'unit-6': 'bg-[#D99AAF]',
  };

  const fillColor = unitId ? unitFillColors[unitId] : 'bg-[#172033] dark:bg-blue-400';

  return (
    <div className={cn('w-full', className)}>
      {showLabel && labelPosition === 'top' && (
        <div className="flex justify-between items-center mb-1 text-xs text-[#64748B] dark:text-[#B8C4D1] font-medium">
          <span>Progress</span>
          <span className="font-semibold text-[#172033] dark:text-[#F1F5F9]">{Math.round(clampedProgress)}%</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <div
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          className={cn(
            'w-full bg-[#E2E8F0] dark:bg-[#2E3B4A] rounded-full overflow-hidden relative',
            heightClasses[height]
          )}
        >
          <div
            className={cn('h-full transition-all duration-300 rounded-full', fillColor)}
            style={{ width: `${clampedProgress}%` }}
          />
        </div>

        {showLabel && labelPosition === 'right' && (
          <span className="text-xs font-semibold text-[#64748B] dark:text-[#B8C4D1] shrink-0 min-w-[36px] text-right">
            {Math.round(clampedProgress)}%
          </span>
        )}
      </div>
    </div>
  );
};
