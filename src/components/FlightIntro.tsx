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
      const position = progress * (experiments.length - 1);
      element.style.setProperty('--flight', String(progress));
      experiments.forEach((_, index) => {
        const delta = index - position;
        const scale = Math.max(.55, 1 - Math.abs(delta) * .37);
        const opacity = Math.max(0, Math.min(1, 1.75 - Math.abs(delta)));
        element.style.setProperty(`--board-${index}-x`, `${delta * 57}vw`);
        element.style.setProperty(`--board-${index}-scale`, String(scale));
        element.style.setProperty(`--board-${index}-opacity`, String(opacity));
        element.style.setProperty(`--board-${index}-depth`, String(10 - Math.round(Math.abs(delta) * 4)));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); };
  }, []);
  return <section className="flight" ref={journey} aria-label="A journey through the projects">
    <div className="flight-stage">
      <div className="flight-orbit orbit-a" aria-hidden="true"/><div className="flight-orbit orbit-b" aria-hidden="true"/>
      <span className="flight-mark mark-a" aria-hidden="true">✳</span><span className="flight-mark mark-b" aria-hidden="true">✳</span><span className="flight-mark mark-c" aria-hidden="true">✳</span>
      <div className="flight-boards" aria-hidden="true">{experiments.map((project, index) => <div key={project.slug} className="flight-board" style={{transform: `translate(calc(-50% + var(--board-${index}-x, ${index * 57}vw)), -50%) rotate(${index % 2 === 0 ? 3 : -3}deg) scale(var(--board-${index}-scale, ${index ? .63 : 1}))`, opacity: `var(--board-${index}-opacity, ${index < 2 ? 1 : 0})`, zIndex: `var(--board-${index}-depth, ${index ? 6 : 10})`}}><h2>{project.title}</h2><div className="board-top"><span>{project.category}</span><span>{project.status === 'constructing' ? 'IN DEVELOPMENT' : '→'}</span></div><img src={assetUrl(`flight/${project.slug}.png`)} alt=""/><div className="board-copy"><p>{descriptions[project.slug]}</p><span>→</span></div></div>)}</div>
      <div className="flight-bottom">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></div>
      <div className="flight-progress" aria-hidden="true"><span/></div>
    </div>
  </section>;
}
