import { useUIStore } from '@/store/uiStore';

export const useTheme = () => {
  const { theme, toggleTheme } = useUIStore();

  const colors = {
    light: {
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: '#2C3E50',
      textSecondary: '#7F8C8D',
      primary: '#E67E22',
      border: '#E1E1E1',
      card: '#FFFFFF',
    },
    dark: {
      background: '#1A1A1A',
      surface: '#2C2C2C',
      text: '#FFFFFF',
      textSecondary: '#BDC3C7',
      primary: '#E67E22',
      border: '#3A3A3A',
      card: '#2C2C2C',
    },
  };

  return {
    theme,
    colors: colors[theme],
    toggleTheme,
  };
};