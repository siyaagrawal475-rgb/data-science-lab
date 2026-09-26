import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  action,
  className,
}) => {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6', className)}>
      <div>
        <div className="flex items-center gap-2 mb-1">
          {badge}
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#172033] dark:text-[#F1F5F9]">
            {title}
          </h2>
        </div>
        {subtitle && <p className="text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1] font-normal leading-relaxed">{subtitle}</p>}
      </div>

      {action && <div className="shrink-0 pt-1 sm:pt-0">{action}</div>}
    </div>
  );
};
