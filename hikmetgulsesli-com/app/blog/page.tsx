import type { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

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
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
        <section className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">// Blog</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">Web geliştirme, programlama ve teknoloji hakkında düşüncelerim.</p>
        </section>
        {blogPosts.find((p) => p.featured) && (
          <article className="mb-12 bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
            <div className="md:flex">
              <div className="md:w-1/3 aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-6xl opacity-50">📝</span>
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-label rounded">Öne Çıkan</span>
                  <span className="text-xs text-on-surface-variant font-label">{blogPosts.find((p) => p.featured)?.date} • {blogPosts.find((p) => p.featured)?.readTime}</span>
                </div>
                <h2 className="font-headline text-2xl font-bold mb-3 hover:text-primary transition-colors">
                  <Link href={`/blog/${blogPosts.find((p) => p.featured)?.slug}`}>{blogPosts.find((p) => p.featured)?.title}</Link>
                </h2>
                <p className="text-on-surface-variant mb-4">{blogPosts.find((p) => p.featured)?.excerpt}</p>
                <Link href={`/blog/${blogPosts.find((p) => p.featured)?.slug}`} className="text-sm font-label text-primary hover:underline">Okumaya Devam Et →</Link>
              </div>
            </div>
          </article>
        )}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.filter((p) => !p.featured).map((post) => (
            <article key={post.slug} className="bg-surface-container border border-outline-variant/20 rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="text-xs text-on-surface-variant mb-3 font-label">{post.date} • {post.readTime} okuma</div>
              <span className="inline-block px-2 py-1 bg-surface-container-high text-xs font-label text-slate-400 mb-3 rounded">{post.category}</span>
              <h2 className="font-headline text-xl font-bold mb-2 hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-on-surface-variant text-sm line-clamp-2">{post.excerpt}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
