# Handoff: Terrible Gerald's Pizza — Front-End Redesign (Season 3 · Vol. 6)

## Overview

This package hands off a full front-end redesign of the Terrible Gerald's Pizza public
marketing site to be implemented in the production codebase:
**https://github.com/misterlinderman/terriblegeralds** (MERN monorepo: React/Vite client +
Express/Mongoose API, currently deployed on Vercel + Railway).

The redesign applies the brand's **"Terrible Gerald's Pizza" design system** (Season 3 ·
Vol. 6 — "elevated zine": bone paper, near-black ink, one loud red, hard offset shadows,
torn-paper dividers, tape/stamps, three-typeface system) to all public-facing pages. It
replaces the current legacy-Astro-derived CSS branding (`client/src/styles/legacy-*.css`)
with a disciplined token + component system. **Admin CMS, API, auth, and data layer are
out of scope** — this is a front-end/UX pass on the public site only.

## About the design files

Everything in `design_reference/` is a **static HTML/React (Babel-in-browser) prototype**
— it is a design reference, not production code to copy verbatim. It was built as
standalone pages loading a design-system bundle (`_ds/.../_ds_bundle.js`) directly in the
browser via `<script type="text/babel">`. The target repo is a **Vite + TypeScript** app —
these prototypes must be **recreated as typed React components** inside `client/src/`,
consuming the existing content API (`contentApi.ts`) instead of the hardcoded arrays used
in the prototype. See `ARCHITECTURE.md` for the concrete porting plan and `BUILD_PLAN.md`
for the phased implementation with ready-to-paste Cursor/Claude prompts.

## Fidelity

**High-fidelity.** Colors, typography, spacing, component states (hover/press), and copy
tone are final. Treat hex values, font stacks, and spacing tokens below as authoritative;
recreate them pixel-for-pixel using the target codebase's tooling (Tailwind config /
CSS custom properties), not by eyeballing the screenshots.

## Screens / views

All six pages share `shared/site-chrome.jsx` (`SiteHeader` incl. `Marquee` +
`NextAppearanceBar` + `NavBar`, and `SiteFooter`) and the fixed paper-grain noise overlay
+ torn-edge dividers from `shared/site.css`.

1. **Home** (`design_reference/index.html`) — Hero → Schedule → torn divider → Pizza
   (menu teaser) → Reviews (quote cards) → Catering (teaser) → torn divider →
   Testimonials/press → About (teaser) → Venues ("Gerald's Favorite Places") → torn
   divider → Wall (mood/social wall) → Newsletter → Footer. Each major section fades/lifts
   in on scroll via `IntersectionObserver` (`.reveal` → `.reveal.in`, translateY(26px)→0,
   opacity 0→1, `.6s ease`, one-shot).
2. **Menu** (`menu.html`) — dark `pg-hero` banner (kicker + H1 + intro line) + full
   `PizzaCard` grid (name, description, price, tags incl. gluten-free upcharge note).
3. **Schedule** (`schedule.html`) — dark `pg-hero` + upcoming-stops list (`ScheduleCard`)
   + `NewsletterForm` for stop alerts.
4. **About** (`about.html`) — dark `pg-hero` + brand-history chapters/timeline +
   `QuoteCard` pull-quote(s).
5. **Catering** (`catering.html`) — dark `pg-hero` + tiered package cards + CTA button
   ("Request a Quote →").
6. **Contact** (`contact.html`) — dark `pg-hero` + validated form (name, email, topic
   select, message) with inline field errors and a confirmation panel state.

### Shared layout system
- Container: `.wrap { max-width: 1180px; margin:0 auto; padding:0 24px }`.
- Section rhythm: `section.pg { padding: 74px 0 }`.
- Interior-page banner: `.pg-hero` — ink background, cream text, italic gold kicker,
  uppercase display H1 (`clamp(2.4rem,5.6vw,4.6rem)`), italic serif intro paragraph.
- Forms (`catering.html`, `contact.html`): `.gform` card — cream fill, 2.5px ink border,
  8px radius, soft offset shadow, 2-col field grid collapsing to 1-col under 1000px,
  red-outlined focus state, red-deep inline validation errors.
- Responsive breakpoints: 1000px (grids collapse to 1–2 cols, hero mascot art hidden) and
  640px (nav collapses to burger menu, 2-col grids).

## Interactions & behavior

- **Nav**: desktop = flex link row; ≤640px collapses to a burger-toggled dropdown panel
  (`.gerald-nav-links` display:none → flex, absolute-positioned under header).
- **Scroll reveal**: one-shot per section on Home via `IntersectionObserver`
  (threshold 0.12); no infinite loops except the header `Marquee` (linear infinite scroll)
  and the `NextAppearanceBar` live-status pulse dot.
