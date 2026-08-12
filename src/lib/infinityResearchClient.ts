import { createHash } from 'node:crypto';

type EntityData = Record<string, unknown>;
type BundleItem = { category: string; entityId: string; entityData?: EntityData | null };

export interface AlienResearchEnvelope {
  schema: 'infinity/research-record/v1';
  streamType: 'PROJECT_RESEARCH';
  evidenceLevel: 'INFERRED';
  projectArticle: string;
  discoveryArticle: string;
  sources: Array<{
    url: string;
    evidenceLevel: 'OBSERVED';
    verificationStatus: 'SOURCE_URL_CAPTURED; CONTENT_NOT_REVIEWED';
    fullTextReviewed: false;
  }>;
  novelty: {
    queryHash: string;
    sourceSetHash: string | null;
    articleHash: string;
    tokenLineageHash: string;
    userPathHash: string;
  };
  runtime: { status: 'READY' | 'OFFLINE_FALLBACK'; model: string | null };
  toolProposal: { proposal: Record<string, unknown>; executed: false; requiresApplicationValidation: true };
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map(key => `${JSON.stringify(key)}:${canonical(record[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function hash(value: unknown): string {
  return createHash('sha256').update(canonical(value)).digest('hex');
}

function text(value: unknown): string {
  return String(value ?? '').normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
}

function sourceUrls(items: BundleItem[]): string[] {
  const urls = new Set<string>();
  for (const item of items) {
    const data = item.entityData ?? {};
    for (const key of ['archiveUrl', 'youtubeUrl', 'sourceUrl']) {
      const value = data[key];
      if (typeof value === 'string' && /^https:\/\//i.test(value)) urls.add(value);
    }
    const sources = data.sources;
    const values = Array.isArray(sources) ? sources : typeof sources === 'string' ? (() => {
      try { const parsed = JSON.parse(sources); return Array.isArray(parsed) ? parsed : [sources]; } catch { return [sources]; }
    })() : [];
    for (const value of values) if (typeof value === 'string' && /^https:\/\//i.test(value)) urls.add(value);
  }
  return [...urls].sort();
}

async function post(path: string, payload: Record<string, unknown>): Promise<Record<string, unknown>> {
  const base = (process.env.INFINITY_AI_BASE_URL || 'http://127.0.0.1:11435').replace(/\/$/, '');
  const response = await fetch(base + path, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(1800), cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Infinity AI ${response.status}`);
  return response.json() as Promise<Record<string, unknown>>;
}

export async function buildAlienResearch(input: {
  id: string; title: string; summary: string; seed: string; version: string; items: BundleItem[];
}): Promise<AlienResearchEnvelope> {
  const urls = sourceUrls(input.items);
  const categories = input.items.map(item => item.category);
  const query = `${input.title} ${categories.join(' ')}`;
  const deterministicProject = `This Alien Coin bundle groups ${categories.length} experience categories around “${input.title}”. Its recorded summary is: ${input.summary}. Outside claims require the captured source URLs and full-text or media review.`;
  const deterministicDiscovery = `Compare this bundle with another token through its least-represented category. Begin as EXPLORATORY_LINK and preserve both token lineages.`;
  let projectArticle = deterministicProject;
  let model: string | null = null;
  let status: 'READY' | 'OFFLINE_FALLBACK' = 'OFFLINE_FALLBACK';
  let proposal: Record<string, unknown> = { name: 'research.expand_token', arguments: { tokenId: input.id } };
  try {
    const reason = await post('/v1/reason', {
      input: 'Create a concise research article for this Alien Coin bundle. Keep model prose INFERRED and do not claim external verification without supplied URLs.',
      context: { tokenId: input.id, title: input.title, summary: input.summary, categories, sourceUrls: urls },
    });
    if (reason.schema !== 'infinity/reason-result/v1' || reason.role !== 'REASONER' ||
        reason.evidenceState !== 'INFERRED' || typeof reason.output !== 'string') {
      throw new Error('invalid REASONER evidence contract');
    }
    const routed = await post('/v1/tools', {
      input: `Propose the next research action for ${input.title}`,
      tools: [{ name: 'research.expand_token', description: 'Propose deeper bundle research' }],
      context: { tokenId: input.id },
    });
    if (routed.executed !== false || !routed.proposal || typeof routed.proposal !== 'object') {
      throw new Error('invalid TOOL_ROUTER contract');
    }
    projectArticle = reason.output;
    model = typeof reason.model === 'string' ? reason.model : 'local';
    proposal = routed.proposal as Record<string, unknown>;
    status = 'READY';
  } catch {
    // Non-safety research degrades to the deterministic article.
  }
  const article = { projectArticle, discoveryArticle: deterministicDiscovery, urls };
  return {
    schema: 'infinity/research-record/v1', streamType: 'PROJECT_RESEARCH', evidenceLevel: 'INFERRED',
    projectArticle, discoveryArticle: deterministicDiscovery,
    sources: urls.map(url => ({
      url,
      evidenceLevel: 'OBSERVED' as const,
      verificationStatus: 'SOURCE_URL_CAPTURED; CONTENT_NOT_REVIEWED' as const,
      fullTextReviewed: false as const,
    })),
    novelty: {
      queryHash: hash(text(query)), sourceSetHash: urls.length ? hash(urls.map(text)) : null,
      articleHash: hash(article), tokenLineageHash: hash([input.id, input.version]),
      userPathHash: hash([input.seed, ...categories.map(text)]),
    },
    runtime: { status, model },
    toolProposal: { proposal, executed: false, requiresApplicationValidation: true },
  };
}
