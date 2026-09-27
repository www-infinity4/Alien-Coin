type SearchResult={title?:string;url?:string;content?:string;description?:string;thumbnail?:string;img_src?:string};
export type BundleProfile={zone?:string;ingredients?:string;signals?:string[];round?:number};
export type LiveCard={id:string;category:string;entityId:string;displayOrder:number;notes:string;entityData:Record<string,unknown>&{id:string}};
const SEARCH='https://orange-brook-a2ac.marvaseater.workers.dev/search';
const GPT='https://infinity-rogers.marvaseater.workers.dev/v1/chat';
async function search(query:string,category='general'){
  const url=new URL(SEARCH); url.search=new URLSearchParams({q:query,format:'json',categories:category,safesearch:'1'}).toString();
  const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw new Error('search unavailable');
  const body=await response.json() as {results?:SearchResult[]};
  return (body.results||[]).filter(item=>item.url&&item.title).slice(0,8);
}
function clean(value?:string){return String(value||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()}
function best(results:SearchResult[],round:number,prefer?:RegExp){
  const preferred=prefer?results.filter(x=>prefer.test(x.url||'')):results;
  const pool=preferred.length?preferred:results; return pool[round%Math.max(pool.length,1)];
}
async function gpt(input:string,context:Record<string,unknown>){
  const response=await fetch(GPT,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({input,context:{application:'Alien Coin',...context}}),signal:AbortSignal.timeout(18000),cache:'no-store'});
  if(!response.ok)throw new Error('GPT unavailable');
  const body=await response.json() as {output_text?:string;output?:string};
  return clean(body.output_text||body.output);
}
function signalText(profile:BundleProfile){
  return (profile.signals||[]).map(clean).filter(Boolean).slice(0,24).join(' ');
}
export async function buildLiveAssetCards(profile:BundleProfile={}):Promise<LiveCard[]>{
  const round=Math.max(0,Number(profile.round)||0);
  const zone=clean(profile.zone)||'Iowa zone 5';
  const ingredients=clean(profile.ingredients)||'seasonal pantry ingredients';
  const interests=signalText(profile)||'music cinema history nature collecting practical knowledge';
  const focus=interests.split(' ').slice(round%8,round%8+8).join(' ')||interests;
  const has=(pattern:RegExp)=>pattern.test(interests);
  const movieQuery=has(/\b(saw|horror|scary)\b/)?'Saw horror movie official trailer scene site:youtube.com/watch':focus+' full movie documentary site:youtube.com/watch';
  const musicQuery=has(/\bkorn\b/)?'Korn official music video song site:youtube.com/watch':focus+' famous song official audio site:youtube.com/watch';
  const treeQuery=has(/\biowa\b/)?'cherry tree cultivars Iowa State University Extension hardiness':'native tree '+zone+' USDA extension';
  const poemQuery=has(/\bnature\b/)?'nature poetry public domain Poetry Foundation poets.org':focus+' poem Poetry Foundation poets.org';
  const jobs=[
    ['video',movieQuery,'videos',/youtube\.com|youtu\.be/i],
    ['song',musicQuery,'videos',/youtube\.com|youtu\.be/i],
    ['poem',poemQuery,'general'],
    ['tree',treeQuery,'general'],
    ['meal','recipe '+ingredients+' '+focus,'general'],
    ['coupon','coupon useful offer '+zone+' '+focus,'general'],
    ['terraPreta','Terra Preta burnt soil biochar ancient civilization archaeology','general'],
    ['civilization',focus+' important discovery past present future civilization','general'],
    ['record',focus+' unusual world record remarkable fact Guinness museum','general'],
    ['book',focus+' book Internet Archive Open Library','general'],
    ['valuables',focus+' valuable jewel coin antique museum auction history','images'],
    ['collectible',focus+' collectible art mineral coin museum','images'],
  ] as const;
  const settled=await Promise.all(jobs.map(async([category,q,kind,prefer])=>{
    try{return {category,result:best(await search(q,kind),round,prefer)}}catch{return {category,result:undefined}}
  }));
  const base=20+(round*100);
  const cards:LiveCard[]=settled.filter(x=>x.result).map((entry,index)=>{
    const item=entry.result!; const url=item.url!; const summary=clean(item.content||item.description);
    return {id:'live:'+round+':'+entry.category+':'+index,category:entry.category,entityId:url,displayOrder:base+index,notes:'Selected through Infinity 5 from Phi interest signals',entityData:{id:url,title:clean(item.title),summary,url,sourceUrl:url,youtubeUrl:/youtube\.com|youtu\.be/i.test(url)?url:undefined,imageUrl:item.img_src||item.thumbnail,zone:entry.category==='tree'?zone:undefined,ingredients:entry.category==='meal'?ingredients:undefined,round}};
  });
  const evidence=cards.map(x=>({category:x.category,title:x.entityData.title,summary:x.entityData.summary,sourceUrl:x.entityData.sourceUrl}));
  const generated=await Promise.all([
    gpt('Write a compelling 350-word article about the most civilization-important subject in this evidence. Connect past, present and future. Do not invent facts; clearly distinguish inference.',{task:'civilization-article',verified_context:{focus,evidence}}).then(summary=>({category:'article',title:'Civilization File',summary})).catch(()=>null),
    gpt('Write a short original comedy skit inspired by these interests. Keep it friendly, specific and entertaining. Do not imitate a living comedian.',{task:'original-comedy-skit',verified_context:{focus,evidence}}).then(summary=>({category:'comedy',title:'The Alien Coin Comedy Break',summary})).catch(()=>null),
    gpt('Write an original nature poem matched to this holder when nature is among the interests; otherwise write a poem about the strongest interest. Do not imitate or quote a living poet.',{task:'personalized-original-poem',verified_context:{focus,evidence}}).then(summary=>({category:'poemOriginal',title:has(/\bnature\b/)?'A Nature Poem for This Coin':'A Poem for This Coin',summary})).catch(()=>null),
    gpt('Write one concise storyline explaining why this edition’s entertainment, knowledge and practical cards belong together for this holder.',{task:'bundle-storyline',verified_context:{focus,evidence}}).then(summary=>({category:'story',title:'Why These Cards Found Each Other',summary})).catch(()=>null),
  ]);
  generated.filter(Boolean).forEach((item,index)=>{const value=item!;const id='gpt:'+round+':'+value.category;cards.push({id,category:value.category,entityId:id,displayOrder:base+50+index,notes:'Created by the connected Infinity GPT route from retrieved evidence',entityData:{id,title:value.title,summary:value.summary,round}})});
  return cards;
}
