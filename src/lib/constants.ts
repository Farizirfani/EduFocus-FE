export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  COURSE_CONTENT: '/courses/:courseId/:chapterId',
  SETTINGS: '/settings',
} as const;

export const APP_NAME = 'EduFocus';
