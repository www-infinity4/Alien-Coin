import { createHash } from 'crypto';

type Entity = Record<string, unknown> & { id:string };

const corpus: Record<string, Entity[]> = {
  song: [{id:'song-take-on-me',title:'Take On Me',artist:'a-ha',year:1985,genreTags:'["pop"]',sources:'fallback discovery seed'},{id:'song-space-oddity',title:'Space Oddity',artist:'David Bowie',year:1969,genreTags:'["rock"]',sources:'fallback discovery seed'}],
  movie: [{id:'movie-signal',title:'Signal Cinema Discovery',year:2026,runtimeMin:null,rating:null,sources:'fallback research seed'},{id:'movie-space',title:'Classic Space Cinema Discovery',year:2026,runtimeMin:null,rating:null,sources:'fallback research seed'}],
  tree: [{id:'tree-apple',commonName:'Apple Tree',scientificName:'Malus domestica',hardinessZones:'varies',nativeRegions:'cultivated worldwide',careNotes:'Research local cultivar and planting guidance.',sources:'fallback research seed'},{id:'tree-oak',commonName:'Oak Tree',scientificName:'Quercus spp.',hardinessZones:'varies',nativeRegions:'varies',careNotes:'Research the native species appropriate to the user location.',sources:'fallback research seed'}],
  treatIdea: [{id:'treat-local',name:'Local Treat Coupon',type:'merchant discovery',originCountry:'local',seasonality:'varies',whereToBuyNotes:'Verify a participating merchant before representing this as redeemable.',sources:'fallback discovery seed'},{id:'treat-cafe',name:'Cafe Coupon Discovery',type:'merchant discovery',originCountry:'local',seasonality:'year round',whereToBuyNotes:'Verify merchant terms first.',sources:'fallback discovery seed'}],
  greekGod: [{id:'myth-hermes',name:'Hermes',domain:'travel and messages',storyTitle:'Hermes research path',storyText:'Research mythology through cited sources.',primarySources:'',secondarySources:''},{id:'myth-athena',name:'Athena',domain:'craft and strategy',storyTitle:'Athena research path',storyText:'Research mythology through cited sources.',primarySources:'',secondarySources:''}],
  coin: [{id:'coin-silver',name:'Silver Dollar Research',issuerCountry:'United States',denomination:'research subject',year:2026,mint:null,mintage:null,composition:'varies by issue',diameterMm:null,coinTypeTags:'research',historyText:'Numismatic research seed.',collectorNotes:'Verify the exact issue before valuation.',whereToFindLinks:'',sources:'fallback research seed'},{id:'coin-world',name:'World Coin Research',issuerCountry:'various',denomination:'research subject',year:2026,mint:null,mintage:null,composition:'varies',diameterMm:null,coinTypeTags:'research',historyText:'World numismatic research seed.',collectorNotes:'Verify exact issue.',whereToFindLinks:'',sources:'fallback research seed'}],
  quote: [{id:'quote-original',speaker:'User / original writing',date:'2026',quote:'Add an original line or researched quotation here.',context:'writing seed',sourceUrl:null},{id:'quote-research',speaker:'Research prompt',date:'2026',quote:'Find a sourced quotation connected to the bundle.',context:'research seed',sourceUrl:null}],
  gemstone: [{id:'gem-sapphire',name:'Sapphire',type:'corundum',mohs:9,colors:'varied',formation:'Research geology and provenance.',whereFoundRegions:'varied',ethicalCollectingNotes:'Verify provenance and seller claims.',whereToBuyNotes:'Use verified merchants only.',sources:'fallback research seed'},{id:'gem-diamond',name:'Diamond',type:'carbon gemstone',mohs:10,colors:'varied',formation:'Research geology and provenance.',whereFoundRegions:'varied',ethicalCollectingNotes:'Verify provenance and certification.',whereToBuyNotes:'Use verified merchants only.',sources:'fallback research seed'}],
  meal: [{id:'meal-local',mealName:'Local Meal Discovery',cuisineRegion:'profile/local discovery',components:'Research a meal connected to the user profile.',recipeText:'Generated only after research.',historyNotes:'Research required.',variants:'',sources:'fallback research seed'},{id:'meal-world',mealName:'World Cuisine Discovery',cuisineRegion:'cross-domain discovery',components:'Research a cuisine connected to another token.',recipeText:'Generated only after research.',historyNotes:'Research required.',variants:'',sources:'fallback research seed'}]
};

function pick(category:string, seed:string):Entity { const list=corpus[category]; const n=parseInt(createHash('sha256').update(`${seed}:${category}`).digest('hex').slice(0,8),16); return list[n%list.length]; }

export function buildFallbackToken(seed:string, walletAddress?:string|null) {
  const categories=['song','movie','tree','treatIdea','greekGod','coin','quote','gemstone','meal'];
  const picked=categories.map((category,index)=>({category,entityData:pick(category,seed),displayOrder:index}));
  const id='fallback_'+Buffer.from(seed).toString('base64url');
  const song=picked.find(x=>x.category==='song')!.entityData as {title:string};
  const coin=picked.find(x=>x.category==='coin')!.entityData as {name:string};
  const createdMatch=seed.match(/\|created=(\d+)$/); const createdAt=new Date(createdMatch?Number(createdMatch[1]):0).toISOString();
  const items=picked.map((x,index)=>({id:`${id}:${x.category}`,category:x.category,entityId:x.entityData.id,displayOrder:index,notes:'Database-independent fallback bundle',entityData:x.entityData}));
  return {id,seed,version:'fallback-1',title:`Alien Coin Bundle — ${song.title} × ${coin.name}`,summary:'A deterministic Alien Coin experience bundle minted from the resilient fallback corpus. Database-backed enrichment can replace or extend these seeds later.',createdAt,rarityTier:'Utility',proofHash:createHash('sha256').update(`${seed}:${createdAt}`).digest('hex'),ownerWallet:walletAddress??null,items,citations:[]};
}

export function decodeFallbackId(id:string){ if(!id.startsWith('fallback_')) return null; try{return Buffer.from(id.slice(9),'base64url').toString('utf8')}catch{return null} }
