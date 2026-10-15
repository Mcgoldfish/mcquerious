
import {PortfolioBrowser} from '../components/PortfolioBrowser';


export function Home() {
  return <main>
    <section className="hero"><div><p className="eyebrow"><span className="status-dot"/> FOLLOW A QUESTION. SEE WHERE IT LEADS.</p><h1>Big ideas.<br/>Small <em>experiments.</em></h1><p className="hero-copy">Play with money, chance, and the hidden systems<br className="desktop"/> shaping everyday life.</p><div className="hero-actions"><a className="primary" href="#/experiments/stock-playground">Try One More Trade <span>↗</span></a><a className="browse-link" href="#experiments">Browse the projects ↓</a></div><p className="hero-note">No textbook required. Just a little curiosity.</p></div></section>
    <PortfolioBrowser/>
    <section id="about" className="about"><p className="eyebrow">THE IDEA BEHIND MCQUERIOUS</p><h2>Understanding begins<br/>with “what if?”</h2><p>The aim is to build little worlds with real mathematical rules. Make a prediction, change something, and discover the consequences. Start with intuition; reach deeper models through play.</p><span>Finance, economics & data science</span></section>
  </main>;
}






