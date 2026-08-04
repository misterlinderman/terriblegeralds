import type { CSSProperties } from 'react';

export interface ScheduleRow {
  day: string;
  date: string;
  venue: string;
  address: string;
  time: string;
  now?: boolean;
}

interface ScheduleCardProps {
  heading?: string;
  rows?: ScheduleRow[];
  style?: CSSProperties;
}

export default function ScheduleCard({
  heading = '📍 May 30 – June 6',
  rows = [],
  style,
}: ScheduleCardProps) {
  return (
    <div
      style={{
        background: 'var(--cream)',
        border: '2.5px solid var(--ink)',
        borderRadius: 8,
        boxShadow: 'var(--shadow-soft)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          background: 'var(--ink)',
          color: 'var(--cream)',
          padding: '14px 20px',
          fontFamily: 'var(--font-display)',
          letterSpacing: 'var(--display-tracking)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {heading}
      </div>
      {rows.map((r, i) => (
        <div
          key={`${r.day}-${r.date}-${i}`}
          style={{
            display: 'grid',
            gridTemplateColumns: '64px 1fr auto',
            gap: 14,
            alignItems: 'center',
            padding: '15px 20px',
            borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--paper-line)',
            background: r.now ? 'rgba(232,161,30,.22)' : 'transparent',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              color: 'var(--red)',
            }}
          >
            {r.day}
            <small
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '.7rem',
                color: 'var(--ink-soft)',
              }}
            >
              {r.date}
            </small>
          </div>
          <div style={{ fontWeight: 700 }}>
            {r.venue}
            <small
              style={{
                display: 'block',
                fontWeight: 500,
                fontSize: '.78rem',
                color: 'var(--ink-soft)',
              }}
            >
              {r.address}
            </small>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '.85rem',
              background: r.now ? 'var(--red)' : 'var(--ink)',
              color: 'var(--cream)',
              padding: '4px 9px',
              borderRadius: 3,
              whiteSpace: 'nowrap',
            }}
          >
            {r.time}
          </div>
        </div>
      ))}
    </div>
  );
}
