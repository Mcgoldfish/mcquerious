import {useEffect, useRef} from 'react';
import {assetUrl} from '../assetUrl';
import {experiments} from '../experiments/registry';
import './flight.css';

const descriptions: Record<string, string> = {
  'elixir-quant': 'Test trading ideas on historical stock data and compare returns and risk.',
  'filing-lens': 'Search company reports by topic and read the passages behind the results.',
  'unlayer': 'Separate a song into vocals, drums, bass and other sounds in your browser.',
  'pricehunter': 'A price-tracking project in development, exploring product prices over time.',
  'common-poker': 'Play multiplayer Texas Hold’em with two to four people using play chips.',
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
        const local = (progress - (0.09 + index * 0.16)) / 0.23;
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
      <div className="flight-boards" aria-hidden="true">{experiments.map((project, index) => <div key={project.slug} className="flight-board" style={{transform: `translate(-50%, -50%) perspective(1400px) rotateY(${index % 2 === 0 ? -9 : 9}deg) rotateZ(${index % 2 === 0 ? 2 : -2}deg) scale(var(--board-${index}-scale, .12))`, opacity: `var(--board-${index}-opacity, 0)`}}><div className="board-top"><span>MCQUERIOUS / PROJECT {String(index + 1).padStart(2, '0')}</span><span>{project.status === 'constructing' ? 'IN DEVELOPMENT' : project.category}</span></div><h2>{project.title}</h2><img src={assetUrl(`flight/${project.slug}.png`)} alt=""/><div className="board-copy"><p>{descriptions[project.slug]}</p><span>EXPLORE THE COLLECTION ↗</span></div></div>)}</div>
      <div className="flight-end"><span>END OF THE JOURNEY</span><h2>There’s more to explore.</h2><a href="#/explore">Explore the collection <span aria-hidden="true">↗</span></a></div>
      <div className="flight-bottom"><span>SCROLL TO TRAVEL <b>↓</b></span><span>IDEAS &nbsp; / &nbsp; EXPERIMENTS &nbsp; / &nbsp; RESEARCH</span></div>
      <div className="flight-progress" aria-hidden="true"><span/></div>
    </div>
  </section>;
}
