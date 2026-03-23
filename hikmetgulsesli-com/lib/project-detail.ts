import { Project } from "@/components/ui/ProjectCard";

export interface TechItem {
  id: string;
  name: string;
  icon?: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tool' | 'mobile';
  url?: string;
}

export interface ProjectDetail extends Project {
  category: 'web' | 'mobile' | 'open-source' | 'freelance';
  images: string[];
  featured: boolean;
  publishedAt: string;
  status: 'draft' | 'published' | 'archived';
  content: string;
  challenges?: string;
  solutions?: string;
  results?: string;
  client?: string;
  duration?: string;
  overview?: {
    problem?: string;
    solution?: string;
    impact?: string;
  };
  techStackItems: TechItem[];
  caseStudyUrl?: string;
}

export const projectDetails: Record<string, ProjectDetail> = {
  "sentinel-dashboard": {
    slug: "sentinel-dashboard",
    title: "Sentinel Dashboard",
    shortDescription:
      "Real-time network security monitoring interface with 3D packet visualization.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkxyt6DgfFIcoJXJU2ynxAPf_Kh0K2mgXzQYeDmICUPu84aXeppBelsxi9eHFLTEHRF_-mVWEw8R77KKTw3sGULpYXm8-lemSAxX8_HUCjsmMvtnIpDbdhRTsX6RwPi4ZvgVcf59uljbHHUn78WpRklZV2H6IFdfJDHhAADrHD_Nr2AsRtSojOAJ3m5zhMmXoCtdMk3LVXQDwUTsU3DoKFyzA5KRmp0n-JcZ6EVwgS9wJzwWg2lL0WSDmxBKVwFkJFSqbLPLq1YT0",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkxyt6DgfFIcoJXJU2ynxAPf_Kh0K2mgXzQYeDmICUPu84aXeppBelsxi9eHFLTEHRF_-mVWEw8R77KKTw3sGULpYXm8-lemSAxX8_HUCjsmMvtnIpDbdhRTsX6RwPi4ZvgVcf59uljbHHUn78WpRklZV2H6IFdfJDHhAADrHD_Nr2AsRtSojOAJ3m5zhMmXoCtdMk3LVXQDwUTsU3DoKFyzA5KRmp0n-JcZ6EVwgS9wJzwWg2lL0WSDmxBKVwFkJFSqbLPLq1YT0",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop",
    ],
    category: "web",
    techStack: ["REACT", "TAILWIND", "D3.JS"],
    techStackItems: [
      { id: "react", name: "React", category: "frontend" },
      { id: "tailwind", name: "Tailwind CSS", category: "frontend" },
      { id: "d3", name: "D3.js", category: "frontend" },
      { id: "node", name: "Node.js", category: "backend" },
      { id: "websocket", name: "WebSocket", category: "backend" },
      { id: "postgresql", name: "PostgreSQL", category: "database" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/sentinel",
    liveUrl: "https://sentinel-demo.vercel.app",
    featured: true,
    publishedAt: "2024-02-15",
    status: "published",
    content: `Sentinel Dashboard, kurumsal ağ güvenliği izleme süreçlerini modernize etmek için geliştirilmiş kapsamlı bir platformdur.`,
    overview: {
      problem: "Geleneksel güvenlik izleme araçları, büyük miktarda veriyi anlamlandırmakta zorlanıyordu. Güvenlik ekipleri, potansiyel tehditleri tespit etmek için saatler harcıyordu.",
      solution: "Gerçek zamanlı 3D paket görselleştirmesi ve makine öğrenimi destekli anomaly tespiti ile güvenlik olaylarını saniyeler içinde tespit eden bir dashboard geliştirdik.",
      impact: "Müşterinin güvenlik olayı tespit süresi 4 saatten 15 dakikaya düştü. Yıllık 2.4 milyon TL tasarruf sağlandı.",
    },
    challenges: "Yüksek hacimli veri akışını gerçek zamanlı işlemek ve 60fps performans sunmak en büyük meydan okumaydı. WebGL tabanlı render motoru özel olarak geliştirildi.",
    solutions: "Veri akışı için WebSocket ve workers kullanıldı. D3.js ile 3D görselleştirme için özel shader'lar yazıldı. Performans için requestAnimationFrame optimizasyonları yapıldı.",
    results: "Dashboard, 10,000+ eşzamanlı bağlantıyı destekliyor. Ortalama 50ms gecikme ile çalışıyor. Kullanıcı memnuniyeti %95'in üzerinde.",
    client: "CyberTech A.Ş.",
    duration: "8 ay",
  },
  "claw-open-projects": {
    slug: "claw-open-projects",
    title: "Claw Open Projects",
    shortDescription:
      "A decentralized collaboration platform for open-source hardware developers.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDG1iAyEaYNjFG5dorw33MtiEbBOuinKJdGswv0LIPOFmD3tbOUhX1bmkHeU89vZekUXNoGxiP0yDZEo3dTFdPIfNogbNY2FbEoJ1n-SXJVWGti_b6xOABo5vWc8ORNl_g7tELU93mYjGuYtirFSBW9qI-AkAQzuZ4rNvzY1pri1o07WSOLNR0PwHJ4WU0uI_-u2Z-VkjjnhSmZrDwk11G8U9z11EHfeafC3ijAn0eFWK-H5IQm-kaKXD9hW8QNARmI2Mh2EAhXxmo",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDG1iAyEaYNjFG5dorw33MtiEbBOuinKJdGswv0LIPOFmD3tbOUhX1bmkHeU89vZekUXNoGxiP0yDZEo3dTFdPIfNogbNY2FbEoJ1n-SXJVWGti_b6xOABo5vWc8ORNl_g7tELU93mYjGuYtirFSBW9qI-AkAQzuZ4rNvzY1pri1o07WSOLNR0PwHJ4WU0uI_-u2Z-VkjjnhSmZrDwk11G8U9z11EHfeafC3ijAn0eFWK-H5IQm-kaKXD9hW8QNARmI2Mh2EAhXxmo",
    ],
    category: "open-source",
    techStack: ["NEXT.JS", "TYPESCRIPT", "POSTGRES"],
    techStackItems: [
      { id: "nextjs", name: "Next.js", category: "frontend" },
      { id: "typescript", name: "TypeScript", category: "frontend" },
      { id: "postgresql", name: "PostgreSQL", category: "database" },
      { id: "prisma", name: "Prisma", category: "backend" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/claw",
    liveUrl: "https://claw-demo.vercel.app",
    featured: true,
    publishedAt: "2024-01-20",
    status: "published",
    content: `Claw, açık kaynak donanım geliştiricileri için tasarlanmış merkeziyetsiz bir işbirliği platformudur.`,
    overview: {
      problem: "Açık kaynak donanım projeleri, dağınık toplulukları bir araya getirmek için uygun bir platformdan yoksundu. Proje yönetimi ve dokümantasyon genellikle farklı araçlara yayılmıştı.",
      solution: "GitHub, Notion ve Discord'u entegre eden birleşik bir platform oluşturduk. Merkeziyetsiz kimlik doğrulama ve proje yönetimi özellikleri eklendi.",
      impact: "Platform, 500+ aktif projeyi barındırıyor. Ortalama proje başlatma süresi 2 haftadan 3 güne düştü.",
    },
    challenges: "Merkeziyetsiz kimlik doğrulama ve veri mülkiyeti konularında yoğun Ar-Ge çalışması yapıldı.",
    solutions: "Solid Protocol entegrasyonu ile kendi kendine saklanan kimlikler kullanıldı. IPFS üzerinde dağıtık dosya depolama implement edildi.",
    results: "Topluluk büyümesi %300 arttı. Kullanıcı memnuniyeti puanı 4.8/5.",
    duration: "6 ay",
  },
  "ai-agent-platform": {
    slug: "ai-agent-platform",
    title: "AI Agent Platform",
    shortDescription:
      "Autonomous agent orchestration framework for complex business workflows.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDg897AAyV5wtVBrsS9VplMPCXPsKwOrPur_J_KVH6yzThF0cdjJD-5D5YVQGaXYsGexWyfXVjnGLIQ8LT-7ENc0yTloPE47RbqoQuzdjNcWb0GKh_9SXKmUuoYfmwn1zRiT33yfi3K8_xp63p_g9XuiEWgPxwtlqF0myc-7KhyACXFYnHpcaDvgHtXpkDsuZSQESbwBUcadfC9qVC9oREw5JuhcyrV57_fjLokx_ghnmrC09eq-o-oxp8c5ciS1lwmWbI_y6xxDik",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDg897AAyV5wtVBrsS9VplMPCXPsKwOrPur_J_KVH6yzThF0cdjJD-5D5YVQGaXYsGexWyfXVjnGLIQ8LT-7ENc0yTloPE47RbqoQuzdjNcWb0GKh_9SXKmUuoYfmwn1zRiT33yfi3K8_xp63p_g9XuiEWgPxwtlqF0myc-7KhyACXFYnHpcaDvgHtXpkDsuZSQESbwBUcadfC9qVC9oREw5JuhcyrV57_fjLokx_ghnmrC09eq-o-oxp8c5ciS1lwmWbI_y6xxDik",
    ],
    category: "web",
    techStack: ["PYTHON", "LANGCHAIN", "FASTAPI"],
    techStackItems: [
      { id: "python", name: "Python", category: "backend" },
      { id: "langchain", name: "LangChain", category: "backend" },
      { id: "fastapi", name: "FastAPI", category: "backend" },
      { id: "redis", name: "Redis", category: "database" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/ai-agent",
    liveUrl: "https://ai-agent-demo.vercel.app",
    featured: true,
    publishedAt: "2024-03-01",
    status: "published",
    content: `AI Agent Platform, iş süreçlerini otomatize etmek için otonom ajanlar orkestre eden bir framework'tür.`,
    overview: {
      problem: "Kurumsal iş süreçleri manuel müdahale gerektiriyordu. Müşteri hizmetleri, fatura işleme ve raporlama gibi görevler saatler alıyordu.",
      solution: "LangChain tabanlı otonom ajanlar geliştirdik. Doğal dil ile süreç tanımlama ve otomatik yürütme imkanı sunuldu.",
      impact: "İşlem maliyetleri %60 düştü. 7/24 kesintisiz hizmet sağlandı.",
    },
    duration: "10 ay",
  },
  "fintech-mobile-app": {
    slug: "fintech-mobile-app",
    title: "Fintech Mobile App",
    shortDescription:
      "Cross-platform mobile banking application with biometric authentication.",
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop",
    ],
    category: "mobile",
    techStack: ["REACT NATIVE", "NODE.JS", "POSTGRES"],
    techStackItems: [
      { id: "react-native", name: "React Native", category: "mobile" },
      { id: "nodejs", name: "Node.js", category: "backend" },
      { id: "postgres", name: "PostgreSQL", category: "database" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/fintech",
    liveUrl: "https://fintech-demo.vercel.app",
    featured: false,
    publishedAt: "2024-02-01",
    status: "published",
    content: `Mobil bankacılık uygulaması, biyometrik kimlik doğrulama ile güvenli finansal işlemler sunar.`,
    overview: {
      problem: "Mevcut bankacılık uygulamaları karmaşık arayüzlere ve yavaş işlemlere sahipti.",
      solution: "React Native ile hızlı ve sezgisel bir mobil deneyim sunuldu.",
      impact: "Kullanıcı retention %40 arttı.",
    },
    duration: "7 ay",
  },
  "ecommerce-platform": {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    shortDescription:
      "Full-stack e-commerce solution with real-time inventory management.",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
    ],
    category: "web",
    techStack: ["NEXT.JS", "STRIPE", "MONGODB"],
    techStackItems: [
      { id: "nextjs", name: "Next.js", category: "frontend" },
      { id: "stripe", name: "Stripe", category: "backend" },
      { id: "mongodb", name: "MongoDB", category: "database" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: false,
    publishedAt: "2024-01-15",
    status: "published",
    content: `E-ticaret platformu, gerçek zamanlı stok yönetimi ve çoklu ödeme entegrasyonları sunar.`,
    duration: "5 ay",
  },
  "devtools-cli": {
    slug: "devtools-cli",
    title: "DevTools CLI",
    shortDescription:
      "Open-source command-line toolkit for developer productivity.",
    thumbnail:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=450&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=450&fit=crop",
    ],
    category: "open-source",
    techStack: ["RUST", "CLI", "OPEN SOURCE"],
    techStackItems: [
      { id: "rust", name: "Rust", category: "tool" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/devtools",
    featured: false,
    publishedAt: "2024-03-10",
    status: "published",
    content: `Geliştirici araçları CLI, yaygın görevleri otomatize eden açık kaynak bir toolkit'tir.`,
    duration: "3 ay",
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails[slug];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(projectDetails);
}

export function getAdjacentProjects(slug: string): { prev: ProjectDetail | null; next: ProjectDetail | null } {
  const slugs = Object.keys(projectDetails);
  const currentIndex = slugs.indexOf(slug);
  
  return {
    prev: currentIndex > 0 ? projectDetails[slugs[currentIndex - 1]] : null,
    next: currentIndex < slugs.length - 1 ? projectDetails[slugs[currentIndex + 1]] : null,
  };
}
