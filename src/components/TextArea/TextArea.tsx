/**
 * TextArea Component
 */

import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  id: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, id, className, required, rows = 5, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-slate-700">
            {label}
            {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          className={cn(
            'w-full px-4 py-2.5 text-sm',
            'border rounded bg-white text-slate-800 placeholder:text-slate-400',
            'transition-colors duration-150 resize-y',
            'focus:outline-none focus:ring-2 focus:ring-brick-600 focus:border-brick-600',
            error ? 'border-red-500' : 'border-slate-300 hover:border-slate-400',
            className
          )}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          aria-invalid={error ? 'true' : undefined}
          required={required}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${id}-helper`} className="text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
