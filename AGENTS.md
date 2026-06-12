# Agent context — Terrible Gerald's Pizza

Fast orientation for AI-assisted development in this repository.

## What this is

- **Public marketing site** for Terrible Gerald's Pizza (Omaha mobile pizza)
- **Admin CMS** at `/admin/*` for events, menu, FAQs, site copy, and contact inquiries
- Converted from Astro static export (`legacy/astro-dist/`)

## Stack

| Part | Location | Notes |
|------|----------|-------|
| Public + Admin UI | `client/` | Vite, React 18, Tailwind, Auth0 SPA SDK |
| API | `server/` | Express, Mongoose, JWT validation |
| Data | MongoDB | Models in `server/src/models/` |

## Commands (repo root)

| Command | Purpose |
|---------|---------|
| `npm run install:all` | Install all dependencies |
| `npm run dev` | API (:3001) + Vite (:5173) |
| `npm run seed` | Seed menu/FAQ/content from legacy copy |
| `npm run seed:events` | Upsert sample event (Barry O's Tavern) |
| `npm run build` | Production builds (client + server) |
| `npm run lint` | ESLint client + server |

Full feature inventory: [docs/FEATURES.md](./docs/FEATURES.md)

## Where to look

| Task | Location |
|------|----------|
| Public pages | `client/src/pages/public/` |
| Admin CRUD | `client/src/pages/admin/` |
| Public API | `server/src/routes/` (non-admin) |
| Admin API | `server/src/routes/admin/` |
| Auth middleware | `server/src/middleware/auth.ts`, `admin.ts` |
| Legacy reference | `legacy/astro-dist/` |
| Architecture | `docs/architecture/ARCHITECTURE.md` |

## Content model

- **Event** — scheduled pop-ups (replaced Storyblok); venue, address, map URL
- **MenuItem** — pizzas on homepage (image paths under `client/public/images/`)
- **Faq** — homepage FAQ section
- **SiteContent** — key/value strings (hero, about, events intro, contact copy)
- **ContactSubmission** — general + catering inquiries (replaced getform.io); optional Resend email

## Public vs admin

| Public routes | Admin routes |
|---------------|--------------|
| `/`, `/events`, `/comeback-city-pizza` | `/admin`, `/admin/events`, `/admin/menu`, `/admin/faqs`, `/admin/content`, `/admin/inquiries` |
| Contact modal (general + catering) | Auth0 login at `/admin/login` |
| Legacy CSS brand styling | Tailwind admin UI |

## Conventions

- Public routes: no auth
- Admin routes: `checkJwt` + `requireAdmin` (email allowlist or `admin:content` permission)
- Match existing patterns in route modules before adding new resources
- Brand styling: legacy CSS in `client/src/styles/legacy-*.css`; admin uses Tailwind
- Do not commit `.env` files

## Env

Copy `.env.example`, `client/.env.example`, `server/.env.example`. Requires MongoDB Atlas + Auth0 before admin flows work.
