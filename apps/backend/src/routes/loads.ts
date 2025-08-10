import { Router, type Request, type Response } from 'express';
import prisma from '../lib/prisma';
import type { Prisma } from '@prisma/client';

const router = Router();

// Public quick search for loads (ACTIVE cargos). No hardcoded mock.
router.get('/loads/quick-search', async (req: Request, res: Response) => {
  const search = String(req.query.search || req.query.q || '').trim();
  const page = Math.max(parseInt(String(req.query.page || '1'), 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(String(req.query.limit || '20'), 10) || 20, 1), 100);
  const skip = (page - 1) * limit;

  const where = {
    status: 'ACTIVE' as const,
    ...(search ? { title: { contains: search, mode: 'insensitive' as const } } : {}),
  };

  const [total, cargos] = await Promise.all([
    prisma.cargo.count({ where }),
    prisma.cargo.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, urgency: true, totalPrice: true },
      skip,
      take: limit,
    }),
  ]);

  const items = cargos.map((c) => ({
    id: c.id,
    title: c.title,
    urgency: String(c.urgency).toLowerCase(),
    price: c.totalPrice ? Number(c.totalPrice) : null,
  }));

  const pages = Math.max(Math.ceil(total / limit), 1);
  res.json({
    cargo: items,
    pagination: { total, pages, page, limit },
    filters: { appliedFilters: { search } },
  });
});

export default router;


