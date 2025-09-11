import { create } from 'zustand';
import { User } from '@/types/models';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userType: 'diner' | 'owner' | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  userType: null,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      userType: user?.userType || null,
    }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      userType: null,
    }),
}));
