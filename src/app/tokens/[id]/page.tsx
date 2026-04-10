import Link from 'next/link';
import { notFound } from 'next/navigation';
import PrintButton from './PrintButton';

const CATEGORY_LABELS: Record<string, string> = {
  song: '🎵 Song',
  movie: '🎬 Movie',
  tree: '🌳 Tree',
  plantingLocation: '📍 Planting Location',
  treatIdea: '🍯 Treat Idea',
  greekGod: '⚡ Greek God',
  coin: '🪙 Coin',
  quote: '💬 Quote',
  gemstone: '💎 Gemstone',
  meal: '🍽️ Meal',
};

const CATEGORY_COLORS: Record<string, string> = {
  song: 'border-cyan-500/50 bg-cyan-500/5',
  movie: 'border-orange-500/50 bg-orange-500/5',
  tree: 'border-green-500/50 bg-green-500/5',
  plantingLocation: 'border-emerald-500/50 bg-emerald-500/5',
  treatIdea: 'border-amber-500/50 bg-amber-500/5',
  greekGod: 'border-purple-500/50 bg-purple-500/5',
  coin: 'border-yellow-500/50 bg-yellow-500/5',
  quote: 'border-blue-400/50 bg-blue-400/5',
  gemstone: 'border-pink-500/50 bg-pink-500/5',
  meal: 'border-orange-400/50 bg-orange-400/5',
};

