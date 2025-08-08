import { Router } from 'express';

const router = Router();

router.get('/deals/active', (_req, res) => {
  res.json({ deals: [], count: 0 });
});

export default router;


