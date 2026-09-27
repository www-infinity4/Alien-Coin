'use client';
export default function TrackedSource({href,category,title}:{href:string;category:string;title:string}){
  function remember(){try{const key='alien-coin-interactions-v1';const history=JSON.parse(localStorage.getItem(key)||'[]');history.unshift({category,title,href,at:new Date().toISOString()});localStorage.setItem(key,JSON.stringify(history.slice(0,100)))}catch{}}
  return <a href={href} onClick={remember} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm font-bold text-[#0a7759]">Open source →</a>;
}
