import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { AboutChapter } from '../models';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res: Response) => {
    const filter: { active: boolean; showOnHome?: boolean } = { active: true };

    if (req.query.home === 'true') {
      filter.showOnHome = true;
    }

    const chapters = await AboutChapter.find(filter).sort({ sortOrder: 1, year: 1 }).lean();

    res.json({ chapters });
  })
);

export default router;
