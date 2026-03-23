import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/projects", label: "Projeler" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Hakkında" },
  { href: "/contact", label: "İletişim" },
];

const socialLinks = [
  { href: "https://github.com/hikmetgulsesli", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/hikmetgulsesli", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/hikmetgulsesli", label: "X", icon: Twitter },
  { href: "mailto:iletisim@hikmetgulsesli.com", label: "Email", icon: Mail },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20 py-12 mt-auto">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Column 1: About Snippet */}
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-bold text-primary mb-4">
              HIKMET GÜLEŞLİ
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Full-Stack Developer & UI/UX Designer. Modern web teknolojileri ile dijital ürünler geliştiriyorum.
            </p>
            <a
              href="mailto:iletisim@hikmetgulsesli.com"
              className="text-sm text-on-surface-variant hover:text-primary transition-colors block"
            >
              iletisim@hikmetgulsesli.com
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-4">
              // quick_links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Icons */}
          <div className="space-y-4">
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-4">
              // social
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="text-sm">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Copyright */}
          <div className="space-y-4">
            <div className="font-label text-xs tracking-mono text-on-surface-variant">
              <p>© {currentYear} HIKMET GÜLEŞLİ</p>
              <p className="mt-1">Tüm hakları saklıdır.</p>
            </div>
            <div className="font-label text-xs tracking-mono text-outline">
              Built with Next.js
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
