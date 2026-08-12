import assert from 'node:assert/strict';
import { buildAlienResearch } from './infinityResearchClient';

const originalFetch = global.fetch;
global.fetch = (async (url: string | URL | Request) => {
  if (String(url).endsWith('/v1/reason')) return new Response(JSON.stringify({
    schema: 'infinity/reason-result/v1', role: 'REASONER', model: 'fake-gemma',
    output: 'Local Alien Coin synthesis.', evidenceState: 'INFERRED',
  }), { status: 200 });
  return new Response(JSON.stringify({
    proposal: { name: 'research.expand_token', arguments: { tokenId: 'alien-1' } }, executed: false,
  }), { status: 200 });
}) as typeof fetch;

const result = await buildAlienResearch({
  id: 'alien-1', title: 'Signal Bundle', summary: 'A mixed experience bundle.',
  seed: 'user-keywords', version: '1',
  items: [{ category: 'movie', entityId: 'm1', entityData: { archiveUrl: 'https://archive.org/details/test-film' } }],
});
assert.equal(result.evidenceLevel, 'INFERRED');
assert.equal(result.runtime.model, 'fake-gemma');
assert.equal(result.toolProposal.executed, false);
assert.equal(result.sources[0].evidenceLevel, 'OBSERVED');
assert.equal(result.sources[0].verificationStatus, 'SOURCE_URL_CAPTURED; CONTENT_NOT_REVIEWED');
for (const value of Object.values(result.novelty)) if (value !== null) assert.match(value, /^[a-f0-9]{64}$/);
global.fetch = originalFetch;
console.log('Alien Coin shared research adapter: PASS');
