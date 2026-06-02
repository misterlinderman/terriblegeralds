import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ContactLink from './ContactLink';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/#menu', label: 'Menu', hash: true },
  { to: '/events', label: 'Events' },
  { to: '/#about', label: 'About', hash: true },
  { href: 'https://terrible-geralds-pizza.printify.me/', label: 'Shop', external: true },
];

export default function SiteHeader() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container d-flex">
        <div className="d-flex main-logo-column">
          <Link to="/">
            <img
              width={300}
              height={136}
              className="main-logo"
              src="/images/tg-logo.webp"
              alt="Terrible Gerald's Pizza"
            />
          </Link>
          <button
            type="button"
            className={`hamburger${navOpen ? ' active' : ''}`}
            aria-label="Toggle navigation"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
        <nav className={`main-nav d-flex${navOpen ? ' active' : ''}`}>
          <ul className="main-nav-list d-flex">
            {navItems.map((item) =>
              item.external ? (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ) : item.hash ? (
                <li key={item.label}>
                  <a href={item.to}>{item.label}</a>
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink to={item.to!} end={item.end}>
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
            <li>
              <ContactLink>Contact</ContactLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
