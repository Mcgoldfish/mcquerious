import {test} from 'node:test';
import assert from 'node:assert/strict';
import {act,bot,canRaise,compare,deal,deck,equity,payouts,score,start,type Card,type Player} from './model';
const cards=(r:number[],s=0):Card[]=>r.map((rank,i)=>({rank,suit:s===9?i%4:s}));
test('all hand categories, wheel, kickers and best five of seven',()=>{
 const hands=[cards([14,11,9,6,3],9),cards([14,14,9,6,3],9),cards([14,14,9,9,3],9),cards([14,14,14,6,3],9),cards([14,5,4,3,2],9),cards([14,11,9,6,3]),cards([14,14,14,6,6],9),cards([14,14,14,14,3],9),cards([14,13,12,11,10])];hands.forEach((h,i)=>assert.equal(score(h)[0],i));
 assert.ok(compare(score(cards([6,5,4,3,2],9)),score(hands[4]))>0);
 assert.deepEqual(score(cards([14,14,13,13,12,12,11],9)),[2,14,13,12]);
 assert.ok(compare(score(cards([14,14,13,8,4],9)),score(cards([14,14,12,11,10],9)))>0);
});
test('seeded decks and selected seat counts deal unique cards and correct blinds',()=>{
 assert.deepEqual(deck(9),deck(9));assert.equal(new Set(deck(9).map(c=>`${c.rank}:${c.suit}`)).size,52);
 for(let n=2;n<=9;n++){const g=start(n);assert.equal(g.players.length,n);assert.equal(g.players.reduce((s,p)=>s+p.chips+p.total,0),n*1000);assert.equal(new Set(g.players.flatMap(p=>p.hole).map(c=>`${c.rank}:${c.suit}`)).size,n*2);assert.equal(g.turn,n===2?0:3%n);}
 assert.throws(()=>start(1));assert.throws(()=>start(10));
});
test('calls/checks complete four rounds, heads-up order and dealer rotation',()=>{
 let g=start(2);assert.equal(g.dealer,0);assert.equal(g.turn,0);g=act(g,'call');assert.equal(g.turn,1);g=act(g,'call');assert.equal(g.street,1);assert.equal(g.turn,1);while(!g.done)g=act(g,'call');assert.equal(g.board.length,5);assert.equal(g.players.reduce((s,p)=>s+p.chips,0),2000);const next=deal(g);assert.equal(next.dealer,1);
});
test('fold ends hand and raises reopen action, validate amounts and do not mutate input',()=>{
 const g=start(2),before=JSON.stringify(g);assert.throws(()=>act(g,'raise',25));const raised=act(g,'raise',60);assert.equal(raised.minRaise,40);assert.equal(raised.current,60);assert.equal(JSON.stringify(g),before);const end=act(raised,'fold');assert.ok(end.done);assert.equal(end.players.reduce((s,p)=>s+p.chips,0),2000);
});
test('short all-in requires calls but cannot reopen a previously acted player',()=>{
 let g=start(3);g=act(g,'call');g.players[g.turn].chips=15;g=act(g,'raise',25);g=act(g,'call');assert.equal(g.turn,0);assert.equal(canRaise(g),false);assert.throws(()=>act(g,'raise',45));g=act(g,'call');assert.equal(g.street,1);
});
test('side pots respect eligibility, include folded chips and split ties with odd chips',()=>{
 const p=(hole:Card[],total:number,folded=false):Player=>({hole,total,folded,name:'',chips:0,bet:0,actedAt:0,action:''});
 const board=cards([2,4,7,9,11],9);const ps=[p(cards([14,14],1),50),p(cards([13,13],2),100),p(cards([12,12],3),200),p(cards([10,10],2),100,true)];assert.deepEqual(payouts(ps,board,0),[200,150,100,0]);
 const royal=cards([14,13,12,11,10]);assert.deepEqual(payouts([p(cards([2,3],1),5),p(cards([4,5],2),5),p(cards([6,7],3),5,true)],royal,0),[7,8,0]);
});
test('random complete games conserve chips, terminate and keep legal decks',()=>{
 for(let n=2;n<=9;n++)for(let seed=1;seed<=12;seed++){let g=start(n,seed),steps=0;while(!g.done){g=bot(g);assert.ok(++steps<600);assert.equal(g.players.reduce((s,p)=>s+p.chips+p.total,0),g.done?n*1000+g.players.reduce((s,p)=>s+p.total,0):n*1000);g.players.forEach(p=>assert.ok(p.chips>=0));}assert.equal(g.players.reduce((s,p)=>s+p.chips,0),n*1000);}
});
test('all-in runout and equity use only visible cards and split board ties',()=>{
 let g=start(2);g=act(g,'raise',1000);g=act(g,'call');assert.ok(g.done);assert.equal(g.board.length,5);assert.equal(g.players.reduce((s,p)=>s+p.chips,0),2000);
 assert.ok(Math.abs(equity(cards([2,3],1),cards([14,13,12,11,10]),2,77,20)-1/3)<1e-12);assert.equal(equity(cards([14,14],9),[],1,77,100),equity(cards([14,14],9),[],1,77,100));
});

