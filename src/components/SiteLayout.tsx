
import type {ReactNode} from 'react';

export function SiteLayout({children, flight = false}: {children: ReactNode; flight?: boolean}) {
  return <>

    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="portfolio-header">
      <a className="brand" href="#"><span className="brand-icon" aria-hidden="true">✳</span>McQuerious</a>
      <nav aria-label="Main navigation"><a href="#">Main</a><a href="#/explore">Explore</a></nav>
    </header>
    <div id="main-content" tabIndex={-1}>{children}</div>
    {!flight && <footer><a className="brand" href="#">McQuerious</a><span>Economics, finance & data science. Made tangible.</span><span>Foundation in progress</span></footer>}
  </>;
}

