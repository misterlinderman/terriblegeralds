import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { CateringTier } from '../models';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res: Response) => {
    const tiers = await CateringTier.find({ active: true })
      .sort({ sortOrder: 1, name: 1 })
      .lean();

    res.json({ tiers });
  })
);

export default router;
