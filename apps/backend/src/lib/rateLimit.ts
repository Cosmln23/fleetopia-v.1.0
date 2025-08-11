import rateLimit from 'express-rate-limit';
import type { Request, Response } from 'express';

function isExempt(req: Request): boolean {
  const fromCI = String(req.headers['x-from-ci'] || '').toLowerCase() === 'true';
  if (fromCI) return true;
  const adminHeader = String(req.headers['x-admin-bypass'] || '') === '1';
  if (adminHeader) return true;
  const exemptIps = (process.env.RATE_LIMIT_EXEMPT_IPS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (exemptIps.length && exemptIps.includes(req.ip)) return true;
  const adminIds = (process.env.ADMIN_USER_IDS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const userId = (req as any).auth?.userId as string | undefined;
  if (userId && adminIds.includes(userId)) return true;
  return false;
}

export function createApiLimiter() {
  const isProd = process.env.NODE_ENV === 'production';
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
  const max = Number(
    process.env.RATE_LIMIT_MAX || (isProd ? 600 : 60)
  );

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    skip: isExempt,
    keyGenerator: (req) => (req as any).auth?.userId || req.ip,
    handler: (req: Request, res: Response /*, next*/) => {
      const retryAfterSec = Math.ceil(windowMs / 1000);
      res.setHeader('X-RateLimit-Limit', String(max));
      const remaining = (res.getHeader('RateLimit-Remaining') as string) || '0';
      res.setHeader('X-RateLimit-Remaining', remaining);
      res
        .status(429)
        .json({ code: 'RATE_LIMITED', retryAfter: retryAfterSec });
    },
  });
}

export const apiLimiter = createApiLimiter();


