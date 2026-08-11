export type AlienBundleItem = { id:string; title:string; subtitle?:string; kind:string; source?:string };

export const fallbackCorpus: Record<string, AlienBundleItem[]> = {
  song: [
    {id:'song-take-on-me',kind:'song',title:'Take On Me',subtitle:'music discovery seed'},
    {id:'song-space-oddity',kind:'song',title:'Space Oddity',subtitle:'music discovery seed'},
    {id:'song-fly-like-an-eagle',kind:'song',title:'Fly Like an Eagle',subtitle:'music discovery seed'}
  ],
  movie: [
    {id:'movie-moon',kind:'movie',title:'Moon / space cinema',subtitle:'cinema research seed'},
    {id:'movie-contact',kind:'movie',title:'Contact / signal cinema',subtitle:'cinema research seed'},
    {id:'movie-public-domain',kind:'movie',title:'Public-domain cinema discovery',subtitle:'archive research seed'}
  ],
  tree: [
    {id:'tree-apple',kind:'tree',title:'Apple Tree',subtitle:'planting + orchard research'},
    {id:'tree-oak',kind:'tree',title:'Oak Tree',subtitle:'native tree research'},
    {id:'tree-maple',kind:'tree',title:'Maple Tree',subtitle:'regional tree research'}
  ],
  coupon: [
    {id:'coupon-local-treat',kind:'coupon',title:'Local Treat Coupon',subtitle:'merchant discovery placeholder'},
    {id:'coupon-coffee',kind:'coupon',title:'Coffee / cafe coupon',subtitle:'merchant discovery placeholder'},
    {id:'coupon-experience',kind:'coupon',title:'Local Experience Coupon',subtitle:'merchant discovery placeholder'}
  ],
  coin: [
    {id:'coin-silver-dollar',kind:'coin',title:'Silver Dollar Research',subtitle:'numismatic discovery'},
    {id:'coin-world',kind:'coin',title:'World Coin Research',subtitle:'numismatic discovery'},
    {id:'coin-token',kind:'coin',title:'Token History',subtitle:'token research'}
  ],
  gemstone: [
    {id:'gem-sapphire',kind:'gemstone',title:'Sapphire',subtitle:'gemology research'},
    {id:'gem-diamond',kind:'gemstone',title:'Diamond',subtitle:'gemology research'},
    {id:'gem-opal',kind:'gemstone',title:'Opal',subtitle:'gemology research'}
  ],
  poem: [
    {id:'poem-cosmos',kind:'poem',title:'Cosmos poem prompt',subtitle:'original writing seed'},
    {id:'poem-travel',kind:'poem',title:'Destination poem prompt',subtitle:'original writing seed'},
    {id:'poem-memory',kind:'poem',title:'Memory poem prompt',subtitle:'original writing seed'}
  ]
};

export function deterministicFallback(seed:string, category:string): AlienBundleItem {
  const list = fallbackCorpus[category] || [{id:`${category}-blank`,kind:category,title:`${category} discovery`}];
  let n = 2166136261;
  for (const ch of `${seed}:${category}`) { n ^= ch.charCodeAt(0); n = Math.imul(n, 16777619); }
  return list[Math.abs(n >>> 0) % list.length];
}
