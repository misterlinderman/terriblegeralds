import { Link } from 'react-router-dom';
import NewsletterForm from '../../components/marketing/NewsletterForm';
import Stamp from '../../components/marketing/Stamp';

export default function NewsletterSection() {
  return (
    <section style={{ padding: '74px 0' }} id="contact">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            background: 'var(--red)',
            color: 'var(--cream)',
            borderRadius: 12,
            padding: 46,
            display: 'grid',
            gridTemplateColumns: '1.1fr .9fr',
            gap: 34,
            alignItems: 'center',
            boxShadow: 'var(--shadow-soft)',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="gerald-news"
        >
          <Stamp
            style={{
              position: 'absolute',
              top: 18,
              right: 22,
              color: 'var(--cream)',
              borderColor: 'var(--cream)',
            }}
          >
            📬 do it
          </Stamp>
          <div>
            <h2 className="gerald-display-h2-sm">Get the Chaos Delivered</h2>
            <p style={{ marginTop: 10, maxWidth: '36ch', opacity: 0.92 }}>
              Join the mailing list for stops, specials, and general nonsense. We promise to
              be terrible about it.
            </p>
          </div>
          <div>
            <NewsletterForm
              onSubmit={() => alert("You're on the list. Thanks. You're terrible.")}
            />
            <p style={{ fontSize: '.78rem', opacity: 0.8, marginTop: 10 }}>
              …or just{' '}
              <Link
                to="/catering"
                style={{ color: 'var(--cream)', textDecoration: 'underline' }}
              >
                book catering
              </Link>{' '}
              and skip the small talk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
