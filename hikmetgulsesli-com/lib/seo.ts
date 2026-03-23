// SEO utility functions for generating structured data

export const BASE_URL = "https://hikmetgulsesli.com";

export interface PersonSchema {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  sameAs: string[];
  knowsAbout: string[];
}

export const personSchema: PersonSchema = {
  name: "Hikmet Güleşli",
  jobTitle: "Full-Stack Developer",
  description:
    "Modern web teknolojileri ile dijital ürünler geliştiriyorum. React, Next.js, TypeScript ve Node.js ile yüksek performanslı web uygulamaları oluşturma konusunda uzmanım.",
  url: BASE_URL,
  image: `${BASE_URL}/og-image.png`,
  sameAs: [
    "https://github.com/hikmetgulsesli",
    "https://linkedin.com/in/hikmetgulsesli",
    "https://x.com/hikmetgulsesli",
  ],
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "UI/UX Design",
    "Full-Stack Development",
    "Web Performance",
  ],
};

export function generatePersonJsonLd(): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personSchema.name,
    jobTitle: personSchema.jobTitle,
    description: personSchema.description,
    url: personSchema.url,
    image: personSchema.image,
    sameAs: personSchema.sameAs,
    knowsAbout: personSchema.knowsAbout,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/about`,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
      addressRegion: "İstanbul",
    },
    nationality: {
      "@type": "Country",
      name: "Turkey",
    },
  };

  return JSON.stringify(schema);
}

export interface ArticleSchema {
  headline: string;
  description: string;
  image?: string;
  authorName: string;
  authorUrl: string;
  publisherName: string;
  publisherUrl: string;
  datePublished: string;
  dateModified: string;
  slug: string;
}

export function generateArticleJsonLd(article: ArticleSchema): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    image: article.image,
    author: {
      "@type": "Person",
      name: article.authorName,
      url: article.authorUrl,
    },
    publisher: {
      "@type": "Person",
      name: article.publisherName,
      url: article.publisherUrl,
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${article.slug}`,
    },
    url: `${BASE_URL}/blog/${article.slug}`,
  };

  return JSON.stringify(schema);
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[]
): string {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return JSON.stringify(schema);
}
