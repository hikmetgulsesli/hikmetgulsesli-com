import type { Metadata } from "next";
import { generateArticleJsonLd, generateBreadcrumbJsonLd, BASE_URL } from "@/lib/seo";

interface BlogPostPageProps {
  params: { slug: string };
}

// Sample blog post data - in production this would come from a CMS/database
const blogPosts: Record<
  string,
  {
    title: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    updatedAt: string;
    author: string;
    readTime: number;
    category: string;
    tags: string[];
    featuredImage?: string;
  }
> = {
  "building-modern-web-applications": {
    title: "Modern Web Uygulamaları Geliştirme",
    excerpt:
      "Next.js 14 ile App Router kullanarak modern web uygulamaları geliştirmek için temel ipuçları ve best practice'ler.",
    content: `# Modern Web Uygulamaları Geliştirme

Next.js 14 ile gelen App Router, React tabanlı web geliştirmede yeni bir dönem başlatıyor. Bu yazıda, modern web uygulamaları geliştirirken dikkat etmemiz gereken temel prensipleri ve en iyi uygulamaları ele alacağız.

## App Router'ın Avantajları

App Router, dosya tabanlı routing sistemiyle React Server Components (RSC) desteği sunuyor. Bu sayede:

- **Sunucu tarafında render**: SEO açısından kritik içerikler daha hızlı yüklenir
- **Streaming**: Büyük sayfaları parçalara bölerek kullanıcıya daha hızlı gösterim
- **Layout'lar**: Paylaşılan UI elementlerini tek bir yerden yönetme

## Performans İyileştirmeleri

Modern web uygulamalarında performans, kullanıcı deneyiminin temel taşlarından biridir. Next.js'in sunduğu otomatik optimizasyonlardan faydalanırken, manuel olarak da iyileştirmeler yapabiliriz.

## Sonuç

Modern web geliştirme sürekli evrilen bir alan. Next.js 14 ve React 19'un sunduğu yeniliklerle, geliştiriciler olarak daha güçlü ve performanslı uygulamalar oluşturabiliriz.`,
    publishedAt: "2024-06-16T10:00:00Z",
    updatedAt: "2024-06-16T10:00:00Z",
    author: "Hikmet Güleşli",
    readTime: 5,
    category: "Teknik",
    tags: ["Next.js", "React", "Web Development", "TypeScript"],
    featuredImage: "/og-image.png",
  },
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return {
      title: "Yazı Bulunamadı",
      description: "Aradığınız blog yazısı mevcut değil.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author, url: `${BASE_URL}/about` }],
    openGraph: {
      title: `${post.title} | Hikmet Güleşli`,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      locale: "tr_TR",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: "/og-image.png",
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Hikmet Güleşli`,
      description: post.excerpt,
      images: [post.featuredImage || "/og-image.png"],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-primary mb-4">
            404
          </h1>
          <p className="text-on-surface-variant mb-6">
            Aradığınız blog yazısı mevcut değil.
          </p>
          <a
            href="/blog"
            className="px-6 py-3 bg-primary text-on-primary rounded-md font-bold"
          >
            Blog&apos;a Dön
          </a>
        </div>
      </div>
    );
  }

  const articleSchema = generateArticleJsonLd({
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? `${BASE_URL}${post.featuredImage}` : undefined,
    authorName: post.author,
    authorUrl: `${BASE_URL}/about`,
    publisherName: "Hikmet Güleşli",
    publisherUrl: BASE_URL,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    slug,
  });

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` },
    { name: post.title, url: `${BASE_URL}/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleSchema }}
      />
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
                className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
                href="/projects"
              >
                PROJECTS
              </a>
              <a
                className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
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
        <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
          {/* Article Header */}
          <article>
            <header className="mb-12">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 mb-6 text-sm font-label">
                <a href="/" className="text-slate-500 hover:text-primary">
                  Ana Sayfa
                </a>
                <span className="text-slate-600">/</span>
                <a href="/blog" className="text-slate-500 hover:text-primary">
                  Blog
                </a>
                <span className="text-slate-600">/</span>
                <span className="text-on-surface-variant truncate max-w-[200px]">
                  {post.title}
                </span>
              </nav>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-label text-slate-500">
                  {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="text-sm font-label text-slate-500">•</span>
                <span className="text-sm font-label text-slate-500">
                  {post.readTime} dk okuma
                </span>
              </div>

              {/* Title */}
              <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-on-surface-variant leading-relaxed mb-6">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface-container-high text-xs font-label text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-invert max-w-none">
              <div className="text-on-surface-variant leading-relaxed space-y-6">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-outline-variant/20">
              <p className="text-sm font-label text-slate-500 mb-4">
                PAYLAŞ
              </p>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${BASE_URL}/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-surface-container-high text-sm font-label hover:bg-primary/10 hover:text-primary border border-outline-variant/20 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${BASE_URL}/blog/${slug}`)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-surface-container-high text-sm font-label hover:bg-primary/10 hover:text-primary border border-outline-variant/20 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={`${BASE_URL}/blog/${slug}`}
                  className="px-4 py-2 bg-surface-container-high text-sm font-label hover:bg-primary/10 hover:text-primary border border-outline-variant/20 transition-colors"
                >
                  Bağlantıyı Kopyala
                </a>
              </div>
            </div>
          </article>
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
