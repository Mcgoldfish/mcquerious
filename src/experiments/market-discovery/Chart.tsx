import {useEffect,useRef,useState} from 'react';
import type {MarketRound} from './model';
export function MarketChart({round,count,revealed,comparison}:{round:MarketRound;count:number;revealed:boolean;comparison?:MarketRound}){
 const root=useRef<HTMLDivElement>(null);const [width,setWidth]=useState(600);
 useEffect(()=>{const observer=new ResizeObserver(([entry])=>setWidth(Math.max(260,entry.contentRect.width)));observer.observe(root.current!);return()=>observer.disconnect();},[]);
 const left=38,right=width-20,top=25,bottom=185;
 const prices=[round.startingPrice,...round.arrivals.slice(0,count).map(a=>a.nextPrice)];
 const compared=comparison?[comparison.startingPrice,...comparison.arrivals.slice(0,count).map(a=>a.nextPrice)]:null;
 const x=(i:number)=>left+i/8*(right-left),y=(p:number)=>bottom-p/100*(bottom-top);
 return <div ref={root} className="mb-chart"><svg viewBox={`0 0 ${width} 235`} role="img" aria-label={`Box price after ${count} shoppers: ${prices.join(', ')} coins${compared?`. Without peek: ${compared.join(', ')}`:''}${revealed?`. Prize inside: ${round.prize} coins`:''}.`}>
 {[0,50,100].map(t=><g key={t}><line x1={left} x2={right} y1={y(t)} y2={y(t)} stroke="#d9dfd0"/><text x={left-8} y={y(t)+4} textAnchor="end">{t}</text></g>)}
 <text x={left} y="13">Coins</text>{compared&&<path d={compared.map((p,i)=>`${i?'L':'M'}${x(i)},${y(p)}`).join(' ')} stroke="#87927b" strokeWidth="2" strokeDasharray="5 4" fill="none"/>}<path d={prices.map((p,i)=>`${i?'L':'M'}${x(i)},${y(p)}`).join(' ')} stroke="#385746" strokeWidth="3" fill="none"/>
 {prices.map((p,i)=><circle key={i} cx={x(i)} cy={y(p)} r="4" fill="#385746"/>)}
 {revealed&&<g><line x1={left} x2={right} y1={y(round.prize)} y2={y(round.prize)} stroke="#d67f5c" strokeWidth="2" strokeDasharray="6 4"/><text x={right} y={y(round.prize)-7} textAnchor="end">Prize: {round.prize}</text></g>}
 <text x={left} y="207">Before opening</text><text x={right} y="207" textAnchor="end">8 shoppers</text><text x={(left+right)/2} y="232" textAnchor="middle">Shoppers arriving →</text>
 </svg><div className="mb-legend"><span>● {compared?'With a peek':'Asking price'}</span>{compared&&<span>⋯ Without a peek</span>}{revealed&&<span>– – Prize inside</span>}</div></div>;
}
