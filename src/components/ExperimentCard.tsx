import type {ExperimentConcept} from '../experiments/registry';
import {assetUrl} from '../assetUrl';
const readmePaths: Record<string, string> = {'prediction-lab':'prediction-lab','food-subsidies':'food-subsidies','texas-holdem':'holdem','stock-playground':'stock-playground'};
const summaries: Record<string, string> = {
  'elixir-quant': 'Test trading ideas on historical stock data and compare returns, drawdowns, and risk.',
  'filing-lens': 'Search company reports by topic and explore the original passages behind the results.',
  'pricehunter': 'Constructing',
  'common-poker': 'Multiplayer Texas Hold’em for two to four people, using play chips.',
  'unlayer': 'Separate a song into vocals, drums, bass, and other sounds, right in your browser.',
  'prediction-lab': 'Make predictions, fit simple models, and explore what the data reveals.',
  'food-subsidies': 'An essay on consumer welfare and market power in China’s food-delivery market.',
  'texas-holdem': 'Play against computer opponents and explore the probabilities behind each hand.',
  'stock-playground': 'Trade in a fictional stock market and explore decisions under uncertainty.',
};
export function ExperimentCard({experiment}: {experiment: ExperimentConcept}) {
  const hunter = experiment.slug === 'pricehunter';
  const constructing = experiment.status === 'constructing';
  const unlayer = experiment.slug === 'unlayer';
  const quant = experiment.slug === 'elixir-quant';
  const filing = experiment.slug === 'filing-lens';
  const subsidies = experiment.slug === 'food-subsidies';
  const prediction = experiment.slug === 'prediction-lab';
  const poker = experiment.slug === 'common-poker';
  const cover = hunter ? 'pricehunter' : unlayer ? 'unlayer' : quant ? 'elixir-quant' : filing ? 'filing-lens' : subsidies ? 'subsidizing-competition' : prediction ? 'prediction-lab' : poker ? 'common-poker' : 'one-more-trade';
  const coverAlt = hunter ? 'Price Hunter, with a watercolor magnifying glass, price tag and price-history line' : unlayer ? 'Unlayer, with watercolor headphones and separated sound waves' : quant ? 'Elixir Quant, with a research chart and an illustrated flask' : filing ? 'Filing Lens, with a hand-drawn report and magnifying glass' : subsidies ? 'Subsidizing Competition, with a hand-drawn takeaway bag, discount ticket and coin' : prediction ? 'The Prediction Lab, with a hand-drawn scatterplot and fitted curve' : poker ? 'Common Poker, with two hand-drawn aces and sage poker chips' : 'One More Trade, with a hand-drawn market line and gold coin';
  const href = experiment.liveHref ?? (poker ? experiment.repositoryHref! : '#/experiments/' + experiment.slug);
  const readmeHref = experiment.repositoryHref ? experiment.repositoryHref + '#readme' : 'https://github.com/Mcgoldfish/mcquerious/blob/main/src/experiments/' + readmePaths[experiment.slug] + '/README.md';
  const fields = hunter || unlayer ? 'Data Science' : quant || filing ? 'Finance · Data Science' : subsidies ? 'Economics' : prediction || poker ? 'Data Science · Mathematics' : 'Finance';
  return <article className="card planned filing-cover-card">
    <div className="filing-cover-art"><img className="cover-light" src={assetUrl(`covers/${cover}.png`)} alt={coverAlt} width={hunter || quant || subsidies || prediction || poker ? 2098 : 2100} height="749"/><img className="cover-dark" src={assetUrl(`covers/${cover}-dark.png`)} alt="" aria-hidden="true" width={hunter || quant || subsidies || prediction || poker ? 2098 : 2100} height="749"/></div>
    <div className="card-content project-summary">
      <p className="eyebrow">{fields}</p><h3>{experiment.title}</h3>
      <p className="project-description">{summaries[experiment.slug]}</p>{poker && <p className="project-credit">Created with <a href="https://moreallure.work/" target="_blank" rel="noopener noreferrer">Moreallure ↗</a></p>}
      {!constructing && <div className="project-links">
        <a className="project-readme" href={readmeHref} target="_blank" rel="noopener noreferrer" aria-label={experiment.title + ' — read description on GitHub'} title="Read description on GitHub">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.63 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.04.76 2.1v3.08c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z"/></svg>
        </a>
        <a className="project-open" href={href} target={experiment.liveHref || poker ? '_blank' : undefined} rel={experiment.liveHref || poker ? 'noopener noreferrer' : undefined}>Open app <span aria-hidden="true">↗</span></a>
      </div>}
    </div>
  </article>;
}

