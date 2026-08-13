# Alien Coin in the Unified Infinity Wallet

Alien Coin now requests the same wallet ID used by Infinity Mint, Bitcoin Crusher, and StarQuest.
The wallet is approved in the central Infinity Wallet window and returned to Alien Coin through a
strict-origin browser message. Alien Coin uses that ID as the owner of each minted token instead of
inventing an unrelated Bitcoin-shaped address.

An Alien Coin remains an individually owned collectible. Its token ID, items, media, personal
contributions, hashes, creation time, and transfer history move together when ownership changes. It
is not converted into a generic Infinity balance during a collectible sale.

## Protected rarity lane

The shared rarity guardian may flag a token because of unusual impressions, a limited edition,
verified attachments, a verified contributor, or specific search demand. A protected collectible:

- cannot be consumed as an ordinary wallet credit;
- may appear automatically in a discovery-only marketplace listing;
- remains owned by its current owner;
- requires owner approval before a sale;
- transfers as the complete token; and
- retains every earlier provenance event after transfer.

Search matching can connect a buyer looking for a particular verified signed collectible with a
token whose metadata actually supports that query. Search terms alone never authenticate a name.

## Attributed signatures and personal contributions

Typing a public figure's name or drawing their signature does not create a verified contribution.
Attributed signatures, personal videos, recordings, and artwork fail closed until contributor
identity, contribution rights, and provenance are verified. Unverified work must remain labeled as
unverified or fan-created and cannot be promoted as an authentic signed collectible.

## Phone, Stripe, Plaid, and GitHub

- A passkey can ask a phone to verify its user with a fingerprint, face check, or device PIN. The
  site receives a signed passkey result, not fingerprint data.
- Stripe Identity and Plaid require separately approved provider accounts, server credentials, and
  verified webhooks. GitHub cannot create or bypass those accounts.
- GitHub can preserve source files, commits, hashes, and release history. That provenance supports
  the audit trail but does not replace identity, payment, bank-account, or rights verification.

The exact provider readiness states are recorded in
`data/verification-provider-readiness.json`. Any missing provider remains visibly
`NOT_CONFIGURED`; the interface must never simulate a successful verification.
