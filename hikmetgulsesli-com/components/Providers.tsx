"use client";

import { ToastProvider } from "@/components/ui/Toast";
import { CommandPaletteWrapper } from "@/components/ui/CommandPaletteWrapper";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ToastProvider>
      {children}
      <CommandPaletteWrapper />
    </ToastProvider>
  );
}
