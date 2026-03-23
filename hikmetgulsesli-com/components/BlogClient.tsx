"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
}

const categories = [
  { id: "all", label: "Tümü" },
  { id: "Teknik", label: "Teknik" },
  { id: "Kariyer", label: "Kariyer" },
  { id: "Kişisel", label: "Kişisel" },
  { id: "Tutorial", label: "Tutorial" },
];

interface BlogClientProps {
  posts: BlogPost[];
}

export function BlogClient({ posts }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  const featuredPost = filteredPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <>
      <section className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-sm font-label rounded-lg transition-colors cursor-pointer ${
              activeCategory === cat.id
                ? "bg-primary text-[var(--color-on-primary)]"
                : "bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary border border-outline-variant/20"
            }`}
            aria-pressed={activeCategory === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {featuredPost && (
        <article className="mb-12 bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
          <div className="md:flex">
            <div className="md:w-1/3 aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-6xl opacity-50">📝</span>
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-label rounded">Öne Çıkan</span>
                <span className="text-xs text-on-surface-variant font-label">{featuredPost.date} • {featuredPost.readTime}</span>
              </div>
              <h2 className="font-headline text-2xl font-bold mb-3 hover:text-primary transition-colors">
                <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>
              <p className="text-on-surface-variant mb-4">{featuredPost.excerpt}</p>
              <Link href={`/blog/${featuredPost.slug}`} className="text-sm font-label text-primary hover:underline">Okumaya Devam Et →</Link>
            </div>
          </div>
        </article>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regularPosts.map((post) => (
          <article key={post.slug} className="bg-surface-container border border-outline-variant/20 rounded-xl p-6 hover:border-primary/50 transition-colors">
            <div className="text-xs text-on-surface-variant mb-3 font-label">{post.date} • {post.readTime} okuma</div>
            <span className="inline-block px-2 py-1 bg-surface-container-high text-xs font-label text-slate-400 mb-3 rounded">{post.category}</span>
            <h2 className="font-headline text-xl font-bold mb-2 hover:text-primary transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-on-surface-variant text-sm line-clamp-2">{post.excerpt}</p>
          </article>
        ))}
      </section>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-on-surface-variant text-lg">Bu kategoride henüz yazı yok.</p>
        </div>
      )}
    </>
  );
}
