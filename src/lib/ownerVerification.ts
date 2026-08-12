import 'server-only';
import type { NextRequest } from 'next/server';

export interface OwnerVerificationResult {
  verified: boolean;
  state: 'NOT_CONFIGURED' | 'VERIFIED';
  reason: string;
}

export async function verifyOwnerTransfer(_request: NextRequest, _walletAddress: string): Promise<OwnerVerificationResult> {
  void _request;
  void _walletAddress;
  return {
    verified: false,
    state: 'NOT_CONFIGURED',
    reason: 'Server-validated passkey ownership verification is not configured.',
  };
}
