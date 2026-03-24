import { BlogScreen } from "@/components/screens/blog-screen";
import { getPublishedBlogPosts, author } from "@/lib/data";

export default function BlogPage() {
  const posts = getPublishedBlogPosts();

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

  return <BlogScreen posts={posts} socialLinks={socialLinks} />;
}
