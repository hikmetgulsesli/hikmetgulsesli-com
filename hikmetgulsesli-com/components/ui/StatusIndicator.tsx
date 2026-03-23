"use client";

import { forwardRef, type HTMLAttributes } from "react";

type Status = "online" | "offline" | "busy" | "away";
type StatusSize = "sm" | "md" | "lg";

interface StatusIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  status: Status;
  size?: StatusSize;
  showLabel?: boolean;
  animate?: boolean;
}

const sizeClasses: Record<StatusSize, string> = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const colorClasses: Record<Status, string> = {
  online: "bg-[rgb(34_197_94)]",
  offline: "bg-[var(--color-outline)]",
  busy: "bg-[rgb(239_68_68)]",
  away: "bg-[rgb(245_158_11)]",
};

const labelText: Record<Status, string> = {
  online: "Çevrimiçi",
  offline: "Çevrimdışı",
  busy: "Meşgul",
  away: "Uzak",
};

export const StatusIndicator = forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ status, size = "md", showLabel = false, animate = true, className = "", ...props }, ref) => {
    const shouldAnimate = animate && status === "online";

    return (
      <div
        ref={ref}
        role="status"
        aria-label={labelText[status]}
        className={`inline-flex items-center gap-2 ${className}`}
        {...props}
      >
        <span className="relative inline-flex">
          <span
            className={`
              ${sizeClasses[size]} ${colorClasses[status]} rounded-full
              ${shouldAnimate ? "animate-ping" : ""}
            `}
            style={{
              animation: shouldAnimate ? "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" : undefined,
            }}
          />
          <span
            className={`
              absolute inset-0 ${sizeClasses[size]} ${colorClasses[status]} rounded-full
            `}
          />
        </span>
        {showLabel && (
          <span className="text-sm text-[var(--color-on-surface-variant)]">
            {labelText[status]}
          </span>
        )}
      </div>
    );
  }
);

StatusIndicator.displayName = "StatusIndicator";

export default StatusIndicator;
