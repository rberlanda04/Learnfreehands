/**
 * Tipos para o sistema educacional de Libras
 * WiW Speak — Window in World
 */

export interface LibrasSign {
  id: string;
  letter?: string;
  word?: string;
  category: SignCategory;
  description: string;
  instruction: string;
  tips?: string;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  supported: boolean;
  vlibrasGlosa?: string;
  videoUrl?: string;
  gifUrl?: string;
  handShape?: string;
}

export type SignCategory =
  | 'alfabeto'
  | 'cumprimentos'
  | 'saude'
  | 'educacao'
  | 'emergencia'
  | 'cotidiano'
  | 'numeros'
  | 'familia';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: SignCategory;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  signs: LibrasSign[];
  order: number;
}

export interface QuizQuestion {
  id: string;
  type: 'identify' | 'perform';
  sign: LibrasSign;
  options?: string[];
  correctAnswer: string;
}

export interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  totalPracticeTime: number;
  streak: number;
  lastPracticeDate: string;
  level: 'iniciante' | 'intermediario' | 'avancado';
  lettersLearned: string[];
  wordsLearned: string[];
}

export interface ProgressStats {
  totalLetters: number;
  learnedLetters: number;
  totalWords: number;
  learnedWords: number;
  averageQuizScore: number;
  practiceStreak: number;
}
