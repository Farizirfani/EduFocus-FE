export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  grade?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Auth API returns flat object: { _id, name, email, role, grade, token }
export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  grade?: string;
  token: string;
}

export interface Course {
  _id: string;
  title: string;
  subtitle?: string;
  subject?: string;
  category: 'Science' | 'Mathematics' | 'Languages' | 'Social Studies' | 'Other';
  icon?: string;
  description?: string;
  createdBy?: string;
  isBookmarked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Chapter {
  _id: string;
  title: string;
  content: string;
  courseId: string;
  order: number;
  readingTime?: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Quiz {
  _id: string;
  title: string;
  chapterId: string;
  questions: QuizQuestion[];
  createdAt?: string;
  updatedAt?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
}

export interface Note {
  _id: string;
  userId: string;
  chapterId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Progress {
  _id: string;
  userId: string;
  courseId: string;
  chapterId?: string;
  percentage: number;
  studyHours: number;
  status: 'not_started' | 'in_progress' | 'completed';
  lastAccessedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardData {
  examReadiness: number;
  continueReading?: {
    course: Course;
    chapter: Chapter;
    progress: number;
  };
  continueLearning: Array<{
    course: Course;
    percentage: number;
  }>;
  totalStudyHours: number;
  totalCourses: number;
  completedCourses: number;
}

export interface StudyHoursData {
  totalStudyHours: number;
  courses: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
