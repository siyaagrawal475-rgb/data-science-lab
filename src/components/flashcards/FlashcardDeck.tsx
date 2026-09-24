'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Shuffle, CheckCircle } from 'lucide-react';
import { FlashcardItem } from '@/types';
import { Flashcard } from '@/components/cards/Flashcard';

interface FlashcardDeckProps {
  cards: FlashcardItem[];
  title?: string;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
}) => {

  const [deck, setDeck] = useState<FlashcardItem[]>(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const currentCard = deck[currentIndex];
  const isMastered = currentCard && masteredIds.includes(currentCard.id);

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(deck.length - 1);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const toggleMastery = () => {
    if (!currentCard) return;
    if (isMastered) {
      setMasteredIds((prev) => prev.filter((id) => id !== currentCard.id));
    } else {
      setMasteredIds((prev) => [...prev, currentCard.id]);
    }
  };

  const handleDeckKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  if (!currentCard) return null;

  return (
    <div className="space-y-4" onKeyDown={handleDeckKeyDown}>
      {/* Deck Controls Header */}
      <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#B8C4D1]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0F172A] dark:text-[#F1F5F9]">
            Card {currentIndex + 1} of {deck.length}
          </span>
          <span>•</span>
          <span>{masteredIds.length} Mastered</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShuffle}
            title="Shuffle deck"
            className="p-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2E3B4A] bg-white dark:bg-[#151F2B] hover:bg-[#F8FAFC] dark:hover:bg-[#202D3B] text-[#64748B] dark:text-[#B8C4D1] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggleMastery}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              isMastered
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                : 'bg-white dark:bg-[#151F2B] border-[#E2E8F0] dark:border-[#2E3B4A] text-[#64748B] dark:text-[#B8C4D1] hover:bg-[#F8FAFC] dark:hover:bg-[#202D3B]'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
          </button>
        </div>
      </div>

      {/* Active Card */}
      <Flashcard card={currentCard} className="min-h-[240px]" />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handlePrev}
          className="px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] bg-white dark:bg-[#151F2B] hover:bg-[#F8FAFC] dark:hover:bg-[#202D3B] text-xs font-semibold text-[#475569] dark:text-[#CBD5E1] flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        {/* Dots indicators */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[140px] px-2">
          {deck.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === currentIndex
                  ? 'w-5 bg-[#F4A58A]'
                  : masteredIds.includes(deck[i].id)
                  ? 'w-1.5 bg-emerald-400'
                  : 'w-1.5 bg-[#E2E8F0] dark:bg-[#2E3B4A]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-3.5 py-2 rounded-xl bg-[#0F172A] dark:bg-[#F1F5F9] hover:bg-[#1E293B] dark:hover:bg-white text-white dark:text-[#0F172A] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
        >
          <span>Next</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
