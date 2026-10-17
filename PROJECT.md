# Small Worlds

## Standalone public projects — 2026-10-17

Elixir Quant and Filing Lens have separate public-release folders at ../elixir-quant and ../filing-lens. Matching image-led project cards lead to repository guides until remote publication is verified. Repository destinations and publication flags live in src/experiments/registry.ts; enable repositoryReady only after the corresponding GitHub repository exists. Elixir Quant is built independently with synthetic data and a simple educational strategy; the private trade-dashboard project is untouched. Filing Lens's existing embedded route remains accessible from its guide. GitHub publication is pending authentication.

A personal interactive economics, finance and data-science portfolio. Current experience: One More Trade. Buy, wait and sell as uncertain prices change. Keep the opening concrete, playful and short. The other five concepts remain proposals.

React, strict TypeScript and Vite; hash routes in App.tsx, shared cards and pages, discovery metadata in experiments/registry.ts. The active model, tests, chart, interface and scoped styles live in src/experiments/stock-playground. Previous mystery-box experiments and src/legacy are preserved but disconnected.

Local delivery only at http://127.0.0.1:5180 with strictPort. Preview uses 5181. Elixir Quant is independent. Do not update the earlier hosted snapshot without a publishing request.

Validate model behavior with npm test, compile with npm run build, and inspect primary interactions and responsive layout in the browser. Exact assumptions and units are documented in the experience README.

The portfolio now groups projects into Finance, Economics and DS/Maths. The Poker Table is a second playable project in src/experiments/holdem, with a tested pure poker engine and optional Monte Carlo equity. The user chooses 2–9 total players including themselves.

Subsidizing Competition is the third interactive project, under Economics. One interactive simulator connects the author's HIR bronze essay to an illustrative coupon calculation and qualitative competition/policy scenarios. The original PDF is bundled locally. See src/experiments/food-subsidies/README.md.

Four sparse variable explanation slides now precede the subsidy simulator, with skip and revisit controls.

Current Econ experience: one continuous subsidy-war simulation. Introductory slides removed. Animated order-share dots, Run/Pause/Restart, month scrubbing, shaded campaign timeline, inline help and collapsed market conditions. Changing assumptions pauses and resets time; original essay remains available.

Storefront demonstration replaces dot panels with fictional Everyday Eats and Fresh Delivery. Live meal-price boards, monthly order counts, rounded customer queues and a funding runway meter. Entrant shutter closes after model exit. Coupon and starting budget are primary controls; duration/network effects are optional. Each queue figure represents about five percentage points of order share; individual behavior is not modeled. Price board derives the effective coupon from the model average, including affordability reductions.

Current Econ edition: monthly business simulator. User sets coupon and operates one month at a time. JD and Meituan are simulated competitors; competitor offers react for the next month. Persistent cash, accounting, market shares, repeat-order estimate, End run and monthly ledger. No slideshow/playback/reset-on-coupon-edit.

Current Econ direction: research-only essay page. Simulator removed from the active interface at user request. Original PDF is embedded with open/download links; portfolio card is labeled Read essay. Earlier model files are retained but unused.

Essay presentation now uses a normal scrollable HTML text box, with original DOCX text and section headings; embedded PDF reader removed. Original PDF download retained.





The Title Race Lab is a DS/Maths probability experience at #/experiments/title-lab. Manual strengths and generated 2023–24-club schedule; 1000/5000 seeded season simulations, championship frequencies and points histogram, eight-fixture conditional radar, and scrub/play parallel universes. Not a current forecast. See src/experiments/title-lab/README.md.


The Prediction Lab is a DS/Maths experience at #/experiments/prediction-lab. Three seeded synthetic experiments: demand regression with manual/ridge polynomial models and held-out error comparisons, shot probabilities with manual/logistic curves and Brier scores, and a common-cause correlation/intervention lab. Intuition is locked before model lines, and model settings lock at reveal. See src/experiments/prediction-lab/README.md.

The Prediction Lab interface, graph labels, controls, results and project card are now in English.


## Filing Lens — Finance search tool

Search real company-report passages at http://127.0.0.1:5180/#/experiments/filing-lens. Linked from the Finance portfolio group. Includes company/industry/archive-year filters, highlighted excerpts, original PDF pages and browser-local saved searches. Current reference snapshot: 100 company records, 28 indexed reports and 4,489 searchable pages; missing coverage is explicitly listed. Archive years can differ from fiscal report years. Collection notes: src/experiments/filing-lens/README.md. Local assets only; no authentication or backend.

Filing Lens now uses minimal copy: search heading, input, coverage count, filters and report results. Marketing copy, example prompts, instructional panels and footer removed. Essential provenance remains in Sources.

Filing Lens visual direction: compact green-and-grey report workspace, sans-serif typography, filter sidebar, rectangular search bar, company collection cards, and bordered passage results. Replaces the centered serif search landing page.

Filing Lens refinement: restored the minimal centered search layout at user request. Sidebar and collection cards removed. Smaller visual differences retained: muted green accents, light background, gently squared search field and compact bordered results.

All six active projects use components/ProjectHeader.tsx for identical back-link styling, category alignment, right-hand topic and responsive height. Filing Lens and Subsidizing Competition are attached projects; their topic titles link to standalone static pages in a new tab.


