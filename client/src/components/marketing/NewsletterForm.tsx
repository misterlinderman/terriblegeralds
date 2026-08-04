import { useState, type CSSProperties, type FormEvent } from 'react';

interface NewsletterFormProps {
  placeholder?: string;
  buttonLabel?: string;
  onSubmit?: (email: string) => void;
  style?: CSSProperties;
}

export default function NewsletterForm({
  placeholder = 'your email address',
  buttonLabel = 'Sign Me Up',
  onSubmit,
  style,
}: NewsletterFormProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap',
        ...style,
      }}
    >
      <input
        type="email"
        required
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          flex: 1,
          minWidth: 200,
          padding: '14px 16px',
          border: 'none',
          borderRadius: 4,
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
        }}
      />
      <button
        type="submit"
        style={{
          fontFamily: 'var(--font-display)',
          textTransform: 'uppercase',
          letterSpacing: 'var(--button-tracking)',
          fontSize: '1rem',
          padding: '15px 26px',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 3,
          background: 'var(--ink)',
          color: 'var(--cream)',
          boxShadow: 'var(--offset-shadow) rgba(0,0,0,.3)',
        }}
      >
        {buttonLabel}
      </button>
    </form>
  );
}
