import { Project } from "@/components/ui/ProjectCard";

export const categories = [
  { id: "all", label: "TÜMÜ" },
  { id: "web", label: "WEB" },
  { id: "mobile", label: "MOBİL" },
  { id: "open-source", label: "AÇIK KAYNAK" },
  { id: "freelance", label: "FREELANCE" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const allProjects: Project[] = [
  {
    slug: "sentinel-dashboard",
    title: "Sentinel Dashboard",
    shortDescription:
      "Real-time network security monitoring interface with 3D packet visualization.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkxyt6DgfFIcoJXJU2ynxAPf_Kh0K2mgXzQYeDmICUPu84aXeppBelsxi9eHFLTEHRF_-mVWEw8R77KKTw3sGULpYXm8-lemSAxX8_HUCjsmMvtnIpDbdhRTsX6RwPi4ZvgVcf59uljbHHUn78WpRklZV2H6IFdfJDHhAADrHD_Nr2AsRtSojOAJ3m5zhMmXoCtdMk3LVXQDwUTsU3DoKFyzA5KRmp0n-JcZ6EVwgS9wJzwWg2lL0WSDmxBKVwFkJFSqbLPLq1YT0",
    techStack: ["REACT", "TAILWIND", "D3.JS"],
    categories: ["web", "open-source"],
    githubUrl: "https://github.com/hikmetgulsesli/sentinel",
    liveUrl: "https://sentinel-demo.vercel.app",
  },
  {
    slug: "claw-open-projects",
    title: "Claw Open Projects",
    shortDescription:
      "A decentralized collaboration platform for open-source hardware developers.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDG1iAyEaYNjFG5dorw33MtiEbBOuinKJdGswv0LIPOFmD3tbOUhX1bmkHeU89vZekUXNoGxiP0yDZEo3dTFdPIfNogbNY2FbEoJ1n-SXJVWGti_b6xOABo5vWc8ORNl_g7tELU93mYjGuYtirFSBW9qI-AkAQzuZ4rNvzY1pri1o07WSOLNR0PwHJ4WU0uI_-u2Z-VkjjnhSmZrDwk11G8U9z11EHfeafC3ijAn0eFWK-H5IQm-kaKXD9hW8QNARmI2Mh2EAhXxmo",
    techStack: ["NEXT.JS", "TYPESCRIPT", "POSTGRES"],
    categories: ["web"],
    githubUrl: "https://github.com/hikmetgulsesli/claw",
    liveUrl: "https://claw-demo.vercel.app",
  },
  {
    slug: "ai-agent-platform",
    title: "AI Agent Platform",
    shortDescription:
      "Autonomous agent orchestration framework for complex business workflows.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDg897AAyV5wtVBrsS9VplMPCXPsKwOrPur_J_KVH6yzThF0cdjJD-5D5YVQGaXYsGexWyfXVjnGLIQ8LT-7ENc0yTloPE47RbqoQuzdjNcWb0GKh_9SXKmUuoYfmwn1zRiT33yfi3K8_xp63p_g9XuiEWgPxwtlqF0myc-7KhyACXFYnHpcaDvgHtXpkDsuZSQESbwBUcadfC9qVC9oREw5JuhcyrV57_fjLokx_ghnmrC09eq-o-oxp8c5ciS1lwmWbI_y6xxDik",
    techStack: ["PYTHON", "LANGCHAIN", "FASTAPI"],
    categories: ["web"],
    githubUrl: "https://github.com/hikmetgulsesli/ai-agent",
    liveUrl: "https://ai-agent-demo.vercel.app",
  },
  {
    slug: "fintech-mobile-app",
    title: "Fintech Mobile App",
    shortDescription:
      "Cross-platform mobile banking application with biometric authentication.",
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop",
    techStack: ["REACT NATIVE", "NODE.JS", "POSTGRES"],
    categories: ["mobile"],
    githubUrl: "https://github.com/hikmetgulsesli/fintech",
    liveUrl: "https://fintech-demo.vercel.app",
  },
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    shortDescription:
      "Full-stack e-commerce solution with real-time inventory management.",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
    techStack: ["NEXT.JS", "STRIPE", "MONGODB"],
    categories: ["web", "freelance"],
    githubUrl: "https://github.com/hikmetgulsesli/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
  },
  {
    slug: "devtools-cli",
    title: "DevTools CLI",
    shortDescription:
      "Open-source command-line toolkit for developer productivity.",
    thumbnail:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=450&fit=crop",
    techStack: ["RUST", "CLI", "OPEN SOURCE"],
    categories: ["open-source"],
    githubUrl: "https://github.com/hikmetgulsesli/devtools",
  },
];

export function filterProjects(
  projects: Project[],
  category: CategoryId,
  searchQuery: string
): Project[] {
  return projects.filter((project) => {
    const matchesCategory =
      category === "all" || (project.categories && project.categories.includes(category));

    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}
