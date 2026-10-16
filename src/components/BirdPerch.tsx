import {useState} from 'react';

export function BirdPerch() {
  const [bird, setBird] = useState(false);
  const [excited, setExcited] = useState(false);
  return <div className="bird-perch">
    <svg viewBox="0 0 190 145" aria-hidden="true" className="perch-art">
      <defs><pattern id="rope-twist" width="5" height="8" patternUnits="userSpaceOnUse"><rect width="5" height="8" fill="#c8ad7b"/><path d="M0 7L5 2M0 0L5-5M0 15L5 10" stroke="#826743" strokeWidth="1"/></pattern></defs>
      <path d="M30 0v115M159 0v115" stroke="#826743" strokeWidth="5"/>
      <path d="M30 0v115M159 0v115" stroke="url(#rope-twist)" strokeWidth="3.5"/>
      <path d="M20 117q74-3 151 0" stroke="#775c3e" strokeWidth="10" strokeLinecap="round"/>
      <path d="M20 115q74-3 151 0" stroke="#c8a675" strokeWidth="5" strokeLinecap="round"/>
      <path d="M26 110l8 11m-8-6 8 9M155 110l8 11m-8-6 8 9" stroke="#826743" strokeWidth="2"/>
      <g fill="none" stroke="#927348" strokeWidth="1.7"><path d="M120 102q20 30 43 0Z" fill="#b99b6c"/><ellipse cx="141" cy="102" rx="23" ry="6" fill="#776b49"/><path d="M120 105l39 4m-36 3 31 3m-24-17 24 12m-31-9 23 15m-9-17 20 11"/><path d="M154 98q5-14 14-9q-4 9-14 9" fill="#9aaa78"/></g>
    </svg>
    {bird && <button className={`owl-pet${excited ? ' owl-excited' : ''}`} aria-label="Greet the owl: chirp and flap wings" onClick={() => setExcited(value => !value)} onBlur={() => setExcited(false)}>
      <svg viewBox="0 0 90 90" aria-hidden="true" stroke="#385746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <g className="owl-breath">
          <path d="M26 74l-3 9m9-8-1 8m27-9 3 9m-9-8 1 8" fill="none" stroke="#bd9256" strokeWidth="3"/>
          <path d="M23 36L16 11l22 13q9-3 16 0L75 11l-7 27q12 14 4 32-7 12-27 12S16 76 16 59q0-13 7-23Z" fill="#8b9b7c"/>
          <ellipse cx="45" cy="61" rx="20" ry="18" fill="#e8dfc3" stroke="none"/>
          <path d="M36 59l2 3m7-5 2 3m7-1 2 3m-18 7 2 3m8-3 2 3" stroke="#a9ad87"/>
          <path className="owl-wing owl-wing-left" d="M22 41Q3 45 14 69q4 8 11 4-8-16 2-29Z" fill="#667d61"/>
          <path className="owl-wing owl-wing-right" d="M68 41q19 4 8 28-4 8-11 4 8-16-2-29Z" fill="#667d61"/>
          <path d="M45 34C30 13 13 30 22 45q8 12 23 7 15 5 23-7c9-15-8-32-23-11Z" fill="#faf1da"/>
          <g className="owl-eyes"><ellipse cx="33" cy="38" rx="6" ry="8" fill="#273c32" stroke="none"/><ellipse cx="57" cy="38" rx="6" ry="8" fill="#273c32" stroke="none"/><circle cx="35" cy="35" r="2" fill="#fff" stroke="none"/><circle cx="59" cy="35" r="2" fill="#fff" stroke="none"/></g>
          <path d="M40 47l5-4 5 4-5 5Z" fill="#d6a154" stroke="#a77d43"/>
          <path className="owl-beak-lower" d="M41 48l4 7 4-7Z" fill="#c18a44" stroke="#a77d43"/>
        </g>
        <g className="owl-chirp" fill="none" stroke="#b58b55"><path d="M76 26l6-4m-4 12 8 1M10 25l-5-5"/></g>
      </svg>
    </button>}
    <button className="bird-toggle" aria-pressed={bird} onClick={() => setBird(value => !value)}>{bird ? 'Remove owl' : '+ Add an owl'}</button>
    <span className="sr-only" role="status">{bird ? 'Your owl is resting on the perch. Hover, focus, or tap to greet it.' : 'The perch is empty.'}</span>
  </div>;
}
