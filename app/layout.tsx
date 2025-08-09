import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Providers from '@/app/providers';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fleetopia',
  description: 'Fleetopia Frontend (Trial/Pro UI) — App Router',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} pb-20`}> {/* bottom padding for fixed bottom nav */}
        <ClerkProvider>
          <Providers>
            <Header />
            <main className="pt-16">{children}</main>
            <BottomNav />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
