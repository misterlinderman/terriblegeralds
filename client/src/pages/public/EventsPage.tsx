import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import NewsletterForm from '../../components/marketing/NewsletterForm';
import PlaceholderBox from '../../components/marketing/PlaceholderBox';
import SectionHeader from '../../components/marketing/SectionHeader';
import {
  eventToScheduleRow,
  fetchEvents,
  formatEventTimeRange,
} from '../../services/contentApi';
import type { Event, EventCategory } from '../../types';

const FILTER_CATEGORIES: { key: 'all' | EventCategory; label: string }[] = [
  { key: 'all', label: 'All Stops' },
  { key: 'brewery', label: 'Breweries' },
  { key: 'park', label: 'Parks' },
  { key: 'venue', label: 'Venues' },
  { key: 'event', label: 'Events' },
];

const CATEGORY_LABELS: Record<EventCategory, string> = {
  brewery: 'Brewery',
  park: 'Park',
  venue: 'Venue',
  event: 'Event',
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<'all' | EventCategory>('all');

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        setEvents(sorted);
      })
      .catch((error) => console.error('Failed to load events:', error));
  }, []);

  const now = new Date();

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return events;
    return events.filter((event) => event.category === filter);
  }, [events, filter]);

  return (
    <div className="brand-site">
      <div className="pg-hero">
        <div className="wrap">
          <span className="kicker">where&apos;s the truck?</span>
          <h1>Full Schedule</h1>
          <p>
            Two weeks out, subject to weather, whims, and how Gerald&apos;s feeling. The
            real-time truth always lives on Instagram.
          </p>
        </div>
      </div>

      <section className="pg">
        <div className="wrap">
          <SectionHeader kicker="filter by where you like to eat" title="Upcoming Stops" />
          <div className="filter-row">
            {FILTER_CATEGORIES.map((category) => (
              <button
                key={category.key}
                type="button"
                className={`filter-btn${filter === category.key ? ' active' : ''}`}
                onClick={() => setFilter(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="sched-card2">
            {filteredEvents.length === 0 ? (
              <div className="empty-note">
                No stops in this category right now — check back, or follow @terriblegeralds.
              </div>
            ) : (
              filteredEvents.map((event) => {
                const row = eventToScheduleRow(event);
                const start = new Date(event.startDate);
                const end = event.endDate ? new Date(event.endDate) : start;
                const isNow = now >= start && now <= end;
                const category = event.category || 'brewery';

                return (
                  <div key={event._id} className={`sched-row2${isNow ? ' now' : ''}`}>
                    <div className="day">
                      {row.day}
                      <small>{row.date}</small>
                    </div>
                    <div className="venue">
                      {event.title || event.venue}
                      <small>{event.address || event.venue}</small>
                      {event.description && (
                        <small style={{ display: 'block', marginTop: 4 }}>
                          {event.description}
                        </small>
                      )}
                    </div>
                    <div className="cat">{CATEGORY_LABELS[category]}</div>
                    <div className="time">
                      {formatEventTimeRange(event.startDate, event.endDate).toUpperCase()}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <p className="map-note">
            Addresses go live on Google Maps the morning of each stop. Private bookings show
            up here so you know where we&apos;ve disappeared to — head to{' '}
            <Link to="/catering">Catering</Link> if you want us at your thing too.
            {events.some((e) => e.mapUrl) && (
              <>
                {' '}
                {events
                  .filter((e) => e.mapUrl)
                  .map((e) => (
                    <span key={e._id}>
                      {' '}
                      <a href={e.mapUrl} target="_blank" rel="noreferrer">
                        Map for {e.title || e.venue}
                      </a>
                    </span>
                  ))}
              </>
            )}
          </p>
        </div>
      </section>

      <section className="pg pg-ink-grid">
        <div className="wrap pg-ink-grid-inner">
          <div>
            <span className="pg-ink-kicker">never guess again</span>
            <h2 className="pg-ink-title">Get the Schedule Emailed</h2>
            <p className="pg-ink-copy">
              One email a week. Where we&apos;re parked, when, and what&apos;s new on the menu.
              No spam, just pizza logistics.
            </p>
            <NewsletterForm
              buttonLabel="Notify Me"
              onSubmit={() => alert("You're on the list. We'll be in touch — terribly.")}
            />
          </div>
          <PlaceholderBox
            dark
            label={'MAP — service area\nOmaha metro + surrounding breweries'}
          />
        </div>
      </section>
    </div>
  );
}
