# Fleetopia Frontend

Next.js 14 (App Router) + TypeScript + Tailwind + lucide-react + Zustand + React Query — Glassmorphism UI, fixed header and bottom nav, Trial/Pro visual permissions.

## Requirements implemented
- Routes: `/`, `/marketplace`, `/dispatcher`, `/settings`
- Fixed `Header` + fixed `BottomNav`, glassmorphism styles and animations
- Zustand store for Trial/Pro visual gating; `PlanGuard` wrapper
- React Query provider (no real API calls). `/api/hello` stub
- Mock data for marketplace cards

## Get started

Using pnpm (recommended):

```bash
pnpm install
pnpm dev
```

Using npm:

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Scripts
- `dev`: start Next dev server
- `build`: build
- `start`: run production build
- `lint`: eslint

## Project structure (tree)
```
app/
  api/hello/route.ts
  dispatcher/page.tsx
  globals.css
  layout.tsx
  marketplace/page.tsx
  providers.tsx
  settings/page.tsx
  page.tsx
components/
  BottomNav.tsx
  Header.tsx
  PlanGuard.tsx
data/
  mock/marketplace.ts
store/
  useAuthStore.ts
```

## Environment
- Copy `.env.local.example` to `.env.local` if needed

## Notes
- All APIs/WebSocket are stubs/mock only.
- Visual permissions only; no real billing.
