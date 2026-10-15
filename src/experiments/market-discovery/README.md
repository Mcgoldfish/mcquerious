# The mystery-box market

Main investigation: when should you trust a market price? Audience-facing title: Everyone’s buying. Should you?

## Story arc
1. The crowd: stop at a busy stall; watch eight shoppers; buy or pass; open a sealed box. These connected interactions form one concept and one slide. Repeat with another seeded box inside that slide.
2. A peek behind the counter: some shoppers may have seen inside. Planned comparison of the same market with and without private information.
3. The rumour: discover that several shoppers share one source. Planned investigation of independent evidence versus repetition.
4. The rush: shoppers start copying previous purchases. Planned investigation of feedback and herd behaviour.
5. Your market: change one rule and investigate whether the price becomes a better guide. Planned synthesis rather than a quiz.

Only chapter 1 is implemented. Slide 2 is explicitly a narrative preview, not a working experiment. All later chapters remain discussion drafts. Preserve choices when returning from the preview.

## Opening model
First scene is authored: prize 30, initial price 47, shopper willingness values [62,80,70,90,88,40,95,76]. Final price is 72 with seven purchases. Subsequent rounds use seeded Mulberry32 draws, integer prize 0–100, initial price 35–55, and independent shopper willingness 20–100. No shopper knows the prize in chapter 1. Willingness does not depend on prize. At each arrival, shopper buys iff willingness >= asking price. Stallholder adds 4 after buying, subtracts 3 after passing, with asking price bounded to 1–100. Visitor decides at the final posted price. Buying receives the prize and spends that price; passing spends and receives zero. Each scene provides a fresh 100-coin budget. All boxes in a scene share the fixed prize; this is a toy posted-price mechanism, not an equilibrium or real marketplace.

## Presentation
Watch/pause the shoppers or advance one at a time. The chart plots the actual posted-price sequence; only reveal adds the horizontal prize line. The box opens in the same scene. No report, likelihood curve, price-as-probability assumption or academic vocabulary is required at entry. Technical notes are optional.

## Chapter 2 — implemented
A fresh batch starts at seed 43. Choose which shopper sees the prize, predict the effect, and replay with/without the peek together. Compare posted-price paths on a shared 0–100 scale. Then buy/pass at the informed branch's final asking price and reveal what the shopper saw. The reveal explains the threshold information contained in buying or passing, without claiming the final price is guaranteed accurate.

Paired model: same prize, starting quote, shopper order and original willingness values. Only the chosen shopper's willingness is replaced with the known prize. Both branches apply the identical +4/−3 quote rule. Later shoppers retain spending limits but their decisions may differ because the prior quote changed. No imitation is introduced yet. Pausing/stepping acts on both replays. Changing shopper after a reveal is explicitly a rewind of known conditions; a new seeded batch hides a new prize.

Chapter 3, The Rumour, remains planned. No automatic expansion.
