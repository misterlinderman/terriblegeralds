import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/admin';
import { asyncHandler, createError } from '../../middleware/errorHandler';
import { VENUE_CATEGORY_ICONS, Venue } from '../../models';

const router = Router();

router.use(checkJwt, requireAdmin);

router.get(
  '/',
  asyncHandler(async (_req: AuthRequest, res: Response) => {
    const venues = await Venue.find().sort({ sortOrder: 1, name: 1 }).lean();
    res.json({ venues });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, categoryIcon, blurb, sortOrder, active } = req.body;

    if (!name?.trim() || !blurb?.trim()) {
      throw createError('name and blurb are required', 400);
    }

    if (categoryIcon && !VENUE_CATEGORY_ICONS.includes(categoryIcon)) {
      throw createError('categoryIcon must be brewery, building, park, or event', 400);
    }

    const venue = await Venue.create({
      name: name.trim(),
      categoryIcon: categoryIcon || 'brewery',
      blurb: blurb.trim(),
      sortOrder: Number(sortOrder) || 0,
      active: active !== false,
    });

    res.status(201).json(venue);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { categoryIcon } = req.body;

    if (categoryIcon && !VENUE_CATEGORY_ICONS.includes(categoryIcon)) {
      throw createError('categoryIcon must be brewery, building, park, or event', 400);
    }

    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!venue) {
      throw createError('Venue not found', 404);
    }

    res.json(venue);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const venue = await Venue.findByIdAndDelete(req.params.id);

    if (!venue) {
      throw createError('Venue not found', 404);
    }

    res.json({ message: 'Venue deleted' });
  })
);

export default router;
