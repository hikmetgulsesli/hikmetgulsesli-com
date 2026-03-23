import type { Metadata } from "next";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Full-stack web uygulamaları, mobil uygulamalar ve açık kaynak projeler. React, Next.js, Node.js ve daha fazlasıyla geliştirdiğim çalışmalar.",
  openGraph: {
    title: "Projeler | Hikmet Güleşli",
    description:
      "Full-stack web uygulamaları, mobil uygulamalar ve açık kaynak projeler.",
    url: "https://hikmetgulsesli.com/projects",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Projeler | Hikmet Güleşli",
      },
    ],
  },
  alternates: {
    canonical: "/projects",
  },
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "https://hikmetgulsesli.com" },
  { name: "Projeler", url: "https://hikmetgulsesli.com/projects" },
]);

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <div className="min-h-screen flex flex-col">
        {/* Scanline Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

        {/* Top Navigation */}
        <header className="bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 fixed top-0 w-full z-50">
          <nav className="flex justify-between items-center px-8 h-16">
            <a
              href="/"
              className="text-xl font-bold text-primary tracking-widest font-headline"
            >
              KINETIC_CONSOLE
            </a>
            <div className="hidden md:flex gap-8 items-center">
              <a
                className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
                href="/projects"
              >
                PROJECTS
              </a>
              <a
                className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
                href="/blog"
              >
                BLOG
              </a>
              <a
                className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
                href="/about"
              >
                STACK
              </a>
              <a
                className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
                href="/contact"
              >
                CONTACT
              </a>
            </div>
            <button className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-md font-headline uppercase tracking-tighter font-bold text-sm hover:bg-primary/20 transition-all">
              DOWNLOAD_CV
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
          {/* Header */}
          <section className="mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">
              // Projeler
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl">
              Full-stack web uygulamaları, mobil uygulamalar ve açık kaynak
              projeler. Modern teknolojilerle geliştirdiğim çalışmalar.
            </p>
          </section>

          {/* Filter Bar */}
          <section className="mb-8 flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-primary text-on-primary text-sm font-label rounded-md">
              Tümü
            </button>
            <button className="px-4 py-2 bg-surface-container-high text-sm font-label text-on-surface-variant hover:bg-primary/10 hover:text-primary border border-outline-variant/20 transition-colors">
              Web
            </button>
            <button className="px-4 py-2 bg-surface-container-high text-sm font-label text-on-surface-variant hover:bg-primary/10 hover:text-primary border border-outline-variant/20 transition-colors">
              Mobil
            </button>
            <button className="px-4 py-2 bg-surface-container-high text-sm font-label text-on-surface-variant hover:bg-primary/10 hover:text-primary border border-outline-variant/20 transition-colors">
              Açık Kaynak
            </button>
            <button className="px-4 py-2 bg-surface-container-high text-sm font-label text-on-surface-variant hover:bg-primary/10 hover:text-primary border border-outline-variant/20 transition-colors">
              Freelance
            </button>
          </section>

          {/* Projects Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Card - Vesta Dashboard */}
            <article className="bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden hover:border-primary/50 transition-colors group">
              <div className="aspect-video bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl opacity-50">📊</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-headline text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  Vesta Dashboard
                </h2>
                <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">
                  Yapay zeka destekli veri analitiği ve görselleştirme platformu.
                  Gerçek zamanlı metrikler ve tahminsel analizler.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-surface-container-high text-xs font-label text-slate-400">
                    Next.js
                  </span>
                  <span className="px-2 py-1 bg-surface-container-high text-xs font-label text-slate-400">
                    TypeScript
                  </span>
                  <span className="px-2 py-1 bg-surface-container-high text-xs font-label text-slate-400">
                    Python
                  </span>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/hikmetgulsesli/vesta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-label text-primary hover:underline"
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="text-sm font-label text-primary hover:underline"
                  >
                    Demo →
                  </a>
                </div>
              </div>
            </article>

            {/* Placeholder Projects */}
            <article className="bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden hover:border-primary/50 transition-colors group">
              <div className="aspect-video bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl opacity-50">🚀</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-headline text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  E-Ticaret API
                </h2>
                <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">
                  Mikroservis mimarisi ile geliştirilmiş ölçeklenebilir e-ticaret
                  backend sistemi.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-surface-container-high text-xs font-label text-slate-400">
                    Node.js
                  </span>
                  <span className="px-2 py-1 bg-surface-container-high text-xs font-label text-slate-400">
                    PostgreSQL
                  </span>
                  <span className="px-2 py-1 bg-surface-container-high text-xs font-label text-slate-400">
                    Docker
                  </span>
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-sm font-label text-primary hover:underline"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </article>

            <article className="bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden hover:border-primary/50 transition-colors group">
              <div className="aspect-video bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-tertiary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl opacity-50">📱</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-headline text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  Mobil Uygulama
                </h2>
                <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">
                  React Native ile geliştirilen çapraz platform mobil uygulama.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-surface-container-high text-xs font-label text-slate-400">
                    React Native
                  </span>
                  <span className="px-2 py-1 bg-surface-container-high text-xs font-label text-slate-400">
                    Firebase
                  </span>
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-sm font-label text-primary hover:underline"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-primary/20 bg-surface-container-low">
          <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 w-full gap-4">
            <div className="text-primary font-bold font-label text-[10px] uppercase tracking-widest">
              © 2024 SENTINEL_INTERFACE // ALL_RIGHTS_RESERVED
            </div>
            <div className="flex gap-6 font-label text-[10px] uppercase tracking-widest">
              <a
                className="text-slate-500 hover:text-primary transition-all"
                href="https://github.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB
              </a>
              <a
                className="text-slate-500 hover:text-primary transition-all"
                href="https://linkedin.com/in/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINKEDIN
              </a>
              <span className="text-primary">TERMINAL_STATUS:ONLINE</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
