import { NextResponse } from 'next/server';

export async function GET() {
  // Stub static data per spec; replace with real auth-aware data later
  return NextResponse.json({
    description: 'Fleetopia – Marketplace AI pentru transport marfă: Postezi rapid, găsești loads cu sugestii AI, optimizezi rute pentru profit maxim!',
    prompt: 'How can we help you today?',
    options: [
      { label: 'Am marfă de transportat', action: '/marketplace?add=1&tab=MY_CARGO' },
      { label: 'Caut marfă de transportat', action: '/marketplace?tab=ALL' },
    ],
    quickActions: [
      { name: 'Post Cargo Fast', action: '/marketplace?add=1&tab=MY_CARGO' },
      { name: 'Find Loads', action: '/marketplace?tab=ALL' },
      { name: 'Track My Shipments', action: '/marketplace?tab=ACTIVE_DEALS', count: 0 },
    ],
  });
}


