## Analiza 4 — Settings, Billing & Notifications

Coverage (estimare): 40%

Implementat
- Settings page UI (General settings, sections), Upgrade modal mare (1:1), Notification Preferences UI (demo)
- API stubs: `/api/settings/*` de bază

Lipsă / Incomplet
- Stripe integration (upgrade/cancel, invoices), Subscription model, webhooks
- Account page și profile edit real; GDPR export/delete pipeline
- WS events: settings_updated, subscription_changed etc.

To‑Do (neimplementat)
- Backend: modele `Subscription`, `Invoice`, `SubscriptionEvent`, `UserSettings`, `NotificationSettings`, `DataExport`
- Endpoints: upgrade/cancel/invoices + general/notifications/privacy get/put; test notification
- Stripe: checkout session + webhook receiver + status sync job
- UI: pages `settings/account`, `settings/notifications` separate, `SubscriptionGate.tsx`

