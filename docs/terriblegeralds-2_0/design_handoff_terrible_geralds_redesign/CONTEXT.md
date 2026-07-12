# Context — Terrible Gerald's Pizza Redesign

Background a developer (or Claude, in Cursor) needs before touching code.

## The business

Terrible Gerald's Pizza is a punk-deli food truck/trailer out of Omaha, NE, serving
"unorthodox Neapolitan" wood-fired pizza at breweries, parks, and events. Brand line:
**"Questionable decisions. Excellent pizza."** Voice is deadpan, self-roasting, warm
underneath — never corporate, never emoji-spammed, never punching down at the customer.
This voice must survive the redesign in every button label, empty state, and error
message the developer writes or ports.

## What exists today (target repo)

`misterlinderman/terriblegeralds` is a MERN app that replaced an earlier static Astro
export (still preserved at `legacy/astro-dist/` for reference).

- **`client/`** — React 18 + Vite + TypeScript + Tailwind. Public marketing pages live at
  `client/src/pages/public/` and currently use **legacy CSS** brand styling
  (`client/src/styles/legacy-*.css`) carried over from the Astro build — *not* Tailwind
  utility classes. Admin dashboard pages (`client/src/pages/admin/`) are Tailwind.
- **`server/`** — Express + TypeScript + Mongoose against MongoDB Atlas.
- **Auth** — Auth0 SPA on the client; JWT-protected `/admin/*` API routes only. Public
  routes are unauthenticated.
- **Content model** (Mongoose, `server/src/models/`): `Event` (pop-up schedule — venue,
  address, map URL; replaced a Storyblok CMS integration), `MenuItem` (pizzas, image
  paths under `client/public/images/`), `Faq`, `SiteContent` (flat key/value copy blocks:
  hero tagline, about copy, events intro, contact form text), `ContactSubmission`
  (general + catering inquiries; replaced getform.io; catering submissions validate zip
  code against a 40-mile Omaha travel radius; optional Resend email notification).
- **Public routes today**: `/` (home — next event, menu, FAQs, about, all API-driven),
  `/events` (upcoming schedule), `/comeback-city-pizza` (a coming-soon landing for a
  second concept). Contact today is a **global modal** (general + catering), not a
  dedicated page.
- **Admin CMS** (`/admin/*`, Auth0-gated): CRUD for Events, Menu, FAQs, Site content, and
  an Inquiries inbox.
- **Deployment**: client → Vercel; API → Railway (`CLIENT_URL` env drives CORS).
- **Existing dev docs in the repo** (read these directly in the repo, they are not
  duplicated here): `AGENTS.md` (fast orientation), `.cursorrules` (conventions —
  see `CURSORRULES_ADDITIONS.md` for what to add), `docs/architecture/ARCHITECTURE.md`,
  `docs/FEATURES.md`, `docs/deployment/DEPLOYMENT.md`, `docs/migration/ASTRO_MIGRATION.md`.
- **2.0 workflow**: [../WORKFLOW.md](../WORKFLOW.md). Open decisions: [../DECISIONS.md](../DECISIONS.md).

## What this redesign changes

A **visual and structural front-end refresh only**. It:

1. Replaces `legacy-*.css` brand styling with the Terrible Gerald's Season 3·Vol. 6
   design system (tokens + component set — see `README.md` and `_ds/readme.md`).
2. Restructures Home into the section flow described in `README.md` (Hero → Schedule →
   Pizza → Reviews → Catering → Testimonials → About → Venues → Wall → Newsletter).
3. Introduces content the current site doesn't yet model as structured data: a
   **Menu page** (dedicated, not just a homepage section), an **About** page with
   brand-history chapters, a **Catering** page with tiered packages, a **dedicated
   Contact page** (in addition to or replacing the modal — flagged as an open decision
   below), a **Venues/"Favorite Places"** feature grid, a **Testimonials/press** section,
   and a **"Wall"** social/mood grid.
4. Does **not** change auth, hosting, the `/comeback-city-pizza` landing, or the
   Astro legacy folder's presence (still reference-only, still must not be served in
   production per existing `.cursorrules`).

## Content-model gaps to resolve before/during Phase 3–4

The prototype hardcodes copy for sections that have no corresponding model in
`server/src/models/` today:

| New section/page | Existing model? | Action |
|---|---|---|
| About chapters/timeline | No | New `SiteContent` keys (if short/static) or a small `AboutChapter` model (if the client wants admin-editable chapters) |
| Catering tiers | No | New `CateringTier` model (name, price, includes[], blurb) — admin-manageable like Menu |
| Venues / "Favorite Places" | No | New `Venue` model (name, category icon, blurb) — or fold into `SiteContent` if it's rarely edited |
| Testimonials / press features | No | New `PressFeature` model (outlet, quote/blurb, link) |
| Reviews (quote cards on Home) | No | Could reuse `PressFeature` or a lightweight `Review` model |
| "Wall" mood/social grid | No | Likely static/manual curation — `SiteContent` or a small `WallItem` model if it should auto-pull from Instagram/TikTok later (Schedule section copy already promises "auto-syncs your latest Instagram posts" — flag this as aspirational copy vs. a real integration; confirm with stakeholder before promising it in shipped UI) |

**Open decision — Contact UX**: the current site uses a global contact modal; the
redesign shows Contact as a full page. Recommend keeping the **existing modal component
and API contract** (`ContactSubmission`) but restyling it in the new design system,
*unless* the client explicitly wants to replace the modal with a routed `/contact` page.
Confirm with the client before Phase 3; both are compatible with the existing API.
Track in [../DECISIONS.md](../DECISIONS.md) (D1).

## Non-goals

- No changes to Auth0 config, admin permissions model, MongoDB schema for existing
  fields, or hosting/CI.
- No new third-party integrations (e.g. a real Instagram/TikTok feed) unless the client
  explicitly asks — see the "Wall" caveat above and [../DECISIONS.md](../DECISIONS.md) (D2).
- Do not remove `legacy/astro-dist/` — it must remain until the client signs off.
