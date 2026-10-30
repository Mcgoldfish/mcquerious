import {experiments} from '../experiments/registry';
import {ExperimentCard} from './ExperimentCard';

const types = ['Projects', 'Interactives', 'Documents'] as const;

export function PortfolioBrowser() {
  const results = experiments;
  return <section id="experiments">
    <div className="section-title"><h2>A collection of curiosities</h2><span>BUILD · EXPLORE · READ</span></div>
    <p className="collection-count" role="status" aria-live="polite">{results.length} {results.length === 1 ? 'item' : 'items'}</p>
    <div className="portfolio-groups">{types.map(value => {
      const items = results.filter(item => item.contentType === value);
      if (!items.length) return null;
      return <section key={value} className="portfolio-group"><h3>{value} <span className="group-caption">{value === 'Projects' ? 'Tools built to be useful.' : value === 'Interactives' ? 'Explore a question through play and research.' : 'Essays, arguments, and written research.'}</span></h3>{items.length ? <div className="grid">{items.map(item => <ExperimentCard key={item.slug} experiment={item}/>)}</div> : <p className="group-empty">No {value.toLowerCase()} match this field.</p>}</section>;
    })}</div>
  </section>;
}

