# Terrible Gerald's Pizza — Web Application

A MERN stack web application for [Terrible Gerald's Pizza](https://github.com/misterlinderman/terriblegeralds), converted from the original Astro static site into a content-managed platform with an admin dashboard.

## What changed from the static site

| Before (Astro `dist`) | After (this repo) |
|-----------------------|-------------------|
| Storyblok CDN for events | MongoDB + Admin CRUD |
| getform.io for contact form | Express API + MongoDB + Admin inbox |
| Hard-coded menu & FAQs | MongoDB + Admin CRUD |
| Static HTML pages | React SPA (public + `/admin`) |

The original Astro build is preserved in `legacy/astro-dist/` for reference during migration.

## Tech stack

| Layer | Service / Tech |
|-------|----------------|
| Public UI + Admin | React 18, Vite, TypeScript, Tailwind |
| API | Express, TypeScript, Mongoose |
| Database | MongoDB Atlas |
| Auth (admin only) | Auth0 |
| Frontend hosting | Vercel |
| API hosting | Railway |

## Project structure

```
./
├── client/                 # React app (public site + admin UI)
│   ├── public/             # Images, fonts (from legacy Astro build)
│   └── src/
│       ├── pages/public/   # Home, Events, Comeback City Pizza
│       ├── pages/admin/    # CRUD dashboards
│       └── components/
├── server/                 # Express API
│   └── src/
│       ├── models/         # Event, MenuItem, Faq, SiteContent, ContactSubmission
│       ├── routes/         # Public + /admin/* routes
│       └── scripts/seed.ts  # Seed menu/FAQ/content from legacy copy
├── legacy/astro-dist/      # Original Astro static export (reference only)
├── docs/                   # Architecture, deployment, migration guides
├── AGENTS.md               # Quick context for AI coding agents
└── SETUP.md                # Local development setup
```

## Quick start

```bash
npm run install:all
cp .env.example .env
cp client/.env.example client/.env
cp server/.env.example server/.env
# Configure MongoDB Atlas + Auth0 (see SETUP.md)
npm run seed        # optional: menu, FAQs, site copy from legacy Astro HTML
npm run seed:events # optional: sample Barry O's Tavern event
npm run dev         # client :5173 + API :3001
npm run build       # production build (client + server)
```

- **Public site:** http://localhost:5173
- **Admin login:** http://localhost:5173/admin/login
- **API health:** http://localhost:3001/api/health

## Public site

| Route | Purpose |
|-------|---------|
| `/` | Homepage — next event, menu, FAQs, about (API-driven) |
| `/events` | Upcoming pop-up schedule |
| `/comeback-city-pizza` | Comeback City Pizza coming-soon landing |

Global **contact modal** supports general inquiries and private-event/catering requests. Catering submissions validate event zip codes against a 40-mile Omaha travel radius.

## Admin CMS (`/admin`)

Auth0-protected dashboards for:

- **Events** — pop-up schedule with venue, address, map link (replaces Storyblok)
- **Menu** — pizza names, descriptions, image paths
- **FAQs** — homepage Q&A blocks
- **Site content** — hero tagline, about copy, events intro, contact form text
- **Inquiries** — contact inbox with type/status filters (replaces getform.io)

Changes save to MongoDB and appear on the live site immediately.

## Documentation

| Doc | Purpose |
|-----|---------|
| [docs/FEATURES.md](./docs/FEATURES.md) | Public site, admin CMS, and build inventory |
| [SETUP.md](./SETUP.md) | Local env, Auth0, MongoDB, Resend email |
| [docs/architecture/ARCHITECTURE.md](./docs/architecture/ARCHITECTURE.md) | System design & data flow |
| [docs/deployment/DEPLOYMENT.md](./docs/deployment/DEPLOYMENT.md) | Vercel + Railway + Auth0 production |
| [docs/migration/ASTRO_MIGRATION.md](./docs/migration/ASTRO_MIGRATION.md) | Legacy Astro assessment & mapping |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [AGENTS.md](./AGENTS.md) | AI agent orientation |

## Starter template

Server/client scaffolding is adapted from [baseapp](https://github.com/misterlinderman/baseapp).

## License

MIT
