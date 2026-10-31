# QuantaPhi same-origin Alien Coin mint contract

The public QuantaPhi site hosts Alien Coin under `https://quantaphi.org/alien-coin/`. Previously, the frontend posted to `https://alien-coin.marvaseater.workers.dev/api/tokens` from the browser. The deployed API advertises `Access-Control-Allow-Origin: https://www-infinity4.github.io`, so QuantaPhi requests do not have a matching CORS origin.

## Repaired path

1. The Alien Coin frontend now uses `/alien-coin/api/*` when hosted at quantaphi.org and keeps the old Worker endpoint for the legacy GitHub Pages origin.
2. QuantaPhi's own edge Worker has a small `/alien-coin/api/*` proxy to the existing Cloudflare Alien Coin API. It forwards authorization and JSON; it does **not** forward browser cookies or arbitrary headers. GET/POST and allowed API prefixes only, with an origin guard, no cache and no redirect following.
3. Users must sign into the existing Alien Coin registered wallet before minting. The POST uses the signed Bearer session; it does not accept a fabricated client wallet address.
4. A new token is shown as minted only when the Cloudflare API returns `CLOUDFLARE_D1_CARD_WORLD`, the owner matches the signed wallet, and a subsequent `GET /api/tokens/:id` confirms the saved record.
5. Optional interest imports only read explicitly selected Alien Coin activity; the former sweep over unrelated localStorage keys is removed.

## Deploy ordering

Both PRs must pass independent tests and be published together. **Deploy QuantaPhi's proxy before changing the Alien Coin frontend.** Until both are deployed, do not claim minting or data retrieval is fixed. This is the existing D1 mint—no securities, cash value, new blockchain or AI connection is minted by this code.

## Unresolved

- Actual live human sign-in, token ownership, backend readback and device behavior require production/browser acceptance.
- The Alien Coin Worker currently has a D1 binding, no Oracle service binding; its content search uses public server resources with fallbacks. Do not claim it uses a connected model.
- Any issuer-backed Cardone Capital Notes price/ownership needs documented authorization and valuation, not a UI coin.
