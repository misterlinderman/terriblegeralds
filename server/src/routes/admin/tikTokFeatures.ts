import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/admin';
import { asyncHandler, createError } from '../../middleware/errorHandler';
import { TikTokFeature } from '../../models';

const router = Router();

router.use(checkJwt, requireAdmin);

router.get(
  '/',
  asyncHandler(async (_req: AuthRequest, res: Response) => {
    const features = await TikTokFeature.find().sort({ sortOrder: 1, handle: 1 }).lean();
    res.json({ features });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { handle, views, linkUrl, sortOrder, active } = req.body;

    if (!handle?.trim() || !views?.trim()) {
      throw createError('handle and views are required', 400);
    }

    const feature = await TikTokFeature.create({
      handle: handle.trim(),
      views: views.trim(),
      linkUrl: linkUrl?.trim() || undefined,
      sortOrder: Number(sortOrder) || 0,
      active: active !== false,
    });

    res.status(201).json(feature);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const feature = await TikTokFeature.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!feature) {
      throw createError('TikTok feature not found', 404);
    }

    res.json(feature);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const feature = await TikTokFeature.findByIdAndDelete(req.params.id);

    if (!feature) {
      throw createError('TikTok feature not found', 404);
    }

    res.json({ message: 'TikTok feature deleted' });
  })
);

export default router;
