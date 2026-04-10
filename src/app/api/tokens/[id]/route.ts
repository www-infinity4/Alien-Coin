import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

async function fetchEntityData(category: string, entityId: string) {
  switch (category) {
    case 'song': return prisma.song.findUnique({ where: { id: entityId } });
    case 'movie': return prisma.movie.findUnique({ where: { id: entityId } });
    case 'tree': return prisma.tree.findUnique({ where: { id: entityId } });
    case 'plantingLocation': return prisma.plantingLocation.findUnique({ where: { id: entityId } });
    case 'treatIdea': return prisma.treatIdea.findUnique({ where: { id: entityId } });
    case 'greekGod': return prisma.greekGod.findUnique({ where: { id: entityId } });
    case 'coin': return prisma.coin.findUnique({ where: { id: entityId } });
    case 'quote': return prisma.quote.findUnique({ where: { id: entityId } });
    case 'gemstone': return prisma.gemstone.findUnique({ where: { id: entityId } });
    case 'meal': return prisma.meal.findUnique({ where: { id: entityId } });
    default: return null;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const token = await prisma.token.findUnique({
      where: { id },
      include: { items: { orderBy: { displayOrder: 'asc' } }, citations: true },
    });

    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    const itemsWithData = await Promise.all(
      token.items.map(async (item) => {
        const entityData = await fetchEntityData(item.category, item.entityId);
        return { ...item, entityData };
      })
    );

    return NextResponse.json({ ...token, items: itemsWithData });
  } catch (error) {
    console.error('Error fetching token:', error);
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 });
  }
}
