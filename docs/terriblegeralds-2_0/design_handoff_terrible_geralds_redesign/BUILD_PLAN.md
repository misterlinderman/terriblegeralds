# Build Plan — Terrible Gerald's Front-End Redesign

Phased implementation plan for Cursor with Claude as the coding companion. Each phase
lists goal, scope, files, a done-when checklist, and a **ready-to-paste Cursor prompt**.
Work phases in order — each assumes the previous is merged. Paste `AGENTS.md`,
`.cursorrules`, and this file's relevant phase into context for every session; also attach
the specific `design_reference/*` file(s) named in that phase.

**Branch target:** merge each phase to `v2/integration`, not `main`. See
[../WORKFLOW.md](../WORKFLOW.md).

**Handoff path prefix:** `docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/`

---

## Phase 0 — Setup & inventory

**Goal**: land the design tokens/fonts and confirm content-model gaps before writing UI.

**Branch:** `v2/phase-0-setup` → `v2/integration`

**Tasks**
- Apply `CURSORRULES_ADDITIONS.md` to the repo's `.cursorrules` (done at integration setup).
- Copy `design_reference/_ds/tokens/*.css` → `client/src/styles/tokens/*.css` unchanged.
- Add the Typekit `<link>` (kit `ryy1hmv`) to `client/index.html`.
- Copy `design_reference/assets/icons/*.svg` → `client/public/icons/`.
- Read `design_reference/_ds/readme.md` fully — it's the component API reference for
  every phase below.
- Confirm with the client the two open items in [../DECISIONS.md](../DECISIONS.md): (a)
  Contact — modal vs. dedicated page, (b) whether "Wall" section should be a real social
  feed or curated.

**Done when**: tokens compile with no missing CSS var references; Typekit fonts load in
a throwaway route; icons render.

**Cursor prompt**
```
Read AGENTS.md, .cursorrules, and docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/CONTEXT.md
and ARCHITECTURE.md. Then:
1. Create client/src/styles/tokens/{colors,typography,spacing,motion}.css by porting the
   contents of docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/design_reference/_ds/tokens/*.css
   verbatim (same variable names/values).
2. Add the Adobe Typekit stylesheet link (kit id ryy1hmv) to client/index.html's <head>.
3. Copy docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/design_reference/assets/icons/*.svg into
   client/public/icons/.
4. Do not touch any existing component, route, or model yet — this phase is additive only.
Show me a diff before applying.
```

---

## Phase 1 — Design-system foundation (component library)

**Goal**: port the DS's core primitives as typed components, reused everywhere after.

**Branch:** `v2/phase-1-ds-foundation` → `v2/integration`

**Scope**: `client/src/components/marketing/{Button,Badge,Stamp,PlaceholderBox,
SectionHeader,TornDivider,TapeStrip}.tsx`, plus `client/src/styles/brand.css` (paper-grain
overlay, `.wrap`, `section.pg`, `.pg-hero`, `.gform`, responsive breakpoints — port from
`design_reference/shared/site.css`), and the Tailwind config token bridge from
`ARCHITECTURE.md`.

**Files to attach**: `design_reference/_ds/readme.md`, `design_reference/shared/site.css`,
`design_reference/_ds/_ds_bundle.js` (read-only reference for exact JSX structure/props —
do not import it).

**Done when**: a throwaway Storybook-less demo route renders every primitive with its
hover/tilt/shadow states matching the prototype screenshots.

**Cursor prompt**
```
Using docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/design_reference/_ds/readme.md as the
component API spec and design_reference/_ds/_ds_bundle.js as the reference implementation
(read-only — do not import this file), create typed React components in
client/src/components/marketing/: Button, Badge, Stamp, PlaceholderBox, SectionHeader,
TornDivider, TapeStrip. Match props, visual states (hover lift + hard offset shadow growth,
collage tilt on cards/stamps), and accessibility (button semantics, alt text on
PlaceholderBox) exactly.

Also port docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/design_reference/shared/site.css into
client/src/styles/brand.css, adapting selectors to the new component class names but
keeping the paper-grain noise overlay, .wrap container, section.pg rhythm, .pg-hero
banner, and .gform styles identical. Extend tailwind.config with color/fontFamily
tokens that map to the CSS vars in client/src/styles/tokens/, per
ARCHITECTURE.md's "Token strategy" section.

Follow .cursorrules' "Brand design system" section throughout. Show me the new files
before running anything.
```

---

## Phase 2 — Home page

**Goal**: rebuild `/` using real content-API data in the new section flow.

**Branch:** `v2/phase-2-home` → `v2/integration`

