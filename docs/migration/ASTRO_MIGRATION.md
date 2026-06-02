# Astro static site migration assessment

This document records the assessment of `legacy/astro-dist/` (Astro v4.16.18 build) and how each piece maps to the new MERN platform.

---

## Build inventory

### Pages

| Path | Title / purpose |
|------|-----------------|
| `/` | Homepage — hero, menu, private events, FAQs, about |
| `/events` | Upcoming events list |
| `/comeback-city-pizza` | Comeback City Pizza "Coming Soon" landing |

### Assets

- **Images:** `images/` — logos, pizza photos, Gerald characters, CCP assets
- **Fonts:** `fonts/` — Bobby Jones/Rough custom webfonts
- **CSS:** `_astro/*.css` — scoped Astro component styles (copied to `client/src/styles/legacy-*.css`)
- **JS:** Vue islands for events list, homepage event, contact form

### External integrations (legacy)

| Integration | Usage | Replacement |
|-------------|-------|-------------|
| **Storyblok CDN** | Events via `fetch('https://api-us.storyblok.com/v2/cdn/stories/?token=...')` | `Event` model + `/api/events` |
| **getform.io** | Contact form POST to `64e182fc-b375-4a84-8da2-0b9ab51b2abe` | `POST /api/contact` |
| **Google Analytics** | gtag `G-7J21D8SRYH` | Re-add in `client/index.html` when ready |
| **Printify shop** | External link | Unchanged (external URL) |
| **Social links** | Facebook, TikTok, Instagram | Unchanged in footer components |

---

## Content extracted to MongoDB (seed script)

### Menu items (6)

Garlic Cheese, The Pep Talk, Margherita, Pepperoni, Sal's Hot Date, Crabby Gerald — with descriptions and `/images/pizzas/*.webp` paths from static HTML.

### FAQs (5)

All Q&A blocks from `#home-faqs` section.

### Site content keys

| Key | Section |
|-----|---------|
| `meta.description` | SEO |
| `hero.tagline` | Homepage hero |
| `menu.subtitle`, `menu.footnote` | Menu section |
| `about.paragraph1`, `about.paragraph2` | About section |
| `events.intro` | Events page intro |
| `contact.licenseNotice`, `contact.bookingBlurb` | Contact modal |

### Not seeded automatically

- **Events** — were loaded dynamically from Storyblok; must be re-entered in admin (or imported via one-time script from Storyblok export if available)
- **Private events bullet list** — still static in React component; can move to `SiteContent` if customer wants it editable

---

## Interactive components

| Astro Vue island | React equivalent |
|------------------|------------------|
| `HomepageEvent` | `HomePage` fetches `/api/events/next` |
| `EventsList` | `EventsPage` fetches `/api/events` |
| `Form` (contact dialog) | `ContactModal` + `POST /api/contact` |

---

## Styling strategy

1. Legacy base CSS imported in `client/src/styles/index.css`
2. Admin UI uses Tailwind (separate from brand site)
3. Future: consolidate legacy CSS into Tailwind design tokens matching TG brand (`--tg-red`, `--font-headline`, etc.)

---

## Recommended follow-up phases

### Phase 2 — Parity polish
- Restore hamburger mobile nav behavior
- Re-add Google Analytics
- Match footer social SVG icons from legacy HTML
- Events page: import legacy `events.Dm7VIcRD.css`

### Phase 3 — CMS enhancements
- Rich text editor for FAQ answers
- Image upload (replace manual `/images/` path entry)
- Email notification on new contact submission (SendGrid/Resend)

### Phase 4 — Optional Astro coexistence
If the original Astro source becomes available again, it can replace `client/src/pages/public/` as a separate build — but single React SPA is simpler for Vercel deployment.

---

## Reference files

Keep `legacy/astro-dist/` in the repo until public React pages reach visual parity with production.

Do **not** serve `legacy/astro-dist/` in production — it still points at Storyblok and getform.io.
