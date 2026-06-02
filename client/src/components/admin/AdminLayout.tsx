import { NavLink, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../../styles/admin.css';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/events', label: 'Events' },
  { to: '/admin/menu', label: 'Menu' },
  { to: '/admin/faqs', label: 'FAQs' },
  { to: '/admin/content', label: 'Site Content' },
  { to: '/admin/inquiries', label: 'Inquiries' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth0();

  return (
    <div className="admin-shell min-h-screen bg-slate-100">
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">Terrible Gerald&apos;s</p>
            <h1 className="text-xl font-semibold text-slate-900">Content Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-red-700 hover:underline">
              View site
            </a>
            <span className="text-sm text-slate-600">{user?.email}</span>
            <button
              type="button"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 md:grid-cols-[220px_1fr]">
        <nav className="rounded-lg bg-white p-4 shadow-sm">
          <ul className="space-y-1">
            {adminLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `block rounded px-3 py-2 text-sm ${
                      isActive ? 'bg-red-700 text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <main className="rounded-lg bg-white p-6 shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
