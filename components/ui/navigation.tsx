"use client";

import Link from "next/link";
import { useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface NavigationProps {
  links: NavLink[];
  logoText?: string;
  showResumeButton?: boolean;
}

export function Navigation({
  links,
  logoText = "KINETIC_CONSOLE",
  showResumeButton = true,
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.05)] fixed top-0 w-full z-50">
      <nav className="flex justify-between items-center px-8 h-16 w-full max-w-none">
        <Link
          href="/"
          className="text-xl font-bold text-emerald-500 tracking-widest font-headline"
        >
          {logoText}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-headline uppercase tracking-tighter font-bold text-slate-400 hover:text-emerald-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {showResumeButton && (
          <button className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg font-headline uppercase tracking-tighter font-bold text-sm hover:bg-primary/20 transition-all scale-95 active:opacity-80">
            DOWNLOAD_CV
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-emerald-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-emerald-500/10 px-4 py-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-headline uppercase tracking-tighter font-bold text-slate-400 hover:text-emerald-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {showResumeButton && (
            <button className="w-full bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg font-headline uppercase tracking-tighter font-bold text-sm">
              DOWNLOAD_CV
            </button>
          )}
        </div>
      )}
    </header>
  );
}
