'use client';

import { useEffect, useState } from 'react';

interface CoinItem { category:string; title?:string; summary?:string; sourceUrl?:string; youtubeUrl?:string; imageUrl?:string; embedUrl?:string; focus?:string }
interface TokenSummary { id:string; title:string; summary:string; createdAt:string; rarityTier?:string; ownerWallet?:string|null; items?:CoinItem[] }
interface WalletIdentity { address:string; shortId:string; createdAt:number }
const WALLET_KEY='infinity-unified-wallet-link-v1';
const SESSION_KEY='alien-coin-wallet-session-v1';
// QuantaPhi proxies authenticated token requests on its own origin to avoid
// the legacy GitHub Pages-only backend CORS restriction.
const API=typeof window!=='undefined'&&window.location.hostname==='quantaphi.org'
  ?'/alien-coin':'https://alien-coin.marvaseater.workers.dev';
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
  const [useSignals,setUseSignals]=useState(false);
  const [mintReceipt,setMintReceipt]=useState('');
  const [menuOpen,setMenuOpen]=useState(false);
  const [historyLoading,setHistoryLoading]=useState(false);
  const [sessionToken,setSessionToken]=useState('');
  const [handle,setHandle]=useState('');
  const [passphrase,setPassphrase]=useState('');
  const [authMode,setAuthMode]=useState<'signin'|'create'>('signin');
  const [authMessage,setAuthMessage]=useState('');
  const [authLoading,setAuthLoading]=useState(false);

  useEffect(()=>{try{
    const identity=localStorage.getItem(WALLET_KEY); if(identity)setWallet(JSON.parse(identity));
    const session=localStorage.getItem(SESSION_KEY); if(session)setSessionToken(session);
  }catch{}},[]);

  useEffect(()=>{if(!wallet?.address&&!sessionToken)return;let cancelled=false;(async()=>{
    setHistoryLoading(true);
    try{
      const response=await fetch(sessionToken?API+'/api/tokens':API+'/api/tokens?wallet='+encodeURIComponent(wallet?.address||''),{cache:'no-store',headers:sessionToken?{Authorization:'Bearer '+sessionToken}:{}});
      const data=await response.json();
      if(!cancelled&&response.ok&&Array.isArray(data.tokens)){setTokens(data.tokens);if(data.wallet)setWallet({address:data.wallet.address,shortId:'@'+data.wallet.handle,createdAt:Date.now()})}
    }catch{}finally{if(!cancelled)setHistoryLoading(false)}
  })();return()=>{cancelled=true}},[wallet?.address,sessionToken]);

  async function authenticate(){
    setAuthLoading(true);setAuthMessage('');
    try{
      const endpoint=authMode==='create'?'/api/wallet/register':'/api/wallet/login';
      const payload:any={handle:handle.trim(),passphrase};
      if(authMode==='create'&&wallet?.address)payload.walletAddress=wallet.address;
      const response=await fetch(API+endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
      const data=await response.json();
      if(!response.ok)throw new Error(data.error||'Wallet sign-in failed.');
      const identity={address:data.wallet.address,shortId:'@'+data.wallet.handle,createdAt:Date.now()};
      setWallet(identity);setSessionToken(data.token);setPassphrase('');
      try{localStorage.setItem(WALLET_KEY,JSON.stringify(identity));localStorage.setItem(SESSION_KEY,data.token)}catch{}
      setAuthMessage(authMode==='create'?'Unified wallet created and signed in.':'Signed in to unified wallet.');
    }catch(reason){setAuthMessage(reason instanceof Error?reason.message:'Wallet sign-in failed.')}finally{setAuthLoading(false)}
  }

  function signOut(){
    setMintReceipt('');setSessionToken('');setWallet(null);setTokens([]);setAuthMessage('Signed out on this device.');
    try{localStorage.removeItem(SESSION_KEY);localStorage.removeItem(WALLET_KEY)}catch{}
  }

  async function ensureWallet(){
    if(wallet)return wallet;
    const identity=makeWallet();
    try{localStorage.setItem(WALLET_KEY,JSON.stringify(identity))}catch{} setWallet(identity);
    await fetch(API+'/api/auth/wallet',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({walletAddress:identity.address})}).catch(()=>{});
    return identity;
  }

  async function mint(){
    if(!sessionToken||!wallet?.address){
      setMenuOpen(true);
      setError('Sign in to your registered wallet before minting. Anonymous browser IDs do not establish ownership.');
      return;
    }
    setLoading(true);setError(null);setMintReceipt('');
    try{
      const signals:string[]=[];
      if(useSignals)try{
        const activity=JSON.parse(localStorage.getItem('alien-coin-interactions-v1')||'[]');
        if(Array.isArray(activity))for(const item of activity.slice(0,24)){
          const phrase=[item?.category,item?.title].filter(value=>typeof value==='string').join(': ');
          if(phrase)signals.push(phrase.slice(0,180));
        }
      }catch{}
      // Server session authoritatively determines the owner. Never submit a browser-minted wallet address.
      const response=await fetch(API+'/api/tokens',{
        method:'POST',cache:'no-store',
        headers:{'Content-Type':'application/json',Authorization:'Bearer '+sessionToken},
        body:JSON.stringify({profile:{zone,ingredients,signals}})
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(data.error||'The mint did not complete. Please try again.');
      const issued=data.token as TokenSummary|undefined;
      if(!issued?.id||data.mode!=='CLOUDFLARE_D1_CARD_WORLD'||issued.ownerWallet!==wallet.address)
        throw new Error('The server did not confirm a wallet-owned token. Check your wallet history before trying again.');
      // Confirm actual persisted D1 token, not merely a successful submission.
      const receiptResponse=await fetch(API+'/api/tokens/'+encodeURIComponent(issued.id),{
        cache:'no-store',headers:{Authorization:'Bearer '+sessionToken}
      });
      const receipt=await receiptResponse.json().catch(()=>({}));
      if(!receiptResponse.ok||receipt.token?.id!==issued.id||receipt.token?.ownerWallet!==wallet.address)
        throw new Error('The token was submitted but its saved record could not be verified. Check history; do not mint again yet.');
      const token=receipt.token as TokenSummary;
      setTokens(current=>[token,...current.filter(item=>item.id!==token.id)].slice(0,100));
      setMintReceipt('Cloudflare D1 confirmed token '+token.id+'.');
    }catch(reason){setError(reason instanceof Error?reason.message:'The mint did not complete.');}
    finally{setLoading(false)}
  }

  return <main className="oracle-shell">
    <header className="oracle-header">
      <div className="brand"><span className="brand-mark">A</span><span><b>Alien Coin</b><small>ORACLE • PHI</small></span></div>
      <div className="header-actions">
        <div className="wallet-pill"><i />{wallet?wallet.shortId:'Sign in to mint'}</div>
        <button className="hamburger" aria-label="Open wallet and history" onClick={()=>setMenuOpen(true)}><span/><span/><span/></button>
      </div>
    </header>
    {menuOpen&&<div className="drawer-scrim" onClick={()=>setMenuOpen(false)}>
      <aside className="wallet-drawer" onClick={e=>e.stopPropagation()}>
        <div className="drawer-head"><div><small>UNIFIED WALLET</small><h2>Alien Coin History</h2></div><button onClick={()=>setMenuOpen(false)} aria-label="Close">×</button></div>
        <div className="drawer-wallet"><span className="mini-coin">A</span><div><b>{wallet?wallet.shortId:'Not signed in yet'}</b><small>{wallet?.address||'Sign in or create a unified wallet.'}</small></div></div>
        {!sessionToken?<div className="wallet-auth">
          <div className="auth-tabs"><button className={authMode==='signin'?'active':''} onClick={()=>setAuthMode('signin')}>Sign in</button><button className={authMode==='create'?'active':''} onClick={()=>setAuthMode('create')}>Create wallet</button></div>
          <label>Wallet handle<input value={handle} onChange={e=>setHandle(e.target.value)} placeholder="Example: kris"/></label>
          <label>Passphrase<input type="password" value={passphrase} onChange={e=>setPassphrase(e.target.value)} placeholder="8+ characters"/></label>
          <button className="auth-submit" disabled={authLoading||!handle||passphrase.length<8} onClick={authenticate}>{authLoading?'Connecting…':authMode==='create'?'Create & sign in':'Sign in'}</button>
          {authMessage&&<p className="auth-message">{authMessage}</p>}
        </div>:<div className="signed-in-row"><span>Cloudflare authenticated</span><button onClick={signOut}>Sign out</button></div>}
        <div className="drawer-section-title"><b>Past tokens</b><small>{historyLoading?'Loading from Cloudflare…':tokens.length+' saved'}</small></div>
        <div className="drawer-history">{tokens.map(token=><button key={token.id} className="drawer-token" onClick={()=>{setTokens([token,...tokens.filter(x=>x.id!==token.id)]);setMenuOpen(false)}}>
          <span className="mini-coin">A</span><span><b>{token.title}</b><small>{new Date(token.createdAt).toLocaleString()} • {token.rarityTier||'Living'} • {token.items?.length||0} cards</small></span><strong>View</strong>
        </button>)}{!historyLoading&&tokens.length===0&&<p className="drawer-empty">No Alien Coins are attached to this wallet yet.</p>}</div>
        <div className="drawer-next">Signed-in wallet identity is now ready for token ownership and transfer. Transfer controls come in Step 3.</div>
      </aside>
    </div>}
    <section className="hero oracle-width">
      <div className="eyebrow">PERSONAL ENTERTAINMENT • KNOWLEDGE • VALUE</div>
      <div className="coin" aria-hidden="true"><span>ALIEN</span><b>◉</b><small>INFINITY 2026®</small></div>
      <h1>One coin.<br/><em>A world inside it.</em></h1>
      <p>Mint a living card collection shaped around the person holding it. Every song, movie, poem, tree, recipe, story and offer stays attached to one reopenable Alien Coin.</p>
      <div className="profile-row">
        <label><span>Planting zone or location</span><input value={zone} onChange={e=>setZone(e.target.value)} placeholder="Example: Iowa • Zone 5b"/></label>
        <label><span>Ingredients on hand</span><input value={ingredients} onChange={e=>setIngredients(e.target.value)} placeholder="Example: potatoes, eggs, onions"/></label>
      </div>
      <label className="mint-note" style={{display:'flex',gap:8,alignItems:'center'}}><input type="checkbox" style={{flex:'none',width:20,height:20}} checked={useSignals} onChange={event=>setUseSignals(event.target.checked)}/>Use my saved Alien Coin activity interests for this mint (optional).</label>
      <button className="mint-button" onClick={mint} disabled={loading}>{loading?'Verifying wallet mint…':sessionToken?'Mint Alien Coin':'Sign in to mint Alien Coin'}</button>
      <p className="mint-note">Every new coin must be linked to a signed-in wallet and read back from Cloudflare D1. Optional details guide source discovery; no cash exchange value is promised.</p>
      {error&&<div className="error-card">{error}</div>}
      {mintReceipt&&<div className="error-card" role="status">{mintReceipt}</div>}
    </section>
    {tokens[0]?.items&&tokens[0].items.length>0&&<section className="oracle-width section-block">
      <div className="section-title"><span>◉</span><div><h2>{tokens[0].title}</h2><p>{tokens[0].summary}</p></div></div>
      <div className="asset-grid">{tokens[0].items.map((item,index)=>{const yid=youtubeId(item.youtubeUrl||item.sourceUrl);return <article className="asset-card" key={item.category+'-'+index}><b>{LABELS[item.category]||item.category}</b><h3>{item.title||LABELS[item.category]||'Attached asset'}</h3>{item.embedUrl&&<iframe src={item.embedUrl} title={item.title||item.category} allow="autoplay; fullscreen" allowFullScreen className="asset-player"/>}{!item.embedUrl&&yid&&<iframe src={'https://www.youtube.com/embed/'+yid+'?playsinline=1&rel=0'} title={item.title||item.category} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen style={{width:'100%',aspectRatio:'16/9',border:0,borderRadius:'16px'}}/>}{item.imageUrl&&!item.embedUrl&&<img src={item.imageUrl} alt="" style={{width:'100%',aspectRatio:'16/9',objectFit:'cover',borderRadius:'16px'}}/>}<p>{item.summary||item.focus||'Attached to this Alien Coin.'}</p>{item.sourceUrl&&<a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Open source →</a>}<small>ATTACHED ASSET • SAVED WITH COIN</small></article>})}</div>
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
