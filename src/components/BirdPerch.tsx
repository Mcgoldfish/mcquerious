import {useState} from 'react';

export function BirdPerch() {
  const [bird, setBird] = useState(false);
  return <div className="bird-perch">
    <svg viewBox="0 0 190 145" aria-hidden="true" className="perch-art">
      <defs><pattern id="rope-twist" width="5" height="8" patternUnits="userSpaceOnUse"><rect width="5" height="8" fill="#c8ad7b"/><path d="M0 7L5 2M0 0L5-5M0 15L5 10" stroke="#826743" strokeWidth="1"/></pattern></defs>
      <path d="M30 0v115M159 0v115" stroke="#826743" strokeWidth="5"/>
      <path d="M30 0v115M159 0v115" stroke="url(#rope-twist)" strokeWidth="3.5"/>
      <path d="M20 117q74-3 151 0" stroke="#775c3e" strokeWidth="10" strokeLinecap="round"/>
      <path d="M20 115q74-3 151 0" stroke="#c8a675" strokeWidth="5" strokeLinecap="round"/>
      <path d="M26 110l8 11m-8-6 8 9M155 110l8 11m-8-6 8 9" stroke="#826743" strokeWidth="2"/>
      <g fill="none" stroke="#927348" strokeWidth="1.7"><path d="M120 102q20 30 43 0Z" fill="#b99b6c"/><ellipse cx="141" cy="102" rx="23" ry="6" fill="#776b49"/><path d="M120 105l39 4m-36 3 31 3m-24-17 24 12m-31-9 23 15m-9-17 20 11"/><path d="M154 98q5-14 14-9q-4 9-14 9" fill="#9aaa78"/></g>
      {bird && <g className="perch-bird" stroke="#385746" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M75 110v6m9-6v6"/>
        <path d="M68 97l-19 10 23-3" fill="#6d8265"/>
        <path d="M66 93q1-15 14-15 8-13 19-5 10 8 2 18-4 19-22 20-17 0-13-18Z" fill="#f3e7c8"/>
        <path d="M67 91q16-10 27-4-4 16-24 18Z" fill="#829477"/>
        <path d="M79 79q6-17 19-8l7 9-11-1-5 6Z" fill="#385746"/>
        <path d="M100 82l10 3-10 3" fill="#bb8b54"/>
        <circle cx="97" cy="80" r="1.6" fill="#172d23" stroke="none"/>
        <path d="M91 79l4-2" stroke="#fff6df" strokeWidth="3"/>
      </g>}
    </svg>
    <button className="bird-toggle" aria-pressed={bird} onClick={() => setBird(value => !value)}>{bird ? 'Remove bird' : '+ Add a bird'}</button>
    <span className="sr-only" role="status">{bird ? 'Your bird is resting on the perch.' : 'The perch is empty.'}</span>
  </div>;
}
