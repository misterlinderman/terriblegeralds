import { Link } from 'react-router-dom';
import PlaceholderBox from '../../components/marketing/PlaceholderBox';
import HeroVideoBackground from './HeroVideoBackground';

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--ink)',
        overflow: 'hidden',
        color: 'var(--cream)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <HeroVideoBackground />
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1180,
          margin: '0 auto',
          padding: '90px 24px 110px',
          display: 'grid',
          gridTemplateColumns: '1.1fr .9fr',
          gap: 30,
          alignItems: 'center',
        }}
        className="gerald-hero-inner"
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              color: 'var(--gold)',
              letterSpacing: '.04em',
              fontSize: '1rem',
              marginBottom: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ height: 2, width: 46, background: 'var(--gold)' }} /> Unorthodox
            Neapolitan · Omaha, NE
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              textTransform: 'uppercase',
              lineHeight: 0.98,
              letterSpacing: 'var(--display-tracking)',
              fontSize: 'var(--text-h1)',
              margin: 0,
            }}
          >
            <span style={{ display: 'block' }}>Questionable</span>
            <span
              style={{
                display: 'block',
                color: 'transparent',
                WebkitTextStroke: '2px var(--cream)',
              }}
            >
              Decisions.
            </span>
            <span style={{ display: 'block', color: 'var(--red)' }}>Excellent</span>
            <span style={{ display: 'block' }}>Pizza.</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '1.15rem',
              maxWidth: '30ch',
              margin: '22px 0 30px',
              color: '#ecdfc7',
            }}
          >
            Wood-fired pies with terrible names and an incredible reputation. We park at
            breweries. You get weird.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link
              to="/events"
              style={{
                fontFamily: 'var(--font-display)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--button-tracking)',
                fontSize: '1rem',
                padding: '15px 26px',
                borderRadius: 3,
                background: 'var(--red)',
                color: 'var(--cream)',
                boxShadow: 'var(--offset-shadow) var(--red-deep)',
                textDecoration: 'none',
                display: 'inline-flex',
                gap: 9,
              }}
            >
              Find Us This Week →
            </Link>
            <Link
              to="/catering"
              style={{
                fontFamily: 'var(--font-display)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--button-tracking)',
                fontSize: '1rem',
                padding: '15px 26px',
                borderRadius: 3,
                background: 'transparent',
                color: 'var(--cream)',
                border: '2.5px solid var(--cream)',
                textDecoration: 'none',
                display: 'inline-flex',
                gap: 9,
              }}
            >
              Book Catering
            </Link>
          </div>
        </div>
        <div style={{ position: 'relative', justifySelf: 'center' }} className="gerald-hero-gerald">
          <div
            style={{
              position: 'absolute',
              top: -6,
              right: -18,
              background: 'var(--cream)',
              color: 'var(--ink)',
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontSize: '.8rem',
              padding: '12px 16px',
              borderRadius: 14,
              transform: 'rotate(4deg)',
              maxWidth: 170,
              boxShadow: 'var(--shadow-soft)',
              zIndex: 4,
            }}
          >
            wood fired · get weird · eat pizza
          </div>
          <PlaceholderBox
            style={{
              width: 'min(330px,38vw)',
              aspectRatio: '3/4',
              background: 'rgba(251,245,232,.06)',
              borderColor: 'rgba(232,161,30,.45)',
              color: '#e8c98a',
            }}
          >
            GERALD
            <br />
            (post tummy-tuck)
            <br />— your mascot art slots here —
          </PlaceholderBox>
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              left: -12,
              background: 'var(--gold)',
              color: 'var(--ink)',
              fontFamily: 'var(--font-display)',
              padding: '6px 14px',
              transform: 'rotate(-5deg)',
              fontSize: '.8rem',
              letterSpacing: '.06em',
            }}
          >
            ★ DOORBUSTER
          </div>
        </div>
      </div>
    </section>
  );
}
