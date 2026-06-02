import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { MenuItem } from '../models';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res: Response) => {
    const items = await MenuItem.find({ active: true })
      .sort({ sortOrder: 1, name: 1 })
      .lean();

    res.json({ items });
  })
);

export default router;
