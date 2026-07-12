import api from './api';
import type { ScheduleRow } from '../components/marketing/ScheduleCard';
import type {
  AboutChapter,
  AboutCrewMember,
  AboutStop,
  AboutValue,
  CateringStep,
  CateringTier,
  ContactFormData,
  Event,
  Faq,
  MenuItem,
  MenuListItem,
  PressFeature,
  ReviewQuote,
  TikTokFeature,
  VenueCategory,
  ZipValidationResult,
} from '../types';

export const fetchNextEvent = async (): Promise<Event | null> => {
  const { data } = await api.get<{ event: Event | null }>('/events/next');
  return data.event;
};

export const fetchEvents = async (): Promise<Event[]> => {
  const { data } = await api.get<{ events: Event[] }>('/events');
  return data.events;
};

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const { data } = await api.get<{ items: MenuItem[] }>('/menu');
  return data.items;
};

export const fetchFaqs = async (): Promise<Faq[]> => {
  const { data } = await api.get<{ faqs: Faq[] }>('/faqs');
  return data.faqs;
};

export const fetchSiteContent = async (): Promise<Record<string, string>> => {
  const { data } = await api.get<{ content: Record<string, string> }>('/content');
  return data.content;
};

export const submitContactForm = async (payload: ContactFormData): Promise<void> => {
  await api.post('/contact', payload);
};

export const validateEventZip = async (zip: string): Promise<ZipValidationResult> => {
  const { data } = await api.get<ZipValidationResult>('/contact/validate-zip', {
    params: { zip },
  });
  return data;
};

export const formatEventDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const formatEventTime = (isoDate: string): string =>
  new Date(isoDate).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

export const formatEventTimeRange = (startDate: string, endDate?: string): string => {
  const start = formatEventTime(startDate);
  if (!endDate) return start;
  return `${start} - ${formatEventTime(endDate)}`;
};

export const eventToScheduleRow = (event: Event, isNow = false): ScheduleRow => {
  const date = new Date(event.startDate);
  return {
    day: date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase().slice(0, 3),
    date: `${date.getMonth() + 1}/${date.getDate()}`,
    venue: event.venue,
    address: event.address || '',
    time: formatEventTimeRange(event.startDate, event.endDate).toUpperCase(),
    now: isNow,
  };
};

export const formatScheduleHeading = (events: Event[]): string => {
  if (events.length === 0) return '📍 Upcoming stops';
  const first = new Date(events[0].startDate);
  const last = new Date(events[events.length - 1].startDate);
  const fmt = (d: Date) =>
    `${d.toLocaleString('en-US', { month: 'short' })} ${d.getDate()}`;
  return `📍 ${fmt(first)} – ${fmt(last)}`;
};

export const formatNextAppearanceInfo = (event: Event): string => {
  const date = new Date(event.startDate);
  const day = date.toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
  const monthDay = date
    .toLocaleString('en-US', { month: 'long', day: 'numeric' })
    .toUpperCase();
  const time = formatEventTimeRange(event.startDate, event.endDate).toUpperCase();
  const venue = event.venue.toUpperCase();
  const address = (event.address || event.venue).toUpperCase();
  return `${day}, ${monthDay} · ${time}  •  ${venue}  •  ${address}`;
};

// TODO Phase 4: back with Review API
export const fetchReviews = async (): Promise<ReviewQuote[]> => [
  { tone: 'cream', quote: '"I drove 45 minutes for this pizza."', source: 'a reasonable person' },
  { tone: 'ink', quote: '"Terrible name. Incredible pizza."', source: 'everybody, eventually' },
  { tone: 'red', quote: '"The best food truck experience in Omaha."', source: '★★★★★' },
  { tone: 'teal', quote: '"Thanks. You\'re terrible."', source: 'Gerald, probably' },
];

