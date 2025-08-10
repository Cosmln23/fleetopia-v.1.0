import { Router, type Request, type Response } from 'express';
import { requireAuth } from '@clerk/express';

const router = Router();

router.post('/cargo/:id/quote', requireAuth(), (_req: Request, res: Response) => {
  res.json({ quoteId: 'q-' + Math.random().toString(36).slice(2), chatThreadId: 't-' + Math.random().toString(36).slice(2) });
});

router.get('/cargo/:id/quotes', requireAuth(), (_req: Request, res: Response) => {
  res.json({ quotes: [] });
});

router.put('/quotes/:id/accept', requireAuth(), (_req: Request, res: Response) => {
  res.json({ dealId: 'd-' + Math.random().toString(36).slice(2), chatThreadId: 't-' + Math.random().toString(36).slice(2) });
});

export default router;


