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
  const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims, user } = useAuth0();
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
        const claims = await getIdTokenClaims();
        setAuthToken(token, claims?.__raw);

        const { data } = await api.get<AdminMeResponse>('/admin/me');

        if (cancelled) return;

        if (!data.authorized) {
          const signedInEmail = user?.email || data.email;
          if (!signedInEmail) {
            setError(
              'Could not determine your email for admin access. Log out and sign in again, or assign the admin:content permission in Auth0.'
            );
          } else {
            const envHint =
              import.meta.env.DEV
                ? 'ADMIN_EMAILS in server/.env (then restart npm run dev)'
                : 'ADMIN_EMAILS in Railway (comma-separated), redeploy the API';
            setError(
              `Admin access denied for ${signedInEmail}. Add this email to ${envHint}, then log out and back in.`
            );
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
  }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims, user?.email, user?.sub]);

  return { ready, error, email: user?.email };
}

export function getAdminRequestError(error: unknown, email?: string): string {
  const status = (error as { response?: { status?: number; data?: { message?: string } } })
    ?.response?.status;
  const message = (error as { response?: { data?: { message?: string } } })?.response?.data
    ?.message;

  if (status === 403) {
    const envHint = import.meta.env.DEV
      ? 'ADMIN_EMAILS in server/.env and restart the dev server'
      : 'ADMIN_EMAILS in Railway, then redeploy the API';
    return email
      ? `Admin access denied for ${email}. Add this email to ${envHint}.`
      : `Admin access denied. Add your email to ${envHint}.`;
  }

  if (status === 401) {
    return 'API authentication failed. Log out and sign in again.';
  }

  return message || 'Request failed. Check the browser console and Railway logs.';
}
