'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface TokenSummary {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
  rarityTier?: string;
}

interface WalletIdentity {
  address: string;
  shortId: string;
  blockHeight: number;
  createdAt: number;
}

const WALLET_KEY = 'alien-coin-wallet';
const TOKENS_KEY = 'alien-coin-tokens';

const RARITY_STYLES: Record<string, { border: string; glow: string; badge: string; label: string }> = {
  Heirloom: {
    border: 'border-yellow-400/60',
    glow: 'shadow-yellow-400/20',
    badge: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/40',
    label: '👑 Heirloom',
  },
  Provenance: {
    border: 'border-purple-400/60',
    glow: 'shadow-purple-400/20',
    badge: 'bg-purple-400/20 text-purple-300 border-purple-400/40',
    label: '📜 Provenance',
  },
  Utility: {
    border: 'border-cyan-400/40',
    glow: 'shadow-cyan-400/10',
    badge: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30',
    label: '⚡ Utility',
  },
};

function deriveAddress(hash: string, nonce: string): string {
  const combined = hash + nonce;
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = 'bc1q';
  for (let i = 0; i < 38; i++) {
    const code =
      combined.charCodeAt(i % combined.length) ^
      combined.charCodeAt((i * 7) % combined.length);
    result += chars[code % chars.length];
  }
  return result;
}

