'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Quiz } from '@/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  quiz: Quiz;
  className?: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = quiz.questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div
      className={cn(
        'p-5 sm:p-6 bg-white rounded-xl border border-[#E2E8F0] shadow-xs',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#68539A]" />
          <h4 className="text-base font-bold text-[#172033]">{quiz.title}</h4>
        </div>
        {!isCompleted && (
          <span className="text-xs font-semibold text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-md">
            Question {currentIndex + 1} of {quiz.questions.length}
          </span>
        )}
      </div>

      {isCompleted ? (
        <div className="text-center py-6 space-y-4">
          <div className="inline-flex p-3 rounded-full bg-[#E5F3E9] text-[#3F7951]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h5 className="text-lg font-bold text-[#172033]">Knowledge Check Complete!</h5>
            <p className="text-sm text-[#64748B] mt-1">
              You scored <span className="font-bold text-[#172033]">{score}</span> out of{' '}
              <span className="font-bold text-[#172033]">{quiz.questions.length}</span> (
              {Math.round((score / quiz.questions.length) * 100)}%)
            </p>
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Retake Quiz
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm sm:text-base font-semibold text-[#172033] leading-snug">
            {currentQ.question}
          </p>

          {/* Options */}
          <div className="space-y-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let optionStyle = 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] text-[#172033]';

              if (isSelected && !isSubmitted) {
                optionStyle = 'bg-[#E5EFFB] border-[#91B9E8] text-[#416B9E] ring-1 ring-[#91B9E8]';
              } else if (isSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-[#E5F3E9] border-[#8FC7A3] text-[#3F7951] ring-1 ring-[#8FC7A3]';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-[#F6E5EB] border-[#E5BBC9] text-[#8A4E63] ring-1 ring-[#E5BBC9]';
                } else {
                  optionStyle = 'bg-white border-[#E2E8F0] text-[#94A3B8] opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isSubmitted}
                  className={cn(
                    'w-full flex items-center justify-between text-left p-3.5 rounded-lg border text-sm font-medium transition-all cursor-pointer disabled:cursor-default',
                    optionStyle
                  )}
                >
                  <span>{option}</span>
                  {isSubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-[#3F7951] shrink-0 ml-2" />
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-[#8A4E63] shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation banner if submitted */}
          {isSubmitted && (
            <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] leading-relaxed">
              <span className="font-bold text-[#172033] mr-1">Explanation:</span>
              {currentQ.explanation}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end pt-2">
            {!isSubmitted ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                disabled={selectedOption === null}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={handleNext}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {currentIndex + 1 === quiz.questions.length ? 'Finish Quiz' : 'Next Question'}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
