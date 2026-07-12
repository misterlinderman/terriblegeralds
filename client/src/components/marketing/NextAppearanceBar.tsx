import type { CSSProperties } from 'react';

interface NextAppearanceBarProps {
  label?: string;
  info?: string;
  style?: CSSProperties;
}

export default function NextAppearanceBar({
  label = 'Next Appearance',
  info = 'FRIDAY, MAY 30 · 5–9PM  •  SITE-1 BREWING  •  2566 Farnam St, Omaha, NE',
  style,
}: NextAppearanceBarProps) {
  return (
    <div
      style={{
        background: 'var(--gold)',
        borderTop: '3px solid var(--ink)',
        borderBottom: '3px solid var(--ink)',
        color: 'var(--ink)',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          padding: '16px 24px',
          flexWrap: 'wrap',
          maxWidth: 1180,
          margin: '0 auto',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            letterSpacing: '.04em',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: 'var(--red)',
              display: 'inline-block',
              animation: 'gerald-pulse var(--pulse-duration) infinite',
            }}
          />
          {label}
        </span>
        <span style={{ fontWeight: 800, fontSize: '1.02rem' }}>{info}</span>
      </div>
    </div>
  );
}
