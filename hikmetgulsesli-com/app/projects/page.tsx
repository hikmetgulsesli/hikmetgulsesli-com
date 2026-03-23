import type { Metadata } from "next";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { ProjectsClient } from "@/components/ProjectsClient";

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

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-30" />

      <div className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
        <section className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">
            // Projeler
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Full-stack web uygulamaları, mobil uygulamalar ve açık kaynak
            projeler. Modern teknolojilerle geliştirdiğim çalışmalar.
          </p>
        </section>

        <ProjectsClient projects={projects} />
      </div>
    </>
  );
}
