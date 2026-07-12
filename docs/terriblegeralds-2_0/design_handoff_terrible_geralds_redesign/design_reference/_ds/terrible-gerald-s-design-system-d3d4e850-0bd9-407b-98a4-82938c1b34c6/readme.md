# Terrible Gerald's Pizza — Design System

**Terrible Gerald's Pizza** is a punk-deli food truck/trailer brand out of Omaha, NE, serving
"unorthodox Neapolitan" wood-fired pizza at breweries, parks, and events. The brand's own
description of itself: **"Questionable decisions. Excellent pizza."**

This is **Season 3 · Vol. 6** of the brand system — an "elevated zine" aesthetic that pairs
punk-deli irreverence with editorial polish: warm bone paper, near-black ink, one loud red,
hand-torn edges, tape, and stamps, but set in a disciplined type system rather than scrappy
DIY lettering.

## Sources

This system was built entirely from two attached HTML files (no Figma or codebase access
was available this run):
- `uploads/terrible-geralds-design-system-260710-1.html` — the brand's own design-system
  reference page (principles, color, type, layout, texture, motion, voice, tokens).
- `uploads/terrible-geralds-homepage-260710-1.html` — a full homepage comp, used as the
  ground truth for the marketing-site UI kit.

No Figma file, GitHub repo, or component library was provided. Because there was no
enumerated component inventory, the component set below was extracted from the repeated
UI patterns actually present in the homepage comp (buttons, cards, nav, schedule rows,
badges/stamps, placeholders) rather than a generic default kit.

## Products / surfaces

- **Marketing website** — the food truck's public site (schedule, menu, catering, reviews,
  press, story, venues, newsletter). This is the only product surface defined by the
  provided source material.

## Content fundamentals

**Voice:** deadpan, self-roasting, confident, warm underneath, zero corporate. Puns the
*names*, never the craft. Talks to regulars, not tourists.

**Person:** mostly second person imperative ("You get weird", "Book Catering") mixed with
first-person-plural asides ("We park at breweries"). Never third-person corporate distance.

