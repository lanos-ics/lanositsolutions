# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (forces IPv4 DNS resolution)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run db:migrate   # Run Prisma migrations (requires DATABASE_URL)
npm run db:studio    # Open Prisma Studio to inspect data
npm run db:generate  # Regenerate Prisma client after schema changes
```

No test suite exists. There is no CI/CD pipeline.

## Architecture

**Next.js 16 marketing + CMS site** for Lanos IT Solutions. TypeScript throughout, Tailwind CSS 4 for styling, GSAP + Lenis for animations.

### Data Layer

**Prisma v7 + PostgreSQL (Neon)**. Schema at `prisma/schema.prisma`. Generated client at `src/generated/prisma/` (gitignored — regenerated via `postinstall`).

Models: `Blog`, `Comment`, `Like` (join table for toggle-likes), `Track`, `Course` (compound PK `[trackSlug, slug]`).

Each domain has two modules:
- `api.ts` — async read-only queries (Server Components, public API routes)
- `store.ts` — async CRUD mutations (admin API routes only)

Prisma singleton in `src/lib/prisma.ts` uses `@prisma/adapter-pg` with a `pg` connection pool reading `DATABASE_URL`.

### Authentication

Custom JWT system (not NextAuth, despite the package being present):
- `src/lib/auth.ts` — creates/verifies HMAC-SHA256 JWTs, sets `lanos_admin_session` httpOnly cookie (24h TTL)
- `src/proxy.ts` (middleware) — guards all `/admin/*` and `/api/admin/*` routes by validating the cookie
- Credentials come from env vars: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`

### Route Structure

```
/                     → Public marketing pages
/blog                 → Blog listing (client-side filtering + pagination)
/blog/[slug]          → Blog detail (SSG + ISR, 60s revalidate)
/courses/...          → Course/track detail pages
/admin/login          → Credential form
/admin/blog           → Blog CRUD (protected)
/admin/courses        → Course/track CRUD (protected)

/api/auth/login|logout
/api/blog/comments|search|like
/api/admin/blogs/...
/api/admin/courses/...
/api/contact          → Submits to Google Sheets via GOOGLE_SCRIPT_URL webhook
```

### Server vs Client Components

Server Components handle data fetching and layout. Client Components (`"use client"`) handle interactivity. Key client components: `BlogListingClient`, `CommentsSection`, `LikeButton`, all admin pages.

`src/components/providers/SmoothScrollProvider.tsx` initializes Lenis + GSAP ScrollTrigger — it wraps the entire app via `MainLayout`.

### Styling

Design tokens are defined as CSS variables in `src/app/globals.css`: `--bg`, `--fg`, `--fg-muted`, `--accent`, `--navy`, `--glass-bg`, `--nav-h`. Use these rather than raw color values.

### Environment Variables

| Variable | Purpose |
|---|---|
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |
| `SESSION_SECRET` | HMAC key for JWT signing |
| `GOOGLE_SCRIPT_URL` | Contact form webhook endpoint |
| `DATABASE_URL` | Neon PostgreSQL connection string (`postgresql://...neon.tech/...?sslmode=require`) |

### Path Alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`).
