"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import { Navigation } from "@/components/ui/navigation";
import type { Project, SocialLink } from "@/types";

interface HomeScreenProps {
  featuredProjects: Project[];
  socialLinks: SocialLink[];
}

export function HomeScreen({ featuredProjects, socialLinks }: HomeScreenProps) {
  const navLinks = [
    { label: "PROJECTS", href: "/projects" },
    { label: "STACK", href: "/stack" },
    { label: "ARCHIVE", href: "/archive" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Navigation */}
      <Navigation links={navLinks} logoText="KINETIC_CONSOLE" showResumeButton={true} />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex flex-col justify-center px-8 md:px-24 py-20 bg-surface">
          <div className="max-w-4xl space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-surface-container-low border border-outline-variant/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                Available for work
              </span>
            </div>

            <div className="space-y-4">
              <p className="font-label text-primary text-xl tracking-tight">
                &gt; Merhaba, ben Hikmet_
              </p>
              <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter leading-none text-gradient">
                KINETIC<br />EXPERIENCES.
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                Building high-performance applications with{" "}
                <span className="text-on-surface font-semibold">React, Next.js, and TypeScript</span>.
                Focused on creating immersive digital interfaces that bridge the gap between human and machine.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/about">
                <Button variant="primary" size="lg" icon="//" iconPosition="left">
                  Hakkımda Bilgi Al
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg" icon=">" iconPosition="left">
                  Projeleri Gör
                </Button>
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 pt-12 text-on-surface-variant">
              <a
                href="https://github.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
              >
                <span className="material-symbols-outlined text-lg">terminal</span>
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
              >
                <span className="material-symbols-outlined text-lg">share</span>
                LINKEDIN
              </a>
              <a
                href="https://twitter.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
              >
                <span className="material-symbols-outlined text-lg">alternate_email</span>
                X_SOCIAL
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <span className="material-symbols-outlined">expand_more</span>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-24 px-8 md:px-24 bg-surface-container-low">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-label text-primary text-sm uppercase tracking-[0.3em] block mb-2">
                {"// featured_projects"}
              </span>
              <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter uppercase">
                Selected Works
              </h2>
            </div>
            <Link
              href="/projects"
              className="font-label text-primary hover:underline underline-offset-8 transition-all"
            >
              Tümünü Gör →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 3).map((project) => (
              <article
                key={project.id}
                className="group bg-surface-container hover:bg-surface-container-high transition-all duration-300 border-l-2 border-transparent hover:border-primary overflow-hidden"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-headline text-xl font-bold tracking-tight uppercase">
                    {project.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-surface-container-lowest font-label text-[10px] text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-24 px-8 md:px-24 bg-surface">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-label text-primary text-sm uppercase tracking-[0.3em] block mb-2">
                {"// logs_research"}
              </span>
              <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter uppercase">
                Logs & Research
              </h2>
            </div>
            <Link
              href="/blog"
              className="font-label text-primary hover:underline underline-offset-8 transition-all"
            >
              Tümünü Gör →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Blog Post 1 */}
            <article className="space-y-4">
              <div className="font-label text-xs text-on-surface-variant flex items-center gap-2">
                <span className="text-primary">Mar 10</span>
                <span>{"/"}</span>
                <span>TEKNİK</span>
              </div>
              <h3 className="font-headline text-2xl font-bold">
                Optimizing React for 60fps and Beyond
              </h3>
              <p className="text-on-surface-variant">
                A deep dive into React performance optimization techniques for building
                buttery-smooth user interfaces.
              </p>
              <div className="flex items-center gap-4 font-label text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>12 dk okuma</span>
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="space-y-4">
              <div className="font-label text-xs text-on-surface-variant flex items-center gap-2">
                <span className="text-primary">Şub 28</span>
                <span>{"/"}</span>
                <span>TEKNİK</span>
              </div>
              <h3 className="font-headline text-2xl font-bold">
                The Future of AI Agents in Development
              </h3>
              <p className="text-on-surface-variant">
                Exploring how AI agents are reshaping software development workflows
                and what it means for developers.
              </p>
              <div className="flex items-center gap-4 font-label text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>8 dk okuma</span>
              </div>
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-8 md:px-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">
              Let&apos;s build something amazing together
            </h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
              Have a project in mind? I&apos;m always open to discussing new opportunities
              and interesting ideas.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg" icon="mail" iconPosition="left">
                İletişime Geç
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer
        socialLinks={socialLinks}
        copyright={`© ${new Date().getFullYear()} Hikmet Güleşli. Tüm hakları saklıdır.`}
      />
    </div>
  );
}
