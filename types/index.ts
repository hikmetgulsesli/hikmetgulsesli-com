// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Project interface
export interface Project extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  category: ProjectCategory;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: ProjectStatus;
}

export type ProjectCategory = "WEB" | "MOBIL" | "AÇIK KAYNAK" | "FREELANCE";
export type ProjectStatus = "completed" | "in-progress" | "archived";

// Blog Post interface
export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: BlogCategory;
  tags: string[];
  author: Author;
  readTime: number;
  published: boolean;
}

export type BlogCategory = "Teknik" | "Kariyer" | "Kişisel" | "Tutorial" | "Tümü";

// Author interface
export interface Author {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  bio?: string;
  social?: SocialLinks;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  stackoverflow?: string;
}

// Tech Item interface
export interface TechItem {
  id: string;
  name: string;
  category: TechCategory;
  icon?: string;
  proficiency: number; // 0-100
  description?: string;
}

export type TechCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Tools"
  | "Currently Learning";

// Contact Form Data
export interface ContactFormData {
  name: string;
  surname: string;
  email: string;
  projectType: string;
  message: string;
}

// Experience interface
export interface Experience extends BaseEntity {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  technologies: string[];
}

// Navigation Link
export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

// Component Props
export interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured";
}

export interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured";
}

export interface TechBadgeProps {
  tech: string;
  variant?: "default" | "outline";
}

export interface NavButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}
