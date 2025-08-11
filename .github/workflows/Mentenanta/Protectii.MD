# Sistemele de protecție și operare — Fleetopia

Acest document centralizează toate protecțiile adăugate, cum se configurează și care sunt „always-on” vs. „behind flags”.

## 1) Observabilitate (Dev/Prod)
- Request-ID middleware (backend):
  - Generează x-request-id per request; răspunsurile de eroare includ { requestId }.
  - Corelare în loguri JSON (Winston) și tag request_id în Sentry.
- Sentry (FE/BE):
  - Frontend: NEXT_PUBLIC_SENTRY_DSN_FRONTEND (runtime)
  - Backend: SENTRY_DSN_BACKEND (init în apps/backend/src/instrument.ts via --import)
  - Source maps upload (build): SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT (CI/Build)
- Artefacte CI pe fail: JUnit (Playwright), pacts, rapoarte e2e.

Status: automat (dacă DSN există). Upload source maps doar când există token/vars în CI.

## 2) Header hardening (Backend)
- Helmet + HPP activ (global)
- Headere setate:
  - Cross-Origin-Opener-Policy: same-origin
  - Cross-Origin-Embedder-Policy: require-corp
  - Cross-Origin-Resource-Policy: same-site
  - Strict-Transport-Security doar în prod+https
- CSP (Report-Only → Enforce):
  - Flag: FEATURE_CSP=true → setează Content-Security-Policy-Report-Only
  - După 3–5 zile fără rapoarte critice: CSP_ENFORCE=true → setează Content-Security-Policy
- Endpoint rapoarte: POST /csp-report (log JSON cu requestId)

Status: Helmet/HPP/COOP/COEP/CORP/HSTS — automat. CSP — behind flags.

## 3) Upload safety (Backend)
- Endpoint: POST /api/upload
- Protecții:
  - Limită mărime: FILE_MAX_MB (default 10 MB)
  - MIME sniff real cu file-type; allowlist: image/jpeg, image/png, application/pdf → 415 la mismatch
  - Imagini: sharp → rotate, resize max 4096px, strip metadata
  - contentHash (sha256) în răspuns
  - Concurență internă controlată cu p-limit (configurabil)
  - AV scan (opțional): AV_SCAN_ENABLED=true (ClamAV; TODO integrare la activare)

Status: activ implicit (AV scan off by default).

## 4) Rate limiting (Backend)
- Global rate-limit cu excepții și răspuns standardizat.
- Key per userId (dacă există) sau IP. Răspuns 429 JSON: { code: "RATE_LIMITED", retryAfter } + headere X-RateLimit-Limit, X-RateLimit-Remaining.
- Excepții:
  - X-From-CI: true (exclude CI)
  - X-Admin-Bypass: 1
  - IP-uri din RATE_LIMIT_EXEMPT_IPS
  - Useri din ADMIN_USER_IDS
- Praguri:
  - Dev default: 60 req/min
  - Prod default: 600 req/min
  - Configurabile: RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX

Status: automat (config prin .env).

## 5) Contracte tipate & Pact
- Pachet shared: @fleetopia/contracts (Zod)
  - Schemas: CargoSchema, AllOffersResponseSchema, UploadResponseSchema
- Pact tests:
  - Consumer: generează pacts pentru GET /api/marketplace/all-offers
  - Provider: verifică backend real împotriva pacts
- CI rulează automat testele de contract.

Status: automat în CI; local cu comenzi.

## 6) CI/CD strict
- pnpm --frozen-lockfile (cache & reproducibilitate)
- Typecheck → Lint → Build → Unit → Contract → E2E
- Actions pinned la SHA; artefacte încărcate doar pe eșec
- Source maps upload (opțional) dacă sunt configurate secretele Sentry

Status: automat pe push/PR (workflow .github/workflows/ci.yml).

---

## Variabile de mediu — Backend (apps/backend/.env)
- Observabilitate:
  - SENTRY_DSN_BACKEND= (gol dacă nu folosești)
- CSP & Flags:
  - FEATURE_CSP=true|false (default: false)
  - CSP_ENFORCE=true|false (default: false)
- Rate limit:
  - RATE_LIMIT_WINDOW_MS=60000
  - RATE_LIMIT_MAX=60 (dev) / 600 (prod)
  - RATE_LIMIT_EXEMPT_IPS=127.0.0.1,::1
  - ADMIN_USER_IDS=user_123,user_456
- Upload:
  - FILE_MAX_MB=10
  - UPLOAD_MAX_CONCURRENCY=5
  - AV_SCAN_ENABLED=false
- CORS:
  - CLERK_ALLOWED_ORIGINS=http://localhost:3000

## Variabile de mediu — Frontend (runtime)
- NEXT_PUBLIC_SENTRY_DSN_FRONTEND= (optional, pentru Sentry FE)
- Clerk publishable key (CI E2E): NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

## Secrets/Vars — CI (GitHub Actions → Settings → Secrets and variables → Actions)
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- (opțional, pentru source maps)
  - SENTRY_AUTH_TOKEN
  - SENTRY_ORG
  - SENTRY_PROJECT

---

## Comutări (behind flags)
- CSP Report-Only: FEATURE_CSP=true (on)
- CSP Enforce: CSP_ENFORCE=true (după 3–5 zile fără rapoarte critice)
- AV Scan: AV_SCAN_ENABLED=true (după configurare ClamAV)

## Always-on
- Request-ID, loguri JSON, Sentry init (dacă DSN setat)
- Helmet, HPP, COOP/COEP/CORP, HSTS (automat în prod+https)
- Rate-limit global
- Upload safety (MIME sniff, EXIF strip, size limit)
- Contract tests în CI

---

## Verificări rapide
- Health: curl http://localhost:3001/health → 200
- Eroare controlată: curl http://localhost:3001/_debug/boom → 500 JSON cu { requestId }
- All offers (API): curl "http://localhost:3001/api/marketplace/all-offers?page=1&limit=5"
- Upload valid: curl -i -F file=@<image.jpg> http://localhost:3001/api/upload → 200 JSON
- Upload invalid: curl -i -F file=@<file.txt> http://localhost:3001/api/upload → 415 JSON

---

## Note rollout CSP
1) Activează FEATURE_CSP=true (Report-Only)
2) Monitorizează rapoartele în loguri type: csp-report (3–5 zile)
3) Remediază surse blocate (nonce/host allowlist)
4) Comută CSP_ENFORCE=true → enforce