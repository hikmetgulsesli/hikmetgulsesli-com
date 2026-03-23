"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { X } from "lucide-react";

type BadgeVariant = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "accent";
type BadgeSize = "sm" | "md";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  removable?: boolean;
  onRemove?: () => void;
  children: ReactNode;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[var(--color-surface-container-high)] text-[var(--color-on-surface-variant)]",
  primary: "bg-[rgb(16_185_129_/_0.2)] text-[var(--color-primary)]",
  secondary: "bg-[rgb(99_102_241_/_0.2)] text-[var(--color-secondary)]",
  success: "bg-[rgb(34_197_94_/_0.2)] text-[rgb(34_197_94)]",
  warning: "bg-[rgb(245_158_11_/_0.2)] text-[rgb(245_158_11)]",
  error: "bg-[rgb(239_68_68_/_0.2)] text-[rgb(239_68_68)]",
  accent: "bg-[rgb(139_92_246_/_0.2)] text-[rgb(139_92_246)]",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      removable = false,
      onRemove,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center gap-1 rounded-full font-medium
          transition-colors duration-150
          hover:text-[var(--color-primary)] hover:bg-[rgb(16_185_129_/_0.1)]
          cursor-default
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
        {removable && onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-1 hover:bg-[rgb(16_185_129_/_0.2)] rounded-full p-0.5 cursor-pointer"
            aria-label="Kaldır"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
