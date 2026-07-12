# `.cursorrules` additions

The repo already has a `.cursorrules` (MERN conventions, admin-resource recipe, deploy
targets). **Do not replace it** — append the section below, and apply the two edits to
existing lines noted at the bottom. This keeps Cursor/Claude grounded in the new design
system for every prompt in `BUILD_PLAN.md`.

**Status:** Applied to root `.cursorrules` at v2 integration setup.

---

## Append this section (e.g. after "### Client")

```md
### Brand design system (Season 3 · Vol. 6 — public site only)

The public marketing site (`client/src/pages/public/`, `client/src/components/marketing/`,
`client/src/sections/home/`) follows the Terrible Gerald's Pizza design system. This is a
binding visual spec — do not invent colors, fonts, spacing, or shadow styles outside it.

- **Tokens**: `client/src/styles/tokens/*.css` (colors, typography, spacing, motion) —
  always reference `var(--*)`, never hardcode a hex/px value that has a token.
- **Color**: `--bone` (bg), `--ink` (text/borders), `--red` (the *only* loud accent, keep
  under ~15% of any screen, has `--red-deep` shadow pair), `--gold` (highlights/tape,
  `--gold-deep` shadow pair), `--teal` (rare tertiary, ~once per page). Never add a new
  saturated color.
- **Type**: display = Tomarik Display (`var(--font-display)`, uppercase, `-.03em`
  tracking) for headlines/buttons/pizza names; editorial/accent = New Spirit
  (`var(--font-editorial)` italic for pull-quotes, `var(--font-accent)` for
  kickers/stamps/badges); body = Hanken Grotesk (`var(--font-body)`); mono = Space Mono,
  specs only. Never use Inter, Roboto, or Arial anywhere on the public site.
- **Shadows**: hard offset only — `5px 5px 0 <deep-shade>`, growing to `8px 8px 0` with a
  `-2px,-2px` lift on hover. Never a soft/blurred `box-shadow` on an interactive element.
- **Components**: reuse `client/src/components/marketing/*` (Button, Badge, Stamp,
  PlaceholderBox, PizzaCard, QuoteCard, FeatureCard, ScheduleCard, NavBar, Marquee,
  NextAppearanceBar, SectionHeader, TornDivider, TapeStrip, NewsletterForm) — do not
  hand-roll a new card/button style. If a screen needs a variant, extend the existing
  component's props, don't fork a new one.
- **Placeholders**: `PlaceholderBox` (hatched/dashed) is the *intentional* image/video slot
  until real photography lands — never substitute stock photography or generated
  imagery for it.
- **Voice**: deadpan, self-roasting, warm underneath. Headlines/buttons UPPERCASE; body
  and kickers sentence case (kickers lowercase italic). No corporate copy
  ("artisanal excellence", "subscribe for exclusive offers"), no emoji spam — emoji only
  as the specific literal glyphs already used in copy (📍 🎙 📺 📰 📬 ✦ ★).
- **Motion**: one `.6s ease` translateY(26px)+fade reveal per section on scroll
  (`useScrollReveal` hook, IntersectionObserver, one-shot, gate on
  `prefers-reduced-motion`). The header marquee (CSS linear-infinite) and the
  next-appearance status dot (infinite pulse) are the *only* sanctioned infinite loops —
  do not add other looping/decorative animation to the public site.
- **Reference**: full design handoff at
  `docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/` (README,
  ARCHITECTURE, CONTEXT, BUILD_PLAN) — read before implementing any public-site screen;
  branch workflow at `docs/terriblegeralds-2_0/WORKFLOW.md`.
```

## Edits to existing lines

1. Under **"### Client"**, the line:
   > Brand site uses legacy CSS imports; do not mix Tailwind utility classes on public
   > marketing sections unless intentional

   → replace with:
   > Brand site uses the token-based `client/src/styles/tokens/*` + `brand.css` system
   > (see "Brand design system" below), not `legacy-*.css` (being retired in Phase 5 of
   > the redesign) and not ad-hoc Tailwind utility classes.

2. Under **"## Do not"**, add:
   > - Add a new saturated brand color, font family, or soft/blurred shadow to the public
   >   site without updating `styles/tokens/*.css` first (single source of truth)
   > - Replace a `PlaceholderBox` with stock/generated imagery

## v2 branch context

When working on the redesign, branch from `v2/integration` per
`docs/terriblegeralds-2_0/WORKFLOW.md`. Do not merge v2 work to `main` until Phase 5
sign-off.