Current publication scope: five projects only — Filing Lens, One More Trade, Subsidizing Competition, The Prediction Lab, The Poker Table. The six requested removals are absent from registry, homepage and routes. GitHub Pages workflow and relative asset links are prepared; repository selection/authentication are still outstanding.

Filing Lens portfolio cover: approved artistic lettering and hand-drawn report/lens image in public/covers/filing-lens.png. Description sits beside the cover on desktop and below on mobile.

Filing Lens cover refinement: removed baked-in black frame and white edges; removed enclosing card border, background and outer padding.

One More Trade uses a companion watercolor/ink cover and the same borderless responsive cover-and-description layout as Filing Lens.

Subsidizing Competition uses the matching artistic cover with a takeaway bag, discount ticket and coin, in the shared borderless responsive layout.

The Prediction Lab uses the shared artistic cover layout, with a sage fitted curve, scatter points and gold prediction point.

The Poker Table uses a matching artistic cover with two aces and sage chips, in the shared borderless responsive layout.

All illustrated project rows share desktop cover width and adjacent description alignment; legacy last-card rules exclude illustrated rows.

Light/dark mode: persistent accessible toggle across portfolio, projects and standalone pages; defaults to system preference, synchronizes Filing Lens iframe and tabs. Shared color tokens adapt surfaces, text and chart labels. Covers retain their cream artwork with reduced dark-mode brightness.

All five illustrated covers have separate charcoal-paper dark variants, selected by the saved theme without changing row layout. Original light assets remain intact; removed brightness filter.

## McQuerious migration
Independent copy prepared for https://github.com/Mcgoldfish/mcquerious. Original Aureon checkout is preserved. Branding is McQuerious throughout the copied source. Homepage retains the cream/green identity and five project groups, with a keyboard-accessible coin-toss preview, direct One More Trade entry and a browse link. Coin tosses are illustrative independent browser-random trials, not a prediction tool. Expected exact split probability is C(20,10)/2^20, approximately 17.62%.
Local review precedes publication. GitHub Pages uses the repository workflow and relative Vite assets.

## Collection navigation — 2026-10-15
Discovery now groups by content type: Projects (Filing Lens), Interactives (One More Trade, Prediction Lab, Poker Table), Documents (Subsidizing Competition). Independent Econ / DS / Finance filters combine with content type and case-insensitive topic search. Empty results offer a full reset. Research is included in the interactive section description; written research stays under Documents.

## Discovery refinement — 2026-10-15
Projects, Interactives and Documents are permanent ordered sections, not selectable filters. Native Field and Direction dropdowns filter their contents. Directions come from existing project topics and narrow to the selected field. Field changes reset direction; Clear filters restores all five items. Empty groups retain their headings and explain no matches. Removed full-text search and content-type filter buttons.

Discovery simplified: one Field dropdown (All fields, Econ, Finance, DS); no direction filter. Permanent content sections retained.

Removed the coin-toss interaction from the homepage at user request; hero now uses a single-column layout.

Field filtering now omits content sections with zero matching items, including their headings and empty-state messages. Econ displays Documents only.

Added decorative hand-drawn SVG cat on the portfolio homepage: follows desktop pointer using frame-based movement, turns, runs, and pounces nearby. Pointer events pass through; hides on touch/reduced motion and pointer exit. No external assets or dependencies.

Opening slide: full first viewport with McQuerious name, McQueen Xu introduction, staggered upward entrance, pointer-responsive typography and orbit accents, plus scroll prompt. Existing cursor cat retained. Collection follows below with natural scrolling; no scroll locking or splash gate. Reduced motion and mobile supported.

Fixed portfolio header stays at the viewport top with anchor offsets. A compact rope-hung wooden perch and woven nest attach beneath its right border. Optional Add a bird / Remove bird toggle adds an illustrated sage bird; state lasts for the current visit. Perch remains stationary during scrolling, respects reduced motion, and uses native keyboard-accessible controls.

Perch companion updated to an original rounded owl inspired by animated desktop companions. CSS idle breathing/blinks; hover or keyboard focus animates beak and both wings, tap toggles reaction. No audio. Existing reduced-motion rule suppresses animations. Add/Remove owl stays optional.

Approved Sage pixel-art owl replaces vector companion. Transparent three-pose sprite sheet bundled locally; stepped background frames provide blinking and alternating open-beak/raised-wing greeting, with subtle idle breathing. Reduced motion preserved.

Added About me link below the opening slide subtitle, targeting the existing bottom About section with the fixed-header scroll offset.

Owl sprite fix: fixed-position frame layers now switch visibility instead of animating background position, preventing sliding between adjacent sprites.

Removed cursor cat at user request. Owl frames now use explicit per-pose SVG crop windows, centered on each owl with wider wing clearance instead of equal-width sheet assumptions.

Elixir Quant public source is now published at https://github.com/Mcgoldfish/elixirquant. Its card links directly to the verified GitHub repository. Filing Lens remains pending its supplied repository URL.

Elixir Quant cover redesigned using the Filing Lens reference: textured black editorial serif lettering, ivory paper, and watercolor chart/flask illustration. The card now uses public/covers/elixir-quant.png in both themes, replacing the clean vector cover.

Elixir Quant is deployed at https://mcgoldfish.github.io/elixirquant/. Its portfolio card opens the working app; the app footer and README retain a source-code link.

Elixir Quant live app links open in a new tab with noopener/noreferrer. The public app now matches the original black/green sidebar and compact workspace format.
