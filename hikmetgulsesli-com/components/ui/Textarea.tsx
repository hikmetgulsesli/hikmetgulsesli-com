"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";

type TextareaSize = "sm" | "md" | "lg";

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: TextareaSize;
  error?: boolean;
  errorMessage?: string;
  showCount?: boolean;
  maxLength?: number;
  autoResize?: boolean;
}

const sizeClasses: Record<TextareaSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-5 py-4 text-lg",
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = "md",
      error = false,
      errorMessage,
      showCount = false,
      maxLength,
      autoResize = false,
      className = "",
      disabled,
      value,
      onChange,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const hasError = error || errorMessage;
    const currentLength = typeof value === "string" ? value.length : 0;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1 w-full">
        <textarea
          ref={ref}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          className={`
            w-full resize-y
            bg-[var(--color-surface-container)]
            border rounded-lg
            text-[var(--color-on-surface)]
            placeholder:text-[var(--color-outline)]
            transition-all duration-150
            cursor-text
            disabled:opacity-50 disabled:cursor-not-allowed
            ${sizeClasses[size]}
            ${hasError 
              ? "border-[var(--color-error)] ring-2 ring-[rgb(239_68_68_/_0.2)] focus:border-[var(--color-error)]" 
              : "border-[var(--color-outline-variant)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgb(16_185_129_/_0.2)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]"
            }
            ${className}
          `}
          {...props}
        />
        <div className="flex justify-between items-center">
          {errorMessage && (
            <span className="text-sm text-[var(--color-error)]">{errorMessage}</span>
          )}
          {showCount && maxLength && (
            <span className={`text-sm ml-auto ${currentLength >= maxLength ? "text-[var(--color-error)]" : "text-[var(--color-outline)]"}`}>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
