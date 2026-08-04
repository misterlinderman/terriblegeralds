import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { Venue } from '../models';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res: Response) => {
    const venues = await Venue.find({ active: true }).sort({ sortOrder: 1, name: 1 }).lean();

    res.json({ venues });
  })
);

export default router;
