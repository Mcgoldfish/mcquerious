# The Prediction Lab

DS/Maths route #/experiments/prediction-lab. English interface, graph labels, controls, accessibility text and portfolio card.
Three synthetic, seeded experiments; no external data or backend.

Regression: 12 training observations, 24 hidden test observations and 3 independent targets. Temperature normalized from 10–40°C. Generator clamp(30+45*x+15*sin(5*x)+Normal(0,8),0,100). Demand shown as continuous illustrative cup units, not integer counts.
Intuition predicts all three targets before model lines appear; lock required. Manual intercept/slope or ridge polynomial degrees 1/3/5/9. Fit uses only training set. Linear baseline same training set. Reveal freezes model and intuition; all three methods scored on identical 3 targets using RMSE. Complexity panel compares independent test errors (not the three targets), explicitly exploratory after reveal. No claim overfitting must appear in every realization.
Polynomial x basis 2*x-1, normal equations with pivoting; ridge added to non-intercept diagonal. Raw predictions scored, graph clipped to 0–100.

Probability: 32 training shots, 30 independent test shots and 3 target shots; distances normalized from 0–30m. Generator Bernoulli(sigmoid(2.7-6.5*x)). Manual bias/slope sliders; fitted baseline uses 1800 gradient steps, .5 step size and .003 slope penalty. Brier scored on same target shots; separate 30-shot model test scores. No empirical football accuracy claims. Model curves and outcomes gated behind intuition lock and result reveal respectively.

Correlation: 60 points, common binary weather cause shifts x/y by 37/40; independent Normal(0,7) noise. Intervention only shifts x by 0–20. Group filter exposes common-cause confounding. The causal conclusion is specified by this synthetic structural mechanism, not inferred from correlation alone.

Modes retain state when switching. New challenge replaces seed and resets all three modes. No local persistence. No new dependencies, publication or authentication.
