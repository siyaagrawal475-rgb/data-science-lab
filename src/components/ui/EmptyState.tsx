import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-[#CBD5E1] dark:border-[#2E3B4A] bg-white dark:bg-[#151F2B] transition-colors',
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] dark:bg-[#202D3B] flex items-center justify-center text-[#64748B] dark:text-[#B8C4D1] mb-4">
        {icon || <Sparkles className="w-6 h-6 text-[#94A3B8] dark:text-[#7F8B99]" />}
      </div>
      <h3 className="text-base font-bold text-[#172033] dark:text-[#F1F5F9] mb-1">{title}</h3>
      <p className="text-sm text-[#64748B] dark:text-[#B8C4D1] max-w-md mb-6 leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
