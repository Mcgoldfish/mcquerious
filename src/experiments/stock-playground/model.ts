export type Market={seed:number;randomState:number;tick:number;price:number;direction:1|-1;remaining:number};
export type Trade={tick:number;side:'buy'|'sell';quantity:number;price:number;profit:number};
export type Account={cash:number;shares:number;costBasis:number;trades:Trade[]};
export const initialAccount=():Account=>({cash:100000,shares:0,costBasis:0,trades:[]});
function draw(state:number){const next=(state+0x6D2B79F5)>>>0;let t=Math.imul(next^(next>>>15),1|next);t^=t+Math.imul(t^(t>>>7),61|t);return {state:next,value:((t^(t>>>14))>>>0)/4294967296};}
export function openMarket(seed:number):Market{if(!Number.isInteger(seed)||seed<0||seed>4294967295)throw new Error('Invalid seed');const d=draw(seed);return{seed,randomState:d.state,tick:0,price:5000,direction:1,remaining:30+Math.floor(d.value*41)};}
export function advance(m:Market):Market{
  let state=m.randomState,direction=m.direction,remaining=m.remaining;
  if(remaining===0){direction=direction===1?-1:1;const d=draw(state);state=d.state;remaining=30+Math.floor(d.value*41);}
  const a=draw(state),b=draw(a.state);
  const z=Math.sqrt(-2*Math.log(Math.max(Number.EPSILON,a.value)))*Math.cos(2*Math.PI*b.value);
  // Prices are cents; each fictional tick has a +/-0.6% log drift and 2.2% volatility.
  const price=Math.max(1,Math.min(100000000,Math.round(m.price*Math.exp(direction*.006+.022*z))));
  return{...m,randomState:b.state,tick:m.tick+1,price,direction,remaining:remaining-1};
}
export function transact(account:Account,market:Market,side:'buy'|'sell',quantity:number):Account{
  if(!Number.isInteger(quantity)||quantity<1)throw new Error('Choose at least one whole share.');
  const value=quantity*market.price;
  if(side==='buy'){
    if(value>account.cash)throw new Error('Not enough coins for that order.');
    return{cash:account.cash-value,shares:account.shares+quantity,costBasis:account.costBasis+value,trades:[...account.trades,{tick:market.tick,side,quantity,price:market.price,profit:0}]};
  }
  if(quantity>account.shares)throw new Error('You cannot sell more shares than you hold.');
  const cost=account.costBasis/account.shares*quantity;
  return{cash:account.cash+value,shares:account.shares-quantity,costBasis:quantity===account.shares?0:account.costBasis-cost,trades:[...account.trades,{tick:market.tick,side,quantity,price:market.price,profit:value-cost}]};
}
export const wealth=(a:Account,m:Market)=>a.cash+a.shares*m.price;
