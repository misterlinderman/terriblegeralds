import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import { Event, MenuItem, Faq, SiteContent } from '../models';

dotenv.config();

const menuItems = [
  {
    name: 'Garlic Cheese',
    slug: 'garlic-cheese',
    description: 'Garlic parm sauce & mozzarella, Served with house marinara',
    imagePath: '/images/pizzas/garlic-cheese-bread.webp',
    sortOrder: 1,
  },
  {
    name: 'The Pep Talk',
    slug: 'pep-talk',
    description: 'House red sauce, cup pepperonis, **calabrian peppers, mozzarella',
    imagePath: '/images/pizzas/pep-talk.webp',
    sortOrder: 2,
  },
  {
    name: 'Margherita',
    slug: 'margherita',
    description: 'Mozzarella, basil, extra virgin olive oil, red sauce',
    imagePath: '/images/pizzas/margherita.webp',
    sortOrder: 3,
  },
  {
    name: 'Pepperoni',
    slug: 'pepperoni',
    description: 'House red sauce, cup pepperonis, mozzarella',
    imagePath: '/images/pizzas/pepperoni.webp',
    sortOrder: 4,
  },
  {
    name: "Sal's Hot Date",
    slug: 'sals-hot-date',
    description:
      "Soppressata Italian Salami, house red sauce, mozzarella and Mike's Hot Honey.",
    imagePath: '/images/pizzas/sals-hot-date.webp',
    sortOrder: 5,
  },
  {
    name: 'Crabby Gerald',
    slug: 'crabby-gerald',
    description: 'Crab Rangoon mix, sweet Thai chili glaze, crispy wonton, green onion',
    imagePath: '/images/pizzas/crabby-gerald.webp',
    sortOrder: 6,
  },
];

const faqs = [
  {
    question: 'Who is Gerald?',
    answer: "We're still not sure, but if you see him tell him he's late for work.",
    sortOrder: 1,
  },
  {
    question:
      "I really want TG's at my birthday/wedding/graduation party/office lunch/in my life. How do I book?",
    answer:
      "It's easy! Fill out our contact form and tell us a little about yourself. We'll get back to you in a jiff!",
    sortOrder: 2,
  },
  {
    question: "What states is TG's licensed to sell in?",
    answer:
      'Currently, we are only licensed in Nebraska and as such can only operate within the state.',
    sortOrder: 3,
  },
  {
    question: 'Can I order online?',
    answer:
      "At this time, TG's has chosen to keep their eye on the prize and prioritize on-premise guests in order to ensure fresh, quality pies every time. We simply could not bear to see our product wilt at the hands of a delivery service.\n\nShort answer: Negative, sorry.",
    sortOrder: 4,
  },
  {
    question: 'WHERE ARE YOU, GERALD?',
    answer: 'Check our events page — where, indeed?',
    sortOrder: 5,
  },
];

const siteContent = [
  {
    key: 'meta.description',
    section: 'meta',
    label: 'Site meta description',
    value:
      "Terrible Gerald's Pizza is a fresh, approachable take on old world classics. We keep you in your comfort zone with traditional pies, and challenge the norms with crowd favorites like the Crabby Gerald—Omaha's premier Crab Rangoon Pie. Our concept is simple; unorthodox Neapolitan pizza, on wheels.",
  },
  {
    key: 'hero.tagline',
    section: 'hero',
    label: 'Homepage hero tagline',
    value: "Terrible Gerald's Pizza / Unorthodox Neapolitan",
  },
  {
    key: 'menu.subtitle',
    section: 'menu',
    label: 'Menu section subtitle',
    value: '12" made to order pies, one size, no slices',
  },
  {
    key: 'menu.footnote',
    section: 'menu',
    label: 'Menu footnote',
    value: '** Calabrians = imported [red] Italian chiles. mild heat, tangy.',
  },
  {
    key: 'about.paragraph1',
    section: 'about',
    label: 'About paragraph 1',
    value:
      "Terrible Gerald's Pizza is a fresh, approachable take on old world classics. We keep you in your comfort zone with traditional pies, and challenge the norms with crowd favorites like the Crabby Gerald—Omaha's premier Crab Rangoon Pie. Our concept is simple; unorthodox Neapolitan pizza, on wheels.",
  },
  {
    key: 'about.paragraph2',
    section: 'about',
    label: 'About paragraph 2',
    value:
      "At TG's, we believe that dough is the window to the soul. Using a 48 hour fermentation process, our dough speaks for itself—our pies boast pillowy crust with bedroom eyes and come-hither leoparding. Doughn't believe us? Experience us for yourself—it surely won't be a terrible decision.",
  },
  {
    key: 'events.intro',
    section: 'events',
    label: 'Events page intro',
    value: 'Check back for tasty events in your area!',
  },
  {
    key: 'contact.licenseNotice',
    section: 'contact',
    label: 'Contact form license notice',
    value: 'At this time we are only licensed for sales in Nebraska. Sorry other states!',
  },
  {
    key: 'contact.bookingBlurb',
    section: 'contact',
    label: 'Contact form booking blurb',
    value:
      'Book us for upcoming private events like graduation parties, birthdays, weddings and work lunches!',
  },
];

async function seed() {
  await connectDatabase();

  await Promise.all([
    MenuItem.deleteMany({}),
    Faq.deleteMany({}),
    SiteContent.deleteMany({}),
  ]);

  await MenuItem.insertMany(menuItems);
  await Faq.insertMany(faqs);
  await SiteContent.insertMany(siteContent);

  const eventCount = await Event.countDocuments();
  console.log(`✅ Seeded ${menuItems.length} menu items, ${faqs.length} FAQs, ${siteContent.length} content entries`);
  console.log(`ℹ️  Events unchanged (${eventCount} existing). Add events via admin or API.`);

  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
