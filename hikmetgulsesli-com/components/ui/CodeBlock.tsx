"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = "typescript", filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={cn("relative group rounded-lg overflow-hidden bg-[#0d0d12] border border-outline-variant/30", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-container border-b border-outline-variant/20">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {filename && (
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider">
              {filename}
            </span>
          )}
          {!filename && language && (
            <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider">
              {language}
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1 rounded-md bg-surface-container-lowest hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-all duration-200 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100"
          aria-label="Kodu kopyala"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-primary" />
              <span className="font-label text-xs uppercase tracking-wider">Kopyalandı</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="font-label text-xs uppercase tracking-wider">Kopyala</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-4 font-label text-sm leading-relaxed text-on-surface">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
