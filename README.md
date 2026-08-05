# Alien Coin

Alien Coin is a collectible, numbered content-container and research-spin system built for the Infinity network.

Each coin combines a permanent identity, edition number, content manifest, rights manifest, creator attribution, research history, action-token record, and version chain. A coin can organize authorized movies, music, live coupons, poems, research articles, artwork, tutorials, themes, companion profiles, products, and other structured material.

Alien Coin is not an empty token or copied media folder. It is a traceable package that users can collect, personalize, improve, publish, remix, and connect to the larger Infinity creation chain.

## Core model

```text
Five-word user seed
        ↓
Personalized research spin
        ↓
100 recorded research/build action tokens
        ↓
Numbered Alien Coin or generated product
        ↓
Versioning, publishing, use, and verified settlement
```

## Five-word seed and 1/100 Infinity

A user may begin a research spin with a small set of connected words, for example:

```text
helium arsenic rubber mold sugar
```

The words create the starting search vector. Infinity performs most of the research, verification, writing, organization, design, and assembly. The proposed user credit for providing this useful starting direction is therefore **1/100 Infinity**, recorded as one exact subunit out of 100 and subject to verification and authoritative ledger settlement.

The `1/100` rule applies to the seed contribution. It is not the price of the completed Alien Coin and it does not mean every cosmetic personalization automatically earns 1/100 Infinity.

## One hundred action tokens per spin

A personalized spin can produce a numbered set of 100 action tokens:

```text
spin action 1/100 → spin action 100/100
```

Each accepted token records a real step such as a search, source discovery, source check, claim, article section, comparison, rights check, coupon match, theme decision, accessibility improvement, or manifest entry.

These tokens document how Infinity, the user, researchers, and other agents assembled the product. They can grow rapidly because research and websites generate many actions and versions. They are not automatically 100 spendable Infinity.

Historical actions remain fixed. Their economic treatment can be recorded later through a separate valuation event using the policy and current conditions valid at settlement time.

## Planned content types

- Movies and licensed video references
- Music and licensed audio references
- Live coupons and rotating offers
- Poems, stories, scripts, and artwork
- Research articles and source collections
- Tutorials and demonstrations
- User-created worlds, themes, and companion profiles
- Products and marketplace listings

## Live coupon wallet

Coupons are programmed content records with issuer, terms, territory, start time, expiration, redemption limits, and authorization.

When a coupon expires:

1. It becomes visibly expired and moves into wallet history.
2. Its redemption and attribution history remain intact.
3. The wallet searches an approved replacement queue.
4. A current verified offer can fill the live coupon slot.
5. Sponsored or materially different replacements are clearly disclosed.

This allows an Alien Coin to remain useful instead of filling with dead coupons.

## Research and personalization

Writers receive a workspace for organizing sources, separating facts from interpretation, adding original explanations, and publishing named versions into Alien Coins.

Users can personalize a coin by improving its writing, sources, arrangement, accessibility, theme, font, companion, translation, or audience focus. Personalization creates a new attributed version rather than destroying the original.

## Separate ledgers

Alien Coin keeps separate records for:

- User seed contributions
- Research and build action tokens
- AI and human work attribution
- Coin editions and ownership
- Content rights
- Coupon expiration and replacement
- Infinity valuation
- Infinity settlement

A browser-only action never creates settled, spendable Infinity.

## Rights

A movie, song, coupon, or other commercial item must have a rights record describing what the application may display, stream, download, promote, transfer, or sell. Uploading media does not create permission to distribute it.

## Security

Alien Coins are identity-bound ledger records. Copying their visible data does not transfer ownership or create a valid duplicate. Production design requires signed events, immutable IDs, append-only versions, integrity hashes, permissions, recovery, revocation, and no client-held minting authority.

## Architecture

- [Personalized Content and Research Architecture](docs/ALIEN_COIN_CONTENT_ARCHITECTURE.md)
- [Research Spins, Action Tokens, and Live Coupons](docs/SPIN_ACTION_TOKENS_AND_LIVE_COUPONS.md)

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

Build the first Coin Studio and Spin screen where a user can:

1. Enter a five-word research seed.
2. Start a personalized spin.
3. Watch a 100-position action-token ledger fill with accepted work.
4. Inspect sources, claims, and generated content.
5. Assemble the result into a numbered Alien Coin.
6. Add live coupon slots with expiration and replacement rules.
7. Personalize the title, theme, font, and companion through small ⭐ edit portals.
8. Save and compare versions.
9. Inspect the full manifest before publishing.
