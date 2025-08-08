"use client";

import { create } from 'zustand';

type Plan = 'trial' | 'pro';

interface AuthState {
  plan: Plan;
  setPlan: (plan: Plan) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  plan: 'trial',
  setPlan: (plan) => set({ plan }),
}));
