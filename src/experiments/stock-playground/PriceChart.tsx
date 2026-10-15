import {useEffect,useRef,useState} from 'react';
import type {Trade} from './model';
export type Point={tick:number;price:number};
export const money=(cents:number)=>(cents/100).toLocaleString('en',{minimumFractionDigits:2,maximumFractionDigits:2});
export function PriceChart({points,trades,average}:{points:Point[];trades:Trade[];average:number|null}){
 const root=useRef<HTMLDivElement>(null),[width,setWidth]=useState(700),[hover,setHover]=useState<Point|null>(null);
 useEffect(()=>{const r=new ResizeObserver(([e])=>setWidth(Math.max(260,e.contentRect.width)));r.observe(root.current!);return()=>r.disconnect();},[]);
 const data=points.slice(-100),first=data[0].tick,last=data.at(-1)!.tick;
 const low=Math.min(...data.map(p=>p.price),average??Infinity),high=Math.max(...data.map(p=>p.price),average??-Infinity),pad=Math.max(250,(high-low)*.18);
 const min=Math.max(0,low-pad),max=high+pad,left=60,right=width-18,top=24,bottom=265;
 const x=(tick:number)=>left+(tick-first)/Math.max(25,last-first)*(right-left);
 const y=(price:number)=>bottom-(price-min)/(max-min)*(bottom-top);
 const line=data.map((p,i)=>`${i?'L':'M'}${x(p.tick)},${y(p.price)}`).join(' ');
 const visible=trades.filter(t=>t.tick>=first&&t.tick<=last);
 const tickLabels=[first,Math.round(first+Math.max(25,last-first)/2),first+Math.max(25,last-first)];
 return <div className="sp-chart" ref={root}><svg viewBox={`0 0 ${width} 315`} role="img" aria-label={`Fictional stock price, ticks ${first} to ${last}, latest ${money(data.at(-1)!.price)} coins. Buy markers B and sell markers S.`} onPointerMove={e=>{const b=e.currentTarget.getBoundingClientRect(),px=(e.clientX-b.left)*width/b.width;const target=first+(px-left)/(right-left)*Math.max(25,last-first);setHover(data.reduce((best,p)=>Math.abs(p.tick-target)<Math.abs(best.tick-target)?p:best));}} onPointerLeave={()=>setHover(null)}>
 <defs><linearGradient id="sp-price-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#8cb85c" stopOpacity=".25"/><stop offset="1" stopColor="#8cb85c" stopOpacity="0"/></linearGradient></defs>
 {[0,.5,1].map(t=>{const p=min+(max-min)*t;return <g key={t}><line x1={left} x2={right} y1={y(p)} y2={y(p)} stroke="#d7ddcf" strokeDasharray="2 5"/><text x={left-9} y={y(p)+4} textAnchor="end">{money(p)}</text></g>;})}
 <text x={left} y="13">Price · coins</text><path d={`${line} L${x(last)},${bottom} L${x(first)},${bottom}Z`} fill="url(#sp-price-fill)"/><path d={line} stroke="#42664e" strokeWidth="2.5" fill="none"/>
 {average!==null&&<g><line x1={left} x2={right} y1={y(average)} y2={y(average)} stroke="#b08e55" strokeDasharray="7 5"/><text x={right} y={y(average)-7} textAnchor="end">Your average {money(average)}</text></g>}
 {visible.map((t,i)=><g key={i}><circle cx={x(t.tick)} cy={y(t.price)} r="9" fill={t.side==='buy'?'#385746':'#d1775c'} stroke="#f6f4ed" strokeWidth="2"/><text className="sp-trade-letter" x={x(t.tick)} y={y(t.price)+3.5} textAnchor="middle">{t.side==='buy'?'B':'S'}</text></g>)}
 <circle cx={x(last)} cy={y(data.at(-1)!.price)} r="4" fill="#42664e"/>
 {hover&&<g><line x1={x(hover.tick)} x2={x(hover.tick)} y1={top} y2={bottom} stroke="#9aaa8d"/><circle cx={x(hover.tick)} cy={y(hover.price)} r="5" fill="#42664e"/></g>}
 {tickLabels.map(t=><text key={t} x={x(t)} y="286" textAnchor="middle">{t}</text>)}<text x={(left+right)/2} y="309" textAnchor="middle">Market ticks →</text>
 </svg><div className="sp-chart-caption"><span>{hover?`Tick ${hover.tick} · ${money(hover.price)} coins`:'B = bought · S = sold'}</span><span>Last 100 ticks · {average===null?'no position yet':'dashed line = your average cost'}</span></div></div>;
}
