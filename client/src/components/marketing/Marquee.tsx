import type { CSSProperties } from 'react';

interface MarqueeProps {
  items?: string[];
  style?: CSSProperties;
}

export default function Marquee({
  items = ['WOOD FIRED', 'GET WEIRD', 'EAT PIZZA'],
  style,
}: MarqueeProps) {
  const track = (
    <span>
      {items.map((it, i) => (
        <span key={i} style={{ padding: '0 22px' }}>
          {it}{' '}
          <span style={{ color: 'var(--gold)' }}>●</span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      style={{
        background: 'var(--ink)',
        color: 'var(--cream)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-accent)',
        fontStyle: 'italic',
        fontSize: '.82rem',
        padding: '7px 0',
        borderBottom: '2px solid var(--red)',
        ...style,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          animation: 'gerald-marquee var(--marquee-duration) linear infinite',
        }}
      >
        {track}
        {track}
      </div>
    </div>
  );
}
