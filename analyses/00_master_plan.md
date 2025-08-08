## Fleetopia — Master Plan (Agregat din cele 5 analize)

Progres curent (estimare pe arii)
- Frontend & Home: 80%
- Marketplace end‑to‑end: 48%
- Dispatcher (AI) & Fleet: 58%  (NU atingeți agent-core)
- Settings, Billing & Notifications: 42%
- Backend infra, Security, CI/CD: 32%
- Total estimat (ponderat UI/Backend ≈ 40/60): ~33% ±3pp

Sprint Plan (prioritizat pentru MVP)
Sprint 1 — Auth + DB + Marketplace E2E (critice)
- Auth & Roles: Integrare Clerk (frontend+backend); expune `User.plan` (trial/pro); guards în UI/API
- DB extins (Prisma): Quote, Deal, Chat*, Vehicle*, CostSettings, UserSettings, NotificationSettings
- Marketplace: persist cargo (POST create) + MY CARGO; all‑offers cu min 3 filtre server‑side + pagination; quote flow (POST quote → GET quotes owner → accept → creează Deal)
- WS minim: `all_offers_room` (cargo nou actualizează grid fără refresh)

Sprint 2 — Billing + Realtime + Fleet (deblocări)
- Stripe checkout + webhook: upgrade la Pro → actualizează `User.plan`; WS `subscription_changed` pentru UI gating live
- Settings: GET/PUT general/notifications (persistă preferințe) + test notification endpoint
- Fleet: CRUD vehicule + listare; WS `fleet_status_change`; map mock (fără costuri Google Maps)

Definiții (DoR/DoD)
- DoR: chei Clerk/Stripe setate, DB URL disponibil, feature flag „cost analysis” off
- DoD: endpoints guard‑ate, pagination la liste, WS evenimente emise/consumate, fără erori în consolă, Lighthouse ≥ 85 pe pagini cheie

TODO Consolidat (criterii de acceptare)
Auth & Infra
- Clerk middleware returnează 401 JSON pe rute private; CORS restricționat; compression on; Sentry DSN opțional
- Migrații Prisma rulează; seed minim OK; conexiune DB activă
- CI (GitHub Actions): lint+typecheck+build verzi pe PR

Frontend & Home
- Header afișează avatar/menu la autentificat, „Sign in” altfel
- GET `/api/home-data` personalizează quickActions când autentificat
- Quick Actions declanșează endpoint‑urile; erorile afișează toast

Marketplace
- Componente extrase (SearchBar, CargoFilters, CargoCard, TabNavigation, AddCargoModal, CargoDetailModal) fără regresii build
- POST `/api/cargo/create` persistă și apare în MY CARGO după refresh
- GET `/api/marketplace/all-offers` aplică cel puțin 3 filtre server‑side + pagination
- Quote flow complet (POST/GET/PUT accept) creează Deal
- WS: cargo nou → update grid în ALL OFFERS

Dispatcher & Fleet (fără modificări în agent-core)
- PUT `/api/cost-settings` persistă și GET returnează aceleași valori
- L2 sugestii salvate în `AIHistory` și reafișate după reload
- Fleet: POST add + GET vehicles funcționează; UI grid reflectă adăugarea via WS `fleet_status_change`

Settings, Billing & Notifications
- „Pick Basic/Agent” → Stripe checkout (test) → redirect back; webhook schimbă `User.plan` la `pro`
- UI gates se actualizează live prin WS `subscription_changed`
- GET/PUT `/api/settings/general` persistă; `/api/settings/notifications/test` răspunde `sent: true`

Referințe
- Detalii per arie: `analyses/04_*` ... `08_*`
- Master review: `analyses/09_god_mode_max_review.md`

