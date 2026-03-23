import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Hikmet Güleşli ile iletişime geçin. Projeleriniz için işbirliği fırsatları, freelance çalışmalar veya teknik sorularınız için bana ulaşabilirsiniz.",
  openGraph: {
    title: "İletişim | Hikmet Güleşli",
    description:
      "Hikmet Güleşli ile iletişime geçin. Projeleriniz için işbirliği fırsatları ve freelance çalışmalar için bana ulaşabilirsiniz.",
    url: "https://hikmetgulsesli.com/contact",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "İletişim | Hikmet Güleşli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim | Hikmet Güleşli",
    description:
      "Hikmet Güleşli ile iletişime geçin. Projeleriniz için işbirliği fırsatları ve freelance çalışmalar için bana ulaşabilirsiniz.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/contact",
  },
};
