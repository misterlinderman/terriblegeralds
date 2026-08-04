import { useEffect, useState } from 'react';
import { fetchVenues } from '../../services/contentApi';
import type { Venue, VenueCategoryIcon } from '../../types';

const venueIconPaths: Record<VenueCategoryIcon, string> = {
  brewery: '/icons/venue-brewery.svg',
  building: '/icons/venue-building.svg',
  park: '/icons/venue-park.svg',
  event: '/icons/venue-event.svg',
};

export default function VenuesSection() {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    fetchVenues()
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
          {venues.map((venue) => (
            <div
              key={venue._id}
              style={{
                background: 'var(--bone-2)',
                border: '2px solid var(--ink)',
                borderRadius: 8,
                padding: '24px 18px',
                textAlign: 'center',
              }}
            >
              <img
                src={venueIconPaths[venue.categoryIcon]}
                alt=""
                style={{
                  width: 46,
                  height: 46,
                  margin: '0 auto 12px',
                  color: 'var(--ink)',
                }}
              />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>
                {venue.name}
              </div>
              <div
                style={{
                  fontSize: '.78rem',
                  color: 'var(--ink-soft)',
                  marginTop: 4,
                }}
              >
                {venue.blurb}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
