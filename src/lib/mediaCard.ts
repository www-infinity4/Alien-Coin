import { createHash } from 'crypto';

export type MediaKind = 'MOVIE' | 'SONG';
export type SonaCapture = {
  imageUrl?: string | null;
  contentDigest?: string | null;
  playbackSeconds?: number;
  sourceUrl?: string | null;
  capturedAt?: string;
};

export type MediaCard = {
  schema: 'infinity/media-card/v1';
  cardId: string;
  coinId: string;
  mediaKind: MediaKind;
  mediaId: string;
  title: string;
  subtitle: string | null;
  edition: '1/1';
  displayMark: 'Infinity 2026®';
  capturedAt: string;
  frame: {
    status: 'CAPTURED' | 'PENDING_SOURCE_PERMISSION';
    imageUrl: string | null;
    contentDigest: string | null;
    playbackSeconds: number;
    sourceUrl: string | null;
    captureAgent: 'SONA';
    failureReason: string | null;
  };
  provenance: { generator: 'ALIEN_COIN_MEDIA_CARD_FACTORY'; cardDigest: string };
};

type MediaEntity = {
  id: string;
  title?: string;
  artist?: string;
  archiveUrl?: string | null;
  youtubeUrl?: string | null;
};

export function buildMediaCard(coinId: string, kind: MediaKind, entity: MediaEntity, capture?: SonaCapture): MediaCard {
  const captured = Boolean(capture?.imageUrl && capture?.contentDigest);
  const capturedAt = capture?.capturedAt ?? new Date(0).toISOString();
  const sourceUrl = capture?.sourceUrl ?? entity.archiveUrl ?? entity.youtubeUrl ?? null;
  const identity = `${coinId}|${kind}|${entity.id}|1/1|${capture?.contentDigest ?? 'pending'}`;
  const digest = createHash('sha256').update(identity).digest('hex');
  return {
    schema: 'infinity/media-card/v1',
    cardId: `infinity-card:${digest.slice(0, 32)}`,
    coinId,
    mediaKind: kind,
    mediaId: entity.id,
    title: entity.title ?? 'Untitled media',
    subtitle: kind === 'SONG' && entity.artist ? entity.artist : null,
    edition: '1/1',
    displayMark: 'Infinity 2026®',
    capturedAt,
    frame: {
      status: captured ? 'CAPTURED' : 'PENDING_SOURCE_PERMISSION',
      imageUrl: capture?.imageUrl ?? null,
      contentDigest: capture?.contentDigest ?? null,
      playbackSeconds: Math.max(0, Number(capture?.playbackSeconds) || 0),
      sourceUrl,
      captureAgent: 'SONA',
      failureReason: captured ? null : 'Sona must capture an authorized frame from playback before the card artwork is complete.',
    },
    provenance: { generator: 'ALIEN_COIN_MEDIA_CARD_FACTORY', cardDigest: digest },
  };
}

export function buildCoinMediaCards(
  coinId: string,
  picks: { movie: MediaEntity; song: MediaEntity },
  captures: { movie?: SonaCapture; song?: SonaCapture } = {},
): MediaCard[] {
  return [
    buildMediaCard(coinId, 'MOVIE', picks.movie, captures.movie),
    buildMediaCard(coinId, 'SONG', picks.song, captures.song),
  ];
}
