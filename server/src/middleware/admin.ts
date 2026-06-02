import { Request, Response, NextFunction } from 'express';
import { createError } from './errorHandler';

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

export const requireAdmin = (req: Request, _res: Response, next: NextFunction) => {
  const payload = req.auth?.payload as Record<string, unknown> | undefined;
  const permissions = (payload?.permissions as string[] | undefined) || [];
  const email = getEmailFromAuth(payload);
  const adminEmails = getAdminEmails();

  const hasPermission = permissions.includes('admin:content');
  const isListedAdmin = email ? adminEmails.includes(email) : false;

  if (hasPermission || isListedAdmin) {
    return next();
  }

  next(createError('Admin access required', 403));
};
