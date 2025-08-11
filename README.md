# Fleetopia Monorepo

## Development

- Install deps: `pnpm -w install`
- Frontend dev: `npm run dev`
- Backend dev: `pnpm --filter @fleetopia/backend dev`

## Testing

- Unit: `npm run test`
- E2E: `npm run test:e2e` (Playwright)
- Contract tests:
  - Consumer: `npm run contract:consumer`
  - Provider: start backend, apoi `npm run contract:provider`

## Observability

- Frontend: `NEXT_PUBLIC_SENTRY_DSN_FRONTEND`
- Backend: `SENTRY_DSN_BACKEND` (init în `apps/backend/src/instrument.ts`)
- Source maps upload (build): `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`

## Security & Headers

- Helmet + HPP + COOP/COEP/CORP
- CSP (Report-Only by default): activați cu `FEATURE_CSP=true`. După 3–5 zile fără rapoarte critice, comutați la enforce cu `CSP_ENFORCE=true`.
- CSP reports: `POST /csp-report`

## Rate limiting

- Config în `apps/backend/.env`:
```
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=60
RATE_LIMIT_EXEMPT_IPS=127.0.0.1,::1
ADMIN_USER_IDS=user_123,user_456
```
- Excepții: `X-From-CI: true`, `X-Admin-Bypass: 1`.

## Upload safety

- `POST /api/upload` (multer.memory, MIME sniff, EXIF strip, size limit)
- Env:
```
FILE_MAX_MB=10
UPLOAD_MAX_CONCURRENCY=5
AV_SCAN_ENABLED=false
```

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