function deriveShortId(hash: string): string {
  const emojis = ['⚡', '🔮', '🌊', '🔥', '💎', '🌙', '⭐', '🧲'];
  const a = parseInt(hash.slice(0, 4), 16) % emojis.length;
  const b = parseInt(hash.slice(4, 8), 16) % emojis.length;
  return `${emojis[a]}${emojis[b]} ${hash.slice(0, 8).toUpperCase()}`;
}

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentTokens, setRecentTokens] = useState<TokenSummary[]>([]);
  const [wallet, setWallet] = useState<WalletIdentity | null>(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [nonce] = useState(() => {
    const buf = new Uint8Array(8);
    crypto.getRandomValues(buf);
    return Array.from(buf, (b) => b.toString(16).padStart(2, '0')).join('');
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TOKENS_KEY);
      if (stored) setRecentTokens(JSON.parse(stored));
      const w = localStorage.getItem(WALLET_KEY);
      if (w) setWallet(JSON.parse(w));
    } catch { /* ignore */ }
  }, []);

  const connectWallet = useCallback(async () => {
    setWalletLoading(true);
    try {
      let hash: string;
      let blockHeight = 0;
      try {
        const res = await fetch('https://blockchain.info/latestblock', { cache: 'no-store' });
        const block = await res.json() as { hash: string; height: number };
        hash = block.hash;
        blockHeight = block.height;
      } catch {
        const buf = new Uint8Array(32);
        crypto.getRandomValues(buf);
        hash = Array.from(buf, (b) => b.toString(16).padStart(2, '0')).join('');
      }
      const id: WalletIdentity = {
        address: deriveAddress(hash, nonce),
        shortId: deriveShortId(hash),
        blockHeight,
        createdAt: Date.now(),
      };
      localStorage.setItem(WALLET_KEY, JSON.stringify(id));
      setWallet(id);
      await fetch('/api/auth/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: id.address }),
      }).catch(() => {});
    } finally {
      setWalletLoading(false);
    }
  }, [nonce]);

  const disconnectWallet = useCallback(() => {
    localStorage.removeItem(WALLET_KEY);
    setWallet(null);
  }, []);

  const generateToken = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: wallet?.address }),
      });
      if (!res.ok) throw new Error('Failed to generate token');
      const data = await res.json() as {
        token: { id: string; title: string; summary: string; createdAt: string; rarityTier: string };
      };
      const newToken: TokenSummary = {
        id: data.token.id,
        title: data.token.title,
        summary: data.token.summary,
        createdAt: data.token.createdAt,
        rarityTier: data.token.rarityTier,
      };
      const updated = [newToken, ...recentTokens].slice(0, 10);
      setRecentTokens(updated);
      localStorage.setItem(TOKENS_KEY, JSON.stringify(updated));
      window.location.href = `/tokens/${data.token.id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_#0a1628_0%,_#0d1117_50%,_#0a0f1e_100%)] -z-10" />

      <header className="border-b border-[#21262d] bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👽</span>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent">
              Alien Coin
            </span>
            <span className="hidden sm:inline text-xs text-[#8b949e] border border-[#30363d] rounded-full px-2 py-0.5">
              Experience Bundles
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://infinity-synapses.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[#30363d] text-[#8b949e] hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              🧠 Infinity Synapses
            </a>
            {wallet ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 hidden sm:inline">{wallet.shortId}</span>
                <button
                  onClick={disconnectWallet}
                  className="text-xs px-3 py-1.5 rounded-lg border border-[#30363d] text-[#8b949e] hover:text-red-400 hover:border-red-500/40 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={walletLoading}
                className="text-xs px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors disabled:opacity-50"
              >
                {walletLoading ? '⏳ Connecting…' : '🔑 Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-8 drop-shadow-[0_0_40px_rgba(0,212,255,0.5)]">👽</div>
        <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent leading-tight">
          Alien Coin
          <br />
          <span className="text-3xl font-semibold">Experience Bundles</span>
        </h1>
        <p className="text-lg text-[#8b949e] max-w-2xl mx-auto mb-4 leading-relaxed">
          Each bundle is a unique, research-backed collection spanning music history,
          classic cinema, native trees, regional treats, Greek mythology, numismatics,
          gemology, and culinary heritage — minted as a transferable token.
        </p>
        <p className="text-sm text-[#8b949e] mb-4">
          Powered by the{' '}
          <strong className="text-[#f0c040]">Alien Coin (Anndy Lian v2)</strong> concept ·
          Assembled via the{' '}
          <a href="https://infinity-synapses.vercel.app" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
            Infinity Synapses
          </a>{' '}
          research pipeline.
        </p>

        {wallet && (
          <div className="inline-flex items-center gap-2 text-sm text-cyan-400 bg-cyan-500/5 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Wallet connected · {wallet.shortId}
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-center mb-12 mt-4">
          <button
            onClick={generateToken}
            disabled={loading}
            className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-lg rounded-full shadow-lg shadow-cyan-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Minting Bundle…
              </span>
            ) : '🚀 Mint Your Token'}
          </button>
          {!wallet && (
            <button
              onClick={connectWallet}
              disabled={walletLoading}
              className="px-8 py-4 border border-cyan-500/30 text-cyan-400 font-bold text-lg rounded-full hover:bg-cyan-500/10 transition-all duration-300 disabled:opacity-50"
            >
              {walletLoading ? '⏳…' : '🔑 Connect Wallet First'}
            </button>
          )}
        </div>

        {error && (
          <div className="mt-2 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 max-w-md mx-auto">
            {error}
          </div>
        )}
      </section>

      {/* Rarity tiers */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-bold text-center mb-6 text-[#e6edf3]">Research-Driven Rarity Tiers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              tier: 'Heirloom',
              icon: '👑',
              desc: 'Rare or low-mintage coins and the Alien Coin series. Tied to documented historical scarcity — the highest rarity.',
            },
            {
              tier: 'Provenance',
              icon: '📜',
              desc: 'Bundles anchored to verified Internet Archive primary sources. Research you can trace back to the original record.',
            },
            {
              tier: 'Utility',
              icon: '⚡',
              desc: 'High-information bundles rich with practical knowledge — recipes, planting guides, geological data and more.',
            },
          ].map(({ tier, icon, desc }) => {
            const s = RARITY_STYLES[tier];
            return (
              <div key={tier} className={`bg-[#161b22] border-2 rounded-xl p-5 ${s.border} shadow-lg ${s.glow}`}>
                <div className="text-3xl mb-2">{icon}</div>
                <div className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mb-3 ${s.badge}`}>
                  {s.label}
                </div>
                <p className="text-sm text-[#8b949e] leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-[#21262d]">
        <h2 className="text-2xl font-bold text-center mb-12 text-[#e6edf3]">What&apos;s Inside Each Bundle</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { icon: '🎵', label: 'Song', desc: 'Classic music from jazz to rock' },
            { icon: '🎬', label: 'Movie', desc: 'Public domain cinema gems' },
            { icon: '🌳', label: 'Tree', desc: 'Native North American trees' },
            { icon: '📍', label: 'Ecoregion', desc: 'Suggested planting zones' },
            { icon: '🍯', label: 'Treat Idea', desc: 'Regional American delicacies' },
            { icon: '⚡', label: 'Greek God', desc: 'Mythology & epic stories' },
            { icon: '🪙', label: 'Coin', desc: 'Numismatic history & rarity' },
            { icon: '💬', label: 'Quote', desc: 'Historic American speeches' },
            { icon: '💎', label: 'Gemstone', desc: 'Minerals & ethical sourcing' },
            { icon: '🍽️', label: 'Meal', desc: 'Appalachian & Southern cuisine' },
          ].map(({ icon, label, desc }) => (
            <div
              key={label}
              className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 text-center hover:border-cyan-500/40 transition-colors"
            >
              <div className="text-3xl mb-2">{icon}</div>
              <div className="font-semibold text-[#e6edf3] text-sm">{label}</div>
              <div className="text-xs text-[#8b949e] mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {recentTokens.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-16 border-t border-[#21262d]">
          <h2 className="text-xl font-bold mb-6 text-[#e6edf3]">Your Minted Bundles</h2>
          <div className="space-y-3">
            {recentTokens.map((token) => {
              const tier = token.rarityTier ?? 'Utility';
              const s = RARITY_STYLES[tier] ?? RARITY_STYLES.Utility;
              return (
                <Link
                  key={token.id}
                  href={`/tokens/${token.id}`}
                  className={`block bg-[#161b22] border-2 rounded-xl p-4 hover:bg-[#1c2128] transition-all group shadow-lg ${s.border} ${s.glow}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-medium text-[#e6edf3] group-hover:text-cyan-400 transition-colors truncate">
                          {token.title}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold shrink-0 ${s.badge}`}>
                          {s.label}
                        </span>
                      </div>
                      <div className="text-sm text-[#8b949e] line-clamp-1">{token.summary}</div>
                    </div>
                    <div className="text-xs text-[#8b949e] whitespace-nowrap">
                      {new Date(token.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-2 text-xs font-mono text-[#8b949e]">{token.id.substring(0, 16)}…</div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="max-w-3xl mx-auto px-4 py-12 border-t border-[#21262d]">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 text-sm text-[#8b949e] leading-relaxed">
          <p className="font-semibold text-[#e6edf3] mb-2">⚠️ Disclaimer</p>
          <p>
            The &quot;Alien Coin (Anndy Lian v2)&quot; concept is a{' '}
            <strong className="text-[#e6edf3]">fictional collector concept</strong> for
            educational and creative purposes only. It is NOT real currency, legal tender, or an
            investment vehicle. No monetary value is implied or should be inferred. Wallets are
            derived identities only — no real cryptocurrency is held or transferred.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#21262d] py-8 text-center text-sm text-[#8b949e]">
        <p>
          Alien Coin — Experience Bundles Platform ·{' '}
          Powered by{' '}
          <a
            href="https://infinity-synapses.vercel.app"
            className="text-cyan-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Infinity Synapses
          </a>
        </p>
      </footer>
    </div>
  );
}

