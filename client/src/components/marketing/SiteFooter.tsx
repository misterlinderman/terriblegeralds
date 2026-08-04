import { Link } from 'react-router-dom';
import { useContactModal } from '../../hooks/useContactModal';
import { IG_SVG, TT_SVG } from './siteChrome';

const FOOT_COLS = [
  {
    h: 'The Goods',
    links: [
      ['Our Pizzas', '/menu'],
      ["This Week's Stops", '/events'],
      ['Catering & Events', '/catering'],
      ['Get in Touch', 'contact'],
    ],
  },
  {
    h: 'The Lore',
    links: [
      ['The Story of Gerald', '/about'],
      ['Testimonials', '/#testimonials'],
      ['The Wall of Gerald', '/#wall'],
      ['Back Home', '/'],
    ],
  },
];

export default function SiteFooter() {
  const { openContact } = useContactModal();

  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '54px 0 30px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr',
            gap: 34,
            marginBottom: 36,
          }}
          className="gerald-foot-grid"
        >
          <div>
            <div style={{ lineHeight: 0.82 }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  letterSpacing: '.06em',
                }}
              >
                TERRIBLE
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  color: 'var(--red)',
                }}
              >
                GERALD&apos;S
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: '.72rem',
                  letterSpacing: '.32em',
                  opacity: 0.7,
                }}
              >
                PIZZA · OMAHA, NE
              </span>
            </div>
            <p
              style={{
                marginTop: 14,
                opacity: 0.8,
                maxWidth: '34ch',
                fontSize: '.9rem',
              }}
            >
              Unorthodox Neapolitan pizza on wheels. Questionable decisions, excellent pizza.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              {[IG_SVG, TT_SVG].map((svg, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    border: '2px solid var(--cream)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--cream)',
                  }}
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              ))}
            </div>
          </div>
          {FOOT_COLS.map((c, i) => (
            <div key={i}>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '.05em',
                  marginBottom: 14,
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                {c.h}
              </h4>
              {c.links.map(([l, href], j) =>
                href === 'contact' ? (
                  <button
                    key={j}
                    type="button"
                    onClick={() => openContact('general')}
                    style={{
                      display: 'block',
                      padding: '5px 0',
                      fontSize: '.9rem',
                      opacity: 0.85,
                      color: 'var(--cream)',
                      textDecoration: 'none',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    {l}
                  </button>
                ) : (
                  <Link
                    key={j}
                    to={href}
                    style={{
                      display: 'block',
                      padding: '5px 0',
                      fontSize: '.9rem',
                      opacity: 0.85,
                      color: 'var(--cream)',
                      textDecoration: 'none',
                    }}
                  >
                    {l}
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: '1px solid rgba(251,245,232,.18)',
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 14,
            flexWrap: 'wrap',
            fontSize: '.78rem',
            opacity: 0.65,
          }}
        >
          <span>© 2026 Terrible Gerald&apos;s Pizza · Omaha, NE</span>
          <span>Season 3 · Vol. 6 — site 2.0</span>
        </div>
      </div>
    </footer>
  );
}
