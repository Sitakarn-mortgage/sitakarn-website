/**
 * Button Component
 * Internal hrefs render a React Router <Link> (no full page reload);
 * external, mailto:, tel: and #anchor hrefs render a plain <a>.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brick-600 text-white hover:bg-brick-700 focus-visible:ring-brick-600',
  secondary: 'bg-navy-700 text-white hover:bg-navy-800 focus-visible:ring-navy-700',
  outline:
    'border border-brick-600 text-brick-600 hover:bg-brick-600 hover:text-white focus-visible:ring-brick-600 bg-transparent',
  ghost: 'text-brick-600 hover:bg-brick-50 focus-visible:ring-brick-600 bg-transparent',
  gold: 'bg-gold-400 text-navy-900 hover:bg-gold-300 focus-visible:ring-gold-400 font-semibold',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-[40px] px-4 py-2 text-sm gap-1.5',
  md: 'min-h-[44px] px-6 py-2.5 text-sm gap-2',
  lg: 'min-h-[48px] px-8 py-3 text-base gap-2',
};

function isInternalRoute(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//');
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  fullWidth = false,
  as = 'button',
  href,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center font-medium text-center',
    'rounded transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      {isLoading ? (
        <svg
          className="animate-spin size-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : leftIcon ? (
        <span className="shrink-0 flex" aria-hidden="true">{leftIcon}</span>
      ) : null}
      {children}
      {!isLoading && rightIcon && (
        <span className="shrink-0 flex" aria-hidden="true">{rightIcon}</span>
      )}
    </>
  );

  if (as === 'a' && href) {
    if (isInternalRoute(href)) {
      return (
        <Link to={href} className={baseStyles}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={baseStyles}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseStyles} disabled={disabled || isLoading} aria-busy={isLoading} {...props}>
      {content}
    </button>
  );
}
