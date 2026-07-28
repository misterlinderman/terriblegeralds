import { createContext } from 'react';
import type { ContactInquiryType } from '../types';

export interface ContactModalContextValue {
  isOpen: boolean;
  inquiryType: ContactInquiryType;
  openContact: (type?: ContactInquiryType) => void;
  closeContact: () => void;
}

export const ContactModalContext = createContext<ContactModalContextValue | undefined>(
  undefined
);
