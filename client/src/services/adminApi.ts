import api from './api';
import type {
  ContactInquiryType,
  ContactSubmission,
  ContactStatus,
  CateringTier,
  Event,
  Faq,
  MenuItem,
  PressFeature,
  SiteContentEntry,
  TikTokFeature,
  Venue,
} from '../types';

export interface AdminContactListFilters {
  status?: ContactStatus;
  inquiryType?: ContactInquiryType;
}

export const adminEvents = {
  list: async (): Promise<Event[]> => {
    const { data } = await api.get<{ events: Event[] }>('/admin/events');
    return data.events;
  },
  create: async (payload: Partial<Event>): Promise<Event> => {
    const { data } = await api.post<Event>('/admin/events', payload);
    return data;
  },
  update: async (id: string, payload: Partial<Event>): Promise<Event> => {
    const { data } = await api.put<Event>(`/admin/events/${id}`, payload);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/admin/events/${id}`);
  },
};

export const adminMenu = {
  list: async (): Promise<MenuItem[]> => {
    const { data } = await api.get<{ items: MenuItem[] }>('/admin/menu');
    return data.items;
  },
  create: async (payload: Partial<MenuItem>): Promise<MenuItem> => {
    const { data } = await api.post<MenuItem>('/admin/menu', payload);
    return data;
  },
  update: async (id: string, payload: Partial<MenuItem>): Promise<MenuItem> => {
    const { data } = await api.put<MenuItem>(`/admin/menu/${id}`, payload);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/admin/menu/${id}`);
  },
};

export const adminCateringTiers = {
  list: async (): Promise<CateringTier[]> => {
    const { data } = await api.get<{ tiers: CateringTier[] }>('/admin/catering-tiers');
    return data.tiers;
  },
  create: async (payload: Partial<CateringTier>): Promise<CateringTier> => {
    const { data } = await api.post<CateringTier>('/admin/catering-tiers', payload);
    return data;
  },
  update: async (id: string, payload: Partial<CateringTier>): Promise<CateringTier> => {
    const { data } = await api.put<CateringTier>(`/admin/catering-tiers/${id}`, payload);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/admin/catering-tiers/${id}`);
  },
};

export const adminVenues = {
  list: async (): Promise<Venue[]> => {
    const { data } = await api.get<{ venues: Venue[] }>('/admin/venues');
    return data.venues;
  },
  create: async (payload: Partial<Venue>): Promise<Venue> => {
    const { data } = await api.post<Venue>('/admin/venues', payload);
    return data;
  },
  update: async (id: string, payload: Partial<Venue>): Promise<Venue> => {
    const { data } = await api.put<Venue>(`/admin/venues/${id}`, payload);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/admin/venues/${id}`);
  },
};

export const adminPressFeatures = {
  list: async (): Promise<PressFeature[]> => {
    const { data } = await api.get<{ features: PressFeature[] }>('/admin/press-features');
    return data.features;
  },
  create: async (payload: Partial<PressFeature>): Promise<PressFeature> => {
    const { data } = await api.post<PressFeature>('/admin/press-features', payload);
    return data;
  },
  update: async (id: string, payload: Partial<PressFeature>): Promise<PressFeature> => {
    const { data } = await api.put<PressFeature>(`/admin/press-features/${id}`, payload);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/admin/press-features/${id}`);
  },
};

export const adminTikTokFeatures = {
  list: async (): Promise<TikTokFeature[]> => {
    const { data } = await api.get<{ features: TikTokFeature[] }>('/admin/tiktok-features');
    return data.features;
  },
  create: async (payload: Partial<TikTokFeature>): Promise<TikTokFeature> => {
    const { data } = await api.post<TikTokFeature>('/admin/tiktok-features', payload);
    return data;
  },
  update: async (id: string, payload: Partial<TikTokFeature>): Promise<TikTokFeature> => {
    const { data } = await api.put<TikTokFeature>(`/admin/tiktok-features/${id}`, payload);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/admin/tiktok-features/${id}`);
  },
};

export const adminFaqs = {
  list: async (): Promise<Faq[]> => {
    const { data } = await api.get<{ faqs: Faq[] }>('/admin/faqs');
    return data.faqs;
  },
  create: async (payload: Partial<Faq>): Promise<Faq> => {
    const { data } = await api.post<Faq>('/admin/faqs', payload);
    return data;
  },
  update: async (id: string, payload: Partial<Faq>): Promise<Faq> => {
    const { data } = await api.put<Faq>(`/admin/faqs/${id}`, payload);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/admin/faqs/${id}`);
  },
};

export const adminContent = {
  list: async (): Promise<SiteContentEntry[]> => {
    const { data } = await api.get<{ entries: SiteContentEntry[] }>('/admin/content');
    return data.entries;
  },
  create: async (payload: Partial<SiteContentEntry>): Promise<SiteContentEntry> => {
    const { data } = await api.post<SiteContentEntry>('/admin/content', payload);
    return data;
  },
  update: async (id: string, payload: Partial<SiteContentEntry>): Promise<SiteContentEntry> => {
    const { data } = await api.put<SiteContentEntry>(`/admin/content/${id}`, payload);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/admin/content/${id}`);
  },
};

export const adminContact = {
  list: async (filters?: AdminContactListFilters): Promise<ContactSubmission[]> => {
    const params: AdminContactListFilters = {};
    if (filters?.status) params.status = filters.status;
    if (filters?.inquiryType) params.inquiryType = filters.inquiryType;

    const { data } = await api.get<{ submissions: ContactSubmission[] }>('/admin/contact', {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
    return data.submissions;
  },
  updateStatus: async (id: string, status: ContactStatus): Promise<ContactSubmission> => {
    const { data } = await api.patch<ContactSubmission>(`/admin/contact/${id}`, { status });
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await api.delete(`/admin/contact/${id}`);
  },
};
