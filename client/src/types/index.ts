export interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  venue: string;
  address?: string;
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
