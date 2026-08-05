# C13b0 Action Token Engine

## Purpose

The C13b0 action token engine turns a human request, click, research step, build step, or system event into an attributable action record. A submitted query creates one parent Query Token, while the interpreter may discover many child actions inside that query.

The system is intended to measure participation, research, construction, and useful product creation without automatically turning every internal event into spendable Infinity.

## First worked example

User message:

> Every question is a token. Inside a query there are verbs, nouns, intentions, clicks, research steps, build steps, and code actions.

The engine records:

```text
Parent Query Token
├── submit query
├── identify subject
├── identify requested action
├── identify objects and categories
├── extract constraints
├── connect prior project context
├── design research plan
├── retrieve sources
├── evaluate sources
├── create structured notes
├── generate implementation
├── validate implementation
├── save version
└── publish or return result
```

Only one parent user reward is released for the submitted query. The child actions describe the work performed and form the product's construction history.

## Token hierarchy

### 1. Query Token

Created when a verified user submits a meaningful request, seed, question, or command.

### 2. Semantic Action Tokens

Created from language structure and intent, including:

- Subject or noun identification.
- Verb or requested operation.
- Object and target identification.
- Constraint extraction.
- Time, place, category, and relationship extraction.
- Question classification.
- Search-vector creation.

These are analysis records, not separate automatic payments.

### 3. Research Action Tokens

Examples:

- Search issued.
- Source discovered.
- Source opened.
- Claim extracted.
- Claim compared.
- Contradiction found.
- Citation attached.
- Finding categorized.
- Uncertainty recorded.
- Research article section created.

### 4. Build Action Tokens

Examples:

- `DOCTYPE` or document shell created.
- Component created.
- Route created.
- Theme selected.
- Font selected.
- Data schema defined.
- API connected.
- Accessibility check completed.
- Test executed.
- Bug fixed.
- Version saved.
- Deployment prepared.

### 5. Interaction Action Tokens

Examples:

- Verified page click.
- Search refinement.
- Design applied.
- Article opened.
- Coupon saved.
- Video checkpoint reached.
- Companion used.
- Creation remixed.

Clicks should be recorded only when they help improve navigation, relevance, accessibility, design, or product decisions. Repeated meaningless clicking must not generate unlimited rewards.

### 6. Settlement Action Tokens

Examples:

- Daily allowance evaluated.
- Product sale verified.
- Contribution reviewed.
- Reward approved.
- Reward denied.
- Liability created.
- Liability settled.
- Token frozen or recovered.

Settlement actions require the authoritative Infinity ledger.

## C13b0 script behavior

Each parent token can run as a C13b0 script. The script is an execution graph rather than one flat coin.

```json
{
  "tokenId": "query_01J...",
  "scriptType": "c13b0",
  "actorId": "user_01J...",
  "submittedAt": "2026-08-04T22:06:00-05:00",
  "category": "system_design",
  "categoryColor": "violet",
  "inputHash": "sha256:...",
  "state": "bricked",
  "rewardState": "pending",
  "children": [
    "action_01J...",
    "action_01K..."
  ]
}
```

The engine can continue discovering new action categories as technology and current needs change. New types must still receive a schema, category, timestamp, actor, source, permissions, and settlement policy before becoming payable.

## Bricked token model

The visible token may appear as a small brick sequence:

```text
🧱🧱🧱🧱
```

A bricked token is a sealed construction package containing:

- Permanent token ID.
- User or organization identity.
- Timestamp and sequence.
- Category and color.
- Parent and child relationships.
- Input and output hashes.
- Research sources.
- Build artifacts.
- Rights records.
- Reward state.
- Unlock conditions.
- Recovery and revocation state.

The brick is not valuable merely because someone copies it. Its authoritative state belongs to the Infinity ledger and its permitted owner. Copying the visible hash does not copy the identity, signatures, permissions, source records, or current sequence.

## Unlocking

A bricked token can reveal additional layers as verified work is completed:

```text
Submitted
→ parsed
→ researched
→ sourced
→ built
→ tested
→ adopted
→ commercially licensed
```

Unlocking may expose the research, website, product, coupon, media package, rights, or settlement connected to the token. It must not promise a real-world asset until that asset has been contractually funded, licensed, deposited, or otherwise verified.

## Daily participation model

Proposed policy candidate:

- A user may receive up to 100 basic participation token credits per day.
- One meaningful verified query or action may advance the daily count.
- Internal AI child actions do not each become user payments.
- Users may earn additional value through verified products, sales, licensing, employment, contributions, or creator agreements.
- A proposed monetary-equivalent ceiling such as $300 per day must remain a separate, funded policy and cannot be guaranteed by client software or arbitrary issuance.

The purpose of a daily baseline is universal participation and basic support, not forcing people to click continuously or rewarding bots.

## Separate counts

The interface must show these separately:

```text
User actions today: 37 / 100
C13b0 child actions produced: 486
Bricked construction tokens: 12
Unlocked products: 3
Pending Infinity settlement: 0.04
Verified external sales: separate ledger
```

This prevents a complex website with thousands of internal actions from silently creating thousands of spendable units.

## Category colors

Initial categories:

- Violet — query and system design.
- Blue — research and sources.
- Green — build and implementation.
- Gold — verified product or commercial value.
- Orange — interaction and adoption.
- Silver — identity, provenance, and versioning.
- Red — risk, dispute, freeze, or failed integrity.

Color is presentation metadata, not proof of value.

## Security

Required controls:

- Server signatures.
- Append-only event records.
- Actor-bound permissions.
- Monotonic sequence numbers.
- Replay protection.
- Idempotency keys.
- Device and session integrity checks.
- No client-side mint authority.
- No reward from hidden tabs, bots, repeated clicks, or duplicate queries.
- Recovery that freezes an old credential and issues a replacement pointing to the same authoritative history.

No system should be described as impossible to hack. The goal is that copied or stolen token data is unusable, detectable, reversible, and unable to rewrite the authoritative ledger.

## Product interface

The first C13b0 Token Inspector should display:

1. The parent query.
2. Its semantic actions.
3. Research and build actions.
4. A color-coded timeline.
5. Current brick/unlock state.
6. User reward separately from AI work count.
7. Sources, artifacts, and rights.
8. Versions and descendants.
9. Integrity and recovery state.
10. Any funded settlement or real-world asset connection.
