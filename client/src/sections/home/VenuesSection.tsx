import { useEffect, useState } from 'react';
import { fetchVenueCategories } from '../../services/contentApi';
import type { VenueCategory } from '../../types';

const venueIconPaths: Record<VenueCategory['icon'], string> = {
  brewery: '/icons/venue-brewery.svg',
  building: '/icons/venue-building.svg',
  park: '/icons/venue-park.svg',
  event: '/icons/venue-event.svg',
};

export default function VenuesSection() {
  const [venues, setVenues] = useState<VenueCategory[]>([]);

  useEffect(() => {
    fetchVenueCategories()
      .then(setVenues)
      .catch((error) => console.error('Failed to load venues:', error));
  }, []);

  return (
    <section style={{ padding: '74px 0' }} id="venues">
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
                color: 'var(--red)',
                fontSize: '.95rem',
                display: 'block',
                marginBottom: 4,
              }}
            >
              where to find good people & good beer
            </span>
            <h2 className="gerald-display-h2">Gerald&apos;s Favorite Places</h2>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 16,
          }}
          className="gerald-ven-grid"
        >
          {venues.map((v, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bone-2)',
                border: '2px solid var(--ink)',
                borderRadius: 8,
                padding: '24px 18px',
                textAlign: 'center',
              }}
            >
              <img
                src={venueIconPaths[v.icon]}
                alt=""
                style={{
                  width: 46,
                  height: 46,
                  margin: '0 auto 12px',
                  color: 'var(--ink)',
                }}
              />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>
                {v.title}
              </div>
              <div
                style={{
                  fontSize: '.78rem',
                  color: 'var(--ink-soft)',
                  marginTop: 4,
                }}
              >
                {v.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
