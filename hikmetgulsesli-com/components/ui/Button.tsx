"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon" | "destructive" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-container)] shadow-[0_0_10px_rgb(16_185_129_/_0.2)] hover:shadow-[0_0_20px_rgb(16_185_129_/_0.3)] hover:-translate-y-px",
  secondary:
    "bg-transparent border border-[var(--color-outline)] text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-[rgb(16_185_129_/_0.1)] hover:shadow-[0_0_10px_rgb(16_185_129_/_0.2)]",
  ghost:
    "bg-transparent text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-container)]",
  icon:
    "bg-transparent text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-container)] rounded-lg",
  destructive:
    "bg-[var(--color-error)] text-[var(--color-on-error)] hover:bg-[var(--color-error-container)]",
  link:
    "bg-transparent text-[var(--color-primary)] underline hover:text-[var(--color-primary-container)]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          inline-flex items-center justify-center gap-2
          font-medium rounded-lg
          transition-all duration-150 ease-out
          cursor-pointer
          active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
