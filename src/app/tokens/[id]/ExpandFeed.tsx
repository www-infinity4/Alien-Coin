'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ExpandFeed({tokenId}:{tokenId:string}){
  const [loading,setLoading]=useState(false); const [message,setMessage]=useState('');
  const router=useRouter();
  async function expand(){
    setLoading(true);setMessage('');
    const signals:string[]=[];try{for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i)||'';if(/quant|phi|collect|search|history|interest|alien-coin-interactions/i.test(key)){const value=localStorage.getItem(key)||'';if(value&&value.length<12000)signals.push(value.slice(0,800))}}}catch{}
    try{const response=await fetch('/api/tokens/'+encodeURIComponent(tokenId)+'/expand',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({profile:{signals:signals.slice(0,24)}})});const data=await response.json();if(!response.ok)throw new Error(data.error||'Could not add cards');setMessage(data.added+' new cards attached');router.refresh()}catch(error){setMessage(error instanceof Error?error.message:'Could not add cards')}finally{setLoading(false)}
  }
  return <div className="text-center my-10"><button onClick={expand} disabled={loading} className="px-8 py-4 rounded-full bg-[#0a7759] text-white font-bold shadow-lg disabled:opacity-60">{loading?'Building from this holder’s interests…':'Keep building this coin'}</button>{message&&<p className="mt-3 text-sm text-[#61736b]">{message}</p>}<p className="mt-2 text-xs text-[#61736b]">New cards join this token’s existing lineage. They do not replace its earlier cards.</p></div>;
}
