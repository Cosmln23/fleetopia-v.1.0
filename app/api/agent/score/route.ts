import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory cache (scoped to server process)
type CacheEntry = { ts: number; data: any };
const cache = new Map<string, CacheEntry>();
const TTL_MS = 60_000; // 60s

// Very small circuit breaker
let consecutiveFailures = 0;
let lastFailureAt = 0;
const OPEN_AFTER = 3; // failures
const COOLDOWN_MS = 30_000;

function isCircuitOpen() {
  if (consecutiveFailures < OPEN_AFTER) return false;
  const since = Date.now() - lastFailureAt;
  return since < COOLDOWN_MS;
}

export async function POST(req: NextRequest) {
  if (isCircuitOpen()) {
    return NextResponse.json({ error: 'agent-core unavailable (circuit open)' }, { status: 503 });
  }

  const body = await req.json();
  const key = JSON.stringify(body);
  const now = Date.now();

  const cached = cache.get(key);
  if (cached && now - cached.ts < TTL_MS) {
    return NextResponse.json(cached.data);
  }

  const baseUrl = process.env.AGENT_CORE_URL || 'http://localhost:8080';
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);
    const res = await fetch(`${baseUrl}/score`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) {
      consecutiveFailures += 1;
      lastFailureAt = Date.now();
      const text = await res.text();
      return NextResponse.json({ error: text || 'agent-core error' }, { status: 502 });
    }
    const data = await res.json();
    cache.set(key, { ts: now, data });
    consecutiveFailures = 0;
    return NextResponse.json(data);
  } catch (err: any) {
    consecutiveFailures += 1;
    lastFailureAt = Date.now();
    return NextResponse.json({ error: String(err?.message || err) }, { status: 502 });
  }
}


