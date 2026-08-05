# Alien Coin

Alien Coin is a collectible, numbered content-container system built for the Infinity network.

Each coin combines a permanent identity, edition number, content manifest, rights manifest, creator attribution, and version history. A coin can organize authorized movies, music, coupons, poems, research articles, artwork, tutorials, themes, companion profiles, products, and other structured material.

Alien Coin is not designed as an empty token or a copied media folder. It is a traceable package that users can collect, personalize, improve, publish, remix, and connect to the larger Infinity creation chain.

## Core model

```text
Alien Coin
├── permanent coin ID
├── series and edition, such as 1/1 or 1/100
├── creator and collaborators
├── typed content manifest
├── sources and research record
├── rights and licensing record
├── theme and companion identity
├── version and remix ancestry
└── separate Infinity contribution events
```

## Planned content types

- Movies and licensed video references
- Music and licensed audio references
- Coupons and offers
- Poems, stories, scripts, and artwork
- Research articles and source collections
- Tutorials and demonstrations
- User-created worlds, themes, and companion profiles
- Products and marketplace listings

## Research and personalization

Writers receive a workspace for organizing sources, separating facts from interpretation, adding original explanations, and publishing named versions into Alien Coins.

Users can personalize a coin by improving its writing, sources, arrangement, accessibility, theme, font, companion, translation, or audience focus. Personalization creates a new attributed version rather than destroying the original.

The proposed contribution rule records a qualifying personalization as **1/100 of an Infinity contribution unit**, subject to server verification, anti-abuse checks, policy approval, and the authoritative Infinity ledger. Browser-only actions never mint spendable Infinity.

## Rights

A movie, song, coupon, or other commercial item must have a rights record describing what the application may display, stream, download, promote, transfer, or sell. Uploading media does not create permission to distribute it.

## Security

Alien Coins are identity-bound ledger records. Copying their visible data does not transfer ownership or create a valid duplicate. Production design requires signed events, immutable IDs, append-only versions, integrity hashes, permissions, recovery, revocation, and no client-held minting authority.

## Architecture

See [Alien Coin Personalized Content and Research Architecture](docs/ALIEN_COIN_CONTENT_ARCHITECTURE.md) for the complete data model, contribution rules, research workflow, rights system, security boundaries, and staged implementation roadmap.

## Current stack

- Next.js
- TypeScript
- Prisma-ready data layer

## Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Next implementation milestone

Build the first Coin Studio screen where a user can:

1. Create a named Alien Coin.
2. Choose an edition size.
3. Add typed content items.
4. Add research and source records.
5. Personalize the title, theme, font, and companion through small ⭐ edit portals.
6. Save and compare versions.
7. Inspect the full manifest before publishing.
