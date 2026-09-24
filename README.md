This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Shared Infinity research runtime

Alien Coin's GPT/research adapter lives in `src/lib/infinityResearchClient.ts`. It calls the shared
REASONER and TOOL_ROUTER API through `INFINITY_AI_BASE_URL`.

**Production requirement:** `INFINITY_AI_BASE_URL` must point to a deployed HTTPS Infinity AI
runtime that exposes `POST /v1/reason` and `POST /v1/tools`. The loopback default
`http://127.0.0.1:11435` is development-only and cannot provide AI to visitors on a hosted site.

The adapter deliberately:

- keeps model prose labeled `INFERRED`;
- labels captured HTTPS source URLs as `OBSERVED` and “content not reviewed”;
- records query, source-set, article, token-lineage, and user-path SHA-256 hashes;
- returns proposed tool calls with `executed: false`; and
- falls back to a deterministic article when the runtime is unavailable.

### Deployment warning

The GitHub Pages workflow performs a static export and temporarily removes `src/app/api` and
`src/app/tokens` before building. Therefore GitHub Pages is only a static presentation target;
it cannot serve Alien Coin's Next.js `/api/*` routes. The complete application must be deployed
to a Next.js-capable server/runtime (or have its browser requests explicitly routed to a separate
backend). Do not put model/API secrets in browser JavaScript or `NEXT_PUBLIC_*` variables.

Run the adapter contract test with:

```bash
npx esbuild src/lib/testInfinityResearchClient.ts --bundle --platform=node --format=esm --outfile=/tmp/alien-research-test.mjs
node /tmp/alien-research-test.mjs
```

## Unified Infinity Wallet

The mint no longer creates an isolated Bitcoin-shaped browser identity. **Connect Unified Wallet**
opens the central Infinity Wallet for explicit approval, then Alien Coin uses the returned Infinity
wallet ID for its server token owner records.

Read [`docs/UNIFIED_WALLET_AND_VERIFICATION.md`](docs/UNIFIED_WALLET_AND_VERIFICATION.md) for whole-
token transfers, protected rarity discovery, attributed-signature rules, passkey behavior, and the
truthful Stripe/Plaid/GitHub boundary. Provider readiness is machine-readable in
[`data/verification-provider-readiness.json`](data/verification-provider-readiness.json).
