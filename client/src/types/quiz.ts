export interface Quiz {
  _id: string;
  title: string;
  subject: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizSubmission {
  _id: string;
  quiz: string;
  user: string;
  answers: number[];
  score: number;
  totalQuestions: number;
  submittedAt: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  results: QuestionResult[];
}

export interface QuestionResult {
  question: string;
  selectedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  explanation?: string;
}
