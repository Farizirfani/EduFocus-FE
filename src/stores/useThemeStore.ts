import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: localStorage.getItem('theme') === 'dark',

  toggleTheme: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newMode);
      return { isDarkMode: newMode };
    }),
}));
