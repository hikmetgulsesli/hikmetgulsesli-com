import { BlogPageClient } from "@/components/ui/BlogPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Hikmet Güleşli",
  description:
    "Teknik yazılar, kariyer deneyimleri ve kişisel notlar. Full-Stack geliştirme, React, Next.js ve yazılım mühendisliği üzerine düşünceler.",
  keywords: ["blog", "yazılım", "react", "next.js", "typescript", "kariyer"],
  authors: [{ name: "Hikmet Güleşli" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://hikmetgulsesli.com/blog",
    siteName: "Hikmet Güleşli",
    title: "Blog | Hikmet Güleşli",
    description:
      "Teknik yazılar, kariyer deneyimleri ve kişisel notlar.",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
