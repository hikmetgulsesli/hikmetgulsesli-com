import { notFound } from "next/navigation";
import { BlogDetailScreen } from "@/components/screens/blog-detail-screen";
import { blogPosts, author, getBlogPostBySlug } from "@/lib/data";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Hikmet Güleşli`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

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

  return <BlogDetailScreen post={post} relatedPosts={relatedPosts} socialLinks={socialLinks} />;
}
