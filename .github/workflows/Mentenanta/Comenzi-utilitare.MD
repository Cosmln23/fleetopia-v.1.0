## Comenzi utilitare și operaționale

Acestea sunt comenzile manuale folosite frecvent în proiect (PowerShell sau Bash). Înlocuiește URL-urile după nevoie.

### Smoke API
- PowerShell:
  - `$env:API_BASE='http://localhost:3001'; pnpm check:apis`
- Bash/Git Bash:
  - `API_BASE=http://localhost:3001 pnpm check:apis`

### Backend (dev)
- `pnpm --filter @fleetopia/backend dev`

### Backend (prod build + start)
- `pnpm --filter @fleetopia/backend build`
- `pnpm --filter @fleetopia/backend start`

### Pact contract tests
- Consumer: `npm run contract:consumer`
- Provider (necesită backend pornit pe 3001):
  - `npm run contract:provider`

### E2E Playwright
- `npm run test:e2e`

### Build Next.js
- `npm run build`

### Upload API test (Windows PowerShell)
- Imagine validă:
  - `curl.exe -i -F file=@C:/Windows/Web/Wallpaper/Windows/img0.jpg http://localhost:3001/api/upload`
- Tip neacceptat:
  - `echo test > C:/Users/<user>/Pictures/bad.txt`
  - `curl.exe -i -F file=@C:/Users/<user>/Pictures/bad.txt http://localhost:3001/api/upload`

### Verificări rapide backend
- Health: `curl.exe -i http://localhost:3001/health`
- Debug error: `curl.exe -i http://localhost:3001/_debug/boom`

### Note
- Pentru variabile de mediu în PowerShell folosește `$env:NAME='value'`.
- În Bash/Git Bash: `NAME=value comandă`.

