import { create } from 'zustand';
import type { User } from '@/types';
import api from '@/lib/axios';
import type { LoginFormData, RegisterFormData } from '@/schemas/auth.schema';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (data: LoginFormData) => Promise<void>;
  register: (data: Omit<RegisterFormData, 'confirmPassword'>) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('auth-token'),
  isAuthenticated: !!localStorage.getItem('auth-token'),
  isLoading: false,
  error: null,

  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', data);
      // API returns flat: { _id, name, email, role, grade, token }
      const { token, ...userData } = response.data;

      localStorage.setItem('auth-token', token);

      set({
        user: userData as User,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || 'Login gagal. Silakan coba lagi.';
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/register', data);
      // API returns flat: { _id, name, email, role, grade, token }
      const { token, ...userData } = response.data;

      localStorage.setItem('auth-token', token);

      set({
        user: userData as User,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || 'Registrasi gagal. Silakan coba lagi.';
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem('auth-token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      set({ isAuthenticated: false, isLoading: false });
      return;
    }

    // If we have a token, set authenticated state
    // The user data will come from dashboard or profile endpoint
    set({ 
      isAuthenticated: true, 
      isLoading: false,
      token,
    });
  },

  clearError: () => set({ error: null }),
}));
