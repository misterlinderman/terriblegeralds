import { Outlet, useLocation } from 'react-router-dom';
import { ContactModalProvider } from '../../context/ContactModalContext';
import MarketingSiteFooter from '../marketing/SiteFooter';
import MarketingSiteHeader from '../marketing/SiteHeader';
import ContactModal from './ContactModal';

const ACTIVE_BY_PATH: Record<string, string> = {
  '/': '/',
  '/menu': '/menu',
  '/about': '/about',
  '/catering': '/catering',
  '/events': '/events',
};

const SHOW_NEXT_BAR: Record<string, boolean> = {
  '/': true,
  '/events': true,
  '/menu': false,
  '/about': false,
  '/catering': false,
};

export default function PublicLayout() {
  const location = useLocation();

  return (
    <ContactModalProvider>
      <MarketingSiteHeader
        active={ACTIVE_BY_PATH[location.pathname] || ''}
        showNextBar={SHOW_NEXT_BAR[location.pathname] ?? false}
      />
      <main>
        <Outlet />
      </main>
      <MarketingSiteFooter />
      <ContactModal />
    </ContactModalProvider>
  );
}
