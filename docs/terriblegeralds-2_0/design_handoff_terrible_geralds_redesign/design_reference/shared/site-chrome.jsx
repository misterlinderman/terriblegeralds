/* Shared header + footer chrome for the Terrible Gerald's 2.0 multi-page site.
   Uses DS bundle primitives (Marquee, NavBar, NextAppearanceBar) plus a custom
   Footer matched to the homepage comp's footer pattern, wired with real page hrefs. */

const IG_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2.16c3.2 0 3.58 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32M12 16a4 4 0 110-8 4 4 0 010 8m6.41-10.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88"/></svg>`;
const TT_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.3 0 .59.05.86.13V9.4a6.33 6.33 0 00-1-.05A6.34 6.34 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z"/></svg>`;

const SITE_LINKS = [
  { label: 'Menu', href: 'menu.html' },
  { label: 'Schedule', href: 'schedule.html' },
  { label: 'Catering', href: 'catering.html' },
  { label: 'About', href: 'about.html' },
  { label: 'Contact', href: 'contact.html' },
];

function SiteHeader({ active, showMarquee = true, showNextBar = true, nextBarProps }) {
  const { Marquee, NavBar, NextAppearanceBar } = window.TerribleGeraldSDesignSystem_d3d4e8;
  const links = SITE_LINKS.map((l) => ({
    ...l,
    label: l.href === active
      ? l.label
      : l.label,
  }));
  return (
    <React.Fragment>
      {showMarquee && <Marquee items={['WOOD FIRED', 'GET WEIRD', 'EAT PIZZA', 'UNORTHODOX NEAPOLITAN', 'OMAHA, NE', 'SEASON 3 · VOL. 6']} />}
      <NavBar
        logoSrc="assets/icons/logo-mark.svg"
        links={links}
        socials={[{ label: 'Instagram', svg: IG_SVG }, { href: '#', label: 'TikTok', svg: TT_SVG }]}
      />
      <style>{`
        .gerald-nav-links a[href="${active}"]{ color: var(--red) !important; }
        .gerald-nav-links a[href="${active}"]::after{ content:""; display:block; height:2.5px; background:var(--red); margin-top:3px; }
      `}</style>
      {showNextBar && <NextAppearanceBar {...(nextBarProps || {})} />}
    </React.Fragment>
  );
}

const FOOT_COLS = [
  { h: 'The Goods', links: [['Our Pizzas', 'menu.html'], ['This Week\u2019s Stops', 'schedule.html'], ['Catering & Events', 'catering.html'], ['Get in Touch', 'contact.html']] },
  { h: 'The Lore', links: [['The Story of Gerald', 'about.html'], ['Testimonials', 'index.html#testimonials'], ['The Wall of Gerald', 'index.html#wall'], ['Back Home', 'index.html'] ] },
];

function SiteFooter() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '54px 0 30px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 34, marginBottom: 36 }} className="gerald-foot-grid">
          <div>
            <div style={{ lineHeight: .82 }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '.06em' }}>TERRIBLE</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--red)' }}>GERALD'S</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '.72rem', letterSpacing: '.32em', opacity: .7 }}>PIZZA · OMAHA, NE</span>
            </div>
            <p style={{ marginTop: 14, opacity: .8, maxWidth: '34ch', fontSize: '.9rem' }}>Unorthodox Neapolitan pizza on wheels. Questionable decisions, excellent pizza.</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              {[IG_SVG, TT_SVG].map((svg, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, border: '2px solid var(--cream)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)' }} dangerouslySetInnerHTML={{ __html: svg }} />
              ))}
            </div>
          </div>
          {FOOT_COLS.map((c, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: 'var(--font-display)', letterSpacing: '.05em', marginBottom: 14, fontSize: '1rem', textTransform: 'uppercase' }}>{c.h}</h4>
              {c.links.map(([l, href], j) => <a key={j} href={href} style={{ display: 'block', padding: '5px 0', fontSize: '.9rem', opacity: .85, color: 'var(--cream)', textDecoration: 'none' }}>{l}</a>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(251,245,232,.18)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', fontSize: '.78rem', opacity: .65 }}>
          <span>© 2026 Terrible Gerald's Pizza · Omaha, NE</span>
          <span>Season 3 · Vol. 6 — site 2.0</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { SiteHeader, SiteFooter, SITE_LINKS });
