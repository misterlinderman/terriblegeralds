import { Router, Response } from 'express';
import { checkJwt, AuthRequest } from '../../middleware/auth';
import { requireAdmin } from '../../middleware/admin';
import { asyncHandler, createError } from '../../middleware/errorHandler';
import { Event } from '../../models';

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
    const events = await Event.find().sort({ startDate: -1 }).lean();
    res.json({ events });
  })
);

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const {
      title,
      description,
      venue,
      address,
      startDate,
      endDate,
      mapUrl,
      ticketUrl,
      featured,
      published,
      sortOrder,
      slug,
    } = req.body;

    if (!title?.trim() || !venue?.trim() || !startDate) {
      throw createError('title, venue, and startDate are required', 400);
    }

    const eventSlug = slug?.trim() || slugify(title);

    const event = await Event.create({
      title: title.trim(),
      slug: eventSlug,
      description: description?.trim() || '',
      venue: venue.trim(),
      address: address?.trim(),
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      mapUrl: mapUrl?.trim(),
      ticketUrl: ticketUrl?.trim(),
      featured: Boolean(featured),
      published: published !== false,
      sortOrder: Number(sortOrder) || 0,
    });

    res.status(201).json(event);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const update: Record<string, unknown> = {};
    const fields = [
      'title',
      'slug',
      'description',
      'venue',
      'address',
      'mapUrl',
      'ticketUrl',
      'featured',
      'published',
      'sortOrder',
    ];

    for (const field of fields) {
      if (req.body[field] !== undefined) {
        update[field] = req.body[field];
      }
    }

    if (req.body.startDate) update.startDate = new Date(req.body.startDate);
    if (req.body.endDate) update.endDate = new Date(req.body.endDate);

    const event = await Event.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      throw createError('Event not found', 404);
    }

    res.json(event);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      throw createError('Event not found', 404);
    }

    res.json({ message: 'Event deleted' });
  })
);

export default router;
