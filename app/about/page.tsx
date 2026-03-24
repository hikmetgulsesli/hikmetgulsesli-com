import { AboutScreen } from "@/components/screens/about-screen";
import { author, experiences, techStack } from "@/lib/data";

export default function AboutPage() {
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
      label: "STACK_OVERFLOW",
      href: author.social?.stackoverflow || "#",
      icon: "code",
    },
  ];

  return (
    <AboutScreen
      author={author}
      experiences={experiences}
      techStack={techStack}
      socialLinks={socialLinks}
    />
  );
}
