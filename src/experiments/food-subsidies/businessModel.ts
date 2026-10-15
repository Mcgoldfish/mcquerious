export const MARKET_ORDERS=20000;
export const STARTING_CASH=100000;
export type BusinessMonth={month:number;cash:number;profit:number;totalProfit:number;coupon:number;requestedCoupon:number;orders:number;returning:number;shares:[number,number,number];jdCoupon:number;meituanCoupon:number;nextJD:number;nextMeituan:number;savings:number;limited:boolean};
export function startBusiness():BusinessMonth{return {month:0,cash:STARTING_CASH,profit:0,totalProfit:0,coupon:0,requestedCoupon:0,orders:0,returning:0,shares:[0.1,0.3,0.6],jdCoupon:3,meituanCoupon:2,nextJD:3,nextMeituan:2,savings:0,limited:false};}
export function operate(previous:BusinessMonth,requestedCoupon:number):BusinessMonth{
 if(!Number.isFinite(requestedCoupon)||requestedCoupon<0||requestedCoupon>10)throw new Error('Coupon must be between 0 and 10');
 // Conservative solvency cap: even if all 20,000 orders choose you, losses cannot exceed cash.
 const coupon=Math.min(requestedCoupon,3+previous.cash/MARKET_ORDERS);
 const jdCoupon=previous.nextJD,meituanCoupon=previous.nextMeituan;
 const utilities=[0.3*coupon+1.2*previous.shares[0],0.3*jdCoupon+0.55+1.2*previous.shares[1],0.3*meituanCoupon+1+1.2*previous.shares[2]];
 const weights=utilities.map(v=>Math.exp(v-Math.max(...utilities)));
 const total=weights.reduce((a,b)=>a+b,0);
 const exact=weights.map(w=>w/total*MARKET_ORDERS);
 const counts=exact.map(Math.floor);
 const remainders=exact.map((v,i)=>({i,r:v-counts[i]})).sort((a,b)=>b.r-a.r);
 const deficit=MARKET_ORDERS-counts.reduce((a,b)=>a+b,0);
 for(let i=0;i<deficit;i++)counts[remainders[i].i]++;
 const shares=counts.map(c=>c/MARKET_ORDERS) as [number,number,number];
 const orders=counts[0];
 const profit=Math.round(orders*(3-coupon)*100)/100;
 const cash=Math.max(0,Math.round((previous.cash+profit)*100)/100);
 const threat=shares[0]-previous.shares[0];
 const response=(current:number,max:number)=>threat>0.015?Math.min(max,current+1):threat< -0.015?Math.max(0,current-1):current;
 return {month:previous.month+1,cash,profit,totalProfit:Math.round((previous.totalProfit+profit)*100)/100,coupon,requestedCoupon,orders,returning:Math.min(orders,Math.round(previous.orders*0.45)),shares,jdCoupon,meituanCoupon,nextJD:response(jdCoupon,6),nextMeituan:response(meituanCoupon,5),savings:previous.savings+orders*coupon,limited:coupon<requestedCoupon-1e-8};
}
