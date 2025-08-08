## GOD_MODE_max — Master Review & Prioritized Roadmap

Summary Scorecard (now)
- Frontend architecture & Home: 80% (↑ from 78%) — UI polish consistent, scroll-in effects everywhere
- Marketplace end-to-end: 48% (↑ from 45%) — modal UX improved; structural extraction pending
- Dispatcher (AI) & Fleet: 58% (↑ from 55%) — agent integration solid; persistence/WS missing
- Settings, Billing & Notifications: 42% (↑ from 40%) — upgrade modal 1:1; billing flows missing
- Backend infra, Security, CI/CD: 32% (↑ from 30%) — infra stubs OK; auth/DB/CI missing

Confidence: medium-high. Agent-core is complete for current scope and must remain unchanged.

Critical Path (MVP to usable) — order matters
1) Auth & Roles
   - Integrate Clerk (frontend + backend middleware)
   - Persist `User.plan` (trial/pro) and expose to frontend
   - Enforce access (send quotes Pro only; cost details hidden for Trial)
2) Database foundation
   - Extend Prisma schema: Quote, Deal, Chat*, Vehicle*, CostSettings, UserSettings, NotificationSettings
   - First migration + seed minimal fixtures
3) Marketplace E2E
   - POST cargo (persist), GET my-cargo, GET all-offers with filters+pagination
   - Quote flow: POST quote, GET cargo quotes (owner), PUT accept → create Deal
4) Realtime baseline
   - Socket.io rooms: `all_offers_room`, `user_{id}`, `cargo_{id}`
   - Broadcast new cargo, quote received/accepted
5) Settings/Billing (Stripe minimal)
   - Upgrade flow to Pro (checkout session + webhook)
   - Update `User.plan` on webhook → live UI gating

Top Risks & Mitigations
- Auth integration complexity: start with read-only guards; add progressive enhancement
- Stripe webhook reliability: implement retry/backoff + idempotency keys
- Google Maps costs: postpone to after MVP (use static demo values, add feature flag)

Updated TODO Deltas (applied back to per-area files)
- Marketplace: add acceptance criteria and component extraction plan
- Dispatcher/Fleet: emphasize “do not change agent-core”, add persistence-only tasks and WS events
- Settings/Billing: add subscription gating propagation in UI state
- Frontend/Home: add Clerk integration and Quick Actions wiring to real endpoints post-auth

Definition of Ready (DoR)
- Auth keys configured; database URL present; Stripe keys (test) available
- Feature flag for cost analysis (off by default)

Definition of Done (DoD)
- Type-safe APIs; role-guarded endpoints; pagination on list endpoints
- Socket events emitted + received by client; no console errors; Lighthouse perf ≥ 85 on key pages


