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
  Venue,
  VenueCategory,
  WallItem,
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

export const fetchPressFeatures = async (): Promise<PressFeature[]> => {
  const { data } = await api.get<{ features: PressFeature[] }>('/press-features');
  return data.features;
};

export const fetchTikTokFeatures = async (): Promise<TikTokFeature[]> => {
  const { data } = await api.get<{ features: TikTokFeature[] }>('/tiktok-features');
  return data.features;
};

export const fetchVenues = async (): Promise<Venue[]> => {
  const { data } = await api.get<{ venues: Venue[] }>('/venues');
  return data.venues;
};

/** @deprecated use fetchVenues */
export const fetchVenueCategories = async (): Promise<VenueCategory[]> => {
  const venues = await fetchVenues();
  return venues.map((venue) => ({
    title: venue.name,
    description: venue.blurb,
    icon: venue.categoryIcon,
  }));
};

export const fetchWallItems = async (): Promise<WallItem[]> => {
  const { data } = await api.get<{ items: WallItem[] }>('/wall-items');
  return data.items;
};

export const fetchAboutStops = async (): Promise<AboutStop[]> => {
  const { data } = await api.get<{ chapters: AboutChapter[] }>('/about-chapters', {
    params: { home: true },
  });
  return data.chapters.map(({ year, title, description }) => ({ year, title, description }));
};

export const fetchAboutChapters = async (): Promise<AboutChapter[]> => {
  const { data } = await api.get<{ chapters: AboutChapter[] }>('/about-chapters');
  return data.chapters;
};

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

export const fetchCateringTiers = async (): Promise<CateringTier[]> => {
  const { data } = await api.get<{ tiers: CateringTier[] }>('/catering-tiers');
  return data.tiers;
};

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
