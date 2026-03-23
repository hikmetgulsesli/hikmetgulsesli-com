import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
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
        "group bg-surface-container overflow-hidden border border-transparent hover:border-primary transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:-translate-y-1",
        className
      )}
    >
      {/* Thumbnail - links to project detail */}
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
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

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-surface-container-lowest font-label text-[10px] text-secondary uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Links - outside the main Link to avoid nested anchors */}
      <div className="flex items-center gap-4 px-6 pb-6">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary transition-colors font-label"
          >
            <Github className="w-4 h-4" />
            <span>GITHUB</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary transition-colors font-label"
          >
            <ExternalLink className="w-4 h-4" />
            <span>DEMO</span>
          </a>
        )}
      </div>
    </div>
  );
}
