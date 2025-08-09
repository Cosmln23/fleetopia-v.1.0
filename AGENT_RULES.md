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

### Anexe

**Template de răspuns (copy‑paste):**
```md
🎯 CERINȚA ÎNȚELEASĂ: …

🔧 MODIFICAREA FĂCUTĂ:
```diff
@@ path/to/file.tsx @@
- vechi
+ nou
```
✅ LOCAȚIA: `path/to/file.tsx` (Lxxx–Lyyy)

🧪 TESTE:
- [ ] build & type-check OK
- [ ] UI verificat în [roută] / [componență]
- [ ] comportament confirmat (…)

🧠 SELF-FEEDBACK:
- Acuratețe: __% • Înțelegere: __% • Relevanță: __% • Completitudine: __% • **Media**: __%
- Concluzie: [1 frază]
```
