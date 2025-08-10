warning: in the working copy of 'AGENT_RULES.md', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/AGENT_RULES.md b/AGENT_RULES.md[m
[1mindex 3d0fa36..3cd2499 100644[m
[1m--- a/AGENT_RULES.md[m
[1m+++ b/AGENT_RULES.md[m
[36m@@ -151,11 +151,118 @@[m [mOprește implementarea. Propune **2 opțiuni** cu pro/contra, spune ce informaț[m
 - Nu schimbi stack, stil sau arhitectură fără cerere explicită.[m
 [m
 ---[m
[32m+[m[32mREGULA #11 — Separare Frontend/Backend (Monorepo, UI protejat)[m
 [m
[31m-### Anexe[m
[32m+[m[32mScop: Backend-ul evoluează independent. UI este intangibil până la aprobare explicită.[m
 [m
[31m-**Template de răspuns (copy‑paste):**[m
[31m-```md[m
[32m+[m
[32m+[m[32m11.1 Scope permis / interzis[m
[32m+[m
[32m+[m[32mPermis (doar acestea):[m
[32m+[m
[32m+[m[32m    apps/backend/**[m
[32m+[m
[32m+[m[32m    pnpm-workspace.yaml[m
[32m+[m
[32m+[m[32m    package.json (root; doar workspaces/scripts backend)[m
[32m+[m
[32m+[m[32m    .github/workflows/backend-ci.yml[m
[32m+[m
[32m+[m[32m    apps/backend/.env + apps/backend/.env.example (fără secrete)[m
[32m+[m
[32m+[m[32mInterzis (STOP instant dacă apar în diff):[m
[32m+[m
[32m+[m[32m    app/**, components/**, styles/**, public/**, app/api/**[m
[32m+[m
[32m+[m[32m    next.config.*, .eslintrc*, tailwind.config*[m
[32m+[m
[32m+[m[32m    Upgrade dependențe UI sau refactor UI fără cerere!!!! astepti confirmare sau intrebi!!![m
[32m+[m[32m!!!!!!!!!!!!!!!!!!!!!!!!!!![m
[32m+[m
[32m+[m
[32m+[m[32mREGULA #12 — Taskuri API: Date reale, fără mock (UI protejat)[m
[32m+[m
[32m+[m[32mScop: Orice pas care implică API → implementează pe backend real (DB/Prisma) și elimină mock. UI rămâne neatins până la “APROBAT SWITCH UI”.[m
[32m+[m[32m12.1 Scope permis / interzis[m
[32m+[m
[32m+[m[32mPermis: apps/backend/**, pnpm-workspace.yaml, package.json (root – scripturi backend), .github/workflows/backend-ci.yml, apps/backend/.env, apps/backend/.env.example.[m
[32m+[m[32mInterzis: app/**, components/**, public/**, styles/**, app/api/**, next.config.*, .eslintrc*. Dacă apar în diff → STOP & cere aprobare.[m
[32m+[m[32m12.2 Politica „NO MOCK”[m
[32m+[m
[32m+[m[32m    Elimină toate sursele mock/in-memory/fixtures din backend pentru endpoint-urile lucrate.[m
[32m+[m
[32m+[m[32m    Fără seed de demo în prod. Dacă e nevoie de seed doar pentru dezvoltare: SEED_DEMO=false implicit; activ doar manual.[m
[32m+[m
[32m+[m[32m    Contractele JSON rămân identice cu cele consumate de UI (nume câmpuri/forme/enum-uri).[m
[32m+[m
[32m+[m[32m12.3 Auth & securitate[m
[32m+[m
[32m+[m[32m    @clerk/express + requireAuth() pe rutele user-scoped.[m
[32m+[m
[32m+[m[32m    .env backend: CLERK_SECRET_KEY, CLERK_PUBLISHABLE_KEY, CLERK_ISSUER, CLERK_ALLOWED_ORIGINS.[m
[32m+[m
[32m+[m[32m    Rate limit pe rutele publice; CORS strict (localhost:3000 în dev).[m
[32m+[m
[32m+[m[32m12.4 DB & Prisma[m
[32m+[m
[32m+[m[32m    Migrații aditive; fără breaking fără aprobare.[m
[32m+[m
[32m+[m[32m    pnpm --filter @fleetopia/backend run prisma:generate && ... migrate:deploy înainte de test.[m
[32m+[m
[32m+[m[32m    Tip Decimal la API = string în request/response (conversie în service).[m
[32m+[m
[32m+[m[32m12.5 Validare & erori[m
[32m+[m
[32m+[m[32m    Validează payload cu zod (sau validatorul proiectului).[m
[32m+[m
[32m+[m[32m    Răspunde corect: 400 (invalid), 401/403 (auth), 404 (not found), 429 (rate limit); 500 doar pe excepții neprevăzute.[m
[32m+[m
[32m+[m[32m    Logging JSON (Winston): info pentru access, error cu stack; fără PII în loguri.[m
[32m+[m
[32m+[m[32m12.6 Parametri standard (consistență)[m
[32m+[m
[32m+[m[32m    Paginare: page, limit (default: page=1, limit=20).[m
[32m+[m
[32m+[m[32m    Sortare: sortBy (ex. created_desc).[m
[32m+[m
[32m+[m[32m    Filtre: păstrează exact cheile deja folosite de UI.[m
[32m+[m
[32m+[m[32m    Nimic nou în schema răspunsului fără aprobare.[m
[32m+[m
[32m+[m[32m12.7 Protocol de execuție (fiecare endpoint)[m
[32m+[m
[32m+[m[32m    Prezintă plan scurt + fișiere atinse → așteaptă APROBAT.[m
[32m+[m
[32m+[m[32m    Implementează doar în backend, fără touch UI.[m
[32m+[m
[32m+[m[32m    Smoke tests (dev):[m
[32m+[m
[32m+[m[32m    curl.exe -sS http://localhost:3001/health[m
[32m+[m[32m    curl.exe -sS "http://localhost:3001/api/marketplace/all-offers?page=1&limit=5"[m
[32m+[m[32m    curl.exe -sS -H "Authorization: Bearer <TOKEN>" http://localhost:3001/api/marketplace/my-cargo[m
[32m+[m
[32m+[m[32m    Dacă endpoint e POST/PUT: testează cu payload minim valid (zod) și confirmă inserarea prin GET.[m
[32m+[m
[32m+[m[32m    Commit unic: chore(backend): <endpoint> real (no mocks, no UI changes) + atașează output-ul testelor.[m
[32m+[m
[32m+[m[32m12.8 “Switch UI → backend” (pas separat)[m
[32m+[m
[32m+[m[32m    Până la aprobare, UI rămâne pe mock/proxy.[m
[32m+[m
[32m+[m[32m    La „APROBAT SWITCH UI”: PR mic care schimbă doar URL-urile/headers (fără componente).[m
[32m+[m
[32m+[m[32m12.9 Criterii de acceptare (task API)[m
[32m+[m
[32m+[m[32m    Niciun mock rămas pe endpoint-urile atinse.[m
[32m+[m
[32m+[m[32m    Contract JSON identic cu cel folosit de UI.[m
[32m+[m
[32m+[m[32m    Smoke tests = 200/201 și date vizibile prin GET.[m
[32m+[m
[32m+[m[32m    git diff --name-only doar în scope permis.[m
[32m+[m
[32m+[m[32m    UI neatins și build/dev OK.[m
[32m+[m[41m    [m
 🎯 CERINȚA ÎNȚELEASĂ: …[m
 [m
 🔧 MODIFICAREA FĂCUTĂ:[m
