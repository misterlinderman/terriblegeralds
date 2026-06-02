import { Request, Response, NextFunction } from 'express';
import { createError } from './errorHandler';

const getAdminEmails = (): string[] =>
  (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export const requireAdmin = (req: Request, _res: Response, next: NextFunction) => {
  const permissions = (req.auth?.payload?.permissions as string[] | undefined) || [];
  const email = (req.auth?.payload?.email as string | undefined)?.toLowerCase();
  const adminEmails = getAdminEmails();

  const hasPermission = permissions.includes('admin:content');
  const isListedAdmin = email ? adminEmails.includes(email) : false;

  if (hasPermission || isListedAdmin) {
    return next();
  }

  next(createError('Admin access required', 403));
};
