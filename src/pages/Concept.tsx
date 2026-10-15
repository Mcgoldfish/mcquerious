import type {ExperimentConcept} from '../experiments/registry';

export function Concept({experiment}: {experiment: ExperimentConcept}) {
  return <main className="concept">
    <a className="back" href="#experiments">← All proposed worlds</a>
    <p className="eyebrow">{experiment.category} · PROPOSED CONCEPT</p>
    <h1>{experiment.title}</h1><h2>{experiment.question}</h2>
    <p className="concept-description">{experiment.description}</p>
    <div className="concept-status"><strong>Still on the drawing board.</strong><p>This page describes a possible experience. Its stage design, mathematical model, and implementation have not been approved for development.</p></div>
    <p className="eyebrow">POSSIBLE DIRECTIONS</p><ul className="topic-list">{experiment.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
    <a className="primary" href="#experiments">Back to the ideas →</a>
  </main>;
}
