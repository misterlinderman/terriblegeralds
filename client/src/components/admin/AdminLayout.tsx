import { NavLink, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../Loading';
import { useAdminApiReady } from '../../hooks/useAdminApiReady';
import { useSiteTheme } from '../../hooks/useSiteTheme';
import '../../styles/admin.css';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/themes', label: 'Theme', end: false },
  { to: '/admin/events', label: 'Events' },
  { to: '/admin/menu', label: 'Menu' },
  { to: '/admin/catering-tiers', label: 'Catering Tiers' },
  { to: '/admin/venues', label: 'Venues' },
  { to: '/admin/press-features', label: 'Press & TikTok' },
  { to: '/admin/about-chapters', label: 'About Chapters' },
  { to: '/admin/wall-items', label: 'Wall Items' },
  { to: '/admin/faqs', label: 'FAQs' },
  { to: '/admin/content', label: 'Site Content' },
  { to: '/admin/inquiries', label: 'Inquiries' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth0();
  const { ready, error, email } = useAdminApiReady();
  const { theme } = useSiteTheme();

  return (
    <div className="admin-shell min-h-screen">
      <header className="border-b-2 px-6 py-4" style={{ borderColor: 'var(--ink)', background: 'var(--cream)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="admin-kicker">Terrible Gerald&apos;s</p>
            <h1 className="admin-heading text-2xl">Content Admin</h1>
            <p className="text-xs" style={{ color: 'var(--ink-soft)' }}>
              Active theme: {theme.name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm font-medium hover:underline" style={{ color: 'var(--red)' }}>
              View site
            </a>
            <span className="text-sm" style={{ color: 'var(--ink-soft)' }}>
              {user?.email}
            </span>
            <button type="button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="admin-btn-secondary">
              Log out
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 md:grid-cols-[220px_1fr]">
        <nav className="admin-panel p-4">
          <ul className="space-y-1">
            {adminLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    isActive ? 'admin-nav-link admin-nav-link-active' : 'admin-nav-link'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <main className="admin-panel p-6">
          {error ? (
            <div className="admin-error">
              <p className="font-medium">Cannot connect to the admin API</p>
              <p className="mt-2">{error}</p>
              {email && (
                <p className="mt-2">
                  Signed in as <strong>{email}</strong>. If you see a 403 error on admin pages,
                  add this address to <code className="rounded px-1" style={{ background: 'var(--bone-2)' }}>ADMIN_EMAILS</code>{' '}
                  in Railway and redeploy.
                </p>
              )}
            </div>
          ) : ready ? (
            <Outlet />
          ) : (
            <Loading />
          )}
        </main>
      </div>
    </div>
  );
}
