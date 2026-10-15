# The Poker Table

Texas Hold’em under the portfolio’s DS/Maths category. Choose 2–9 total seats, including the user. Other seats are local computer opponents. Every new table starts with 1,000 fictional integer chips per seat. Stacks persist across hands; dealer rotates. Blinds stay 10 / 20; busted seats sit out. Restart resets all stacks. No multiplayer, real money or persistent storage.

## Rules and accounting
Two private cards; a burned card before the three-card flop, one-card turn and one-card river. Betting precedes the flop and follows each street. Heads-up dealer posts the small blind and acts first pre-flop; big blind acts first after the flop. At larger tables action begins after the big blind pre-flop and after the dealer post-flop.

Check/call, fold, raise-to and all-in. The minimum initial bet is 20; full raises increase the minimum increment. Short all-in raises require outstanding players to match but do not reopen raising for someone who has acted unless subsequent increases cumulatively reach the required increment. Whole-chip orders are validated against the latest state.

Best five of seven cards, exhaustive five-card combinations with category and lexicographic kicker comparisons. Ace-low straights are supported. Contribution levels form separate pots; folded contributions count but folded hands cannot win. Uncalled amounts return to their contributor. Ties split each relevant pot with odd chips assigned clockwise after the dealer. Ending by folds does not reveal opponents’ cards. Showdown reveals live hands.

Rule reference: https://www.pokerstars.com/poker/games/rules/ and https://www.pokerstars.com/help/articles/poker-rules-master/229192/.

## Randomness and opponents
Mulberry32 and Fisher–Yates produce reproducible shuffled decks. New table increments the seed; hand seeds also vary. Computer decisions use only their own private cards, shared board, public bets and deterministic random draws. They are simple heuristic opponents, not optimal poker agents. They never inspect other private hands or undealt cards.

## Optional probability view
600 Monte Carlo deals sampled without replacement from the remaining deck after removing only the user’s visible private cards and shared board. Finish the board and deal uniform random private hands to the remaining opponents. Equity averages 1 for a sole win, 1 / tied winners for a tie, and 0 for a loss. This is an equal-pot showdown comparison; it ignores side-pot amounts, folded-card information, hand ranges, future folds and future betting. The result is an estimate with sampling error, not the chance against the bots’ actual hidden cards. A simple call / (pot + call) threshold is shown with its side-pot and future-bet limitations.

## Verification
Eight model tests check all categories, best-five selection, kickers, ace-low straights, reproducible unique decks, seat counts, heads-up order, street progression, button rotation, full and short raises, immutability, main/side pots, split/odd chips, all-in runouts and equity. Ninety-six randomized hands test termination and chip conservation across 2–9 seats.

Layout: players sit at radial positions around capsule-shaped felt with straight top and bottom edges and semicircular ends. Shared cards occupy the centre; the user sits at the bottom with betting and next-hand controls inside the table. Dense mobile layouts compact opponent seats. The probability panel remains below the table.


