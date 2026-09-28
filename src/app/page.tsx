'use client';

import { useEffect, useState } from 'react';

interface CoinItem { category:string; title?:string; summary?:string; sourceUrl?:string; youtubeUrl?:string; imageUrl?:string; focus?:string }
interface TokenSummary { id:string; title:string; summary:string; createdAt:string; rarityTier?:string; items?:CoinItem[] }
interface WalletIdentity { address:string; shortId:string; createdAt:number }
const WALLET_KEY='infinity-unified-wallet-link-v1';
const API='https://alien-coin.marvaseater.workers.dev';
const LABELS:Record<string,string>={video:'▶ Video',song:'♫ Music',poem:'✦ Poem',poemOriginal:'✦ Original Poem',tree:'♧ Tree',meal:'⌂ Recipe',coupon:'% Coupon / Offer',story:'◉ Story',collectible:'◇ Collectible',terraPreta:'🌱 Terra Preta',civilization:'🏛 Civilization',article:'📰 Civilization Article',record:'★ Remarkable Fact',book:'📚 Book',valuables:'💎 Jewels, Coins & Antiques',comedy:'☺ Comedy Skit',movie:'🎬 Movie'};
function youtubeId(url?:string){if(!url)return '';try{const u=new URL(url);if(u.hostname==='youtu.be')return u.pathname.slice(1);if(u.hostname.includes('youtube.com'))return u.searchParams.get('v')||''}catch{}return ''}
const ASSETS=[
  ['▶','Video','YouTube and authorized movie links'],['♫','Music','Songs, albums and audio sources'],
  ['✦','Poem','Matched poetry and original writing'],['♧','Tree','A tree selected for the user’s zone'],
  ['⌂','Recipe','Meals built from known ingredients'],['%','Coupon','Useful offers with clear terms'],
  ['◉','Story','Context connecting the whole coin'],['◇','Collectible','Art, minerals, coins and discoveries'],
];

function makeWallet():WalletIdentity {
  const suffix=crypto.randomUUID().replaceAll('-','');
  return {address:`infinity-wallet:auto:${suffix}`,shortId:`Wallet ${suffix.slice(-8).toUpperCase()}`,createdAt:Date.now()};
}

