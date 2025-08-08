## Fleetopia — Implementation Coverage (Baseline)

Scope: Evaluare procentuală a implementării curente față de planul macro, pe arii majore. Agentul de sugestii (agent-core + integrare L1/L2) este considerat „livrat” și nu este modificat.

- Frontend architecture (Next.js 14, App Router, UI shell): 85%
  - Header fix + BottomNav fix + glassmorphism: implementate
  - I18n (Zustand) și efecte `AnimateOnScroll`: implementate
  - Lipsă: Auth (Clerk), feature gating real pe planuri

- Home (/): 80%
  - Hero cu call-to-action, Quick Actions, How It Works, Testimonials: implementate
  - API GET /api/home-data: implementat (stub), consumat parțial
  - Lipsă: quick-post real; count-uri dinamice (deals) condiționate de auth

- Marketplace UI (/marketplace): 70%
  - Tabs (ALL OFFERS/MY CARGO/MY QUOTES/ACTIVE DEALS), Search, Filters, Grid, Add Cargo modal, Cargo Detail modal: implementate (demo)
  - Pagini secundare `create`, `[id]`: implementate
  - Lipsă: separarea în componente modulare; validare completă; calcule price/kg; integrare state pers.

- Marketplace backend: 30%
  - Endpoints de listare (all-offers, my-cargo, my-quotes, active-deals): stubs funcționale
  - POST /cargo/create (zod validate): demo
  - Lipsă: Prisma/Supabase, pagination reală, filtre avansate, ownership + securitate

- Dispatcher UI + Agent: 75%
  - L0/L1/L2 UI, Cost Settings modal, feed; integrare `/api/agent/score` și `/api/agent/suggest`: implementate
  - Lipsă: realtime feed (WS), cost calc reale din settings, istoric + feedback persistență

- Fleet management: 30%
  - UI grid + Add Fleet modal: implementate (demo)
  - Lipsă: CRUD real, GPS realtime, map integrată, status pipeline

- Settings (/settings): 50%
  - Pagina completă + Upgrade modal 1:1; general toggles; notifs UI: implementate
  - Lipsă: Stripe/billing flows, account management real, GDPR export/delete

- Backend infra: 35%
  - Express, rate limit, logger, WS; rute stub pentru toate ariile: implementate
  - Lipsă: Auth (Clerk), DB (Prisma+Supabase) extins, error/perm middleware avansat

- Data models: 15%
  - Prisma minimal (User, Cargo): existent
  - Lipsă: Quote, Deal, Chat*, Vehicle*, CostSettings*, NotificationSettings*, UserSettings*

- Realtime: 20%
  - Socket.io server: minim
  - Lipsă: rooms, event-uri, client bindings

- Testing/CI/CD: 0%
- Deploy/Prod: 0%

Estimare globală (ponderare aproximativă UI 40% / backend 60%): 30% ±3pp

Note-cheie (evidence):
- Agent core: `agent-core/src/index.ts`, `priceEngine.ts` — endpoints /score, /suggest; App routes proxy: `app/api/agent/*`
- Marketplace: `app/marketplace/page.tsx` (grid, filters, modale), `backend/src/routes/marketplace.ts`
- Dispatcher: `app/dispatcher/page.tsx` (L0/L1/L2), `app/api/agent/*`
- Settings: `app/settings/page.tsx` (upgrade modal mare)


