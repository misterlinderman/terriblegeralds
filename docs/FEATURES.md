# Features — Terrible Gerald's Pizza

This document describes what the current build provides: the production build pipeline, the public marketing site, and the admin CMS. Use it alongside [ARCHITECTURE.md](./architecture/ARCHITECTURE.md) for system design and [SETUP.md](../SETUP.md) for local configuration.

---

## Build & tooling

| Command | Purpose |
|---------|---------|
| `npm run install:all` | Install root, client, and server dependencies |
| `npm run dev` | Vite client on `:5173` + Express API on `:3001` (concurrent) |
| `npm run dev:client` / `dev:server` | Run one side only |
| `npm run build` | Production build: `client/dist` + `server/dist` |
| `npm run build:client` | Typecheck + Vite bundle only |
| `npm run build:server` | `npm ci` in server + `tsc` |
| `npm run start` | Run compiled server (`server/dist/index.js`) |
| `npm run seed` | Seed menu, catering tiers, FAQs, and site copy |
| `npm run seed:events` | Upsert sample event (Barry O's Tavern) — does not wipe other data |
| `npm run lint` | ESLint on client and server |

**Requirements:** Node.js 18+

**Development proxy:** Vite proxies `/api` to `http://localhost:3001` so the client can call the API without CORS issues locally.

**Production hosting:**

| Component | Host | Output / entry |
|-----------|------|----------------|
| Client SPA | Vercel | `client/dist` (root directory `client/`) |
| API | Railway | Docker build → `server/dist/index.js` |
| Database | MongoDB Atlas | — |
| Admin auth | Auth0 | SPA + API audience |

---

## Public site

Single React SPA with the Season 3 · Vol. 6 brand design system (`brand.css` + tokens). Tailwind is **not** used on public marketing pages.

### Routes

| Path | Page | Data source |
|------|------|-------------|
| `/` | Homepage | API — next event, menu, FAQs, site copy |
| `/menu` | Full menu | API — menu items + static starters/sides/drinks |
| `/about` | About | Static copy (API-backed chapters/crew planned) |
| `/catering` | Catering | API — catering tiers + static steps |
| `/events` | Upcoming events | API — published future events |

### Homepage sections

1. **Hero / Next event** — nearest published future event (title, date/time, venue/address, optional map link); link to full events page
2. **Menu** — active pizza cards (image, name, description); subtitle and footnote from site content
3. **Private events** — static marketing copy with “Book Us Now” contact trigger
4. **FAQs** — published Q&A blocks
5. **About** — two paragraphs from site content keys

### Events page

- Lists all published events with `startDate >= now`, sorted by date
- Filter pills by category (brewery, park, venue, event)
- Optional per-event description and Google Maps link
- Sidebar with private-event CTA and contact trigger
- Intro paragraph from `events.intro` site content key

### Navigation & layout

- **Header:** logo, Home, Menu (hash anchor), Events, About (hash anchor), external Printify Shop link, Contact
- **Mobile:** hamburger toggle for main nav
- **Footer:** same nav links, Facebook / TikTok / Instagram, copyright
- **Contact modal:** global `<dialog>` opened from Contact links and booking CTAs

### Contact form

Modal form with two inquiry types:

| Type | Fields | Notes |
|------|--------|-------|
| **General contact** | Name, email, phone, message | Opens from header/footer Contact |
| **Private event / catering** | Above + event zip, date, location, guest count, referral source, message | Opens from “Book Us Now” CTAs |

**Catering travel radius:** zip codes are validated against a 40-mile radius from Omaha (68104). Client calls `GET /api/contact/validate-zip`; server re-validates on submit. Configurable via `CATERING_ORIGIN_LAT`, `CATERING_ORIGIN_LNG`, `CATERING_MAX_DISTANCE_MILES`.

**Copy in modal:** license notice and booking blurb loaded from site content (`contact.licenseNotice`, `contact.bookingBlurb`).

**On submit:** `POST /api/contact` saves to MongoDB. Optional email notification via Resend when `RESEND_API_KEY` is set (see SETUP).

### Public API endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | Health check |
| GET | `/api/events` | Published upcoming events |
| GET | `/api/events/next` | Single next upcoming event (homepage hero) |
| GET | `/api/events/:slug` | Single event by slug |
| GET | `/api/menu` | Active menu items |
| GET | `/api/catering-tiers` | Active catering tiers |
| GET | `/api/venues` | Active home page venue categories |
| GET | `/api/press-features` | Active home page press cards |
| GET | `/api/tiktok-features` | Active home page TikTok feature tiles |
| GET | `/api/faqs` | Published FAQs |
| GET | `/api/content` | All site content as key/value map |
| GET | `/api/contact/validate-zip?zip=` | Catering zip validation |
| POST | `/api/contact` | Submit contact / catering inquiry |

### External links (unchanged from legacy)

- Printify merchandise shop
- Facebook, TikTok, Instagram

### Not yet restored from legacy

- Google Analytics (`G-7J21D8SRYH`)
- Per-event detail pages in the public UI (API supports `GET /api/events/:slug`; no dedicated React route yet)
- `ticketUrl` on events (stored in model; not shown in admin UI or public pages)

---

## Admin CMS

Auth0-protected dashboard at `/admin/*`. Uses Tailwind styling separate from the public brand site.

### Access

1. Visit `/admin/login` → Auth0 Universal Login
2. JWT sent on all `/api/admin/*` requests via axios interceptor
3. Authorization: JWT permission `admin:content` **or** email in server `ADMIN_EMAILS`
4. `/api/admin/me` verifies access before rendering admin pages

### Routes

| Path | Purpose |
|------|---------|
| `/admin/login` | Auth0 login (public) |
| `/admin` | Dashboard — links to all content areas |
| `/admin/events` | Event CRUD |
| `/admin/menu` | Menu item CRUD |
| `/admin/catering-tiers` | Catering tier CRUD |
| `/admin/venues` | Home venue category CRUD |
| `/admin/press-features` | Home press + TikTok feature CRUD |
| `/admin/faqs` | FAQ CRUD |
| `/admin/content` | Site content key/value CRUD |
| `/admin/inquiries` | Contact submission inbox |

### Events admin

Create, edit, delete pop-up events:

- Title, auto-generated slug (editable), venue, address, description
- Category (brewery / park / venue / event) for schedule filters
- Start/end datetime
- Map URL (shown on public site as “Location Map”)
- Published / featured flags, sort order
- Sample data: `npm run seed:events`

### Menu admin

- Name, slug, description, image path (e.g. `/images/pizzas/pepperoni.webp`), sort order, active flag
- Images remain static files under `client/public/images/` — no upload UI yet

### Catering tiers admin

- Name, price, includes (line items), optional blurb, sort order, active flag
- Powers the public `/catering` packages section

### Press & TikTok admin

- **Press features:** outlet, blurb, CTA label, thumb label (placeholder text), optional link URL, sort order, active flag
- **TikTok features:** handle, view count label, optional link URL, sort order, active flag
- Powers the home page "Testimonials of Terrible" section

### FAQs admin

- Question, answer, sort order, published flag

### Site content admin

Key/value entries grouped by section. Seeded keys include:

| Key | Used on |
|-----|---------|
| `meta.description` | SEO (when wired in HTML) |
| `hero.tagline` | Homepage hero footer |
| `menu.subtitle`, `menu.footnote` | Menu section |
| `about.paragraph1`, `about.paragraph2` | About section |
| `events.intro` | Events page intro |
| `contact.licenseNotice`, `contact.bookingBlurb` | Contact modal |

Private-events bullet list on the homepage is still hard-coded in `HomePage.tsx`.

### Inquiries admin

- List contact submissions with filters by **type** (general / private event) and **status** (new / read / archived)
- Update status, delete entries
- Catering submissions show event date, location, zip, guest count, referral source

### Admin API endpoints

All require `Authorization: Bearer {access_token}` and admin authorization.

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/admin/me` | Verify admin access |
| GET/POST | `/api/admin/events` | List / create events |
| PUT/DELETE | `/api/admin/events/:id` | Update / delete event |
| GET/POST | `/api/admin/menu` | List / create menu items |
| PUT/DELETE | `/api/admin/menu/:id` | Update / delete menu item |
| GET/POST | `/api/admin/catering-tiers` | List / create catering tiers |
| PUT/DELETE | `/api/admin/catering-tiers/:id` | Update / delete catering tier |
| GET/POST | `/api/admin/venues` | List / create venue categories |
| PUT/DELETE | `/api/admin/venues/:id` | Update / delete venue category |
| GET/POST | `/api/admin/press-features` | List / create press features |
| PUT/DELETE | `/api/admin/press-features/:id` | Update / delete press feature |
| GET/POST | `/api/admin/tiktok-features` | List / create TikTok features |
| PUT/DELETE | `/api/admin/tiktok-features/:id` | Update / delete TikTok feature |
| GET/POST | `/api/admin/faqs` | List / create FAQs |
| PUT/DELETE | `/api/admin/faqs/:id` | Update / delete FAQ |
| GET/POST | `/api/admin/content` | List / create site content |
| PUT/DELETE | `/api/admin/content/:id` | Update / delete content entry |
| GET | `/api/admin/contact` | List inquiries (optional `status`, `inquiryType` query) |
| PATCH | `/api/admin/contact/:id` | Update inquiry status |
| DELETE | `/api/admin/contact/:id` | Delete inquiry |

---

## Content model summary

| Model | Public read | Admin write | Notes |
|-------|-------------|-------------|-------|
| `Event` | Published, future dates | Full CRUD | Slug, map URL, featured |
| `MenuItem` | Active items only | Full CRUD | Image paths, not uploads |
| `CateringTier` | Active tiers only | Full CRUD | Catering packages |
| `Venue` | Active categories only | Full CRUD | Home "Favorite Places" |
| `PressFeature` | Active items only | Full CRUD | Home press cards |
| `TikTokFeature` | Active items only | Full CRUD | Home TikTok tiles |
| `Faq` | Published | Full CRUD | |
| `SiteContent` | All keys | Full CRUD | Key/value copy blocks |
| `ContactSubmission` | No | Read, status, delete | General + catering types |
| `User` | — | Optional Auth0 sync | Not used by admin UI |

---

## Planned improvements

See [CHANGELOG.md](../CHANGELOG.md) for version history. Known gaps vs legacy Astro site:

- Google Analytics
- Rich text / image upload in admin
- Public per-event detail pages
- Email notifications require Resend API key in production (implemented but optional)
