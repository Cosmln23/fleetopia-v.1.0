export type Features = {
  deadhead_km: number;
  urgency_min: number;
  lane_heat: number;
  rel_score: number;
  competition: "low"|"med"|"high";
  urgency: "low"|"med"|"high";
};

export type ScoreInput = {
  S: number;     // posted price
  M: number;     // market median/reference
  C: number;     // cost
  beta?: number; // elasticity
  f: Features;
  config?: {
    gridMin?: number; // default 0.7
    gridMax?: number; // default 1.3
    gridStepPct?: number; // default 0.5% = 0.005
    tauByUrgency?: Record<Features["urgency"], number>; // minutes
  };
};

export type ScoreOutput = {
  EV_anchor: number;
  EV_opt: number;
  p_opt: number;
  p_accept_at_S: number;
  uplift_diff: number;
  uplift_ratio: number;
  tau_minutes: number;
  grid_summary: { price: number; p_accept: number; EV: number }[];
};

const uShift = (u: Features["urgency"]) => u==="low" ? -0.25 : (u==="med" ? 0.0 : 0.25);
const cShift = (c: Features["competition"]) => c==="low" ? 0.20 : (c==="med" ? 0.0 : -0.25);

const sigmoid = (x:number) => 1/(1+Math.exp(-x));

function pAccept(p:number, M:number, beta:number, f:Features){
  // monotonic in p/M: as price grows relative to market, accept probability drops
  const rel = (p/M) - 1.0;
  const z = uShift(f.urgency) + cShift(f.competition) - Math.abs(beta) * rel
           + 0.15 * f.lane_heat - 0.001 * f.urgency_min - 0.002 * f.deadhead_km;
  return sigmoid(z);
}

export function scoreRequest(input: ScoreInput): ScoreOutput {
  const { S, M, C, f } = input;
  if (!(S>0 && M>0)) throw new Error("Invalid S/M");
  const beta = input.beta ?? 6.0;
  const gridMin = input.config?.gridMin ?? 0.7;
  const gridMax = input.config?.gridMax ?? 1.3;
  const gridStepPct = input.config?.gridStepPct ?? 0.005;
  const tauByUrgency = input.config?.tauByUrgency ?? { low: 15, med: 10, high: 5 };

  // grid around M
  const grid:number[] = [];
  for (let m=gridMin; m<=gridMax + 1e-9; m+=gridStepPct){
    grid.push(+((M*m).toFixed(2)));
  }

  const grid_summary = grid.map(price => {
    const p = pAccept(price, M, beta, f);
    const EV = (price - C) * p;
    return { price, p_accept: p, EV };
  });

  // EV at anchor
  const pS = pAccept(S, M, beta, f);
  const EV_anchor = (S - C) * pS;

  // best point on grid
  let best = { price: S, EV: EV_anchor, p: pS };
  for (const g of grid_summary){
    if (g.EV > best.EV) best = { price: g.price, EV: g.EV, p: g.p_accept };
  }
  const EV_opt = best.EV;
  const p_opt = best.price;
  const uplift_diff = EV_opt - EV_anchor;
  const uplift_ratio = EV_anchor > 0 ? (EV_opt/EV_anchor - 1.0) : 0;

  return {
    EV_anchor: +EV_anchor.toFixed(2),
    EV_opt: +EV_opt.toFixed(2),
    p_opt: +p_opt.toFixed(2),
    p_accept_at_S: +pS.toFixed(4),
    uplift_diff: +uplift_diff.toFixed(2),
    uplift_ratio: +uplift_ratio.toFixed(4),
    tau_minutes: tauByUrgency[f.urgency],
    grid_summary
  };
}

export function suggestRequest(input: ScoreInput){
  const out = scoreRequest(input);
  // Policy ≥ S: never go below the posted price
  const decision = (out.EV_opt > out.EV_anchor && out.p_opt >= input.S)
    ? { decision: "RECOMMEND", price: out.p_opt }
    : { decision: "HOLD_AT_S", price: input.S };

  return {
    ...out,
    policy: "never_below_S",
    ...decision,
    rationale: decision.decision === "RECOMMEND"
      ? ["EV(p*) > EV(S)", "p* ≥ S", "context-adjusted acceptance"]
      : ["Anchor dominates EV", "re-evaluate at τ"]
  };
}
