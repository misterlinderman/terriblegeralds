import { useEffect, useState } from 'react';
import {
  fetchEvents,
  fetchSiteContent,
  formatEventDate,
  formatEventTime,
} from '../../services/contentApi';
import ContactLink from '../../components/public/ContactLink';
import type { Event } from '../../types';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [intro, setIntro] = useState('Check back for tasty events in your area!');

  useEffect(() => {
    Promise.all([fetchEvents(), fetchSiteContent()])
      .then(([eventList, content]) => {
        setEvents(eventList);
        if (content['events.intro']) setIntro(content['events.intro']);
      })
      .catch(() => undefined);
  }, []);

  return (
    <>
      <div className="container">
        <h1>Upcoming Events</h1>
        <p className="tasty-events">{intro}</p>
      </div>
      <div className="container event-content d-flex">
        <div className="event-content-main">
          {events.length === 0 ? (
            <p className="no-events-message">There are no scheduled events at this time!</p>
          ) : (
            events.map((event) => (
              <div key={event._id} className="event-item">
                <h4>{event.title}</h4>
                <p className="event-item-description">
                  {formatEventDate(event.startDate)}
                  <br />
                  {formatEventTime(event.startDate)}
                  <br />
                  {event.venue}
                  {event.description && (
                    <>
                      <br />
                      {event.description}
                    </>
                  )}
                </p>
                <div className="event-item-buttons d-flex">
                  {event.mapUrl && (
                    <a href={event.mapUrl} className="btn btn-secondary" target="_blank" rel="noreferrer">
                      Map
                    </a>
                  )}
                  {event.ticketUrl && (
                    <a href={event.ticketUrl} className="btn btn-primary" target="_blank" rel="noreferrer">
                      Tickets
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <aside>
          <div className="sidebar-wrapper">
            <img className="guido-gerald" src="/images/guido-gerald.webp" alt="VROOM VROOM!" />
            <h4 className="top-line">
              Your Uncle Sal wants Gerald&apos;s for his PRIVATE EVENT and he&apos;s trying to pay
              for it!
            </h4>
            <ContactLink className="btn btn-secondary">Book Us Now Before He Does!</ContactLink>
          </div>
        </aside>
      </div>
    </>
  );
}
