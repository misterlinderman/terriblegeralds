const { PlaceholderBox, Button } = window.TerribleGeraldSDesignSystem_d3d4e8;

function CateringSection() {
  return (
    <section style={{ padding: '74px 0' }} id="catering">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }} className="gerald-cater">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12 }}>
          <PlaceholderBox label="SETUP PHOTO — truck at event" style={{ gridRow: 'span 2', aspectRatio: 'auto' }} />
          <PlaceholderBox label="plated pies" aspect="1" />
          <PlaceholderBox label="the crew" aspect="1" />
        </div>
        <div>
          <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: 'var(--red)', fontSize: '.95rem', display: 'block', marginBottom: 4 }}>we bring the terrible</span>
          <h2 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: 'clamp(2rem,4vw,3rem)', margin: 0 }}>Catering &amp; Events</h2>
          <p style={{ marginTop: 12, maxWidth: '42ch' }}>We roll the wood-fired trailer (and soon, the truck) to your thing and feed your people fresh, blistered pies on-site. Tell us the date, the headcount, and how weird you want it.</p>
          <ul style={{ listStyle: 'none', margin: '20px 0 26px', padding: 0 }}>
            {['Weddings & rehearsal dinners', 'Corporate events & office drops', 'Festivals & markets', 'Private parties & backyard chaos'].map((t, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', fontWeight: 700, fontSize: '1.05rem', borderBottom: '1px dashed var(--paper-line)' }}>
                <span style={{ color: 'var(--red)', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>✦</span> {t}
              </li>
            ))}
          </ul>
          <Button variant="red" href="catering.html">Request a Quote →</Button>
        </div>
      </div>
    </section>
  );
}
window.CateringSection = CateringSection;
