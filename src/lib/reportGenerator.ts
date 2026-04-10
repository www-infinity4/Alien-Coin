/* eslint-disable @typescript-eslint/no-explicit-any */

interface TokenWithItems {
  id: string;
  title: string;
  summary: string;
  seed: string;
  version: string;
  createdAt: Date;
  items: Array<{
    category: string;
    entityId: string;
    displayOrder: number;
    notes?: string | null;
    entityData?: any;
  }>;
}

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
  song: '#00d4ff',
  movie: '#ff6b35',
  tree: '#39d353',
  plantingLocation: '#7ee787',
  treatIdea: '#ffa657',
  greekGod: '#d2a8ff',
  coin: '#f0c040',
  quote: '#79c0ff',
  gemstone: '#ff7eb3',
  meal: '#ff9800',
};

function renderEntityDetails(category: string, data: any): string {
  if (!data) return '<p style="color:#8b949e">Entity data unavailable</p>';

  switch (category) {
    case 'song':
      return `
        <p><strong>Artist:</strong> ${data.artist}</p>
        <p><strong>Year:</strong> ${data.year}</p>
        <p><strong>Genres:</strong> ${safeParseArray(data.genreTags).join(', ')}</p>
        ${data.durationSec ? `<p><strong>Duration:</strong> ${Math.floor(data.durationSec / 60)}m ${data.durationSec % 60}s</p>` : ''}
        ${data.youtubeUrl ? `<p><strong>Listen:</strong> <a href="${data.youtubeUrl}" style="color:#00d4ff">${data.youtubeUrl}</a></p>` : ''}
        ${data.archiveUrl ? `<p><strong>Archive:</strong> <a href="${data.archiveUrl}" style="color:#00d4ff">${data.archiveUrl}</a></p>` : ''}
        <p><strong>Sources:</strong> ${safeParseArray(data.sources).join('; ')}</p>`;

    case 'movie':
      return `
        <p><strong>Year:</strong> ${data.year}</p>
        ${data.runtimeMin ? `<p><strong>Runtime:</strong> ${data.runtimeMin} min</p>` : ''}
        ${data.rating ? `<p><strong>Rating:</strong> ${data.rating}</p>` : ''}
        ${data.youtubeUrl ? `<p><strong>Watch:</strong> <a href="${data.youtubeUrl}" style="color:#ff6b35">${data.youtubeUrl}</a></p>` : ''}
        ${data.archiveUrl ? `<p><strong>Archive:</strong> <a href="${data.archiveUrl}" style="color:#ff6b35">${data.archiveUrl}</a></p>` : ''}
        <p><strong>Sources:</strong> ${safeParseArray(data.sources).join('; ')}</p>`;

    case 'tree':
      return `
        <p><strong>Scientific Name:</strong> <em>${data.scientificName}</em></p>
        <p><strong>Hardiness Zones:</strong> ${safeParseArray(data.hardinessZones).join(', ')}</p>
        <p><strong>Native Regions:</strong> ${safeParseArray(data.nativeRegions).join(', ')}</p>
        <p><strong>Care Notes:</strong> ${data.careNotes}</p>
        <p><strong>Sources:</strong> ${safeParseArray(data.sources).join('; ')}</p>`;

    case 'plantingLocation':
      return `
        <p><strong>Region:</strong> ${data.region}</p>
        <p><strong>Climate Tags:</strong> ${safeParseArray(data.climateTags).join(', ')}</p>
        <p><strong>Permit Notes:</strong> ${data.permitNotes}</p>
        <p><strong>Sources:</strong> ${safeParseArray(data.sources).join('; ')}</p>`;

    case 'treatIdea':
      return `
        <p><strong>Type:</strong> ${data.type}</p>
        <p><strong>Origin:</strong> ${data.originCountry}</p>
        <p><strong>Seasonality:</strong> ${data.seasonality}</p>
        <p><strong>Where to Buy:</strong> ${data.whereToBuyNotes}</p>
        <p><strong>Sources:</strong> ${safeParseArray(data.sources).join('; ')}</p>`;

    case 'greekGod':
      return `
        <p><strong>Domain:</strong> ${data.domain}</p>
        <h4 style="color:#d2a8ff;margin:12px 0 6px">${data.storyTitle}</h4>
        <p style="font-style:italic;line-height:1.7">${data.storyText}</p>
        <p><strong>Primary Sources:</strong> ${safeParseArray(data.primarySources).join('; ')}</p>
        <p><strong>Secondary Sources:</strong> ${safeParseArray(data.secondarySources).join('; ')}</p>`;

    case 'coin':
      return `
        <p><strong>Issuer:</strong> ${data.issuerCountry}</p>
        <p><strong>Denomination:</strong> ${data.denomination}</p>
        <p><strong>Year:</strong> ${data.year}${data.mint ? ` — ${data.mint} Mint` : ''}</p>
        ${data.mintage ? `<p><strong>Mintage:</strong> ${data.mintage}</p>` : ''}
        <p><strong>Composition:</strong> ${data.composition}</p>
        ${data.diameterMm ? `<p><strong>Diameter:</strong> ${data.diameterMm} mm</p>` : ''}
        <p><strong>Tags:</strong> ${safeParseArray(data.coinTypeTags).join(', ')}</p>
        <p>${data.historyText}</p>
        <p><strong>Collector Notes:</strong> ${data.collectorNotes}</p>
        <p><strong>Sources:</strong> ${safeParseArray(data.sources).join('; ')}</p>`;

    case 'quote':
      return `
        <blockquote style="border-left:4px solid #79c0ff;padding-left:16px;margin:8px 0;font-style:italic;font-size:1.1em;line-height:1.7">
          "${data.quote}"
        </blockquote>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Context:</strong> ${data.context}</p>
        ${data.sourceUrl ? `<p><strong>Source:</strong> <a href="${data.sourceUrl}" style="color:#79c0ff">${data.sourceUrl}</a></p>` : ''}`;

    case 'gemstone':
      return `
        <p><strong>Type:</strong> ${data.type}</p>
        <p><strong>Mohs Hardness:</strong> ${data.mohs}</p>
        <p><strong>Colors:</strong> ${safeParseArray(data.colors).join(', ')}</p>
        <p><strong>Formation:</strong> ${data.formation}</p>
        <p><strong>Where Found:</strong> ${safeParseArray(data.whereFoundRegions).join(', ')}</p>
        <p><strong>Ethical Collecting:</strong> ${data.ethicalCollectingNotes}</p>
        <p><strong>Where to Buy:</strong> ${data.whereToBuyNotes}</p>
        <p><strong>Sources:</strong> ${safeParseArray(data.sources).join('; ')}</p>`;

    case 'meal':
      return `
        <p><strong>Cuisine Region:</strong> ${data.cuisineRegion}</p>
        <p><strong>Components:</strong> ${safeParseArray(data.components).join(', ')}</p>
        <h4 style="color:#ff9800;margin:12px 0 6px">Recipe</h4>
        <p style="line-height:1.7">${data.recipeText}</p>
        <p><strong>History:</strong> ${data.historyNotes}</p>
        <p><strong>Variants:</strong> ${safeParseArray(data.variants).join(' | ')}</p>
        <p><strong>Sources:</strong> ${safeParseArray(data.sources).join('; ')}</p>`;

    default:
      return `<pre style="color:#8b949e;font-size:0.85em;overflow:auto">${JSON.stringify(data, null, 2)}</pre>`;
  }
}

