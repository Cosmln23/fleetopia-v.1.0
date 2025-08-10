import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const token = await session.getToken?.();
    const incomingAuth = req.headers.get('authorization') || '';
    const headers: Record<string, string> = {};
    if (incomingAuth) {
      headers.Authorization = incomingAuth;
    } else if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}/api/marketplace/my-quotes`, {
      headers,
      cache: 'no-store',
    });

    let data: any = null;
    const text = await res.text();
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text || '' };
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


