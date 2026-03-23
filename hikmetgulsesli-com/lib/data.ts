import { Project } from "@/components/ui/ProjectCard";
import { BlogPost } from "@/lib/blog";

export const featuredProjects: Project[] = [
  {
    slug: "sentinel-dashboard",
    title: "Sentinel Dashboard",
    shortDescription:
      "Real-time network security monitoring interface with 3D packet visualization.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkxyt6DgfFIcoJXJU2ynxAPf_Kh0K2mgXzQYeDmICUPu84aXeppBelsxi9eHFLTEHRF_-mVWEw8R77KKTw3sGULpYXm8-lemSAxX8_HUCjsmMvtnIpDbdhRTsX6RwPi4ZvgVcf59uljbHHUn78WpRklZV2H6IFdfJDHhAADrHD_Nr2AsRtSojOAJ3m5zhMmXoCtdMk3LVXQDwUTsU3DoKFyzA5KRmp0n-JcZ6EVwgS9wJzwWg2lL0WSDmxBKVwFkJFSqbLPLq1YT0",
    category: "web",
    techStack: ["REACT", "TAILWIND", "D3.JS"],
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
    category: "open-source",
    techStack: ["NEXT.JS", "TYPESCRIPT", "POSTGRES"],
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
    category: "web",
    techStack: ["PYTHON", "LANGCHAIN", "FASTAPI"],
    githubUrl: "https://github.com/hikmetgulsesli/ai-agent",
    liveUrl: "https://ai-agent-demo.vercel.app",
  },
];

export const recentBlogPosts: BlogPost[] = [
  {
    slug: "optimizing-react-60fps",
    title: "Optimizing React for 60fps",
    excerpt:
      "A deep dive into virtualization, memory management, and rendering pipelines in complex dashboards.",
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    publishedAt: "2024-03-12",
    readTime: 8,
    category: "teknik",
    tags: ["React", "Performance", "TypeScript"],
    status: "published",
    featured: false,
    pinned: false,
  },
  {
    slug: "future-of-ai-agents",
    title: "The Future of AI Agents",
    excerpt:
      "Why the next shift in UI will be agentic, moving from interfaces to instructions and workflows.",
    publishedAt: "2024-02-28",
    readTime: 12,
    category: "teknik",
    tags: ["AI", "Agents", "Future"],
    status: "published",
    featured: false,
    pinned: false,
  },
  {
    slug: "building-terminal-uis",
    title: "Building Terminal UIs",
    excerpt:
      "Exploring the psychology of the CLI and how to translate that efficiency to the modern web browser.",
    publishedAt: "2024-01-15",
    readTime: 6,
    category: "tutorial",
    tags: ["Terminal", "CLI", "UI"],
    status: "published",
    featured: false,
    pinned: false,
  },
];
