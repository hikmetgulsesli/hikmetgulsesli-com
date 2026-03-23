import type { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Full-stack web uygulamaları, mobil uygulamalar ve açık kaynak projeler. React, Next.js, Node.js ve daha fazlasıyla geliştirdiğim çalışmalar.",
  openGraph: {
    title: "Projeler | Hikmet Güleşli",
    description: "Full-stack web uygulamaları, mobil uygulamalar ve açık kaynak projeler.",
    url: "https://hikmetgulsesli.com/projects",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "/projects",
  },
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "https://hikmetgulsesli.com" },
  { name: "Projeler", url: "https://hikmetgulsesli.com/projects" },
]);

const projects = [
  {
    slug: "vesta-dashboard",
    title: "Vesta Dashboard",
    description:
      "Yapay zeka destekli veri analitiği ve görselleştirme platformu. Gerçek zamanlı metrikler ve tahminsel analizler ile işletmelere değer katıyor.",
    tech: ["Next.js", "TypeScript", "Python", "TensorFlow"],
    category: "web",
    emoji: "📊",
    github: "https://github.com/hikmetgulsesli/vesta",
    demo: "https://vesta-demo.vercel.app",
  },
  {
    slug: "e-ticaret-api",
    title: "E-Ticaret API",
    description:
      "Mikroservis mimarisi ile geliştirilmiş ölçeklenebilir e-ticaret backend sistemi. Yüksek performans ve güvenlik.",
    tech: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    category: "web",
    emoji: "🚀",
    github: "https://github.com/hikmetgulsesli/ecommerce-api",
    demo: null,
  },
  {
    slug: "mobil-uygulama",
    title: "Sağlık Takip Uygulaması",
    description:
      "React Native ile geliştirilen çapraz platform mobil uygulama. Günlük sağlık metriklerini takip etmenizi sağlar.",
    tech: ["React Native", "Firebase", "TypeScript"],
    category: "mobil",
    emoji: "📱",
    github: "https://github.com/hikmetgulsesli/health-tracker",
    demo: null,
  },
  {
    slug: "acik-kaynak-kutuphane",
    title: "React Hooks Kütüphanesi",
    description:
      "Sık kullanılan React hook'larını bir araya getiren açık kaynak kütüphane. TypeScript ile yazılmıştır.",
    tech: ["React", "TypeScript", "Rollup"],
    category: "acik-kaynak",
    emoji: "📚",
    github: "https://github.com/hikmetgulsesli/react-hooks-lib",
    demo: "https://react-hooks-lib.vercel.app",
  },
  {
    slug: "portfolyo-site",
    title: "Kişisel Portfolyo",
    description:
      "Modern ve etkileyici kişisel portfolyo websitesi. Bu site, kendi çalışmalarımı sergilemek için tasarlandı.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "freelance",
    emoji: "🎨",
    github: "https://github.com/hikmetgulsesli/portfolio",
    demo: "https://hikmetgulsesli.com",
  },
  {
    slug: "blog-platformu",
    title: "Markdown Blog Platformu",
    description:
      "MDX destekli, SEO optimize blog platformu. Kolay içerik oluşturma ve hızlı performans.",
    tech: ["Next.js", "MDX", "TypeScript", "Tailwind CSS"],
    category: "web",
    emoji: "✍️",
    github: "https://github.com/hikmetgulsesli/blog-platform",
    demo: "https://blog.hikmetgulsesli.com",
  },
];

const categories = [
  { id: "all", label: "Tümü" },
  { id: "web", label: "Web" },
  { id: "mobil", label: "Mobil" },
  { id: "acik-kaynak", label: "Açık Kaynak" },
  { id: "freelance", label: "Freelance" },
];

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-30" />

      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
        <section className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">
            // Projeler
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Full-stack web uygulamaları, mobil uygulamalar ve açık kaynak
            projeler. Modern teknolojilerle geliştirdiğim çalışmalar.
          </p>
        </section>

        <section className="mb-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-4 py-2 text-sm font-label rounded-lg transition-colors cursor-pointer ${
                cat.id === "all"
                  ? "bg-primary text-[var(--color-on-primary)]"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary border border-outline-variant/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden hover:border-primary/50 hover:-translate-y-1 transition-all group"
            >
              <div className="aspect-video bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl opacity-50">{project.emoji}</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-headline text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h2>
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
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-label text-primary hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <Link
                      href={project.demo}
                      className="text-sm font-label text-primary hover:underline"
                    >
                      Demo →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
