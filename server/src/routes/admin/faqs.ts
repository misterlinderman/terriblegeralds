import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/admin';
import { asyncHandler, createError } from '../../middleware/errorHandler';
import { Faq } from '../../models';

const router = Router();

router.use(checkJwt, requireAdmin);

router.get(
  '/',
  asyncHandler(async (_req: AuthRequest, res: Response) => {
    const faqs = await Faq.find().sort({ sortOrder: 1 }).lean();
    res.json({ faqs });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { question, answer, sortOrder, published } = req.body;

    if (!question?.trim() || !answer?.trim()) {
      throw createError('question and answer are required', 400);
    }

    const faq = await Faq.create({
      question: question.trim(),
      answer: answer.trim(),
      sortOrder: Number(sortOrder) || 0,
      published: published !== false,
    });

    res.status(201).json(faq);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!faq) {
      throw createError('FAQ not found', 404);
    }

    res.json(faq);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const faq = await Faq.findByIdAndDelete(req.params.id);

    if (!faq) {
      throw createError('FAQ not found', 404);
    }

    res.json({ message: 'FAQ deleted' });
  })
);

export default router;
