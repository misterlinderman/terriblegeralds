import type { CSSProperties, ReactNode } from 'react';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  action?: ReactNode;
  style?: CSSProperties;
}

export default function SectionHeader({
  kicker,
  title,
  action,
  style,
}: SectionHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 'var(--section-head-gap)',
        flexWrap: 'wrap',
        ...style,
      }}
    >
      <div>
        {kicker && (
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
            {kicker}
          </span>
        )}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            textTransform: 'uppercase',
            lineHeight: 0.98,
            letterSpacing: 'var(--display-tracking)',
            fontSize: 'var(--text-h2)',
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
