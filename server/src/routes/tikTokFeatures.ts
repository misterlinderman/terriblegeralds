import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { TikTokFeature } from '../models';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res: Response) => {
    const features = await TikTokFeature.find({ active: true })
      .sort({ sortOrder: 1, handle: 1 })
      .lean();

    res.json({ features });
  })
);

export default router;
