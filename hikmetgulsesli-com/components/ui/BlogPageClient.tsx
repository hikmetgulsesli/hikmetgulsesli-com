"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BlogFilterBar } from "@/components/ui/BlogFilterBar";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { allPosts, filterPosts, BlogCategoryId } from "@/lib/blog";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 6;

interface BlogPageClientProps {
  initialCategory?: BlogCategoryId;
}

export function BlogPageClient({ initialCategory = "all" }: BlogPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategoryId>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return filterPosts(allPosts, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return filteredPosts.find((post) => post.pinned) || filteredPosts[0];
  }, [filteredPosts]);

  const regularPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((post) => post.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [featuredPost, filteredPosts]);

  const totalPages = Math.ceil(regularPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = regularPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (category: BlogCategoryId) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const isLoading = false;
  const isEmpty = filteredPosts.length === 0 && !searchQuery && activeCategory === "all";
  const isNoResults = filteredPosts.length === 0 && (searchQuery || activeCategory !== "all");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 h-16">
          <Link
            href="/"
            className="text-xl font-bold text-primary tracking-widest font-headline hover:text-primary/80 transition-colors"
          >
            KINETIC_CONSOLE
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              ANA SAYFA
            </Link>
            <Link
              href="/blog"
              className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
            >
              BLOG
            </Link>
            <Link
              href="/projects"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              PROJELER
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow pt-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-label text-primary text-3xl mb-2">
              // writing
            </h1>
            <p className="text-on-surface-variant">
              Teknik yazılar, kariyer deneyimleri ve kişisel notlar
            </p>
          </div>

          <BlogFilterBar
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />

          <div className="py-8 space-y-8">
            {/* Loading Skeleton */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-surface-container border border-outline-variant/30 rounded-xl overflow-hidden animate-pulse"
                  >
                    <div className="aspect-video bg-surface-container-high" />
                    <div className="p-6 space-y-4">
                      <div className="h-3 bg-surface-container-high rounded w-1/3" />
                      <div className="h-6 bg-surface-container-high rounded w-3/4" />
                      <div className="h-4 bg-surface-container-high rounded w-full" />
                      <div className="h-4 bg-surface-container-high rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State - No posts at all */}
            {!isLoading && isEmpty && (
              <div className="flex flex-col items-center justify-center py-24 space-y-6">
                <div className="text-6xl">📝</div>
                <h2 className="text-2xl font-headline font-bold text-on-surface">
                  Henüz yazı yok
                </h2>
                <p className="text-on-surface-variant text-center max-w-md">
                  Yakında burada yeni yazılar paylaşacağım. Takipte kalın!
                </p>
              </div>
            )}

            {/* No Results State - Filtered to zero */}
            {!isLoading && isNoResults && (
              <div className="flex flex-col items-center justify-center py-24 space-y-6">
                <div className="text-6xl">📝</div>
                <h2 className="text-2xl font-headline font-bold text-on-surface">
                  Aramanıza uygun yazı bulunamadı
                </h2>
                <p className="text-on-surface-variant text-center max-w-md">
                  Farklı anahtar kelimeler deneyebilir veya filtreleri temizleyerek
                  tüm yazıları görüntüleyebilirsiniz.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-primary text-on-primary font-headline font-semibold rounded-md hover:bg-primary/90 transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}

            {/* Posts Content */}
            {!isLoading && !isEmpty && !isNoResults && (
              <>
                {/* Featured Post */}
                {featuredPost && currentPage === 1 && (
                  <div>
                    <ArticleCard post={featuredPost} featured />
                  </div>
                )}

                {/* Article Grid */}
                {paginatedPosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedPosts.map((post) => (
                      <ArticleCard key={post.slug} post={post} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-8">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={cn(
                        "px-4 py-2 font-label text-sm rounded-md border transition-all duration-200",
                        currentPage === 1
                          ? "border-outline-variant/30 text-on-surface-variant/50 cursor-not-allowed"
                          : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                      )}
                    >
                      PREV
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          "px-4 py-2 font-label text-sm rounded-md border transition-all duration-200",
                          currentPage === page
                            ? "bg-primary text-on-primary border-primary"
                            : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                        )}
                      >
                        {String(page).padStart(2, "0")}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className={cn(
                        "px-4 py-2 font-label text-sm rounded-md border transition-all duration-200",
                        currentPage === totalPages
                          ? "border-outline-variant/30 text-on-surface-variant/50 cursor-not-allowed"
                          : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                      )}
                    >
                      NEXT &gt;
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant/20 py-12">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-xl font-bold text-primary tracking-widest font-headline mb-2">
                KINETIC_CONSOLE
              </div>
              <p className="text-sm text-on-surface-variant">
                Full-Stack Developer & UI/UX Designer
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors font-label text-sm"
              >
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors font-label text-sm"
              >
                LINKEDIN
              </a>
              <a
                href="mailto:iletisim@hikmetgulsesli.com"
                className="text-on-surface-variant hover:text-primary transition-colors font-label text-sm"
              >
                EMAIL
              </a>
            </div>
          </div>
          <div className="text-center mt-8 text-xs text-on-surface-variant/50 font-label">
            © 2024 Hikmet Güleşli. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}
