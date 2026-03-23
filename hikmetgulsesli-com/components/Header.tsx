"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/projects", label: "PROJECTS" },
  { href: "/stack", label: "STACK" },
  { href: "/archive", label: "ARCHIVE" },
  { href: "/contact", label: "CONTACT" },
];

const socialLinks = [
  { href: "https://github.com/hikmetgulsesli", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/hikmetgulsesli", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/hikmetgulsesli", label: "X", icon: Twitter },
  { href: "mailto:iletisim@hikmetgulsesli.com", label: "Email", icon: Mail },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 h-16 transition-all duration-300 ${
          isScrolled
            ? "bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/20"
            : "bg-surface-container-lowest/80 backdrop-blur-xl"
        }`}
      >
        <nav className="flex justify-between items-center px-6 md:px-8 h-full max-w-screen-2xl mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-primary tracking-widest font-headline hover:opacity-80 transition-opacity"
          >
            KINETIC_CONSOLE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Social Icons */}
          <div className="hidden md:flex gap-4 items-center">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-on-surface-variant hover:text-primary transition-colors p-2"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Menüyü aç"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-surface-container-lowest/95 backdrop-blur-xl flex flex-col"
          >
            {/* Close Button */}
            <div className="flex justify-end px-6 h-16 items-center">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                aria-label="Menüyü kapat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 flex flex-col justify-center px-6 gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-headline text-2xl font-bold tracking-tighter text-on-surface-variant hover:text-primary transition-colors block py-2"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex gap-6 justify-center pb-12"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-on-surface-variant hover:text-primary transition-colors p-2"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors py-1 group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
    </Link>
  );
}
