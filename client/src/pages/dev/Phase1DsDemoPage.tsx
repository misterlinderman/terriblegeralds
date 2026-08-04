/**
 * Dev-only Phase 1 design-system primitive showcase.
 * Route: /dev/phase-1 (registered only when import.meta.env.DEV).
 */
import type { ReactNode } from 'react';
import Badge from '../../components/marketing/Badge';
import Button from '../../components/marketing/Button';
import PlaceholderBox from '../../components/marketing/PlaceholderBox';
import SectionHeader from '../../components/marketing/SectionHeader';
import Stamp from '../../components/marketing/Stamp';
import TapeStrip from '../../components/marketing/TapeStrip';
import TornDivider from '../../components/marketing/TornDivider';

function DemoBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-h4)',
          letterSpacing: 'var(--display-tracking)',
          textTransform: 'uppercase',
          margin: '0 0 1rem',
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function Phase1DsDemoPage() {
  return (
    <div className="brand-site">
      <section className="pg-hero">
        <div className="wrap">
          <span className="kicker">phase 1 · design-system foundation</span>
          <h1>Core primitives</h1>
          <p>Hover buttons for lift + shadow growth. Badges and stamps show collage tilt.</p>
        </div>
      </section>

      <TornDivider color="var(--bone)" />

      <section className="pg">
        <div className="wrap">
          <p
            style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontSize: 'var(--text-kicker)',
              marginBottom: 'var(--section-head-gap)',
            }}
          >
            dev-only route — not shipped in production builds
          </p>

          <DemoBlock title="SectionHeader">
            <SectionHeader
              kicker="terrible names. you'll order anyway."
              title="The Menu"
              action={<Button variant="ghost" size="sm" href="/menu">See All</Button>}
            />
          </DemoBlock>

          <DemoBlock title="Button — variants (hover me)">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <Button variant="red">Book Catering</Button>
              <Button variant="ink">See Schedule</Button>
              <Button variant="gold">Join List</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="red" size="sm">Small Red</Button>
              <Button variant="red" disabled>Disabled</Button>
            </div>
          </DemoBlock>

          <DemoBlock title="Button — ghostInverse (on ink)">
            <div
              style={{
                background: 'var(--ink)',
                padding: '24px',
                borderRadius: 'var(--radius)',
              }}
            >
              <Button variant="ghostInverse">Contact Us</Button>
            </div>
          </DemoBlock>

          <DemoBlock title="Badge — tones + tilt">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <Badge tone="red">season 3</Badge>
              <Badge tone="ink" rotate={2}>omaha, ne</Badge>
              <Badge tone="gold" rotate={-5}>wood-fired</Badge>
            </div>
          </DemoBlock>

          <DemoBlock title="Stamp — collage tilt">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
              <Stamp />
              <Stamp rotate={6}>approved ✓</Stamp>
              <Stamp rotate={-12}>terrible ✓</Stamp>
            </div>
          </DemoBlock>

          <DemoBlock title="PlaceholderBox">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
              }}
            >
              <PlaceholderBox label="PHOTO" />
              <PlaceholderBox dark label="VIDEO" aspect="16/9" />
              <PlaceholderBox aspect="1/1">pizza slot</PlaceholderBox>
            </div>
          </DemoBlock>

          <DemoBlock title="TapeStrip — on card">
            <div
              style={{
                position: 'relative',
                background: 'var(--cream)',
                border: 'var(--border)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--card-shadow)',
                padding: '32px 24px 24px',
                maxWidth: 320,
                transform: 'rotate(-1deg)',
              }}
            >
              <TapeStrip />
              <p style={{ margin: 0, fontFamily: 'var(--font-body)' }}>
                Card with gold tape strip and slight collage tilt.
              </p>
            </div>
          </DemoBlock>

          <DemoBlock title="TornDivider">
            <div style={{ background: 'var(--ink)', padding: '24px 0', marginBottom: 8 }}>
              <p style={{ color: 'var(--cream)', textAlign: 'center', margin: 0 }}>ink section</p>
            </div>
            <TornDivider color="var(--bone)" />
            <div style={{ background: 'var(--bone)', padding: '24px 0' }}>
              <p style={{ textAlign: 'center', margin: 0 }}>bone section below tear</p>
            </div>
          </DemoBlock>

          <DemoBlock title="gform shell (brand.css)">
            <form className="gform" onSubmit={(e) => e.preventDefault()} noValidate>
              <div className="row">
                <div className="field">
                  <label htmlFor="demo-name">Name</label>
                  <input id="demo-name" name="name" type="text" placeholder="Gerald" />
                </div>
                <div className="field">
                  <label htmlFor="demo-email">Email</label>
                  <input id="demo-email" name="email" type="email" placeholder="you@example.com" />
                </div>
              </div>
              <div className="field invalid">
                <label htmlFor="demo-msg">Message</label>
                <textarea id="demo-msg" name="message" placeholder="Tell us about your event…" />
                <span className="err">Required field (demo invalid state)</span>
              </div>
              <Button type="submit">Send It</Button>
            </form>
          </DemoBlock>
        </div>
      </section>
    </div>
  );
}
