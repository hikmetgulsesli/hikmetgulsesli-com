"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { ProjectGridSkeleton } from "@/components/ui/SkeletonCard";
import { getAllProjects, filterProjects, toProject, CategoryId } from "@/lib/projects";
import { cn } from "@/lib/utils";

export default function ProjectsPageClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const allProjectsData = getAllProjects();
    return filterProjects(allProjectsData, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);

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
      <main className="flex-grow pt-16">
        {/* Page Header */}
        <section className="py-16 md:py-20 px-8 md:px-12 lg:px-24 bg-surface">
          <div className="max-w-[1280px] mx-auto">
            <span className="font-label text-primary text-sm uppercase tracking-[0.3em] block mb-2">
              // portfolio
            </span>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-4">
              Projelerim
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl">
              Yüksek performanslı web uygulamaları, mobil deneyimler ve açık kaynak araçları. 
              Her proje, karmaşık problemleri zarif çözümlerle buluşturmak için tasarlandı.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <FilterBar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Projects Grid */}
        <section className="py-12 md:py-16 px-8 md:px-12 lg:px-24 bg-surface-container-low">
          <div className="max-w-[1280px] mx-auto">
            {filteredProjects.length > 0 ? (
              <>
                {/* Results count */}
                <div className="mb-8 font-label text-sm text-on-surface-variant">
                  {filteredProjects.length} proje bulundu
                  {searchQuery && (
                    <span className="ml-2">
                      — &quot;{searchQuery}&quot; için
                    </span>
                  )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 mb-6 rounded-full bg-surface-container flex items-center justify-center">
                  <Search className="w-8 h-8 text-on-surface-variant" />
                </div>
                <h3 className="font-headline text-xl font-bold mb-2 text-on-surface">
                  Filtreleme ile eşleşen proje bulunamadı
                </h3>
                <p className="text-on-surface-variant max-w-md mb-6">
                  {searchQuery
                    ? `"${searchQuery}" için sonuç bulunamadı. Farklı anahtar kelimeler deneyin.`
                    : "Bu kategoride henüz proje bulunmuyor."}
                </p>
                {(searchQuery || activeCategory !== "all") && (
                  <button
                    onClick={() => {
                      setActiveCategory("all");
                      setSearchQuery("");
                    }}
                    className="px-6 py-3 bg-primary text-on-primary font-bold rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Filtreleri Temizle
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-6 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4 max-w-[1280px] mx-auto">
          <div className="text-primary font-bold font-headline">
            HIKMET GÜLEŞLİ
          </div>
          <div className="font-label text-xs tracking-mono text-on-surface-variant">
            © 2024 HIKMET GÜLEŞLİ // SYSTEM_READY
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
            <a
              href="/source"
              className="text-on-surface-variant hover:text-primary underline decoration-outline/30 transition-opacity duration-200"
            >
              SOURCE_CODE
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
