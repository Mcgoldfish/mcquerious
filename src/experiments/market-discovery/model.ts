export type Arrival={name:string;willingness:number;price:number;buys:boolean;nextPrice:number};
export type MarketRound={seed:number;prize:number;startingPrice:number;arrivals:Arrival[]};
function randomGenerator(seed:number){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=Math.imul(a^(a>>>15),1|a);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296;};}
export function makeRound(seed:number):MarketRound{
  if(!Number.isInteger(seed)||seed<0||seed>4294967295)throw new Error('Invalid seed');
  const random=randomGenerator(seed);
  const prize=seed===42?30:Math.floor(random()*101);
  const startingPrice=seed===42?47:35+Math.floor(random()*21);
  let price=startingPrice;
  const tutorial=[62,80,70,90,88,40,95,76];
  const arrivals=Array.from({length:8},(_,i)=>{
    const willingness=seed===42?tutorial[i]:20+Math.floor(random()*81);
    const buys=willingness>=price;
    const nextPrice=Math.max(1,Math.min(100,price+(buys?4:-3)));
    const arrival={name:['Mia','Leo','Ari','Jo','Sam','Nico','Remy','Kit'][i],willingness,price,buys,nextPrice};price=nextPrice;return arrival;
  });
  return{seed,prize,startingPrice,arrivals};
}
export function settle(choice:'buy'|'pass',price:number,prize:number){
  if(!Number.isFinite(price)||price<1||price>100||!Number.isFinite(prize)||prize<0||prize>100)throw new Error('Invalid market values');
  return{spent:choice==='buy'?price:0,received:choice==='buy'?prize:0,net:choice==='buy'?prize-price:0};
}
export function withPeek(round:MarketRound,shopperIndex:number):MarketRound {
  if(!Number.isInteger(shopperIndex)||shopperIndex<0||shopperIndex>=round.arrivals.length)throw new Error('Invalid shopper');
  let price=round.startingPrice;
  const arrivals=round.arrivals.map((a,i)=>{
    const willingness=i===shopperIndex?round.prize:a.willingness;
    const buys=willingness>=price;
    const nextPrice=Math.max(1,Math.min(100,price+(buys?4:-3)));
    const result={...a,willingness,price,buys,nextPrice};price=nextPrice;return result;
  });
  return {...round,arrivals};
}
