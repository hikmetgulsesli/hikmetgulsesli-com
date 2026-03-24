"use client";

import Link from "next/link";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import type { Project, SocialLink } from "@/types";

interface ProjectDetailScreenProps {
  project: Project;
  socialLinks: SocialLink[];
}

export function ProjectDetailScreen({ project, socialLinks }: ProjectDetailScreenProps) {
  const navLinks = [
    { label: "PROJECTS", href: "/projects" },
    { label: "STACK", href: "/stack" },
    { label: "LOGS", href: "/blog" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Navigation */}
      <Navigation links={navLinks} showResumeButton={false} />

      <main className="flex-grow pt-24 pb-20 px-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-12 font-label text-sm text-on-surface-variant">
          <Link href="/projects" className="hover:text-primary transition-colors">
            PROJECTS
          </Link>
          <span>/</span>
          <span className="text-primary">{project.title}</span>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          {/* Project Image */}
          <div className="lg:col-span-7">
            <div className="aspect-video overflow-hidden rounded-lg border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Project Info */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div>
              <span className="font-label text-xs text-primary uppercase tracking-widest">
                {project.category}
              </span>
              <h1 className="font-headline text-5xl font-bold tracking-tight mt-2">
                {project.title.toUpperCase().replace(" ", "")}
              </h1>
            </div>

            <p className="text-on-surface-variant text-lg leading-relaxed">
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg" icon="arrow_forward" iconPosition="right">
                    VIEW_LIVE_DEMO
                  </Button>
                </Link>
              )}
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    &gt;_ SOURCE_CODE_GITHUB
                  </Button>
                </Link>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-outline-variant/20">
              <div className="space-y-1">
                <span className="font-label text-xs text-on-surface-variant uppercase">Status</span>
                <p className="font-label text-sm text-primary uppercase">{project.status}</p>
              </div>
              <div className="space-y-1">
                <span className="font-label text-xs text-on-surface-variant uppercase">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-surface-container-low font-label text-xs text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="mb-24">
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            {/* Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-outline-variant/10">
              <div className="h-3 w-3 rounded-full bg-tertiary/50" />
              <div className="h-3 w-3 rounded-full bg-primary/50" />
              <div className="h-3 w-3 rounded-full bg-secondary/50" />
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              <h2 className="font-headline text-2xl font-bold flex items-center gap-4">
                <span className="text-primary font-label">—</span>
                Project Overview
              </h2>

              <div className="prose prose-invert max-w-none space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-headline font-bold text-lg mb-4">About the Project</h3>
                    <p className="text-on-surface-variant leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-headline font-bold text-lg mb-4">Technologies Used</h3>
                      <div className="space-y-4">
                        {project.tags.map((tag) => (
                          <div key={tag} className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-lg">
                              data_object
                            </span>
                            <span className="font-label text-sm">{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-outline-variant/10">
                  <div className="bg-surface-container p-6 rounded-lg border-l-2 border-primary">
                    <span className="material-symbols-outlined text-primary text-2xl mb-4 block">
                      palette
                    </span>
                    <h4 className="font-headline font-bold mb-2">Modern UI</h4>
                    <p className="text-sm text-on-surface-variant">
                      Clean, responsive interface built with React and Tailwind CSS.
                    </p>
                  </div>
                  <div className="bg-surface-container p-6 rounded-lg border-l-2 border-primary">
                    <span className="material-symbols-outlined text-primary text-2xl mb-4 block">
                      memory
                    </span>
                    <h4 className="font-headline font-bold mb-2">Optimized Performance</h4>
                    <p className="text-sm text-on-surface-variant">
                      Lazy loading, code splitting, and efficient state management.
                    </p>
                  </div>
                  <div className="bg-surface-container p-6 rounded-lg border-l-2 border-primary">
                    <span className="material-symbols-outlined text-primary text-2xl mb-4 block">
                      insights
                    </span>
                    <h4 className="font-headline font-bold mb-2">Real-time Analytics</h4>
                    <p className="text-sm text-on-surface-variant">
                      Live data visualization with interactive charts and graphs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        <section className="mb-24">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-headline text-2xl font-bold">Related Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/projects"
              className="group flex items-center gap-4 p-6 bg-surface-container-low hover:bg-surface-container transition-all rounded-lg"
            >
              <span className="material-symbols-outlined text-2xl text-on-surface-variant group-hover:text-primary transition-colors">
                arrow_back
              </span>
              <div>
                <span className="font-label text-xs text-on-surface-variant uppercase">Previous</span>
                <p className="font-headline font-bold">View All Projects</p>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
}
