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
  by: string;
  what: string;
  cta: string;
  thumbLabel: string;
}

export interface TikTokFeature {
  handle: string;
  views: string;
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
  year: string;
  title: string;
  description: string;
}

export interface AboutValue {
  title: string;
  description: string;
}

export interface AboutCrewMember {
  name: string;
  role: string;
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
