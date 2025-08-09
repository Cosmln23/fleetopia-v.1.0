import { Router, type Request, type Response } from 'express';
import { requireAuth } from '@clerk/express';
import { z } from 'zod';

const router = Router();

const createSchema = z.object({
  title: z.string().min(1),
  type: z.string().optional(),
  weight: z.number().positive(),
  volume: z.number().optional(),
  vehicleType: z.string().optional(),
  urgency: z.string().optional(),
  fromAddress: z.string().min(1),
  toAddress: z.string().min(1),
  totalPrice: z.number().nonnegative().optional(),
});

router.post('/cargo/create', requireAuth, (req: Request, res: Response) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });
  return res.json({ success: true, cargoId: 'demo-' + Math.random().toString(36).slice(2), pricePerKg: 0 });
});

// 5.4 — Quick Post (input minim, create draft cargo fast)
const quickPostSchema = z.object({
  title: z.string().min(1),
  fromAddress: z.string().min(1),
  toAddress: z.string().min(1),
});

router.post('/cargo/quick-post', requireAuth, (req: Request, res: Response) => {
  const parsed = quickPostSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const draftId = 'draft-' + Math.random().toString(36).slice(2);
  return res.json({ success: true, draftId });
});

router.put('/cargo/:id/update', requireAuth, (_req: Request, res: Response) => {
  res.json({ success: true });
});

router.delete('/cargo/:id', requireAuth, (_req: Request, res: Response) => {
  res.json({ success: true });
});

router.post('/cargo/:id/save-draft', requireAuth, (_req: Request, res: Response) => {
  res.json({ draftId: 'draft-' + Math.random().toString(36).slice(2) });
});

router.post('/cargo/:id/ignore', requireAuth, (_req: Request, res: Response) => {
  res.json({ success: true });
});

export default router;


