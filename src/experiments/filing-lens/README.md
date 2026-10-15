# Filing Lens

Working search tool at `#/experiments/filing-lens`, listed in Finance.

The React route embeds the isolated, local report-search application in `public/filing-lens`. No hosted Site login, new APIs, or backend is needed. A same-origin iframe prevents its styles and Web Worker from interfering with existing portfolio experiences. The standalone route is `/filing-lens/index.html`.

The 2026-10-13 Nasdaq-100 reference snapshot has 100 company records. 28 company reports are verified and indexed, with 4,489 searchable PDF pages; 72 companies are explicitly unavailable. The roster comes from Wikipedia and is not independently certified by Nasdaq. Alphabet share classes share one report. AnnualReports.com is the report source. Archive year labels follow filenames and can differ from fiscal reporting years. Read original linked PDFs to verify context, formatting, and the reporting period.

Search uses all-word matching on a PDF page, with quotation marks for exact phrases. Ranking combines phrase matches and capped occurrence counts. Company, industry, archive-year filters and relevance/year/company sorts are supported. Results paginate locally, with a 500-result cap disclosed when reached. Page-detail links open the original PDF at its one-based physical page. Text extraction may merge words or alter table order.

Saved searches are browser-local and retain matched-page counts for manual comparison after a collection refresh. No automatic alerts or scheduled refreshes. The gzip collection is searched in a Web Worker using native decompression.

The collection builder and search validation remain in the separate `sites/filing-lens` source workspace. Update local public assets only after validating report identity and search results there. Keep source metadata with the data; never substitute fabricated passages or same-ticker companies on other exchanges.
