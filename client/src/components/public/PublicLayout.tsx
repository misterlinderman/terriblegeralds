import { Outlet } from 'react-router-dom';
import { ContactModalProvider } from '../../context/ContactModalContext';
import ContactModal from './ContactModal';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

export default function PublicLayout() {
  return (
    <ContactModalProvider>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <ContactModal />
    </ContactModalProvider>
  );
}
