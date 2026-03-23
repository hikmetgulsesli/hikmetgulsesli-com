"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock, X, ChevronDown, ChevronUp, Link2, Twitter, Linkedin, Check } from "lucide-react";
import { BlogDetailPost, getRelatedPosts, parseTOC } from "@/lib/blog-detail";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface BlogDetailClientProps {
  post: BlogDetailPost;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[çğıöşü]/g, "c")
    .replace(/[ÇĞİÖŞÜ]/g, "C")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "Oca", "Şub", "Mar", "Nis", "May", "Haz",
    "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function ProseContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  // Code block state
  let inCodeBlock = false;
  let codeBlockLanguage = "";
  let codeBlockId = "";
  let codeBlockContent = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block start/end
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <div key={`code-${codeBlockId}`} className="my-6">
            <CodeBlock code={codeBlockContent.trim()} language={codeBlockLanguage} />
          </div>
        );
        inCodeBlock = false;
        codeBlockContent = "";
      } else {
        // Start code block
        codeBlockLanguage = line.slice(3).trim() || "typescript";
        codeBlockId = `code-${i}`;
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent += line + "\n";
      continue;
    }

    // Skip empty lines
    if (line.trim() === "") continue;

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-4 border-primary pl-6 my-6 italic text-on-surface-variant"
        >
          {line.slice(2)}
        </blockquote>
      );
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      const title = line.slice(3).trim();
      const id = slugify(title);
      elements.push(
        <h2
          key={i}
          id={id}
          className="font-headline text-2xl font-bold mt-12 mb-4 text-primary scroll-mt-20"
        >
          <a href={`#${id}`} className="hover:underline">{title}</a>
        </h2>
      );
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      const title = line.slice(4).trim();
      const id = slugify(title);
      elements.push(
        <h3
          key={i}
          id={id}
          className="font-headline text-xl font-semibold mt-8 mb-3 text-on-surface scroll-mt-20"
        >
          <a href={`#${id}`} className="hover:underline">{title}</a>
        </h3>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const listItems: string[] = [line.slice(2)];
      let j = i + 1;
      while (j < lines.length && (lines[j].startsWith("- ") || lines[j].trim() === "")) {
        if (lines[j].startsWith("- ")) {
          listItems.push(lines[j].slice(2));
        }
        j++;
      }
      elements.push(
        <ul key={i} className="pl-6 mb-4 space-y-2 list-disc list-inside text-on-surface-variant">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">{renderInlineFormatting(item)}</li>
          ))}
        </ul>
      );
      i = j - 1;
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [line.replace(/^\d+\.\s/, "")];
      let j = i + 1;
      while (j < lines.length && (/^\d+\.\s/.test(lines[j]) || lines[j].trim() === "")) {
        if (/^\d+\.\s/.test(lines[j])) {
          listItems.push(lines[j].replace(/^\d+\.\s/, ""));
        }
        j++;
      }
      elements.push(
        <ol key={i} className="pl-6 mb-4 space-y-2 list-decimal list-inside text-on-surface-variant">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">{renderInlineFormatting(item)}</li>
          ))}
        </ol>
      );
      i = j - 1;
      continue;
    }

    // Inline code in paragraph
    if (line.includes("`")) {
      const parts = line.split(/(`[^`]+`)/g);
      elements.push(
        <p key={i} className="text-lg leading-relaxed text-on-surface-variant mb-4">
          {parts.map((part, idx) => {
            if (part.startsWith("`") && part.endsWith("`")) {
              return (
                <code
                  key={idx}
                  className="bg-surface-container px-2 py-1 rounded font-label text-sm text-primary"
                >
                  {part.slice(1, -1)}
                </code>
              );
            }
            return <span key={idx}>{renderInlineFormatting(part)}</span>;
          })}
        </p>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-lg leading-relaxed text-on-surface-variant mb-4">
        {renderInlineFormatting(line)}
      </p>
    );
  }

  return <>{elements}</>;
}

function renderInlineFormatting(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const content = match[0];
    if (content.startsWith("**") && content.endsWith("**")) {
      parts.push(<strong key={match.index} className="font-semibold text-on-surface">{content.slice(2, -2)}</strong>);
    } else if (content.startsWith("*") && content.endsWith("*")) {
      parts.push(<em key={match.index}>{content.slice(1, -1)}</em>);
    }
    lastIndex = match.index + content.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isTOCOpen, setIsTOCOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState<string | null>(null);

  const tocItems = parseTOC(post.content);
  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

  const copyShareUrl = useCallback(async (platform: string) => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(platform);
      setTimeout(() => setShareCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  const shareOnTwitter = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  }, [post.title]);

  const shareOnLinkedIn = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Header Navigation */}
      <header className="bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 h-16 max-w-[1280px] mx-auto">
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
              href="/projects"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              PROJELER
            </Link>
            <Link
              href="/blog"
              className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
            >
              BLOG
            </Link>
            <Link
              href="/about"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              HAKKIMDA
            </Link>
            <Link
              href="/contact"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              İLETİŞİM
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="w-full max-h-[400px] overflow-hidden bg-surface-container relative cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <span className="opacity-0 hover:opacity-100 transition-opacity duration-200 text-white font-label text-sm uppercase tracking-wider bg-black/50 px-3 py-1 rounded">
                Büyüt
              </span>
            </div>
          </div>
        )}

        {/* Article Header */}
        <div className="max-w-[720px] mx-auto px-8 pt-12">
          {/* Category and Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-label text-xs uppercase tracking-wider">
              {post.category}
            </span>
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full font-label text-xs uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 font-label text-sm text-on-surface-variant mb-8 pb-8 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{post.readTime} dk okuma</span>
            </div>
          </div>
        </div>

        {/* Content with Sidebar Layout */}
        <div className="max-w-[1280px] mx-auto px-8 pb-16">
          <div className="flex gap-12">
            {/* Main Content */}
            <article className="flex-1 max-w-[720px]">
              <div className="prose-content">
                <ProseContent content={post.content} />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-outline-variant/20">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="px-3 py-1 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary rounded-full font-label text-xs uppercase tracking-wider transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="mt-8 flex items-center gap-4">
                <span className="font-label text-sm text-on-surface-variant uppercase tracking-wider">
                  Paylaş:
                </span>
                <button
                  onClick={shareOnTwitter}
                  className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary rounded-lg font-label text-xs uppercase tracking-wider transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary rounded-lg font-label text-xs uppercase tracking-wider transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </button>
                <button
                  onClick={() => copyShareUrl("link")}
                  className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary rounded-lg font-label text-xs uppercase tracking-wider transition-colors"
                >
                  {shareCopied === "link" ? (
                    <>
                      <Check className="w-4 h-4 text-primary" />
                      Kopyalandı
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" />
                      Kopyala
                    </>
                  )}
                </button>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-surface-container rounded-xl border border-outline-variant/20">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-surface-container-high flex-shrink-0">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline font-bold text-on-surface">
                      {post.author.name}
                    </h3>
                    <p className="text-sm text-primary mb-2">{post.author.title}</p>
                    <p className="text-sm text-on-surface-variant">{post.author.bio}</p>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="mt-16">
                  <h2 className="font-headline text-2xl font-bold text-on-surface mb-8">
                    İlgili Yazılar
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <ArticleCard key={relatedPost.slug} post={relatedPost} />
                    ))}
                  </div>
                </div>
              )}

              {/* Back to Blog */}
              <div className="mt-12">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-label text-sm uppercase tracking-wider transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Tüm Yazılara Dön
                </Link>
              </div>
            </article>

            {/* Sidebar - Table of Contents (Desktop) */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          </div>

          {/* Mobile TOC */}
          <div className="lg:hidden mt-8">
            <button
              onClick={() => setIsTOCOpen(!isTOCOpen)}
              className="flex items-center justify-between w-full px-4 py-3 bg-surface-container border border-outline-variant/20 rounded-lg"
            >
              <span className="font-label text-sm uppercase tracking-wider text-on-surface-variant">
                İçindekiler
              </span>
              {isTOCOpen ? (
                <ChevronUp className="w-4 h-4 text-primary" />
              ) : (
                <ChevronDown className="w-4 h-4 text-on-surface-variant" />
              )}
            </button>
            <AnimatePresence>
              {isTOCOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4">
                    <TableOfContents items={tocItems} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4 max-w-[1280px] mx-auto">
          <div className="text-primary font-bold font-headline">
            HİKMET GÜLEŞLİ
          </div>
          <div className="font-label text-xs tracking-mono text-on-surface-variant">
            © 2024 HİKMET GÜLEŞLİ // SYSTEM_READY
          </div>
          <div className="flex gap-6 font-label text-xs tracking-mono">
            <a
              href="https://github.com/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary underline decoration-outline/30 transition-opacity duration-200"
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com/in/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary underline decoration-outline/30 transition-opacity duration-200"
            >
              LINKEDIN
            </a>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && post.featuredImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Kapat"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-5xl h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
