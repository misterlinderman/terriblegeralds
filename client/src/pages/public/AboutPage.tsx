import { useEffect, useState } from 'react';
import Button from '../../components/marketing/Button';
import PlaceholderBox from '../../components/marketing/PlaceholderBox';
import QuoteCard from '../../components/marketing/QuoteCard';
import SectionHeader from '../../components/marketing/SectionHeader';
import {
  fetchAboutChapters,
  fetchAboutCrew,
  fetchAboutValues,
} from '../../services/contentApi';
import type { AboutChapter, AboutCrewMember, AboutValue } from '../../types';

export default function AboutPage() {
  const [chapters, setChapters] = useState<AboutChapter[]>([]);
  const [values, setValues] = useState<AboutValue[]>([]);
  const [crew, setCrew] = useState<AboutCrewMember[]>([]);

  useEffect(() => {
    Promise.all([fetchAboutChapters(), fetchAboutValues(), fetchAboutCrew()])
      .then(([chapterData, valueData, crewData]) => {
        setChapters(chapterData);
        setValues(valueData);
        setCrew(crewData);
      })
      .catch((error) => console.error('Failed to load about content:', error));
  }, []);

  return (
    <div className="brand-site">
      <div className="pg-hero">
        <div className="wrap">
          <span className="kicker">how we got terrible</span>
          <h1>The Story of Gerald</h1>
          <p>
            A secondhand oven, a group chat, and a mascot nobody planned for. Here&apos;s the
            whole saga, chapter by chapter.
          </p>
        </div>
      </div>

      <section className="pg">
        <div className="wrap">
          <SectionHeader kicker="est. 2018 · omaha, ne" title="The Saga" />
          <div className="saga">
            {chapters.map((chapter) => (
              <div className="chapter" key={chapter._id}>
                <div className="yr">{chapter.year}</div>
                <div>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pg" style={{ background: 'var(--cream)' }}>
        <div className="wrap">
          <SectionHeader kicker="the rules we actually follow" title="What We Believe" />
          <div className="values">
            {values.map((value, i) => (
              <div className="value" key={i}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pg">
        <div className="wrap">
          <SectionHeader
            kicker="the people (and one mascot) behind it"
            title="Meet the Crew"
          />
          <div className="crew-grid">
            {crew.map((member, i) => (
              <div className="crew" key={i}>
                <PlaceholderBox label="crew photo" aspect="1" style={{ borderRadius: 8 }} />
                <div className="nm">{member.name}</div>
                <div className="role">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pg" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <QuoteCard
            tone="ink"
            quote={'"Terrible name. Incredible pizza."'}
            source="everybody, eventually"
            style={{
              maxWidth: 480,
              margin: '0 auto',
              textAlign: 'left',
              border: '2px solid var(--gold)',
            }}
          />
          <div
            style={{
              marginTop: 30,
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button variant="gold" href="/events">
              Find Us This Week →
            </Button>
            <Button variant="ghostInverse" href="/catering">
              Book Catering
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
