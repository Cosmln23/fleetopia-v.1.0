import type { Request, Response, NextFunction } from 'express';

// Minimal Clerk-compatible middleware placeholders.
// Replace with @clerk/express when keys and setup are finalized.

export function clerkMiddleware(_req: Request, _res: Response, next: NextFunction) {
  // Here we could parse Clerk session if needed; keeping as noop for now.
  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // Placeholder auth check; to be replaced with real Clerk verification.
  // For now, allow if an Authorization header exists; otherwise 401.
  const hasAuth = Boolean(req.headers.authorization);
  if (!hasAuth) return res.status(401).json({ error: 'Unauthorized' });
  next();
}


