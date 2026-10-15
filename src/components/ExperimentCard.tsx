import type {ExperimentConcept} from '../experiments/registry';
import {assetUrl} from '../assetUrl';

export function ExperimentCard({experiment}: {experiment: ExperimentConcept}) {
  const active = experiment.status === 'step-one';
  const research = experiment.status === 'research';
  const filing = experiment.slug === 'filing-lens';
  const trade = experiment.slug === 'stock-playground';
  const subsidies = experiment.slug === 'food-subsidies';
  const prediction = experiment.slug === 'prediction-lab';
  const poker = experiment.slug === 'texas-holdem';
  if (filing || trade || subsidies || prediction || poker) return <a className="card planned filing-cover-card" href={`#/experiments/${experiment.slug}`} aria-label={`${experiment.title} — ${filing ? 'search company reports' : subsidies ? 'read the essay' : prediction ? 'explore predictions and data' : poker ? 'play poker and explore the odds' : 'play the trading game'}`}>
    <div className="filing-cover-art"><img className="cover-light" src={assetUrl(filing ? 'covers/filing-lens.png' : subsidies ? 'covers/subsidizing-competition.png' : prediction ? 'covers/prediction-lab.png' : poker ? 'covers/poker-table.png' : 'covers/one-more-trade.png')} alt={filing ? 'Filing Lens, with a hand-drawn report and magnifying glass' : subsidies ? 'Subsidizing Competition, with a hand-drawn takeaway bag, discount ticket and coin' : prediction ? 'The Prediction Lab, with a hand-drawn scatterplot and fitted curve' : poker ? 'The Poker Table, with two hand-drawn aces and sage poker chips' : 'One More Trade, with a hand-drawn market line and gold coin'} width={subsidies || prediction || poker ? 2098 : 2100} height="749"/><img className="cover-dark" src={assetUrl(filing ? 'covers/filing-lens-dark.png' : subsidies ? 'covers/subsidizing-competition-dark.png' : prediction ? 'covers/prediction-lab-dark.png' : poker ? 'covers/poker-table-dark.png' : 'covers/one-more-trade-dark.png')} alt="" aria-hidden="true" width={subsidies || prediction || poker ? 2098 : 2100} height="749"/></div>
    <div className="card-content"><p className="eyebrow">{experiment.category}</p><h3>{experiment.title}</h3><p>{experiment.question}</p><div className="card-bottom"><span>{filing ? 'Real reports · Partial coverage' : subsidies ? 'HIR contest · Bronze' : prediction ? 'Interactive project · Predictions and data' : poker ? 'Interactive project · Strategy and probability' : 'Interactive project · Fictional market'}</span><span>{filing ? 'Search →' : subsidies ? 'Read →' : 'Play →'}</span></div></div>
  </a>;
  if (experiment.status === 'tool') return <a className={`card planned ${experiment.theme}`} href={`#/experiments/${experiment.slug}`} aria-label={`${experiment.title} — search company reports`}><div className="card-art" aria-hidden="true"><span className="pill">{experiment.standaloneHref?'ATTACHED PROJECT ↗':'SEARCH REPORTS ↗'}</span><div className="sketch">{experiment.symbol}</div><div className="sketch-line"/></div><div className="card-content"><p className="eyebrow">{experiment.category}</p><h3>{experiment.title}</h3><p>{experiment.question}</p><div className="card-bottom"><span>Real reports · Partial coverage</span><span>Search →</span></div></div></a>;
  if (experiment.status === 'investigation') return <a className={`card planned ${experiment.theme}`} href={`#/experiments/${experiment.slug}`} aria-label={`${experiment.title} — explore the investigation`}><div className="card-art" aria-hidden="true"><span className="pill">INVESTIGATION ↗</span><div className="sketch">{experiment.symbol}</div><div className="sketch-line"/></div><div className="card-content"><p className="eyebrow">{experiment.category}</p><h3>{experiment.title}</h3><p>{experiment.question}</p><div className="card-bottom"><span>4 real transfers · Pilot study</span><span>Investigate →</span></div></div></a>;
  return <a className={`card planned ${experiment.theme}`} href={`#/experiments/${experiment.slug}`} aria-label={`${experiment.title} — ${research?'read the essay':active?'play the project':'view proposed concept'}`}>
    <div className="card-art" aria-hidden="true"><span className="pill">{experiment.standaloneHref?'ATTACHED PROJECT ↗':research?'READ ESSAY ↗':active?'PLAY NOW ↗':'PROPOSED CONCEPT'}</span><div className="sketch">{experiment.symbol}</div><div className="sketch-line"/></div>
    <div className="card-content"><p className="eyebrow">{experiment.category}</p><h3>{experiment.title}</h3><p>{experiment.question}</p><div className="card-bottom"><span>{research?'HIR contest · Bronze':active?'Interactive project':'Not yet built'}</span><span>{research?'Read →':active?'Play →':'Explore the idea →'}</span></div></div>
  </a>;
}




