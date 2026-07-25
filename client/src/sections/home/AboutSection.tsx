import { useEffect, useState } from 'react';
import Button from '../../components/marketing/Button';
import PlaceholderBox from '../../components/marketing/PlaceholderBox';
import { fetchAboutStops } from '../../services/contentApi';
import type { AboutStop } from '../../types';

export default function AboutSection() {
  const [stops, setStops] = useState<AboutStop[]>([]);

  useEffect(() => {
    fetchAboutStops()
      .then(setStops)
      .catch((error) => console.error('Failed to load about stops:', error));
  }, []);

  return (
    <section style={{ padding: '74px 0', background: 'var(--cream)' }} id="about">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 20,
            marginBottom: 34,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontStyle: 'italic',
                color: 'var(--red)',
                fontSize: '.95rem',
                display: 'block',
                marginBottom: 4,
              }}
            >
              how we got terrible
            </span>
            <h2 className="gerald-display-h2">The Story of Gerald</h2>
          </div>
          <Button variant="ink" size="sm" href="/about">
            Read the Whole Saga
          </Button>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
            gap: 8,
          }}
          className="gerald-timeline"
        >
          {stops.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <PlaceholderBox
                label={s.year === 'NOW' ? 'now' : 'art'}
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: '50%',
                  margin: '0 auto 14px',
                  border: '3px solid var(--ink)',
                  fontSize: '.62rem',
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--red)',
                  fontSize: '1.1rem',
                }}
              >
                {s.year}
              </div>
              <div
                style={{
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  fontSize: '.78rem',
                  letterSpacing: '.04em',
                }}
              >
                {s.title}
              </div>
              <div
                style={{
                  fontSize: '.78rem',
                  color: 'var(--ink-soft)',
                  marginTop: 4,
                }}
              >
                {s.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
