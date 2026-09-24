export type UnitId = 'unit-1' | 'unit-2' | 'unit-3' | 'unit-4' | 'unit-5' | 'unit-6';

export interface UnitInfo {
  id: UnitId;
  unitNumber: number;
  title: string;
  shortTitle: string;
  description: string;
  accentColor: string; // Primary hex color
  colorTokens: {
    primary: string;
    soft: string;
    border: string;
    text: string;
  };
  accentClass: string;
  topics: string[];
  estimatedHours: number;
  totalLessons: number;
  totalLabs: number;
  totalQuizzes: number;
  progressPercent: number; // For demo/dashboard
  prerequisites: string[];
}

export interface Lesson {
  id: string;
  unitId: UnitId;
  title: string;
  description: string;
  durationMinutes: number;
  completed: boolean;
  order: number;
  type: 'concept' | 'interactive' | 'derivation' | 'code';
}

export interface Lab {
  id: string;
  unitId: UnitId;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  completed: boolean;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  unitId: UnitId;
  title: string;
  questions: QuizQuestion[];
}

export interface FlashcardItem {
  id: string;
  unitId: UnitId;
  front: string;
  back: string;
  formula?: string;
  tag: string;
}

export interface FormulaItem {
  id: string;
  unitId: UnitId;
  title: string;
  latex: string;
  description: string;
  variables: { symbol: string; meaning: string }[];
}

export interface UserStats {
  unitsCompleted: number;
  lessonsCompleted: number;
  labsCompleted: number;
  quizzesCompleted: number;
  overallProgress: number;
  currentStreakDays: number;
  recentActivity: {
    title: string;
    unitNumber: number;
    timestamp: string;
    type: 'lesson' | 'lab' | 'quiz';
  }[];
}
