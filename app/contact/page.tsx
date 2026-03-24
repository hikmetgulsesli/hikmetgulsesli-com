import { ContactScreen } from "@/components/screens/contact-screen";
import { author } from "@/lib/data";

export default function ContactPage() {
  const socialLinks = [
    {
      label: "GITHUB",
      href: author.social?.github || "#",
      icon: "terminal",
    },
    {
      label: "LINKEDIN",
      href: author.social?.linkedin || "#",
      icon: "share",
    },
    {
      label: "X_SOCIAL",
      href: author.social?.twitter || "#",
      icon: "alternate_email",
    },
  ];

  return <ContactScreen socialLinks={socialLinks} />;
}
