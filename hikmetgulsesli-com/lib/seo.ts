// SEO helper functions for generating structured data

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function generatePersonJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hikmet Güleşli",
    jobTitle: "Full-Stack Developer",
    description:
      "Modern web teknolojileri ile dijital ürünler geliştiriyorum. React, Next.js, TypeScript ve Node.js ile yüksek performanslı web uygulamaları oluşturma konusunda uzmanım.",
    url: "https://hikmetgulsesli.com",
    image: "https://hikmetgulsesli.com/og-image.png",
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
  });
}

export function generateArticleJsonLd({
  headline,
  description,
  image,
  authorName,
  authorUrl,
  publisherName,
  publisherUrl,
  datePublished,
  dateModified,
  slug,
}: {
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
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      "@type": "Person",
      name: publisherName,
      url: publisherUrl,
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hikmetgulsesli.com/blog/${slug}`,
    },
  });
}
