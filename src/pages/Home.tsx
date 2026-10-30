import './footer-layout.css';
import {FlightIntro} from '../components/FlightIntro';
import {PortfolioBrowser} from '../components/PortfolioBrowser';

export function Home() {
  return <main className="home-page"><FlightIntro/></main>;
}

export function Explore() {
  return <main className="explore-page"><PortfolioBrowser/><section id="about" className="about"><p className="eyebrow">THE IDEA BEHIND MCQUERIOUS</p><h2>Understanding begins<br/>with “what if?”</h2><p>I build tools and experiments that make ideas easier to explore. From markets and company reports to music and games, each project begins with a question and invites you to look a little closer.</p><span>Finance, economics & data science</span></section></main>;
}


