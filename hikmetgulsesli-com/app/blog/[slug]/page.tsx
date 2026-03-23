import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBlogDetail, getAllBlogSlugs, blogDetails } from "@/lib/blog-detail";
import BlogDetailClient from "@/components/ui/BlogDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogDetail(slug);

  if (!post) {
    return {
      title: "Yazı Bulunamadı | Hikmet Güleşli",
    };
  }

  return {
    title: `${post.title} | Hikmet Güleşli`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogDetail(slug);

  if (!post) {
    return <BlogNotFound />;
  }

  if (post.status === "draft") {
    return <BlogDraft post={post} />;
  }

  return <BlogDetailClient post={post} />;
}

function BlogNotFound() {
  const allPosts = Object.values(blogDetails).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Header Navigation */}
      <header className="bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 h-16 max-w-[1280px] mx-auto">
          <Link
            href="/"
            className="text-xl font-bold text-primary tracking-widest font-headline hover:text-primary/80 transition-colors"
          >
            KINETIC_CONSOLE
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              ANA SAYFA
            </Link>
            <Link
              href="/projects"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              PROJELER
            </Link>
            <Link
              href="/blog"
              className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
            >
              BLOG
            </Link>
            <Link
              href="/about"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              HAKKIMDA
            </Link>
            <Link
              href="/contact"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              İLETİŞİM
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-8 py-20 text-center">
          {/* 404 Indicator */}
          <div className="font-label text-8xl font-bold text-primary/20 mb-4">
            404
          </div>

          <h1 className="font-headline text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4 text-on-surface">
            Yazı Bulunamadı
          </h1>

          <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
            Aradığınız yazı mevcut değil veya URL yanlış olabilir. 
            Diğer yazılarımı incelemek ister misiniz?
          </p>

          {/* Post Suggestions */}
          <div className="mb-8">
            <h2 className="font-headline text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">
              Diğer Yazılar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block p-4 bg-surface-container rounded-lg border border-outline-variant/20 hover:border-primary transition-all duration-200 group"
                >
                  {p.featuredImage && (
                    <div className="aspect-video w-full mb-3 rounded-lg overflow-hidden bg-surface-container-high relative">
                      <Image
                        src={p.featuredImage}
                        alt={p.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  )}
                  <h3 className="font-headline text-sm font-semibold uppercase tracking-tight text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* Back to Blog */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-headline font-semibold uppercase tracking-tight"
          >
            Tüm Yazıları Gör
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4 max-w-[1280px] mx-auto">
          <div className="text-primary font-bold font-headline">
            HİKMET GÜLEŞLİ
          </div>
          <div className="font-label text-xs tracking-mono text-on-surface-variant">
            © 2024 HİKMET GÜLEŞLİ // SYSTEM_READY
          </div>
          <div className="flex gap-6 font-label text-xs tracking-mono">
            <a
              href="https://github.com/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary underline decoration-outline/30 transition-opacity duration-200"
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com/in/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary underline decoration-outline/30 transition-opacity duration-200"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BlogDraft({ post }: { post: ReturnType<typeof getBlogDetail> }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Header Navigation */}
      <header className="bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 h-16 max-w-[1280px] mx-auto">
          <Link
            href="/"
            className="text-xl font-bold text-primary tracking-widest font-headline hover:text-primary/80 transition-colors"
          >
            KINETIC_CONSOLE
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              ANA SAYFA
            </Link>
            <Link
              href="/projects"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              PROJELER
            </Link>
            <Link
              href="/blog"
              className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
            >
              BLOG
            </Link>
            <Link
              href="/about"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              HAKKIMDA
            </Link>
            <Link
              href="/contact"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              İLETİŞİM
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-8 py-20 text-center">
          <div className="font-label text-6xl font-bold text-warning mb-4">
            TASLAK
          </div>

          <h1 className="font-headline text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 text-on-surface">
            {post?.title || "Yazı Henüz Yayınlanmadı"}
          </h1>

          <p className="text-on-surface-variant mb-8">
            Bu yazı henüz yayınlanmadı. Yakında okuyabilirsiniz.
          </p>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-headline font-semibold uppercase tracking-tight"
          >
            ← Tüm Yazılara Dön
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4 max-w-[1280px] mx-auto">
          <div className="text-primary font-bold font-headline">
            HİKMET GÜLEŞLİ
          </div>
          <div className="font-label text-xs tracking-mono text-on-surface-variant">
            © 2024 HİKMET GÜLEŞLİ // SYSTEM_READY
          </div>
          <div className="flex gap-6 font-label text-xs tracking-mono">
            <a
              href="https://github.com/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary underline decoration-outline/30 transition-opacity duration-200"
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com/in/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary underline decoration-outline/30 transition-opacity duration-200"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
