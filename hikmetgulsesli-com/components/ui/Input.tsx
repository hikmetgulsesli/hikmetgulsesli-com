"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  error?: boolean;
  errorMessage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const sizeClasses: Record<InputSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-5 py-4 text-lg",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      error = false,
      errorMessage,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = error || errorMessage;

    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={`
              w-full
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
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon ? "pr-10" : ""}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]">
              {rightIcon}
            </span>
          )}
        </div>
        {errorMessage && (
          <span className="text-sm text-[var(--color-error)]">{errorMessage}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
