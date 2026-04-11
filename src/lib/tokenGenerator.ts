export function generateSeed(userId?: string): string {
  const base = `${userId ?? 'anon'}-${Date.now()}-${Math.random()}`;
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    hash = ((hash << 5) - hash) + base.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export function seededPick<T>(items: T[], seed: string, salt: string): T {
  if (items.length === 0) {
    throw new Error(`No items found for category "${salt}". Ensure the database is seeded (run: npm run seed).`);
  }
  const combined = seed + salt;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash) + combined.charCodeAt(i);
    hash |= 0;
  }
  return items[Math.abs(hash) % items.length];
}
