'use client';

import React, { useState } from 'react';
import { RotateCw, Eye, Tag } from 'lucide-react';
import { FlashcardItem } from '@/types';
import katex from 'katex';
import { cn } from '@/lib/utils';

interface FlashcardProps {
  card: FlashcardItem;
  className?: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({ card, className }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const renderKatex = (latex: string) => {
    try {
      return { __html: katex.renderToString(latex, { throwOnError: false }) };
    } catch {
      return { __html: latex };
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Flashcard: ${card.front}. Click or press space to reveal answer.`}
      className={cn(
        'group cursor-pointer select-none min-h-[220px] p-6 bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs hover:border-[#CBD5E1] dark:hover:border-[#3D4F63] hover:shadow-sm transition-all duration-200 flex flex-col justify-between relative focus-visible:outline-2 focus-visible:outline-[#91B9E8]',
        isFlipped ? 'bg-gradient-to-b from-[#F8FAFC] to-white dark:from-[#182332] dark:to-[#151F2B] border-[#B9D1EE] dark:border-[#3B526B]' : '',
        className
      )}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#B8C4D1]">
        <span className="inline-flex items-center gap-1 font-medium bg-[#F1F5F9] dark:bg-[#202D3B] px-2 py-0.5 rounded text-[#475569] dark:text-[#CBD5E1]">
          <Tag className="w-3 h-3 text-[#94A3B8] dark:text-[#7F8B99]" />
          {card.tag}
        </span>
        <span className="text-[11px] font-semibold text-[#94A3B8] dark:text-[#7F8B99] uppercase tracking-wider">
          {isFlipped ? 'Answer' : 'Question'}
        </span>
      </div>

      {/* Main Content */}
      <div className="my-auto py-3 text-center">
        {!isFlipped ? (
          <p className="text-base sm:text-lg font-bold text-[#172033] dark:text-[#F1F5F9] leading-snug">
            {card.front}
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm sm:text-base font-medium text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
              {card.back}
            </p>
            {card.formula && (
              <div
                className="py-2 px-3 bg-[#F1F5F9] dark:bg-[#202D3B] text-[#172033] dark:text-[#F1F5F9] rounded-lg inline-block text-sm overflow-x-auto max-w-full"
                dangerouslySetInnerHTML={renderKatex(card.formula)}
              />
            )}
          </div>
        )}
      </div>

      {/* Footer Indicator */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-[#94A3B8] dark:text-[#7F8B99] group-hover:text-[#64748B] dark:group-hover:text-[#B8C4D1] pt-2 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
        {isFlipped ? (
          <>
            <RotateCw className="w-3.5 h-3.5" />
            <span>Click to flip back</span>
          </>
        ) : (
          <>
            <Eye className="w-3.5 h-3.5" />
            <span>Click to reveal answer</span>
          </>
        )}
      </div>
    </div>
  );
};
