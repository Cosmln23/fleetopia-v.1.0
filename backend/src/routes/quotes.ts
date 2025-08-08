import { Router } from 'express';

const router = Router();

router.post('/cargo/:id/quote', (_req, res) => {
  res.json({ quoteId: 'q-' + Math.random().toString(36).slice(2), chatThreadId: 't-' + Math.random().toString(36).slice(2) });
});

router.get('/cargo/:id/quotes', (_req, res) => {
  res.json({ quotes: [] });
});

router.put('/quotes/:id/accept', (_req, res) => {
  res.json({ dealId: 'd-' + Math.random().toString(36).slice(2), chatThreadId: 't-' + Math.random().toString(36).slice(2) });
});

export default router;


