import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../../styles/admin.css';

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
    <div className="admin-login-page">
      <div className="admin-login-card admin-panel">
        <p className="admin-kicker">Terrible Gerald&apos;s</p>
        <h1 className="admin-page-title">Admin Login</h1>
        <p className="admin-muted mt-3 text-sm">
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
          className="admin-btn-primary mt-6 w-full"
        >
          Log in with Auth0
        </button>
        <a href="/" className="admin-link mt-4 block text-center text-sm">
          Back to website
        </a>
      </div>
    </div>
  );
}
