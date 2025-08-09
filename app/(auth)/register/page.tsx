"use client";

import { SignUp } from '@clerk/nextjs';

export default function RegisterPage() {
  return (
    <section className="min-h-screen bg-[url('https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&q=80')] bg-cover pt-6 px-6 pb-24 flex items-center justify-center">
      <div className="glass-card rounded-xl p-6">
        <SignUp routing="hash" signInUrl="/login" />
      </div>
    </section>
  );
}


