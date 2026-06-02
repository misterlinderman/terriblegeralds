import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function AdminLoginPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-wide text-slate-500">Terrible Gerald&apos;s</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Admin Login</h1>
        <p className="mt-3 text-sm text-slate-600">
          Sign in with your authorized account to manage events, menu items, and site content.
        </p>
        <button
          type="button"
          onClick={() =>
            loginWithRedirect({
              appState: { returnTo: '/admin' },
              authorizationParams: {
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                scope: 'openid profile email',
              },
            })
          }
          className="mt-6 w-full rounded bg-red-700 px-4 py-2.5 text-white"
        >
          Log in with Auth0
        </button>
        <a href="/" className="mt-4 block text-center text-sm text-slate-600 hover:underline">
          Back to website
        </a>
      </div>
    </div>
  );
}
