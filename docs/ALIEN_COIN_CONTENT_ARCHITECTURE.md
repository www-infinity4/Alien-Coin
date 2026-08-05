# Alien Coin — Personalized Content and Research Architecture

## Purpose

Alien Coin is a collectible data-container system built on the Infinity backbone. A coin is not only a balance or decorative token. It is a permanent, numbered package of useful, attributable, and versioned content.

An Alien Coin may contain a unique combination of:

- Movies or licensed video references.
- Music or licensed audio references.
- Coupons and time-limited offers.
- Poems, stories, scripts, and artwork.
- Research articles and source collections.
- Tutorials, demonstrations, and educational material.
- User-created themes, layouts, companions, and worlds.
- Product information, marketplace listings, and authorized downloads.

The system should let users collect, personalize, improve, publish, remix, and responsibly exchange these packages while preserving creator attribution, licensing, provenance, and version history.

## Core principle

```text
Alien Coin = permanent identity + numbered edition + content manifest + rights manifest + version chain
```

The visible name and presentation may change. The permanent coin ID and history must not.

## Numbered editions

Alien Coins can be issued as unique or limited sets:

- 1/1
- 1/10
- 1/100
- 1/1,000
- Open edition with a defined issuance policy

The edition number describes the collectible content package. It does not automatically promise monetary value, profit, or redemption.

Example:

```json
{
  "coinId": "alien_coin_01J...",
  "seriesId": "series_poppy_research_01J...",
  "editionNumber": 1,
  "editionSize": 100,
  "displayName": "Poppy Research and Film Collection",
  "creatorId": "user_01J...",
  "currentVersion": 4,
  "status": "published",
  "createdAt": 0,
  "updatedAt": 0
}
```

## Content manifest

Every item inside a coin must be recorded rather than hidden inside an unstructured blob.

```json
{
  "contentId": "content_01J...",
  "coinId": "alien_coin_01J...",
  "type": "research_article",
  "title": "History and Uses of Poppies",
  "creatorId": "user_01J...",
  "sourceIds": ["source_01J..."],
  "rightsId": "rights_01J...",
  "version": 3,
  "position": 5,
  "visibility": "public",
  "integrityHash": "sha256:...",
  "createdAt": 0
}
```

Supported content types should include at minimum:

- `movie`
- `music`
- `coupon`
- `poem`
- `research_article`
- `source_collection`
- `image`
- `world_theme`
- `companion_profile`
- `product`
- `tutorial`
- `external_reference`

## Research article writers

Alien Coin should include a writer workspace connected to the larger Infinity research system.

Writers can:

- Start from an original question or idea.
- Import approved public sources.
- Add notes and quotations within allowed limits.
- Separate claims, interpretations, theories, and opinions.
- Ask AI to organize, compare, summarize, or format material.
- Add their own explanation, examples, diagrams, or personal perspective.
- Save named versions.
- Publish an article into one or more Alien Coins.
- Receive attribution when another creator remixes or expands the work.

AI assistance must be disclosed in the article record. AI should not invent sources or silently replace the writer's authorship.

## Personalization

Personalization is creative work performed on a coin or an item inside it. Examples include:

- Rewriting an introduction for a specific audience.
- Selecting and arranging a movie-and-music set.
- Creating a new theme or font combination.
- Adding an original poem or artwork.
- Improving accessibility.
- Adding verified citations.
- Translating content with proper attribution.
- Building a companion personality around the collection.
- Creating a classroom, family, fishing, art, science-fiction, or other focused version.

A personalization creates a new version or remix. It must never overwrite the original history.

```text
Coin v1
  → personalized v2
      → research expansion v3
      → public remix A
      → private classroom version B
```

## Infinity contribution credit

The proposed `1/100` concept is recorded as a contribution rule candidate:

> A verified qualifying personalization may receive one one-hundredth of an Infinity contribution unit, subject to policy, anti-abuse checks, funding rules, and ledger approval.

