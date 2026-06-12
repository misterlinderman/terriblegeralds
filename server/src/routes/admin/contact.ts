import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/admin';
import { asyncHandler, createError } from '../../middleware/errorHandler';
import { ContactSubmission } from '../../models';

const router = Router();

router.use(checkJwt, requireAdmin);

router.get(
  '/',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { status, inquiryType } = req.query;
    const query: Record<string, unknown> = {};

    if (status && typeof status === 'string') {
      query.status = status;
    }

    if (inquiryType === 'general') {
      query.inquiryType = 'general';
    } else if (inquiryType === 'catering') {
      // Include legacy submissions created before inquiryType existed.
      query.inquiryType = { $ne: 'general' };
    }

    const submissions = await ContactSubmission.find(query)
      .sort({ createdAt: -1 })
      .lean();

    res.json({ submissions });
  })
);

router.patch(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { status } = req.body;

    if (!status || !['new', 'read', 'archived'].includes(status)) {
      throw createError('status must be new, read, or archived', 400);
    }

    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!submission) {
      throw createError('Submission not found', 404);
    }

    res.json(submission);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);

    if (!submission) {
      throw createError('Submission not found', 404);
    }

    res.json({ message: 'Submission deleted' });
  })
);

export default router;
