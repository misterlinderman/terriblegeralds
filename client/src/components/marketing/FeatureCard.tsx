import type { CSSProperties } from 'react';
import PlaceholderBox from './PlaceholderBox';

interface FeatureCardProps {
  thumbLabel?: string;
  by?: string;
  what?: string;
  cta?: string;
  linkUrl?: string;
  style?: CSSProperties;
}

export default function FeatureCard({
  thumbLabel = '🎙 photo',
  by = 'Hoppen Interview',
  what = 'Sit-down with the homies',
  cta = '▶ Listen Now',
  linkUrl,
  style,
}: FeatureCardProps) {
  const card = (
    <div
      style={{
        background: 'var(--cream)',
        border: '2px solid var(--ink)',
        borderRadius: 8,
        padding: 16,
        textAlign: 'center',
        boxShadow: 'var(--card-shadow)',
        ...style,
      }}
    >
      <PlaceholderBox
        dark
        label={thumbLabel}
        aspect="16/10"
        style={{ marginBottom: 12, borderRadius: 5 }}
      />
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem',
          letterSpacing: 'var(--display-tracking)',
          lineHeight: 1,
        }}
      >
        {by}
      </div>
      <div
        style={{
          fontSize: '.78rem',
          color: 'var(--ink-soft)',
          margin: '4px 0 12px',
          minHeight: 32,
        }}
      >
        {what}
      </div>
      <span
        style={{
          fontFamily: 'var(--font-accent)',
          fontStyle: 'italic',
          color: 'var(--red)',
          fontSize: '.82rem',
        }}
      >
        {cta}
      </span>
    </div>
  );

  if (linkUrl) {
    return (
      <a href={linkUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
        {card}
      </a>
    );
  }

  return card;
}
