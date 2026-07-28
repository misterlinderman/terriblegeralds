import { useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../../hooks/useContactModal';

export interface NavLink {
  label: string;
  href?: string;
  action?: 'contact';
}

export interface NavSocial {
  label: string;
  href?: string;
  svg?: string;
}

interface NavBarProps {
  logoSrc?: string;
  links?: NavLink[];
  seasonLabel?: string;
  socials?: NavSocial[];
  style?: CSSProperties;
}

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//');
}

function NavAnchor({
  href,
  children,
  style,
  onNavigate,
}: {
  href: string;
  children: ReactNode;
  style: CSSProperties;
  onNavigate?: () => void;
}) {
  if (isInternalHref(href)) {
    return (
      <Link to={href} style={style} onClick={onNavigate}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} style={style} onClick={onNavigate}>
      {children}
    </a>
  );
}

export default function NavBar({
  logoSrc,
  links = [],
  seasonLabel = 'S3 · VOL.6',
  socials = [],
  style,
}: NavBarProps) {
  const [open, setOpen] = useState(false);
  const { openContact } = useContactModal();

  const linkStyle: CSSProperties = {
    fontWeight: 700,
    fontSize: '.78rem',
    textTransform: 'uppercase',
    letterSpacing: '.06em',
    color: 'var(--ink)',
    textDecoration: 'none',
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 500,
        background: 'var(--bone)',
        borderBottom: '2px solid var(--ink)',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          padding: '14px 24px',
          maxWidth: 1180,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <NavAnchor
          href="/#top"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
            textDecoration: 'none',
            color: 'var(--ink)',
          }}
        >
          {logoSrc && (
            <img
              src={logoSrc}
              alt="Terrible Gerald's Pizza logo"
              style={{ width: 42, height: 42, flex: 'none' }}
            />
          )}
          <span style={{ lineHeight: 0.82 }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: '.95rem',
                letterSpacing: '.06em',
              }}
            >
              TERRIBLE
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                color: 'var(--red)',
              }}
            >
              GERALD&apos;S
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: '.7rem',
                letterSpacing: '.32em',
                color: 'var(--ink-soft)',
              }}
            >
              PIZZA
            </span>
          </span>
        </NavAnchor>

        <nav
          id="gerald-mobile-nav"
          style={{
            display: open ? 'flex' : undefined,
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
          className="gerald-nav-links"
        >
          {links.map((l) =>
            l.action === 'contact' ? (
              <button
                key="contact"
                type="button"
                className="nav-contact-btn"
                style={linkStyle}
                onClick={() => {
                  setOpen(false);
                  openContact('general');
                }}
              >
                {l.label}
              </button>
            ) : l.href ? (
              <NavAnchor
                key={l.href}
                href={l.href}
                style={linkStyle}
                onNavigate={() => setOpen(false)}
              >
                {l.label}
              </NavAnchor>
            ) : null
          )}
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontSize: '.66rem',
              color: 'var(--cream)',
              background: 'var(--red)',
              padding: '3px 9px',
              borderRadius: 20,
              transform: 'rotate(-3deg)',
              display: 'inline-block',
            }}
          >
            {seasonLabel}
          </span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href || '#'}
                aria-label={s.label}
                style={{
                  width: 30,
                  height: 30,
                  border: '2px solid var(--ink)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ink)',
                }}
                {...(s.svg
                  ? { dangerouslySetInnerHTML: { __html: s.svg } }
                  : { children: s.label?.[0] })}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="gerald-mobile-nav"
            onClick={() => setOpen((o) => !o)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
            }}
            className="gerald-burger"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 26,
                  height: 3,
                  background: 'var(--ink)',
                  borderRadius: 2,
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </header>
  );
}
