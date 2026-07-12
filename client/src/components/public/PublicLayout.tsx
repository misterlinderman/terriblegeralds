import { Outlet, useLocation } from 'react-router-dom';
import { ContactModalProvider } from '../../context/ContactModalContext';
import MarketingSiteFooter from '../marketing/SiteFooter';
import MarketingSiteHeader from '../marketing/SiteHeader';
import ContactModal from './ContactModal';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

const V2_ROUTES = new Set(['/', '/menu', '/about', '/catering', '/events']);

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
  const isV2 = V2_ROUTES.has(location.pathname);

  return (
    <ContactModalProvider>
      {isV2 ? (
        <MarketingSiteHeader
          active={ACTIVE_BY_PATH[location.pathname] || ''}
          showNextBar={SHOW_NEXT_BAR[location.pathname] ?? false}
        />
      ) : (
        <SiteHeader />
      )}
      <main>
        <Outlet />
      </main>
      {isV2 ? <MarketingSiteFooter /> : <SiteFooter />}
      <ContactModal />
    </ContactModalProvider>
  );
}
