import { Router, type Request, type Response } from 'express';
import { requireAuth } from '@clerk/express';
import { z } from 'zod';
import prisma from '../lib/prisma';

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

router.post('/cargo/create', requireAuth(), async (req: Request, res: Response) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });

  const auth = (req as any).auth;
  const clerkId = auth?.userId as string;
  if (!clerkId) return res.status(401).json({ error: 'Unauthorized' });

  const user = await prisma.user.upsert({
    where: { clerkId },
    update: {},
    create: { clerkId, email: `${clerkId}@local.dev` },
  });

  const { title, type, weight, volume, vehicleType, urgency, fromAddress, toAddress, totalPrice } = parsed.data;
  let pricePerKg: number | null = null;
  if (typeof totalPrice === 'number' && typeof weight === 'number' && weight > 0) {
    pricePerKg = totalPrice / weight;
  }

  const created = await prisma.cargo.create({
    data: {
      userId: user.id,
      title,
      type: (type as any) || undefined,
      weight,
      volume: volume ?? undefined,
      vehicleType: (vehicleType as any) || undefined,
      urgency: (urgency as any) || undefined,
      fromAddress,
      toAddress,
      totalPrice: totalPrice ?? undefined,
      pricePerKg: pricePerKg ?? undefined,
      status: 'ACTIVE',
    },
    select: { id: true, pricePerKg: true },
  });

  return res.json({ success: true, cargoId: created.id, pricePerKg: created.pricePerKg ? Number(created.pricePerKg) : null });
});

// 5.4 — Quick Post (input minim, create draft cargo fast)
const quickPostSchema = z.object({
  title: z.string().min(1),
  fromAddress: z.string().min(1),
  toAddress: z.string().min(1),
});

router.post('/cargo/quick-post', requireAuth(), async (req: Request, res: Response) => {
  const parsed = quickPostSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });
  const auth = (req as any).auth;
  const clerkId = auth?.userId as string;
  if (!clerkId) return res.status(401).json({ error: 'Unauthorized' });
  const user = await prisma.user.upsert({
    where: { clerkId },
    update: {},
    create: { clerkId, email: `${clerkId}@local.dev` },
  });
  const created = await prisma.cargo.create({
    data: {
      userId: user.id,
      title: parsed.data.title,
      fromAddress: parsed.data.fromAddress,
      toAddress: parsed.data.toAddress,
      // Minimal required defaults for schema compatibility
      weight: 1,
      status: 'ACTIVE',
    },
    select: { id: true },
  });
  return res.json({ success: true, draftId: created.id });
});

router.put('/cargo/:id/update', requireAuth(), (_req: Request, res: Response) => {
  res.json({ success: true });
});

router.delete('/cargo/:id', requireAuth(), (_req: Request, res: Response) => {
  res.json({ success: true });
});

router.post('/cargo/:id/save-draft', requireAuth(), (_req: Request, res: Response) => {
  res.json({ draftId: 'draft-' + Math.random().toString(36).slice(2) });
});

router.post('/cargo/:id/ignore', requireAuth(), (_req: Request, res: Response) => {
  res.json({ success: true });
});

export default router;


