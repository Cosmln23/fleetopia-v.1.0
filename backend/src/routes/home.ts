import { Router } from 'express';

const router = Router();

router.get('/home-data', (req, res) => {
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
      { name: 'Track My Shipments', action: '/marketplace?tab=ACTIVE_DEALS', count: 0 },
    ],
  });
});

export default router;


