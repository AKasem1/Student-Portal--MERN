export interface Announcement {
  _id: string;
  title: string;
  message: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  subject: string;
  instructor: string;
  duration: number;
  totalPoints: number;
  questions: Question[];
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface ApiResponse<T> {
  status: string;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  status: string;
  data: {
    [key: string]: T[];
  } & {
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}
