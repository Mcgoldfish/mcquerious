import {FlightIntro} from '../components/FlightIntro';
import {PortfolioBrowser} from '../components/PortfolioBrowser';

export function Home() {
  return <main className="home-page"><FlightIntro/></main>;
}

export function Explore() {
  return <main className="explore-page"><PortfolioBrowser/><section id="about" className="about"><p className="eyebrow">THE IDEA BEHIND MCQUERIOUS</p><h2>Understanding begins<br/>with “what if?”</h2><p>The aim is to build little worlds with real mathematical rules. Make a prediction, change something, and discover the consequences. Start with intuition; reach deeper models through play.</p><span>Finance, economics & data science</span></section></main>;
}
