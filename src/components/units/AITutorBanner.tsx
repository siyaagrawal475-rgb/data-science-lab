'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Send, MessageSquareQuote, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AITutorBannerProps {
  unitTitle: string;
}

export const AITutorBanner: React.FC<AITutorBannerProps> = ({ unitTitle }) => {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const suggestedQuestions = [
    'What is exploratory data analysis?',
    'When should I use mean vs median?',
    'What does standard deviation tell us?',
    'What is correlation?',
  ];

  const handleSelect = (q: string) => {
    setSelectedPrompt(q);
    setCustomInput(q);
    setIsOpen(true);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-[#FAF5F0] via-white to-[#FCE5DC]/30 dark:from-[#1A2634] dark:via-[#151F2B] dark:to-[#221815] rounded-2xl border border-[#EFC0B0]/60 dark:border-[#523326] shadow-xs relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FCE5DC] dark:bg-[#432820] text-[#9E513B] dark:text-[#F8B4A6] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Tutor Integration Boundary</span>
          </div>

          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#9E513B] dark:text-[#F4A58A]" />
            Ask about {unitTitle}
          </h3>

          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#B8C4D1] leading-relaxed">
            Get instant conceptual explanations, formula breakdowns, and intuition checks tailored specifically to Unit 1 principles.
          </p>
        </div>

        <div className="shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            leftIcon={<MessageSquareQuote className="w-4 h-4 text-[#9E513B] dark:text-[#F4A58A]" />}
          >
            {isOpen ? 'Collapse Tutor' : 'Open Tutor Assistant'}
          </Button>
        </div>
      </div>

      {/* Suggested Question Chips */}
      <div className="mt-4 pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
        <span className="text-xs font-semibold text-[#64748B] dark:text-[#B8C4D1] block mb-2">
          Suggested questions to explore:
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSelect(q)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left flex items-center gap-1.5 cursor-pointer ${
                selectedPrompt === q
                  ? 'bg-[#FCE5DC] dark:bg-[#432820] text-[#9E513B] dark:text-[#F8B4A6] border-[#EFC0B0] dark:border-[#6B3B2E] font-medium shadow-2xs'
                  : 'bg-white dark:bg-[#151F2B] hover:bg-[#F8FAFC] dark:hover:bg-[#202D3B] text-[#475569] dark:text-[#CBD5E1] border-[#E2E8F0] dark:border-[#2E3B4A]'
              }`}
            >
              <span>{q}</span>
              <ArrowRight className="w-3 h-3 text-[#94A3B8] dark:text-[#7F8B99]" />
            </button>
          ))}
        </div>
      </div>

      {/* Input / Boundary Container */}
      {isOpen && (
        <div className="mt-4 p-4 bg-white dark:bg-[#151F2B] rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask a question about foundations, distributions, or EDA..."
              className="flex-1 px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#101923] text-[#0F172A] dark:text-[#F1F5F9] border border-[#E2E8F0] dark:border-[#2E3B4A] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F4A58A] focus:border-[#F4A58A]"
            />
            <Button
              variant="unit"
              unitId="unit-1"
              size="sm"
              disabled={!customInput.trim()}
              leftIcon={<Send className="w-3.5 h-3.5" />}
            >
              Ask
            </Button>
          </div>

          <div className="p-3 bg-[#F8FAFC] dark:bg-[#101923] rounded-lg border border-[#E2E8F0] dark:border-[#2E3B4A] flex items-start gap-2.5 text-xs text-[#64748B] dark:text-[#B8C4D1]">
            <HelpCircle className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8B99] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#0F172A] dark:text-[#F1F5F9] font-semibold">Tutor Integration Boundary:</strong> The conversational model gateway is ready for API configuration in Phase 3. Real responses will stream dynamically when connected.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
