# McQuerious

An interactive portfolio exploring finance, economics and data science.

## Projects

- **Filing Lens** — search real company annual reports; standalone attached project.
- **One More Trade** — a fictional stock-trading simulation.
- **Subsidizing Competition** — original HIR Bronze essay; standalone attached project.
- **The Prediction Lab** — regression, probability and correlation experiments.
- **The Poker Table** — Texas Hold'em with computer opponents and optional probability exploration.

The six removed projects are no longer listed or routed. Earlier source is retained as unlinked archives.

## Run locally

```powershell
npm ci
npm run dev
```

Open http://127.0.0.1:5180 and keep the terminal open. Run `npm test` for 45 tests and `npm run build` to build the static website.

## Publish

See [DEPLOYMENT.md](DEPLOYMENT.md). The GitHub Actions workflow tests, builds and deploys to GitHub Pages. Relative asset URLs support repository subfolders. Publication needs a destination GitHub repository; none is connected yet.

## Filing Lens collection

The dated Nasdaq-100 reference snapshot contains 100 company records, with 28 indexed reports and 4,489 searchable pages. Missing coverage is explicit. Reports come from AnnualReports.com; archive years can differ from fiscal reporting years. The reference company list comes from Wikipedia and is not independently certified by Nasdaq. Saved searches stay in the visitor's browser. Data refresh is manual.

React, strict TypeScript and Vite. Existing models and archived tests are preserved. No API keys, authentication or backend are required to run the published site.
