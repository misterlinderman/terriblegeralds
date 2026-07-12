import type { CSSProperties, ReactNode } from 'react';

interface StampProps {
  children?: ReactNode;
  rotate?: number;
  style?: CSSProperties;
}

export default function Stamp({
  children = 'terrible ✓',
  rotate = -9,
  style,
}: StampProps) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-accent)',
        fontStyle: 'italic',
        color: 'var(--red)',
        border: '2.5px solid var(--red)',
        borderRadius: '50%',
        padding: '.55em .85em',
        transform: `rotate(${rotate}deg)`,
        fontSize: '.8rem',
        lineHeight: 1,
        display: 'inline-block',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
