export const clubs = [
 ['Manchester City','曼城',1.38,'#79b9df'],['Arsenal','阿森纳',1.3,'#cf7a6f'],['Liverpool','利物浦',1.24,'#bf5764'],['Chelsea','切尔西',1.1,'#658acb'],['Manchester United','曼联',1.06,'#d28a6a'],['Tottenham','热刺',1.13,'#929eb3'],['Newcastle','纽卡斯尔',1.12,'#708777'],['Aston Villa','阿斯顿维拉',1.1,'#a282ab'],['Brighton','布莱顿',1.04,'#729bbb'],['West Ham','西汉姆联',1,'#ad868b'],['Brentford','布伦特福德',.98,'#c68e83'],['Crystal Palace','水晶宫',.97,'#7c8fa3'],['Fulham','富勒姆',.96,'#909d92'],['Wolves','狼队',.95,'#d4b66c'],['Bournemouth','伯恩茅斯',.94,'#b58979'],['Everton','埃弗顿',.92,'#7a95bb'],['Nottingham Forest','诺丁汉森林',.89,'#b78988'],['Burnley','伯恩利',.85,'#a09da1'],['Luton','卢顿',.82,'#caa279'],['Sheffield United','谢菲尔德联',.8,'#b49d91']
] as const;
export type Fixture={home:number;away:number;round:number};
export type Settings={focus:number;boost:number;homeAdvantage:number;seed:number};
export type Season={seed:number;points:number[];gf:number[];ga:number[];order:number[];history:number[][];scores:number[][]};
export function random(seed:number){let x=seed>>>0;return ()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
export function schedule(n=20):Fixture[]{
 if(n<2||n%2)throw Error('Even team count required');
 const ring=Array.from({length:n},(_,i)=>i);const first:Fixture[]=[];
 for(let r=0;r<n-1;r++){for(let i=0;i<n/2;i++){const a=ring[i],b=ring[n-1-i];first.push({home:r%2?a:b,away:r%2?b:a,round:r});}ring.splice(1,0,ring.pop()!);}
 return [...first,...first.map(f=>({home:f.away,away:f.home,round:f.round+n-1}))];
}
export const fixtures=schedule();
function poisson(lambda:number,rng:()=>number){const limit=Math.exp(-lambda);let product=1,k=0;do{k++;product*=rng();}while(product>limit);return k-1;}
export function simulate(settings:Settings,seed:number,trace=false):Season{
 const points=clubs.map(()=>0),gf=clubs.map(()=>0),ga=clubs.map(()=>0),scores:number[][]=[],history:number[][]=[points.slice()];
 const strengths=clubs.map((c,i)=>c[2]*(i===settings.focus?settings.boost:1));
 fixtures.forEach((f,i)=>{const rng=random(seed+i*8191);const ratio=strengths[f.home]/strengths[f.away];
 const h=poisson(1.32*ratio*settings.homeAdvantage,rng),a=poisson(1.32/ratio,rng);scores.push([h,a]);gf[f.home]+=h;ga[f.home]+=a;gf[f.away]+=a;ga[f.away]+=h;
 points[f.home]+=h>a?3:h===a?1:0;points[f.away]+=a>h?3:h===a?1:0;
 if(trace&&i%10===9)history.push(points.slice());});
 // Simplified exact-tie playoff: seeded random priority after points/GD/GF.
 const tieRng=random(seed^0x521ac91);const tie=clubs.map(()=>tieRng());
 const order=clubs.map((_,i)=>i).sort((a,b)=>points[b]-points[a]||(gf[b]-ga[b])-(gf[a]-ga[a])||gf[b]-gf[a]||tie[b]-tie[a]);
 return {seed,points,gf,ga,order,history,scores};
}
export type Radar={fixture:number;counts:number[];wins:number[]};
export type Batch={n:number;comebackCount:number;champions:number[];histogram:number[];ranks:number[];radar:Radar[];samples:{seed:number;winner:number;comeback:boolean}[]};
export function newBatch(focus:number):Batch{return {n:0,comebackCount:0,champions:clubs.map(()=>0),histogram:Array(115).fill(0),ranks:clubs.map(()=>0),radar:fixtures.map((f,i)=>({f,i})).filter(({f})=>f.home===focus||f.away===focus).map(({i})=>({fixture:i,counts:[0,0,0],wins:[0,0,0]})),samples:[]};}
export function addSeason(batch:Batch,settings:Settings,index:number){
 const seed=(settings.seed+index*104729)>>>0;const season=simulate(settings,seed);const winner=season.order[0];batch.n++;batch.champions[winner]++;batch.histogram[season.points[settings.focus]]++;batch.ranks[season.order.indexOf(settings.focus)]++;
 batch.radar.forEach(row=>{const f=fixtures[row.fixture],score=season.scores[row.fixture];const d=f.home===settings.focus?score[0]-score[1]:score[1]-score[0];const outcome=d>0?0:d===0?1:2;row.counts[outcome]++;if(winner===settings.focus)row.wins[outcome]++;});
 const before=season.points.slice();
 fixtures.slice(-10).forEach((f,i)=>{const [h,a]=season.scores[370+i];before[f.home]-=h>a?3:h===a?1:0;before[f.away]-=a>h?3:h===a?1:0;});
 const comeback=before[winner]<Math.max(...before);if(comeback)batch.comebackCount++;
 // Store a bounded set of universes, including wins for the selected team.
 if(batch.samples.length<40||(winner===settings.focus&&batch.samples.filter(s=>s.winner===settings.focus).length<12)||(comeback&&batch.samples.filter(s=>s.comeback).length<8)){
 batch.samples.push({seed,winner,comeback});
 }
}
export function interval(successes:number,n:number):[number,number]{if(!n)return [0,1];const p=successes/n,z=1.96,den=1+z*z/n,center=(p+z*z/(2*n))/den,half=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/den;return [Math.max(0,center-half),Math.min(1,center+half)];}
