import { Router, type Request, type Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Contract identic; count devine real dacă user este autentificat, altfel 0
router.get('/home-data', async (req: Request, res: Response) => {
  const clerkId = (req as any).auth?.userId as string | undefined;
  let activeDealsCount = 0;
  if (clerkId) {
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {},
      create: { clerkId, email: `${clerkId}@local.dev` },
    });
    activeDealsCount = await prisma.deal.count({
      where: { OR: [{ shipperId: user.id }, { transporterId: user.id }] },
    });
  }

  res.json({
    description: 'Fleetopia – Marketplace AI pentru transport marfă',
    prompt: 'How can we help you today?',
    options: [
      { label: 'Am marfă de transportat', action: '/marketplace?add=1&tab=MY_CARGO' },
      { label: 'Caut marfă de transportat', action: '/marketplace?tab=ALL' },
    ],
    quickActions: [
      { name: 'Post Cargo Fast', action: '/marketplace?add=1&tab=MY_CARGO' },
      { name: 'Find Loads', action: '/marketplace?tab=ALL' },
      { name: 'Track My Shipments', action: '/marketplace?tab=ACTIVE_DEALS', count: activeDealsCount },
    ],
  });
});

export default router;


