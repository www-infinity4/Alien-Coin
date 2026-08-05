# Alien Coin Minting Station

## Product vision

Alien Coin is an entertainment-first creator minting station. A person can mint up to ten free personal coins during a defined introductory program. Each coin can carry more than a portrait: it can preserve a note, drawing, photograph, voice clip, short video, coupon, event access, card connection, stamp, certificate, or creator story.

The result is a wallet asset with a visible face and a structured package of attached experiences and provenance.

## What makes the coin valuable

Value is not guaranteed and must be described as speculative unless supported by a completed sale. Possible sources of interest include:

- creator identity and authorship;
- limited edition and serial number;
- unique note, signature-style mark, drawing, photograph, audio, or video;
- attached coupon, ticket, membership, or digital experience;
- relationship to a trading card, stamp, artwork, event, game, or product;
- documented creation history;
- verified transfers and completed sales;
- cultural or personal importance.

The interface must distinguish:

- speculative value;
- asking price;
- current bid;
- completed sale price;
- attached coupon value;
- nonfinancial personal meaning.

## Mint flow

```text
Enter the minting station
→ choose coin world and finish
→ add portrait, photo, drawing, or generated art
→ add a note, story, audio, or short video
→ attach optional card, stamp, coupon, ticket, or experience
→ choose edition size and serial policy
→ preview both sides and the asset capsule
→ confirm rights and privacy
→ mint to the user wallet
```

## Ten-free-coin program

The introductory allowance is a policy enforced by the server, not a browser counter.

- Maximum: ten qualifying free mints per verified account during the program.
- A failed mint does not consume an allowance.
- Deleted drafts do not consume an allowance.
- Successfully issued serials remain in the audit record.
- Duplicate-account and automation abuse controls are required.
- The product must disclose storage, transfer, redemption, and future-fee rules before confirmation.

## Coin asset capsule

Every coin should contain a machine-readable capsule:

```json
{
  "coinId": "alien-coin-permanent-id",
  "edition": { "size": 10, "serial": 4 },
  "creator": { "id": "user-id", "displayName": "Creator" },
  "media": ["front-image", "back-image", "note", "audio", "video"],
  "attachments": ["card", "stamp", "coupon", "event-pass"],
  "rights": { "display": true, "resale": true, "commercial": false },
  "provenance": ["drafted", "approved", "minted", "transferred"]
}
```

## Connected trading-card model

A coin can back a trading card, and a trading card can back a coin, without pretending that either guarantees a cash value.

Examples:

- a 1/1 card contains a one-of-one companion coin;
- a /10 card edition links to ten individually serialized coins;
- a coin contains a certificate for a physical card;
- a card unlocks an audio message or video stored in the coin capsule;
- a stamp or material insert is documented as an attached physical asset;
- a completed sale updates provenance for both linked records.

The two records keep separate permanent IDs and can be transferred together or independently only when the creator's rules permit it.

## Famous-person and guest contributions

A guest may contribute a note, drawing, image, or recorded message only with explicit consent and recorded rights. The system must not imply endorsement, authenticity, or ownership merely because a public figure's name is typed into a prompt.

Required states:

- unverified fan-created tribute;
- contributor-submitted;
- identity verified;
- rights verified;
- licensed collaboration.

## Entertainment layer

Minting should feel like entering an attraction rather than completing a tax form:

- rotating 3D coin stage;
- planetary mint rooms;
- reveal animation;
- capsule assembly sequence;
- sound and haptic feedback controls;
- surprise coupon or experience reveal;
- gallery wall of recent public mints;
- private studio for drafts;
- collectible finish previews;
- accessible reduced-motion mode.

## Visual direction

The new interface should move beyond a single generic Copilot style:

- asymmetric museum and arcade composition;
- oversized coin stage;
- deep black, cosmic glass, brushed metal, mineral, and holographic surfaces;
- editorial typography rather than uniform dashboard cards;
- different portal shapes for Mint, Wallet, Gallery, Coupons, Cards, and Experiences;
- premium motion with reduced-motion fallback;
- phone-first controls reachable with one thumb.

## Storage and upload architecture

Do not store large user assets as Base64 in localStorage.

Use:

- direct signed uploads to private object storage;
- immediate local preview;
- resumable upload and retry;
- optimized public derivatives;
- original-file hash and metadata;
- recent uploads library;
- draft autosave;
- explicit public/private status;
- malware and file-type scanning;
- user-controlled deletion subject to transaction record retention.

## Wallet security

The wallet cannot truthfully be called impossible to hack. It should use:

- passkeys or strong modern authentication;
- short-lived sessions;
- authenticated encryption;
- server-authoritative mint limits and transfers;
- append-only signed provenance events;
- no private keys or API secrets in browser storage;
- rate limiting and anti-automation controls;
- isolated media processing;
- dependency and secret scanning;
- backups and reversible releases;
- independent security review before real-value transactions.

## Core portal layout

```text
Large 3D Mint Stage
├── Start a Free Mint
├── Continue Draft
├── Recent Uploads
├── Attach Card / Stamp / Coupon
└── Preview Wallet Capsule

Live side portals
├── Public Gallery
├── Coupon and Experience Drops
├── Connected Trading Cards
├── Creator Stories
└── Wallet and Provenance
```

## Implementation phases

### Phase 1 — visual mint studio

- premium responsive design;
- 3D-style coin preview;
- front/back editor;
- notes and drawings;
- recent-upload picker;
- local drafts only, clearly labeled.

### Phase 2 — account storage

- authenticated accounts;
- private object storage;
- server-side draft records;
- ten-free-mint policy;
- wallet capsule.

### Phase 3 — attachments

- cards;
- stamps;
- coupons;
- events;
- audio and short video;
- rights and expiration controls.

### Phase 4 — transfer and market

- serialized editions;
- atomic transfer;
- completed-sale records;
- speculative-value labels;
- fraud and dispute workflow.

## Preservation rule

Do not replace the earlier Spark design or existing mint logic blindly. Archive screenshots and behavior, identify the strongest visual and functional parts, and migrate them into the new interface with attribution and reversible versions.