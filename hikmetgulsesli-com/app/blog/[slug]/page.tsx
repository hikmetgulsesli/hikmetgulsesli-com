import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { ShareButtons } from "@/components/ui/ShareButtons";

interface BlogPostPageProps {
  params: { slug: string };
}

const blogPostsData: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  readTime: number;
  category: string;
  tags: string[];
}> = {
  "nextjs-15-ve-yeni-ozellikler": {
    title: "Next.js 15 ve Yenilikler",
    excerpt: "Next.js 15 ile gelen yeni özellikler ve geliştirme deneyimi iyileştirmeleri.",
    content: `## Next.js 15 Yenilikleri

Next.js 15, React 19 desteği ile birlikte geliyor. Bu sürümde birçok iyileştirme ve yeni özellik bulunuyor.

### React 19 Desteği

Next.js 15, React 19 ile tam uyumluluk sunuyor. Bu, geliştiricilerin en son React özelliklerinden yararlanmasını sağlıyor.

### Sonuç

Next.js 15 ile birlikte web geliştirme deneyimi daha da iyileşiyor.`,
    publishedAt: "2026-03-15T10:00:00Z",
    author: "Hikmet Güleşli",
    readTime: 5,
    category: "Teknik",
    tags: ["Next.js", "React"],
  },
  "typescript-5-pratik-ipuclari": {
    title: "TypeScript 5 Pratik İpuçları",
    excerpt: "TypeScript 5 ile daha güvenli ve okunabilir kod yazmanın yolları.",
    content: `## TypeScript 5 İpuçları

TypeScript 5, geliştiricilere daha güvenli kod yazma imkanı sunuyor.

### const Type Parameters

TypeScript 5 ile birlikte gelen yeni özellikler kod kalitesini artırıyor.

### Sonuç

TypeScript 5 ile birlikte daha az hata yapan uygulamalar geliştirebilirsiniz.`,
    publishedAt: "2026-03-10T10:00:00Z",
    author: "Hikmet Güleşli",
    readTime: 8,
    category: "Teknik",
    tags: ["TypeScript", "JavaScript"],
  },
  "react-server-components": {
    title: "React Server Components",
    excerpt: "React Server Components mimarisi ve uygulama performansına etkileri.",
    content: `## React Server Components Nedir?

React Server Components, sunucu tarafında çalışan bileşenlerdir.

### Avantajları

- Daha hızlı sayfa yüklemeleri
- Azaltılmış JavaScript bundle boyutu
- Direct veritabanı erişimi

### Sonuç

RSC, modern web geliştirmenin geleceği yönünde önemli bir adım.`,
    publishedAt: "2026-03-05T10:00:00Z",
    author: "Hikmet Güleşli",
    readTime: 12,
    category: "Teknik",
    tags: ["React", "Next.js"],
  },
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const slug = params.slug;
  const post = blogPostsData[slug];
  if (!post) return { title: "Yazı Bulunamadı" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Hikmet Güleşli`,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = params.slug;
  const post = blogPostsData[slug];

  if (!post) {
    return (
      <div className="flex-grow flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-primary mb-4">404</h1>
          <p className="text-on-surface-variant mb-6">Aradığınız yazı mevcut değil.</p>
          <Link href="/blog" className="px-6 py-3 bg-primary text-[var(--color-on-primary)] rounded-lg font-bold">Blog'a Dön</Link>
        </div>
      </div>
    );
  }

  const baseUrl = "https://hikmetgulsesli.com";
  const articleSchema = generateArticleJsonLd({
    headline: post.title,
    description: post.excerpt,
    authorName: post.author,
    authorUrl: `${baseUrl}/about`,
    publisherName: "Hikmet Güleşli",
    publisherUrl: baseUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    slug,
  });

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: baseUrl },
    { name: "Blog", url: `${baseUrl}/blog` },
    { name: post.title, url: `${baseUrl}/blog/${slug}` },
  ]);

  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements = [] as React.ReactElement[];
    let currentListItems: string[] = [];
    let keyCounter = 0;

    const flushList = () => {
      if (currentListItems.length === 0) return;
      const listKey = `list-${keyCounter++}`;
      elements.push(
        <ul key={listKey} className="list-disc ml-6 mb-4 text-on-surface-variant">
          {currentListItems.map((item, idx) => (
            <li key={idx} className="mb-2">{item}</li>
          ))}
        </ul>
      );
      currentListItems = [];
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={keyCounter++} className="font-headline text-2xl font-bold mt-12 mb-4 text-primary">
            {line.replace("## ", "")}
          </h2>
        );
        return;
      }

      if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={keyCounter++} className="font-headline text-xl font-semibold mt-8 mb-3">
            {line.replace("### ", "")}
          </h3>
        );
        return;
      }

      if (line.startsWith("- ")) {
        currentListItems.push(line.replace("- ", ""));
        return;
      }

      if (trimmed === "") {
        flushList();
        elements.push(<div key={keyCounter++} className="h-4" />);
        return;
      }

      flushList();
      elements.push(
        <p key={keyCounter++} className="text-on-surface-variant leading-relaxed mb-4">
          {line}
        </p>
      );
    });

    flushList();
    return elements;
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-30" />
      <div className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <article className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 mb-8 text-sm font-label" aria-label="Breadcrumb">
            <Link href="/" className="text-on-surface-variant hover:text-primary transition-colors">Ana Sayfa</Link>
            <span className="text-on-surface-variant/50">/</span>
            <Link href="/blog" className="text-on-surface-variant hover:text-primary transition-colors">Blog</Link>
            <span className="text-on-surface-variant/50">/</span>
            <span className="text-on-surface-variant truncate max-w-[200px]">{post.title}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <time dateTime={post.publishedAt} className="text-sm font-label text-on-surface-variant">
              {new Date(post.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <span className="text-on-surface-variant/50">•</span>
            <span className="text-sm font-label text-on-surface-variant">{post.readTime} dk okuma</span>
          </div>
          <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
          <p className="text-xl text-on-surface-variant leading-relaxed mb-8">{post.excerpt}</p>
          <div className="flex gap-2 flex-wrap mb-12">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-surface-container-high text-xs font-label text-primary border border-primary/20 rounded">{tag}</span>
            ))}
          </div>
          <div className="prose max-w-none">{renderContent(post.content)}</div>
          <div className="mt-12 pt-8 border-t border-outline-variant/20">
            <p className="text-sm font-label uppercase tracking-wider text-on-surface-variant mb-4">Paylaş</p>
            <ShareButtons title={post.title} url={`${baseUrl}/blog/${slug}`} />
          </div>
          <div className="mt-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline font-label">← Tüm Yazılara Dön</Link>
          </div>
        </article>
      </div>
    </>
  );
}
