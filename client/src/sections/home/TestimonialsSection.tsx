import { useEffect, useState } from 'react';
import FeatureCard from '../../components/marketing/FeatureCard';
import PlaceholderBox from '../../components/marketing/PlaceholderBox';
import { fetchPressFeatures, fetchTikTokFeatures } from '../../services/contentApi';
import type { PressFeature, TikTokFeature } from '../../types';

export default function TestimonialsSection() {
  const [features, setFeatures] = useState<PressFeature[]>([]);
  const [tiktoks, setTiktoks] = useState<TikTokFeature[]>([]);

  useEffect(() => {
    Promise.all([fetchPressFeatures(), fetchTikTokFeatures()])
      .then(([press, tok]) => {
        setFeatures(press);
        setTiktoks(tok);
      })
      .catch((error) => console.error('Failed to load testimonials:', error));
  }, []);

  return (
    <section
      style={{ padding: '74px 0', background: 'var(--ink)', color: 'var(--cream)' }}
      id="testimonials"
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 34 }}>
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              color: 'var(--gold)',
              fontSize: '.95rem',
              display: 'block',
              marginBottom: 4,
            }}
          >
            people keep talking about us
          </span>
          <h2 className="gerald-display-h2">Testimonials of Terrible</h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 16,
            marginBottom: 46,
          }}
          className="gerald-feat-grid"
        >
          {features.map((f) => (
            <FeatureCard
              key={f._id}
              by={f.outlet}
              what={f.blurb}
              cta={f.ctaLabel}
              thumbLabel={f.thumbLabel}
              linkUrl={f.linkUrl}
            />
          ))}
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            marginBottom: 6,
            textTransform: 'uppercase',
          }}
        >
          Featured by these (slightly unhinged) people
        </h3>
        <p style={{ color: '#caa45d', marginBottom: 22, maxWidth: '60ch' }}>
          Omaha&apos;s TikTok creators are weirdly into us — and we&apos;re not mad about it.
          Their favorable clips, embedded straight from TikTok.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6,1fr)',
            gap: 12,
          }}
          className="gerald-tok-grid"
        >
          {tiktoks.map((t) => {
            const tile = (
              <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                <PlaceholderBox dark label="TikTok" aspect="9/16" />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src="/icons/play.svg"
                    alt="play"
                    style={{
                      width: 34,
                      height: 34,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.5))',
                    }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: 6,
                    bottom: 6,
                    right: 6,
                    fontSize: '.68rem',
                    fontWeight: 700,
                    color: '#fff',
                    textShadow: '0 1px 3px #000',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 4,
                  }}
                >
                  <span>{t.handle}</span>
                  <span>{t.views}</span>
                </div>
              </div>
            );

            return t.linkUrl ? (
              <a
                key={t._id}
                href={t.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {tile}
              </a>
            ) : (
              <div key={t._id}>{tile}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
