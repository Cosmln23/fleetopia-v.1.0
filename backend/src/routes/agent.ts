import { Router } from 'express';

const router = Router();

router.get('/agent/status', (_req, res) => {
  res.json({ isActive: false, levels: { L0: false, L1: false, L2: false }, lastActivity: null });
});

router.put('/agent/toggle', (_req, res) => {
  res.json({ success: true, currentStatus: { L0: true, L1: false, L2: false }, warnings: [] });
});

router.post('/cost-settings', (_req, res) => {
  res.json({ success: true, totalBaseCost: 0 });
});

router.get('/agent/suggestions', (_req, res) => {
  res.json({ suggestions: [], pagination: { total: 0, pages: 0 } });
});

router.post('/agent/feedback', (_req, res) => {
  res.json({ success: true });
});

export default router;


