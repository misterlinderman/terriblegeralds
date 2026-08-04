import { useMemo, useState, type ReactNode } from 'react';
import type { ContactInquiryType } from '../types';
import { ContactModalContext } from './contactModalContext';

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<ContactInquiryType>('catering');

  const value = useMemo(
    () => ({
      isOpen,
      inquiryType,
      openContact: (type: ContactInquiryType = 'catering') => {
        setInquiryType(type);
        setIsOpen(true);
      },
      closeContact: () => setIsOpen(false),
    }),
    [isOpen, inquiryType]
  );

  return (
    <ContactModalContext.Provider value={value}>{children}</ContactModalContext.Provider>
  );
}
