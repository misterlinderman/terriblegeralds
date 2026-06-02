import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchFaqs,
  fetchMenuItems,
  fetchNextEvent,
  fetchSiteContent,
  formatEventDate,
  formatEventTimeRange,
} from '../../services/contentApi';
import ContactLink from '../../components/public/ContactLink';
import type { Event, Faq, MenuItem } from '../../types';

export default function HomePage() {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([fetchNextEvent(), fetchMenuItems(), fetchFaqs(), fetchSiteContent()])
      .then(([event, items, faqList, siteContent]) => {
        setNextEvent(event);
        setMenuItems(items);
        setFaqs(faqList);
        setContent(siteContent);
      })
      .catch((error) => {
        console.error('Failed to load public content from API:', error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="hero-wrapper">
          <div className="flex-columns">
            <div className="gerald-and-pizza">
              <img src="/images/gerald-biting-pizza.gif" alt="Nom!" />
            </div>
            <div className="event-info-column">
              <h2>Next Event</h2>
              {nextEvent ? (
                <div className="event-item">
                  <h4>{nextEvent.title}</h4>
                  <p className="event-item-description">
                    {formatEventDate(nextEvent.startDate)}
                    <br />
                    {formatEventTimeRange(nextEvent.startDate, nextEvent.endDate)}
                    <br />
                    {nextEvent.address || nextEvent.venue}
                  </p>
                  <div className="event-item-buttons d-flex">
                    {nextEvent.mapUrl && (
                      <a
                        href={nextEvent.mapUrl}
                        className="btn btn-secondary"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Location Map
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <p className="no-events-message">There are no scheduled events at this time!</p>
              )}
              <Link to="/events" className="btn btn-primary no-top-margin">
                Upcoming Events
              </Link>
            </div>
          </div>
          <div className="hero-footer">
            <h2>{content['hero.tagline'] || "Terrible Gerald's Pizza / Unorthodox Neapolitan"}</h2>
          </div>
        </div>
      </div>

      <section id="menu">
        <div className="container d-grid">
          <div id="menu-left-column">
            <h3>Menu</h3>
            <h4 className="red">{content['menu.subtitle']}</h4>
            <div className="pizza-grid d-grid">
              {menuItems.map((item) => (
                <div key={item._id} className="menu-item-card d-grid">
                  <div className="img-bg-wrap">
                    <img src={item.imagePath} alt={item.name} />
                  </div>
                  <h4 className="menu-item-title">{item.name}</h4>
                  <p className="menu-item-description">{item.description}</p>
                </div>
              ))}
            </div>
            {content['menu.footnote'] && <p>{content['menu.footnote']}</p>}
          </div>
          <div className="trailer">
            <h4>
              Book Gerald for all your upcoming private events!...{' '}
              <span>We&apos;ll like...sell you pizzas and stuff!</span>
            </h4>
            <ContactLink className="btn btn-secondary">Book Us Now</ContactLink>
          </div>
        </div>
      </section>

      <section id="private-events">
        <div className="container d-grid private-events-grid">
          <div>
            <h3 className="margin-top-private-events">Private Events</h3>
            <h4 className="margin-bottom">Let&apos;s Get Into It!</h4>
            <ol className="list-split">
              <li>
                <strong>Volume Driven</strong> (We have accommodated parties of 500 people.)
              </li>
              <li>
                <strong>Formal or Casual</strong> (We have all kinds of clothes. Don&apos;t sweat
                it.)
              </li>
              <li>
                Excellent for parties, the beach, work parties, golf parties, graduation parties,
                party parties and party party parties for dogs and animals all around.
              </li>
              <li>Each pie takes 70 seconds to cook (we&apos;ve timed it)</li>
              <li>We offer a full menu and make pies fresh from scratch, every time.</li>
              <li>
                We match the flow of the guests. Awkward lunch hour? No big, we&apos;ll make sure we
                keep it all fresh for when the swarm arrives.
              </li>
            </ol>
          </div>
          <div>
            <img className="moto-gerald" src="/images/moto-gerald.webp" alt="VROOOOOM!" />
          </div>
        </div>
      </section>

      <section id="home-faqs">
        <div className="container d-flex">
          <div>
            <h3>Frequently Asked Questions</h3>
            <h4>These are officially off-limits, and never to be heard again!</h4>
          </div>
        </div>
        <div className="container faq-list">
          {faqs.map((faq) => (
            <div key={faq._id}>
              <p>
                <strong>{faq.question}</strong>
                <br />
                {faq.answer}
              </p>
              <hr />
            </div>
          ))}
        </div>
      </section>

      <section id="about">
        <div className="container about-gerald-wrap d-flex">
          <div className="about-content-column">
            <h3>About</h3>
            {content['about.paragraph1'] && <p>{content['about.paragraph1']}</p>}
            {content['about.paragraph2'] && <p>{content['about.paragraph2']}</p>}
          </div>
          <div className="about-pic-grid d-grid">
            <img src="/images/trailer-people.webp" alt="The Wait." />
            <img className="big-boy-gerald" src="/images/tallboy-gerald.webp" alt="Big Boy Gerald!" />
          </div>
        </div>
      </section>
    </>
  );
}
