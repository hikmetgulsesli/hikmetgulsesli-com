import { Project } from "@/components/ui/ProjectCard";

export interface TechItem {
  name: string;
  icon?: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  thumbnail: string;
  images?: string[];
  category: "web" | "mobile" | "open-source" | "freelance";
  techStack: TechItem[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  publishedAt: string;
  status: "draft" | "published" | "archived";
  client?: string;
  duration?: string;
}

export const categories = [
  { id: "all", label: "TÜMÜ" },
  { id: "web", label: "WEB" },
  { id: "mobile", label: "MOBİL" },
  { id: "open-source", label: "AÇIK KAYNAK" },
  { id: "freelance", label: "FREELANCE" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

// In-memory project data (in production, this would come from MDX files via lib/getProjects.ts)
export const allProjects: ProjectData[] = [
  {
    slug: "vesta-dashboard",
    title: "Vesta Dashboard",
    shortDescription:
      "Yapay zeka destekli veri analitiği ve görselleştirme platformu. Gerçek zamanlı metrikler ve tahminsel analizler.",
    description:
      "Vesta Dashboard, işletmelerin veri odaklı karar alma süreçlerini hızlandırmak için geliştirilmiş kapsamlı bir analitik platformdur. Gerçek zamanlı metrikler, tahminsel analizler ve özelleştirilebilir gösterge panelleri sunar.",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop"],
    category: "web",
    techStack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "TensorFlow" },
      { name: "PostgreSQL" },
      { name: "Redis" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/vesta",
    liveUrl: "https://vesta-dashboard.vercel.app",
    featured: true,
    publishedAt: "2024-03-15",
    status: "published",
    client: "TechTide AI",
    duration: "6 ay",
  },
  {
    slug: "claw-open-projects",
    title: "Claw Open Projects",
    shortDescription:
      "Açık kaynak donanım geliştiricileri için merkeziyetsiz işbirliği platformu.",
    description:
      "Claw Open Projects, açık kaynak donanım geliştiricileri için tasarlanmış merkeziyetsiz bir işbirliği platformudur. Donanım şemaları, PCB tasarımları ve firmware paylaşımını kolaylaştırır.",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop"],
    category: "open-source",
    techStack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "PostgreSQL" },
      { name: "Docker" },
      { name: "GraphQL" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/claw",
    liveUrl: "https://claw-open.vercel.app",
    featured: true,
    publishedAt: "2024-06-20",
    status: "published",
  },
  {
    slug: "ai-agent-platform",
    title: "AI Agent Platform",
    shortDescription:
      "Karmaşık iş süreçleri için otonom agent orkestrasyon framework'ü.",
    description:
      "AI Agent Platform, iş süreçlerini otomatikleştirmek için tasarlanmış otonom agent orkestrasyon framework'üdür. LLM tabanlı agent'lar, görevleri planlayabilir, araçları kullanabilir ve birbirleriyle işbirliği yapabilir.",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    images: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop"],
    category: "web",
    techStack: [
      { name: "Python" },
      { name: "LangChain" },
      { name: "FastAPI" },
      { name: "React" },
      { name: "Redis" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/ai-agent",
    liveUrl: "https://ai-agent-platform.vercel.app",
    featured: true,
    publishedAt: "2024-09-10",
    status: "published",
    client: "AutoFlow Systems",
    duration: "8 ay",
  },
  {
    slug: "fintech-mobile-app",
    title: "Fintech Mobile App",
    shortDescription:
      "Biyometrik kimlik doğrulama ile çapraz platform mobil bankacılık uygulaması.",
    description:
      "Fintech Mobile App, modern bankacılık ihtiyaçları için geliştirilmiş güvenli ve kullanımı kolay bir mobil uygulamadır. Biyometrik kimlik doğrulama, anlık transferler ve yatırım takibi özellikleri sunar.",
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop",
    images: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop"],
    category: "mobile",
    techStack: [
      { name: "React Native" },
      { name: "Node.js" },
      { name: "PostgreSQL" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/fintech",
    liveUrl: "https://fintech-demo.vercel.app",
    featured: false,
    publishedAt: "2024-11-05",
    status: "published",
  },
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    shortDescription:
      "Gerçek zamanlı envanter yönetimi ile tam kapsamlı e-ticaret çözümü.",
    description:
      "E-Commerce Platform, online satış işletmeleri için geliştirilmiş kapsamlı bir e-ticaret çözümüdür. Gerçek zamanlı envanter takibi, çoklu ödeme yöntemleri ve gelişmiş analitik paneller sunar.",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop"],
    category: "freelance",
    techStack: [
      { name: "Next.js" },
      { name: "Stripe" },
      { name: "MongoDB" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: false,
    publishedAt: "2024-08-12",
    status: "published",
  },
  {
    slug: "devtools-cli",
    title: "DevTools CLI",
    shortDescription:
      "Geliştirici verimliliği için açık kaynak komut satırı araç seti.",
    description:
      "DevTools CLI, geliştiricilerin günlük iş akışlarını hızlandırmak için tasarlanmış açık kaynak bir komut satırı araçları koleksiyonudur. Proje şablonları, otomatik test çalıştırma ve deployment script'leri içerir.",
    thumbnail:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=450&fit=crop",
    images: ["https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=450&fit=crop"],
    category: "open-source",
    techStack: [
      { name: "Rust" },
      { name: "CLI" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/devtools",
    featured: false,
    publishedAt: "2024-05-30",
    status: "published",
  },
];

// Convert ProjectData to Project (for UI components that need string[] techStack)
export function toProject(project: ProjectData): Project {
  return {
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    thumbnail: project.thumbnail,
    category: project.category,
    techStack: project.techStack.map((t) => t.name),
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
  };
}

export function getAllProjects(): ProjectData[] {
  return allProjects.filter((p) => p.status === "published");
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return allProjects.find((p) => p.slug === slug && p.status === "published");
}

export function getFeaturedProjects(max: number = 6): ProjectData[] {
  return allProjects
    .filter((p) => p.featured && p.status === "published")
    .slice(0, max);
}

export function filterProjects(
  projects: ProjectData[],
  category: CategoryId,
  searchQuery: string
): ProjectData[] {
  return projects.filter((project) => {
    const matchesCategory =
      category === "all" || project.category === category;

    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}

export interface PaginatedProjects {
  data: ProjectData[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function getPaginatedProjects(
  page: number = 1,
  limit: number = 10,
  category?: CategoryId,
  search?: string
): PaginatedProjects {
  let filtered = getAllProjects();
  
  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.shortDescription.toLowerCase().includes(searchLower)
    );
  }
  
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: filtered.slice(startIndex, endIndex),
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
