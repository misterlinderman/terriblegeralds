import type { CSSProperties } from 'react';

type QuoteTone = 'cream' | 'ink' | 'red' | 'teal';

interface QuoteCardProps {
  tone?: QuoteTone;
  quote?: string;
  source?: string;
  style?: CSSProperties;
}

const tones: Record<
  QuoteTone,
  { background: string; color: string; border: string; rotate: number }
> = {
  cream: {
    background: 'var(--cream)',
    color: 'var(--ink)',
    border: '2px solid var(--ink)',
    rotate: -1,
  },
  ink: {
    background: 'var(--ink)',
    color: 'var(--cream)',
    border: 'none',
    rotate: 1.2,
  },
  red: {
    background: 'var(--red)',
    color: 'var(--cream)',
    border: 'none',
    rotate: 0.6,
  },
  teal: {
    background: 'var(--teal)',
    color: 'var(--cream)',
    border: 'none',
    rotate: -1.4,
  },
};

export default function QuoteCard({
  tone = 'cream',
  quote = '"I drove 45 minutes for this pizza."',
  source = 'a reasonable person',
  style,
}: QuoteCardProps) {
  const t = tones[tone];

  return (
    <div
      style={{
        padding: 18,
        borderRadius: 8,
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '1.02rem',
        background: t.background,
        color: t.color,
        border: t.border,
        transform: `rotate(${t.rotate}deg)`,
        ...style,
      }}
    >
      {quote}
      <span
        style={{
          display: 'block',
          fontFamily: 'var(--font-body)',
          fontStyle: 'normal',
          fontWeight: 800,
          fontSize: '.74rem',
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          marginTop: 10,
          opacity: 0.8,
        }}
      >
        — {source}
      </span>
    </div>
  );
}
