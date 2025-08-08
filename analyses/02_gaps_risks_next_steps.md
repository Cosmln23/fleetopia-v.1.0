## Gaps, Risks și Pașii Următori (Practic)

Principiu: Nu atingem agentul. Focus pe aducerea platformei la un MVP coerent, cu trasee realiste de date.

1) Autentificare și permisiuni (MAJOR GAP)
- Gap: Lipsă Clerk + Supabase user linkage; plan Trial/Pro doar vizual
- Impact: Nu putem aplica restricții (ex. send quotes Pro only), nici personalizare
- Next: Integrare Clerk (+ middleware), model `User` extins (role, plan), guard pe rute Next + Express

2) Persistență și DB modele
- Gap: Doar `User` și `Cargo` minimal; lipsă `Quote`, `Deal`, `Chat*`, `Vehicle*`, `CostSettings`, `NotificationSettings`, `UserSettings`
- Impact: Marketplace/Dispatcher/Settings blocate pe mock
- Next: Extinde `prisma/schema.prisma` și introduce migrații; conectează rutele existente

3) Marketplace end-to-end
- Gap: Filtre/Sort/Pagination reale; Add Cargo → MY CARGO; quote flow; status updates
- Impact: UX demo only
- Next: Implementări incrementale: GET all-offers (filters), POST create (persist), GET my-cargo, POST quote, GET quotes, PUT accept → creează Deal

4) Realtime și notificări
- Gap: Socket.io server fără events/rooms; lipsă client subscriptions
- Impact: Lipsă live updates (quotes, deals, fleet, suggestions)
- Next: Rooms: `all_offers_room`, `user_{id}`, `cargo_{id}`, `chat_{id}`; evenimente conform plan

5) Settings & Billing
- Gap: Stripe flows, subscription state, account management
- Impact: Nu putem promova/downgrade planuri
- Next: Stripe checkout + webhook + Subscription model; actualizează `useAuthStore` din backend

6) Fleet management
- Gap: CRUD, GPS data, map
- Impact: Tab-ul e doar demo vizual
- Next: Vehicle/VehicleLocation modele + API CRUD + map integrată + mock GPS apoi WS

7) Performanță/QA/Prod
- Gap: CI, tests, deploy, caching
- Impact: Fără calitate operațională
- Next: GitHub Actions + Jest minimal + deploy dev/staging; rate limit mai strict + compresie

Riscuri principale
- Scope creep pe AI/agent (evitat — deja livrat)
- Costuri Google Maps fără cache → amâna integrarea reală până la MVP
- Stripe webhook handling — necesită atenție la securitate

Propunere pași următori (2 sprints):
- Sprint 1: Auth+Perms, DB modele extinse, Marketplace e2e minimal (create, list, my-cargo, quote submit/accept)
- Sprint 2: Settings billing (Stripe) + Subscription gating + Realtime quotes/deals + Fleet CRUD (fără GPS real), QA basic


