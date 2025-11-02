import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  isAuthReady: boolean;
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  isAuthReady: false,
  user: null,
  signIn: (user) => set({ isAuthenticated: true, user, isAuthReady: true }),
  signOut: () => set({ isAuthenticated: false, user: null }),
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null,
  })),
}));