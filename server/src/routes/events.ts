import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { Event } from '../models';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res: Response) => {
    const now = new Date();
    const events = await Event.find({
      published: true,
      startDate: { $gte: now },
    })
      .sort({ startDate: 1, sortOrder: 1 })
      .lean();

    res.json({ events });
  })
);

router.get(
  '/next',
  asyncHandler(async (_req, res: Response) => {
    const now = new Date();
    const event = await Event.findOne({
      published: true,
      startDate: { $gte: now },
    })
      .sort({ startDate: 1, sortOrder: 1 })
      .lean();

    res.json({ event: event || null });
  })
);

router.get(
  '/:slug',
  asyncHandler(async (req, res: Response) => {
    const event = await Event.findOne({
      slug: req.params.slug,
      published: true,
    }).lean();

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.json({ event });
  })
);

export default router;
