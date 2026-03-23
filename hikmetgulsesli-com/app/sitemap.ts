import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hikmetgulsesli.com";

  return [
    {
      url: baseUrl,
      lastModified: "2024-01-01",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: "2024-01-01",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: "2024-01-01",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2024-01-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: "2024-01-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Dynamic routes - these would be populated from data in a real implementation
    // Projects
    {
      url: `${baseUrl}/projects/vesta-dashboard`,
      lastModified: "2024-03-15",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Blog posts
    {
      url: `${baseUrl}/blog/building-modern-web-applications`,
      lastModified: "2024-06-16",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
