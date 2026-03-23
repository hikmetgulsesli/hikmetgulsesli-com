"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Folder, Globe, Code2, Rocket } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  icon: React.ReactNode;
  github: string | null;
  demo: string | null;
}

const categories = [
  { id: "all", label: "Tümü" },
  { id: "web", label: "Web" },
  { id: "mobil", label: "Mobil" },
  { id: "acik-kaynak", label: "Açık Kaynak" },
  { id: "freelance", label: "Freelance" },
];

function getProjectIcon(category: string) {
  switch (category) {
    case "web":
      return <Globe className="w-12 h-12 text-primary/50" strokeWidth={1.5} />;
    case "mobil":
      return <Code2 className="w-12 h-12 text-primary/50" strokeWidth={1.5} />;
    case "acik-kaynak":
      return <Folder className="w-12 h-12 text-primary/50" strokeWidth={1.5} />;
    default:
      return <Rocket className="w-12 h-12 text-primary/50" strokeWidth={1.5} />;
  }
}

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <>
      <section className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-sm font-label rounded-lg transition-colors cursor-pointer ${
              activeCategory === cat.id
                ? "bg-primary text-[var(--color-on-primary)]"
                : "bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary border border-outline-variant/20"
            }`}
            aria-pressed={activeCategory === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.slug}
            className="bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden hover:border-primary/50 hover:-translate-y-1 transition-all group"
          >
            <div className="aspect-video bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {getProjectIcon(project.category)}
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
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-label text-primary hover:underline"
                  >
                    Demo →
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
