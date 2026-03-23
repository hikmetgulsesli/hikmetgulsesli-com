import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-label",
  display: "swap",
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Top Navigation */}
      <header className="bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 h-16">
          <div className="text-xl font-bold text-primary tracking-widest font-headline">
            KINETIC_CONSOLE
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a
              className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
              href="/projects"
            >
              PROJECTS
            </a>
            <a
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
              href="/stack"
            >
              STACK
            </a>
            <a
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
              href="/archive"
            >
              ARCHIVE
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
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center px-8 md:px-24 py-20 bg-surface">
          <div className="max-w-4xl space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-surface-container border border-outline-variant/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                Available for work
              </span>
            </div>

            {/* Hero Text */}
            <div className="space-y-4">
              <p className="font-label text-primary text-xl tracking-tight">
                &gt; Merhaba, ben Hikmet_
              </p>
              <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter leading-none text-gradient">
                KINETIC
                <br />
                EXPERIENCES.
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                Building high-performance applications with{" "}
                <span className="text-on-surface font-semibold">
                  React, Next.js, and TypeScript
                </span>
                . Focused on creating immersive digital interfaces that bridge
                the gap between human and machine.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 bg-primary text-on-primary font-bold rounded-md shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:scale-105 transition-transform flex items-center gap-2">
                <span className="font-label">//</span> Hakkımda Bilgi Al
              </button>
              <button className="px-8 py-4 border border-outline-variant/30 text-on-surface font-bold rounded-md hover:bg-primary/5 transition-colors flex items-center gap-2">
                <span className="font-label">&gt;</span> Projeleri Gör
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 pt-12 text-on-surface-variant">
              <a
                className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
                href="https://github.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GITHUB
              </a>
              <a
                className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
                href="https://linkedin.com/in/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LINKEDIN
              </a>
              <a
                className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
                href="https://x.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X_SOCIAL
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <svg
              className="w-6 h-6 text-on-surface-variant"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-6 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4">
          <div className="text-primary font-bold font-headline">
            HIKMET GÜLEŞLİ
          </div>
          <div className="font-label text-xs tracking-mono text-on-surface-variant">
            © 2024 HIKMET GÜLEŞLİ // SYSTEM_READY
          </div>
          <div className="flex gap-6 font-label text-xs tracking-mono">
            <a
              className="text-on-surface-variant hover:text-primary underline decoration-outline/30 transition-opacity duration-200"
              href="https://github.com/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </a>
            <a
              className="text-on-surface-variant hover:text-primary underline decoration-outline/30 transition-opacity duration-200"
              href="https://linkedin.com/in/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN
            </a>
            <a
              className="text-on-surface-variant hover:text-primary underline decoration-outline/30 transition-opacity duration-200"
              href="/source"
            >
              SOURCE_CODE
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
