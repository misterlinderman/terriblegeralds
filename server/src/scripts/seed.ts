import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import { Event, MenuItem, CateringTier, Venue, PressFeature, TikTokFeature, AboutChapter, WallItem, Faq, SiteContent } from '../models';

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

const cateringTiers = [
  {
    name: 'The Backyard',
    price: 'From $650',
    includes: [
      'Up to 30 guests',
      '2 pizza varieties',
      '1.5 hr wood-fired service',
      'Trailer + 1 crew',
    ],
    sortOrder: 1,
  },
  {
    name: 'The Full Send',
    price: 'From $1,400',
    includes: [
      'Up to 80 guests',
      '4 pizza varieties + salad',
      '3 hr wood-fired service',
      'Trailer + 2 crew',
    ],
    sortOrder: 2,
  },
  {
    name: 'The Whole Terrible Thing',
    price: "Let's talk",
    includes: [
      '80+ guests',
      'Custom menu & specials',
      'Extended / multi-day service',
      'Full truck + crew',
    ],
    sortOrder: 3,
  },
];

const venues = [
  {
    name: 'Breweries',
    categoryIcon: 'brewery' as const,
    blurb: 'Our natural habitat',
    sortOrder: 1,
  },
  {
    name: 'Venues',
    categoryIcon: 'building' as const,
    blurb: 'Spaces for the chaos',
    sortOrder: 2,
  },
  {
    name: 'Parks',
    categoryIcon: 'park' as const,
    blurb: 'Eat outside, weirdo',
    sortOrder: 3,
  },
  {
    name: 'Event Spots',
    categoryIcon: 'event' as const,
    blurb: 'Book us together',
    sortOrder: 4,
  },
];

const pressFeatures = [
  {
    outlet: 'Hoppen Interview',
    blurb: 'Sit-down with the homies',
    ctaLabel: '▶ Listen Now',
    thumbLabel: '🎙 photo',
    sortOrder: 1,
  },
  {
    outlet: 'Meat Locker Pod',
    blurb: 'Podcast appearance',
    ctaLabel: '▶ Listen Now',
    thumbLabel: '🎙 podcast',
    sortOrder: 2,
  },
  {
    outlet: 'KELOLAND',
    blurb: 'TV feature',
    ctaLabel: '▶ Watch',
    thumbLabel: '📺 clip',
    sortOrder: 3,
  },
  {
    outlet: 'Omaha World-Herald',
    blurb: '"Food truck serving up unique pies in Omaha"',
    ctaLabel: '▶ Read',
    thumbLabel: '📰 clipping',
    sortOrder: 4,
  },
];

const tikTokFeatures = [
  { handle: '@emiliestrumlcin', views: '116K', sortOrder: 1 },
  { handle: '@hr.doods', views: '67K', sortOrder: 2 },
  { handle: '@piecewayforfood', views: '82K', sortOrder: 3 },
  { handle: '@hangryhoppers', views: '71K', sortOrder: 4 },
  { handle: '@tiktoktodelats', views: '91K', sortOrder: 5 },
  { handle: '@cheeseloveshim', views: '560K', sortOrder: 6 },
];

const aboutChapters = [
  {
    year: '2018',
    title: 'Bad Ideas',
    description:
      "It starts with a secondhand pizza oven, a half-finished trailer, and a group chat titled 'do NOT tell our spouses.' Nobody involved had run a restaurant. That felt like an advantage at the time.",
    showOnHome: true,
    sortOrder: 1,
  },
  {
    year: '2019',
    title: 'First Truck',
    description:
      'Wheels acquired — barely. The first service was a Tuesday, in a gravel lot, for eleven people, three of whom were related to us. We sold out of dough by 6:40.',
    showOnHome: true,
    sortOrder: 2,
  },
  {
    year: '2020',
    title: 'Gerald Is Born',
    description:
      "The mascot shows up as a joke on a sandwich board and refuses to leave. Nobody remembers whose idea he was. Everybody agrees he's the reason people started following us on purpose.",
    showOnHome: true,
    sortOrder: 3,
  },
  {
    year: '2021',
    title: "Gettin' Weird",
    description:
      "Pizza names start getting worse on purpose, pies start getting better on accident. We figure out that 'unorthodox' just means we do what tastes good and apologize for the branding later.",
    showOnHome: true,
    sortOrder: 4,
  },
  {
    year: '2022',
    title: 'Breweries Notice',
    description:
      'Someone at a brewery lets us park for a Friday. We never really leave. Turns out beer and wood-fired pizza want to be at the same party.',
    showOnHome: false,
    sortOrder: 5,
  },
  {
    year: '2023',
    title: 'The First Wedding',
    description:
      "We cater our first wedding by accident (a regular's cousin got engaged at one of our stops). It goes well enough that we accidentally start a whole side of the business.",
    showOnHome: false,
    sortOrder: 6,
  },
  {
    year: '2024',
    title: 'Somebody Filmed Us',
    description:
      "A TikTok of dough getting launched across the trailer gets 500K views overnight. We still don't fully understand why. We are not mad about it.",
    showOnHome: false,
    sortOrder: 7,
  },
  {
    year: 'NOW',
    title: 'Terrible Legend',
    description:
      "Season 3 · Vol. 6. Same terrible names, same wood fire, slightly nicer truck. We still don't know what we're doing, but the pizza's really good, so it's fine.",
    showOnHome: true,
    sortOrder: 8,
  },
];

const wallItems = [
  { caption: '😐', sortOrder: 1 },
  { caption: '😑', sortOrder: 2 },
  { caption: '🍕', sortOrder: 3 },
  { caption: '😋', sortOrder: 4 },
  { caption: '😵', sortOrder: 5 },
  { caption: '★', sortOrder: 6 },
  { caption: '😬', sortOrder: 7 },
  { caption: '🤨', sortOrder: 8 },
  { caption: '😎', sortOrder: 9 },
  { caption: '😶', sortOrder: 10 },
  { caption: '🍕', sortOrder: 11 },
  { caption: '😴', sortOrder: 12 },
  { caption: '😏', sortOrder: 13 },
  { caption: '😮', sortOrder: 14 },
  { caption: '★', sortOrder: 15 },
  { caption: '😐', sortOrder: 16 },
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
    CateringTier.deleteMany({}),
    Venue.deleteMany({}),
    PressFeature.deleteMany({}),
    TikTokFeature.deleteMany({}),
    AboutChapter.deleteMany({}),
    WallItem.deleteMany({}),
    Faq.deleteMany({}),
    SiteContent.deleteMany({}),
  ]);

  await MenuItem.insertMany(menuItems);
  await CateringTier.insertMany(cateringTiers);
  await Venue.insertMany(venues);
  await PressFeature.insertMany(pressFeatures);
  await TikTokFeature.insertMany(tikTokFeatures);
  await AboutChapter.insertMany(aboutChapters);
  await WallItem.insertMany(wallItems);
  await Faq.insertMany(faqs);
  await SiteContent.insertMany(siteContent);

  const eventCount = await Event.countDocuments();
  console.log(
    `✅ Seeded ${menuItems.length} menu items, ${cateringTiers.length} catering tiers, ${venues.length} venues, ${pressFeatures.length} press features, ${tikTokFeatures.length} TikTok features, ${aboutChapters.length} about chapters, ${wallItems.length} wall items, ${faqs.length} FAQs, ${siteContent.length} content entries`
  );
  console.log(`ℹ️  Events unchanged (${eventCount} existing). Add events via admin or API.`);

  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
