import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateReport } from '@/lib/reportGenerator';

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
      include: { items: { orderBy: { displayOrder: 'asc' } } },
    });

    if (!token) {
      return new NextResponse('Token not found', { status: 404 });
    }

    const itemsWithData = await Promise.all(
      token.items.map(async (item) => {
        const entityData = await fetchEntityData(item.category, item.entityId);
        return { ...item, entityData };
      })
    );

    const html = generateReport({ ...token, items: itemsWithData });

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return new NextResponse('Failed to generate report', { status: 500 });
  }
}
