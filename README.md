# Alien Coin — Experience Bundles

A Next.js app that generates unique, research-backed experience bundles stored as transferable tokens.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and update it if needed:

```bash
cp .env.example .env
```

For local development the default `DATABASE_URL=file:./dev.db` works out of the box.
For production, set `DATABASE_URL` to a [Turso](https://turso.tech) libSQL connection string.

### 3. Set up the database

Run migrations and seed data in one step:

```bash
npm run db:setup
```

Or run them separately:

```bash
npx prisma migrate deploy   # apply migrations
npm run seed                # seed reference data
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:setup` | Run migrations + seed (first-time setup) |
| `npm run seed` | Re-seed reference data |
| `npm run lint` | Run ESLint |

## Deploy on Vercel

Set the `DATABASE_URL` environment variable in your Vercel project settings to a Turso libSQL connection string, then deploy.

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
