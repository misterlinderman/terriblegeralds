import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/admin';
import { asyncHandler, createError } from '../../middleware/errorHandler';
import { SiteContent } from '../../models';

const router = Router();

router.use(checkJwt, requireAdmin);

router.get(
  '/',
  asyncHandler(async (_req: AuthRequest, res: Response) => {
    const entries = await SiteContent.find().sort({ section: 1, key: 1 }).lean();
    res.json({ entries });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { key, section, label, value } = req.body;

    if (!key?.trim() || !section?.trim() || !label?.trim()) {
      throw createError('key, section, and label are required', 400);
    }

    const entry = await SiteContent.create({
      key: key.trim(),
      section: section.trim(),
      label: label.trim(),
      value: value?.trim() || '',
    });

    res.status(201).json(entry);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const entry = await SiteContent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!entry) {
      throw createError('Content entry not found', 404);
    }

    res.json(entry);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const entry = await SiteContent.findByIdAndDelete(req.params.id);

    if (!entry) {
      throw createError('Content entry not found', 404);
    }

    res.json({ message: 'Content entry deleted' });
  })
);

export default router;