This should be represented internally as an exact integer subunit rather than floating-point money.

```json
{
  "eventId": "contribution_01J...",
  "actorId": "user_01J...",
  "coinId": "alien_coin_01J...",
  "versionId": "version_01J...",
  "reason": "verified_content_personalization",
  "subunits": 1,
  "subunitsPerInfinity": 100,
  "status": "pending_review",
  "createdAt": 0
}
```

A local browser action must not mint spendable Infinity. Production credit requires a server-verified event and an auditable Infinity ledger entry.

## What qualifies for credit

A personalization should qualify only when it adds measurable value, such as:

- New original writing.
- Verified source improvement.
- Meaningful curation or organization.
- Accessibility improvement.
- Approved translation.
- A functional theme, page, tool, or companion configuration.
- A version adopted or used by other verified users.

The following should not qualify:

- Changing one character repeatedly.
- Automated spam.
- Copying protected work without permission.
- Fake citations.
- Self-generated bot traffic.
- Duplicate uploads.
- Cosmetic changes created only to farm rewards.

## Rights and licensing

A coin can reference or contain media only under an appropriate rights record.

```json
{
  "rightsId": "rights_01J...",
  "contentId": "content_01J...",
  "rightsHolderId": "partner_01J...",
  "licenseType": "stream_reference",
  "territories": ["US"],
  "startsAt": 0,
  "endsAt": 0,
  "commercialUse": false,
  "transferable": false
}
```

Uploading a movie or song does not create permission to distribute it. Alien Coin should distinguish:

- Metadata and external references.
- User-owned uploads.
- Public-domain material.
- Licensed streaming.
- Licensed downloads.
- Promotional previews.
- Private material.

Coupons must include issuer, terms, expiration, territory, and redemption limits.

## Collection and discovery

The application should provide:

- Five newest Alien Coins.
- Searchable and scrollable full collection.
- Filters by content type, creator, edition, theme, topic, and rights status.
- Personal vault and public collection views.
- Version history and remix ancestry.
- Source and rights inspection.
- Saved collections and playlists.
- The small ⭐ edit portal beside editable names, sections, themes, and companion identities.

## Infinity and quantum reality language

The product may describe its long-term goal as building an increasingly connected digital reality from verified human creativity, research, media, and AI-assisted organization.

`Quantum reality` should be presented as the project's design vision unless a specific feature uses actual quantum hardware or a scientifically validated quantum protocol. The software should not claim that ordinary database records are physically quantum merely because they are complex or securely linked.

## Security

Alien Coins are identity-bound ledger records rather than anonymous files that become valid when copied.

Required protections include:

- Signed server events.
- Immutable IDs.
- Append-only version history.
- Source and rights validation.
- Role-based permissions.
- Rate limits and abuse review.
- Recovery and revocation.
- Integrity hashes for content versions.
- No client-held minting authority.
- No arbitrary HTML, script, or executable uploads.

## Build stages

### Stage 1 — Structured prototype

- Coin creation form.
- Numbered editions.
- Typed content manifest.
- Research writer workspace.
- Local version history.
- Search and collection views.
- Simulated contribution display only.

### Stage 2 — Authenticated content network

- User identities and vaults.
- Server-backed coin manifests.
- Rights and source records.
- Public publishing and remix ancestry.
- Moderation and reporting.

### Stage 3 — Infinity contribution settlement

- Verified personalization events.
- Exact 1/100 subunit accounting when approved.
- Anti-farming review.
- Creator dashboards.
- Transparent settlement history.

### Stage 4 — Partner media and commerce

- Studio, musician, publisher, coupon issuer, and merchant portals.
- Licensed content packages.
- Creator marketing agreements.
- Infinity settlement through separately approved contracts.

## Immediate product goal

The first real screen should let a user create an Alien Coin, choose an edition size, add several typed content items, personalize the title/theme/companion through ⭐ controls, save a version, and inspect the resulting manifest before publishing.