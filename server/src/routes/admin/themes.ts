import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/admin';
import { asyncHandler, createError } from '../../middleware/errorHandler';
import { ThemePreset } from '../../models';

const router = Router();

router.use(checkJwt, requireAdmin);

router.get(
  '/',
  asyncHandler(async (_req: AuthRequest, res: Response) => {
    const themes = await ThemePreset.find().sort({ sortOrder: 1, name: 1 }).lean();
    res.json({ themes });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name } = req.body;

    if (!name?.trim()) {
      throw createError('name is required', 400);
    }

    const theme = await ThemePreset.create({
      ...req.body,
      name: name.trim(),
      active: false,
      sortOrder: Number(req.body.sortOrder) || 0,
    });

    res.status(201).json(theme);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const updates = { ...req.body } as Record<string, unknown>;
    delete updates.active;

    const theme = await ThemePreset.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!theme) {
      throw createError('Theme preset not found', 404);
    }

    res.json(theme);
  })
);

router.post(
  '/:id/activate',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const theme = await ThemePreset.findById(req.params.id);

    if (!theme) {
      throw createError('Theme preset not found', 404);
    }

    await ThemePreset.updateMany({ _id: { $ne: theme._id } }, { active: false });
    theme.active = true;
    await theme.save();

    res.json(theme);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const theme = await ThemePreset.findById(req.params.id);

    if (!theme) {
      throw createError('Theme preset not found', 404);
    }

    if (theme.active) {
      throw createError('Cannot delete the active theme. Activate another preset first.', 400);
    }

    await theme.deleteOne();
    res.json({ message: 'Theme preset deleted' });
  })
);

export default router;
