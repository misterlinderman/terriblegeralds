import { Router, Response } from 'express';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { ContactSubmission } from '../models';
import { sendContactInquiryEmail } from '../services/contactEmail';
import {
  checkZipWithinTravelRadius,
  isValidUsZipFormat,
  normalizeZipCode,
} from '../services/travelRadius';
import type { ContactInquiryType } from '../models/ContactSubmission';

const router = Router();

function requireTrimmed(value: unknown, field: string): string {
  if (!value || (typeof value === 'string' && !value.trim())) {
    throw createError(`${field} is required`, 400);
  }
  return String(value).trim();
}

router.get(
  '/validate-zip',
  asyncHandler(async (req, res: Response) => {
    const zip = typeof req.query.zip === 'string' ? req.query.zip : '';

    if (!zip.trim()) {
      throw createError('zip is required', 400);
    }

    const result = checkZipWithinTravelRadius(zip);
    res.json(result);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res: Response) => {
    const {
      inquiryType: rawInquiryType,
      name,
      email,
      phone,
      eventDate,
      location,
      eventZip,
      guestCount,
      referralSource,
      message,
    } = req.body;

    const inquiryType: ContactInquiryType =
      rawInquiryType === 'general' ? 'general' : 'catering';

    const trimmed = {
      inquiryType,
      name: requireTrimmed(name, 'name'),
      email: requireTrimmed(email, 'email'),
      phone: requireTrimmed(phone, 'phone'),
      message: requireTrimmed(message, 'message'),
    };

    if (inquiryType === 'catering') {
      const cateringFields = {
        eventDate: requireTrimmed(eventDate, 'eventDate'),
        location: requireTrimmed(location, 'location'),
        eventZip: requireTrimmed(eventZip, 'eventZip'),
        guestCount: requireTrimmed(guestCount, 'guestCount'),
        referralSource: requireTrimmed(referralSource, 'referralSource'),
      };

      if (!isValidUsZipFormat(cateringFields.eventZip)) {
        throw createError('eventZip must be a valid 5-digit US zip code', 400);
      }

      const zipCheck = checkZipWithinTravelRadius(cateringFields.eventZip);
      if (!zipCheck.valid) {
        throw createError(zipCheck.message || 'Event zip code is outside our travel area', 400);
      }

      const parsedDate = new Date(cateringFields.eventDate);
      if (Number.isNaN(parsedDate.getTime())) {
        throw createError('eventDate must be a valid date', 400);
      }

      Object.assign(trimmed, {
        eventDate: parsedDate,
        location: cateringFields.location,
        eventZip: normalizeZipCode(cateringFields.eventZip),
        guestCount: cateringFields.guestCount,
        referralSource: cateringFields.referralSource,
      });
    }

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
