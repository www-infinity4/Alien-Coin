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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Shared Infinity research runtime

Each generated token report now includes a research record produced through the shared local
REASONER and TOOL_ROUTER API. Set `INFINITY_AI_BASE_URL` on the Next.js server when the runtime
is not at the default `http://127.0.0.1:11435`.

The adapter deliberately:

- keeps model prose labeled `INFERRED`;
- labels captured HTTPS source URLs as `OBSERVED` and “content not reviewed”;
- records query, source-set, article, token-lineage, and user-path SHA-256 hashes;
- returns proposed tool calls with `executed: false`; and
- falls back to a deterministic article when the runtime is unavailable.

The loopback default refers to the machine running the Next.js server. In production, run the
Infinity runtime beside that server or configure a private reachable service; a visitor's browser
cannot supply its own localhost to a server-rendered route.

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
