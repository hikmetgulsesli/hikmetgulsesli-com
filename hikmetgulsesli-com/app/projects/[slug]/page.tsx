import type { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const projectsData: Record<string, {
  title: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  category: string;
  publishedAt: string;
  client?: string;
  duration?: string;
  githubUrl?: string;
  liveUrl?: string;
}> = {
  "vesta-dashboard": {
    title: "Vesta Dashboard",
    shortDescription: "Yapay zeka destekli veri analitiği ve görselleştirme platformu.",
    description: "Vesta Dashboard, işletmelerin veri odaklı karar alma süreçlerini hızlandırmak için geliştirilmiş kapsamlı bir analitik platformdur.",
    techStack: ["Next.js", "TypeScript", "Python", "TensorFlow", "PostgreSQL", "Redis"],
    category: "Web",
    publishedAt: "2024-03-15",
    client: "TechTide AI",
    duration: "6 ay",
    githubUrl: "https://github.com/hikmetgulsesli/vesta",
    liveUrl: "#",
  },
  "e-ticaret-api": {
    title: "E-Ticaret API",
    shortDescription: "Mikroservis mimarisi ile geliştirilmiş ölçeklenebilir e-ticaret backend sistemi.",
    description: "Yüksek performans ve güvenlik öncelikli olarak tasarlanmış e-ticaret API sistemi.",
    techStack: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    category: "Web",
    publishedAt: "2024-01-20",
    duration: "4 ay",
    githubUrl: "https://github.com/hikmetgulsesli/ecommerce-api",
  },
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData[slug];
  if (!project) return { title: "Proje Bulunamadı" };
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Hikmet Güleşli`,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData[slug];

  if (!project) {
    return (
      <main className="flex-grow flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-primary mb-4">404</h1>
          <p className="text-on-surface-variant mb-6">Aradığınız proje mevcut değil.</p>
          <Link href="/projects" className="px-6 py-3 bg-primary text-[var(--color-on-primary)] rounded-lg font-bold">Projelere Dön</Link>
        </div>
      </main>
    );
  }

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "https://hikmetgulsesli.com" },
    { name: "Projeler", url: "https://hikmetgulsesli.com/projects" },
    { name: project.title, url: `https://hikmetgulsesli.com/projects/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-30" />
      <main className="flex-grow pt-24 pb-24">
        <div className="w-full h-[400px] bg-surface-container-low relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl opacity-30">📊</span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 md:px-12 -mt-20 relative z-10">
          <nav className="flex items-center gap-2 mb-6 text-sm font-label" aria-label="Breadcrumb">
            <Link href="/" className="text-on-surface-variant hover:text-primary transition-colors">Ana Sayfa</Link>
            <span className="text-on-surface-variant/50">/</span>
            <Link href="/projects" className="text-on-surface-variant hover:text-primary transition-colors">Projeler</Link>
            <span className="text-on-surface-variant/50">/</span>
            <span className="text-on-surface-variant">{project.title}</span>
          </nav>
          <header className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-8 mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-xs font-label text-primary border border-primary/20 rounded">{project.category}</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-6">{project.shortDescription}</p>
            <div className="flex flex-wrap gap-6 mb-6 text-sm font-label">
              {project.client && <div><span className="text-slate-500">Müşteri: </span><span className="text-on-surface">{project.client}</span></div>}
              {project.duration && <div><span className="text-slate-500">Süre: </span><span className="text-on-surface">{project.duration}</span></div>}
              <div><span className="text-slate-500">Tarih: </span><span className="text-on-surface">{new Date(project.publishedAt).toLocaleDateString("tr-TR", { year: "numeric", month: "long" })}</span></div>
            </div>
            <div className="mb-8">
              <p className="text-sm font-label text-slate-500 mb-3">TEKNOLOJİLER</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-surface-container-high text-xs font-label text-on-surface-variant border border-outline-variant/20 rounded">{tech}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-primary text-[var(--color-on-primary)] rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-outline-variant/30 text-on-surface rounded-lg font-bold hover:bg-surface-container-high transition-colors">Canlı Demo →</a>
              )}
            </div>
          </header>
          <section className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-8 mb-8">
            <h2 className="font-headline text-xl font-bold mb-4 flex items-center gap-2"><span className="text-primary">//</span> Proje Hakkında</h2>
            <p className="text-on-surface-variant leading-relaxed">{project.description}</p>
          </section>
          <div className="mt-8">
            <Link href="/projects" className="inline-flex items-center gap-2 text-primary hover:underline font-label">← Tüm Projelere Dön</Link>
          </div>
        </div>
      </main>
    </>
  );
}
