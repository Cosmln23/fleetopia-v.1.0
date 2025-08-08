import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body?.title || !body?.weight || !body?.fromAddress || !body?.toAddress) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  // Stub: return success with a fake id
  return NextResponse.json({ success: true, cargoId: 'demo-' + Math.random().toString(36).slice(2) });
}


