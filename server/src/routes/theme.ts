import { Router, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { DEFAULT_THEME_TOKENS } from '../constants/defaultTheme';
import { ThemePreset } from '../models';

const router = Router();

router.get(
  '/active',
  asyncHandler(async (_req, res: Response) => {
    const preset = await ThemePreset.findOne({ active: true }).lean();

    if (!preset) {
      res.json({ theme: { ...DEFAULT_THEME_TOKENS, active: true, sortOrder: 0 } });
      return;
    }

    res.json({ theme: preset });
  })
);

export default router;
