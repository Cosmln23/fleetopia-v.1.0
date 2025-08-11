import { randomUUID } from 'crypto';
import type { Request, Response, NextFunction } from 'express';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const existing = req.headers['x-request-id'];
  const id = typeof existing === 'string' && existing.trim() !== '' ? existing : randomUUID();
  // attach to request context
  req.context = { ...(req.context || {}), requestId: id };
  // expose in response header
  res.setHeader('x-request-id', id);
  next();
}


