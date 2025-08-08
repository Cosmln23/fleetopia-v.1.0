"use client";

import { create } from 'zustand';

export type Language = 'en' | 'ro';

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useI18nStore = create<I18nState>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
}));
