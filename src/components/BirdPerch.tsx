import {assetUrl} from '../assetUrl';
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
      <span className="sage-pixel-owl" aria-hidden="true">{[{x:-10,crop:100,width:600},{x:650,crop:780,width:580},{x:1360,crop:1370,width:802}].map((pose,frame) => <svg key={frame} className={`sage-frame sage-frame-${frame}`} viewBox={`${pose.x} 0 820 760`}><defs><clipPath id={`sage-pose-${frame}`}><rect x={pose.crop} y="0" width={pose.width} height="724"/></clipPath></defs><image href={assetUrl('sage-owl-sprites.png')} width="2172" height="724" clipPath={`url(#sage-pose-${frame})`}/></svg>)}</span>
    </button>}
    <button className="bird-toggle" aria-pressed={bird} onClick={() => setBird(value => !value)}>{bird ? 'Remove owl' : '+ Add an owl'}</button>
    <span className="sr-only" role="status">{bird ? 'Your owl is resting on the perch. Hover, focus, or tap to greet it.' : 'The perch is empty.'}</span>
  </div>;
}
