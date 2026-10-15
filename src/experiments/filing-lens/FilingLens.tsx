import './filing-lens.css';
import {assetUrl} from '../../assetUrl';

/** Isolates the report-search interface and worker from portfolio/game styles. */
export default function FilingLens() {
  return <main className="fl-world">
    
    <iframe className="fl-world-frame" src={assetUrl('filing-lens/index.html')} title="Filing Lens — search real company annual reports"/>
  </main>;
}