- **Forms**: client-side validation on submit → per-field `.invalid` state shows red
  border + error text → successful submit swaps the form for a `.confirm-panel` success
  state (gold fill, ink border, centered).
- **Hover/press** (from bound design system — implement via DS `Button`/`Card` components,
  do not hand-roll): buttons/cards lift `-2px,-2px` and grow their hard offset shadow from
  `5px 5px 0` to `8px 8px 0` on hover; ghost buttons/social icons flip transparent→ink.
- **Responsive**: fully fluid down to ~360px; no distinct mobile-only screens, only
  reflowed grids and the collapsed nav described above.

## Design tokens

Full token source lives in `design_reference/_ds/.../tokens/*.css` — copy values from
those files verbatim, do not re-derive them. Summary:

- **Color**: `--bone #F1E6D2` (page bg), `--ink #17120D` (text/borders/structure),
  `--red #C8341B` (sole loud accent, ≤~15% of any screen) with `--red-deep` shadow pair,
  `--gold #E8A11E` (highlights/tape/next-appearance bar) with `--gold-deep` shadow pair,
  `--teal #2E7C78` (rare tertiary, ~once/page).
- **Type**: Display = **Tomarik Display** (Adobe/Typekit, `tomarik-display`) — headlines,
  pizza names, buttons; always uppercase, `-.03em` tracking. Editorial+Accent = **New
  Spirit** (Adobe/Typekit, `new-spirit`) — italic for pull-quotes/taglines (larger), same
  family for kickers/stamps/badges (smaller, sometimes uppercase+tracked). Body =
  **Hanken Grotesk**. Mono = **Space Mono** (code/token specs only). Typekit kit id:
  `ryy1hmv` (loaded via `use.typekit.net/ryy1hmv.css` in `tokens/typography.css`).
  Fallbacks only, never primary: DM Serif Display, Fraunces.
- **Spacing**: 1180px container max-width, 24px gutters, 74px section padding, 8px radius
  standard (pill/20px+ for badges, circular for avatar/icon slots).
- **Shadows**: hard offset block shadow `5px 5px 0` in a *darker shade of the element's
  own color* (never a soft blurred drop-shadow); hover grows to `8px 8px 0` with a
  `-2px,-2px` lift.
- **Motion**: `tokens/motion.css` — `.6s ease` scroll reveal; marquee linear-infinite;
  next-appearance dot pulse-infinite (these two are the only sanctioned infinite loops).
- **Tilt**: cards/quotes/stamps get a −1.5°→1.2° collage tilt.

## Assets

- `design_reference/assets/icons/` — bespoke inline-SVG icon set (verbatim from the
  design system, ~1.6px stroke weight): `logo-mark.svg`, `social-instagram.svg`,
  `social-tiktok.svg` *(referenced by the DS bundle's NavBar/Footer, not duplicated here —
  pull from the DS component source if not present in this folder)*, `venue-brewery.svg`,
  `venue-building.svg`, `venue-park.svg`, `venue-event.svg`, `play.svg`.
- No stock photography or illustration was supplied. Every photo/video slot uses the
  brand's `PlaceholderBox` component (hatched/dashed placeholder) — **this is intentional
  design language**, not a shortcut. Do not fill placeholders with stock imagery; flag
  each one for the client to drop in real photography (pizza, fire, dough, trucks,
  breweries — warm, slightly grainy, never cool/clinical or B&W).
- Literal emoji used as content glyphs only (📍 🎙 📺 📰 📬 ✦ ★) — not a decorative
  emoji system; do not expand.

## Files

- `design_reference/index.html`, `about.html`, `catering.html`, `contact.html`,
  `menu.html`, `schedule.html` — the six page prototypes.
- `design_reference/sections/*.jsx` — Home-page section components (Hero, Schedule,
  Pizza, Reviews, Catering, Testimonials, About, Venues, Wall, Newsletter).
- `design_reference/shared/site-chrome.jsx`, `site.css` — header/footer/nav +
  shared page-shell CSS (container, section rhythm, `.pg-hero`, `.gform`, responsive
  overrides).
- `design_reference/_ds/` — the full bound design system: tokens (`tokens/*.css`),
  compiled component bundle (`_ds_bundle.js`), and its own `readme.md` (component API
  reference — read this before porting any component).
- See `ARCHITECTURE.md`, `CONTEXT.md`, `CURSORRULES_ADDITIONS.md`, and `BUILD_PLAN.md`
  in this folder for how to implement the above in the production repo.
- Branch workflow: [../WORKFLOW.md](../WORKFLOW.md). Open decisions: [../DECISIONS.md](../DECISIONS.md).
