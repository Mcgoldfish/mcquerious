import './food.css';
import paragraphs from './essay.json';
import {assetUrl} from '../../assetUrl';
const essay=assetUrl('research/food-delivery-essay.pdf');
export default function FoodSubsidies(){
 return <div className="food-world"><main className="essay-page"><p className="food-kicker">HIR CONTEST · BRONZE</p><h1>Subsidizing Competition</h1><p className="essay-subtitle">Consumer Welfare and Market Power in China’s Food-Delivery Market</p><p className="essay-author">Xu Zheng · Original essay</p><p className="essay-scroll-hint">Scroll to read the full essay.</p><div className="essay-links"><a href={essay} download>Download PDF ↓</a></div><article className="essay-scrollbox" tabIndex={0} aria-label="Original essay text">{paragraphs.map((text,i)=>i===0?<p className="essay-theme" key={i}>{text}</p>:i===1?<h2 className="essay-original-title" key={i}>{text}</h2>:['The new food-delivery battle','The economics behind the losses','Regulation and global implications'].includes(text.trim())?<h3 key={i}>{text}</h3>:<p key={i}>{text}</p>)}</article></main></div>;
}
