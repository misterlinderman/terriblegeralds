import { Link } from 'react-router-dom';
import { useContactModal } from '../../context/ContactModalContext';

export default function SiteFooter() {
  const { openContact } = useContactModal();

  return (
    <footer className="site-footer">
      <nav className="footer-nav d-flex">
        <ul className="footer-nav-list d-flex">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="/#menu">Menu</a>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <a href="/#about">About</a>
          </li>
          <li>
            <a href="https://terrible-geralds-pizza.printify.me/" target="_blank" rel="noreferrer">
              Shop
            </a>
          </li>
          <li>
            <button type="button" className="link-button footer-link" onClick={openContact}>
              Contact
            </button>
          </li>
        </ul>
      </nav>
      <ul className="social-list">
        <li>
          <a href="https://www.facebook.com/terriblegeralds/" target="_blank" rel="noreferrer">
            Facebook
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/@terriblegeralds" target="_blank" rel="noreferrer">
            TikTok
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/terriblegeralds/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </li>
      </ul>
      <p>
        All the things &copy; Terrible Gerald&apos;s {new Date().getFullYear()} / Original Art by{' '}
        <a
          href="https://www.facebook.com/Satisfactionnotguaranteed"
          target="_blank"
          rel="noreferrer"
        >
          Satisfaction Not Guaranteed
        </a>
      </p>
    </footer>
  );
}
