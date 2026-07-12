const { PlaceholderBox } = window.TerribleGeraldSDesignSystem_d3d4e8;
const MOODS = ['😐', '😑', '🍕', '😋', '😵', '★', '😬', '🤨', '😎', '😶', '🍕', '😴', '😏', '😮', '★', '😐'];

function WallSection() {
  return (
    <section style={{ padding: '74px 0', background: 'var(--ink)', color: 'var(--cream)' }} id="wall">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 34, flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: 'var(--gold)', fontSize: '.95rem', display: 'block', marginBottom: 4 }}>the people demanded it</span>
            <h2 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: 'clamp(2rem,4.4vw,3.3rem)', margin: 0 }}>The Wall of Gerald</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 10 }} className="gerald-wall">
          {MOODS.map((m, i) => <PlaceholderBox key={i} dark label={m} aspect="1" style={{ fontSize: '.6rem' }} />)}
        </div>
        <p style={{ textAlign: 'center', marginTop: 18, color: '#caa45d', fontFamily: 'var(--font-accent)', fontStyle: 'italic' }}>a home for your boatloads of unused Geralds.</p>
      </div>
    </section>
  );
}
window.WallSection = WallSection;
