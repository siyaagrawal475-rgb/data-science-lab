'use client';

import { useState, useEffect } from 'react';

const PROGRESS_STORAGE_KEY = 'dsl_user_progress_v1';
const TIMER_STORAGE_KEY = 'dsl_study_timer_v1';
const ACTIVITY_STORAGE_KEY = 'dsl_study_activity_v1';

export interface UnitProgressState {
  completedLessons: string[]; // e.g. ['u1-l1', 'u1-l2']
  completedLabs: string[];    // e.g. ['eda', 'cleaning', 'correlation', 'visualization']
  completedQuizzes: { [quizId: string]: number }; // quizId -> score (percentage)
}

export interface GlobalProgressState {
  [unitId: string]: UnitProgressState;
}

export interface ActivityEvent {
  id: string;
  type: 'lesson' | 'lab' | 'quiz' | 'tutor' | 'flashcard';
  title: string;
  unitId?: string;
  timestamp: string;
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

export function getRecentActivity(): ActivityEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
}

export function logActivity(type: ActivityEvent['type'], title: string, unitId?: string) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getRecentActivity();
    const newEvent: ActivityEvent = {
      id: 'act-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      type,
      title,
      unitId,
      timestamp: new Date().toISOString(),
    };
    const updated = [newEvent, ...existing].slice(0, 25);
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('dsl-activity-updated'));
  } catch {
    // ignore
  }
}

export function toggleLessonCompletion(unitId: string, lessonId: string, lessonTitle?: string): boolean {
  const all = getStoredProgress();
  const unitProg = all[unitId] || { completedLessons: [], completedLabs: [], completedQuizzes: {} };
  
  const isCompleted = unitProg.completedLessons.includes(lessonId);
  if (isCompleted) {
    unitProg.completedLessons = unitProg.completedLessons.filter((id) => id !== lessonId);
  } else {
    unitProg.completedLessons.push(lessonId);
    logActivity('lesson', `Completed lesson: ${lessonTitle || lessonId}`, unitId);
  }
  
  all[unitId] = unitProg;
  saveProgress(all);
  return !isCompleted;
}

export function toggleLabCompletion(unitId: string, labId: string, labTitle?: string): boolean {
  const all = getStoredProgress();
  const unitProg = all[unitId] || { completedLessons: [], completedLabs: [], completedQuizzes: {} };
  const isCompleted = unitProg.completedLabs.includes(labId);
  
  if (isCompleted) {
    unitProg.completedLabs = unitProg.completedLabs.filter((id) => id !== labId);
  } else {
    unitProg.completedLabs.push(labId);
    logActivity('lab', `Finished computational lab: ${labTitle || labId}`, unitId);
  }
  
  all[unitId] = unitProg;
  saveProgress(all);
  return !isCompleted;
}

export function markLabCompleted(unitId: string, labId: string, labTitle?: string) {
  toggleLabCompletion(unitId, labId, labTitle);
}

export function saveQuizScore(unitId: string, quizId: string, scorePercent: number, quizTitle?: string) {
  const all = getStoredProgress();
  const unitProg = all[unitId] || { completedLessons: [], completedLabs: [], completedQuizzes: {} };
  unitProg.completedQuizzes[quizId] = scorePercent;
  all[unitId] = unitProg;
  saveProgress(all);
  logActivity('quiz', `Evaluated quiz (${scorePercent}%): ${quizTitle || quizId}`, unitId);
}

export function calculateUnitProgress(unitId: string, totalLessons: number = 10, totalLabs: number = 4): number {
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
    toggleLesson: (lessonId: string, title?: string) => toggleLessonCompletion(unitId, lessonId, title),
    completeLab: (labId: string, title?: string) => markLabCompleted(unitId, labId, title),
    toggleLab: (labId: string, title?: string) => toggleLabCompletion(unitId, labId, title),
    submitQuiz: (quizId: string, score: number, title?: string) => saveQuizScore(unitId, quizId, score, title),
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

// Real Study Timer Hook
export function useStudyTimer() {
  const [totalSeconds, setTotalSeconds] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const stored = localStorage.getItem(TIMER_STORAGE_KEY);
      return stored ? parseInt(stored, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          const next = prev + 1;
          try {
            localStorage.setItem(TIMER_STORAGE_KEY, next.toString());
          } catch {
            // ignore
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const toggleTimer = () => setIsRunning((r) => !r);
  const resetTimer = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    try {
      localStorage.setItem(TIMER_STORAGE_KEY, '0');
    } catch {
      // ignore
    }
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) {
      return `${h}h ${m}m ${s}s`;
    }
    return `${m}m ${s}s`;
  };

  return {
    totalSeconds,
    isRunning,
    toggleTimer,
    resetTimer,
    formattedTime: formatTime(totalSeconds),
  };
}

// Export Study Report in CSV format
export function exportStudyReportCSV(studentName: string, prn: string) {
  const all = getStoredProgress();
  const summary = calculateGlobalProgress();
  const timerSecs = typeof window !== 'undefined' ? parseInt(localStorage.getItem(TIMER_STORAGE_KEY) || '0', 10) : 0;
  const timerMins = Math.round(timerSecs / 60);

  const rows = [
    ['DATA SCIENCE LAB — OFFICIAL STUDENT PROGRESS REPORT'],
    ['Generated At', new Date().toLocaleString()],
    ['Student Name', studentName || 'Scholar'],
    ['PRN / ID', prn || 'GUEST-MODE'],
    ['Overall Mastery', `${summary.overallPercentage}%`],
    ['Total Lessons Completed', `${summary.totalLessonsCompleted} / 60`],
    ['Total Labs Completed', `${summary.totalLabsCompleted} / 24`],
    ['Total Quizzes Completed', `${summary.totalQuizzesCompleted} / 6`],
    ['Total Study Time', `${timerMins} minutes (${timerSecs} seconds)`],
    [],
    ['UNIT BREAKDOWN', 'COMPLETION %', 'LESSONS DONE', 'LABS DONE', 'QUIZ SCORES'],
    ...['unit-1', 'unit-2', 'unit-3', 'unit-4', 'unit-5', 'unit-6'].map((uid, idx) => {
      const u = all[uid] || { completedLessons: [], completedLabs: [], completedQuizzes: {} };
      const pct = summary.unitPercentages[uid] || 0;
      const quizScores = Object.entries(u.completedQuizzes)
        .map(([qid, sc]) => `${qid}: ${sc}%`)
        .join('; ') || 'Not attempted';
      return [
        `Unit ${idx + 1}`,
        `${pct}%`,
        `${u.completedLessons.length} / 10`,
        `${u.completedLabs.length} / 4`,
        quizScores,
      ];
    }),
  ];

  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `DSL_Study_Report_${prn || 'student'}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
