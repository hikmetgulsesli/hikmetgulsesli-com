"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import type { BlogPost, SocialLink } from "@/types";

interface BlogScreenProps {
  posts: BlogPost[];
  socialLinks: SocialLink[];
}

type FilterCategory = "Tümü" | "Teknik" | "Kariyer" | "Kişisel" | "Tutorial";

export function BlogScreen({ posts, socialLinks }: BlogScreenProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "Projects", href: "/projects" },
    { label: "Stack", href: "/stack" },
    { label: "Archive", href: "/archive" },
    { label: "Contact", href: "/contact" },
  ];

  const filters: FilterCategory[] = ["Tümü", "Teknik", "Kariyer", "Kişisel", "Tutorial"];

  const filteredPosts = posts.filter((post) => {
    const matchesFilter =
      activeFilter === "Tümü" || post.category === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Navigation */}
      <Navigation links={navLinks} showResumeButton={false} />

      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16 border-l-2 border-primary pl-8">
          <h1 className="font-headline text-5xl font-bold tracking-tighter mb-4">Writing</h1>
          <p className="text-on-surface-variant max-w-2xl">
            Thoughts on software development, technology, and the craft of building products.
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-12 space-y-8">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "primary" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="EXECUTE_SEARCH --query "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-12 bg-surface-container border border-outline-variant/20 rounded-md font-label text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">search</span>
            </button>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative block bg-surface-container-low hover:bg-surface-container transition-all border-l-4 border-primary p-8 md:p-12 overflow-hidden"
            >
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4 font-label text-sm text-on-surface-variant">
                  <span className="text-primary">{featuredPost.category}</span>
                  <span>{"/"}</span>
                  <span>{featuredPost.readTime} dk okuma</span>
                </div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-on-surface-variant text-lg max-w-3xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-2 text-primary font-label">
                  <span>READ_FULL_ENTRY</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </div>
              </div>

              {/* Background Image */}
              <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 group-hover:opacity-30 transition-opacity">
                <div className="aspect-video bg-surface-container-high" />
              </div>
            </Link>
          </section>
        )}

        {/* Other Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {otherPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-surface-container-low hover:bg-surface-container transition-all border-l-2 border-transparent hover:border-primary p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 font-label text-xs text-on-surface-variant">
                  <span className="text-primary">{post.category}</span>
                  <span>{"/"}</span>
                  <span>{post.readTime} dk</span>
                </div>
                <h3 className="font-headline text-2xl font-bold group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-on-surface-variant line-clamp-2">{post.excerpt}</p>
                <div className="flex gap-3">
                  <Link href={post.author.social?.github || "#"} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" icon="code">
                      Code
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" icon="share">
                    Share
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Pagination */}
        <section className="flex justify-center items-center gap-4">
          <Button variant="outline" size="sm" disabled>
            [ PREV ]
          </Button>
          <Button variant="primary" size="sm">
            [ 01 ]
          </Button>
          <Button variant="outline" size="sm">
            [ 02 ]
          </Button>
          <Button variant="outline" size="sm">
            [ 03 ]
          </Button>
          <Button variant="outline" size="sm">
            [ NEXT &gt; ]
          </Button>
        </section>
      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
}
