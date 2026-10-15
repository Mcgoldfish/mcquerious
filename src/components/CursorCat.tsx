import {useEffect, useRef} from 'react';

export function CursorCat() {
  const cat = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = cat.current;
    if (!element) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0, last = 0, x = 80, y = 150, targetX = x, targetY = y;
    let active = false, caught = false, facing = 1;
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || motion.matches || !pointer.matches) return;
      targetX = event.clientX; targetY = event.clientY;
      if (!active) { x = Math.max(45, targetX - 130); y = Math.min(innerHeight - 45, targetY + 65); }
      active = true; element.style.visibility = 'visible';
    };
    const hide = () => { active = false; element.style.visibility = 'hidden'; };
    const tick = (time: number) => {
      const dt = Math.min((time - last) / 1000, .04); last = time;
      if (motion.matches || !pointer.matches) hide();
      if (active) {
        const dx = targetX - x, dy = targetY - y, distance = Math.hypot(dx, dy);
        const running = distance > 28;
        if (running) {
          const step = Math.min(distance - 18, Math.max(100, distance * 2.8) * dt);
          x += dx / distance * step; y += dy / distance * step;
          if (Math.abs(dx) > 6) facing = dx > 0 ? 1 : -1;
          caught = false;
        } else if (!caught) {
          caught = true;
          element.classList.remove('cat-pounce');
          void element.offsetWidth;
          element.classList.add('cat-pounce');
        }
        x = Math.max(43, Math.min(innerWidth - 43, x));
        y = Math.max(38, Math.min(innerHeight - 35, y));
        element.style.transform = `translate3d(${x - 48}px,${y - 40}px,0)`;
        element.style.setProperty('--cat-facing', String(facing));
        element.classList.toggle('cat-running', running);
      }
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move, {passive: true});
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
    };
  }, []);
  return <div ref={cat} className="cursor-cat" aria-hidden="true"><div className="cat-facing"><svg className="cat-drawing" viewBox="0 0 110 85" fill="none" stroke="#385746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <g className="cat-tail"><path d="M28 53C6 58 7 29 16 24c8-4 9 8 3 10" stroke="#385746" strokeWidth="9"/><path d="M28 53C6 58 7 29 16 24c8-4 9 8 3 10" stroke="#d99a62" strokeWidth="5.5"/></g>
    <g className="cat-body"><path d="M25 52c-1-17 18-22 34-16 10 4 16 15 10 27l-39 2Z" fill="#faf1df"/><path d="M34 37c0 10 9 16 17 10l-1-12" fill="#d99a62" stroke="none"/>
    <path className="cat-leg back" d="M32 57l-6 15h15" fill="#faf1df"/><path className="cat-leg front" d="M58 55l8 15h15c3-5-8-6-9-6l-2-12" fill="#faf1df"/>
    <path d="M59 43l-3-23 15 9 14-11 3 24c7 15-1 24-15 22-13-1-19-10-14-21Z" fill="#faf1df"/><path d="M58 24l10 7-9 5M84 23l-9 9 11 2" fill="#d99a62" stroke="none"/><path d="M68 30l3 11 5-12" stroke="#d99a62" strokeWidth="4"/>
    <ellipse cx="79" cy="43" rx="2" ry="3" fill="#385746" stroke="none"/><path d="M89 48l4 2-4 3Z" fill="#cf8a78"/><path d="M88 54q-4 5-8 0M88 52l12-4M88 55l13 1M70 51l-12-4M70 54l-13 2"/>
    </g></svg></div></div>;
}
