import { useEffect, useState } from 'react';
import Button from '../../components/marketing/Button';
import PlaceholderBox from '../../components/marketing/PlaceholderBox';
import ScheduleCard, { type ScheduleRow } from '../../components/marketing/ScheduleCard';
import SectionHeader from '../../components/marketing/SectionHeader';
import Stamp from '../../components/marketing/Stamp';
import {
  eventToScheduleRow,
  fetchEvents,
  formatScheduleHeading,
} from '../../services/contentApi';
import type { Event } from '../../types';

export default function ScheduleSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [rows, setRows] = useState<ScheduleRow[]>([]);
  const [heading, setHeading] = useState('📍 Upcoming stops');

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        const upcoming = [...data].sort(
          (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        setEvents(upcoming);
        setHeading(formatScheduleHeading(upcoming));
        const now = new Date();
        setRows(
          upcoming.map((event) => {
            const start = new Date(event.startDate);
            const end = event.endDate ? new Date(event.endDate) : start;
            const isNow = now >= start && now <= end;
            return eventToScheduleRow(event, isNow);
          })
        );
      })
      .catch((error) => console.error('Failed to load events:', error));
  }, []);

  return (
    <section style={{ padding: '74px 0' }} id="schedule">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeader
          kicker="where's the truck?"
          title="This Week's Stops"
          action={
            <Button variant="ink" size="sm" href="/events">
              Full Schedule
            </Button>
          }
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr .95fr',
            gap: 36,
          }}
          className="gerald-sched-grid"
        >
          <ScheduleCard heading={heading} rows={rows.length ? rows : events.map((e) => eventToScheduleRow(e))} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  letterSpacing: 'var(--display-tracking)',
                  textTransform: 'uppercase',
                }}
              >
                @terriblegeralds
                <small
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    color: 'var(--ink-soft)',
                    fontSize: '.78rem',
                    textTransform: 'none',
                  }}
                >
                  the schedule lives on Instagram — pulled in live
                </small>
              </div>
              <Stamp>follow</Stamp>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <PlaceholderBox key={i} label="IG post" aspect="1" />
              ))}
            </div>
            <p style={{ fontSize: '.82rem', color: 'var(--ink-soft)', margin: 0 }}>
              Auto-syncs your latest Instagram posts so the weekly drop updates itself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
