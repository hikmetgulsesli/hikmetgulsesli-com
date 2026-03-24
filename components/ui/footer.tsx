import Link from "next/link";

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

interface FooterProps {
  socialLinks: SocialLink[];
  copyright?: string;
}

export function Footer({ socialLinks, copyright }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-12 border-t border-emerald-500/10 bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-8 flex flex-col justify-between items-center gap-6">
        {/* Social Links */}
        <div className="flex gap-8">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
            >
              <span className="material-symbols-outlined text-lg">{link.icon}</span>
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-slate-500 font-label text-xs">
          {copyright || `© ${year} Hikmet Güleşli. Tüm hakları saklıdır.`}
        </div>
      </div>
    </footer>
  );
}
