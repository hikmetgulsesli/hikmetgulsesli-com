import { notFound } from "next/navigation";
import { getProjectDetail, getAllProjectSlugs, projectDetails } from "@/lib/project-detail";
import ProjectDetailClient from "./ProjectDetailClient";
import { ProjectCard } from "@/components/ui/ProjectCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectDetail(slug);

  if (!project) {
    return {
      title: "Proje Bulunamadı | Hikmet Güleşli",
    };
  }

  return {
    title: `${project.title} | Hikmet Güleşli`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.images[0] ? [project.images[0]] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectDetail(slug);

  if (!project) {
    return <ProjectNotFound />;
  }

  return <ProjectDetailClient project={project} />;
}

function ProjectNotFound() {
  // Get 3 random projects for suggestions
  const allProjects = Object.values(projectDetails).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Header Navigation */}
      <header className="bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 h-16 max-w-[1280px] mx-auto">
          <a
            href="/"
            className="text-xl font-bold text-primary tracking-widest font-headline hover:text-primary/80 transition-colors"
          >
            KINETIC_CONSOLE
          </a>
          <div className="hidden md:flex gap-8 items-center">
            <a
              href="/"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              ANA SAYFA
            </a>
            <a
              href="/projects"
              className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
            >
              PROJELER
            </a>
            <a
              href="/blog"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              BLOG
            </a>
            <a
              href="/about"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              HAKKIMDA
            </a>
            <a
              href="/contact"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              İLETİŞİM
            </a>
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
            Proje Bulunamadı
          </h1>

          <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
            Aradığınız proje mevcut değil veya URL yanlış olabilir. 
            Diğer projelerimi incelemek ister misiniz?
          </p>

          {/* Project Suggestions */}
          <div className="mb-8">
            <h2 className="font-headline text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">
              Diğer Projeler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allProjects.map((project) => (
                <a
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="block p-4 bg-surface-container rounded-lg border border-outline-variant/20 hover:border-primary transition-all duration-200 group"
                >
                  <div className="aspect-video w-full mb-3 rounded-lg overflow-hidden bg-surface-container-high relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <h3 className="font-headline text-sm font-semibold uppercase tracking-tight text-on-surface group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>

          {/* Back to Projects */}
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-headline font-semibold uppercase tracking-tight"
          >
            Tüm Projeleri Gör
          </a>
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
