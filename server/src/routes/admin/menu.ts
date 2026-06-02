import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/admin';
import { asyncHandler, createError } from '../../middleware/errorHandler';
import { MenuItem } from '../../models';

const router = Router();

router.use(checkJwt, requireAdmin);

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

router.get(
  '/',
  asyncHandler(async (_req: AuthRequest, res: Response) => {
    const items = await MenuItem.find().sort({ sortOrder: 1, name: 1 }).lean();
    res.json({ items });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, description, imagePath, sortOrder, active, slug } = req.body;

    if (!name?.trim() || !description?.trim() || !imagePath?.trim()) {
      throw createError('name, description, and imagePath are required', 400);
    }

    const item = await MenuItem.create({
      name: name.trim(),
      slug: slug?.trim() || slugify(name),
      description: description.trim(),
      imagePath: imagePath.trim(),
      sortOrder: Number(sortOrder) || 0,
      active: active !== false,
    });

    res.status(201).json(item);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      throw createError('Menu item not found', 404);
    }

    res.json(item);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const item = await MenuItem.findByIdAndDelete(req.params.id);

    if (!item) {
      throw createError('Menu item not found', 404);
    }

    res.json({ message: 'Menu item deleted' });
  })
);

export default router;
