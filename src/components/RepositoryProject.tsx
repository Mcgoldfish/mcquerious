import type {ExperimentConcept} from '../experiments/registry';

export function RepositoryProject({experiment}: {experiment: ExperimentConcept}) {
  return <main className="concept">
    <a className="back" href="#experiments">← All projects</a>
    <p className="eyebrow">{experiment.category}</p>
    <h1>{experiment.title}</h1><h2>{experiment.question}</h2>
    <p className="concept-description">{experiment.description}</p>
    <ul className="topic-list">{experiment.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
    {experiment.repositoryReady && experiment.repositoryHref
      ? <a className="primary" href={experiment.repositoryHref}>View repository on GitHub ↗</a>
      : <p className="concept-description">The standalone public edition is prepared. Its GitHub repository is awaiting publication.</p>}
    {experiment.slug === 'filing-lens' && <p><a href="#/experiments/filing-lens">Open the report search →</a></p>}
  </main>;
}
