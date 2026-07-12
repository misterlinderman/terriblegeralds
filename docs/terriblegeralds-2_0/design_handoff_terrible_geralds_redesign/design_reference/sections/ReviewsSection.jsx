const { QuoteCard } = window.TerribleGeraldSDesignSystem_d3d4e8;

function ReviewsSection() {
  return (
    <section style={{ padding: '74px 0', background: 'var(--ink)', color: 'var(--cream)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: 36, alignItems: 'center' }} className="gerald-reviews">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '5.5rem', color: 'var(--gold)', lineHeight: .85 }}>4.9</div>
          <div style={{ color: 'var(--gold)', fontSize: '1.5rem', letterSpacing: '.1em' }}>★★★★★</div>
          <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.8rem', marginTop: 8, color: 'var(--gold)' }}>Best Pizza in Omaha?</div>
          <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '.8rem', marginTop: 8, opacity: .7 }}>Based on 500+ Google reviews</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }} className="gerald-quotes">
          <QuoteCard tone="cream" quote={'"I drove 45 minutes for this pizza."'} source="a reasonable person" />
          <QuoteCard tone="ink" quote={'"Terrible name. Incredible pizza."'} source="everybody, eventually" />
          <QuoteCard tone="red" quote={'"The best food truck experience in Omaha."'} source="★★★★★" />
          <QuoteCard tone="teal" quote={"\"Thanks. You're terrible.\""} source="Gerald, probably" />
        </div>
      </div>
    </section>
  );
}
window.ReviewsSection = ReviewsSection;
