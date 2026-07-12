const venueIcons = {
  brewery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h11v9a3 3 0 01-3 3H8a3 3 0 01-3-3V8z"/><path d="M16 10h2.5a2.5 2.5 0 010 5H16"/><path d="M8 5v3M11 4v4M14 5v3"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg>`,
  park: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2L8 12h8L12 2zM12 12v9M7 12l-3 9M17 12l3 9"/></svg>`,
  event: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>`,
};
const VENUES = [
  { t: 'Breweries', d: 'Our natural habitat', ic: 'brewery' },
  { t: 'Venues', d: 'Spaces for the chaos', ic: 'building' },
  { t: 'Parks', d: 'Eat outside, weirdo', ic: 'park' },
  { t: 'Event Spots', d: 'Book us together', ic: 'event' },
];

function VenuesSection() {
  return (
    <section style={{ padding: '74px 0' }} id="venues">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 34, flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: 'var(--red)', fontSize: '.95rem', display: 'block', marginBottom: 4 }}>where to find good people &amp; good beer</span>
            <h2 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: 'clamp(2rem,4.4vw,3.3rem)', margin: 0 }}>Gerald's Favorite Places</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="gerald-ven-grid">
          {VENUES.map((v, i) => (
            <div key={i} style={{ background: 'var(--bone-2)', border: '2px solid var(--ink)', borderRadius: 8, padding: '24px 18px', textAlign: 'center' }}>
              <div style={{ width: 46, height: 46, margin: '0 auto 12px', color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: venueIcons[v.ic] }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>{v.t}</div>
              <div style={{ fontSize: '.78rem', color: 'var(--ink-soft)', marginTop: 4 }}>{v.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.VenuesSection = VenuesSection;
