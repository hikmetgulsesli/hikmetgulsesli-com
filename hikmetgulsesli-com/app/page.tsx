import type { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbJsonLd, generatePersonJsonLd } from "@/lib/seo";
import { BarChart3, Rocket, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description:
    "Hikmet Güleşli - Full-Stack Developer, UI/UX Designer. Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
  openGraph: {
    title: "Hikmet Güleşli | Full-Stack Developer",
    description:
      "Hikmet Güleşli - Full-Stack Developer, UI/UX Designer. Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
    url: "https://hikmetgulsesli.com",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hikmet Güleşli - Full-Stack Developer",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

const personSchema = generatePersonJsonLd();
const breadcrumbSchema = generateBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "https://hikmetgulsesli.com" },
]);

function getFeaturedProjectIcon(slug: string) {
  switch (slug) {
    case "vesta-dashboard":
      return <BarChart3 className="w-12 h-12 text-primary/50" strokeWidth={1.5} />;
    case "e-ticaret-api":
      return <Rocket className="w-12 h-12 text-primary/50" strokeWidth={1.5} />;
    case "mobil-uygulama":
      return <Smartphone className="w-12 h-12 text-primary/50" strokeWidth={1.5} />;
    default:
      return <Rocket className="w-12 h-12 text-primary/50" strokeWidth={1.5} />;
  }
}

const featuredProjects = [
  {
    slug: "vesta-dashboard",
    title: "Vesta Dashboard",
    description:
      "Yapay zeka destekli veri analitiği ve görselleştirme platformu. Gerçek zamanlı metrikler ve tahminsel analizler.",
    tech: ["Next.js", "TypeScript", "Python"],
  },
  {
    slug: "e-ticaret-api",
    title: "E-Ticaret API",
    description:
      "Mikroservis mimarisi ile geliştirilmiş ölçeklenebilir e-ticaret backend sistemi.",
    tech: ["Node.js", "PostgreSQL", "Docker"],
  },
  {
    slug: "mobil-uygulama",
    title: "Mobil Uygulama",
    description:
      "React Native ile geliştirilen çapraz platform mobil uygulama.",
    tech: ["React Native", "Firebase"],
  },
];

const recentPosts = [
  {
    slug: "nextjs-15-ve-yeni-ozellikler",
    title: "Next.js 15 ve Yenilikler",
    date: "15 Mar 2026",
    excerpt:
      "Next.js 15 ile gelen yeni özellikler ve geliştirme deneyimi iyileştirmeleri.",
    readTime: "5 dk",
  },
  {
    slug: "typescript-5-pratik-ipuclari",
    title: "TypeScript 5 Pratik İpuçları",
    date: "10 Mar 2026",
    excerpt:
      "TypeScript 5 ile daha güvenli ve okunabilir kod yazmanın yolları.",
    readTime: "8 dk",
  },
  {
    slug: "react-server-components",
    title: "React Server Components",
    date: "5 Mar 2026",
    excerpt:
      "React Server Components mimarisi ve uygulama performansına etkileri.",
    readTime: "12 dk",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-30" />

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center px-6 md:px-12 py-20 bg-surface">
        <div className="max-w-4xl mx-auto w-full">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-surface-container border border-outline-variant/20 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              Çalışmaya uygun
            </span>
          </div>

          {/* Hero Text */}
          <div className="space-y-6">
            <p className="font-label text-primary text-lg md:text-xl tracking-tight">
              &gt; Merhaba, ben Hikmet_
            </p>
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none text-gradient">
              Full-Stack
              <br />
              Developer
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg max-w-2xl leading-relaxed">
              Modern web teknolojileri ile dijital ürünler geliştiriyorum.{" "}
              <span className="text-on-surface font-semibold">
                React, Next.js, ve TypeScript
              </span>{" "}
              konusunda uzmanım. Kullanıcı deneyimi odaklı, performanslı ve
              erişilebilir web uygulamaları oluşturma konusunda tutkuluyum.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-8">
            <Link
              href="/about"
              className="px-8 py-4 bg-primary text-[var(--color-on-primary)] font-bold rounded-lg shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:shadow-[0_0_30px_rgba(78,222,163,0.4)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <span className="font-label">//</span> Hakkımda Bilgi Al
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 border border-outline-variant/30 text-on-surface font-bold rounded-lg hover:bg-primary/5 hover:border-primary/30 transition-colors flex items-center gap-2"
            >
              <span className="font-label">&gt;</span> Projeleri Gör
            </Link>
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

      {/* Featured Projects Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight mb-2">
              // Öne Çıkan Projeler
            </h2>
            <p className="text-on-surface-variant">
              En son projelerimden bazıları
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <article
                key={project.slug}
                className="bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden hover:border-primary/50 hover:-translate-y-1 transition-all group"
              >
                <div className="aspect-video bg-surface-container-high relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                  <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {getFeaturedProjectIcon(project.slug)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-headline text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-surface-container-high text-xs font-label text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm font-label text-primary hover:underline"
                  >
                    Detaylar →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-primary hover:underline font-label"
            >
              Tümünü Gör →
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight mb-2">
              // Son Yazılar
            </h2>
            <p className="text-on-surface-variant">
              En son blog yazılarım
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-surface-container border border-outline-variant/20 rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="text-xs text-on-surface-variant mb-3 font-label">
                  {post.date} • {post.readTime} okuma
                </div>
                <h3 className="font-headline text-lg font-bold mb-2 hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-on-surface-variant text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:underline font-label"
            >
              Tüm Yazıları Gör →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Bir projeyi tartışalım
          </h2>
          <p className="text-on-surface-variant text-lg mb-8 max-w-2xl mx-auto">
            Yeni bir proje fikriniz mi var? Birlikte harika şeyler oluşturabiliriz.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-[var(--color-on-primary)] font-bold rounded-lg shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:shadow-[0_0_30px_rgba(78,222,163,0.4)] hover:-translate-y-0.5 transition-all"
          >
            İletişime Geç
          </Link>
        </div>
      </section>
    </>
  );
}
