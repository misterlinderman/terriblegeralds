const { PlaceholderBox, Button } = window.TerribleGeraldSDesignSystem_d3d4e8;

const STOPS = [
  { yr: '2018', t: 'Bad Ideas', d: 'It begins, regrettably.' },
  { yr: '2019', t: 'First Truck', d: 'Wheels acquired.' },
  { yr: '2020', t: 'Gerald Is Born', d: 'A face for the chaos.' },
  { yr: '2021', t: "Gettin' Weird", d: 'Names get worse. Pies get better.' },
  { yr: 'NOW', t: 'Terrible Legend', d: 'Season 3 · Vol. 6.' },
];

function AboutSection() {
  return (
    <section style={{ padding: '74px 0', background: 'var(--cream)' }} id="about">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 34, flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: 'var(--red)', fontSize: '.95rem', display: 'block', marginBottom: 4 }}>how we got terrible</span>
            <h2 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: 'clamp(2rem,4.4vw,3.3rem)', margin: 0 }}>The Story of Gerald</h2>
          </div>
          <Button variant="ink" size="sm" href="about.html">Read the Whole Saga</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }} className="gerald-timeline">
          {STOPS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <PlaceholderBox label={s.yr === 'NOW' ? 'now' : 'art'} style={{ width: 78, height: 78, borderRadius: '50%', margin: '0 auto 14px', border: '3px solid var(--ink)', fontSize: '.62rem' }} />
              <div style={{ fontFamily: 'var(--font-display)', color: 'var(--red)', fontSize: '1.1rem' }}>{s.yr}</div>
              <div style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '.78rem', letterSpacing: '.04em' }}>{s.t}</div>
              <div style={{ fontSize: '.78rem', color: 'var(--ink-soft)', marginTop: 4 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.AboutSection = AboutSection;
