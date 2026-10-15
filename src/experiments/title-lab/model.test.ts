import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fixtures,simulate,newBatch,addSeason,interval,type Settings} from './model';
const settings:Settings={focus:1,boost:1,homeAdvantage:1.16,seed:202324};
test('complete balanced double round-robin: 380 games, 19 home and away per club',()=>{
 assert.equal(fixtures.length,380);assert.equal(new Set(fixtures.map(f=>`${f.home}-${f.away}`)).size,380);
 for(let i=0;i<20;i++){assert.equal(fixtures.filter(f=>f.home===i).length,19);assert.equal(fixtures.filter(f=>f.away===i).length,19);for(let r=0;r<38;r++)assert.equal(fixtures.filter(f=>f.round===r&&(f.home===i||f.away===i)).length,1);}
});
test('seeded full seasons reproduce and conserve goals, match points and traced totals',()=>{
 const a=simulate(settings,99,true);assert.deepEqual(a,simulate(settings,99,true));assert.equal(a.history.length,39);assert.deepEqual(a.history[38],a.points);
 assert.equal(a.gf.reduce((x,y)=>x+y,0),a.ga.reduce((x,y)=>x+y,0));
 assert.equal(a.points.reduce((x,y)=>x+y,0),a.scores.reduce((sum,[h,v])=>sum+(h===v?2:3),0));
 assert.equal(new Set(a.order).size,20);a.scores.forEach(s=>s.forEach(v=>assert.ok(Number.isInteger(v)&&v>=0)));
});
test('aggregate counts and conditional strata conserve all simulations',()=>{
 const b=newBatch(1);for(let i=0;i<150;i++)addSeason(b,settings,i);
 assert.equal(b.n,150);for(const values of [b.champions,b.histogram,b.ranks])assert.equal(values.reduce((a,v)=>a+v,0),150);
 for(const r of b.radar){assert.equal(r.counts.reduce((a,v)=>a+v,0),150);assert.equal(r.wins.reduce((a,v)=>a+v,0),b.champions[1]);r.wins.forEach((v,i)=>assert.ok(v<=r.counts[i]));}
 for(const sample of b.samples)assert.equal(simulate(settings,sample.seed).order[0],sample.winner);
 assert.ok(interval(0,150)[1]>0);assert.ok(interval(150,150)[0]<1);
});
test('stronger selected-team setting increases average points over paired seeded seasons',()=>{
 let low=0,high=0;for(let i=0;i<150;i++){low+=simulate({...settings,boost:.7},i).points[1];high+=simulate({...settings,boost:1.4},i).points[1];}assert.ok(high>low+150*10);
});
