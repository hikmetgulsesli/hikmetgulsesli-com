import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkında",
  description:
    "Hikmet Güleşli - Full-Stack Developer & Systems Architect. Deneyimlerim, yetkinliklerim ve kariyer yolculuğum hakkında daha fazla bilgi edinin.",
  openGraph: {
    title: "Hakkında | Hikmet Güleşli",
    description:
      "Full-Stack Developer & Systems Architect. Complex sistemleri minimalist ve ölçeklenebilir çözümlere dönüştürmeye odaklı bir yazılım mimarı.",
    url: "https://hikmetgulsesli.com/about",
    type: "profile",
    locale: "tr_TR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hakkında | Hikmet Güleşli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkında | Hikmet Güleşli",
    description:
      "Full-Stack Developer & Systems Architect. Complex sistemleri minimalist ve ölçeklenebilir çözümlere dönüştürmeye odaklı bir yazılım mimarı.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/about",
  },
};
