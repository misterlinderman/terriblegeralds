import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import api, { setAuthToken } from '../services/api';

const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

/**
 * Hook to automatically add Auth0 token to API requests
 * Call this once in a high-level component to set up token handling
 */
export function useApiAuth() {
  const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const setupToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
          authorizationParams: {
            audience,
            scope: 'openid profile email',
          },
          });
          const claims = await getIdTokenClaims();
          setAuthToken(token, claims?.__raw);
        } catch (error) {
          console.error('Error getting access token:', error);
          setAuthToken(null);
        }
      } else {
        setAuthToken(null);
      }
    };

    setupToken();
  }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims]);

  return api;
}

export default useApiAuth;
