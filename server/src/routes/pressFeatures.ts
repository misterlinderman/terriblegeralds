import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { PressFeature } from '../models';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res: Response) => {
    const features = await PressFeature.find({ active: true })
      .sort({ sortOrder: 1, outlet: 1 })
      .lean();

    res.json({ features });
  })
);

export default router;
