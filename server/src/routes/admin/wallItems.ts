import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/admin';
import { asyncHandler, createError } from '../../middleware/errorHandler';
import { WallItem } from '../../models';

const router = Router();

router.use(checkJwt, requireAdmin);

router.get(
  '/',
  asyncHandler(async (_req: AuthRequest, res: Response) => {
    const items = await WallItem.find().sort({ sortOrder: 1, caption: 1 }).lean();
    res.json({ items });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { caption, imageUrl, linkUrl, sortOrder, active } = req.body;

    if (!caption?.trim()) {
      throw createError('caption is required', 400);
    }

    const item = await WallItem.create({
      caption: caption.trim(),
      imageUrl: imageUrl?.trim() || undefined,
      linkUrl: linkUrl?.trim() || undefined,
      sortOrder: Number(sortOrder) || 0,
      active: active !== false,
    });

    res.status(201).json(item);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const item = await WallItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      throw createError('Wall item not found', 404);
    }

    res.json(item);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const item = await WallItem.findByIdAndDelete(req.params.id);

    if (!item) {
      throw createError('Wall item not found', 404);
    }

    res.json({ message: 'Wall item deleted' });
  })
);

export default router;
