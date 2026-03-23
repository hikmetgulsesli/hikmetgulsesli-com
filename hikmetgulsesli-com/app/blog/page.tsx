import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { allPosts, formatDate } from "@/lib/blog";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Teknik yazılar, tutorial'lar ve düşünceler. React, Next.js, TypeScript ve web geliştirme konularında öğrendiklerimi paylaşıyorum.",
  openGraph: {
    title: "Blog | Hikmet Güleşli",
    description:
      "Teknik yazılar, tutorial'lar ve düşünceler. React, Next.js, TypeScript ve web geliştirme konularında öğrendiklerimi paylaşıyorum.",
    url: "https://hikmetgulsesli.com/blog",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog | Hikmet Güleşli",
      },
    ],
  },
  alternates: {
    canonical: "/blog",
  },
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "https://hikmetgulsesli.com" },
  { name: "Blog", url: "https://hikmetgulsesli.com/blog" },
]);

const categoryColors: Record<string, string> = {
  teknik: "text-primary border-primary/20 bg-primary/10",
  career: "text-secondary border-secondary/20 bg-secondary/10",
  kisisel: "text-tertiary border-tertiary/20 bg-tertiary/10",
  tutorial: "text-secondary-fixed-dim border-secondary-fixed-dim/20 bg-secondary-fixed-dim/10",
};

export default function BlogPage() {
  const publishedPosts = allPosts.filter((post) => post.status === "published");

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
          <nav className="flex justify-between items-center px-8 h-16 max-w-[1280px] mx-auto">
            <Link
              href="/"
              className="text-xl font-bold text-primary tracking-widest font-headline"
            >
              KINETIC_CONSOLE
            </Link>
            <div className="hidden md:flex gap-8 items-center">
              <Link
                className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
                href="/projects"
              >
                PROJECTS
              </Link>
              <Link
                className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
                href="/blog"
              >
                BLOG
              </Link>
              <Link
                className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
                href="/about"
              >
                STACK
              </Link>
              <Link
                className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
                href="/contact"
              >
                CONTACT
              </Link>
            </div>
            <button className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-md font-headline uppercase tracking-tighter font-bold text-sm hover:bg-primary/20 transition-all">
              DOWNLOAD_CV
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
          {/* Header */}
          <section className="mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">
              // Blog
            </h1>
            <p className="text-on-surface-variant text-lg">
              Teknik yazılar, tutorial&apos;lar ve düşünceler
            </p>
          </section>

          {/* Blog Posts */}
          <section className="space-y-6">
            {publishedPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-6 hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-label text-secondary-fixed-dim">
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="text-xs font-label text-outline">•</span>
                  <span className="flex items-center gap-1 text-xs font-label text-outline">
                    <Clock className="w-3 h-3" />
                    {post.readTime} dk okuma
                  </span>
                </div>
                <h2 className="font-headline text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span
                    className={cn(
                      "px-3 py-1 text-xs font-label border",
                      categoryColors[post.category] || "text-outline border-outline/20 bg-surface-container-high"
                    )}
                  >
                    {post.category.toUpperCase()}
                  </span>
                </div>
              </article>
            ))}

            {publishedPosts.length === 0 && (
              <div className="text-center py-12 text-on-surface-variant">
                <p className="font-label text-sm uppercase tracking-widest mb-2">
                  Yakında
                </p>
                <p>Daha fazla yazı eklenecek...</p>
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-primary/20 bg-surface-container-low">
          <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 w-full gap-4 max-w-[1280px] mx-auto">
            <div className="text-primary font-bold font-label text-[10px] uppercase tracking-widest">
              © 2024 SENTINEL_INTERFACE // ALL_RIGHTS_RESERVED
            </div>
            <div className="flex gap-6 font-label text-[10px] uppercase tracking-widest">
              <a
                className="text-outline hover:text-primary transition-all"
                href="https://github.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB
              </a>
              <a
                className="text-outline hover:text-primary transition-all"
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
