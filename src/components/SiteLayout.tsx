import {BirdPerch} from './BirdPerch';
import {CursorCat} from './CursorCat';
import type {ReactNode} from 'react';

export function SiteLayout({children}: {children: ReactNode}) {
  return <>
    <CursorCat/>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="portfolio-header">
      <a className="brand" href="#"><span className="brand-icon" aria-hidden="true">✳</span>McQuerious</a>
      <nav aria-label="Main navigation"><a href="#experiments">The ideas</a><a href="#about">The philosophy ↗</a></nav>
      <BirdPerch/>
    </header>
    <div id="main-content" tabIndex={-1}>{children}</div>
    <footer><a className="brand" href="#">McQuerious</a><span>Economics, finance & data science. Made tangible.</span><span>Foundation in progress</span></footer>
  </>;
}
