import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/admin';
import { asyncHandler, createError } from '../../middleware/errorHandler';
import { PressFeature } from '../../models';

const router = Router();

router.use(checkJwt, requireAdmin);

router.get(
  '/',
  asyncHandler(async (_req: AuthRequest, res: Response) => {
    const features = await PressFeature.find().sort({ sortOrder: 1, outlet: 1 }).lean();
    res.json({ features });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { outlet, blurb, ctaLabel, thumbLabel, linkUrl, sortOrder, active } = req.body;

    if (!outlet?.trim() || !blurb?.trim() || !ctaLabel?.trim() || !thumbLabel?.trim()) {
      throw createError('outlet, blurb, ctaLabel, and thumbLabel are required', 400);
    }

    const feature = await PressFeature.create({
      outlet: outlet.trim(),
      blurb: blurb.trim(),
      ctaLabel: ctaLabel.trim(),
      thumbLabel: thumbLabel.trim(),
      linkUrl: linkUrl?.trim() || undefined,
      sortOrder: Number(sortOrder) || 0,
      active: active !== false,
    });

    res.status(201).json(feature);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const feature = await PressFeature.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!feature) {
      throw createError('Press feature not found', 404);
    }

    res.json(feature);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const feature = await PressFeature.findByIdAndDelete(req.params.id);

    if (!feature) {
      throw createError('Press feature not found', 404);
    }

    res.json({ message: 'Press feature deleted' });
  })
);

export default router;
