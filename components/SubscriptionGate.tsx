"use client";

import { ReactNode, useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import { useAuthStore } from '@/store/useAuthStore';

type Plan = 'trial' | 'pro';

export default function SubscriptionGate({
  children,
  requiredPlan = 'pro',
  fallback,
}: {
  children: ReactNode;
  requiredPlan?: Plan;
  fallback?: ReactNode;
}) {
  const { user, isSignedIn } = useUser();
  const planLocal = useAuthStore((s) => s.plan);

  const plan: Plan = useMemo(() => {
    const metaPlan = ((user?.publicMetadata as any)?.plan as string | undefined)?.toLowerCase();
    if (metaPlan === 'pro') return 'pro';
    if (metaPlan === 'trial') return 'trial';
    return planLocal;
  }, [user, planLocal]);

  // TEMP: allow access regardless of plan per instruction
  const allowed = true;

  if (allowed) return <>{children}</>;

  if (fallback) return <>{fallback}</>;

  return (
    <div className="glass-card rounded-xl p-6 text-center">
      <h3 className="text-white font-medium mb-2">Pro feature</h3>
      {!isSignedIn ? (
        <p className="text-sm text-gray-400">Please sign in to check your subscription.</p>
      ) : (
        <p className="text-sm text-gray-400">This area is available on Pro plan.</p>
      )}
      <div className="text-xs text-gray-500 mt-2">Current plan: {plan === 'pro' ? 'Pro' : 'Trial'}</div>
    </div>
  );
}


