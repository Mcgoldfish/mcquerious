import {useEffect, useRef} from 'react';

export function WelcomeSlide() {
  const slide = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = slide.current;
    if (!element) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const move = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType === 'touch') return;
      const box = element.getBoundingClientRect();
      element.style.setProperty('--intro-x', `${(event.clientX / innerWidth - .5) * 15}px`);
      element.style.setProperty('--intro-y', `${((event.clientY - box.top) / box.height - .5) * 12}px`);
    };
    const reset = () => {element.style.setProperty('--intro-x', '0px'); element.style.setProperty('--intro-y', '0px');};
    element.addEventListener('pointermove', move, {passive:true});
    element.addEventListener('pointerleave', reset);
    return () => {element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset);};
  }, []);
  return <section ref={slide} className="welcome-slide" aria-labelledby="welcome-title">
    <div className="welcome-orbit orbit-one" aria-hidden="true"/>
    <div className="welcome-orbit orbit-two" aria-hidden="true"/>
    <span className="welcome-spark spark-one" aria-hidden="true">✳</span><span className="welcome-spark spark-two" aria-hidden="true">✧</span>
    <div className="welcome-content"><p className="eyebrow welcome-enter">A LITTLE CURIOSITY GOES A LONG WAY</p><h1 id="welcome-title" className="welcome-enter">Mc<span>Que</span>rious<span className="welcome-period">.</span></h1><p className="welcome-intro welcome-enter">Hi, I’m McQueen Xu,<br className="mobile-break"/> and this is my portfolio.</p><p className="welcome-subtitle welcome-enter">Big ideas. Small experiments. Follow your curiosity.</p></div>
    <a className="welcome-scroll welcome-enter" href="#experiments"><span>Scroll down to explore</span><span className="scroll-arrow" aria-hidden="true">↓</span></a>
  </section>;
}
