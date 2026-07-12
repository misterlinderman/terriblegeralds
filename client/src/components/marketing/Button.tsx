import { useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'red' | 'ink' | 'gold' | 'ghost' | 'ghostInverse';
type ButtonSize = 'sm' | 'md';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

const variants: Record<ButtonVariant, CSSProperties> = {
  red: {
    background: 'var(--red)',
    color: 'var(--cream)',
    boxShadow: 'var(--offset-shadow) var(--red-deep)',
  },
  ink: {
    background: 'var(--ink)',
    color: 'var(--cream)',
    boxShadow: 'var(--offset-shadow) rgba(0,0,0,.3)',
  },
  gold: {
    background: 'var(--gold)',
    color: 'var(--ink)',
    boxShadow: 'var(--offset-shadow) var(--gold-deep)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--ink)',
    border: '2.5px solid var(--ink)',
  },
  ghostInverse: {
    background: 'transparent',
    color: 'var(--cream)',
    border: '2.5px solid var(--cream)',
  },
};

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//');
}

export default function Button({
  variant = 'red',
  size = 'md',
  href,
  type = 'button',
  onClick,
  children,
  disabled = false,
  style,
  className,
}: ButtonProps) {
  const [hover, setHover] = useState(false);

  const base: CSSProperties = {
    fontFamily: 'var(--font-display)',
    textTransform: 'uppercase',
    letterSpacing: '.04em',
    fontSize: size === 'sm' ? '.82rem' : '1rem',
    padding: size === 'sm' ? '9px 16px' : '15px 26px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 9,
    borderRadius: 3,
    transition: 'var(--duration-hover)',
    textDecoration: 'none',
    opacity: disabled ? 0.5 : 1,
    ...variants[variant],
    ...style,
  };

  const hoverStyle: CSSProperties =
    !disabled && hover
      ? variant === 'ghost'
        ? { background: 'var(--ink)', color: 'var(--cream)' }
        : variant === 'ghostInverse'
          ? { background: 'var(--cream)', color: 'var(--ink)' }
          : {
              transform: 'translate(-2px,-2px)',
              boxShadow: (variants[variant].boxShadow as string)?.replace(
                'var(--offset-shadow)',
                'var(--offset-shadow-hover)'
              ),
            }
      : {};

  const sharedProps = {
    style: { ...base, ...hoverStyle },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    className,
  };

  if (href && !disabled) {
    if (isInternalHref(href)) {
      return (
        <Link to={href} {...sharedProps}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} {...sharedProps}>
      {children}
    </button>
  );
}
