# AGENT_RULES.md — Reguli pentru Agentul de Codare **Fleetopia**
**Versiune:** 1.1 • August 08, 2025 • _Acest fișier se păstrează în root și se citește la începutul fiecărei sesiuni._

> **⚠️ OBLIGATORIU:** Citește integral acest fișier la începutul **fiecărei** sesiuni noi. Confirmă în primul răspuns: _„Am citit AGENT_RULES.md și voi respecta regulile.”_

> **⚠️ OBLIGATORIU:** Citește integral acest fișier la începutul **fiecărei** sesiuni noi. Confirmă în primul răspuns: _„Am citit AGENT_RULES.md și voi respecta regulile.”_
> **🔴 NOTĂ SUPLIMENTARĂ:** Dacă în timpul execuției apare o eroare sau nu reușești să finalizezi cerința, este OBLIGATORIU să o raportezi clar și complet, fără să o eviți sau să „sari peste” pași doar pentru a finaliza mai repede. Calitatea și corectitudinea sunt prioritare în fața vitezei. Evită să omiți orice detaliu esențial sau să execuți parțial fără confirmare explicită.
---

## 0) Protocol de pornire (de fiecare dată)
1. Citește acest fișier și ghidul UI/flux: **„Fleetopia – Prompt pentru Agent + Structură de construcție (frontend)”** (alias acceptat: `FLEETOPIA_FRONTEND_GUIDE.md`, dacă există alias în repo).
2. Fă un **rezumat în 3–5 bullet-uri** al cerinței curente; definește **scope-ul exact** (fișiere, componente, rute).
3. Confirmă în **o singură frază** ce urmează să faci. Dacă ai incertitudini, pune **maxim 2 întrebări** (prioritizează cea mai importantă).

---

## REGULA #1 — **Răspuns EXACT la cerință, modificare STRICT în scope**
**Principiu:** _„Fă EXACT ce ți se cere, DOAR ce ți se cere, ACOLO unde ți se cere.”_

### ✅ Ce trebuie să faci
- „Modifică **ACOLO**” → modifici **doar acolo** (componenta/fișierul/segmentul indicat).
- „Adaugă în componenta **X**” → adaugi **doar** în componenta X.
- „Schimbă culoarea butonului” → schimbi **doar** culoarea butonului.

### ❌ Ce NU trebuie să faci
- Nu modifici alte componente „din oficiu”.
- Nu optimizezi automat alte părți.
- Nu adaugi funcționalități necerute.
- Nu faci refactor necerut.
- Nu instalezi noi dependențe sau nu modifici CSS global fără solicitare explicită.

### 📝 Exemplu corect vs. incorect
**Cerință:** „Schimbă culoarea butonului **Add Cargo** din albastru în roșu.”

**✅ Corect**
```tsx
// Modific STRICT butonul Add Cargo
<button className="bg-red-500 hover:bg-red-600 transition-colors">
  Add Cargo
</button>
```

**❌ Incorect**
```tsx
// GREȘIT: nu mi s-a cerut să modific și alte butoane sau stiluri globale
<button className="bg-red-500 hover:bg-red-600 transition-colors">Add Cargo</button>
<button className="bg-red-500 hover:bg-red-600 transition-colors">Delete Cargo</button>
```

---

## REGULA #2 — Proces de gândire & auto-verificare (obligatoriu)
**Înainte de orice modificare:**
1) **Analizezi** cerința; 2) **Identifici** locația precisă; 3) **Verifici** că ai înțeles; 4) **Execuți** strict ce s-a cerut; 5) **Confirmi**.

**Self‑feedback (obligatoriu la finalul fiecărui răspuns):**
- Am înțeles exact cerința?  
- Modific doar ce trebuie?  
- Nu adaug nimic în plus?  
- Răspunsul meu e complet pentru cerință?

Dacă **media încrederii < 80%** (acuratețe, înțelegere, relevanță, completitudine), marchează răspunsul ca **„riscat”**, explică lipsurile și cere confirmare înainte de a continua.

---

## REGULA #3 — Propuneri DOAR după execuția cerută
Poți propune îmbunătățiri **doar după** ce ai livrat modificarea exactă. Folosește formatul:

```
✅ AM FĂCUT: [descriere scurtă a modificării cerute]
💡 OBSERV: [problemă sau oportunitate constatată]
🚀 PROPUN (opțional): [soluția] + motivul
🤷 ALTERNATIV: Las totul așa cum ai cerut
```

---

## REGULA #4 — Zero halucinații
- Nu inventa API-uri, contracte, clase CSS, structuri de fișiere sau dependențe.
- Dacă lipsește ceva, marchează `TODO:` și cere clarificare.
- Fă trimitere la **fișiere/locații reale** din repo pentru orice referință.

Model când nu știi ceva:
```
„Nu am văzut componenta [X] în codul furnizat. Îmi poți indica fișierul/path-ul exact?”
```

