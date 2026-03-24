"use client";

import Link from "next/link";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import type { BlogPost, SocialLink } from "@/types";

interface BlogDetailScreenProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  socialLinks: SocialLink[];
}

export function BlogDetailScreen({ post, relatedPosts, socialLinks }: BlogDetailScreenProps) {
  const navLinks = [
    { label: "Projects", href: "/projects" },
    { label: "Stack", href: "/stack" },
    { label: "Archive", href: "/archive" },
    { label: "Contact", href: "/contact" },
  ];

  const tocItems = [
    { id: "introduction", label: "01. Introduction" },
    { id: "bottlenecks", label: "02. Identifying Bottlenecks" },
    { id: "rendering-optimization", label: "03. Rendering Strategies" },
    { id: "memoization-patterns", label: "04. Memoization Patterns" },
    { id: "concurrency", label: "05. Concurrent React" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Navigation */}
      <Navigation links={navLinks} showResumeButton={false} />

      <main className="flex-grow pt-24 pb-20">
        {/* Hero */}
        <section className="max-w-screen-xl mx-auto px-8 mb-16">
          <div className="flex flex-col max-w-4xl">
            <div className="flex items-center gap-4 font-label text-sm text-on-surface-variant mb-6">
              <Link href="/blog" className="hover:text-primary transition-colors">
                Archive
              </Link>
              <span>/</span>
              <span className="text-primary">{post.category}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter mb-6">
              {post.title}
            </h1>
            <div className="h-1 w-24 bg-primary mb-8" />
          </div>
        </section>

        {/* Content Grid */}
        <div className="max-w-screen-xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block lg:col-span-2">
            <nav className="sticky top-32 flex flex-col gap-3 border-l border-outline-variant pl-4">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="font-label text-xs text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <article className="lg:col-span-7 space-y-12">
            {/* Meta */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 pb-8 border-b border-outline-variant/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="font-headline font-bold text-primary">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-headline font-bold">{post.author.name}</p>
                  <p className="font-label text-xs text-on-surface-variant">
                    {post.author.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 font-label text-xs text-on-surface-variant md:ml-auto">
                <span>{post.readTime} dk okuma</span>
                <span>{"/"}</span>
                <span>{post.category}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="prose prose-invert prose-lg max-w-none space-y-8">
              <section id="introduction">
                <h2 className="font-headline text-3xl font-bold mb-6 text-gradient">
                  &gt;Introduction
                </h2>
                <div className="text-on-surface-variant leading-relaxed space-y-4">
                  <p>
                    Building performant React applications requires understanding how React works under
                    the hood and knowing the right optimization techniques. In this article, we&apos;ll
                    explore practical strategies to achieve consistent 60fps performance.
                  </p>
                </div>
              </section>

              <section id="bottlenecks">
                <h2 className="font-headline text-3xl font-bold mb-6">&gt;Identifying Bottlenecks</h2>
                <div className="text-on-surface-variant leading-relaxed space-y-4">
                  <p>
                    Before optimizing, we need to identify where the performance issues lie. React
                    DevTools Profiler is your best friend here. Look for components that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Render frequently without need</li>
                    <li>Take too long to complete their render</li>
                    <li>Cause cascading re-renders in child components</li>
                  </ul>
                </div>
              </section>

              <section id="rendering-optimization">
                <h2 className="font-headline text-3xl font-bold mb-6">&gt;Rendering Strategies</h2>
                <div className="text-on-surface-variant leading-relaxed space-y-4">
                  <h3 className="font-headline text-xl font-bold text-on-surface mt-8 mb-4">1. Code Splitting</h3>
                  <p>Split your bundle to load only what&apos;s needed:</p>
                  <pre className="bg-surface-container p-4 rounded-lg overflow-x-auto">
                    <code className="font-label text-sm text-secondary">
                      {`const HeavyComponent = lazy(() => 
  import('./HeavyComponent')
);`}
                    </code>
                  </pre>

                  <h3 className="font-headline text-xl font-bold text-on-surface mt-8 mb-4">2. Virtualization</h3>
                  <p>
                    For long lists, use windowing libraries like react-window or react-virtualized
                    to render only visible items.
                  </p>

                  <h3 className="font-headline text-xl font-bold text-on-surface mt-8 mb-4">3. Memoization</h3>
                  <p>Use React.memo, useMemo, and useCallback strategically:</p>
                  <pre className="bg-surface-container p-4 rounded-lg overflow-x-auto">
                    <code className="font-label text-sm text-secondary">
                      {`const ExpensiveChild = React.memo(({ data }) => {
  return <div>{/* expensive computation */}</div>;
});`}
                    </code>
                  </pre>
                </div>
              </section>

              <section id="memoization-patterns">
                <h2 className="font-headline text-3xl font-bold mb-6">&gt;Memoization Patterns</h2>
                <div className="text-on-surface-variant leading-relaxed space-y-4">
                  <h3 className="font-headline text-xl font-bold text-on-surface mt-8 mb-4">useMemo for Computed Values</h3>
                  <pre className="bg-surface-container p-4 rounded-lg overflow-x-auto">
                    <code className="font-label text-sm text-secondary">
                      {`const sortedData = useMemo(() => {
  return data.sort((a, b) => 
    a.name.localeCompare(b.name)
  );
}, [data]);`}
                    </code>
                  </pre>

                  <h3 className="font-headline text-xl font-bold text-on-surface mt-8 mb-4">useCallback for Event Handlers</h3>
                  <pre className="bg-surface-container p-4 rounded-lg overflow-x-auto">
                    <code className="font-label text-sm text-secondary">
                      {`const handleClick = useCallback((id) => {
  doSomething(id);
}, [doSomething]);`}
                    </code>
                  </pre>
                </div>
              </section>

              <section id="concurrency">
                <h2 className="font-headline text-3xl font-bold mb-6">&gt;Concurrent React</h2>
                <div className="text-on-surface-variant leading-relaxed space-y-4">
                  <p>
                    React 18&apos;s concurrent features allow us to build more responsive apps:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>useTransition</strong> for non-urgent updates</li>
                    <li><strong>useDeferredValue</strong> for debouncing values</li>
                    <li><strong>Suspense</strong> for async operations</li>
                  </ul>
                </div>
              </section>
            </div>

            {/* Share Section */}
            <div className="pt-8 border-t border-outline-variant/20">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-label text-sm text-on-surface-variant">Share:</span>
                <Button variant="ghost" size="sm" icon="brand_awareness">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" icon="code">
                  Dev.to
                </Button>
                <Button variant="ghost" size="sm" icon="alternate_email">
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon="content_copy"
                  iconPosition="left"
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                >
                  COPY
                </Button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8">
            {/* Related Posts */}
            <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/10">
              <h3 className="font-headline font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">terminal</span>
                Related Analysis
              </h3>
              <div className="space-y-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="block group"
                  >
                    <div className="font-label text-xs text-on-surface-variant mb-2">
                      {relatedPost.category}
                    </div>
                    <h4 className="font-headline text-sm font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                  </Link>
                ))}
              </div>
              <Link
                href="/blog"
                className="flex items-center gap-2 mt-6 text-primary font-label text-sm hover:underline"
              >
                VIEW_ALL_LOGS
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
}
