export type Card={rank:number;suit:number};
export const labels=['High card','One pair','Two pair','Three of a kind','Straight','Flush','Full house','Four of a kind','Straight flush'];
export function score(cards:Card[]):number[]{
 if(cards.length<5)throw new Error('Need five cards');
 let best:number[]=[];
 for(let a=0;a<cards.length-4;a++)for(let b=a+1;b<cards.length-3;b++)for(let c=b+1;c<cards.length-2;c++)for(let d=c+1;d<cards.length-1;d++)for(let e=d+1;e<cards.length;e++){
 const hand=[cards[a],cards[b],cards[c],cards[d],cards[e]],r=hand.map(x=>x.rank).sort((x,y)=>y-x),groups=[...new Set(r)].map(v=>[r.filter(x=>x===v).length,v]).sort((x,y)=>y[0]-x[0]||y[1]-x[1]);
 const flush=hand.every(x=>x.suit===hand[0].suit),unique=[...new Set(r)];const straight=unique.length===5?(unique[0]-unique[4]===4?unique[0]:unique.join(',')==='14,5,4,3,2'?5:0):0;
 const s=flush&&straight?[8,straight]:groups[0][0]===4?[7,groups[0][1],groups[1][1]]:groups[0][0]===3&&groups[1][0]===2?[6,groups[0][1],groups[1][1]]:flush?[5,...r]:straight?[4,straight]:groups[0][0]===3?[3,groups[0][1],...groups.slice(1).map(x=>x[1])]:groups[0][0]===2&&groups[1][0]===2?[2,...groups.map(x=>x[1])]:groups[0][0]===2?[1,...groups.map(x=>x[1])]:[0,...r];
 if(compare(s,best)>0)best=s;
 }return best;
}
export function compare(a:number[],b:number[]){for(let i=0;i<Math.max(a.length,b.length);i++){const d=(a[i]||0)-(b[i]||0);if(d)return d;}return 0;}
export function rng(seed:number){let x=seed>>>0;return()=>{x+=0x6D2B79F5;let t=Math.imul(x^x>>>15,1|x);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296;};}
export function deck(seed:number){const r=rng(seed),d=Array.from({length:52},(_,i)=>({rank:2+i%13,suit:Math.floor(i/13)}));for(let i=51;i>0;i--){const j=Math.floor(r()*(i+1));[d[i],d[j]]=[d[j],d[i]];}return d;}
export type Player={name:string;chips:number;hole:Card[];folded:boolean;bet:number;total:number;actedAt:number;action:string};
export type Game={players:Player[];deck:Card[];board:Card[];dealer:number;turn:number;street:number;current:number;minRaise:number;pending:number[];done:boolean;log:string[];hand:number;seed:number;payouts:number[]};
export const streets=['Pre-flop','Flop','Turn','River'];
const next=(ps:Player[],start:number,predicate:(p:Player)=>boolean)=>{for(let k=1;k<=ps.length;k++){const i=(start+k)%ps.length;if(predicate(ps[i]))return i;}return -1;};
const eligible=(p:Player)=>!p.folded&&p.chips>0;
export function start(count:number,seed=17):Game{if(!Number.isInteger(count)||count<2||count>9)throw new Error('Choose 2–9 players');return deal({players:Array.from({length:count},(_,i)=>({name:i===0?'You':['Mira','Leo','Jade','Kai','Nora','Finn','Iris','Max'][i-1],chips:1000,hole:[],folded:false,bet:0,total:0,actedAt:-1,action:''})),dealer:count-1,seed,hand:0});}
export function deal(old:Pick<Game,'players'|'dealer'|'seed'|'hand'>):Game{
 const ps=old.players.map((p):Player=>({...p,hole:[],folded:p.chips===0,bet:0,total:0,actedAt:-1,action:p.chips===0?'Out':''}));if(ps.filter(p=>p.chips>0).length<2)throw new Error('Table finished');
 const dealer=next(ps,old.dealer,p=>p.chips>0),cards=deck(old.seed+old.hand*7919);
 for(let k=0;k<2;k++)for(let j=1;j<=ps.length;j++){const i=(dealer+j)%ps.length;if(!ps[i].folded)ps[i].hole.push(cards.pop()!);}
 const heads=ps.filter(p=>!p.folded).length===2,sb=heads?dealer:next(ps,dealer,p=>!p.folded),bb=next(ps,sb,p=>!p.folded);
 for(const [i,v] of [[sb,10],[bb,20]]){const q=Math.min(v,ps[i].chips);ps[i].chips-=q;ps[i].bet=q;ps[i].total=q;ps[i].action=i===sb?'Small blind':'Big blind';}
 const g:Game={players:ps,deck:cards,board:[],dealer,turn:next(ps,bb,eligible),street:0,current:20,minRaise:20,pending:ps.flatMap((p,i)=>eligible(p)?[i]:[]),done:false,log:['Blinds posted: 10 / 20.'],hand:old.hand+1,seed:old.seed,payouts:ps.map(()=>0)};
 return progress(g);
}
export function canRaise(g:Game,i=g.turn){const p=g.players[i];return !!p&&(p.actedAt<0||g.current-p.actedAt>=g.minRaise)&&p.chips>g.current-p.bet;}
export function act(old:Game,kind:'fold'|'call'|'raise',target=0):Game{
 if(old.done||old.turn<0)throw new Error('No action available');const g:Game={...old,players:old.players.map(p=>({...p,hole:[...p.hole]})),deck:[...old.deck],board:[...old.board],pending:[...old.pending],log:[...old.log]},i=g.turn,p=g.players[i];
 if(kind==='fold'){p.folded=true;p.action='Fold';}
 else {let q=kind==='call'?Math.min(p.chips,Math.max(0,g.current-p.bet)):target-p.bet;
 if(kind==='raise'){if(!canRaise(g)||!Number.isInteger(target)||q>p.chips||target<=g.current||target<g.current+g.minRaise&&q!==p.chips)throw new Error('Invalid raise');const delta=target-g.current;g.current=target;if(delta>=g.minRaise)g.minRaise=delta;g.pending=g.players.flatMap((x,j)=>j!==i&&eligible(x)?[j]:[]);}
 p.chips-=q;p.bet+=q;p.total+=q;p.actedAt=g.current;p.action=kind==='raise'?`Raise to ${p.bet}`:q===0?'Check':`Call ${q}`;if(p.chips===0)p.action+=' · all-in';}
 g.log.push(`${p.name}: ${p.action}`);g.pending=g.pending.filter(j=>j!==i&&eligible(g.players[j]));g.turn=-1; // selected from pending below
 for(let k=1;k<=g.players.length;k++){const j=(i+k)%g.players.length;if(g.pending.includes(j)){g.turn=j;break;}}
 return progress(g);
}
function progress(g:Game):Game{
 const live=g.players.flatMap((p,i)=>!p.folded?[i]:[]);
 if(live.length===1)return finish(g);
 const active=live.filter(i=>g.players[i].chips>0);
 if(active.length<=1){const i=active[0];if(i!==undefined&&g.players[i].bet<g.current&&g.pending.includes(i)){g.turn=i;return g;}while(g.board.length<5){g.deck.pop();const n=g.board.length===0?3:1;for(let k=0;k<n;k++)g.board.push(g.deck.pop()!);}return finish(g);}
 if(g.pending.length)return g;
 if(g.street===3)return finish(g);
 g.street++;g.deck.pop();for(let k=0;k<(g.street===1?3:1);k++)g.board.push(g.deck.pop()!);g.current=0;g.minRaise=20;g.players.forEach(p=>{p.bet=0;p.actedAt=-1;});g.pending=active;g.turn=next(g.players,g.dealer,eligible);g.log.push(`${streets[g.street]} dealt.`);return g;
}
export function payouts(players:Player[],board:Card[],dealer:number):number[]{
 const out=players.map(()=>0),levels=[...new Set(players.map(p=>p.total).filter(x=>x>0))].sort((a,b)=>a-b);let prev=0;
 for(const level of levels){const participants=players.flatMap((p,i)=>p.total>=level?[i]:[]),amount=(level-prev)*participants.length;prev=level;let candidates=participants.filter(i=>!players[i].folded);
 // An uncalled top contribution returns to its contributor even if the hand ended by folding.
 if(participants.length===1){out[participants[0]]+=amount;continue;}
 if(!candidates.length)throw new Error('Pot without eligible winner');
 if(candidates.length>1){const scores=candidates.map(i=>score([...players[i].hole,...board]));let best=scores[0];scores.forEach(s=>{if(compare(s,best)>0)best=s;});candidates=candidates.filter((_,k)=>compare(scores[k],best)===0);}
 candidates.sort((a,b)=>(a-dealer-1+players.length)%players.length-(b-dealer-1+players.length)%players.length);
 candidates.forEach((i,k)=>out[i]+=Math.floor(amount/candidates.length)+(k<amount%candidates.length?1:0));
 }return out;
}
function finish(g:Game){g.payouts=payouts(g.players,g.board,g.dealer);g.players.forEach((p,i)=>p.chips+=g.payouts[i]);g.done=true;g.turn=-1;g.pending=[];g.log.push(g.payouts.flatMap((v,i)=>v?[`${g.players[i].name} ${i===0?'receive':'receives'} ${v} chips`]:[]).join(' · '));return g;}
export function bot(g:Game):Game{
 const p=g.players[g.turn],r=rng(g.seed+g.hand*101+g.log.length*977),pair=p.hole[0].rank===p.hole[1].rank;const strength=g.board.length>=3?score([...p.hole,...g.board])[0]/8:(pair?.65:(p.hole[0].rank+p.hole[1].rank)/40);const cost=g.current-p.bet;
 if(cost>0&&r()>.45+strength*.5&&cost>20)return act(g,'fold');
 const target=g.current+Math.max(g.minRaise,20);if(canRaise(g)&&target<=p.bet+p.chips&&r()<.12+strength*.18)return act(g,'raise',target);
 return act(g,'call');
}
export function equity(hole:Card[],board:Card[],opponents:number,seed:number,samples=600){const known=new Set([...hole,...board].map(c=>c.rank+13*c.suit)),base=deck(seed).filter(c=>!known.has(c.rank+13*c.suit)),r=rng(seed+37);let wins=0;
 for(let n=0;n<samples;n++){const d=[...base];for(let i=d.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[d[i],d[j]]=[d[j],d[i]];}const b=[...board];while(b.length<5)b.push(d.pop()!);const own=score([...hole,...b]);let ties=1,lose=false;for(let k=0;k<opponents;k++){const cmp=compare(score([d.pop()!,d.pop()!,...b]),own);if(cmp>0)lose=true;if(cmp===0)ties++;}if(!lose)wins+=1/ties;
 }return wins/samples;
}



