import { Suspense } from 'react';
import MarketplaceClient from './MarketplaceClient';

export const dynamic = 'force-dynamic';

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-gray-400">Loading…</div>}>
      <MarketplaceClient />
    </Suspense>
  );
}


