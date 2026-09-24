'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { UnitId } from '@/types';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  unitId?: UnitId;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  unitId = 'unit-1',
  className,
}) => {
  const [internalActive, setInternalActive] = useState(activeTab || tabs[0]?.id || '');
  const current = activeTab !== undefined ? activeTab : internalActive;

  const handleSelect = (id: string) => {
    setInternalActive(id);
    onChange?.(id);
  };

  const activeBorderColors: Record<UnitId, string> = {
    'unit-1': 'border-[#F4A58A] text-[#9E513B] dark:text-[#FFBEA8]',
    'unit-2': 'border-[#91B9E8] text-[#416B9E] dark:text-[#BBD6F6]',
    'unit-3': 'border-[#8FC7A3] text-[#3F7951] dark:text-[#AEE2C0]',
    'unit-4': 'border-[#B7A3E3] text-[#68539A] dark:text-[#D5C7F4]',
    'unit-5': 'border-[#E8C878] text-[#806A28] dark:text-[#F6DF99]',
    'unit-6': 'border-[#D99AAF] text-[#8A4E63] dark:text-[#F3BFD0]',
  };

  const activeStyle = activeBorderColors[unitId] || activeBorderColors['unit-1'];

  return (
    <div className={cn('border-b border-[#E2E8F0] dark:border-[#2E3B4A] overflow-x-auto scrollbar-none transition-colors', className)}>
      <div className="flex gap-2 min-w-max">
        {tabs.map((tab) => {
          const isActive = tab.id === current;

          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer',
                isActive
                  ? `${activeStyle} font-semibold`
                  : 'border-transparent text-[#64748B] dark:text-[#B8C4D1] hover:text-[#172033] dark:hover:text-[#F1F5F9] hover:border-[#CBD5E1] dark:hover:border-[#3D4F63]'
              )}
            >
              {tab.icon && <span className="w-4 h-4 shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'text-[11px] px-1.5 py-0.5 rounded-full font-semibold',
                    isActive ? 'bg-[#F1F5F9] dark:bg-[#202D3B] text-[#172033] dark:text-[#F1F5F9]' : 'bg-[#F1F5F9] dark:bg-[#202D3B] text-[#64748B] dark:text-[#B8C4D1]'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
