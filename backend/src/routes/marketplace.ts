import { Router, type Request, type Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/marketplace/all-offers', async (req: Request, res: Response) => {
  const search = String(req.query.search || '').trim();
  const cargos = await prisma.cargo.findMany({
    where: {
      status: 'ACTIVE',
      ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}),
    },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, urgency: true, totalPrice: true },
    take: 50,
  });
  const mapped = cargos.map((c: any) => ({
    id: c.id,
    title: c.title,
    urgency: String(c.urgency).toLowerCase(),
    price: c.totalPrice ? Number(c.totalPrice) : null,
  }));
  res.json({ cargo: mapped, pagination: { total: mapped.length, pages: 1 } });
});

router.get('/marketplace/my-cargo', async (req: Request, res: Response) => {
  const clerkId = (req as any).auth?.userId as string | undefined;
  if (!clerkId) return res.json({ myCargo: [], quotesReceived: {} });
  const user = await prisma.user.upsert({
    where: { clerkId },
    update: {},
    create: { clerkId, email: `${clerkId}@local.dev` },
  });
  const myCargo = await prisma.cargo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, status: true, createdAt: true },
  });
  res.json({ myCargo, quotesReceived: {} });
});

router.get('/marketplace/my-quotes', (_req: Request, res: Response) => {
  // Not in current scope; return empty contract without auth to avoid server errors
  res.json({ myQuotes: [] });
});

router.get('/marketplace/active-deals', async (req: Request, res: Response) => {
  const clerkId = (req as any).auth?.userId as string | undefined;
  if (!clerkId) return res.json({ activeDeals: [] });
  const user = await prisma.user.upsert({
    where: { clerkId },
    update: {},
    create: { clerkId, email: `${clerkId}@local.dev` },
  });
  const deals = await prisma.deal.findMany({
    where: { OR: [{ shipperId: user.id }, { transporterId: user.id }] },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: { id: true, status: true, progress: true, createdAt: true },
  });
  res.json({ activeDeals: deals });
});

export default router;


