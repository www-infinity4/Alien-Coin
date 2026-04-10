import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json() as { walletAddress: string };
    if (!walletAddress || typeof walletAddress !== 'string' || walletAddress.length < 10) {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 });
    }
    const user = await prisma.user.upsert({
      where: { walletAddress },
      update: {},
      create: { walletAddress },
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Wallet auth error:', error);
    return NextResponse.json({ error: 'Failed to register wallet' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('address');
  if (!walletAddress) {
    return NextResponse.json({ error: 'address required' }, { status: 400 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        tokensOwned: { select: { id: true, title: true, rarityTier: true, createdAt: true, seed: true }, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Wallet lookup error:', error);
    return NextResponse.json({ error: 'Failed to lookup wallet' }, { status: 500 });
  }
}
