# Fleetopia Agent Core — v1 (Rules + EV, policy ≥ S)

## Obiectiv
Sugestii de preț cu **EV** maxim **fără a coborî sub S**. Dacă EV_opt ≤ EV_anchor → „Hold @S” + recalc în τ minute.

## API (OpenAPI în `openapi.yaml`)
- **POST /score** — calculează EV pe grilă și returnează EV_anchor, EV_opt, p_opt, P(accept@S), uplift, τ.
- **POST /suggest** — aplică politica **≥S**: dacă EV_opt > EV_anchor și p_opt ≥ S, recomandă p_opt, altfel „HOLD@S” cu τ.

## Modelare (simplificată, dar extensibilă)
- Acceptanță: logistică cu shift-uri urgency/competition: `σ( u_shift + c_shift − β*(p/M − 1) )`.
- Cost C vine din L1 (serverul tău). EV(p) = (p − C)*P(accept | p, context).
- Grid preț: [0.7M … 1.3M], 121 puncte.
- τ (hazard): 5–15 minute în funcție de urgență/competiție (config).
- **Guardrails**: niciun preț < S.

## Telemetrie
- p95 latency, %hold, %recommend, uplift distro; log audit (input/output/feedback).

## Rollout recomandat
1. **Shadow 100%** (2–5 zile) — nu trimite oferte automat, doar afișează recomandări.
2. **Canary 10% Pro** — trimite automat doar când EV_opt > EV_anchor.
3. **Full rollout** — după criterii „gata” de mai jos.

## Criterii „gata”
- 0 rezultate `< S` la L2.
- p95 `/score` < 120 ms.
- ΔEV mediu > 0 față de anchor-only pe 10k+ cazuri.
- e2e: L0 → L1 → L2 „Send Quote” trece în staging.

## Rulare locală
```bash
npm install
npm run dev
# POST http://localhost:8080/score
```

## NOTE
- Codul e TypeScript cu Express/Fastify-light. Extinde după necesități (ex. Joi validation, OpenTelemetry).
