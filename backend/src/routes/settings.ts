import { Router } from 'express';
import { requireAuth } from '../util/clerk.js';

const router = Router();

router.get('/settings/general', requireAuth, (_req, res) => {
  res.json({ userId: 'demo', preferences: { language: 'en', timezone: 'UTC', currency: 'EUR' }, theme: 'dark', privacy: { profileVisible: true } });
});

router.put('/settings/general', requireAuth, (_req, res) => {
  res.json({ success: true, updated: {} });
});

router.get('/settings/account', requireAuth, (_req, res) => {
  res.json({ user: { id: 'demo', email: 'demo@example.com', name: 'Demo' }, subscription: { plan: 'trial', status: 'active' }, billing: {} });
});

router.put('/settings/account/profile', requireAuth, (_req, res) => {
  res.json({ success: true, user: { id: 'demo' } });
});

router.post('/settings/subscription/upgrade', requireAuth, (_req, res) => {
  res.json({ success: true, checkoutUrl: 'https://example.com/checkout', subscriptionId: 'sub_demo' });
});

router.post('/settings/subscription/cancel', requireAuth, (_req, res) => {
  res.json({ success: true, cancelsAt: Date.now(), accessUntil: Date.now() + 7 * 86400000 });
});

router.get('/settings/subscription/invoices', requireAuth, (_req, res) => {
  res.json({ invoices: [], pagination: { total: 0, pages: 0 } });
});

router.get('/settings/notifications', requireAuth, (_req, res) => {
  res.json({ preferences: { email: {}, push: {}, inApp: {} }, devices: [] });
});

router.put('/settings/notifications', requireAuth, (_req, res) => {
  res.json({ success: true, updated: {} });
});

router.post('/settings/notifications/test', requireAuth, (_req, res) => {
  res.json({ success: true, sent: true, deliveredAt: Date.now() });
});

router.get('/settings/privacy', requireAuth, (_req, res) => {
  res.json({ dataRetention: { period: '30d', lastCleanup: null }, exports: [], permissions: {} });
});

router.post('/settings/data/export', requireAuth, (_req, res) => {
  res.json({ success: true, exportId: 'exp-' + Math.random().toString(36).slice(2), estimatedTime: '5m', notificationMethod: 'inApp' });
});

router.delete('/settings/data/delete', requireAuth, (_req, res) => {
  res.json({ success: true, deletionScheduledAt: Date.now(), completionEstimate: '24h' });
});

export default router;


