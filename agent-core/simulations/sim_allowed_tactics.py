# Simulation: policy 'never below S' with alternative tactics (no price drop)
# Tactic A: re-notify wider top-K -> acceptance multiplier factor
# Tactic B: switch to closer truck -> reduce cost by a random % (bounded)
import numpy as np
import pandas as pd

rng = np.random.default_rng(123)

def sigmoid(x): return 1/(1+np.exp(-x))

def p_accept(price, M, beta, urgency, competition, lane_heat, urgency_min, deadhead_km):
    u_shift = -0.25 if urgency==0 else (0.0 if urgency==1 else 0.25)
    c_shift =  0.20 if competition==0 else (0.0 if competition==1 else -0.25)
    rel = (price/M) - 1.0
    z = u_shift + c_shift - abs(beta)*rel + 0.15*lane_heat - 0.001*urgency_min - 0.002*deadhead_km
    return sigmoid(z)

def simulate(n=5000):
    M = rng.lognormal(mean=np.log(1000) - 0.5*0.25**2, sigma=0.25, size=n)
    premium = np.clip(rng.normal(0.10,0.15,n), -0.20, 0.50)
    S = M*(1+premium)
    cost = M * rng.uniform(0.6,0.9,size=n)
    urgency = rng.choice([0,1,2], size=n, p=[0.35,0.45,0.20])
    competition = rng.choice([0,1,2], size=n, p=[0.30,0.45,0.25])
    lane_heat = rng.uniform(0.8,1.3,size=n)
    urgency_min = rng.uniform(60,360,size=n)
    deadhead_km = rng.uniform(10,120,size=n)
    beta = rng.uniform(4,9,size=n)

    # Baseline EV at S
    pS = p_accept(S, M, beta, urgency, competition, lane_heat, urgency_min, deadhead_km)
    EV_S = (S - cost) * pS

    # Forbidden: dropping below S (we don't do it)
    # Allowed Tactic A: widen notify -> multiplier on acceptance prob (bounded)
    factorA = rng.uniform(1.05, 1.25, size=n)  # 5%..25% boost
    pA = np.clip(pS * factorA, 0, 0.98)
    EV_A = (S - cost) * pA

    # Allowed Tactic B: switch truck -> reduce cost by 0..10% with prob 0.6
    reduce_frac = rng.uniform(0.02, 0.10, size=n) * (rng.random(n) < 0.6)
    costB = cost * (1 - reduce_frac)
    EV_B = (S - costB) * pS  # accept prob same as baseline if price unchanged

    # Choose the best allowed tactic per case (including doing nothing)
    EV_best_allowed = np.maximum.reduce([EV_S, EV_A, EV_B])
    gain_allowed = EV_best_allowed - EV_S
    chooseA = (EV_A >= EV_B) & (EV_A >= EV_S)
    chooseB = (EV_B > EV_A) & (EV_B >= EV_S)

    summary = {
        "mean_EV_S": float(EV_S.mean()),
        "mean_EV_best_allowed": float(EV_best_allowed.mean()),
        "mean_gain_allowed": float(gain_allowed.mean()),
        "median_gain_allowed": float(np.median(gain_allowed)),
        "pct_choose_A": float(100*chooseA.mean()),
        "pct_choose_B": float(100*chooseB.mean()),
        "pct_no_change": float(100*((~chooseA) & (~chooseB)).mean())
    }
    return summary

if __name__=="__main__":
    out = simulate(10000)
    print(out)
