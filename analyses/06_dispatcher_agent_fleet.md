## Analiza 3 — Dispatcher (AI) & Fleet

Coverage (estimare): 55%

Implementat
- Dispatcher UI: L0/L1/L2 toggles, Cost Settings modal, feed cu sugestii (L1/L2 apeluri reale la `/api/agent/*`)
- Fleet Management UI: grid demo, Add Fleet modal (formular UI)
- Agent-core: `/score` și `/suggest` complete; OpenAPI; proxy în Next API; circuit breaker simplu

Lipsă / Incomplet
- Persistență cost settings + folosință în calcule reale; feedback log/istoric
- Realtime WS pentru feed și fleet (GPS, status change)
- CRUD vehicule + map reală; GPS mock polling/WS
- Joburi (cron/queue) pentru refresh sugestii, GPS archiving

To‑Do (neimplementat)
- Backend: modele `CostSettings`, `AIHistory`, `AIFeedback`, `Vehicle`, `VehicleLocation`
- Endpoints: `/api/agent/status|toggle|feedback|suggestions`, `/api/fleet/*`, `/api/map/gps`
- WS events: `agent_suggestion_new`, `fleet_gps_update`, `fleet_status_change`, `ai_level_change`
- UI: `AISuggestionsPanel`, `FleetManagementPanel` (MapInterface + VehicleGrid), thumbs up/down feedback

Constraints (do-not-touch)
- NU modifica `agent-core` (model/endpoint logic). Persistă doar input/output și afișarea în UI.

Prioritized TODO (acceptance criteria)
- Persist cost settings via PUT /api/cost-settings; subsequent GET returns saved values
- L2 suggestions fetched via `/api/agent/suggest` are saved to `AIHistory` and rendered in feed after page reload
- Fleet: POST /api/fleet/add creates a vehicle; GET /api/fleet/vehicles lists it; UI grid shows new vehicle without refresh via WS `fleet_status_change`

