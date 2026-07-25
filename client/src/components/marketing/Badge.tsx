import type { CSSProperties, ReactNode } from 'react';

type BadgeTone = 'red' | 'ink' | 'gold';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  rotate?: number;
  style?: CSSProperties;
}

const tones: Record<BadgeTone, CSSProperties> = {
  red: { background: 'var(--red)', color: 'var(--cream)' },
  ink: { background: 'var(--ink)', color: 'var(--cream)' },
  gold: { background: 'var(--gold)', color: 'var(--ink)' },
};

export default function Badge({
  children,
  tone = 'red',
  rotate = -3,
  style,
}: BadgeProps) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-accent)',
        fontStyle: 'italic',
        fontSize: '1rem',
        fontWeight: 600,
        padding: '4px 13px',
        borderRadius: 'var(--radius-pill)',
        display: 'inline-block',
        transform: `rotate(${rotate}deg)`,
        ...tones[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
