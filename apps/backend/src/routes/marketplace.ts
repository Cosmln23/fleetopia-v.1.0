import { Router, type Request, type Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/marketplace/all-offers', async (req: Request, res: Response) => {
  // Query params
  const search = String(req.query.search || '').trim();
  const typeRaw = String(req.query.type || '').trim().toUpperCase();
  const urgencyRaw = String(req.query.urgency || '').trim().toUpperCase();
  const allowedTypes = ['GENERAL', 'FRAGILE', 'LIQUID', 'REFRIGERATED', 'HAZARDOUS', 'BULK', 'CONTAINER', 'PALLETS'];
  const allowedUrgency = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
  const type = allowedTypes.includes(typeRaw) ? typeRaw : undefined;
  const urgency = allowedUrgency.includes(urgencyRaw) ? urgencyRaw : undefined;
  const toNum = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };
  const minPrice = req.query.minPrice != null ? toNum(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice != null ? toNum(req.query.maxPrice) : undefined;
  const sortBy = String(req.query.sortBy || '').trim().toLowerCase();
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));

  const where: any = {
    status: 'ACTIVE',
    ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}),
  };
  if (type) where.type = type;
  if (urgency) where.urgency = urgency;
  if (minPrice != null || maxPrice != null) {
    where.totalPrice = {
      ...(minPrice != null ? { gte: minPrice } : {}),
      ...(maxPrice != null ? { lte: maxPrice } : {}),
    };
  }

  let orderBy: any = { createdAt: 'desc' };
  switch (sortBy) {
    case 'price_asc':
      orderBy = { totalPrice: 'asc' };
      break;
    case 'price_desc':
      orderBy = { totalPrice: 'desc' };
      break;
    case 'created_asc':
      orderBy = { createdAt: 'asc' };
      break;
    case 'created_desc':
    default:
      orderBy = { createdAt: 'desc' };
  }

  const skip = (page - 1) * limit;

  const [total, cargos] = await Promise.all([
    prisma.cargo.count({ where }),
    prisma.cargo.findMany({
      where,
      orderBy,
      select: { id: true, title: true, urgency: true, totalPrice: true },
      skip,
      take: limit,
    }),
  ]);

  const mapped = cargos.map((c: any) => ({
    id: c.id,
    title: c.title,
    urgency: String(c.urgency).toLowerCase(),
    price: c.totalPrice != null ? Number(c.totalPrice) : null,
  }));

  const pages = Math.max(1, Math.ceil(total / limit));
  res.json({ cargo: mapped, pagination: { total, pages, page, limit } });
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
    select: { id: true, title: true, status: true, createdAt: true, _count: { select: { quotes: true } } },
  });
  const quotesReceived = myCargo.reduce((acc: Record<string, number>, c: any) => {
    acc[c.id] = (c._count?.quotes as number) ?? 0;
    return acc;
  }, {} as Record<string, number>);
  const projected = myCargo.map((c: any) => ({ id: c.id, title: c.title, status: c.status, createdAt: c.createdAt }));
  res.json({ myCargo: projected, quotesReceived });
});

router.get('/marketplace/my-quotes', async (req: Request, res: Response) => {
  const clerkId = (req as any).auth?.userId as string | undefined;
  if (!clerkId) return res.json({ myQuotes: [] });

  const user = await prisma.user.upsert({
    where: { clerkId },
    update: {},
    create: { clerkId, email: `${clerkId}@local.dev` },
  });

  const quotes = await prisma.quote.findMany({
    where: { transporterId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: {
      id: true,
      cargoId: true,
      price: true,
      status: true,
      createdAt: true,
      cargo: { select: { id: true, title: true, status: true } },
    },
  });

  const myQuotes = quotes.map((q: any) => ({
    quoteId: q.id,
    cargoId: q.cargoId,
    cargo: q.cargo,
    price: Number(q.price),
    status: q.status,
    createdAt: q.createdAt,
  }));

  res.json({ myQuotes });
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


