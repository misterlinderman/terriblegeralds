const { FeatureCard, PlaceholderBox } = window.TerribleGeraldSDesignSystem_d3d4e8;

const FEATURES = [
  { by: 'Hoppen Interview', what: 'Sit-down with the homies', cta: '▶ Listen Now', thumbLabel: '🎙 photo' },
  { by: 'Meat Locker Pod', what: 'Podcast appearance', cta: '▶ Listen Now', thumbLabel: '🎙 podcast' },
  { by: 'KELOLAND', what: 'TV feature', cta: '▶ Watch', thumbLabel: '📺 clip' },
  { by: 'Omaha World-Herald', what: '"Food truck serving up unique pies in Omaha"', cta: '▶ Read', thumbLabel: '📰 clipping' },
];
const TIKTOKS = [
  { handle: '@emiliestrumlcin', views: '116K' }, { handle: '@hr.doods', views: '67K' },
  { handle: '@piecewayforfood', views: '82K' }, { handle: '@hangryhoppers', views: '71K' },
  { handle: '@tiktoktodelats', views: '91K' }, { handle: '@cheeseloveshim', views: '560K' },
];

function TestimonialsSection() {
  return (
    <section style={{ padding: '74px 0', background: 'var(--ink)', color: 'var(--cream)' }} id="testimonials">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 34 }}>
          <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: 'var(--gold)', fontSize: '.95rem', display: 'block', marginBottom: 4 }}>people keep talking about us</span>
          <h2 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: 'clamp(2rem,4.4vw,3.3rem)', margin: 0 }}>Testimonials of Terrible</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 46 }} className="gerald-feat-grid">
          {FEATURES.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 6, textTransform: 'uppercase' }}>Featured by these (slightly unhinged) people</h3>
        <p style={{ color: '#caa45d', marginBottom: 22, maxWidth: '60ch' }}>Omaha's TikTok creators are weirdly into us — and we're not mad about it. Their favorable clips, embedded straight from TikTok.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 12 }} className="gerald-tok-grid">
          {TIKTOKS.map((t, i) => (
            <div key={i} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
              <PlaceholderBox dark label="TikTok" aspect="9/16" />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="assets/icons/play.svg" alt="play" style={{ width: 34, height: 34, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.5))' }} />
              </div>
              <div style={{ position: 'absolute', left: 6, bottom: 6, right: 6, fontSize: '.68rem', fontWeight: 700, color: '#fff', textShadow: '0 1px 3px #000', display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                <span>{t.handle}</span><span>{t.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.TestimonialsSection = TestimonialsSection;
