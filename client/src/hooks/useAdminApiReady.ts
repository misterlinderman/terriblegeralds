import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import api, { setAuthToken } from '../services/api';

const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

interface AdminMeResponse {
  authorized: boolean;
  email: string | null;
  emailInToken: boolean;
  isListedAdmin: boolean;
  hasPermission: boolean;
}

export function useAdminApiReady() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const setup = async () => {
      if (!isAuthenticated) {
        setReady(false);
        setError('');
        setAuthToken(null);
        return;
      }

      setReady(false);
      setError('');

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: { audience, scope: 'openid profile email' },
        });
        setAuthToken(token);

        const { data } = await api.get<AdminMeResponse>('/admin/me');

        if (cancelled) return;

        if (!data.authorized) {
          const signedInEmail = user?.email || data.email;
          if (!data.emailInToken) {
            setError(
              'Your API token does not include an email address. In Auth0, add a Post-Login Action to put email on the access token, or assign the admin:content permission to your user.'
            );
          } else if (signedInEmail) {
            setError(
              `Admin access denied for ${signedInEmail}. Add this email to ADMIN_EMAILS in Railway (comma-separated), redeploy the API, then log out and back in.`
            );
          } else {
            setError('Admin access denied. Check ADMIN_EMAILS on Railway or Auth0 permissions.');
          }
          return;
        }

        setReady(true);
      } catch {
        setAuthToken(null);
        if (!cancelled) {
          setError(
            'Could not obtain an API access token. Log out and sign in again from the admin login page.'
          );
        }
      }
    };

    setup();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, getAccessTokenSilently, user?.email, user?.sub]);

  return { ready, error, email: user?.email };
}

export function getAdminRequestError(error: unknown, email?: string): string {
  const status = (error as { response?: { status?: number; data?: { message?: string } } })
    ?.response?.status;
  const message = (error as { response?: { data?: { message?: string } } })?.response?.data
    ?.message;

  if (status === 403) {
    return email
      ? `Admin access denied for ${email}. Add this email to ADMIN_EMAILS in Railway, then redeploy the API.`
      : 'Admin access denied. Add your email to ADMIN_EMAILS in Railway, then redeploy the API.';
  }

  if (status === 401) {
    return 'API authentication failed. Log out and sign in again.';
  }

  return message || 'Request failed. Check the browser console and Railway logs.';
}