const BADGE_COLORS: Record<string, string> = {
  song: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  movie: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  tree: 'bg-green-500/20 text-green-400 border-green-500/30',
  plantingLocation: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  treatIdea: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  greekGod: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  coin: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  quote: 'bg-blue-400/20 text-blue-400 border-blue-400/30',
  gemstone: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  meal: 'bg-orange-400/20 text-orange-300 border-orange-400/30',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getEntityName(category: string, data: any): string {
  if (!data) return 'Unknown';
  switch (category) {
    case 'song': return `${data.title} — ${data.artist}`;
    case 'movie': return `${data.title} (${data.year})`;
    case 'tree': return `${data.commonName}`;
    case 'plantingLocation': return data.name;
    case 'treatIdea': return data.name;
    case 'greekGod': return data.name;
    case 'coin': return data.name;
    case 'quote': return data.speaker;
    case 'gemstone': return data.name;
    case 'meal': return data.mealName;
    default: return data.name ?? data.title ?? 'Unknown';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getEntitySubtitle(category: string, data: any): string {
  if (!data) return '';
  switch (category) {
    case 'song': return `${data.year} • ${JSON.parse(data.genreTags || '[]').join(', ')}`;
    case 'movie': return `${data.runtimeMin ? `${data.runtimeMin} min` : ''} ${data.rating ?? ''}`.trim();
    case 'tree': return data.scientificName;
    case 'plantingLocation': return data.region;
    case 'treatIdea': return `${data.type} • ${data.originCountry}`;
    case 'greekGod': return data.domain;
    case 'coin': return `${data.issuerCountry} • ${data.year}`;
    case 'quote': return data.date;
    case 'gemstone': return `${data.type} • Mohs ${data.mohs}`;
    case 'meal': return data.cuisineRegion;
    default: return '';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getEntityPreview(category: string, data: any): string {
  if (!data) return '';
  switch (category) {
    case 'song': return data.youtubeUrl ? `▶ ${data.youtubeUrl}` : '';
    case 'movie': return data.archiveUrl ? `📽 View on Archive.org` : '';
    case 'tree': return data.careNotes ?? '';
    case 'plantingLocation': return data.permitNotes ?? '';
    case 'treatIdea': return data.seasonality ?? '';
    case 'greekGod': return data.storyTitle ?? '';
    case 'coin': return (data.collectorNotes?.substring(0, 120) ?? '') + '…';
    case 'quote': return `"${data.quote?.substring(0, 120) ?? ''}…"`;
    case 'gemstone': return (data.formation?.substring(0, 120) ?? '') + '…';
    case 'meal': return data.cuisineRegion ?? '';
    default: return '';
  }
}

interface TokenItem {
  id: string;
  category: string;
  entityId: string;
  displayOrder: number;
  notes?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entityData?: any;
}

interface TokenData {
  id: string;
  title: string;
  summary: string;
  seed: string;
  version: string;
  createdAt: string;
  items: TokenItem[];
}

async function getToken(id: string): Promise<TokenData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/tokens/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function TokenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = await getToken(id);

  if (!token) {
    notFound();
  }

  const sortedItems = [...token.items].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_#0a1628_0%,_#0d1117_50%,_#0a0f1e_100%)] -z-10" />

      <header className="border-b border-[#21262d] bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">👽</span>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent">
                Alien Coin
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/api/tokens/${id}/report`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#161b22] border border-[#21262d] rounded-lg text-sm text-[#c9d1d9] hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
            >
              📄 View Full Report
            </a>
            <PrintButton />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Token Summary */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-2xl p-8 mb-10">
          <div className="flex items-start gap-4">
            <div className="text-5xl">👽</div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-[#e6edf3] mb-2 leading-tight">{token.title}</h1>
              <p className="text-[#8b949e] mb-4">{token.summary}</p>
              <div className="flex flex-wrap gap-3 text-xs font-mono">
                <span className="px-3 py-1 bg-[#0d1117] border border-[#21262d] rounded-full text-[#8b949e]">
                  ID: {token.id.substring(0, 16)}…
                </span>
                <span className="px-3 py-1 bg-[#0d1117] border border-[#21262d] rounded-full text-[#8b949e]">
                  Seed: {token.seed}
                </span>
                <span className="px-3 py-1 bg-[#0d1117] border border-[#21262d] rounded-full text-[#8b949e]">
                  v{token.version}
                </span>
                <span className="px-3 py-1 bg-[#0d1117] border border-[#21262d] rounded-full text-[#8b949e]">
                  {new Date(token.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
                <span className="px-3 py-1 bg-[#0d1117] border border-[#21262d] rounded-full text-[#8b949e]">
                  {sortedItems.length} items
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <h2 className="text-xl font-bold text-[#e6edf3] mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full inline-block" />
          Bundle Contents
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {sortedItems.map((item) => {
            const cardColor = CATEGORY_COLORS[item.category] ?? 'border-gray-500/30 bg-gray-500/5';
            const badgeColor = BADGE_COLORS[item.category] ?? 'bg-gray-500/20 text-gray-400 border-gray-500/30';
            const label = CATEGORY_LABELS[item.category] ?? item.category;
            const name = getEntityName(item.category, item.entityData);
            const subtitle = getEntitySubtitle(item.category, item.entityData);
            const preview = getEntityPreview(item.category, item.entityData);

            return (
              <div
                key={item.id}
                className={`border rounded-xl p-5 ${cardColor} transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium ${badgeColor}`}>
                    {label}
                  </span>
                </div>
                <h3 className="font-semibold text-[#e6edf3] mb-1 leading-tight">{name}</h3>
                {subtitle && <p className="text-xs text-[#8b949e] mb-2">{subtitle}</p>}
                {preview && (
                  <p className="text-sm text-[#8b949e] line-clamp-3 leading-relaxed">{preview}</p>
                )}
                {item.notes && (
                  <p className="mt-3 text-xs text-[#8b949e] italic border-t border-[#21262d] pt-2">
                    {item.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href={`/api/tokens/${id}/report`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-cyan-500/20"
          >
            📄 View Full Report
          </a>
          <PrintButton />
          <Link
            href="/"
            className="px-6 py-3 bg-[#161b22] border border-[#21262d] rounded-full text-[#c9d1d9] hover:border-purple-500/40 hover:text-purple-400 transition-all font-semibold"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-[#161b22] border border-[#30363d] rounded-xl p-5 text-sm text-[#8b949e] leading-relaxed">
          <p className="font-semibold text-[#e6edf3] mb-1">⚠️ Disclaimer</p>
          <p>
            The &quot;Alien Coin (Anndy Lian v2)&quot; concept is a{' '}
            <strong className="text-[#e6edf3]">fictional collector concept</strong> for educational
            and creative purposes only. It is NOT real currency, legal tender, or an investment vehicle.
            No monetary value is implied.
          </p>
        </div>
      </main>
    </div>
  );
}
