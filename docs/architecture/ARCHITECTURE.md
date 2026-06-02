# Architecture

Terrible Gerald's Pizza is a **monorepo at the repository root**: React client (`client/`) and Express API (`server/`) are siblings. Shared scripts live in the root `package.json`.

## System overview

```mermaid
flowchart TB
  subgraph public [Public visitors]
    Browser[Browser]
  end

  subgraph vercel [Vercel]
    SPA[React SPA]
  end

  subgraph railway [Railway]
    API[Express API]
  end

  subgraph data [Data & Auth]
    Mongo[(MongoDB Atlas)]
    Auth0[Auth0]
  end

  Browser --> SPA
  SPA -->|REST /api/*| API
  API --> Mongo
  SPA -->|Admin login| Auth0
  Auth0 -->|JWT| API
```

## Layers

| Layer | Location | Role |
|-------|----------|------|
| Public UI | `client/src/pages/public/` | Marketing pages; fetches public API |
| Admin UI | `client/src/pages/admin/` | Auth0-protected CRUD dashboards |
| API | `server/src/routes/` | JSON REST under `/api` |
| Data | Mongoose models | MongoDB Atlas |

## Request flows

### Public content (no auth)

```
Browser → GET /api/events
Browser → GET /api/menu
Browser → GET /api/faqs
Browser → GET /api/content
Browser → POST /api/contact
```

### Admin content (Auth0 JWT)

```
Admin → Auth0 login → JWT
Admin → Authorization: Bearer {token}
API → checkJwt → requireAdmin → CRUD /api/admin/*
```

Admin access is granted when either:

1. JWT includes permission `admin:content`, or
2. User email is listed in `ADMIN_EMAILS` (server env)

## Data model

| Model | Purpose | Public read | Admin write |
|-------|---------|-------------|-------------|
| `Event` | Pop-up schedule | Yes (published, future) | Yes |
| `MenuItem` | Pizza menu cards | Yes (active) | Yes |
| `Faq` | Homepage FAQs | Yes (published) | Yes |
| `SiteContent` | Key/value copy blocks | Yes | Yes |
| `ContactSubmission` | Booking inquiries | No | Yes |
| `User` | Auth0 profile sync | — | Optional |

## Development topology

```mermaid
flowchart LR
  Browser["Browser :5173"]
  Vite["Vite dev server"]
  API["Express :3001"]
  DB[(MongoDB)]

  Browser --> Vite
  Vite -->|"proxy /api"| API
  API --> DB
```

Vite proxies `/api` to `http://localhost:3001` (`client/vite.config.ts`).

## Legacy migration mapping

| Astro / external | New system |
|------------------|------------|
| Storyblok `api-us.storyblok.com` | `Event` model + `/api/events` |
| getform.io contact POST | `POST /api/contact` → `ContactSubmission` |
| Static menu HTML | `MenuItem` + seed script |
| Static FAQ HTML | `Faq` + seed script |
| Inline copy | `SiteContent` entries |

Reference build: `legacy/astro-dist/`

## Extending the system

1. **New content type**: add Mongoose model → public route (if needed) → admin route → admin page → types in `client/src/types/`
2. **New public page**: add under `client/src/pages/public/`, register in `App.tsx`
3. **File uploads** (future): add object storage (e.g. S3/Cloudinary) — images currently use paths under `client/public/images/`

## Configuration

| Concern | Where |
|---------|--------|
| Client env | `client/.env` — `VITE_*` |
| Server env | `server/.env` — `MONGODB_URI`, Auth0, `ADMIN_EMAILS`, `CLIENT_URL` |
| Production CORS | `CLIENT_URL` on Railway must match Vercel domain |

See also: `.cursorrules`, `docs/deployment/DEPLOYMENT.md`, `docs/migration/ASTRO_MIGRATION.md`.
