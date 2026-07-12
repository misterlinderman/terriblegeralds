import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NewsletterForm from '../../components/marketing/NewsletterForm';
import PlaceholderBox from '../../components/marketing/PlaceholderBox';
import SectionHeader from '../../components/marketing/SectionHeader';
import {
  eventToScheduleRow,
  fetchEvents,
  formatEventTimeRange,
} from '../../services/contentApi';
import type { Event } from '../../types';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

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
          <div className="sched-card2">
            {events.length === 0 ? (
              <div className="empty-note">
                No stops right now — check back, or follow @terriblegeralds.
              </div>
            ) : (
              events.map((event) => {
                const row = eventToScheduleRow(event);
                const start = new Date(event.startDate);
                const end = event.endDate ? new Date(event.endDate) : start;
                const isNow = now >= start && now <= end;

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

      <section className="pg" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
        <div
          className="wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            alignItems: 'center',
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
              never guess again
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                textTransform: 'uppercase',
                fontSize: 'clamp(1.8rem,3.6vw,2.6rem)',
                margin: '0 0 14px',
              }}
            >
              Get the Schedule Emailed
            </h2>
            <p style={{ maxWidth: '38ch', opacity: 0.9, marginBottom: 20 }}>
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
