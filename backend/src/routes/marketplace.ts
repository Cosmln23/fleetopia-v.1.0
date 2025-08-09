import { Router } from 'express';
import { requireAuth } from '../util/clerk.js';

const router = Router();

router.get('/marketplace/all-offers', (req, res) => {
  const search = String(req.query.search || '').toLowerCase();
  const data = [
    { id: 1, title: 'Electronics Shipment', price: 1850, urgency: 'medium' },
    { id: 2, title: 'Food & Beverages', price: 3200, urgency: 'high' },
  ].filter((c) => c.title.toLowerCase().includes(search));
  res.json({ cargo: data, pagination: { total: data.length, pages: 1 } });
});

router.get('/marketplace/my-cargo', requireAuth, (_req, res) => {
  res.json({ myCargo: [], quotesReceived: {} });
});

router.get('/marketplace/my-quotes', requireAuth, (_req, res) => {
  res.json({ myQuotes: [] });
});

router.get('/marketplace/active-deals', requireAuth, (_req, res) => {
  res.json({ activeDeals: [] });
});

export default router;


