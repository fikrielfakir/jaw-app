import { create } from 'zustand';

interface UIState {
  theme: 'light' | 'dark';
  language: 'en' | 'fr' | 'es';
  isBottomSheetOpen: boolean;
  activeTab: string;
  searchQuery: string;
  selectedCategory: string | null;
  toggleTheme: () => void;
  setLanguage: (language: 'en' | 'fr' | 'es') => void;
  setBottomSheetOpen: (isOpen: boolean) => void;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'dark',
  language: 'en',
  isBottomSheetOpen: false,
  activeTab: 'home',
  searchQuery: '',
  selectedCategory: null,
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setLanguage: (language) => set({ language }),
  setBottomSheetOpen: (isBottomSheetOpen) => set({ isBottomSheetOpen }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
}));