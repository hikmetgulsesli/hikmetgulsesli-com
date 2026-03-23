"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

type ToastVariant = "default" | "success" | "error" | "warning" | "info";

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastProps {
  variant?: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
  action?: ToastAction;
  dismissible?: boolean;
  onDismiss: () => void;
}

const variantConfig: Record<ToastVariant, { icon: ReactNode; borderColor: string; bgColor: string }> = {
  default: {
    icon: <Info className="h-5 w-5" />,
    borderColor: "border-[var(--color-outline-variant)]",
    bgColor: "bg-[var(--color-surface-container)]",
  },
  success: {
    icon: <CheckCircle className="h-5 w-5 text-[rgb(34_197_94)]" />,
    borderColor: "border-[rgb(34_197_94)]",
    bgColor: "bg-[rgb(34_197_94_/_0.1)]",
  },
  error: {
    icon: <XCircle className="h-5 w-5 text-[rgb(239_68_68)]" />,
    borderColor: "border-[rgb(239_68_68)]",
    bgColor: "bg-[rgb(239_68_68_/_0.1)]",
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 text-[rgb(245_158_11)]" />,
    borderColor: "border-[rgb(245_158_11)]",
    bgColor: "bg-[rgb(245_158_11_/_0.1)]",
  },
  info: {
    icon: <Info className="h-5 w-5 text-[rgb(59_130_246)]" />,
    borderColor: "border-[rgb(59_130_246)]",
    bgColor: "bg-[rgb(59_130_246_/_0.1)]",
  },
};

export function Toast({
  variant = "default",
  title,
  description,
  duration = 5000,
  action,
  dismissible = true,
  onDismiss,
}: ToastProps) {
  const config = variantConfig[variant];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        ${config.bgColor} ${config.borderColor}
        border rounded-lg shadow-lg
        p-4 min-w-[300px] max-w-[400px]
        cursor-default
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 mt-0.5">{config.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--color-on-surface)]">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">{description}</p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-container)] cursor-pointer"
            >
              {action.label}
            </button>
          )}
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] cursor-pointer"
            aria-label="Kapat"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Toast context for global toast management
interface ToastItem extends Omit<ToastProps, "onDismiss"> {
  id: string;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

import { createContext, useContext, useState } from "react";

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev.slice(-2), { ...toast, id }]); // Keep max 3
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onDismiss={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export default Toast;