export default function HomePage(){
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string|null>(null);
  const [tokens,setTokens]=useState<TokenSummary[]>([]);
  const [wallet,setWallet]=useState<WalletIdentity|null>(null);
  const [zone,setZone]=useState('');
  const [ingredients,setIngredients]=useState('');

  useEffect(()=>{try{
    const identity=localStorage.getItem(WALLET_KEY); if(identity)setWallet(JSON.parse(identity));
  }catch{}},[]);

  async function ensureWallet(){
    if(wallet)return wallet;
    const identity=makeWallet();
    try{localStorage.setItem(WALLET_KEY,JSON.stringify(identity))}catch{} setWallet(identity);
    await fetch(API+'/api/auth/wallet',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({walletAddress:identity.address})}).catch(()=>{});
    return identity;
  }

  async function mint(){
    setLoading(true); setError(null);
    try{
      const identity=await ensureWallet();
      const signals:string[]=[]; try{for(let index=0;index<localStorage.length;index++){const key=localStorage.key(index)||'';if(/quant|phi|collect|search|history|interest/i.test(key)){const value=localStorage.getItem(key)||'';if(value&&value.length<12000)signals.push(value.slice(0,800))}}}catch{}
      const response=await fetch(API+'/api/tokens',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({walletAddress:identity.address,profile:{zone,ingredients,signals:signals.slice(0,24)}})});
      if(!response.ok)throw new Error('The mint did not complete. Please try again.');
      const data=await response.json(); const token=data.token as TokenSummary;
      const updated=[token,...tokens.filter(item=>item.id!==token.id)].slice(0,25);
      setTokens(updated);
      setLoading(false);
    }catch(reason){setError(reason instanceof Error?reason.message:'The mint did not complete.');setLoading(false)}
  }

  return <main className="oracle-shell">
    <header className="oracle-header">
      <div className="brand"><span className="brand-mark">A</span><span><b>Alien Coin</b><small>ORACLE • PHI</small></span></div>
      <div className="wallet-pill"><i />{wallet?wallet.shortId:'Wallet ready on first mint'}</div>
    </header>
    <section className="hero oracle-width">
      <div className="eyebrow">PERSONAL ENTERTAINMENT • KNOWLEDGE • VALUE</div>
      <div className="coin" aria-hidden="true"><span>ALIEN</span><b>◉</b><small>INFINITY 2026®</small></div>
      <h1>One coin.<br/><em>A world inside it.</em></h1>
      <p>Mint a living card collection shaped around the person holding it. Every song, movie, poem, tree, recipe, story and offer stays attached to one reopenable Alien Coin.</p>
      <div className="profile-row">
        <label><span>Planting zone or location</span><input value={zone} onChange={e=>setZone(e.target.value)} placeholder="Example: Iowa • Zone 5b"/></label>
        <label><span>Ingredients on hand</span><input value={ingredients} onChange={e=>setIngredients(e.target.value)} placeholder="Example: potatoes, eggs, onions"/></label>
      </div>
      <button className="mint-button" onClick={mint} disabled={loading}>{loading?'Minting your card world…':'Mint Alien Coin'}</button>
      <p className="mint-note">The coin is placed in your wallet automatically. These optional details improve its tree and recipe cards.</p>
      {error&&<div className="error-card">{error}</div>}
      {!error&&tokens.length>0&&<div className="error-card">Latest Alien Coin minted and saved to Cloudflare: {tokens[0].title}</div>}
    </section>
    {tokens[0]?.items&&tokens[0].items.length>0&&<section className="oracle-width section-block">
      <div className="section-title"><span>◉</span><div><h2>{tokens[0].title}</h2><p>{tokens[0].summary}</p></div></div>
      <div className="asset-grid">{tokens[0].items.map((item,index)=>{const yid=youtubeId(item.youtubeUrl||item.sourceUrl);return <article className="asset-card" key={item.category+'-'+index}><b>{LABELS[item.category]||item.category}</b><h3>{item.title||LABELS[item.category]||'Attached asset'}</h3>{yid&&<iframe src={'https://www.youtube.com/embed/'+yid+'?playsinline=1&rel=0'} title={item.title||item.category} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen style={{width:'100%',aspectRatio:'16/9',border:0,borderRadius:'16px'}}/>}{item.imageUrl&&<img src={item.imageUrl} alt="" style={{width:'100%',aspectRatio:'16/9',objectFit:'cover',borderRadius:'16px'}}/>}<p>{item.summary||item.focus||'Attached to this Alien Coin.'}</p>{item.sourceUrl&&<a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Open source →</a>}<small>ATTACHED ASSET • SAVED WITH COIN</small></article>})}</div>
    </section>}
    <section className="oracle-width section-block">
      <div className="section-title"><span>01</span><div><h2>The card system inside every coin</h2><p>Cards can grow over time without breaking the original token.</p></div></div>
      <div className="asset-grid">{ASSETS.map(([icon,title,desc])=><article className="asset-card" key={title}><b>{icon}</b><h3>{title}</h3><p>{desc}</p><small>ATTACHED ASSET</small></article>)}</div>
    </section>
    <section className="oracle-width automation-card">
      <div><span className="eyebrow">AUTOMATION ROUTE</span><h2>Signals become useful cards</h2><p>With permission, activity from Phi sites can guide the next song, a climate-fit tree, a recipe from purchased ingredients, or an offer worth opening. Clicks can be counted without detaching the asset from its coin.</p></div>
      <ol><li><b>1</b>Collect allowed signals</li><li><b>2</b>Route through GPT</li><li><b>3</b>Verify sources and rights</li><li><b>4</b>Render and attach cards</li></ol>
    </section>
    {tokens.length>0&&<section className="oracle-width section-block"><div className="section-title"><span>02</span><div><h2>Your Alien Coin wallet</h2><p>Open any minted token to return to its complete card collection.</p></div></div><div className="token-list">{tokens.map(token=><div className="token-row" key={token.id}><span className="mini-coin">A</span><span><b>{token.title}</b><small>{new Date(token.createdAt).toLocaleDateString()} • {token.rarityTier||'Utility'}</small></span><strong>Saved in Cloudflare</strong></div>)}</div></section>}
    <footer>Alien Coin • Infinity 2026® <span>Creative collectible system — not legal tender or an investment.</span></footer>
  </main>;
}
