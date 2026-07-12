import type { CSSProperties } from 'react';

interface TornDividerProps {
  color?: string;
  style?: CSSProperties;
}

export default function TornDivider({
  color = 'var(--cream)',
  style,
}: TornDividerProps) {
  return (
    <svg
      viewBox="0 0 1200 26"
      preserveAspectRatio="none"
      style={{
        display: 'block',
        width: '100%',
        height: 26,
        color,
        ...style,
      }}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M0 26 L0 12 Q40 2 80 10 T160 8 T240 14 T320 4 T400 12 T480 6 T560 14 T640 4 T720 12 T800 6 T880 14 T960 4 T1040 12 T1120 6 T1200 12 L1200 26 Z"
      />
    </svg>
  );
}
