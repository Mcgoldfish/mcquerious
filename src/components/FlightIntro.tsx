import {useEffect, useRef} from 'react';
import './flight.css';

const worlds = [
  {name: 'Finance', number: '01', className: 'finance', copy: 'Markets, risk, and the decisions in between.'},
  {name: 'Economics', number: '02', className: 'economics', copy: 'The systems and incentives shaping our world.'},
  {name: 'Data & maths', number: '03', className: 'data', copy: 'Patterns, probability, and a little experimentation.'},
];

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
      worlds.forEach((_, index) => {
        const local = (progress - (0.12 + index * 0.245)) / 0.32;
        const visibility = Math.max(0, Math.min(1, local * 5, (1 - local) * 5));
        element.style.setProperty(`--world-${index}-scale`, String(Math.max(.12, .18 + local * 2.5)));
        element.style.setProperty(`--world-${index}-opacity`, String(visibility));
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
      <div className="flight-intro"><p className="flight-kicker">A PORTFOLIO OF LITTLE WORLDS <span>✳</span></p><h1 id="flight-title">Curiosity is<br/><em>going places.</em></h1><p>Hi, I’m McQueen Xu. Come explore the ideas, experiments, and questions in my orbit.</p><a href="#experiments">Explore the collection <span aria-hidden="true">↗</span></a></div>
      <div className="flight-worlds" aria-hidden="true">{worlds.map((world, index) => <div key={world.name} className={`flight-world world-${world.className}`} style={{transform: `translate(-50%, -50%) scale(var(--world-${index}-scale, .12))`, opacity: `var(--world-${index}-opacity, 0)`}}><div className="planet-ring"/><div className="planet-sphere"/><div className="planet-label"><span>DESTINATION {world.number}</span><strong>{world.name}</strong><small>{world.copy}</small></div></div>)}</div>
      <div className="flight-rocket" aria-hidden="true"><svg viewBox="0 0 80 130" fill="none"><path d="M40 5C25 21 21 48 24 78L17 96 31 90H49L63 96 56 78C59 48 55 21 40 5Z" fill="#f1eadb" stroke="#263e35" strokeWidth="2"/><path d="M29 23C32 15 36 9 40 5C44 9 48 15 51 23" fill="#d78562"/><circle cx="40" cy="48" r="9" fill="#7ca0a0" stroke="#263e35" strokeWidth="2"/><path d="M31 90L34 108L40 99L46 108L49 90" fill="#e69b66" stroke="#263e35" strokeWidth="2"/><path d="M36 108L40 123L44 108" stroke="#e8bc79" strokeWidth="2"/></svg></div>
      <div className="flight-bottom"><span>SCROLL TO TRAVEL <b>↓</b></span><span>FINANCE &nbsp; / &nbsp; ECONOMICS &nbsp; / &nbsp; DATA</span></div>
      <div className="flight-progress" aria-hidden="true"><span/></div>
    </div>
  </section>;
}
