import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface ContactModalContextValue {
  isOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
}

const ContactModalContext = createContext<ContactModalContextValue | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      openContact: () => setIsOpen(true),
      closeContact: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return (
    <ContactModalContext.Provider value={value}>{children}</ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }
  return context;
}
