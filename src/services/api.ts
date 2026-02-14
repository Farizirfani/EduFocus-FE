import api from '@/lib/axios';
import type { Course, Chapter, DashboardData, Progress } from '@/types';

// ─── Dashboard ───────────────────────────────────────────────
export const getDashboard = async (): Promise<DashboardData> => {
  const { data } = await api.get('/dashboard');
  return data;
};

// ─── Courses ─────────────────────────────────────────────────
export const getCourses = async (category?: string): Promise<Course[]> => {
  const params = category ? { category } : {};
  const { data } = await api.get('/courses', { params });
  return data;
};

export const getCourseById = async (id: string): Promise<Course> => {
  const { data } = await api.get(`/courses/${id}`);
  return data;
};

// ─── Chapters ────────────────────────────────────────────────
export const getChaptersByCourse = async (courseId: string): Promise<Chapter[]> => {
  const { data } = await api.get(`/chapters/course/${courseId}`);
  return data;
};

export const getChapterById = async (id: string): Promise<Chapter> => {
  const { data } = await api.get(`/chapters/${id}`);
  return data;
};

// ─── Progress ────────────────────────────────────────────────
export const getProgress = async (): Promise<Progress[]> => {
  const { data } = await api.get('/progress');
  return data;
};

export const getProgressByCourse = async (courseId: string): Promise<Progress> => {
  const { data } = await api.get(`/progress/course/${courseId}`);
  return data;
};

export const updateProgress = async (payload: {
  courseId: string;
  chapterId?: string;
  percentage?: number;
  studyHours?: number;
}): Promise<Progress> => {
  const { data } = await api.put('/progress', payload);
  return data;
};

export const getStudyHours = async (): Promise<{ totalStudyHours: number; courses: number }> => {
  const { data } = await api.get('/progress/study-hours');
  return data;
};

// ─── User ────────────────────────────────────────────────────
export const updateProfile = async (payload: {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
}): Promise<{ user: any }> => {
  const { data } = await api.put('/users/profile', payload);
  return data;
};

export const changePassword = async (payload: {
  currentPassword?: string;
  newPassword?: string;
}): Promise<void> => {
  await api.put('/users/change-password', payload);
};

export const toggleBookmark = async (courseId: string): Promise<{ bookmarked: boolean }> => {
  const { data } = await api.post(`/courses/${courseId}/bookmark`);
  return data;
};
