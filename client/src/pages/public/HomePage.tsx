import { useEffect, useState } from 'react';
import TornDivider from '../../components/marketing/TornDivider';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import AboutSection from '../../sections/home/AboutSection';
import CateringSection from '../../sections/home/CateringSection';
import Hero from '../../sections/home/Hero';
import NewsletterSection from '../../sections/home/NewsletterSection';
import PizzaSection from '../../sections/home/PizzaSection';
import ReviewsSection from '../../sections/home/ReviewsSection';
import ScheduleSection from '../../sections/home/ScheduleSection';
import TestimonialsSection from '../../sections/home/TestimonialsSection';
import VenuesSection from '../../sections/home/VenuesSection';
import WallSection from '../../sections/home/WallSection';

export default function HomePage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useScrollReveal([ready]);

  return (
    <div className="brand-site">
      <div id="top">
        <Hero />
      </div>
      <div className="reveal">
        <ScheduleSection />
      </div>
      <TornDivider color="var(--cream)" />
      <div className="reveal">
        <PizzaSection />
      </div>
      <ReviewsSection />
      <div className="reveal">
        <CateringSection />
      </div>
      <TornDivider color="var(--ink)" />
      <TestimonialsSection />
      <div className="reveal">
        <AboutSection />
      </div>
      <div className="reveal">
        <VenuesSection />
      </div>
      <TornDivider color="var(--ink)" />
      <WallSection />
      <div className="reveal">
        <NewsletterSection />
      </div>
    </div>
  );
}
