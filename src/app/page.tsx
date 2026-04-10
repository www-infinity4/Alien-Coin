'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TokenSummary {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
}

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentTokens, setRecentTokens] = useState<TokenSummary[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('alien-coin-tokens');
    if (stored) {
      try {
        setRecentTokens(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  const generateToken = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error('Failed to generate token');
      const data = await res.json();
      const newToken: TokenSummary = {
        id: data.token.id,
        title: data.token.title,
        summary: data.token.summary,
        createdAt: data.token.createdAt,
      };
      const updated = [newToken, ...recentTokens].slice(0, 5);
      setRecentTokens(updated);
      localStorage.setItem('alien-coin-tokens', JSON.stringify(updated));
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
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-2xl">👽</span>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent">
            Alien Coin
          </span>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="text-7xl mb-8 drop-shadow-[0_0_40px_rgba(0,212,255,0.5)]">👽</div>
        <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent leading-tight">
          Alien Coin
          <br />
          <span className="text-3xl font-semibold">Experience Bundles</span>
        </h1>
        <p className="text-lg text-[#8b949e] max-w-2xl mx-auto mb-4 leading-relaxed">
          Each bundle is a unique, seeded collection of curated content spanning music history,
          classic cinema, native trees, regional treats, Greek mythology, numismatics,
          gemology, and culinary heritage.
        </p>
        <p className="text-sm text-[#8b949e] mb-12">
          Powered by the{' '}
          <strong className="text-[#f0c040]">Alien Coin (Anndy Lian v2)</strong> concept —
          a fictional collector series for educational &amp; creative exploration.
        </p>

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
              Generating Bundle…
            </span>
          ) : '🚀 Generate Your Token'}
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 max-w-md mx-auto">
            {error}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-[#21262d]">
        <h2 className="text-2xl font-bold text-center mb-12 text-[#e6edf3]">What&apos;s Inside Each Bundle</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: '🎵', label: 'Song', desc: 'Classic music from jazz to rock' },
            { icon: '🎬', label: 'Movie', desc: 'Public domain cinema gems' },
            { icon: '🌳', label: 'Tree', desc: 'Native North American trees' },
            { icon: '📍', label: 'Planting Location', desc: 'Where to grow them' },
            { icon: '🍯', label: 'Treat Idea', desc: 'Regional American delicacies' },
            { icon: '⚡', label: 'Greek God', desc: 'Mythology & epic stories' },
            { icon: '🪙', label: 'Coin', desc: 'Numismatic history & rarity' },
            { icon: '💬', label: 'Quote', desc: 'Historic American speeches' },
            { icon: '💎', label: 'Gemstone', desc: 'Minerals & ethical sourcing' },
            { icon: '🍽️', label: 'Meal', desc: 'Appalachian & Southern cuisine' },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 text-center hover:border-cyan-500/40 transition-colors">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="font-semibold text-[#e6edf3] text-sm">{label}</div>
              <div className="text-xs text-[#8b949e] mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {recentTokens.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-16 border-t border-[#21262d]">
          <h2 className="text-xl font-bold mb-6 text-[#e6edf3]">Your Recent Bundles</h2>
          <div className="space-y-3">
            {recentTokens.map((token) => (
              <Link
                key={token.id}
                href={`/tokens/${token.id}`}
                className="block bg-[#161b22] border border-[#21262d] rounded-xl p-4 hover:border-cyan-500/40 hover:bg-[#1c2128] transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#e6edf3] group-hover:text-cyan-400 transition-colors truncate">
                      {token.title}
                    </div>
                    <div className="text-sm text-[#8b949e] mt-1 line-clamp-1">{token.summary}</div>
                  </div>
                  <div className="text-xs text-[#8b949e] whitespace-nowrap">
                    {new Date(token.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-2 text-xs font-mono text-[#8b949e]">{token.id.substring(0, 16)}…</div>
              </Link>
            ))}
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
            investment vehicle. No monetary value is implied or should be inferred. All cultural,
            historical, and educational content is provided for informational purposes only.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#21262d] py-8 text-center text-sm text-[#8b949e]">
        <p>Alien Coin — Experience Bundles Platform</p>
      </footer>
    </div>
  );
}

