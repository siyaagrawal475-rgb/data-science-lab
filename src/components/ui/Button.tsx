import React from 'react';
import { cn } from '@/lib/utils';
import { UnitId } from '@/types';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'unit';
  unitId?: UnitId;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      unitId = 'unit-1',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5',
      md: 'px-4 py-2 text-sm font-medium rounded-xl gap-2',
      lg: 'px-5 py-2.5 text-base font-semibold rounded-xl gap-2.5',
    };

    const unitStyleMap: Record<UnitId, { bg: string; hover: string; text: string }> = {
      'unit-1': { bg: 'bg-[#F4A58A]', hover: 'hover:brightness-95', text: 'text-[#172033] font-bold' },
      'unit-2': { bg: 'bg-[#91B9E8]', hover: 'hover:brightness-95', text: 'text-[#172033] font-bold' },
      'unit-3': { bg: 'bg-[#8FC7A3]', hover: 'hover:brightness-95', text: 'text-[#172033] font-bold' },
      'unit-4': { bg: 'bg-[#B7A3E3]', hover: 'hover:brightness-95', text: 'text-[#172033] font-bold' },
      'unit-5': { bg: 'bg-[#E8C878]', hover: 'hover:brightness-95', text: 'text-[#172033] font-bold' },
      'unit-6': { bg: 'bg-[#D99AAF]', hover: 'hover:brightness-95', text: 'text-[#172033] font-bold' },
    };

    const getVariantClasses = () => {
      switch (variant) {
        case 'secondary':
          return 'bg-[#F1F5F9] dark:bg-[#202D3B] text-[#172033] dark:text-[#F1F5F9] hover:bg-[#E2E8F0] dark:hover:bg-[#2E3B4A] border border-[#E2E8F0] dark:border-[#2E3B4A]';
        case 'outline':
          return 'bg-white dark:bg-[#151F2B] text-[#172033] dark:text-[#F1F5F9] border border-[#E2E8F0] dark:border-[#2E3B4A] hover:bg-[#F8FAFC] dark:hover:bg-[#1B2735] hover:border-[#CBD5E1] dark:hover:border-[#3D4F63] shadow-xs';
        case 'ghost':
          return 'bg-transparent text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#202D3B]';
        case 'unit': {
          const u = unitStyleMap[unitId] || unitStyleMap['unit-1'];
          return `${u.bg} ${u.hover} ${u.text} shadow-xs transition-colors`;
        }
        case 'primary':
        default:
          return 'bg-[#172033] dark:bg-white text-white dark:text-[#0F1720] hover:bg-[#0F172A] dark:hover:bg-slate-200 shadow-xs transition-colors';
      }
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]',
          sizeClasses[size],
          getVariantClasses(),
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
