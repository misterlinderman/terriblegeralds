import jwt from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';

const domain = process.env.AUTH0_DOMAIN;
const clientId = process.env.AUTH0_CLIENT_ID;

const jwksClient = domain
  ? jwksRsa({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${domain}/.well-known/jwks.json`,
    })
  : null;

function getSigningKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  if (!jwksClient || !header.kid) {
    callback(new Error('Unable to resolve signing key'));
    return;
  }

  jwksClient.getSigningKey(header.kid, (err, key) => {
    if (err || !key) {
      callback(err || new Error('Signing key not found'));
      return;
    }
    callback(null, key.getPublicKey());
  });
}

export async function verifyIdToken(token: string): Promise<jwt.JwtPayload> {
  if (!domain || !clientId) {
    throw new Error('Auth0 client ID is not configured');
  }

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getSigningKey,
      {
        audience: clientId,
        issuer: `https://${domain}/`,
        algorithms: ['RS256'],
      },
      (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string') {
          reject(err || new Error('Invalid ID token'));
          return;
        }
        resolve(decoded);
      }
    );
  });
}
