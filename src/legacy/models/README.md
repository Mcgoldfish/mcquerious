# The Mathematics of Ruin — model

Initial wealth W₀ = 1,000 fictional units. Each round stakes a fixed fraction f ∈ [0,1] of current wealth. A Bernoulli win has probability p and returns a net b units per unit staked (b=1 means even-money payoff). A loss removes the stake.

- Win: Wₜ₊₁ = Wₜ(1+bf)
- Loss: Wₜ₊₁ = Wₜ(1−f)
- One-round expected multiplier: 1+f(pb−(1−p))
- IID expected terminal wealth: W₀[1+f(pb−(1−p))]ⁿ
- Expected logarithmic growth: g(f)=p ln(1+bf)+(1−p)ln(1−f)
- Growth-optimal fraction with no borrowing/shorting: f*=clip((pb−(1−p))/b,0,1)

For 0<p<1, differentiate g and set g′=0 to derive Kelly. Its second derivative is negative, so the interior optimum is unique. With f=1 and any nonzero loss probability, expected log growth is −∞. Special case p=1 avoids the undefined 0·ln(0) term.

At p=.6, b=1, f=.5: arithmetic expected return is +10% each round while g≈−.034, yielding a typical long-run contraction. The sample mean can fluctuate greatly because rare large paths dominate it. Finite-sample medians are not exactly exp(n g).

## Simulation
Mulberry32 seeded pseudorandom generator; 200 paths for exploration, 400 per final challenge scenario. Outcomes use identical uniform draws across strategy comparisons. The regime change begins at round floor(n/2)+1, with a fixed pAfter. It is an explicit toy scenario, not estimated data or a random drift process. Changing the seed changes outcomes; rerunning with the same inputs reproduces them.

Threshold failure means Wₜ ≤ threshold at any observed step including t=0. Paths continue after threshold crossing; this is a reporting boundary, not forced liquidation. Exact bankruptcy means final W=0. For f<1 the mathematical model stays positive; extreme fractional paths are floored at Number.MIN_VALUE to prevent floating-point underflow being counted as exact bankruptcy. Subnormal paths are numerically approximate and not suitable for detailed recovery analysis. Plots use log₁₀(1+W) to include zero and label this transformation. All paths determine reported statistics; only a fixed representative subset is drawn for readability.

## Limitations
No costs, taxes, leverage, utility preferences, minimum stakes, liquidity or real market returns. Outcomes are independent conditional on the stated deterministic probability schedule. Kelly optimizes asymptotic expected log growth with known parameters, not finite-horizon survival or utility for every person. The finite challenge is a reproducible experiment; passing does not establish robustness to unknown distributions.

## References
- J. L. Kelly Jr. (1956), [A New Interpretation of Information Rate](https://doi.org/10.1002/j.1538-7305.1956.tb03809.x).
- David Aldous, UC Berkeley, [Kelly criterion and expected logarithmic growth](https://www.stat.berkeley.edu/~aldous/Real_World/kelly.html).
