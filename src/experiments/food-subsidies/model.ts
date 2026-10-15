export type Settings = {coupon:number; duration:number; funding:number; network:number};
export type Month = {month:number; share:number; price:number; savings:number; loss:number; balance:number; active:boolean};
export const defaults:Settings = {coupon:6,duration:9,funding:120,network:0.5};
// Currency: yuan; funding, savings, and losses: thousand yuan. 10,000 orders/month.
export function simulate(s:Settings):Month[] {
  if(!Object.values(s).every(Number.isFinite)||s.coupon<0||s.coupon>12||s.duration<0||s.duration>24||s.funding<=0||s.network<0||s.network>1) throw new Error('Invalid settings');
  let share=0.2,balance=s.funding,savings=0,loss=0,active=true;
  const rows:Month[]=[{month:0,share,price:20,savings,loss,balance,active}];
  for(let month=1;month<=24;month++) {
    let coupon=active&&month<=s.duration?s.coupon:0;
    // A 1-yuan operating contribution per order before coupons. Funding limits coupon spend.
    coupon=Math.min(coupon, balance/(10*Math.max(share,0.001))+1);
    const advantage=0.24*coupon+2*s.network*(2*share-1);
    const target=1/(1+Math.exp(-advantage));
    share=active?share+0.25*(target-share):0;
    // Limit expense using the updated order share too.
    coupon=Math.min(coupon,balance/(10*Math.max(share,0.001))+1);
    const spend=10*share*coupon;
    const net=10*share*(1-coupon);
    savings+=spend; loss+=Math.max(0,-net); balance=Math.max(0,balance+net);
    const price=20-share*coupon;
    rows.push({month,share,price,savings,loss,balance,active});
    if(balance<=0.000001) active=false;
  }
  return rows;
}
