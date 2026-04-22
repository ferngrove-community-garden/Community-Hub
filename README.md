# Fern Grove Community Hub

Initial `Next.js` + `TypeScript` scaffold for the Fern Grove Community Garden community hub.

## Getting Started

Run the development server:

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Available Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production build locally
- `npm run lint` - run ESLint

## Planned Stack

- `Next.js` app router frontend
- `Supabase` for database, auth, and storage
- `Brevo` for outbound email
- `Vercel` for deployment

## Supabase Scaffolding

- SQL schema and RLS starter: `supabase/migrations/20260422_initial_garden_hub.sql`
- TypeScript row types: `src/lib/garden-schema.ts`
- Repository seam for swapping mock data to Supabase: `src/lib/garden-repository.ts`
- Public env example: `.env.local.example`

Current pages still render seeded data, but they now read through the repository layer so Supabase queries can be introduced without rebuilding the page structure.
