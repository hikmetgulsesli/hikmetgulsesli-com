import { ProjectsScreen } from "@/components/screens/projects-screen";
import { projects, author } from "@/lib/data";

export default function ProjectsPage() {
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

  return <ProjectsScreen projects={projects} socialLinks={socialLinks} />;
}
