import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { SiteContent } from '../models';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res: Response) => {
    const entries = await SiteContent.find().sort({ section: 1, key: 1 }).lean();
    const content = Object.fromEntries(entries.map((entry) => [entry.key, entry.value]));
    res.json({ content });
  })
);

router.get(
  '/:key',
  asyncHandler(async (req, res: Response) => {
    const entry = await SiteContent.findOne({ key: req.params.key }).lean();

    if (!entry) {
      res.status(404).json({ message: 'Content not found' });
      return;
    }

    res.json({ key: entry.key, value: entry.value });
  })
);

export default router;
