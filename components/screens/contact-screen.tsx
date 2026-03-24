"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import type { SocialLink } from "@/types";

interface ContactScreenProps {
  socialLinks: SocialLink[];
}

export function ContactScreen({ socialLinks }: ContactScreenProps) {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Stack", href: "/stack" },
    { label: "Logs", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        surname: "",
        email: "",
        projectType: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Navigation */}
      <Navigation links={navLinks} showResumeButton={false} />

      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            ESTABLISH
            <br />
            <span className="text-primary">CONNECTION</span>
          </h1>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-lg p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Surname */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label text-xs text-on-surface-variant uppercase tracking-wider">
                      Ad
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface-container border border-outline-variant/20 rounded-lg font-label text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
                      placeholder="NULL"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-xs text-on-surface-variant uppercase tracking-wider">
                      Soyad
                    </label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface-container border border-outline-variant/20 rounded-lg font-label text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
                      placeholder="NULL"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="font-label text-xs text-on-surface-variant uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant/20 rounded-lg font-label text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
                    placeholder="USER@DOMAIN.COM"
                  />
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label className="font-label text-xs text-on-surface-variant uppercase tracking-wider">
                    Proje Türü
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant/20 rounded-lg font-label text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">SELECT_PROJECT_TYPE</option>
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="consulting">Consulting</option>
                    <option value="collaboration">Open Source Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="font-label text-xs text-on-surface-variant uppercase tracking-wider">
                    Mesajınız
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant/20 rounded-lg font-label text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="ENTER_DATA..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={submitted ? "check" : "send"}
                  iconPosition="left"
                  disabled={isSubmitting || submitted}
                >
                  {submitted ? "MESAJ GÖNDERİLDİ!" : isSubmitting ? "GÖNDERİLİYOR..." : "TRANSMIT_MESSAGE"}
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            {/* Contact Info */}
            <div className="bg-surface-container-low rounded-lg p-6 space-y-6">
              <h3 className="font-headline font-bold text-lg">İletişim Bilgileri</h3>

              <div className="space-y-4">
                <a
                  href="mailto:hikmet@hikmetgulsesli.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">mail</span>
                  </div>
                  <div>
                    <p className="font-label text-xs text-on-surface-variant uppercase">Email</p>
                    <p className="font-label text-sm text-on-surface group-hover:text-primary transition-colors">
                      hikmet@hikmetgulsesli.com
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    north_east
                  </span>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                  </div>
                  <div>
                    <p className="font-label text-xs text-on-surface-variant uppercase">Konum</p>
                    <p className="font-label text-sm text-on-surface">İstanbul, Türkiye</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-surface-container-low rounded-lg p-6 space-y-6">
              <h3 className="font-headline font-bold text-lg">Bağlantılar</h3>

              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg bg-surface hover:bg-surface-container transition-colors group"
                  >
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                      {link.icon === "terminal" && "terminal"}
                      {link.icon === "share" && "share"}
                      {link.icon === "alternate_email" && "alternate_email"}
                    </span>
                    <span className="font-label text-sm text-on-surface group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </div>
                <span className="font-label text-xs text-primary uppercase">Müsaitim</span>
              </div>
              <p className="text-on-surface-variant text-sm">
                Şu anda yeni projeler için uygunum. Birlikte çalışmak isterseniz, mesaj göndermekten çekinmeyin.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="w-full px-8 py-12 border-t border-emerald-500/5">
        <div className="max-w-7xl mx-auto flex flex-col justify-between items-center gap-6">
          <nav className="hidden md:flex justify-around items-center w-full">
            <Link href="/" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">home</span>
              <span className="font-label text-sm">Home</span>
            </Link>
            <Link href="/projects" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">terminal</span>
              <span className="font-label text-sm">Projects</span>
            </Link>
            <Link href="/stack" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">layers</span>
              <span className="font-label text-sm">Stack</span>
            </Link>
            <Link href="/contact" className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined">alternate_email</span>
              <span className="font-label text-sm">Contact</span>
            </Link>
          </nav>

          <div className="flex gap-8 md:hidden">
            <Link href="/" className="text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined">home</span>
            </Link>
            <Link href="/projects" className="text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined">terminal</span>
            </Link>
            <Link href="/stack" className="text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined">layers</span>
            </Link>
            <Link href="/contact" className="text-primary">
              <span className="material-symbols-outlined">alternate_email</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
