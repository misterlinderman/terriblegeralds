import api from './api';
import type {
  ContactFormData,
  Event,
  Faq,
  MenuItem,
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