**Scope**: `client/src/hooks/useScrollReveal.ts`, `client/src/sections/home/*.tsx` (Hero,
ScheduleSection, PizzaSection, ReviewsSection, CateringSection, TestimonialsSection,
AboutSection, VenuesSection, WallSection, NewsletterSection), `client/src/components/
marketing/{NavBar,Marquee,NextAppearanceBar,PizzaCard,QuoteCard,FeatureCard,
ScheduleCard,SiteHeader,SiteFooter}.tsx`, `client/src/pages/public/Home.tsx`.

**Data wiring**: `ScheduleSection`/`ScheduleCard` → existing `Event` API (soonest-first);
`PizzaSection`/`PizzaCard` → existing `MenuItem` API; `NextAppearanceBar` → next upcoming
`Event`. Reviews/Testimonials/Venues/Wall use placeholder data until Phase 4 lands their
models — wire them to `contentApi` functions with `// TODO Phase 4` stubs returning the
prototype's static copy so layout is correct now and swaps cleanly later.

**Files to attach**: `design_reference/index.html`, `design_reference/sections/*.jsx`,
`design_reference/shared/site-chrome.jsx`.

**Done when**: Home renders the full section flow with real Event/MenuItem data, scroll
reveal fires once per section, nav collapses correctly ≤640px, Lighthouse a11y ≥ 95.

**Cursor prompt**
```
Attach docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/design_reference/index.html,
design_reference/sections/*.jsx, and design_reference/shared/site-chrome.jsx as the
visual/structural reference (React+Babel prototype — do not import it, reimplement in
TypeScript). Using the Phase 1 primitives from client/src/components/marketing/:

1. Build client/src/hooks/useScrollReveal.ts porting the .reveal/.reveal.in
   IntersectionObserver pattern (one-shot, threshold .12), gated on
   prefers-reduced-motion.
2. Build client/src/components/marketing/{NavBar,Marquee,NextAppearanceBar,PizzaCard,
   QuoteCard,FeatureCard,ScheduleCard,SiteHeader,SiteFooter}.tsx per the prototype.
3. Build client/src/sections/home/{Hero,ScheduleSection,PizzaSection,ReviewsSection,
   CateringSection,TestimonialsSection,AboutSection,VenuesSection,WallSection,
   NewsletterSection}.tsx. Wire ScheduleSection and PizzaSection to the real Event and
   MenuItem endpoints in client/src/services/contentApi.ts (existing). For
   Reviews/Testimonials/Venues/Wall, add stub functions to contentApi.ts returning the
   prototype's static copy, marked with a "// TODO Phase 4: back with <Model> API" comment.
4. Rebuild client/src/pages/public/Home.tsx assembling the sections in the exact order
   from index.html, including the two TornDivider placements.

Match copy verbatim from the prototype files. Follow .cursorrules' brand section. Run
the client dev server and report any console errors before finishing.
```

---

## Phase 3 — Secondary pages

**Goal**: ship Menu, About, Catering, and Contact as real routed pages; restyle Events.

**Branch:** `v2/phase-3-secondary-pages` → `v2/integration`

**Scope**: `client/src/pages/public/{Menu,About,Catering,Contact}.tsx`, restyle existing
`Events.tsx`/schedule route, router entries in `App.tsx`.

**Decision gate**: confirm the Contact modal-vs-page call from [../DECISIONS.md](../DECISIONS.md)
before starting Contact. If keeping the modal, restyle the existing modal component in the
new DS instead of creating a routed page, but still port the visual spec (fields, validation
states, confirm panel) from `contact.html`.

**Files to attach**: `design_reference/menu.html`, `about.html`, `catering.html`,
`contact.html`, `schedule.html`.

**Done when**: all four/five surfaces render with correct copy, forms validate and show
the confirm-panel success state, `/menu` and `/about` and `/catering` (and `/contact` if
routed) are registered in the router and linked from `NavBar`.

**Cursor prompt**
```
Attach docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/design_reference/{menu,about,catering,
contact,schedule}.html as visual/copy reference. Using the Phase 1/2 component library:

1. Create client/src/pages/public/Menu.tsx (dark pg-hero banner + full PizzaCard grid,
   including the gluten-free upcharge note), registered at route /menu.
2. Create client/src/pages/public/About.tsx (pg-hero + brand-history chapters/timeline +
   pull-quote), registered at /about. Use static copy from about.html for now — the
   chapters aren't yet admin-editable (that's Phase 4).
3. Create client/src/pages/public/Catering.tsx (pg-hero + tiered package cards + "Request
   a Quote" CTA linking into the contact flow), registered at /catering. Static tier copy
   for now (Phase 4 makes it admin-editable).
4. [If confirmed as a page] Create client/src/pages/public/Contact.tsx at /contact porting
   the .gform validation states and .confirm-panel from contact.html, wired to the
   existing ContactSubmission POST endpoint. [If keeping the modal] instead restyle the
   existing contact modal component with the same visual spec, no new route.
5. Restyle the existing Events page/route to match schedule.html's pg-hero + ScheduleCard
   list + NewsletterForm, without changing its data source.
6. Add the new routes to NavBar's link list and App.tsx's router.

Follow .cursorrules' brand section and the Do-not list. Verify no TypeScript errors and
no console errors in the dev server.
```