function safeParseArray(val: unknown): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try { return JSON.parse(val); } catch { return [val]; }
  }
  return [];
}

export function generateReport(token: TokenWithItems): string {
  const sortedItems = [...token.items].sort((a, b) => a.displayOrder - b.displayOrder);
  const generatedDate = new Date(token.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const itemsHtml = sortedItems.map((item) => {
    const color = CATEGORY_COLORS[item.category] ?? '#888';
    const label = CATEGORY_LABELS[item.category] ?? item.category;
    const entityName = getEntityName(item.category, item.entityData);

    return `
    <div class="card" style="border-left:4px solid ${color}">
      <div class="card-header">
        <span class="category-badge" style="background:${color}20;color:${color};border:1px solid ${color}40">${label}</span>
        <h3 style="margin:8px 0 0;color:${color}">${entityName}</h3>
      </div>
      <div class="card-body">
        ${renderEntityDetails(item.category, item.entityData)}
        ${item.notes ? `<p class="notes"><em>Bundle Notes: ${item.notes}</em></p>` : ''}
      </div>
    </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alien Coin Report — ${token.title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0d1117;
      color: #c9d1d9;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      min-height: 100vh;
    }
    .cosmos-bg {
      background: radial-gradient(ellipse at 20% 50%, #0a1628 0%, #0d1117 50%, #0a0f1e 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container { max-width: 900px; margin: 0 auto; }
    header {
      text-align: center;
      padding: 60px 20px 40px;
      border-bottom: 1px solid #21262d;
      margin-bottom: 40px;
    }
    .alien-symbol {
      font-size: 4rem;
      display: block;
      margin-bottom: 16px;
      filter: drop-shadow(0 0 20px #00d4ff80);
    }
    h1 {
      font-size: 2.5rem;
      background: linear-gradient(135deg, #00d4ff, #f0c040, #d2a8ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 12px;
    }
    .subtitle {
      color: #8b949e;
      font-size: 1.1rem;
      margin-bottom: 24px;
    }
    .meta-grid {
      display: flex;
      gap: 24px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 20px;
    }
    .meta-item {
      background: #161b22;
      border: 1px solid #21262d;
      border-radius: 8px;
      padding: 12px 20px;
      text-align: center;
    }
    .meta-item .label { font-size: 0.75rem; color: #8b949e; text-transform: uppercase; letter-spacing: 1px; }
    .meta-item .value { font-size: 1rem; color: #e6edf3; font-family: monospace; margin-top: 4px; }
    .section-title {
      font-size: 1.5rem;
      color: #e6edf3;
      margin: 40px 0 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #21262d;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-title::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 24px;
      background: linear-gradient(#00d4ff, #d2a8ff);
      border-radius: 2px;
    }
    .cards-grid {
      display: grid;
      gap: 24px;
    }
    .card {
      background: #161b22;
      border: 1px solid #21262d;
      border-radius: 12px;
      overflow: hidden;
      transition: box-shadow 0.2s;
    }
    .card:hover { box-shadow: 0 8px 32px rgba(0, 212, 255, 0.1); }
    .card-header {
      padding: 20px 24px 16px;
      border-bottom: 1px solid #21262d;
      background: #0d1117;
    }
    .category-badge {
      font-size: 0.8rem;
      padding: 3px 10px;
      border-radius: 20px;
      font-weight: 600;
      display: inline-block;
    }
    .card-body {
      padding: 20px 24px;
      font-size: 0.95rem;
    }
    .card-body p { margin: 6px 0; }
    .card-body strong { color: #e6edf3; }
    .card-body a { color: #58a6ff; text-decoration: none; }
    .card-body a:hover { text-decoration: underline; }
    .card-body h4 { margin-top: 12px; }
    .notes {
      margin-top: 12px;
      padding: 10px;
      background: #0d1117;
      border-radius: 6px;
      color: #8b949e;
      font-size: 0.9rem;
    }
    blockquote { color: #c9d1d9; }
    footer {
      text-align: center;
      padding: 40px 20px;
      border-top: 1px solid #21262d;
      margin-top: 60px;
      color: #8b949e;
      font-size: 0.85rem;
    }
    footer .disclaimer {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 16px;
      margin: 16px auto;
      max-width: 700px;
      text-align: left;
      line-height: 1.6;
    }
    @media print {
      body { background: white; color: black; }
      .cosmos-bg { background: white; }
      .card { break-inside: avoid; border: 1px solid #ccc; }
      h1 { -webkit-text-fill-color: initial; color: #1a1a2e; }
    }
  </style>
</head>
<body>
  <div class="cosmos-bg">
    <div class="container">
      <header>
        <span class="alien-symbol">👽</span>
        <h1>${escapeHtml(token.title)}</h1>
        <p class="subtitle">${escapeHtml(token.summary)}</p>
        <div class="meta-grid">
          <div class="meta-item">
            <div class="label">Token ID</div>
            <div class="value">${token.id.substring(0, 8)}…</div>
          </div>
          <div class="meta-item">
            <div class="label">Seed</div>
            <div class="value">${token.seed}</div>
          </div>
          <div class="meta-item">
            <div class="label">Version</div>
            <div class="value">v${token.version}</div>
          </div>
          <div class="meta-item">
            <div class="label">Generated</div>
            <div class="value">${generatedDate}</div>
          </div>
          <div class="meta-item">
            <div class="label">Items</div>
            <div class="value">${sortedItems.length}</div>
          </div>
        </div>
      </header>

      <main>
        <h2 class="section-title">Experience Bundle Contents</h2>
        <div class="cards-grid">
          ${itemsHtml}
        </div>
      </main>

      <footer>
        <p>Generated by <strong>Alien Coin</strong> — Experience Bundle Platform</p>
        <div class="disclaimer">
          <strong>⚠️ Disclaimer:</strong> The "Alien Coin (Anndy Lian v2)" concept referenced in this report
          is a <strong>fictional collector concept</strong> for educational and creative purposes only.
          It is NOT real currency, legal tender, or an investment vehicle. No monetary value is implied
          or should be inferred. All cultural, historical, and educational content is provided for
          informational purposes. Always verify information with primary sources.
        </div>
        <p>Token Seed: <code>${token.seed}</code> | Report Version: ${token.version}</p>
      </footer>
    </div>
  </div>
</body>
</html>`;
}

function getEntityName(category: string, data: any): string {
  if (!data) return 'Unknown';
  switch (category) {
    case 'song': return `${data.title} — ${data.artist}`;
    case 'movie': return `${data.title} (${data.year})`;
    case 'tree': return `${data.commonName} (${data.scientificName})`;
    case 'plantingLocation': return data.name;
    case 'treatIdea': return data.name;
    case 'greekGod': return data.name;
    case 'coin': return data.name;
    case 'quote': return `${data.speaker} — ${data.date}`;
    case 'gemstone': return data.name;
    case 'meal': return data.mealName;
    default: return data.name ?? data.title ?? data.id ?? 'Unknown';
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