---

## REGULA #5 — Comunicare & format standard de răspuns
**Limită:** maxim **2 întrebări**/răspuns; pune întâi întrebarea critică.

**Format obligatoriu:**
```
🎯 CERINȚA ÎNȚELEASĂ: [1–2 fraze]
🔧 MODIFICAREA FĂCUTĂ: [codul/diff-ul relevant]
✅ LOCAȚIA: [path +, dacă e cazul, interval linii]
💡 OBSERVAȚII: [opțional; propuneri după execuție]
🧪 TESTE: [pașii de verificare] 
🧠 SELF-FEEDBACK: [scoruri și 1 frază de concluzie]
```

---

## REGULA #6 — Consistență cu proiectul
### Stil & UI
- Folosește clasele din `globals.css` (ex.: `glass-border`, `glass-card`, `glass-input`) și animațiile `fade/slide/blur`.
- Menține **Header fix (top)** + **Bottom nav fix** și aspectul glassmorphism.

### Arhitectură & stack
- **Next.js 14 (App Router), TypeScript, Tailwind, lucide-react, Zustand, React Query**.
- Respectă structura de directoare și denumirile de componente stabilite. Nu reorganiza fără cerere explicită.
- Trial vs. Pro: doar **permisiuni vizuale** (nu implementa billing real dacă nu se cere).

---

## REGULA #7 — QA & Definition of Done
- Build, linter și type-check fără erori.
- UI confirmă ghidul (nav fix, glass, animații, grid/tabs/modale).
- Nicio schimbare în afara scope-ului.
- Toate `TODO` neacoperite sunt listate cu pași următori.
- `Confidence` ≥ 80% sau marcat „riscat” + așteaptă confirmare.

---

## REGULA #8 — Micro-task („modifică doar acolo”)
- Livrezi **DOAR patch-ul** acelui fișier.
- Include un **diff** cu 5–7 linii de context înainte/după.
- Fără refactor global, fără redenumiri, fără dependențe noi.

---

## REGULA #9 — Commit & diffs
- **Un commit pe task** (sau `fixup` minimal). Mesaj tip:
  - `feat(marketplace): add price range filter (scoped to CargoFilters only)`
  - `fix(dispatcher): guard L1 calculator when L0 off (no cross-file changes)`
- La final: **listează fișierele** și **nr. de linii** modificate.

---

## REGULA #10 — Fallback când nu e clar
Oprește implementarea. Propune **2 opțiuni** cu pro/contra, spune ce informație lipsește și cere clarificare. Nu „umple golurile” prin presupuneri.

---

## TL;DR pentru Agent
- Citești **AGENT_RULES.md** la fiecare sesiune.
- Modifici **strict în scope**. Zero halucinații.
- Pui **max 2 întrebări**, livrezi **diff + teste + self‑feedback**.
- Propunerile sunt **opționale** și vin **după** execuția cerută.
- Nu schimbi stack, stil sau arhitectură fără cerere explicită.

---
## DB Change Log Rule (Prod)
Scop: La orice schimbare ce atinge baza de date (schema, index, RLS/politici, roluri, chei de cache), agentul trebuie să producă un fișier YAML în `docs/agent-log/` și să-l atașeze PR-ului.

Nume fișier: `docs/agent-log/YYYY-MM-DD_<change_type>_<slug>.yaml`

Format YAML obligatoriu:
```
date: YYYY-MM-DD
author: agent|dev
change_type: table_add|table_alter|column_add|index_add|index_drop|rls_update|role_update|cache_key|replica_cfg|other
migration_id: <string|NA>
tables: [<table_a>, <table_b>]
columns: [<col_a>, <col_b>]
index_name: <string_or_null>
policy_name: <string_or_null>
role: <string_or_null>
rationale: "<1-2 fraze>"
risk: low|medium|high
links:
  pr_url: "<url|NA>"
  migration_path: "apps/.../migrations/<id>"
evidence:
  before_ms: <numar_or_null>
  after_ms: <numar_or_null>
  explain_before: "<scurt|NA>"
  explain_after: "<scurt|NA>"
validation:
  did_run_checks: true|false
  notes: "<psql \d+, describe/indexes, RLS ON etc.>"
```

Reguli minim obligatorii:
- fără secrete (chei, parole, DSN)
- dacă `change_type=rls_update` → `policy_name` nu e null
- dacă `change_type=index_add` → `index_name` și `tables` obligatorii
- dacă lipsesc date, pune `NA` explicit și justifică în `rationale`
REGULA #11 — Separare Frontend/Backend (Monorepo, UI protejat)

Scop: Backend-ul evoluează independent. UI este intangibil până la aprobare explicită.


11.1 Scope permis / interzis