// TODO Phase 4: back with PressFeature API
export const fetchPressFeatures = async (): Promise<PressFeature[]> => [
  { by: 'Hoppen Interview', what: 'Sit-down with the homies', cta: '▶ Listen Now', thumbLabel: '🎙 photo' },
  { by: 'Meat Locker Pod', what: 'Podcast appearance', cta: '▶ Listen Now', thumbLabel: '🎙 podcast' },
  { by: 'KELOLAND', what: 'TV feature', cta: '▶ Watch', thumbLabel: '📺 clip' },
  {
    by: 'Omaha World-Herald',
    what: '"Food truck serving up unique pies in Omaha"',
    cta: '▶ Read',
    thumbLabel: '📰 clipping',
  },
];

// TODO Phase 4: back with PressFeature API (TikTok embeds)
export const fetchTikTokFeatures = async (): Promise<TikTokFeature[]> => [
  { handle: '@emiliestrumlcin', views: '116K' },
  { handle: '@hr.doods', views: '67K' },
  { handle: '@piecewayforfood', views: '82K' },
  { handle: '@hangryhoppers', views: '71K' },
  { handle: '@tiktoktodelats', views: '91K' },
  { handle: '@cheeseloveshim', views: '560K' },
];

// TODO Phase 4: back with Venue API
export const fetchVenueCategories = async (): Promise<VenueCategory[]> => [
  { title: 'Breweries', description: 'Our natural habitat', icon: 'brewery' },
  { title: 'Venues', description: 'Spaces for the chaos', icon: 'building' },
  { title: 'Parks', description: 'Eat outside, weirdo', icon: 'park' },
  { title: 'Event Spots', description: 'Book us together', icon: 'event' },
];

// TODO Phase 4: back with WallItem API
export const fetchWallMoods = async (): Promise<string[]> => [
  '😐', '😑', '🍕', '😋', '😵', '★', '😬', '🤨', '😎', '😶', '🍕', '😴', '😏', '😮', '★', '😐',
];

// TODO Phase 4: back with AboutChapter API
export const fetchAboutStops = async (): Promise<AboutStop[]> => [
  { year: '2018', title: 'Bad Ideas', description: 'It begins, regrettably.' },
  { year: '2019', title: 'First Truck', description: 'Wheels acquired.' },
  { year: '2020', title: 'Gerald Is Born', description: 'A face for the chaos.' },
  { year: '2021', title: "Gettin' Weird", description: 'Names get worse. Pies get better.' },
  { year: 'NOW', title: 'Terrible Legend', description: 'Season 3 · Vol. 6.' },
];

// TODO Phase 4: back with AboutChapter API
export const fetchAboutChapters = async (): Promise<AboutChapter[]> => [
  {
    year: '2018',
    title: 'Bad Ideas',
    description:
      "It starts with a secondhand pizza oven, a half-finished trailer, and a group chat titled 'do NOT tell our spouses.' Nobody involved had run a restaurant. That felt like an advantage at the time.",
  },
  {
    year: '2019',
    title: 'First Truck',
    description:
      'Wheels acquired — barely. The first service was a Tuesday, in a gravel lot, for eleven people, three of whom were related to us. We sold out of dough by 6:40.',
  },
  {
    year: '2020',
    title: 'Gerald Is Born',
    description:
      "The mascot shows up as a joke on a sandwich board and refuses to leave. Nobody remembers whose idea he was. Everybody agrees he's the reason people started following us on purpose.",
  },
  {
    year: '2021',
    title: "Gettin' Weird",
    description:
      "Pizza names start getting worse on purpose, pies start getting better on accident. We figure out that 'unorthodox' just means we do what tastes good and apologize for the branding later.",
  },
  {
    year: '2022',
    title: 'Breweries Notice',
    description:
      'Someone at a brewery lets us park for a Friday. We never really leave. Turns out beer and wood-fired pizza want to be at the same party.',
  },
  {
    year: '2023',
    title: 'The First Wedding',
    description:
      "We cater our first wedding by accident (a regular's cousin got engaged at one of our stops). It goes well enough that we accidentally start a whole side of the business.",
  },
  {
    year: '2024',
    title: 'Somebody Filmed Us',
    description:
      "A TikTok of dough getting launched across the trailer gets 500K views overnight. We still don't fully understand why. We are not mad about it.",
  },
  {
    year: 'NOW',
    title: 'Terrible Legend',
    description:
      "Season 3 · Vol. 6. Same terrible names, same wood fire, slightly nicer truck. We still don't know what we're doing, but the pizza's really good, so it's fine.",
  },
];

