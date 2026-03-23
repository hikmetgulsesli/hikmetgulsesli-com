export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  category: "teknik" | "career" | "kisisel" | "tutorial";
  tags: string[];
  readTime: number;
  publishedAt: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  pinned: boolean;
}

export const blogCategories = [
  { id: "all", label: "TÜMÜ" },
  { id: "teknik", label: "TEKNİK" },
  { id: "career", label: "KARİYER" },
  { id: "kisisel", label: "KİŞİSEL" },
  { id: "tutorial", label: "TUTORİAL" },
] as const;

export type BlogCategoryId = (typeof blogCategories)[number]["id"];

export const allPosts: BlogPost[] = [
  {
    slug: "nextjs-app-router-derinlemesine",
    title: "Next.js 14 App Router: Derinlemesine İnceleme",
    excerpt:
      "Next.js 14 ile gelen App Router mimarisini detaylıca inceliyoruz. Server Components, Server Actions ve yeni routing sistemini öğrenin.",
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    category: "teknik",
    tags: ["Next.js", "React", "TypeScript"],
    readTime: 8,
    publishedAt: "2024-06-16",
    status: "published",
    featured: true,
    pinned: true,
  },
  {
    slug: "freelance-gelistirici-baslangic",
    title: "Freelance Yazılım Geliştirici: İlk Yılım",
    excerpt:
      "Tam zamanlı işden freelance'e geçiş sürecim, karşılaştığım zorluklar ve edindiğim deneyimler. 1 yıl sonra neler öğrendim?",
    category: "career",
    tags: ["Freelance", "Kariyer", "Deneyim"],
    readTime: 6,
    publishedAt: "2024-05-22",
    status: "published",
    featured: false,
    pinned: false,
  },
  {
    slug: "typescript-utility-types",
    title: "TypeScript Utility Types: Kapsamlı Rehber",
    excerpt:
      "TypeScript'in en güçlü özelliklerinden biri olan Utility Types'ları detaylı örneklerle açıklıyorum. Partial, Required, Pick, Omit ve daha fazlası.",
    featuredImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop",
    category: "teknik",
    tags: ["TypeScript", "JavaScript"],
    readTime: 5,
    publishedAt: "2024-04-10",
    status: "published",
    featured: false,
    pinned: false,
  },
  {
    slug: "uzaktan-calisma-dengesi",
    title: "Uzaktan Çalışma: İş-Yaşam Dengesi",
    excerpt:
      "Evden çalışırken üretkenliği korumak ve iş-yasam dengesini sağlamak için kullandığım yöntemler ve araçlar.",
    category: "kisisel",
    tags: ["Verimlilik", "Uzaktan Çalışma", "Yaşam"],
    readTime: 4,
    publishedAt: "2024-03-15",
    status: "published",
    featured: false,
    pinned: false,
  },
  {
    slug: "react-performans-optimizasyonu",
    title: "React Uygulamalarında Performans Optimizasyonu",
    excerpt:
      "React uygulamalarınızı hızlandırmak için useMemo, useCallback, React.memo ve code splitting kullanımı. Gerçek dünya örnekleriyle.",
    featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    category: "tutorial",
    tags: ["React", "Performans", "TypeScript"],
    readTime: 7,
    publishedAt: "2024-02-28",
    status: "published",
    featured: false,
    pinned: false,
  },
  {
    slug: "tam-suresiz-is-arası",
    title: "Tam Süresiz İş Arayışım: 6 Ayın Özeti",
    excerpt:
      "Türkiye'de yazılım geliştirici olarak tam süresiz iş arayışı sürecim. Mülakatlar, redler ve sonunda bulduğum fırsat.",
    category: "career",
    tags: ["Kariyer", "İş Arama", "Mülakat"],
    readTime: 5,
    publishedAt: "2024-01-20",
    status: "published",
    featured: false,
    pinned: false,
  },
];

export function filterPosts(
  posts: BlogPost[],
  category: BlogCategoryId,
  searchQuery: string
): BlogPost[] {
  return posts.filter((post) => {
    const matchesCategory =
      category === "all" || post.category === category;

    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "Oca", "Şub", "Mar", "Nis", "May", "Haz",
    "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
