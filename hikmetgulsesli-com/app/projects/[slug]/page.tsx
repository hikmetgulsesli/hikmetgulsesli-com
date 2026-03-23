import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proje Bulunamadı",
      description: "Aradığınız proje mevcut değil.",
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    keywords: project.techStack.map((t) => t.name),
    openGraph: {
      title: `${project.title} | Hikmet Güleşli`,
      description: project.shortDescription,
      url: `https://hikmetgulsesli.com/projects/${slug}`,
      type: "website",
      locale: "tr_TR",
      images: [
        {
          url: project.thumbnail,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Hikmet Güleşli`,
      description: project.shortDescription,
      images: [project.thumbnail],
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
