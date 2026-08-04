export type EventCategory = 'brewery' | 'park' | 'venue' | 'event';

export interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  venue: string;
  address?: string;
  category: EventCategory;
  startDate: string;
  endDate?: string;
  mapUrl?: string;
  ticketUrl?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

export interface MenuItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imagePath: string;
  sortOrder: number;
  active: boolean;
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
  sortOrder: number;
  published: boolean;
}

export interface SiteContentEntry {
  _id: string;
  key: string;
  section: string;
  label: string;
  value: string;
}

export type ContactStatus = 'new' | 'read' | 'archived';
export type ContactInquiryType = 'general' | 'catering';

export interface ContactSubmission {
  _id: string;
  inquiryType: ContactInquiryType;
  name: string;
  email: string;
  phone: string;
  eventDate?: string;
  location?: string;
  eventZip?: string;
  guestCount?: string;
  referralSource?: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

export interface ContactFormData {
  inquiryType: ContactInquiryType;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  location: string;
  eventZip: string;
  guestCount: string;
  referralSource: string;
  message: string;
}

export interface ZipValidationResult {
  valid: boolean;
  distanceMiles?: number;
  message?: string;
}

export interface ReviewQuote {
  tone: 'cream' | 'ink' | 'red' | 'teal';
  quote: string;
  source: string;
}

export interface PressFeature {
  _id: string;
  outlet: string;
  blurb: string;
  ctaLabel: string;
  thumbLabel: string;
  linkUrl?: string;
  sortOrder: number;
  active: boolean;
}

export interface TikTokFeature {
  _id: string;
  handle: string;
  views: string;
  linkUrl?: string;
  sortOrder: number;
  active: boolean;
}

export type VenueCategoryIcon = 'brewery' | 'building' | 'park' | 'event';

export interface Venue {
  _id: string;
  name: string;
  categoryIcon: VenueCategoryIcon;
  blurb: string;
  sortOrder: number;
  active: boolean;
}

/** @deprecated Prefer Venue from the API */
export interface VenueCategory {
  title: string;
  description: string;
  icon: VenueCategoryIcon;
}

export interface AboutStop {
  year: string;
  title: string;
  description: string;
}

export interface AboutChapter {
  _id: string;
  year: string;
  title: string;
  description: string;
  showOnHome: boolean;
  sortOrder: number;
  active: boolean;
}

export interface AboutValue {
  title: string;
  description: string;
}

export interface AboutCrewMember {
  name: string;
  role: string;
}

export interface WallItem {
  _id: string;
  caption: string;
  imageUrl?: string;
  linkUrl?: string;
  sortOrder: number;
  active: boolean;
}

export interface ThemePreset {
  _id?: string;
  name: string;
  bone: string;
  bone2: string;
  cream: string;
  ink: string;
  inkSoft: string;
  red: string;
  redDeep: string;
  gold: string;
  goldDeep: string;
  teal: string;
  paperLine: string;
  fontDisplay: string;
  fontEditorial: string;
  fontAccent: string;
  fontBody: string;
  fontMono: string;
  displayTracking: string;
  buttonTracking: string;
  active?: boolean;
  sortOrder: number;
}

export interface MenuListItem {
  name: string;
  description: string;
  price?: string;
  tag?: string;
}

export interface CateringTier {
  _id: string;
  name: string;
  price: string;
  includes: string[];
  blurb?: string;
  sortOrder: number;
  active: boolean;
}

export interface CateringStep {
  number: string;
  title: string;
  description: string;
}
