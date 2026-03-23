import type { Metadata } from "next";
import { generateBreadcrumbJsonLd, BASE_URL } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Sample project data - in production this would come from a CMS/database
const projects: Record<
  string,
  {
    title: string;
    shortDescription: string;
    description: string;
    thumbnail: string;
    images: string[];
    category: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    publishedAt: string;
    client?: string;
    duration?: string;
  }
> = {
  "vesta-dashboard": {
    title: "Vesta Dashboard",
    shortDescription:
      "Yapay zeka destekli veri analitiği ve görselleştirme platformu.",
    description:
      "Vesta Dashboard, işletmelerin veri odaklı karar alma süreçlerini hızlandırmak için geliştirilmiş kapsamlı bir analitik platformudur. Gerçek zamanlı metrikler, tahminsel analizler ve özelleştirilebilir gösterge panelleri sunar.",
    thumbnail: "/og-image.png",
    images: ["/og-image.png"],
    category: "Web",
    techStack: ["Next.js", "TypeScript", "Python", "TensorFlow", "PostgreSQL", "Redis"],
    liveUrl: "#",
    githubUrl: "https://github.com/hikmetgulsesli/vesta",
    featured: true,
    publishedAt: "2024-03-15",
    client: "TechTide AI",
    duration: "6 ay",
  },
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    return {
      title: "Proje Bulunamadı",
      description: "Aradığınız proje mevcut değil.",
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    keywords: project.techStack,
    openGraph: {
      title: `${project.title} | Hikmet Güleşli`,
      description: project.shortDescription,
      url: `${BASE_URL}/projects/${slug}`,
      type: "website",
      locale: "tr_TR",
      images: [
        {
          url: project.thumbnail,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Hikmet Güleşli`,
      description: project.shortDescription,
      images: [project.thumbnail],
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-primary mb-4">
            404
          </h1>
          <p className="text-on-surface-variant mb-6">
            Aradığınız proje mevcut değil.
          </p>
          <a
            href="/projects"
            className="px-6 py-3 bg-primary text-on-primary rounded-md font-bold"
          >
            Projelere Dön
          </a>
        </div>
      </div>
    );
  }

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: BASE_URL },
    { name: "Projeler", url: `${BASE_URL}/projects` },
    { name: project.title, url: `${BASE_URL}/projects/${slug}` },
  ]);

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
          <nav className="flex justify-between items-center px-8 h-16">
            <a
              href="/"
              className="text-xl font-bold text-primary tracking-widest font-headline"
            >
              KINETIC_CONSOLE
            </a>
            <div className="hidden md:flex gap-8 items-center">
              <a
                className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
                href="/projects"
              >
                PROJECTS
              </a>
              <a
                className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
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
        <main className="flex-grow pt-24 pb-24">
          {/* Hero Image */}
          <div className="w-full h-[400px] bg-surface-container-low relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl opacity-30">📊</span>
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="max-w-4xl mx-auto px-6 md:px-12 -mt-20 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-6 text-sm font-label">
              <a href="/" className="text-slate-500 hover:text-primary">
                Ana Sayfa
              </a>
              <span className="text-slate-600">/</span>
              <a
                href="/projects"
                className="text-slate-500 hover:text-primary"
              >
                Projeler
              </a>
              <span className="text-slate-600">/</span>
              <span className="text-on-surface-variant">{project.title}</span>
            </nav>

            {/* Project Header */}
            <header className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-8 mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-xs font-label text-primary border border-primary/20">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 bg-secondary/10 text-xs font-label text-secondary border border-secondary/20">
                    Öne Çıkan
                  </span>
                )}
              </div>

              <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {project.title}
              </h1>

              <p className="text-xl text-on-surface-variant leading-relaxed mb-6">
                {project.shortDescription}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 mb-6 text-sm font-label">
                {project.client && (
                  <div>
                    <span className="text-slate-500">Müşteri: </span>
                    <span className="text-on-surface">{project.client}</span>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <span className="text-slate-500">Süre: </span>
                    <span className="text-on-surface">{project.duration}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-500">Tarih: </span>
                  <span className="text-on-surface">
                    {new Date(project.publishedAt).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <p className="text-sm font-label text-slate-500 mb-3">
                  TEKNOLOJİLER
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-surface-container-high text-xs font-label text-on-surface-variant border border-outline-variant/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-primary text-on-primary rounded-md font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-outline-variant/30 text-on-surface rounded-md font-bold hover:bg-surface-container-high transition-colors flex items-center gap-2"
                  >
                    Canlı Demo →
                  </a>
                )}
              </div>
            </header>

            {/* Project Description */}
            <section className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-8 mb-8">
              <h2 className="font-headline text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">//</span> Proje Hakkında
              </h2>
              <div className="text-on-surface-variant leading-relaxed">
                <p>{project.description}</p>
              </div>
            </section>
          </div>
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
