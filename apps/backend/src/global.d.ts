import 'express';

declare global {
  namespace Express {
    interface Request {
      context?: { requestId?: string };
    }
  }
}


