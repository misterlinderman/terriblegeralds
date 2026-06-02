import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { getAdminEmails, getEmailFromAuth } from '../../middleware/admin';
import { asyncHandler } from '../../middleware/errorHandler';

const router = Router();

router.get(
  '/me',
  checkJwt,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const payload = req.auth?.payload as Record<string, unknown> | undefined;
    const permissions = (payload?.permissions as string[] | undefined) || [];
    const email = getEmailFromAuth(payload);
    const adminEmails = getAdminEmails();
    const hasPermission = permissions.includes('admin:content');
    const isListedAdmin = email ? adminEmails.includes(email) : false;

    res.json({
      authorized: hasPermission || isListedAdmin,
      email: email || null,
      hasPermission,
      isListedAdmin,
      emailInToken: Boolean(email),
    });
  })
);

export default router;
