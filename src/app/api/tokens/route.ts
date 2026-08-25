import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';
import { generateSeed, seededPick } from '@/lib/tokenGenerator';
import { computeRarityTier, computeProofHash, buildTokenJSON } from '@/lib/rarityEngine';
import { buildFallbackToken } from '@/lib/fallbackCorpus';
import { buildCoinMediaCards, type SonaCapture } from '@/lib/mediaCard';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { userId, walletAddress, mediaCaptures = {} } = body as {
    userId?: string;
    walletAddress?: string;
    mediaCaptures?: { movie?: SonaCapture; song?: SonaCapture };
  };
  const seed = generateSeed(userId ?? walletAddress);

  try {
    const [songs, movies, trees, plantingLocations, treatIdeas, greekGods, coins, quotes, gemstones, meals] = await Promise.all([
      prisma.song.findMany(), prisma.movie.findMany(), prisma.tree.findMany(), prisma.plantingLocation.findMany(),
      prisma.treatIdea.findMany(), prisma.greekGod.findMany(), prisma.coin.findMany(), prisma.quote.findMany(),
      prisma.gemstone.findMany(), prisma.meal.findMany(),
    ]);
    const required=[songs,movies,trees,plantingLocations,treatIdeas,greekGods,coins,quotes,gemstones,meals];
    if(required.some(list=>list.length===0)) throw new Error('Alien Coin database corpus is incomplete');

    const picks = {
      song: seededPick(songs, seed, 'song'), movie: seededPick(movies, seed, 'movie'), tree: seededPick(trees, seed, 'tree'),
      plantingLocation: seededPick(plantingLocations, seed, 'plantingLocation'), treatIdea: seededPick(treatIdeas, seed, 'treatIdea'),
      greekGod: seededPick(greekGods, seed, 'greekGod'), coin: seededPick(coins, seed, 'coin'), quote: seededPick(quotes, seed, 'quote'),
      gemstone: seededPick(gemstones, seed, 'gemstone'), meal: seededPick(meals, seed, 'meal'),
    };
    const songPick = picks.song as { title: string }; const coinPick = picks.coin as { name: string };
    const title = `Alien Coin Bundle — ${songPick.title} × ${coinPick.name}`;
    const summary = `A curated experience bundle generated from seed "${seed}", combining music, cinema, nature, food, mythology, numismatics, gemology, and culinary heritage.`;
    const rarityTier = computeRarityTier({coin:picks.coin as Parameters<typeof computeRarityTier>[0]['coin'],song:picks.song as Parameters<typeof computeRarityTier>[0]['song'],movie:picks.movie as Parameters<typeof computeRarityTier>[0]['movie'],meal:picks.meal as Parameters<typeof computeRarityTier>[0]['meal'],tree:picks.tree as Parameters<typeof computeRarityTier>[0]['tree']});
    if (walletAddress) await prisma.user.upsert({where:{walletAddress},update:{},create:{walletAddress}});
    const createdAt = new Date().toISOString(); const proofHash = computeProofHash(seed, title, createdAt);
    const token = await prisma.token.create({data:{seed,title,summary,rarityTier,proofHash,ownerWallet:walletAddress??null,items:{create:Object.entries(picks).map(([category,entity],index)=>({category,entityId:(entity as {id:string}).id,displayOrder:index}))}},include:{items:true}});
    const mediaCards = buildCoinMediaCards(token.id, {
      movie: picks.movie as Parameters<typeof buildCoinMediaCards>[1]['movie'],
      song: picks.song as Parameters<typeof buildCoinMediaCards>[1]['song'],
    }, mediaCaptures);
    const tokenJson = buildTokenJSON(token.id,seed,title,token.createdAt.toISOString(),rarityTier,walletAddress??null,picks as Parameters<typeof buildTokenJSON>[6],mediaCards);
    try { const tokensDir=join(process.cwd(),'public','tokens'); await mkdir(tokensDir,{recursive:true}); await writeFile(join(tokensDir,`${token.id}.json`),JSON.stringify(tokenJson,null,2),'utf8'); } catch (fileErr) { console.warn('Could not write token JSON file:',fileErr); }
    return NextResponse.json({token,picks,mediaCards,tokenJson,mode:'DATABASE'}, {status:201});
  } catch (error) {
    console.warn('Database mint unavailable; using resilient Alien Coin fallback:', error);
    const fallbackSeed=`${seed}:fallback|created=${Date.now()}`;
    const token=buildFallbackToken(fallbackSeed,walletAddress??null);
    const fallbackPicks=Object.fromEntries(token.items.map(i=>[i.category,i.entityData]));
    const mediaCards=buildCoinMediaCards(token.id, {
      movie: fallbackPicks.movie as Parameters<typeof buildCoinMediaCards>[1]['movie'],
      song: fallbackPicks.song as Parameters<typeof buildCoinMediaCards>[1]['song'],
    }, mediaCaptures);
    const tokenJson={...token,media_cards:mediaCards};
    return NextResponse.json({token,picks:fallbackPicks,mediaCards,tokenJson,mode:'FALLBACK',warning:'Database corpus unavailable; minted deterministic fallback bundle.'},{status:201});
  }
}
