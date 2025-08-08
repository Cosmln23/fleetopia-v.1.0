## Analiza 2 — Marketplace End-to-End

Coverage (estimare): 45%

Implementat
- UI complet pe o singură pagină: tabs (ALL/MY CARGO/MY QUOTES/ACTIVE DEALS), search, filters, grid
- AddCargo modal (UI) + CargoDetail modal (UI) cu secțiuni de costuri demo
- Pagini secundare: `create`, `[id]` (UI demo)
- API stubs: `/api/marketplace/all-offers`, `/api/marketplace/my-*`, `/api/cargo/create`

Lipsă / Incomplet
- Componente separate (SearchBar, CargoFilters, CargoCard, TabNavigation etc.) — logic centralizată într-un fișier
- Validare frontend (Zod) + calcul price/kg + vehicleType/urgency verificate
- Persistență reală DB (Prisma+Supabase) și pagination server-side; ownership checks
- Quote system: `POST /cargo/:id/quote`, `GET /cargo/:id/quotes`, `PUT /quotes/:id/accept` conectate la UI
- Realtime (WS) pentru updates la grid/quotes

To‑Do (neimplementat)
- Extrage componente: `SearchBar.tsx`, `CargoFilters.tsx`, `CargoCard.tsx`, `TabNavigation.tsx`, `CargoDetailModal.tsx`, `AddCargoModal.tsx`
- Frontend validate (Zod) + derived fields (pricePerKg)
- Backend: extinde Prisma schema; implementează CRUD complet + pagination + filters
- Quote endpoints + integrare în UI modal (send/accept)
- WS rooms: `all_offers_room`, `cargo_{id}`, `user_{id}`

