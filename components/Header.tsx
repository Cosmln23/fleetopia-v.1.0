"use client";

import Link from 'next/link';
import { Bell, MessageCircle, User } from 'lucide-react';
import { useI18nStore } from '@/store/useI18nStore';

export default function Header() {
  const language = useI18nStore((s) => s.language);
  const setLanguage = useI18nStore((s) => s.setLanguage);
  return (
    <header className="fixed top-0 w-full z-50 glass-border fade-in">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white">Fleetopia</span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors" aria-label="Messages">
            <MessageCircle className="w-4 h-4" />
          </Link>
          <Link href="/" className="hover:text-white transition-colors" aria-label="Notifications">
            <Bell className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-3">
            <button
              className={`text-xs px-2 py-1 rounded ${language === 'en' ? 'text-white glass-border' : 'hover:text-white'}`}
              onClick={() => setLanguage('en')}
              aria-label="English"
            >
              EN
            </button>
            <button
              className={`text-xs px-2 py-1 rounded ${language === 'ro' ? 'text-white glass-border' : 'hover:text-white'}`}
              onClick={() => setLanguage('ro')}
              aria-label="Română"
            >
              RO
            </button>
            <Link href="/settings" className="hover:text-white transition-colors" aria-label="Profile">
              <User className="w-4 h-4" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