// TODO Phase 4: back with AboutChapter API
export const fetchAboutValues = async (): Promise<AboutValue[]> => [
  {
    title: 'Unorthodox, On Purpose',
    description:
      'Neapolitan technique, none of the rules. If it tastes right, it goes on the pizza — even if a purist would faint.',
  },
  {
    title: 'Self-Roasting Only',
    description:
      "The 'terrible' is aimed at us, never at you. We'll make fun of our own name all day. We won't make fun of your order.",
  },
  {
    title: 'Show Up, Fire It Up',
    description:
      "No reheating, no shortcuts. Every pie is built and fired where you're standing, whether that's a brewery lot or your backyard.",
  },
];

// TODO Phase 4: back with AboutChapter API
export const fetchAboutCrew = async (): Promise<AboutCrewMember[]> => [
  { name: 'Gerald', role: 'Mascot, Vibes Officer' },
  { name: '"Hoppen"', role: 'Dough & Fire' },
  { name: 'The Regular', role: 'Front of Truck' },
  { name: "Whoever's Driving", role: 'Logistics, Mostly' },
];

// TODO Phase 4: back with CateringTier API
export const fetchCateringTiers = async (): Promise<CateringTier[]> => [
  {
    name: 'The Backyard',
    price: 'From $650',
    items: [
      'Up to 30 guests',
      '2 pizza varieties',
      '1.5 hr wood-fired service',
      'Trailer + 1 crew',
    ],
  },
  {
    name: 'The Full Send',
    price: 'From $1,400',
    items: [
      'Up to 80 guests',
      '4 pizza varieties + salad',
      '3 hr wood-fired service',
      'Trailer + 2 crew',
    ],
  },
  {
    name: 'The Whole Terrible Thing',
    price: "Let's talk",
    items: [
      '80+ guests',
      'Custom menu & specials',
      'Extended / multi-day service',
      'Full truck + crew',
    ],
  },
];

export const fetchCateringSteps = async (): Promise<CateringStep[]> => [
  { number: '01', title: 'You Reach Out', description: 'Tell us the date, headcount, and vibe.' },
  {
    number: '02',
    title: 'We Build a Quote',
    description: 'Menu, tier, and pricing back in 1–2 days.',
  },
  {
    number: '03',
    title: 'You Lock the Date',
    description: 'Deposit holds your spot on the calendar.',
  },
  {
    number: '04',
    title: 'We Show Up & Fire It Up',
    description: 'Fresh, blistered pies, made on-site.',
  },
];

// TODO Phase 4: back with MenuListItem API (non-pizza menu sections)
export const fetchMenuStarters = async (): Promise<MenuListItem[]> => [
  {
    name: 'Garlic Knots',
    description: 'Wood-fired dough knots, garlic butter, parm, side of marinara',
    price: '$9',
  },
  {
    name: 'Blistered Shishitos',
    description: 'Charred shishito peppers, flaky salt, lemon',
    price: '$8',
    tag: 'VG',
  },
  {
    name: 'Meatball Trio',
    description: 'Three wood-fired meatballs, red sauce, ricotta, basil',
    price: '$11',
  },
];

export const fetchMenuSalads = async (): Promise<MenuListItem[]> => [
  {
    name: 'The Lesser Evil',
    description: 'Arugula, shaved parm, lemon vinaigrette, pickled onion',
    price: '$9',
    tag: 'VG',
  },
  {
    name: 'Terrible Caesar',
    description: 'Romaine, garlic croutons, parm, white anchovy (optional)',
    price: '$10',
  },
];

export const fetchMenuDrinks = async (): Promise<MenuListItem[]> => [
  {
    name: "Whatever's On Tap",
    description:
      "We don't carry booze — check the host brewery's board. We just make it taste better.",
  },
  {
    name: 'Canned Soda & Sparkling Water',
    description: 'Cold, fizzy, unremarkable in the best way',
    price: '$3',
  },
  {
    name: "Kid's Lemonade",
    description: 'For the tiny humans who came along',
    price: '$3',
  },
];
