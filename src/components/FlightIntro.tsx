import {useEffect, useRef} from 'react';
import {assetUrl} from '../assetUrl';
import {experiments} from '../experiments/registry';
import './flight.css';

const descriptions: Record<string, string> = {
  'elixir-quant': 'Test trading ideas on historical stock data and compare returns and risk.',
  'filing-lens': 'Search company reports by topic and read the passages behind the results.',
  'unlayer': 'Separate a song into vocals, drums, bass and other sounds in your browser.',
  'pricehunter': 'A price-tracking project in development, exploring product prices over time.',
  'prediction-lab': 'Make predictions, fit models and explore what the data reveals.',
  'food-subsidies': 'An essay on consumer welfare and market power in China’s food-delivery market.',
  'texas-holdem': 'Play Texas Hold’em against computer opponents and explore the odds.',
  'stock-playground': 'Trade in a fictional stock market and explore decisions under uncertainty.',
};

export function FlightIntro() {
  const journey = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = journey.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = element.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -element.getBoundingClientRect().top / Math.max(distance, 1)));
      element.style.setProperty('--flight', String(progress));
      experiments.forEach((_, index) => {
        const local = (progress - (0.09 + index * 0.105)) / 0.17;
        const opacity = Math.max(0, Math.min(1, local * 6, (1 - local) * 6));
        element.style.setProperty(`--board-${index}-scale`, String(Math.max(.12, .18 + local * 2.2)));
        element.style.setProperty(`--board-${index}-opacity`, String(opacity));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); };
  }, []);
  return <section className="flight" ref={journey} aria-labelledby="flight-title">
    <div className="flight-stage">
      <div className="flight-stars" aria-hidden="true"/><div className="flight-nebula" aria-hidden="true"/>
      <div className="flight-intro"><p className="flight-kicker">A PORTFOLIO IN MOTION <span>✳</span></p><h1 id="flight-title">Curiosity is<br/><em>going places.</em></h1><p>Hi, I’m McQueen Xu. Scroll to travel through a collection of ideas and experiments.</p><a href="#/explore">Skip the journey <span aria-hidden="true">↗</span></a></div>
      <div className="flight-boards" aria-hidden="true">{experiments.map((project, index) => <div key={project.slug} className="flight-board" style={{transform: `translate(-50%, -50%) scale(var(--board-${index}-scale, .12))`, opacity: `var(--board-${index}-opacity, 0)`}}><div className="board-top"><span>MCQUERIOUS / PROJECT {String(index + 1).padStart(2, '0')}</span><span>{project.status === 'constructing' ? 'IN DEVELOPMENT' : project.category}</span></div><h2>{project.title}</h2><img src={assetUrl(`flight/${project.slug}.png`)} alt=""/><div className="board-copy"><p>{descriptions[project.slug]}</p><span>EXPLORE THE COLLECTION ↗</span></div></div>)}</div>
      <div className="flight-end"><span>END OF THE JOURNEY</span><h2>There’s more to explore.</h2><a href="#/explore">Explore the collection <span aria-hidden="true">↗</span></a></div>
      <div className="flight-rocket" aria-hidden="true"><svg viewBox="0 0 80 130" fill="none"><path d="M40 5C25 21 21 48 24 78L17 96 31 90H49L63 96 56 78C59 48 55 21 40 5Z" fill="#f1eadb" stroke="#222333" strokeWidth="2"/><path d="M29 23C32 15 36 9 40 5C44 9 48 15 51 23" fill="#d78562"/><circle cx="40" cy="48" r="9" fill="#8396bf" stroke="#222333" strokeWidth="2"/><path d="M31 90L34 108L40 99L46 108L49 90" fill="#e69b66" stroke="#222333" strokeWidth="2"/><path d="M36 108L40 123L44 108" stroke="#e8bc79" strokeWidth="2"/></svg></div>
      <div className="flight-bottom"><span>SCROLL TO TRAVEL <b>↓</b></span><span>IDEAS &nbsp; / &nbsp; EXPERIMENTS &nbsp; / &nbsp; RESEARCH</span></div>
      <div className="flight-progress" aria-hidden="true"><span/></div>
    </div>
  </section>;
}
