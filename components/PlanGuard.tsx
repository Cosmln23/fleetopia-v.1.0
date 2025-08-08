"use client";

import { ReactNode } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function PlanGuard({ children, feature }: { children: ReactNode; feature: 'dispatcher' | 'agent' | 'costDetails' }) {
  const plan = useAuthStore((s) => s.plan);
  const isPro = plan === 'pro';

  if (isPro) return <>{children}</>;
  return (
    <div className="glass-card rounded-xl p-6 text-center">
      <h3 className="text-white font-medium mb-2">Pro feature</h3>
      <p className="text-sm text-gray-400 mb-4">This area is available on Pro plan.</p>
      <div className="text-xs text-gray-500">Current plan: Trial</div>
    </div>
  );
}
