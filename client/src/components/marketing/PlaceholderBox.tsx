import type { CSSProperties, ReactNode } from 'react';

interface PlaceholderBoxProps {
  label?: string;
  dark?: boolean;
  aspect?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export default function PlaceholderBox({
  label = 'PHOTO',
  dark = false,
  aspect,
  style,
  children,
}: PlaceholderBoxProps) {
  return (
    <div
      role="img"
      aria-label={typeof children === 'string' ? children : label}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        aspectRatio: aspect,
        backgroundImage: dark
          ? 'repeating-linear-gradient(45deg,#241c14,#241c14 14px,#1c150e 14px,#1c150e 28px)'
          : 'repeating-linear-gradient(45deg,var(--bone-2),var(--bone-2) 14px,var(--bone) 14px,var(--bone) 28px)',
        border: dark ? '2px dashed rgba(233,220,196,.35)' : '2px dashed rgba(23,18,13,.35)',
        color: dark ? '#e9dcc4' : 'var(--ink-soft)',
        fontFamily: 'var(--font-accent)',
        fontStyle: 'italic',
        fontSize: '.8rem',
        letterSpacing: '.02em',
        borderRadius: 6,
        minHeight: aspect ? undefined : 90,
        ...style,
      }}
    >
      <span style={{ display: 'block', padding: '10px 12px', lineHeight: 1.3 }}>
        {children || label}
      </span>
    </div>
  );
}
