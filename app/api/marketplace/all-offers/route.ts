import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = new URLSearchParams();
    for (const key of ['search', 'type', 'urgency', 'minPrice', 'maxPrice', 'sortBy', 'page', 'limit']) {
      const value = url.searchParams.get(key);
      if (value !== null && value !== undefined && value !== '') {
        params.set(key, value);
      }
    }
    const res = await fetch(`${BASE_URL}/api/marketplace/all-offers?${params.toString()}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ cargo: [], pagination: { total: 0, pages: 0, page: 1, limit: 0 } }, { status: 200 });
  }
}


