import axios from 'axios';
import { API_BASE_URL } from '@/lib/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 by redirecting to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if not already on auth pages
      const isAuthPage = window.location.pathname.startsWith('/login') || 
                          window.location.pathname.startsWith('/register');
      if (!isAuthPage) {
        localStorage.removeItem('auth-token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
