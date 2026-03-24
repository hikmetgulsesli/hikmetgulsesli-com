"use client";

import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import type { Author, Experience, TechItem, SocialLink } from "@/types";

interface AboutScreenProps {
  author: Author;
  experiences: Experience[];
  techStack: TechItem[];
  socialLinks: SocialLink[];
}

export function AboutScreen({ author, experiences, techStack, socialLinks }: AboutScreenProps) {
  const navLinks = [
    { label: "Projects", href: "/projects" },
    { label: "Stack", href: "/stack" },
    { label: "Archive", href: "/archive" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Navigation */}
      <Navigation links={navLinks} showResumeButton={false} />

      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col items-center mb-24">
          <div className="group relative mb-8">
            <div className="w-32 h-32 rounded-full bg-surface-container flex items-center justify-center border-2 border-primary/30 group-hover:border-primary transition-colors">
              <span className="font-headline text-5xl font-bold text-primary">
                {author.name.charAt(0)}
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-sm">check</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="font-headline text-5xl font-bold mb-2">{author.name}</h1>
            <h3 className="font-headline text-xl text-on-surface-variant">{author.title}</h3>
          </div>

          {/* Resume Button */}
          <div className="mt-8">
            <Button variant="primary" size="lg" icon="download" iconPosition="left">
              DOWNLOAD CV.EXE
            </Button>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-24">
          <h2 className="font-headline text-2xl font-bold mb-12 flex items-center gap-4">
            <span className="text-primary font-label">—</span>
            Deneyim Geçmişi
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="relative pl-12 border-l border-outline-variant">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative mb-12 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-surface-container border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {exp.current && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-label uppercase rounded">
                          Current
                        </span>
                      )}
                    </div>
                    <h4 className="font-headline text-xl font-bold">{exp.title}</h4>
                    <p className="text-primary font-label text-sm">{exp.company}</p>
                    <p className="text-on-surface-variant text-sm">
                      {exp.location} |{" "}
                      {exp.startDate.toLocaleDateString("tr-TR", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {exp.current
                        ? "Devam Ediyor"
                        : exp.endDate?.toLocaleDateString("tr-TR", {
                            month: "short",
                            year: "numeric",
                          })}
                    </p>
                    <p className="text-on-surface-variant leading-relaxed pt-2">{exp.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-surface-container font-label text-[10px] text-secondary uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Column */}
            <div className="space-y-16">
              {/* Technical Skills */}
              <div>
                <h2 className="font-headline text-2xl font-bold mb-12 flex items-center gap-4">
                  <span className="text-primary font-label">—</span>
                  Teknik Yetkinlikler
                </h2>

                <div className="space-y-6">
                  {techStack.filter((t) => t.category !== "Currently Learning").map((tech) => (
                    <div key={tech.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-label text-sm">{tech.name}</span>
                        <span className="font-label text-xs text-on-surface-variant">{tech.proficiency}%</span>
                      </div>
                      <div className="h-1 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${tech.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Currently Learning */}
              <div className="bg-surface-container-low border-l-2 border-primary p-6">
                <h3 className="font-headline text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">rocket_launch</span>
                  Currently Learning
                </h3>
                <div className="space-y-4">
                  {techStack
                    .filter((t) => t.category === "Currently Learning")
                    .map((tech) => (
                      <div key={tech.id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-label text-sm">{tech.name}</span>
                          <span className="font-label text-xs text-on-surface-variant">{tech.proficiency}%</span>
                        </div>
                        <div className="h-1 bg-surface-container rounded-full overflow-hidden">
                          <div
                            className="h-full bg-tertiary rounded-full transition-all duration-500"
                            style={{ width: `${tech.proficiency}%` }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
}