---

## Phase 4 — Content-model & admin CMS extensions

**Goal**: make the new static-copy sections admin-editable, closing the gaps in
`CONTEXT.md`'s table.

**Branch:** `v2/phase-4-<resource>` → `v2/integration` (one PR per resource recommended)

**Scope**: new Mongoose models + public/admin routes + admin UI pages, following the
existing `.cursorrules` "Adding a new admin-managed content type" recipe (Model → public
GET route if displayed on site → admin CRUD route → types + `adminApi` helpers → admin
page + `App.tsx` route → document in `docs/architecture/ARCHITECTURE.md` and
`docs/FEATURES.md`).

**New resources** (do one at a time, in this order — lowest-risk/highest-value first):
1. `CateringTier` (name, price, includes[], blurb) — powers Catering page.
2. `Venue` (name, categoryIcon, blurb) — powers Home's Venues section.
3. `PressFeature` (outlet, quote, link) — powers Testimonials/press and, optionally,
   doubles for Home's Reviews if the client doesn't want a separate `Review` model
   (confirm; otherwise add a lightweight `Review` model too).
4. About chapters — default to new `SiteContent` keys (simplest) unless the client wants
   per-chapter admin editing, in which case add an `AboutChapter` model.
5. Wall items — only build a model/admin CRUD if [../DECISIONS.md](../DECISIONS.md) D2
   confirmed real curation is wanted; otherwise leave as static copy and remove the
   "auto-syncs your Instagram" claim from the shipped copy.

**Cursor prompt (repeat per resource, swapping the model name/fields)**
```
Following .cursorrules' "Adding a new admin-managed content type" recipe exactly:
1. Add a CateringTier Mongoose model in server/src/models/ (fields: name, price,
   includes: string[], blurb, order).
2. Add a public GET route (list, ordered) since it's displayed on the Catering page.
3. Add admin CRUD routes under server/src/routes/admin/ (checkJwt + requireAdmin).
4. Add TypeScript types and adminApi.ts helpers on the client.
5. Add an admin page (Tailwind styling, matching the existing admin CRUD pages' pattern)
   and register its route in App.tsx.
6. Update client/src/pages/public/Catering.tsx to fetch from the new public route instead
   of static copy, preserving the exact visual layout from Phase 3.
7. Document the new model in docs/architecture/ARCHITECTURE.md and docs/FEATURES.md.
Show me the plan for all 6 steps before writing code.
```

---

## Phase 5 — QA, cleanup, and deployment verification

**Goal**: confirm parity, remove dead legacy styling, verify production builds.

**Branch:** `v2/phase-5-qa-cleanup` → `v2/integration`, then `v2/integration` → `main`

**Tasks**
- Cross-check every page against its `design_reference/*.html` for copy, spacing, color,
  and hover-state fidelity (spot-check at 1920px, 1024px, 640px, 375px).
- Confirm scroll-reveal respects `prefers-reduced-motion` and forms are keyboard-
  navigable with visible focus states (`.gform input:focus` outline).
- Run `npm run lint` and `npm run build` (client + server) clean.
- Once the client signs off, delete `client/src/styles/legacy-*.css` and any now-unused
  legacy components — **do not** touch `legacy/astro-dist/` (still reference-only per
  `.cursorrules`, unrelated to this cleanup).
- Verify Vercel (client) and Railway (server) deploys per `docs/deployment/DEPLOYMENT.md`
  — no env/config changes should have been needed for this redesign; if any crept in,
  flag them explicitly in the PR description.

**Cursor prompt**
```
Do a full parity pass: for each public route (/, /menu, /events, /about, /catering,
/contact or the contact modal), compare the live page against the matching file in
docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/design_reference/ at 1920px, 1024px, 640px, and
375px widths. List any copy, spacing, color, or interaction-state mismatches you find —
do not fix silently, report first.

Then run npm run lint and npm run build from the repo root and fix any errors. Confirm
client/src/styles/legacy-*.css is no longer imported anywhere; if clear, delete those
files and any orphaned legacy-only components (leave legacy/astro-dist/ untouched).
Report the diff for review before I approve deletion.
```
