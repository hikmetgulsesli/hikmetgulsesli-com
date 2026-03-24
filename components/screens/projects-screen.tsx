"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import type { Project, SocialLink } from "@/types";

interface ProjectsScreenProps {
  projects: Project[];
  socialLinks: SocialLink[];
}

type FilterCategory = "TÜMÜ" | "WEB" | "MOBİL" | "AÇIK KAYNAK" | "FREELANCE";

export function ProjectsScreen({ projects, socialLinks }: ProjectsScreenProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("TÜMÜ");
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "PROJECTS", href: "/projects" },
    { label: "STACK", href: "/stack" },
    { label: "ARCHIVE", href: "/archive" },
    { label: "CONTACT", href: "/contact" },
  ];

  const filters: FilterCategory[] = ["TÜMÜ", "WEB", "MOBİL", "AÇIK KAYNAK", "FREELANCE"];

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      activeFilter === "TÜMÜ" || project.category === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Navigation */}
      <Navigation links={navLinks} showResumeButton={true} />

      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-label">—</span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter">
              PROJELER
            </h1>
          </div>
        </header>

        {/* Sticky Filter Section */}
        <section className="sticky top-20 z-40 mb-12 py-4 bg-surface/80 backdrop-blur-xl rounded-lg border border-outline-variant/10">
          <div className="flex flex-col justify-between items-center gap-6 px-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Proje Ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-12 bg-surface-container border border-outline-variant/20 rounded-md font-label text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">search</span>
              </button>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col bg-surface-container hover:bg-surface-container-high transition-all duration-300 border-l-2 border-transparent hover:border-primary overflow-hidden"
            >
              {/* Project Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-surface/80 backdrop-blur-sm rounded text-[10px] font-label text-secondary uppercase">
                  {project.category}
                </div>
              </div>

              {/* Project Info */}
              <div className="flex flex-grow flex-col p-6 border-l-2 border-primary">
                <h3 className="font-headline text-xl font-bold tracking-tight uppercase mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 flex-grow">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-surface-container-lowest font-label text-[10px] text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-auto pt-4 flex justify-between items-center">
                  {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" icon="terminal">
                        {"// GITHUB"}
                      </Button>
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="primary" size="sm" icon="chevron_right" iconPosition="right">
                        DEMO
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-outline mb-4">search_off</span>
            <p className="text-on-surface-variant">No projects match your criteria.</p>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-24 py-16 px-8 border-l-4 border-primary relative overflow-hidden bg-surface-container-low">
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="font-headline text-3xl font-bold mb-4">Bir Projeniz mi Var?</h2>
            <p className="text-on-surface-variant mb-6 max-w-xl">
              Yeni bir fikriniz mi var? Birlikte harika bir şeyler inşa edelim.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg" icon=">" iconPosition="right">
                BAŞLATALIM
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
}
