# Development conventions

Current authorized scope: a personal portfolio grouped into Finance, Economics and DS/Maths. One More Trade is playable under Finance. The Poker Table is playable under DS/Maths with 2–9 total seats including the user, computer opponents and optional probability exploration. Preserve earlier experiments unlinked. The user has removed Mathematics of Ruin, Banking Domino Effect, Causal Detective, Design an Auction, Title Race Lab, and When AI Changes Reality from discovery and routes. Preserve their source only as unlinked archives. GitHub Pages preparation and publication are now authorized; the destination repository still needs to be supplied.

- Use React, strict TypeScript and Vite. Separate pure model functions from UI.
- Local delivery uses 127.0.0.1:5180 with strictPort; preview uses 5181. Do not alter Elixir Quant or republish the earlier hosted snapshot without a request.
- Keep seed-based randomness, exact portfolio accounting, documented assumptions and meaningful model tests. Run npm test and npm run build before delivery.
- Support keyboard, touch, responsive layouts and accessible labels. Keep explanatory formulas optional and opening copy short.
- Add one complete experience at a time. Never present proposals as playable.
- Maintain PROJECT.md, EXPERIMENTS.md and model notes. Preserve package-lock.json. Do not introduce APIs, authentication or backend infrastructure without a requirement.

