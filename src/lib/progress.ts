'use client';

import { useState, useEffect } from 'react';

const PROGRESS_STORAGE_KEY = 'dsl_user_progress_v1';

export interface UnitProgressState {
  completedLessons: string[]; // e.g. ['u1-l1', 'u1-l2']
  completedLabs: string[];    // e.g. ['eda', 'cleaning', 'correlation', 'visualization']
  completedQuizzes: { [quizId: string]: number }; // quizId -> score (percentage)
}

export interface GlobalProgressState {
  [unitId: string]: UnitProgressState;
}

const DEFAULT_PROGRESS: GlobalProgressState = {
  'unit-1': {
    completedLessons: [],
    completedLabs: [],
    completedQuizzes: {},
  },
};

export function getStoredProgress(): GlobalProgressState {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const item = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!item) return DEFAULT_PROGRESS;
    return JSON.parse(item);
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: GlobalProgressState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event('dsl-progress-updated'));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function toggleLessonCompletion(unitId: string, lessonId: string): boolean {
  const all = getStoredProgress();
  const unitProg = all[unitId] || { completedLessons: [], completedLabs: [], completedQuizzes: {} };
  
  const isCompleted = unitProg.completedLessons.includes(lessonId);
  if (isCompleted) {
    unitProg.completedLessons = unitProg.completedLessons.filter((id) => id !== lessonId);
  } else {
    unitProg.completedLessons.push(lessonId);
  }
  
  all[unitId] = unitProg;
  saveProgress(all);
  return !isCompleted;
}

export function toggleLabCompletion(unitId: string, labId: string): boolean {
  const all = getStoredProgress();
  const unitProg = all[unitId] || { completedLessons: [], completedLabs: [], completedQuizzes: {} };
  const isCompleted = unitProg.completedLabs.includes(labId);
  
  if (isCompleted) {
    unitProg.completedLabs = unitProg.completedLabs.filter((id) => id !== labId);
  } else {
    unitProg.completedLabs.push(labId);
  }
  
  all[unitId] = unitProg;
  saveProgress(all);
  return !isCompleted;
}

export function markLabCompleted(unitId: string, labId: string) {
  toggleLabCompletion(unitId, labId);
}


export function saveQuizScore(unitId: string, quizId: string, scorePercent: number) {
  const all = getStoredProgress();
  const unitProg = all[unitId] || { completedLessons: [], completedLabs: [], completedQuizzes: {} };
  unitProg.completedQuizzes[quizId] = scorePercent;
  all[unitId] = unitProg;
  saveProgress(all);
}

export function calculateUnitProgress(unitId: string, totalLessons: number, totalLabs: number): number {
  const all = getStoredProgress();
  const unitProg = all[unitId];
  if (!unitProg) return 0;

  const totalItems = totalLessons + totalLabs + 1; // +1 for quiz
  if (totalItems === 0) return 0;

  const completedLessonsCount = unitProg.completedLessons.length;
  const completedLabsCount = unitProg.completedLabs.length;
  const quizDone = Object.keys(unitProg.completedQuizzes).length > 0 ? 1 : 0;

  const totalCompleted = completedLessonsCount + completedLabsCount + quizDone;
  return Math.min(100, Math.round((totalCompleted / totalItems) * 100));
}

export function useUnitProgress(unitId: string = 'unit-1', totalLessons: number = 10, totalLabs: number = 4) {
  const [progress, setProgress] = useState<UnitProgressState>({
    completedLessons: [],
    completedLabs: [],
    completedQuizzes: {},
  });
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const update = () => {
      const all = getStoredProgress();
      const u = all[unitId] || { completedLessons: [], completedLabs: [], completedQuizzes: {} };
      setProgress(u);
      setPercentage(calculateUnitProgress(unitId, totalLessons, totalLabs));
    };

    update();
    window.addEventListener('dsl-progress-updated', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('dsl-progress-updated', update);
      window.removeEventListener('storage', update);
    };
  }, [unitId, totalLessons, totalLabs]);

  return {
    progress,
    percentage,
    isLessonCompleted: (lessonId: string) => progress.completedLessons.includes(lessonId),
    isLabCompleted: (labId: string) => progress.completedLabs.includes(labId),
    quizScore: (quizId: string) => progress.completedQuizzes[quizId],
    toggleLesson: (lessonId: string) => toggleLessonCompletion(unitId, lessonId),
    completeLab: (labId: string) => markLabCompleted(unitId, labId),
    toggleLab: (labId: string) => toggleLabCompletion(unitId, labId),
    submitQuiz: (quizId: string, score: number) => saveQuizScore(unitId, quizId, score),
  };
}

export interface GlobalProgressSummary {
  overallPercentage: number;
  totalLessonsCompleted: number;
  totalLabsCompleted: number;
  totalQuizzesCompleted: number;
  unitPercentages: Record<string, number>;
  activeUnitId: string;
}

export function calculateGlobalProgress(): GlobalProgressSummary {
  const all = getStoredProgress();
  const unitIds = ['unit-1', 'unit-2', 'unit-3', 'unit-4', 'unit-5', 'unit-6'];
  let totalLessons = 0;
  let totalLabs = 0;
  let totalQuizzes = 0;
  const unitPercentages: Record<string, number> = {};

  for (const uid of unitIds) {
    const u = all[uid] || { completedLessons: [], completedLabs: [], completedQuizzes: {} };
    totalLessons += u.completedLessons.length;
    totalLabs += u.completedLabs.length;
    totalQuizzes += Object.keys(u.completedQuizzes).length;
    unitPercentages[uid] = calculateUnitProgress(uid, 10, 4);
  }

  const totalItems = 60 + 24 + 6; // 90 items total across 6 units
  const completedItems = totalLessons + totalLabs + totalQuizzes;
  const overallPercentage = Math.min(100, Math.round((completedItems / totalItems) * 100));

  let activeUnitId = 'unit-1';
  for (const uid of unitIds) {
    if ((unitPercentages[uid] || 0) < 100) {
      activeUnitId = uid;
      break;
    }
  }

  return {
    overallPercentage,
    totalLessonsCompleted: totalLessons,
    totalLabsCompleted: totalLabs,
    totalQuizzesCompleted: totalQuizzes,
    unitPercentages,
    activeUnitId,
  };
}

export function useGlobalProgress(): GlobalProgressSummary {
  const [summary, setSummary] = useState<GlobalProgressSummary>(() => {
    if (typeof window === 'undefined') {
      return {
        overallPercentage: 0,
        totalLessonsCompleted: 0,
        totalLabsCompleted: 0,
        totalQuizzesCompleted: 0,
        unitPercentages: { 'unit-1': 0, 'unit-2': 0, 'unit-3': 0, 'unit-4': 0, 'unit-5': 0, 'unit-6': 0 },
        activeUnitId: 'unit-1',
      };
    }
    return calculateGlobalProgress();
  });

  useEffect(() => {
    const update = () => {
      setSummary(calculateGlobalProgress());
    };

    update();
    window.addEventListener('dsl-progress-updated', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('dsl-progress-updated', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return summary;
}

