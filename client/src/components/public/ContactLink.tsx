import type { ReactNode } from 'react';
import { useContactModal } from '../../context/ContactModalContext';

interface ContactLinkProps {
  className?: string;
  children: ReactNode;
}

export default function ContactLink({ className, children }: ContactLinkProps) {
  const { openContact } = useContactModal();

  return (
    <a
      href="#contact"
      className={className ? `contact-trigger ${className}` : 'contact-trigger'}
      onClick={(event) => {
        event.preventDefault();
        openContact();
      }}
    >
      {children}
    </a>
  );
}
