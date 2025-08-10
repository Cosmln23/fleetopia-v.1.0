import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body?.title || !body?.weight || !body?.fromAddress || !body?.toAddress) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const session = await auth();
  const token = await session.getToken?.();
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  const incomingAuth = req.headers.get('authorization') || '';
  if (incomingAuth) headers.Authorization = incomingAuth;
  else if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/api/cargo/create`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}


