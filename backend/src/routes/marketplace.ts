import { Router, type Request, type Response } from 'express';
import { requireAuth } from '@clerk/express';

const router = Router();

router.get('/marketplace/all-offers', (req: Request, res: Response) => {
  const search = String(req.query.search || '').toLowerCase();
  const data = [
    { id: 1, title: 'Electronics Shipment', price: 1850, urgency: 'medium' },
    { id: 2, title: 'Food & Beverages', price: 3200, urgency: 'high' },
  ].filter((c) => c.title.toLowerCase().includes(search));
  res.json({ cargo: data, pagination: { total: data.length, pages: 1 } });
});

router.get('/marketplace/my-cargo', requireAuth, (_req: Request, res: Response) => {
  res.json({ myCargo: [], quotesReceived: {} });
});

router.get('/marketplace/my-quotes', requireAuth, (_req: Request, res: Response) => {
  res.json({ myQuotes: [] });
});

router.get('/marketplace/active-deals', requireAuth, (_req: Request, res: Response) => {
  res.json({ activeDeals: [] });
});

export default router;


