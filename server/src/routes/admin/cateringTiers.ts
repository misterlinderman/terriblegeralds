import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/admin';
import { asyncHandler, createError } from '../../middleware/errorHandler';
import { CateringTier } from '../../models';

const router = Router();

router.use(checkJwt, requireAdmin);

const normalizeIncludes = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
};

router.get(
  '/',
  asyncHandler(async (_req: AuthRequest, res: Response) => {
    const tiers = await CateringTier.find().sort({ sortOrder: 1, name: 1 }).lean();
    res.json({ tiers });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, price, includes, blurb, sortOrder, active } = req.body;

    if (!name?.trim() || !price?.trim()) {
      throw createError('name and price are required', 400);
    }

    const tier = await CateringTier.create({
      name: name.trim(),
      price: price.trim(),
      includes: normalizeIncludes(includes),
      blurb: blurb?.trim() || undefined,
      sortOrder: Number(sortOrder) || 0,
      active: active !== false,
    });

    res.status(201).json(tier);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const payload = { ...req.body };
    if (payload.includes !== undefined) {
      payload.includes = normalizeIncludes(payload.includes);
    }

    const tier = await CateringTier.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!tier) {
      throw createError('Catering tier not found', 404);
    }

    res.json(tier);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const tier = await CateringTier.findByIdAndDelete(req.params.id);

    if (!tier) {
      throw createError('Catering tier not found', 404);
    }

    res.json({ message: 'Catering tier deleted' });
  })
);

export default router;
