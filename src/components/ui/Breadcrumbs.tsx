import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs text-[#64748B] dark:text-[#B8C4D1]', className)}>
      <ol className="flex items-center space-x-1.5 flex-wrap">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-[#F1F5F9] transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] dark:text-[#7F8B99] mx-1 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-[#F1F5F9] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-[#172033] dark:text-[#F1F5F9]" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
