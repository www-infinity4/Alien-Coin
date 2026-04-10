import { createHash } from 'crypto';

export type RarityTier = 'Heirloom' | 'Provenance' | 'Utility';

interface PickedItems {
  coin: { coinTypeTags?: string; mintage?: string | null; sources?: string };
  song: { archiveUrl?: string | null; sources?: string };
  movie: { archiveUrl?: string | null; sources?: string };
  meal: { historyNotes?: string; sources?: string };
  tree: { sources?: string };
}

export function computeRarityTier(picks: PickedItems): RarityTier {
  const coin = picks.coin;
  const tags: string[] = JSON.parse(coin.coinTypeTags ?? '[]');

  // Heirloom: rare/historical coin OR alien-coin series
  if (
    tags.includes('alien-coin') ||
    tags.includes('rare') ||
    (coin.mintage && parseInt(coin.mintage.replace(/[^0-9]/g, '')) < 500000)
  ) {
    return 'Heirloom';
  }

  // Provenance: has archive.org links
  const hasArchiveLinks =
    picks.song.archiveUrl?.includes('archive.org') ||
    picks.movie.archiveUrl?.includes('archive.org');
  if (hasArchiveLinks) return 'Provenance';

  return 'Utility';
}

export function computeProofHash(seed: string, title: string, createdAt: string): string {
  return createHash('sha256')
    .update(`${seed}|${title}|${createdAt}`)
    .digest('hex');
}

export interface TokenJSON {
  token_id: string;
  version: string;
  seed: string;
  rarity_tier: string;
  proof_hash: string;
  owner_wallet: string | null;
  manifest: Record<string, { id: string; name?: string; title?: string; ref?: string }>;
  provenance: {
    generated_at: string;
    hash: string;
    infinity_synapses_url: string;
  };
  report_url: string;
}

export function buildTokenJSON(
  tokenId: string,
  seed: string,
  title: string,
  createdAt: string,
  rarityTier: string,
  ownerWallet: string | null,
  picks: Record<string, { id: string; title?: string; name?: string; mealName?: string; commonName?: string; archiveUrl?: string | null; coinTypeTags?: string }>
): TokenJSON {
  const proofHash = computeProofHash(seed, title, createdAt);
  const manifest: Record<string, { id: string; name?: string; title?: string; ref?: string }> = {};
  for (const [category, entity] of Object.entries(picks)) {
    manifest[category] = {
      id: entity.id,
      name: entity.name ?? entity.mealName ?? entity.commonName,
      title: entity.title,
      ref: entity.archiveUrl ?? undefined,
    };
  }
  return {
    token_id: tokenId,
    version: '2.0.0',
    seed,
    rarity_tier: rarityTier,
    proof_hash: proofHash,
    owner_wallet: ownerWallet,
    manifest,
    provenance: {
      generated_at: createdAt,
      hash: proofHash,
      infinity_synapses_url: 'https://infinity-synapses.vercel.app/research',
    },
    report_url: `/api/tokens/${tokenId}/report`,
  };
}
