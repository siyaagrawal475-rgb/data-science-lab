'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Award,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';

import { QuizQuestion, QuizData } from '@/data/unit1/quizzes';
import { useUnitProgress } from '@/lib/progress';
import { UnitId } from '@/types';

interface QuizEngineProps {
  quiz: QuizData;
  unitId: UnitId;
}


export const QuizEngine: React.FC<QuizEngineProps> = ({ quiz, unitId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{ [qId: string]: boolean }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const { submitQuiz } = useUnitProgress(unitId);

  const currentQuestion: QuizQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const currentSelected = selectedAnswers[currentQuestion?.id];
  const isCurrentSubmitted = submittedAnswers[currentQuestion?.id];

  const handleSelect = (idx: number) => {
    if (isCurrentSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: idx }));
  };

  const handleSubmitCurrent = () => {
    if (currentSelected === undefined) return;
    setSubmittedAnswers((prev) => ({ ...prev, [currentQuestion.id]: true }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished quiz
      let correctCount = 0;
      quiz.questions.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctIndex) {
          correctCount += 1;
        }
      });
      const scorePercent = Math.round((correctCount / totalQuestions) * 100);
      submitQuiz(quiz.id, scorePercent);
      setIsFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setReviewMode(false);
  };

  // Score computation
  const correctCount = quiz.questions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = scorePercent >= (quiz.passingScore || 70);

  if (isFinished && !reviewMode) {
    return (
      <div className="p-6 sm:p-8 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-6 text-center max-w-2xl mx-auto">
        <div
          className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
            isPassed ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
          }`}
        >
          {isPassed ? <Award className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#B8C4D1]">
            Assessment Result
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F1F5F9]">
            {isPassed ? 'Unit Mastery Achieved!' : 'Keep Practicing'}
          </h2>
          <p className="text-sm text-[#475569] dark:text-[#CBD5E1]">
            {isPassed
              ? `Congratulations! You scored ${scorePercent}% and demonstrated a solid understanding of the material.`
              : `You scored ${scorePercent}%. Review the core lessons and try again to improve your score.`}
          </p>
        </div>

        {/* Score badge */}
        <div className="inline-flex items-center gap-6 px-6 py-4 rounded-xl bg-[#F8FAFC] dark:bg-[#101923] border border-[#E2E8F0] dark:border-[#2E3B4A]">
          <div>
            <span className="text-xs text-[#64748B] dark:text-[#B8C4D1] block font-medium">Score</span>
            <span className="text-2xl font-black text-[#0F172A] dark:text-[#F1F5F9]">{scorePercent}%</span>
          </div>
          <div className="h-8 w-px bg-[#E2E8F0] dark:bg-[#2E3B4A]" />
          <div>
            <span className="text-xs text-[#64748B] dark:text-[#B8C4D1] block font-medium">Correct</span>
            <span className="text-2xl font-black text-[#0F172A] dark:text-[#F1F5F9]">
              {correctCount} / {totalQuestions}
            </span>
          </div>
          <div className="h-8 w-px bg-[#E2E8F0] dark:bg-[#2E3B4A]" />
          <div>
            <span className="text-xs text-[#64748B] dark:text-[#B8C4D1] block font-medium">Status</span>
            <span
              className={`text-sm font-bold uppercase tracking-wide ${
                isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {isPassed ? 'Passed' : 'Needs Review'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setReviewMode(true)}
            className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2E3B4A] bg-white dark:bg-[#151F2B] hover:bg-[#F8FAFC] dark:hover:bg-[#202D3B] text-xs sm:text-sm font-semibold text-[#334155] dark:text-[#CBD5E1] transition-colors cursor-pointer"
          >
            Review Answers
          </button>
          <button
            onClick={handleRetry}
            className="px-4 py-2.5 rounded-xl bg-[#0F172A] dark:bg-[#F1F5F9] hover:bg-[#1E293B] dark:hover:bg-white text-white dark:text-[#0F172A] text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 bg-white dark:bg-[#151F2B] rounded-2xl border border-[#E2E8F0] dark:border-[#2E3B4A] shadow-xs space-y-6">
      {/* Quiz Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] dark:border-[#2E3B4A] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#FCE5DC] dark:bg-[#432820] text-[#9E513B] dark:text-[#F8B4A6]">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F1F5F9]">{quiz.title}</h3>
            <span className="text-xs text-[#64748B] dark:text-[#B8C4D1]">
              Question {currentIndex + 1} of {totalQuestions} • {currentQuestion.category}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="sm:w-48 space-y-1">
          <div className="flex justify-between text-[11px] text-[#64748B] dark:text-[#B8C4D1] font-semibold">
            <span>Progress</span>
            <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-[#F1F5F9] dark:bg-[#202D3B] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F4A58A] transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Details */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="w-7 h-7 rounded-lg bg-[#F8FAFC] dark:bg-[#202D3B] border border-[#E2E8F0] dark:border-[#2E3B4A] text-xs font-bold text-[#0F172A] dark:text-[#F1F5F9] flex items-center justify-center shrink-0">
            {currentIndex + 1}
          </span>
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#9E513B] dark:text-[#F8B4A6] uppercase tracking-wider block">
              {currentQuestion.type || 'Conceptual'}
            </span>
            <h4 className="text-base sm:text-lg font-semibold text-[#0F172A] dark:text-[#F1F5F9] leading-snug">
              {currentQuestion.question}
            </h4>
          </div>
        </div>

        {/* Option Choices */}
        <div className="space-y-2.5 pt-2">
          {currentQuestion.options.map((opt, optIdx) => {
            const isSelected = currentSelected === optIdx;
            const isSubmitted = isCurrentSubmitted || reviewMode;
            const isCorrect = optIdx === currentQuestion.correctIndex;

            let btnClass = 'bg-white dark:bg-[#1A2634] border-[#E2E8F0] dark:border-[#2E3B4A] hover:border-[#CBD5E1] dark:hover:border-[#3D4F63] text-[#334155] dark:text-[#CBD5E1]';

            if (isSubmitted) {
              if (isCorrect) {
                btnClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 font-medium';
              } else if (isSelected && !isCorrect) {
                btnClass = 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-700 text-red-950 dark:text-red-200';
              } else {
                btnClass = 'bg-[#F8FAFC] dark:bg-[#101923] border-[#E2E8F0] dark:border-[#2E3B4A] text-[#94A3B8] dark:text-[#64748B] opacity-60';
              }
            } else if (isSelected) {
              btnClass = 'bg-[#FCE5DC] dark:bg-[#432820] border-[#F4A58A] dark:border-[#F4A58A] text-[#9E513B] dark:text-[#F8B4A6] font-semibold ring-1 ring-[#F4A58A]';
            }

            return (
              <button
                key={optIdx}
                onClick={() => handleSelect(optIdx)}
                disabled={isSubmitted}
                className={`w-full p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between gap-3 transition-all cursor-pointer disabled:cursor-default ${btnClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-[#F1F5F9] dark:bg-[#253548] border border-[#E2E8F0] dark:border-[#2E3B4A] text-xs font-bold text-[#64748B] dark:text-[#CBD5E1] flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                {isSubmitted && isSelected && !isCorrect && (
                  <X className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Instant Feedback if submitted */}
      {(isCurrentSubmitted || reviewMode) && (
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
            currentSelected === currentQuestion.correctIndex
              ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
              : 'bg-red-50/80 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-950 dark:text-red-200'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5">
            {currentSelected === currentQuestion.correctIndex ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />
                <span>Incorrect</span>
              </>
            )}
          </div>
          <p className="leading-relaxed opacity-90">{currentQuestion.explanation}</p>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] dark:border-[#2E3B4A]">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-3.5 py-2 rounded-lg border border-[#E2E8F0] dark:border-[#2E3B4A] bg-white dark:bg-[#151F2B] hover:bg-[#F8FAFC] dark:hover:bg-[#202D3B] disabled:opacity-40 text-xs font-semibold text-[#475569] dark:text-[#CBD5E1] flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {!isCurrentSubmitted && !reviewMode ? (
            <button
              onClick={handleSubmitCurrent}
              disabled={currentSelected === undefined}
              className="px-4 py-2 bg-[#0F172A] dark:bg-[#F1F5F9] hover:bg-[#1E293B] dark:hover:bg-white disabled:bg-[#E2E8F0] dark:disabled:bg-[#202D3B] disabled:text-[#94A3B8] dark:disabled:text-[#64748B] text-white dark:text-[#0F172A] rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed shadow-xs"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-[#F4A58A] hover:bg-[#EE8C6C] text-[#33150D] font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{currentIndex === totalQuestions - 1 ? 'View Results' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
