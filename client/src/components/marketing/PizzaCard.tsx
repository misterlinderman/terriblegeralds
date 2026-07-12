import type { CSSProperties } from 'react';
import PlaceholderBox from './PlaceholderBox';

interface PizzaCardProps {
  name?: string;
  ingredients?: string;
  image?: string;
  style?: CSSProperties;
}

export default function PizzaCard({
  name = 'The Gerald',
  ingredients = 'Red sauce, mozz, pepperoni, hot honey, parm, basil',
  image,
  style,
}: PizzaCardProps) {
  return (
    <div
      style={{
        background: 'var(--cream)',
        border: '2px solid var(--ink)',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: 'var(--card-shadow)',
        transition: '.2s',
        ...style,
      }}
    >
      <div style={{ aspectRatio: '1' }}>
        {image ? (
          <img
            src={image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <PlaceholderBox
            label={`PHOTO — ${name}`}
            style={{ height: '100%', borderRadius: 0, border: 'none' }}
          />
        )}
      </div>
      <div style={{ padding: '14px 16px 18px' }}>
        <span
          style={{
            background: 'var(--red)',
            color: 'var(--cream)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '.03em',
            display: 'inline-block',
            padding: '5px 11px',
            margin: '-30px 0 10px',
            position: 'relative',
            transform: 'rotate(-1.5deg)',
          }}
        >
          {name}
        </span>
        <p
          style={{
            fontSize: '.82rem',
            color: 'var(--ink-soft)',
            textTransform: 'uppercase',
            letterSpacing: '.02em',
            fontWeight: 600,
            lineHeight: 1.45,
            margin: 0,
          }}
        >
          {ingredients}
        </p>
      </div>
    </div>
  );
}
