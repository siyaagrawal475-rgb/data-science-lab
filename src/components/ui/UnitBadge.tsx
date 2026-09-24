import React from 'react';
import { cn } from '@/lib/utils';
import { UnitId } from '@/types';

interface UnitBadgeProps {
  unitId: UnitId;
  unitNumber?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'subtle' | 'outline';
  className?: string;
}

export const UnitBadge: React.FC<UnitBadgeProps> = ({
  unitId,
  unitNumber,
  label,
  size = 'md',
  variant = 'subtle',
  className,
}) => {
  const badgeColors: Record<
    UnitId,
    {
      subtle: string;
      solid: string;
      outline: string;
    }
  > = {
    'unit-1': {
      subtle: 'bg-[#FCE5DC] text-[#9E513B] border-[#EFC0B0]',
      solid: 'bg-[#F4A58A] text-[#172033] border-[#EFC0B0]',
      outline: 'bg-white text-[#9E513B] border-[#EFC0B0]',
    },
    'unit-2': {
      subtle: 'bg-[#E5EFFB] text-[#416B9E] border-[#B9D1EE]',
      solid: 'bg-[#91B9E8] text-[#172033] border-[#B9D1EE]',
      outline: 'bg-white text-[#416B9E] border-[#B9D1EE]',
    },
    'unit-3': {
      subtle: 'bg-[#E5F3E9] text-[#3F7951] border-[#B8DCC3]',
      solid: 'bg-[#8FC7A3] text-[#172033] border-[#B8DCC3]',
      outline: 'bg-white text-[#3F7951] border-[#B8DCC3]',
    },
    'unit-4': {
      subtle: 'bg-[#EEE9F8] text-[#68539A] border-[#CFC2EA]',
      solid: 'bg-[#B7A3E3] text-[#172033] border-[#CFC2EA]',
      outline: 'bg-white text-[#68539A] border-[#CFC2EA]',
    },
    'unit-5': {
      subtle: 'bg-[#FAF2D8] text-[#806A28] border-[#EBD99A]',
      solid: 'bg-[#E8C878] text-[#172033] border-[#EBD99A]',
      outline: 'bg-white text-[#806A28] border-[#EBD99A]',
    },
    'unit-6': {
      subtle: 'bg-[#F6E5EB] text-[#8A4E63] border-[#E5BBC9]',
      solid: 'bg-[#D99AAF] text-[#172033] border-[#E5BBC9]',
      outline: 'bg-white text-[#8A4E63] border-[#E5BBC9]',
    },
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium tracking-tight rounded',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wide rounded-md',
    lg: 'text-sm px-3 py-1.5 font-bold tracking-wide rounded-md',
  };

  const colorStyle = badgeColors[unitId] || badgeColors['unit-1'];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 border font-medium uppercase',
        sizeClasses[size],
        colorStyle[variant],
        className
      )}
    >
      {unitNumber !== undefined && <span>UNIT {unitNumber}</span>}
      {label && <span>{label}</span>}
    </span>
  );
};
