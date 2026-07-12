const { PlaceholderBox, SectionHeader, Button, Stamp, ScheduleCard } = window.TerribleGeraldSDesignSystem_d3d4e8;

const SCHEDULE = [
  { day: 'FRI', date: '5/30', venue: 'Site-1 Brewing', address: '2566 Farnam St', time: '5–9PM', now: true },
  { day: 'SAT', date: '5/31', venue: 'Nebraska Brewing Co.', address: 'La Vista', time: '12–8PM' },
  { day: 'SUN', date: '6/1', venue: 'The Upstream Brewing', address: 'Old Market', time: '1–6PM' },
  { day: 'WED', date: '6/4', venue: 'Beercade', address: 'Aksarben', time: '5–9PM' },
  { day: 'FRI', date: '6/6', venue: 'Infusion Brewing', address: 'Benson', time: '5–9PM' },
];

function ScheduleSection() {
  return (
    <section style={{ padding: '74px 0' }} id="schedule">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeader kicker="where's the truck?" title="This Week's Stops" action={<Button variant="ink" size="sm" href="schedule.html">Full Schedule</Button>} />
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 36 }} className="gerald-sched-grid">
          <ScheduleCard heading="📍 May 30 – June 6" rows={SCHEDULE} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>
                @terriblegeralds
                <small style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--ink-soft)', fontSize: '.78rem', textTransform: 'none' }}>the schedule lives on Instagram — pulled in live</small>
              </div>
              <Stamp>follow</Stamp>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {Array.from({ length: 6 }).map((_, i) => <PlaceholderBox key={i} label="IG post" aspect="1" />)}
            </div>
            <p style={{ fontSize: '.82rem', color: 'var(--ink-soft)', margin: 0 }}>Auto-syncs your latest Instagram posts so the weekly drop updates itself.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
window.ScheduleSection = ScheduleSection;