Permis (doar acestea):

    apps/backend/**

    pnpm-workspace.yaml

    package.json (root; doar workspaces/scripts backend)

    .github/workflows/backend-ci.yml

    apps/backend/.env + apps/backend/.env.example (fără secrete)

Interzis (STOP instant dacă apar în diff):

    app/**, components/**, styles/**, public/**, app/api/**

    next.config.*, .eslintrc*, tailwind.config*

    Upgrade dependențe UI sau refactor UI fără cerere!!!! astepti confirmare sau intrebi!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!


REGULA #12 — Taskuri API: Date reale, fără mock (UI protejat)

Scop: Orice pas care implică API → implementează pe backend real (DB/Prisma) și elimină mock. UI rămâne neatins până la “APROBAT SWITCH UI”.
12.1 Scope permis / interzis

Permis: apps/backend/**, pnpm-workspace.yaml, package.json (root – scripturi backend), .github/workflows/backend-ci.yml, apps/backend/.env, apps/backend/.env.example.
Interzis: app/**, components/**, public/**, styles/**, app/api/**, next.config.*, .eslintrc*. Dacă apar în diff → STOP & cere aprobare.
12.2 Politica „NO MOCK”

    Elimină toate sursele mock/in-memory/fixtures din backend pentru endpoint-urile lucrate.

    Fără seed de demo în prod. Dacă e nevoie de seed doar pentru dezvoltare: SEED_DEMO=false implicit; activ doar manual.

    Contractele JSON rămân identice cu cele consumate de UI (nume câmpuri/forme/enum-uri).

12.3 Auth & securitate

    @clerk/express + requireAuth() pe rutele user-scoped.

    .env backend: CLERK_SECRET_KEY, CLERK_PUBLISHABLE_KEY, CLERK_ISSUER, CLERK_ALLOWED_ORIGINS.

    Rate limit pe rutele publice; CORS strict (localhost:3000 în dev).

12.4 DB & Prisma

    Migrații aditive; fără breaking fără aprobare.

    pnpm --filter @fleetopia/backend run prisma:generate && ... migrate:deploy înainte de test.

    Tip Decimal la API = string în request/response (conversie în service).

12.5 Validare & erori

    Validează payload cu zod (sau validatorul proiectului).

    Răspunde corect: 400 (invalid), 401/403 (auth), 404 (not found), 429 (rate limit); 500 doar pe excepții neprevăzute.

    Logging JSON (Winston): info pentru access, error cu stack; fără PII în loguri.

12.6 Parametri standard (consistență)

    Paginare: page, limit (default: page=1, limit=20).

    Sortare: sortBy (ex. created_desc).

    Filtre: păstrează exact cheile deja folosite de UI.

    Nimic nou în schema răspunsului fără aprobare.

12.7 Protocol de execuție (fiecare endpoint)

    Prezintă plan scurt + fișiere atinse → așteaptă APROBAT.

    Implementează doar în backend, fără touch UI.

    Smoke tests (dev):

    curl.exe -sS http://localhost:3001/health
    curl.exe -sS "http://localhost:3001/api/marketplace/all-offers?page=1&limit=5"
    curl.exe -sS -H "Authorization: Bearer <TOKEN>" http://localhost:3001/api/marketplace/my-cargo

    Dacă endpoint e POST/PUT: testează cu payload minim valid (zod) și confirmă inserarea prin GET.

    Commit unic: chore(backend): <endpoint> real (no mocks, no UI changes) + atașează output-ul testelor.

12.8 “Switch UI → backend” (pas separat)

    Până la aprobare, UI rămâne pe mock/proxy.

    La „APROBAT SWITCH UI”: PR mic care schimbă doar URL-urile/headers (fără componente).

12.9 Criterii de acceptare (task API)

    Niciun mock rămas pe endpoint-urile atinse.

    Contract JSON identic cu cel folosit de UI.

    Smoke tests = 200/201 și date vizibile prin GET.

    git diff --name-only doar în scope permis.

    UI neatins și build/dev OK.
    
🎯 CERINȚA ÎNȚELEASĂ: …

🔧 MODIFICAREA FĂCUTĂ:
```diff
@@ path/to/file.tsx @@
- vechi
+ nou
```

### API Smoke Targets Rule (Prod)
- La orice endpoint nou/modificat, agentul adaugă/actualizează intrarea în `scripts/apis.json`.
- Format: `{ name, method, path, expect:[statuses] }`.
- Nume unic: `<segment>-<verbul>-<resursa>` (ex.: `cargo-create`).
- În PR, dacă detectezi rute noi și lipsesc din `apis.json` → marchează PR-ul ca invalid și cere completarea.
✅ LOCAȚIA: `path/to/file.tsx` (Lxxx–Lyyy)

🧪 TESTE:
- [ ] build & type-check OK
- [ ] UI verificat în [roută] / [componență]
- [ ] comportament confirmat (…)

🧠 SELF-FEEDBACK:
- Acuratețe: __% • Înțelegere: __% • Relevanță: __% • Completitudine: __% • **Media**: __%
- Concluzie: [1 frază]
```
