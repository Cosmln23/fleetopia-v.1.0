import express from "express";
import { scoreRequest, suggestRequest } from "./priceEngine.js";

const app = express();
app.use(express.json({ limit: "1mb" }));

// Basic health endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Minimal metrics stub
let totalScoreCalls = 0;
let totalSuggestCalls = 0;
let totalErrors = 0;

app.get("/metrics", (_req, res) => {
  res.type("text/plain").send(
    [
      `agent_core_score_calls ${totalScoreCalls}`,
      `agent_core_suggest_calls ${totalSuggestCalls}`,
      `agent_core_errors ${totalErrors}`,
    ].join("\n"),
  );
});

app.post("/score", (req, res) => {
  try {
    const out = scoreRequest(req.body);
    totalScoreCalls += 1;
    res.json(out);
  } catch (e:any) {
    totalErrors += 1;
    res.status(400).json({ error: String(e?.message || e) });
  }
});

app.post("/suggest", (req, res) => {
  try {
    const out = suggestRequest(req.body);
    totalSuggestCalls += 1;
    res.json(out);
  } catch (e:any) {
    totalErrors += 1;
    res.status(400).json({ error: String(e?.message || e) });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`[agent-core] listening on http://localhost:${PORT}`);
});
