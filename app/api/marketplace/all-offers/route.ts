import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const search = url.searchParams.get('search') || '';
  const data = [
    { id:1, title:'Electronics Shipment', price:1850, urgency:'medium' },
    { id:2, title:'Food & Beverages', price:3200, urgency:'high' },
  ].filter((c)=> c.title.toLowerCase().includes(search.toLowerCase()));
  return NextResponse.json({ cargo: data, pagination: { total: data.length, pages: 1 }, filters: { appliedFilters: { search } } });
}


