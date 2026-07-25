/**
 * Dev-only Phase 0 verification — tokens, Typekit fonts, and icon assets.
 * Route: /dev/phase-0 (registered only when import.meta.env.DEV).
 * Remove in Phase 5 cleanup if no longer needed.
 */
const ICONS = [
  'logo-mark.svg',
  'play.svg',
  'venue-brewery.svg',
  'venue-building.svg',
  'venue-event.svg',
  'venue-park.svg',
] as const;

const SWATCHES = [
  { name: 'bone', var: '--bone' },
  { name: 'ink', var: '--ink' },
  { name: 'red', var: '--red' },
  { name: 'gold', var: '--gold' },
  { name: 'teal', var: '--teal' },
] as const;

export default function Phase0VerifyPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bone)',
        color: 'var(--ink)',
        fontFamily: 'var(--font-body)',
        padding: 'var(--gutter)',
      }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--font-accent)',
            fontStyle: 'italic',
            fontSize: 'var(--text-kicker)',
            marginBottom: '0.5rem',
          }}
        >
          phase 0 verification (dev only)
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-h2)',
            letterSpacing: 'var(--display-tracking)',
            textTransform: 'uppercase',
            lineHeight: 'var(--line-height-display)',
            marginBottom: 'var(--section-head-gap)',
          }}
        >
          Tokens · Typekit · Icons
        </h1>

        <section style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h4)',
              letterSpacing: 'var(--display-tracking)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Color tokens
          </h2>
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {SWATCHES.map(({ name, var: cssVar }) => (
              <li key={name}>
                <div
                  style={{
                    width: '4rem',
                    height: '4rem',
                    background: `var(${cssVar})`,
                    border: 'var(--border)',
                    boxShadow: 'var(--offset-shadow) var(--ink)',
                  }}
                  aria-hidden
                />
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  {cssVar}
                </code>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h4)',
              letterSpacing: 'var(--display-tracking)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Typekit fonts
          </h2>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: 'var(--display-tracking)', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>
            Tomarik Display — questionable decisions.
          </p>
          <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: '1.25rem', margin: '0 0 0.75rem' }}>
            New Spirit editorial — excellent pizza.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'var(--text-kicker)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 0.75rem',
            }}
          >
            New Spirit accent — terrible names. you&apos;ll order anyway.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', margin: '0 0 0.75rem' }}>
            Hanken Grotesk body — unorthodox Neapolitan on wheels in Omaha.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', margin: 0 }}>
            Space Mono — --red: var(--red);
          </p>
        </section>

        <section>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h4)',
              letterSpacing: 'var(--display-tracking)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Icons
          </h2>
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {ICONS.map((file) => (
              <li key={file} style={{ textAlign: 'center' }}>
                <img
                  src={`/icons/${file}`}
                  alt=""
                  width={48}
                  height={48}
                  style={{ display: 'block', marginBottom: '0.25rem' }}
                />
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{file}</code>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
