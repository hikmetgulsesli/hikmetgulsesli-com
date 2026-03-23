"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  category: "web" | "mobile" | "open-source" | "freelance";
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group bg-surface-container border border-outline-variant/30 rounded-xl overflow-hidden cursor-pointer",
        "transition-all duration-200",
        "hover:border-primary hover:shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:-translate-y-0.5",
        className
      )}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        {/* Thumbnail */}
        <div className="aspect-video w-full overflow-hidden bg-surface-container-high relative">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="font-headline text-xl font-bold tracking-tight uppercase group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-on-surface-variant line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-surface-container-lowest rounded-full font-label text-[10px] text-on-surface-variant uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-2 border-t border-outline-variant/20">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-xs text-on-surface-variant hover:text-primary transition-colors font-label group/link"
              >
                <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                <span>GITHUB</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-xs text-on-surface-variant hover:text-primary transition-colors font-label group/link ml-auto"
              >
                <span>DEMO</span>
                <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
