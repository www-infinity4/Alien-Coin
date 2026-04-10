import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { fromAddress, toAddress, memo } = await request.json() as {
      fromAddress: string;
      toAddress: string;
      memo?: string;
    };

    if (!fromAddress || !toAddress) {
      return NextResponse.json({ error: 'fromAddress and toAddress required' }, { status: 400 });
    }
    if (fromAddress === toAddress) {
      return NextResponse.json({ error: 'Cannot transfer to yourself' }, { status: 400 });
    }

    const token = await prisma.token.findUnique({ where: { id } });
    if (!token) return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    if (token.ownerWallet && token.ownerWallet !== fromAddress) {
      return NextResponse.json({ error: 'You do not own this token' }, { status: 403 });
    }

    // Ensure both users exist
    await Promise.all([
      prisma.user.upsert({ where: { walletAddress: fromAddress }, update: {}, create: { walletAddress: fromAddress } }),
      prisma.user.upsert({ where: { walletAddress: toAddress }, update: {}, create: { walletAddress: toAddress } }),
    ]);

    const [updatedToken, transfer] = await prisma.$transaction([
      prisma.token.update({
        where: { id },
        data: { ownerWallet: toAddress },
      }),
      prisma.tokenTransfer.create({
        data: { tokenId: id, fromAddress, toAddress, memo },
      }),
    ]);

    return NextResponse.json({ token: updatedToken, transfer });
  } catch (error) {
    console.error('Transfer error:', error);
    return NextResponse.json({ error: 'Transfer failed' }, { status: 500 });
  }
}
