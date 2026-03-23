"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Folder, PenLine, User, Mail, ArrowRight } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  url?: string;
  action?: () => void;
  keywords?: string[];
}

const commandItems: CommandItem[] = [
  {
    id: "home",
    label: "Ana Sayfa",
    description: "Ana sayfaya git",
    icon: <FileText className="w-4 h-4" />,
    url: "/",
    keywords: ["ana", "home", "start"],
  },
  {
    id: "projects",
    label: "Projeler",
    description: "Tüm projeleri görüntüle",
    icon: <Folder className="w-4 h-4" />,
    url: "/projects",
    keywords: ["proje", "project", "portfolio", "work"],
  },
  {
    id: "blog",
    label: "Blog",
    description: "Blog yazılarını oku",
    icon: <PenLine className="w-4 h-4" />,
    url: "/blog",
    keywords: ["blog", "yazı", "writing", "post"],
  },
  {
    id: "about",
    label: "Hakkında",
    description: "Hakkımda bilgi edin",
    icon: <User className="w-4 h-4" />,
    url: "/about",
    keywords: ["hakkında", "about", "profil", "profile"],
  },
  {
    id: "contact",
    label: "İletişim",
    description: "İletişime geç",
    icon: <Mail className="w-4 h-4" />,
    url: "/contact",
    keywords: ["iletişim", "contact", "email", "message"],
  },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredItems = commandItems.filter((item) => {
    if (!query) return true;
    const searchLower = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower) ||
      item.keywords?.some((k) => k.toLowerCase().includes(searchLower))
    );
  });

  const handleSelect = useCallback(
    (item: CommandItem) => {
      if (item.url) {
        router.push(item.url);
      }
      if (item.action) {
        item.action();
      }
      onOpenChange(false);
      setQuery("");
      setSelectedIndex(0);
    },
    [router, onOpenChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (filteredItems.length === 0) break;
          setSelectedIndex((prev) =>
            prev < filteredItems.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          if (filteredItems.length === 0) break;
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredItems.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            handleSelect(filteredItems[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onOpenChange(false);
          setQuery("");
          setSelectedIndex(0);
          break;
      }
    },
    [filteredItems, selectedIndex, handleSelect, onOpenChange]
  );

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Command Palette */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Komut paleti"
        className="relative w-full max-w-xl mx-4 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-outline-variant/20">
          <Search className="w-5 h-5 text-primary" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-on-surface placeholder:text-on-surface-variant outline-none font-body"
          />
          <kbd className="hidden sm:inline-flex px-2 py-1 text-xs font-label text-on-surface-variant bg-surface-container-low rounded border border-outline-variant/20">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-on-surface-variant">
              Sonuç bulunamadı
            </div>
          ) : (
            <ul role="listbox" aria-label="Komutlar">
              {filteredItems.map((item, index) => (
                <li key={item.id}>
                  <button
                    role="option"
                    aria-selected={index === selectedIndex}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                      index === selectedIndex
                        ? "bg-primary/10 text-primary"
                        : "text-on-surface hover:bg-surface-container-low"
                    }`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="font-body text-sm">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-on-surface-variant">
                          {item.description}
                        </div>
                      )}
                    </div>
                    {index === selectedIndex && (
                      <ArrowRight className="w-4 h-4 flex-shrink-0" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-surface-container-low rounded border border-outline-variant/20 font-label">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-surface-container-low rounded border border-outline-variant/20 font-label">
                ↓
              </kbd>
              <span className="ml-1">navigasyon</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-surface-container-low rounded border border-outline-variant/20 font-label">
                ↵
              </kbd>
              <span className="ml-1">seç</span>
            </span>
          </div>
          <span className="font-label">CMD+K</span>
        </div>
      </div>
    </div>
  );
}
