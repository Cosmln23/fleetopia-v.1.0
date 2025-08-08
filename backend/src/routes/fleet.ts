import { Router } from 'express';

const router = Router();

router.get('/fleet/vehicles', (_req, res) => {
  res.json({ vehicles: [], pagination: { total: 0, pages: 0 } });
});

router.post('/fleet/add', (_req, res) => {
  res.json({ success: true, vehicleId: 'v-' + Math.random().toString(36).slice(2) });
});

router.put('/fleet/vehicles/:id', (_req, res) => {
  res.json({ success: true });
});

router.delete('/fleet/vehicles/:id', (_req, res) => {
  res.json({ success: true });
});

router.get('/map/gps', (_req, res) => {
  res.json({ positions: [] });
});

export default router;


