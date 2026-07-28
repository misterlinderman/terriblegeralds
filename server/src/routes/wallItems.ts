import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { WallItem } from '../models';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res: Response) => {
    const items = await WallItem.find({ active: true }).sort({ sortOrder: 1, caption: 1 }).lean();

    res.json({ items });
  })
);

export default router;
