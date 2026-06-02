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
| `npm run build` | Production builds |
| `npm run lint` | ESLint client + server |

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

- **Event** — scheduled pop-ups (replaced Storyblok)
- **MenuItem** — pizzas on homepage
- **Faq** — homepage FAQ section
- **SiteContent** — key/value strings (hero, about, contact copy)
- **ContactSubmission** — private event form (replaced getform.io)

## Conventions

- Public routes: no auth
- Admin routes: `checkJwt` + `requireAdmin` (email allowlist or `admin:content` permission)
- Match existing patterns in route modules before adding new resources
- Brand styling: legacy CSS in `client/src/styles/legacy-*.css`; admin uses Tailwind
- Do not commit `.env` files

## Env

Copy `.env.example`, `client/.env.example`, `server/.env.example`. Requires MongoDB Atlas + Auth0 before admin flows work.
