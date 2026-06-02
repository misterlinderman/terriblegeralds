import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { resolveAdminAuth } from '../../middleware/admin';
import { asyncHandler } from '../../middleware/errorHandler';

const router = Router();

router.get(
  '/me',
  checkJwt,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const auth = await resolveAdminAuth(req);

    res.json({
      authorized: auth.authorized,
      email: auth.email || null,
      hasPermission: auth.hasPermission,
      isListedAdmin: auth.isListedAdmin,
      emailInToken: auth.emailInAccessToken,
    });
  })
);

export default router;
