"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { BlogPost, formatDate } from "@/lib/blog";

interface ArticleCardProps {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}

export function ArticleCard({ post, className = "", featured = false }: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block bg-surface-container border border-outline-variant/30 rounded-xl overflow-hidden",
        "transition-all duration-200 cursor-pointer",
        "hover:border-primary hover:bg-surface-container-high hover:-translate-y-0.5",
        featured && "col-span-full md:col-span-2",
        className
      )}
    >
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="aspect-video w-full overflow-hidden bg-surface-container-high relative">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-3">
        {/* Date and Read Time */}
        <div className="flex items-center gap-3 font-label text-xs text-on-surface-variant">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="w-1 h-1 rounded-full bg-outline" />
          <span>{post.readTime} min okuma</span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-headline font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors",
            featured ? "text-2xl md:text-3xl" : "text-lg"
          )}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-label text-[10px] uppercase tracking-wider">
            {post.category}
          </span>
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-surface-container-lowest text-on-surface-variant rounded-full font-label text-[10px] uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
