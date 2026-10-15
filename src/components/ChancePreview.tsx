import {useState} from 'react';

export function ChancePreview() {
  const [flips, setFlips] = useState<boolean[]>([]);
  const heads = flips.filter(Boolean).length;
  return <aside className="chance-preview" aria-label="Interactive coin toss experiment">
    <div className="chance-top"><span className="eyebrow">A LITTLE QUESTION OF CHANCE</span><span>01 / TRY IT</span></div>
    <h2>How fair does<br/>a fair coin <em>look?</em></h2>
    <p>Flip 20 coins. Will you get exactly 10 heads?</p>
    <div className="coin-grid" aria-hidden="true">{Array.from({length:20},(_,i)=><span key={i} className={flips.length ? (flips[i] ? 'heads' : 'tails') : 'unflipped'}>{flips.length ? (flips[i] ? 'H' : 'T') : '?'}</span>)}</div>
    <div className="chance-result" role="status" aria-live="polite">{flips.length ? <><strong>{heads} heads · {20-heads} tails</strong><span>A fair coin promises equal chances, not equal counts.</span></> : <><strong>Fair doesn’t always mean fifty-fifty.</strong><span>Exactly 10 heads happens only about 18% of the time.</span></>}</div>
    <button className="toss-button" onClick={()=>setFlips(Array.from({length:20},()=>Math.random()<.5))}>{flips.length ? 'Flip another 20' : 'Let’s flip 20'} <span aria-hidden="true">↗</span></button>
    <a className="chance-link" href="#/experiments/prediction-lab">Keep questioning your intuition →</a>
  </aside>;
}
