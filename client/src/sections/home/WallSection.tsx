import { useEffect, useState } from 'react';
import PlaceholderBox from '../../components/marketing/PlaceholderBox';
import { fetchWallItems } from '../../services/contentApi';
import type { WallItem } from '../../types';

function WallTile({ item }: { item: WallItem }) {
  const tile = item.imageUrl ? (
    <div
      style={{
        position: 'relative',
        aspectRatio: '1',
        borderRadius: 6,
        overflow: 'hidden',
        border: '2px dashed rgba(233,220,196,.35)',
      }}
    >
      <img
        src={item.imageUrl}
        alt={item.caption}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  ) : (
    <PlaceholderBox dark label={item.caption} aspect="1" style={{ fontSize: '.6rem' }} />
  );

  if (item.linkUrl) {
    return (
      <a
        href={item.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {tile}
      </a>
    );
  }

  return tile;
}

export default function WallSection() {
  const [items, setItems] = useState<WallItem[]>([]);

  useEffect(() => {
    fetchWallItems()
      .then(setItems)
      .catch((error) => console.error('Failed to load wall items:', error));
  }, []);

  return (
    <section
      style={{ padding: '74px 0', background: 'var(--ink)', color: 'var(--cream)' }}
      id="wall"
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 20,
            marginBottom: 34,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontStyle: 'italic',
                color: 'var(--gold)',
                fontSize: '.95rem',
                display: 'block',
                marginBottom: 4,
              }}
            >
              the people demanded it
            </span>
            <h2 className="gerald-display-h2">The Wall of Gerald</h2>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8,1fr)',
            gap: 10,
          }}
          className="gerald-wall"
        >
          {items.map((item) => (
            <WallTile key={item._id} item={item} />
          ))}
        </div>
        <p
          style={{
            textAlign: 'center',
            marginTop: 18,
            color: '#caa45d',
            fontFamily: 'var(--font-accent)',
            fontStyle: 'italic',
          }}
        >
          a home for your boatloads of unused Geralds.
        </p>
      </div>
    </section>
  );
}
