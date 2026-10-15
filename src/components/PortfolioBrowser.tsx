import {useState} from 'react';
import {experiments} from '../experiments/registry';
import {ExperimentCard} from './ExperimentCard';

const types = ['All', 'Projects', 'Interactives', 'Documents'] as const;
const fields = ['All fields', 'Econ', 'DS', 'Finance'] as const;

export function PortfolioBrowser() {
  const [type, setType] = useState<typeof types[number]>('All');
  const [field, setField] = useState<typeof fields[number]>('All fields');
  const [query, setQuery] = useState('');
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = experiments.filter(item => {
    const text = [item.title, item.question, item.description, item.category, item.contentType, item.field, ...item.topics].join(' ').toLowerCase();
    return (type === 'All' || item.contentType === type) && (field === 'All fields' || item.field === field) && words.every(word => text.includes(word));
  });
  return <section id="experiments">
    <div className="section-title"><h2>A collection of curiosities</h2><span>BUILD · EXPLORE · READ</span></div>
    <div className="portfolio-controls">
      <div className="type-filters" role="group" aria-label="Content type">{types.map(value => <button key={value} aria-pressed={type === value} onClick={() => setType(value)}>{value}</button>)}</div>
      <label className="portfolio-search"><span>Search the collection</span><input type="search" placeholder="Try probability, markets, regression…" value={query} onChange={event => setQuery(event.target.value)}/></label>
      <div className="field-filters" role="group" aria-label="Field"><span>FIELD</span>{fields.map(value => <button key={value} aria-pressed={field === value} onClick={() => setField(value)}>{value}</button>)}</div>
    </div>
    <p className="collection-count" role="status" aria-live="polite">{results.length} {results.length === 1 ? 'item' : 'items'}{type !== 'All' ? ` · ${type}` : ''}{field !== 'All fields' ? ` · ${field}` : ''}</p>
    <div className="portfolio-groups">{types.filter(value => value !== 'All' && (type === 'All' || type === value)).map(value => {
      const items = results.filter(item => item.contentType === value);
      return items.length > 0 && <section key={value} className="portfolio-group"><h3>{value} <span className="group-caption">{value === 'Projects' ? 'Tools built to be useful.' : value === 'Interactives' ? 'Explore a question through play and research.' : 'Essays, arguments, and written research.'}</span></h3><div className="grid">{items.map(item => <ExperimentCard key={item.slug} experiment={item}/>)}</div></section>;
    })}</div>
    {results.length === 0 && <div className="collection-empty"><h3>No matches this time.</h3><p>Try another topic, or clear the filters to see everything.</p><button onClick={() => {setType('All'); setField('All fields'); setQuery('');}}>Clear filters</button></div>}
  </section>;
}
