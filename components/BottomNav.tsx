"use client";

import Link from 'next/link';
import { Home, ShoppingBag, Truck, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useT } from '@/utils/i18n';

function NavItem({ href, label, icon: Icon }: { href: string; label: string; icon: any }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 transition-colors ${
        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-xs">{label}</span>
    </Link>
  );
}

export default function BottomNav() {
  const t = useT();
  return (
    <nav className="fixed bottom-0 w-full z-50 glass-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
        <div className="flex gap-12 text-sm items-center">
          <NavItem href="/" label={t('Home')} icon={Home} />
          <NavItem href="/marketplace" label={t('Marketplace')} icon={ShoppingBag} />
          <NavItem href="/dispatcher" label={t('Dispatcher')} icon={Truck} />
          <NavItem href="/settings" label={t('Settings')} icon={Settings} />
        </div>
      </div>
    </nav>
  );
}
