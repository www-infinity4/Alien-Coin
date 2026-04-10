import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSeed, seededPick } from '@/lib/tokenGenerator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { userId } = body as { userId?: string };

    const seed = generateSeed(userId);

    const [songs, movies, trees, plantingLocations, treatIdeas, greekGods, coins, quotes, gemstones, meals] =
      await Promise.all([
        prisma.song.findMany(),
        prisma.movie.findMany(),
        prisma.tree.findMany(),
        prisma.plantingLocation.findMany(),
        prisma.treatIdea.findMany(),
        prisma.greekGod.findMany(),
        prisma.coin.findMany(),
        prisma.quote.findMany(),
        prisma.gemstone.findMany(),
        prisma.meal.findMany(),
      ]);

    const picks = {
      song: seededPick(songs, seed, 'song'),
      movie: seededPick(movies, seed, 'movie'),
      tree: seededPick(trees, seed, 'tree'),
      plantingLocation: seededPick(plantingLocations, seed, 'plantingLocation'),
      treatIdea: seededPick(treatIdeas, seed, 'treatIdea'),
      greekGod: seededPick(greekGods, seed, 'greekGod'),
      coin: seededPick(coins, seed, 'coin'),
      quote: seededPick(quotes, seed, 'quote'),
      gemstone: seededPick(gemstones, seed, 'gemstone'),
      meal: seededPick(meals, seed, 'meal'),
    };

    const songPick = picks.song;
    const coinPick = picks.coin;

    const title = `Alien Coin Bundle — ${(songPick as { title: string }).title} × ${(coinPick as { name: string }).name}`;
    const summary = `A curated experience bundle generated from seed "${seed}", combining music, cinema, nature, food, mythology, numismatics, gemology, and culinary heritage.`;

    const token = await prisma.token.create({
      data: {
        seed,
        title,
        summary,
        items: {
          create: Object.entries(picks).map(([category, entity], index) => ({
            category,
            entityId: (entity as { id: string }).id,
            displayOrder: index,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ token, picks }, { status: 201 });
  } catch (error) {
    console.error('Error creating token:', error);
    return NextResponse.json({ error: 'Failed to create token' }, { status: 500 });
  }
}
