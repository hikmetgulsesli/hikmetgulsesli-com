import Link from "next/link";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
  category?: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  className?: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
}

export function BlogPostCard({ post, className = "" }: BlogPostCardProps) {
  return (
    <article className={cn("space-y-4 group", className)}>
      {/* Date */}
      <div className="font-label text-xs text-secondary-fixed-dim tracking-widest uppercase">
        {formatDate(post.publishedAt)}
      </div>

      {/* Title */}
      <Link href={`/blog/${post.slug}`}>
        <h3 className="font-headline text-2xl font-bold tracking-tight hover:text-primary transition-colors cursor-pointer leading-tight">
          {post.title}
        </h3>
      </Link>

      {/* Excerpt */}
      <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>

      {/* Read Time */}
      <div className="flex items-center gap-2 font-label text-[10px] text-on-surface-variant">
        <Clock className="w-3.5 h-3.5" />
        <span>{post.readTime} MIN READ</span>
      </div>
    </article>
  );
}
