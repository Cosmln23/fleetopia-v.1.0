# Sisteme de protecție și operare – Fleetopia

Acest fișier sumarizează protecțiile implementate, statusul lor (automat vs. control prin flag), și unde se configurează.

## Observabilitate
- Sentry FE/BE: variabile `NEXT_PUBLIC_SENTRY_DSN_FRONTEND`, `SENTRY_DSN_BACKEND`. Opțional în CI: `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` pentru upload source maps. Automat on dacă DSN-urile sunt setate.
- Request ID: middleware backend atașează `x-request-id` și `req.context.requestId`. Automat.
- Artefacte CI: Playwright videos/screenshots + JUnit. Automat în workflow.

## Header hardening
- Helmet + HPP: active în server. Automat.
- COOP/COEP/CORP + HSTS (prod): setate la răspuns. Automat; HSTS activ doar în HTTPS/prod.
- CSP: Report-Only implicit, comutare la enforce cu `CSP_ENFORCE=true`. Nonce per request. Controlat prin flag.

## Upload safety
- Limite mărime (`FILE_MAX_MB`), sniff MIME cu `file-type`, allowlist extensii/MIME, procesare imagini cu `sharp` (resize + strip EXIF). Automat.
- ClamAV opțional: `AV_SCAN_ENABLED=true` + serviciu `clamd`. Controlat prin flag.
- Rate-limit specific pentru upload: activ. Automat.

## Contracte tipate
- Pachet `@fleetopia/contracts` (Zod) folosit în backend și frontend. Automat dacă pachetul este construit.
- Pact tests (consumer/provider) rulate în CI. Automat.

## Rate limiting
- Prag global configurabil: `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`. Excepții: `RATE_LIMIT_EXEMPT_IPS`, `ADMIN_USER_IDS`. Automat.
- Concurrency cap (p-limit) per IP/user: planificat (deferit). Flag ulterior.

## Autentificare / Autorizare
- Rute private răspund JSON 401/403, fără redirect. Automat.

## CI/CD strict
- pnpm workspace, build ordonat, artefacte la eșec. Automat.

## Flag-uri cheie
- `FEATURE_CSP` (implicit on), `CSP_ENFORCE=false` (prod se activează gradual), `FEATURE_UPLOAD_SANDBOX` (on), `AV_SCAN_ENABLED` (off by default), `FEATURE_RATE_LIMIT_DEV` (on în dev), `FEATURE_CONTRACTS` (on).

## Ce trebuie setat manual
- DSN-urile Sentry (FE/BE) în `.env` și/sau GitHub Secrets.
- Variabile rate limit dacă vrei praguri diferite.
- `CSP_ENFORCE=true` după 3–5 zile fără rapoarte critice.
- Pornire ClamAV și `AV_SCAN_ENABLED=true` dacă vrei scan antivirus.

Pentru detalii și instrucțiuni complete, vezi `README.md` și `AGENT_RULES.md` (secțiunile DB Change Log și API Smoke Targets).
