import type { Metadata } from "next";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { BlogClient } from "@/components/BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "Web geliştirme, programlama ve teknoloji hakkında yazılar.",
  openGraph: {
    title: "Blog | Hikmet Güleşli",
    description: "Web geliştirme, programlama ve teknoloji hakkında yazılar.",
    url: "https://hikmetgulsesli.com/blog",
    type: "website",
    locale: "tr_TR",
  },
  alternates: { canonical: "/blog" },
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "https://hikmetgulsesli.com" },
  { name: "Blog", url: "https://hikmetgulsesli.com/blog" },
]);

const blogPosts = [
  {
    slug: "nextjs-15-ve-yeni-ozellikler",
    title: "Next.js 15 ve Yenilikler",
    excerpt: "Next.js 15 ile gelen yeni özellikler ve geliştirme deneyimi iyileştirmeleri.",
    date: "15 Mar 2026",
    readTime: "5 dk",
    category: "Teknik",
    featured: true,
  },
  {
    slug: "typescript-5-pratik-ipuclari",
    title: "TypeScript 5 Pratik İpuçları",
    excerpt: "TypeScript 5 ile daha güvenli ve okunabilir kod yazmanın yolları.",
    date: "10 Mar 2026",
    readTime: "8 dk",
    category: "Teknik",
    featured: false,
  },
  {
    slug: "react-server-components",
    title: "React Server Components",
    excerpt: "React Server Components mimarisi ve performansa etkileri.",
    date: "5 Mar 2026",
    readTime: "12 dk",
    category: "Teknik",
    featured: false,
  },
];

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-30" />
      <div className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
        <section className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">// Blog</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">Web geliştirme, programlama ve teknoloji hakkında düşüncelerim.</p>
        </section>
        <BlogClient posts={blogPosts} />
      </div>
    </>
  );
}
