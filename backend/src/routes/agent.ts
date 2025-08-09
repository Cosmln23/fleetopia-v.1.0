import { Router, type Request, type Response } from 'express';
import { requireAuth } from '@clerk/express';

const router = Router();

router.get('/agent/status', requireAuth, (_req: Request, res: Response) => {
  res.json({ isActive: false, levels: { L0: false, L1: false, L2: false }, lastActivity: null });
});

router.put('/agent/toggle', requireAuth, (_req: Request, res: Response) => {
  res.json({ success: true, currentStatus: { L0: true, L1: false, L2: false }, warnings: [] });
});

router.post('/cost-settings', requireAuth, (_req: Request, res: Response) => {
  res.json({ success: true, totalBaseCost: 0 });
});

router.get('/agent/suggestions', requireAuth, (_req: Request, res: Response) => {
  res.json({ suggestions: [], pagination: { total: 0, pages: 0 } });
});

router.post('/agent/feedback', requireAuth, (_req: Request, res: Response) => {
  res.json({ success: true });
});

export default router;


