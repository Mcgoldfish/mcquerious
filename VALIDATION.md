# Current validation: One More Trade

All 19 model tests pass: five active stock-model tests, five preserved mystery-box tests and nine legacy tests. TypeScript and Vite production build pass.

Browser checks: initial buy at 50.00, advance to 51.15, sell all: cash and total wealth 1,001.15, realized profit 1.15 and two recorded trades. Live playback advanced to tick 30 with visible fluctuations; pause restored manual controls. At mobile viewport 390 x 844, buy maximum and sell all completed, and New market restored 1,000 coins, zero shares, tick zero and empty receipts. Trading desk is visible and document width does not exceed viewport width. Desktop and mobile chart/layout screenshots inspected.

This is a fictional uncalibrated price generator, not real financial execution. Alternating drift phases may finish against their intended trend due to random fluctuations. Previous story validation is superseded.

# Poker portfolio validation

27 model tests and TypeScript/Vite build pass, including eight poker tests. Randomized hands cover 2–9 seats with conserved chips and bounded termination. Side-pot eligibility, odd-chip splits, short all-in raises, ace-low straights, kickers and all-in runouts are verified.

Browser checks: selected two total seats and confirmed one computer plus user; enabled simulated equity; all-in ended by opponent folding, user finished with 1,020 chips and opponent 980; next hand rotated dealer and preserved stacks. Selected nine seats, confirmed eight computers, and checked 390 x 844 viewport with no horizontal overflow. Mobile cards, actions and probability panel inspected. A normal heads-up hand advanced through flop and turn with visible board changes and recomputed equity.
The normal browser hand also completed river and showdown: opponent cards revealed, user won the 40-chip pot on kicker comparison, and ending stacks were 1,020 / 980.

Round-table revision: inspected four- and nine-seat arrangements, verified betting controls are descendants of the green table, and exercised Call inside the table. At 390-pixel mobile viewport, eight opponent seats render without horizontal overflow and the betting dock stays within the table boundary. All 27 tests pass.


## Filing Lens integration

45 tests pass and TypeScript/Vite build passes. Two new regression checks load compressed and already decompressed report transport, verify Apple-only search results, and verify no-match queries. Browser verification: Finance card opens the project; subscription search returns 143 pages across 16 indexed companies; original PDF page links and metadata render inside the embedded interface. The worker detects gzip magic bytes to avoid double decompression under Vite. Integrated layout screenshot inspected. Coverage remains 28 indexed companies and 4,489 pages, with 72 unavailable companies listed. Local server retained on 127.0.0.1:5180.

Filing Lens alignment fix: its outer main now explicitly sets width:100% and max-width:none, matching the other full-width mini projects and overriding the shared portfolio width constraint. Browser geometry confirms root and iframe start at x=0 and span the viewport. Updated screenshot inspected; all 45 tests and production build pass.

Filing Lens copy simplification: 45 tests and production build pass. Browser confirmed subscription returns 143 pages across 16 companies, Sources opens with coverage and provenance, and clearing the query returns the minimal landing page. Screenshot inspected.

Filing Lens workspace redesign: all 45 tests and production build pass. Browser verified collection cards, selecting ASML from a card, supply-chain search returning 74 ASML pages, clearing query and resetting filters back to all 28 report cards. New layout screenshot inspected.

Restored search layout: all 45 tests and production build pass; browser verified subscription results and clearing input to return to the minimal centered landing page. Refined screenshot inspected.

Shared project-header validation: all 45 tests and production build pass. Browser checked all six active routes: exactly one shared header each, 76px desktop height and 20px back-link text. Filing Lens and essay links target their standalone pages with target=_blank. Standalone essay loads all 12 original paragraphs and retains the PDF download; built static assets include both standalone projects. Screenshots inspected.


GitHub Pages preparation: all 45 tests and production build pass. Browser tested the production output under /small-worlds/: homepage has exactly five projects and no proposal count; Filing Lens iframe/source URL remains under the subpath and subscription returns 143 pages across 16 companies; essay standalone and PDF links are relative. GitHub publication is not yet performed because no remote repository is configured.

## McQuerious local validation — 2026-10-15
- Production TypeScript/Vite build passed.
- Existing test suite: 45 passed, zero failed.
- Origin configured as https://github.com/Mcgoldfish/mcquerious.git.
- Local preview: http://127.0.0.1:5180/.
- Browser inspection blocked by app browser URL policy; responsive visual QA and coin button verification remain unverified.
- No push or publication performed; design awaits user review.
