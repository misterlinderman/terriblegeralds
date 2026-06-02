import { Request, Response, NextFunction } from 'express';
import { createError, asyncHandler } from './errorHandler';
import { verifyIdToken } from '../services/idToken';

export const getAdminEmails = (): string[] =>
  (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

/** Auth0 access tokens often omit `email`; check standard and namespaced claims. */
export const getEmailFromAuth = (payload: Record<string, unknown> | undefined): string | undefined => {
  if (!payload) return undefined;

  if (typeof payload.email === 'string' && payload.email) {
    return payload.email.toLowerCase();
  }

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === 'string' && value && (key.endsWith('/email') || key.endsWith('email'))) {
      return value.toLowerCase();
    }
  }

  return undefined;
};

export interface AdminAuthContext {
  email?: string;
  emailInAccessToken: boolean;
  permissions: string[];
  hasPermission: boolean;
  isListedAdmin: boolean;
  authorized: boolean;
}

/** Resolve admin email from the access token, falling back to a verified ID token header. */
export const resolveAdminAuth = async (req: Request): Promise<AdminAuthContext> => {
  const payload = req.auth?.payload as Record<string, unknown> | undefined;
  const permissions = (payload?.permissions as string[] | undefined) || [];
  let email = getEmailFromAuth(payload);
  const emailInAccessToken = Boolean(email);

  if (!email) {
    const idTokenHeader = req.headers['x-auth0-id-token'];
    const idToken = Array.isArray(idTokenHeader) ? idTokenHeader[0] : idTokenHeader;

    if (typeof idToken === 'string' && idToken && payload?.sub) {
      try {
        const idPayload = await verifyIdToken(idToken);
        if (idPayload.sub === payload.sub) {
          email = getEmailFromAuth(idPayload as Record<string, unknown>);
        }
      } catch {
        // Ignore invalid ID tokens and continue without email.
      }
    }
  }

  const adminEmails = getAdminEmails();
  const hasPermission = permissions.includes('admin:content');
  const isListedAdmin = email ? adminEmails.includes(email) : false;

  return {
    email,
    emailInAccessToken,
    permissions,
    hasPermission,
    isListedAdmin,
    authorized: hasPermission || isListedAdmin,
  };
};

export const requireAdmin = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const auth = await resolveAdminAuth(req);

  if (auth.authorized) {
    return next();
  }

  next(createError('Admin access required', 403));
});
