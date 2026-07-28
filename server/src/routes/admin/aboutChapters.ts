import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/admin';
import { asyncHandler, createError } from '../../middleware/errorHandler';
import { AboutChapter } from '../../models';

const router = Router();

router.use(checkJwt, requireAdmin);

router.get(
  '/',
  asyncHandler(async (_req: AuthRequest, res: Response) => {
    const chapters = await AboutChapter.find().sort({ sortOrder: 1, year: 1 }).lean();
    res.json({ chapters });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { year, title, description, showOnHome, sortOrder, active } = req.body;

    if (!year?.trim() || !title?.trim() || !description?.trim()) {
      throw createError('year, title, and description are required', 400);
    }

    const chapter = await AboutChapter.create({
      year: year.trim(),
      title: title.trim(),
      description: description.trim(),
      showOnHome: showOnHome === true,
      sortOrder: Number(sortOrder) || 0,
      active: active !== false,
    });

    res.status(201).json(chapter);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const chapter = await AboutChapter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!chapter) {
      throw createError('About chapter not found', 404);
    }

    res.json(chapter);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const chapter = await AboutChapter.findByIdAndDelete(req.params.id);

    if (!chapter) {
      throw createError('About chapter not found', 404);
    }

    res.json({ message: 'About chapter deleted' });
  })
);

export default router;
