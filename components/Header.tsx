"use client";

import Link from 'next/link';
import { Bell, MessageCircle, User, Globe } from 'lucide-react';
import { useI18nStore } from '@/store/useI18nStore';
import { useEffect, useRef, useState } from 'react';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

export default function Header() {
  const language = useI18nStore((s) => s.language);
  const setLanguage = useI18nStore((s) => s.setLanguage);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

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
            <div className="relative" ref={menuRef}>
              <button
                className="glass-border hover:bg-white/5 transition-colors flex items-center gap-2 px-2 py-1 rounded text-xs text-white"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <Globe className="w-4 h-4" /> {language.toUpperCase()}
              </button>
              {open && (
                <div role="menu" className="absolute right-0 mt-2 glass-card rounded-lg overflow-hidden text-xs min-w-[120px]">
                  <button
                    role="menuitem"
                    className={`block w-full text-left px-3 py-2 hover:bg-white/5 ${language === 'en' ? 'text-white' : 'text-gray-300'}`}
                    onClick={() => { setLanguage('en'); setOpen(false); }}
                    aria-label="English"
                  >
                    EN — English
                  </button>
                  <button
                    role="menuitem"
                    className={`block w-full text-left px-3 py-2 hover:bg-white/5 ${language === 'ro' ? 'text-white' : 'text-gray-300'}`}
                    onClick={() => { setLanguage('ro'); setOpen(false); }}
                    aria-label="Română"
                  >
                    RO — Română
                  </button>
                </div>
              )}
            </div>
            <SignedOut>
              <SignInButton>
                <button className="glass-border hover:bg-white/5 transition-colors flex items-center gap-2 px-2 py-1 rounded text-xs text-white">Sign in</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
}
