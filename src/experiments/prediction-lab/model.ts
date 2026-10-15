export type Point={x:number;y:number};
export function rng(seed:number){let value=seed>>>0;return()=>{value+=0x6D2B79F5;let t=value;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
function normal(random:()=>number){return Math.sqrt(-2*Math.log(Math.max(1e-12,random())))*Math.cos(2*Math.PI*random());}
export function regressionData(seed:number){const random=rng(seed);const make=(x:number):Point=>({x,y:Math.max(0,Math.min(100,30+45*x+15*Math.sin(5*x)+normal(random)*8))});const train=Array.from({length:12},(_,i)=>make(.035+i/11*.93));const test=Array.from({length:24},(_,i)=>make(.02+i/23*.96));const targets=[make(.25),make(.55),make(.85)];return {train,test,targets};}
export function polynomial(points:readonly Point[],degree:number,ridge:number):number[]{
 const size=degree+1;const rows=Array.from({length:size},(_,r)=>Array.from({length:size+1},(_,c)=>c===size?points.reduce((sum,p)=>sum+p.y*Math.pow(2*p.x-1,r),0):points.reduce((sum,p)=>sum+Math.pow(2*p.x-1,r+c),0)+(r===c&&r>0?ridge:0)));
 for(let k=0;k<size;k++){let pivot=k;for(let r=k+1;r<size;r++)if(Math.abs(rows[r][k])>Math.abs(rows[pivot][k]))pivot=r;[rows[k],rows[pivot]]=[rows[pivot],rows[k]];const d=rows[k][k];if(Math.abs(d)<1e-12)throw Error('Singular model');for(let c=k;c<=size;c++)rows[k][c]/=d;for(let r=0;r<size;r++)if(r!==k){const factor=rows[r][k];for(let c=k;c<=size;c++)rows[r][c]-=factor*rows[k][c];}}
 return rows.map(row=>row[size]);
}
export function predict(coefficients:readonly number[],x:number){return coefficients.reduce((sum,c,i)=>sum+c*Math.pow(2*x-1,i),0);}
export function rmse(points:readonly Point[],fn:(x:number)=>number){return Math.sqrt(points.reduce((s,p)=>s+(fn(p.x)-p.y)**2,0)/points.length);}
export function correlation(points:readonly Point[]){const x=points.reduce((s,p)=>s+p.x,0)/points.length,y=points.reduce((s,p)=>s+p.y,0)/points.length;const cov=points.reduce((s,p)=>s+(p.x-x)*(p.y-y),0),vx=points.reduce((s,p)=>s+(p.x-x)**2,0),vy=points.reduce((s,p)=>s+(p.y-y)**2,0);return vx&&vy?cov/Math.sqrt(vx*vy):0;}
export function sigmoid(v:number){return 1/(1+Math.exp(-Math.max(-40,Math.min(40,v))));}
export function probabilityData(seed:number){const random=rng(seed);const make=(x:number):Point=>({x,y:Number(random()<sigmoid(2.7-6.5*x))});return {train:Array.from({length:32},()=>make(random())),test:Array.from({length:30},(_,i)=>make((i+.5)/30)),targets:[make(.2),make(.5),make(.8)]};}
export function logistic(points:readonly Point[]){let bias=0,slope=0;for(let step=0;step<1800;step++){let db=0,ds=0;for(const p of points){const d=sigmoid(bias+slope*p.x)-p.y;db+=d;ds+=d*p.x;}bias-=.5*db/points.length;slope-=.5*(ds/points.length+.003*slope);}return {bias,slope};}
export function brier(points:readonly Point[],fn:(x:number)=>number){return points.reduce((s,p)=>s+(fn(p.x)-p.y)**2,0)/points.length;}
export function confoundedData(seed:number){const random=rng(seed);return Array.from({length:60},(_,i)=>{const warm=i>=30;return {x:25+Number(warm)*37+normal(random)*7,y:25+Number(warm)*40+normal(random)*7,warm};});}
