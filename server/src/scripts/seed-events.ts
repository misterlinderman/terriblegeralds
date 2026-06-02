import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import { Event } from '../models';

dotenv.config();

const events = [
  {
    title: "Barry O's Tavern",
    slug: 'barry-os-tavern-june-2026',
    description: '',
    venue: "Barry O's Tavern",
    address: '420 S 16th St, Omaha, NE 68102',
    startDate: new Date('2026-06-14T18:00:00-05:00'),
    endDate: new Date('2026-06-14T23:00:00-05:00'),
    mapUrl: 'https://maps.google.com/?q=420+S+16th+St,+Omaha,+NE+68102',
    featured: true,
    published: true,
    sortOrder: 1,
  },
];

async function seedEvents() {
  await connectDatabase();

  for (const event of events) {
    await Event.findOneAndUpdate({ slug: event.slug }, event, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  const count = await Event.countDocuments();
  console.log(`✅ Upserted ${events.length} sample event(s). Total events in database: ${count}`);
  process.exit(0);
}

seedEvents().catch((error) => {
  console.error('Event seed failed:', error);
  process.exit(1);
});
