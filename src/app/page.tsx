'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TokenSummary { id:string; title:string; summary:string; createdAt:string; rarityTier?:string }
interface WalletIdentity { address:string; shortId:string; createdAt:number }
const WALLET_KEY='infinity-unified-wallet-link-v1';
const TOKENS_KEY='alien-coin-tokens';
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
    const saved=localStorage.getItem(TOKENS_KEY); if(saved)setTokens(JSON.parse(saved));
    const identity=localStorage.getItem(WALLET_KEY); if(identity)setWallet(JSON.parse(identity));
  }catch{}},[]);

  async function ensureWallet(){
    if(wallet)return wallet;
    const identity=makeWallet();
    localStorage.setItem(WALLET_KEY,JSON.stringify(identity)); setWallet(identity);
    await fetch('/api/auth/wallet',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({walletAddress:identity.address})}).catch(()=>{});
    return identity;
  }

  async function mint(){
    setLoading(true); setError(null);
    try{
      const identity=await ensureWallet();
      const response=await fetch('/api/tokens',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({walletAddress:identity.address,profile:{zone,ingredients}})});
      if(!response.ok)throw new Error('The mint did not complete. Please try again.');
      const data=await response.json(); const token=data.token as TokenSummary;
      const updated=[token,...tokens.filter(item=>item.id!==token.id)].slice(0,25);
      localStorage.setItem(TOKENS_KEY,JSON.stringify(updated)); setTokens(updated);
      window.location.assign(`/tokens/${token.id}`);
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
    </section>
    <section className="oracle-width section-block">
      <div className="section-title"><span>01</span><div><h2>The card system inside every coin</h2><p>Cards can grow over time without breaking the original token.</p></div></div>
      <div className="asset-grid">{ASSETS.map(([icon,title,desc])=><article className="asset-card" key={title}><b>{icon}</b><h3>{title}</h3><p>{desc}</p><small>ATTACHED ASSET</small></article>)}</div>
    </section>
    <section className="oracle-width automation-card">
      <div><span className="eyebrow">AUTOMATION ROUTE</span><h2>Signals become useful cards</h2><p>With permission, activity from Phi sites can guide the next song, a climate-fit tree, a recipe from purchased ingredients, or an offer worth opening. Clicks can be counted without detaching the asset from its coin.</p></div>
      <ol><li><b>1</b>Collect allowed signals</li><li><b>2</b>Route through GPT</li><li><b>3</b>Verify sources and rights</li><li><b>4</b>Render and attach cards</li></ol>
    </section>
    {tokens.length>0&&<section className="oracle-width section-block"><div className="section-title"><span>02</span><div><h2>Your Alien Coin wallet</h2><p>Open any minted token to return to its complete card collection.</p></div></div><div className="token-list">{tokens.map(token=><Link href={`/tokens/${token.id}`} className="token-row" key={token.id}><span className="mini-coin">A</span><span><b>{token.title}</b><small>{new Date(token.createdAt).toLocaleDateString()} • {token.rarityTier||'Utility'}</small></span><strong>Open →</strong></Link>)}</div></section>}
    <footer>Alien Coin • Infinity 2026® <span>Creative collectible system — not legal tender or an investment.</span></footer>
  </main>;
}
