import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { Faq } from '../models';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res: Response) => {
    const faqs = await Faq.find({ published: true })
      .sort({ sortOrder: 1 })
      .lean();

    res.json({ faqs });
  })
);

export default router;
