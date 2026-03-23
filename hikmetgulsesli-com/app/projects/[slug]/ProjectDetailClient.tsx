"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { ProjectData } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";

interface ProjectDetailClientProps {
  project: ProjectData;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Top Navigation */}
      <header className="bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 h-16">
          <Link
            href="/"
            className="text-xl font-bold text-primary tracking-widest font-headline"
          >
            KINETIC_CONSOLE
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              HOME
            </Link>
            <Link
              href="/projects"
              className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
            >
              PROJECTS
            </Link>
            <Link
              href="/blog"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              BLOG
            </Link>
            <Link
              href="/about"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              STACK
            </Link>
            <Link
              href="/contact"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              CONTACT
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-24">
        {/* Hero Image */}
        <div className="w-full h-[400px] bg-surface-container-low relative overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-surface" />
        </div>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 -mt-20 relative z-10">
          {/* Back Button */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-label text-on-surface-variant hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Tüm Projelere Dön
          </Link>

          {/* Project Header */}
          <header className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-8 mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-xs font-label text-primary border border-primary/20 uppercase">
                {project.category === "web" ? "Web" : 
                 project.category === "mobile" ? "Mobil" :
                 project.category === "open-source" ? "Açık Kaynak" : "Freelance"}
              </span>
              {project.featured && (
                <span className="px-3 py-1 bg-secondary/10 text-xs font-label text-secondary border border-secondary/20 uppercase">
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
                  <span className="text-on-surface-variant">Müşteri: </span>
                  <span className="text-on-surface">{project.client}</span>
                </div>
              )}
              {project.duration && (
                <div>
                  <span className="text-on-surface-variant">Süre: </span>
                  <span className="text-on-surface">{project.duration}</span>
                </div>
              )}
              <div>
                <span className="text-on-surface-variant">Tarih: </span>
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
              <p className="text-sm font-label text-on-surface-variant mb-3 uppercase tracking-wider">
                Teknolojiler
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-3 py-1 bg-surface-container-high text-xs font-label text-on-surface-variant border border-outline-variant/20"
                  >
                    {tech.name}
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
                  className={cn(
                    "px-6 py-3 rounded-md font-bold flex items-center gap-2 transition-colors",
                    "bg-primary text-on-primary hover:bg-primary/90"
                  )}
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "px-6 py-3 border border-outline-variant/30 text-on-surface rounded-md font-bold hover:bg-surface-container-high transition-colors flex items-center gap-2"
                  )}
                >
                  Canlı Demo
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </header>

          {/* Project Description */}
          {project.description && (
            <section className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-8 mb-8">
              <h2 className="font-headline text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">//</span> Proje Hakkında
              </h2>
              <div className="text-on-surface-variant leading-relaxed">
                <p>{project.description}</p>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-primary/20 bg-surface-container-low">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 w-full gap-4">
          <div className="text-primary font-bold font-label text-[10px] uppercase tracking-widest">
            © 2024 HIKMET GÜLEŞLİ // ALL_RIGHTS_RESERVED
          </div>
          <div className="flex gap-6 font-label text-[10px] uppercase tracking-widest">
            <a
              className="text-on-surface-variant hover:text-primary transition-all"
              href="https://github.com/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-all"
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
  );
}