**Casing:** headlines and buttons are UPPERCASE (set in the display font); body copy and
kickers are sentence case. Kickers are lowercase italic ("terrible names. you'll order
anyway.").

**Emoji:** used sparingly and only as literal glyphs already in the copy (📍 pin for
schedule, 📬 mailbox on the newsletter stamp) — never as decorative sprinkles or reaction
emoji. No emoji spam.

**Signature lines** (use as calibration, not a script to copy verbatim):
- "Questionable decisions. Excellent pizza."
- "We park at breweries. You get weird."
- "Terrible names. You'll order anyway."
- "Thanks. You're terrible."

**Never Gerald:**
- "Experience artisanal wood-fired excellence." (corporate/artisanal-washing)
- "Subscribe for exclusive offers!" / "Your satisfaction is our priority." (hype-bro, corporate)
- Emoji spam
- Punching down or actually insulting anyone — the "terrible" is self-directed affection,
  never at the customer's expense.

## Visual foundations

**Color:** warm **bone** paper (`--bone #F1E6D2`) dominant background, **ink** (`#17120D`)
for text/borders/structure, and exactly **one** loud accent — **Gerald red** (`#C8341B`) —
kept under ~15% of any screen. **Mustard gold** (`#E8A11E`) carries highlights, tape, and the
"next appearance" bar. **Teal** (`#2E7C78`) is a rare tertiary (a mascot-color nod) — used
maybe once per page. Every saturated color (red, gold) has a deeper "shadow" pair
(`--red-deep`, `--gold-deep`) used exclusively for offset shadows, never as a second fill.

**Type:** three families with clear jobs.
- **Display** — Tomarik Display (Adobe/Inhouse Type; hand-drawn display serif). Headlines,
  pizza names, buttons. Always UPPERCASE, tight tracking (−.03em).
- **Editorial + Accent** — New Spirit (Adobe/Newlyn), one family pulling two jobs:
  *editorial* italic for pull-quotes/taglines (larger size), *accent* for kickers/
  stamps/badges (smaller, sometimes uppercase+tracked). Differentiate by weight/size/case,
  not by swapping fonts.
- **Body** — Hanken Grotesk. The workhorse for paragraphs, labels, UI. Never Inter or Roboto.
- **Mono** — Space Mono, for code/token specs only.

✅ Both display-role fonts (Tomarik Display, New Spirit) now load live from the brand's
Adobe Fonts (Typekit) kit — see "Fonts" below.

**Spacing & structure:** container max-width 1180px, 24px gutters, 74px section padding.
Radius is a consistent 8px; borders are a thick 2.5px solid ink. The signature move is the
**hard offset block shadow** (`5px 5px 0` in a darker shade of the element's own color) —
never a soft blurry drop-shadow on anything interactive. Hovers grow the offset to `8px 8px 0`
and lift the element `-2px,-2px`. Cards, quotes, and stamps get a deliberate collage tilt of
−1.5° to 1.2°.

**Backgrounds:** mostly flat bone/cream/ink fields, no gradients except the hero's dark
photo-scrim overlay. A fixed full-viewport paper-grain SVG noise overlay sits on every page
(`opacity ~.35-.4`, `mix-blend-mode: multiply`) — this is the closest thing to a global
texture and should always be present. Torn-edge SVG wave dividers mark transitions between
sections of different background color. Halftone dot fields (gold on ink) and translucent
gold tape strips appear as sparing punctuation, not on every card.

**Imagery:** none was supplied. Every photo/video zone in the source uses a deliberate
hatched/dashed placeholder system (see `PlaceholderBox`) rather than stock photography or
drawn illustration — this placeholder IS the intentional design language until real
photography/footage lands. Photography, once shot, should read warm and slightly grainy
(pizza, fire, dough, trucks, breweries) — no evidence of a cool/clinical or black-and-white
direction in the source.

**Motion:** restrained. One `translateY(26px)+fade` scroll-reveal per section (IntersectionObserver
triggered, `.6s ease`, no infinite decorative loops except the top marquee, which scrolls
linearly forever, and the "next appearance" dot, which pulses forever as a genuine live-status
indicator).

**Hover / press states:** hover = lift `-2px,-2px` + offset shadow grows to 8px (buttons),
or background flips solid (ghost buttons/social icons: transparent→ink). No press/active
state is defined in the source beyond the hover treatment; if one is needed, a slight scale
or shadow-collapse in the direction of the hover animation is consistent with the system.

**Corner radii:** 8px standard for cards/panels, pill (20px+) for badges/tags, circular for
avatar-style slots (stamp, timeline dots) and social icon buttons.

**Cards:** cream fill, 2–2.5px ink border, 8px radius, hard offset shadow
(`4px 4px 0 rgba(23,18,13,.18)`, growing on hover), and a slight tilt. No soft shadows, no
glassmorphism, no blur — the one place blur/transparency shows up is the hero's photo-scrim
gradient and the translucent gold tape.

## Iconography

No icon font or third-party icon library is used anywhere in the source. Every icon is a
small **bespoke inline SVG**, hand-authored at a consistent ~1.6px stroke weight for line
icons (venue category icons) or solid fill for brand glyphs (social icons, play button, the
logo mark). These have been copied verbatim into `assets/icons/`:
- `logo-mark.svg` — the circular ink/red/gold/teal pizza-slice mark used in the nav and footer.
- `social-instagram.svg`, `social-tiktok.svg` — footer/nav social links.
- `venue-brewery.svg`, `venue-building.svg`, `venue-park.svg`, `venue-event.svg` — the
  "Gerald's Favorite Places" category icons.
- `play.svg` — the TikTok-embed play glyph.

Literal emoji (📍 🎙 📺 📰 📬 ✦ ★) appear inline in copy as content glyphs (schedule pin,
press-feature icons, a bullet mark, star rating) — this is the extent of "emoji usage" and
should not be expanded into a broader emoji system. No PNG icon assets were found or needed.

## Fonts

**Tomarik Display** (Adobe Fonts / Inhouse Type) and **New Spirit** (Adobe Fonts / Newlyn)
now load live from the brand's Adobe Fonts (Typekit) kit (`use.typekit.net/ryy1hmv.css`,
imported in `tokens/typography.css`), exposing `"tomarik-display"` and `"new-spirit"`.
DM Serif Display and Fraunces (Google Fonts) remain in the font-stack as fallbacks only, in
case the kit is ever unreachable.

## Index

- `styles.css` — root stylesheet; `@import`s everything in `tokens/`.
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/motion.css`
- `assets/icons/` — logo mark + all bespoke SVG icons (see Iconography above)
- `guidelines/` — 13 foundation specimen cards (Colors ×3, Type ×5, Spacing ×2, Brand ×4)
- `components/core/` — `Button`, `Badge`, `Stamp`, `PlaceholderBox`
- `components/cards/` — `PizzaCard`, `QuoteCard`, `FeatureCard`, `ScheduleCard`
- `components/navigation/` — `NavBar`, `Marquee`, `NextAppearanceBar`
- `components/layout/` — `SectionHeader`, `TornDivider`, `TapeStrip`
- `components/forms/` — `NewsletterForm`
- `ui_kits/marketing-site/` — full interactive homepage recreation (`index.html`)
- `SKILL.md` — portable skill wrapper for use in Claude Code

### Intentional additions
None — every component above was extracted from a repeated pattern actually present in the
homepage comp, not invented from a generic component-library default.

## Caveats

- No Figma file or codebase was attached — this system was built entirely from two static
  HTML comps. If a real codebase or Figma file exists, please attach it so components and
  copy can be verified against production rather than a comp.
- No real photography, video, or mascot illustration was supplied; every image/video slot
  uses the brand's own placeholder system by design, not as a shortcut.
- Only one product surface (the marketing website) was defined by the source material.
