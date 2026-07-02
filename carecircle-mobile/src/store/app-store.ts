import { create } from 'zustand';

export type AppRole = 'admin' | 'member' | 'elder';

type AppState = {
  activeElderId: string | null;
  role: AppRole | null;
  onboardingComplete: boolean;
  setActiveElder: (id: string | null) => void;
  setRole: (role: AppRole | null) => void;
  completeOnboarding: () => void;
  reset: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  activeElderId: null,
  role: null,
  onboardingComplete: false,
  setActiveElder: (activeElderId) => set({ activeElderId }),
  setRole: (role) => set({ role }),
  completeOnboarding: () => set({ onboardingComplete: true }),
  reset: () => set({ activeElderId: null, role: null, onboardingComplete: false }),
}));
