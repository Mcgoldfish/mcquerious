# One More Trade model

Price and cash are integer hundredths of a fictional coin. Initial price: 5,000; initial cash: 100,000. No real money or market data.

Mulberry32 generates deterministic uniform draws from an unsigned 32-bit seed. Box-Muller converts two draws to a standard normal z. Each tick updates price as round(previous price * exp(direction * 0.006 + 0.022 * z)), bounded to 1-100,000,000 hundredths. Direction starts at +1 and alternates after independently drawn 30-70 tick phases. Fluctuations can oppose the trend; positive drift does not guarantee a positive realized phase return. Speeds change tick duration only.

Orders execute whole shares at the current quote without fees, spread, borrowing, shorting or order impact. Purchases reduce cash and increase shares and total cost basis. Sales reduce basis proportionally using weighted-average cost; realized profit equals proceeds minus allocated cost. Marked wealth is cash + shares * quote. Total profit compares marked wealth with starting cash.

The chart stores 150 points and displays the last 100, with actual execution markers. New market increments the seed and resets holdings/history. State is not persisted. Pausing is a game convenience. This stylized process is not empirically calibrated and does not model an order book.

Five tests cover seeded reproducibility, alternating phase lengths, positive integer prices, countertrend ticks, unchanged-price wealth conservation, weighted-cost partial sales, immutability and invalid or unaffordable orders.
