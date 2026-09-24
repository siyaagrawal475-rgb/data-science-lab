import React from 'react';
import { cn } from '@/lib/utils';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  badge,
  actions,
  className,
}) => {
  return (
    <header className={cn('pb-6 border-b border-[#E2E8F0] dark:border-[#2E3B4A] mb-8 transition-colors', className)}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-4" />}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172033] dark:text-[#F1F5F9]">
              {title}
            </h1>
            {badge}
          </div>
          {description && (
            <p className="text-sm sm:text-base text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
};
