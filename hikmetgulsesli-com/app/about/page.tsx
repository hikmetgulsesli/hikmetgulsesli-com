import type { Metadata } from "next";
import { generatePersonJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "Hakkında",
  description: "Hikmet Güleşli - Full-Stack Developer. Deneyimlerim, yetkinliklerim ve kariyer yolculuğum hakkında bilgi edinin.",
  openGraph: {
    title: "Hakkında | Hikmet Güleşli",
    description: "Hikmet Güleşli - Full-Stack Developer.",
    url: "https://hikmetgulsesli.com/about",
    type: "website",
    locale: "tr_TR",
  },
  alternates: { canonical: "/about" },
};

const personSchema = generatePersonJsonLd();
const breadcrumbSchema = generateBreadcrumbJsonLd([
  { name: "Ana Sayfa", url: "https://hikmetgulsesli.com" },
  { name: "Hakkında", url: "https://hikmetgulsesli.com/about" },
]);

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <AboutContent />
    </>
  );
}
