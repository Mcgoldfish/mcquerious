(function(){
const key='mcquerious-theme';const media=window.matchMedia('(prefers-color-scheme: dark)');let choice;try{choice=localStorage.getItem(key)}catch{}let theme=choice==='dark'||choice==='light'?choice:media.matches?'dark':'light';
function apply(value){theme=value;document.documentElement.dataset.theme=value;document.querySelectorAll('.theme-toggle').forEach(b=>{b.textContent=value==='dark'?'☀ Light mode':'☾ Dark mode';b.setAttribute('aria-label','Switch to '+(value==='dark'?'light':'dark')+' mode')})}
apply(theme);window.addEventListener('storage',e=>{if(e.key===key)apply(e.newValue==='dark'?'dark':'light')});media.addEventListener('change',e=>{if(!choice)apply(e.matches?'dark':'light')});
document.addEventListener('DOMContentLoaded',()=>{if(window.self===window.top){const b=document.createElement('button');b.type='button';b.className='theme-toggle';b.addEventListener('click',()=>{choice=theme==='dark'?'light':'dark';try{localStorage.setItem(key,choice)}catch{}apply(choice);document.querySelectorAll('iframe').forEach(f=>{try{f.contentWindow.postMessage({type:'mcquerious-theme',theme:choice},location.origin)}catch{}})});document.body.append(b);apply(theme)}});
window.addEventListener('message',e=>{if(e.origin===location.origin&&e.data?.type==='mcquerious-theme'&&['dark','light'].includes(e.data.theme))apply(e.data.theme)});
})();
