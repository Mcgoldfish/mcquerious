import './project-header.css';
import {assetUrl} from '../assetUrl';

type ProjectHeaderProps = {title: string; category: string; standaloneHref?: string};

export function ProjectHeader({title, category, standaloneHref}: ProjectHeaderProps) {
  return <header className="project-header">
    <a className="project-back" href="#experiments">← McQuerious</a>
    <span className="project-category">{category}{standaloneHref ? ' · ATTACHED PROJECT' : ''}</span>
    {standaloneHref
      ? <a className="project-topic" href={assetUrl(standaloneHref)} target="_blank" rel="noopener" aria-label={`Open ${title} in a standalone page`}>{title} ↗</a>
      : <span className="project-topic">{title}</span>}
  </header>;
}
