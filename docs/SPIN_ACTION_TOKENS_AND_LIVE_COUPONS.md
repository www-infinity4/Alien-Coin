# Alien Coin Research Spins, Action Tokens, and Live Coupons

## Corrected purpose of the 1/100 rule

The `1/100 Infinity` amount is not the reward for completing an entire personalized Alien Coin or research product.

It is the proposed credit for the user who supplies a small but useful seed—often five words—that starts a Bitcoin Crusher or Alien Coin research spin.

Example seed:

```text
helium arsenic rubber mold sugar
```

Those words create a search vector. They can cause Infinity AI to branch into scientific, commercial, historical, artistic, media, product, and speculative research paths. The user created the starting direction, but Infinity performs most of the expansion, verification, writing, organization, design, and assembly. Therefore the seed contribution is valued at one one-hundredth of an Infinity unit rather than the value of the complete product.

```text
five-word seed
    -> quantum-style search vector
    -> verified research actions
    -> personalized content assembly
    -> numbered Alien Coin or generated product
```

`Quantum-style search vector` is the project name for a highly connected semantic search seed. It must not be described as physical quantum computing unless an actual quantum service is used.

## Exact seed contribution record

```json
{
  "eventId": "seed_contribution_01J...",
  "spinId": "spin_01J...",
  "actorId": "user_01J...",
  "seedTerms": ["helium", "arsenic", "rubber", "mold", "sugar"],
  "seedTermCount": 5,
  "contributionType": "research_vector_seed",
  "infinitySubunits": 1,
  "subunitsPerInfinity": 100,
  "status": "pending_verification",
  "createdAt": 0
}
```

The seed must be original enough to start a useful spin and must pass duplicate, spam, and automated-farming checks. A browser cannot create settled Infinity by itself.

## Personalized research spin

A spin is a bounded build cycle that converts the user's seed into a usable research and content product.

A spin may create:

- Search queries.
- Source discoveries.
- Source checks.
- Claim records.
- Comparisons.
- Summaries.
- Article sections.
- Charts or diagrams.
- Content recommendations.
- Rights checks.
- Coupon matches.
- Theme decisions.
- Companion instructions.
- Website sections.
- Alien Coin manifest entries.
- Accessibility improvements.
- Version records.

The spin should finish with a product the user can inspect, edit, save, publish, or remix—not merely a score animation.

## One hundred action tokens

A personalized spin can print a set of 100 action tokens while Infinity performs the research and build process.

The 100-token set is an activity ledger for the spin. Each token represents one accepted action slot in the construction process.

```text
Spin token set: 1/100 through 100/100
```

Examples:

```json
{
  "actionTokenId": "spin_01J_action_037",
  "spinId": "spin_01J...",
  "position": 37,
  "actionType": "source_verified",
  "actorType": "infinity_ai",
  "sourceId": "source_01J...",
  "status": "accepted",
  "createdAt": 0
}
```

Action tokens may be assigned to:

- The user who provided the seed.
- Infinity AI agents that performed work.
- A human researcher or editor.
- A source-verification service.
- A theme or website builder.
- A rights or coupon validation service.

They preserve how the product was assembled. They do not automatically equal 100 Infinity and must not silently become spendable currency.

## Why action tokens grow quickly

Research products and generated websites can produce many actions rapidly. Every useful action may create a record, and each new version may produce another set of actions.

The system is intentionally capable of very large histories. Storage and indexing therefore need:

- Append-only event records.
- Batched summaries.
- Content-addressed deduplication.
- Archived versions.
- Search indexes.
- Per-spin limits.
- Clear distinction between raw actions and settled value.

The action supply may be effectively unbounded because creative and research activity is unbounded. The economic value of those actions is not fixed merely by their count.

## Current-time valuation

Action tokens, Alien Coins, and Infinity contribution credits can be evaluated using the rules and conditions valid at the time of settlement.

A valuation record should identify:

```json
{
  "valuationId": "valuation_01J...",
  "eventId": "seed_contribution_01J...",
  "policyVersion": "infinity_policy_2026_08",
  "valuedAt": 0,
  "infinitySubunits": 1,
  "reason": "five_word_seed_started_verified_spin",
  "approvedBy": ["policy_engine", "ledger_service"]
}
```

The system should not rewrite historical actions when current value changes. It should add a valuation or settlement event linked to the original action.

## Live coupon cycling

Coupons inside Alien Coins are active content records, not permanent dead images.

Every coupon must include:

- Issuer.
- Offer ID.
- Terms.
- Territory.
- Start time.
- Expiration time.
- Redemption limit.
- Rights or authorization record.
- Replacement or campaign category.

When a coupon expires, the wallet should not pretend it remains redeemable. The expired coupon moves into history and the live coupon slot can cycle to a current verified offer.

```text
live coupon
    -> expires
    -> archived redemption record
    -> replacement search
    -> current verified coupon
    -> wallet slot updated
```

The replacement may come from:

- The same issuer's next campaign.
- A user-approved category.
- The same product family.
- A merchant collection already followed by the user.
- A compatible partner offer.

The application must not replace an expired offer with an unrelated paid promotion without disclosure and user preference controls.

## Coupon cycle record

```json
{
  "cycleId": "coupon_cycle_01J...",
  "walletSlotId": "slot_coupon_food_01J...",
  "expiredOfferId": "offer_old_01J...",
  "replacementOfferId": "offer_live_01K...",
  "replacementReason": "same_issuer_new_campaign",
  "userPreferenceMatched": true,
  "sponsored": false,
  "cycledAt": 0
}
```

The old coupon remains visible in wallet history with an `expired` status. Its redemption history and attribution must never be erased.

## Separation of records

Keep these records separate:

- Seed contribution.
- Research action tokens.
- AI and human work attribution.
- Alien Coin edition and ownership.
- Coupon status and replacement.
- Infinity valuation.
- Infinity settlement.

This prevents a large generated website from turning thousands of internal actions into unapproved money.

## Immediate implementation order

1. Add a five-word seed form.
2. Create a spin ID and a 100-position action-token ledger.
3. Show each accepted research/build action as it fills a token position.
4. Assemble the resulting research into a numbered Alien Coin.
5. Record the user's proposed 1/100 Infinity seed contribution as pending.
6. Add coupon expiration status and a verified replacement queue.
7. Keep all financial settlement server-authorized and auditable.
