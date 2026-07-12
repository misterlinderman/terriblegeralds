import { useEffect, useState } from 'react';
import QuoteCard from '../../components/marketing/QuoteCard';
import { fetchReviews } from '../../services/contentApi';
import type { ReviewQuote } from '../../types';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewQuote[]>([]);

  useEffect(() => {
    fetchReviews()
      .then(setReviews)
      .catch((error) => console.error('Failed to load reviews:', error));
  }, []);

  return (
    <section style={{ padding: '74px 0', background: 'var(--ink)', color: 'var(--cream)' }}>
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '.9fr 1.1fr',
          gap: 36,
          alignItems: 'center',
        }}
        className="gerald-reviews"
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '5.5rem',
              color: 'var(--gold)',
              lineHeight: 0.85,
            }}
          >
            4.9
          </div>
          <div style={{ color: 'var(--gold)', fontSize: '1.5rem', letterSpacing: '.1em' }}>
            ★★★★★
          </div>
          <div
            style={{
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.08em',
              fontSize: '.8rem',
              marginTop: 8,
              color: 'var(--gold)',
            }}
          >
            Best Pizza in Omaha?
          </div>
          <div
            style={{
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.08em',
              fontSize: '.8rem',
              marginTop: 8,
              opacity: 0.7,
            }}
          >
            Based on 500+ Google reviews
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: 14,
          }}
          className="gerald-quotes"
        >
          {reviews.map((r, i) => (
            <QuoteCard key={i} tone={r.tone} quote={r.quote} source={r.source} />
          ))}
        </div>
      </div>
    </section>
  );
}
