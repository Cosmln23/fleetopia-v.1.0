import { Router } from 'express';
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

router.post('/cargo/create', (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });
  return res.json({ success: true, cargoId: 'demo-' + Math.random().toString(36).slice(2), pricePerKg: 0 });
});

router.put('/cargo/:id/update', (_req, res) => {
  res.json({ success: true });
});

router.delete('/cargo/:id', (_req, res) => {
  res.json({ success: true });
});

router.post('/cargo/:id/save-draft', (_req, res) => {
  res.json({ draftId: 'draft-' + Math.random().toString(36).slice(2) });
});

router.post('/cargo/:id/ignore', (_req, res) => {
  res.json({ success: true });
});

export default router;


