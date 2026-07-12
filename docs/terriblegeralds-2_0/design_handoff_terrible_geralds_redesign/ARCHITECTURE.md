# Architecture — porting the design into `terriblegeralds`

## Principle

The prototype in `design_reference/` runs entirely in-browser (React + Babel via CDN
`<script>` tags, a compiled DS bundle attached to `window`). **None of that runtime
approach ships to production.** Everything gets reimplemented as typed, bundled React
components inside the existing Vite app, wired to real data via `contentApi.ts` instead
of the prototype's hardcoded arrays (`PIZZAS`, `SCHEDULE`, `FEATURES`, `MOODS`, etc).

## Target file layout (additions to `client/src/`)

```
client/src/
├── styles/
│   ├── tokens/                     # NEW — ports of _ds/tokens/*.css, unchanged values
│   │   ├── colors.css
│   │   ├── typography.css
│   │   ├── spacing.css
│   │   └── motion.css
│   ├── brand.css                   # NEW — replaces legacy-*.css; imports tokens/*,
│   │                                #        the paper-grain overlay, .wrap/.pg rhythm,
│   │                                #        .pg-hero, .gform (ported from shared/site.css)
│   └── legacy-*.css                # DELETE once parity confirmed (Phase 5), not before
├── components/marketing/           # NEW — ports of DS components + site-chrome
│   ├── Button.tsx, Badge.tsx, Stamp.tsx, PlaceholderBox.tsx
│   ├── PizzaCard.tsx, QuoteCard.tsx, FeatureCard.tsx, ScheduleCard.tsx
│   ├── NavBar.tsx, Marquee.tsx, NextAppearanceBar.tsx
│   ├── SectionHeader.tsx, TornDivider.tsx, TapeStrip.tsx
│   ├── NewsletterForm.tsx
│   └── SiteHeader.tsx, SiteFooter.tsx      # port of shared/site-chrome.jsx
├── pages/public/
│   ├── Home.tsx                    # ports index.html's section flow
│   ├── Menu.tsx                    # NEW route — ports menu.html
│   ├── Events.tsx                  # existing route; restyle only (was schedule.html look)
│   ├── About.tsx                   # NEW route — ports about.html
│   ├── Catering.tsx                # NEW route — ports catering.html
│   └── Contact.tsx                 # NEW route, or restyle existing modal — see CONTEXT.md
├── sections/home/                  # NEW — ports of sections/*.jsx, data-driven
│   ├── Hero.tsx, ScheduleSection.tsx, PizzaSection.tsx, ReviewsSection.tsx,
│   │   CateringSection.tsx, TestimonialsSection.tsx, AboutSection.tsx,
│   │   VenuesSection.tsx, WallSection.tsx, NewsletterSection.tsx
├── hooks/useScrollReveal.ts         # NEW — the IntersectionObserver `.reveal` pattern
└── services/contentApi.ts           # EXTEND — add getCateringTiers, getVenues,
                                      #          getPressFeatures/getReviews, etc. per
                                      #          CONTEXT.md's content-model gap table
```

Public assets: copy `design_reference/assets/icons/*.svg` to `client/public/icons/` and
the Typekit `<link>` (kit `ryy1hmv`) into `client/index.html` `<head>`.

Handoff location: `docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/`

## Token strategy

Tailwind already governs the admin UI; the public site should **not** become a wall of
Tailwind utility classes (existing `.cursorrules` convention: don't mix Tailwind on public
marketing sections unless intentional — keep that rule, extend it to say "unless using the
new brand component library"). Recommended approach:

1. Port `_ds/tokens/*.css` verbatim into `client/src/styles/tokens/*.css` as CSS custom
   properties (`--bone`, `--ink`, `--red`, `--red-deep`, `--gold`, `--gold-deep`, `--teal`,
   `--font-display`, `--font-editorial`/`--font-accent`, `--font-body`, `--font-mono`,
   spacing/radius/shadow/motion vars).
2. Add a **thin Tailwind config extension** (`tailwind.config.*` `theme.extend.colors`,
   `fontFamily`) that maps to the *same* CSS variables (`bone: 'var(--bone)'`, etc.) so any
   Tailwind usage that does creep into marketing pages (e.g. for quick responsive
   utilities) stays on-token rather than inventing arbitrary values.
3. Marketing components themselves should be authored as **plain CSS Modules or a single
   `brand.css`** using the ported token variables — matching the prototype's own approach
   in `shared/site.css` — not hand-converted to Tailwind utility soup. This preserves the
   "brand styling is not Tailwind-utility-driven" convention while still living in the
   same build pipeline.

## Component-by-component porting notes

- **`_ds_bundle.js` is compiled output, not source** — do not import it into production.
  Read `_ds/readme.md` for each component's prop API, then reimplement as a typed `.tsx`
  file with the same visual behavior (hard offset shadow tokens, hover lift, tilt, etc).
- **`PlaceholderBox`** ports as-is (it's intentional final-state UI, not a dev placeholder
  to replace with an `<img>` — only swap in real photography when the client supplies it,
  and keep the component available for any future empty slots).
- **`NavBar` / `Marquee` / `NextAppearanceBar`**: `Marquee` is the only decorative infinite
  loop — implement with CSS `@keyframes` translateX, not JS rAF, for performance.
  `NextAppearanceBar` should read the **next upcoming `Event`** from the existing
  `Event` API (it's a live-status indicator, not static copy).
- **`ScheduleCard`** on Home/Events pages binds to `Event` documents (existing model);
  **`PizzaCard`** binds to `MenuItem` documents (existing model). Both already have public
  GET routes — no server changes needed for these two.
- **`NewsletterForm`**: check whether a newsletter/email-capture endpoint exists in
  `server/src/routes/`; if not, this is a new lightweight resource (email + optional
  source-page tag) — follow the `.cursorrules` "Adding a new admin-managed content type"
  recipe, or point it at a third-party ESP if the client has one (confirm before building).
- **Forms (`.gform` on Catering/Contact)**: reuse the existing `ContactSubmission` model
  and its zip-radius catering validation logic server-side; port only the *visual* form
  chrome (field/error states, confirm panel) client-side.

## Scroll-reveal & motion

Reimplement the prototype's `.reveal`/`.reveal.in` `IntersectionObserver` pattern as a
single `useScrollReveal()` hook (or a `<Reveal>` wrapper component) shared across all
`sections/home/*` — do not duplicate the observer per component. Respect
`prefers-reduced-motion` (disable the translateY/opacity transition, show content
immediately) even though the source prototype didn't gate on it explicitly — this is a
correctness improvement to make during the port, not a deviation from brand intent.

## Non-negotiable visual constraints for implementation review

- Exactly one loud accent color (`--red`) per screen, kept under ~15% coverage.
- Hard offset shadows only — reject any PR that introduces a soft/blurred `box-shadow`
  on an interactive element.
- Headlines/buttons always uppercase in the display font; body/kickers stay sentence
  case except kickers, which are lowercase italic.
- No stock photography substituted for `PlaceholderBox` without explicit client assets.
