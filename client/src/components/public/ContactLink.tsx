import type { ReactNode } from 'react';
import { useContactModal } from '../../context/ContactModalContext';
import type { ContactInquiryType } from '../../types';

interface ContactLinkProps {
  className?: string;
  inquiryType?: ContactInquiryType;
  children: ReactNode;
}

export default function ContactLink({
  className,
  inquiryType = 'catering',
  children,
}: ContactLinkProps) {
  const { openContact } = useContactModal();

  return (
    <a
      href="#contact"
      className={className ? `contact-trigger ${className}` : 'contact-trigger'}
      onClick={(event) => {
        event.preventDefault();
        openContact(inquiryType);
      }}
    >
      {children}
    </a>
  );
}
