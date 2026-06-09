import { Router, Response } from 'express';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { ContactSubmission } from '../models';
import { sendContactInquiryEmail } from '../services/contactEmail';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req, res: Response) => {
    const {
      name,
      email,
      phone,
      eventDate,
      location,
      guestCount,
      referralSource,
      message,
    } = req.body;

    const required = {
      name,
      email,
      phone,
      eventDate,
      location,
      guestCount,
      referralSource,
      message,
    };

    for (const [field, value] of Object.entries(required)) {
      if (!value || (typeof value === 'string' && !value.trim())) {
        throw createError(`${field} is required`, 400);
      }
    }

    const parsedDate = new Date(eventDate);
    if (Number.isNaN(parsedDate.getTime())) {
      throw createError('eventDate must be a valid date', 400);
    }

    const trimmed = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      eventDate: parsedDate,
      location: location.trim(),
      guestCount: String(guestCount).trim(),
      referralSource: referralSource.trim(),
      message: message.trim(),
    };

    const submission = await ContactSubmission.create(trimmed);

    try {
      await sendContactInquiryEmail(trimmed);
    } catch (err) {
      console.error('Contact inquiry saved but email notification failed:', err);
    }

    res.status(201).json({
      message: 'Thanks! We received your inquiry and will be in touch soon.',
      id: submission._id,
    });
  })
);

export default router;
