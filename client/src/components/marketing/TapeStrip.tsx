import type { CSSProperties } from 'react';

interface TapeStripProps {
  top?: number;
  left?: number;
  rotate?: number;
  style?: CSSProperties;
}

export default function TapeStrip({
  top = -12,
  left = 24,
  rotate = -4,
  style,
}: TapeStripProps) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        top,
        left,
        width: 84,
        height: 24,
        background: 'rgba(232,161,30,.55)',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 2px 6px rgba(0,0,0,.15)',
        display: 'block',
        backgroundImage: 'linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)',
        ...style,
      }}
    />
  );
}
