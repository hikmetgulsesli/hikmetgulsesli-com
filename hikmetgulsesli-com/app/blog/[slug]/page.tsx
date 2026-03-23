import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { getBlogDetail, getAllBlogSlugs } from "@/lib/blog-detail";
import { generateArticleJsonLd, generateBreadcrumbJsonLd, BASE_URL } from "@/lib/seo";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
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

function ProseContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockLanguage = "";
  let codeBlockId = "";
  let codeBlockContent = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${codeBlockId}`} className="my-6 bg-surface-container p-4 rounded-lg overflow-x-auto">
            <code className="font-mono text-sm text-primary">{codeBlockContent.trim()}</code>
          </pre>
        );
        inCodeBlock = false;
        codeBlockContent = "";
      } else {
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

    if (line.trim() === "") continue;

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

    if (line.includes("`")) {
      const parts = line.split(/(`[^`]+`)/g);
      elements.push(
        <p key={i} className="text-lg leading-relaxed text-on-surface-variant mb-4">
          {parts.map((part, idx) => {
            if (part.startsWith("`") && part.endsWith("`")) {
              return (
                <code
                  key={idx}
                  className="bg-surface-container px-2 py-1 rounded font-mono text-sm text-primary"
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

    elements.push(
      <p key={i} className="text-lg leading-relaxed text-on-surface-variant mb-4">
        {renderInlineFormatting(line)}
      </p>
    );
  }

  return <>{elements}</>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogDetail(slug);

  if (!post) {
    return {
      title: "Yazı Bulunamadı",
      description: "Aradığınız blog yazısı mevcut değil.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name, url: `${BASE_URL}/about` }],
    openGraph: {
      title: `${post.title} | Hikmet Güleşli`,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      locale: "tr_TR",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Hikmet Güleşli`,
      description: post.excerpt,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogDetail(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleJsonLd({
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    authorName: post.author.name,
    authorUrl: `${BASE_URL}/about`,
    publisherName: "Hikmet Güleşli",
    publisherUrl: BASE_URL,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    slug,
  });

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` },
    { name: post.title, url: `${BASE_URL}/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <div className="min-h-screen flex flex-col">
        {/* Scanline Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

        {/* Top Navigation */}
        <header className="bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 fixed top-0 w-full z-50">
          <nav className="flex justify-between items-center px-8 h-16 max-w-[1280px] mx-auto">
            <Link
              href="/"
              className="text-xl font-bold text-primary tracking-widest font-headline"
            >
              KINETIC_CONSOLE
            </Link>
            <div className="hidden md:flex gap-8 items-center">
              <Link
                className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
                href="/projects"
              >
                PROJECTS
              </Link>
              <Link
                className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
                href="/blog"
              >
                BLOG
              </Link>
              <Link
                className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
                href="/about"
              >
                STACK
              </Link>
              <Link
                className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
                href="/contact"
              >
                CONTACT
              </Link>
            </div>
            <button className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-md font-headline uppercase tracking-tighter font-bold text-sm hover:bg-primary/20 transition-all">
              DOWNLOAD_CV
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-sm font-label">
            <Link href="/" className="text-outline hover:text-primary transition-colors">
              Ana Sayfa
            </Link>
            <span className="text-outline">/</span>
            <Link href="/blog" className="text-outline hover:text-primary transition-colors">
              Blog
            </Link>
            <span className="text-outline">/</span>
            <span className="text-on-surface-variant truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>

          {/* Article Header */}
          <article>
            <header className="mb-12">
              {/* Meta */}
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center gap-2 text-sm font-label text-secondary-fixed-dim">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="text-outline">•</span>
                <span className="flex items-center gap-2 text-sm font-label text-secondary-fixed-dim">
                  <Clock className="w-4 h-4" />
                  {post.readTime} dk okuma
                </span>
              </div>

              {/* Title */}
              <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-on-surface-variant leading-relaxed mb-6">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-label border border-primary/20 uppercase tracking-wider">
                  {post.category}
                </span>
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface-container text-on-surface-variant text-xs font-label border border-outline-variant/20 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Article Content */}
            <div className="prose-content">
              <ProseContent content={post.content} />
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-outline-variant/20">
              <p className="text-sm font-label text-on-surface-variant mb-4 uppercase tracking-wider">
                Paylaş
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${BASE_URL}/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary border border-outline-variant/20 text-xs font-label uppercase tracking-wider transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${BASE_URL}/blog/${slug}`)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary border border-outline-variant/20 text-xs font-label uppercase tracking-wider transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary border border-outline-variant/20 text-xs font-label uppercase tracking-wider transition-colors"
                >
                  <Link2 className="w-4 h-4" />
                  Bağlantıyı Kopyala
                </button>
              </div>
            </div>

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
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-primary/20 bg-surface-container-low">
          <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 w-full gap-4 max-w-[1280px] mx-auto">
            <div className="text-primary font-bold font-label text-[10px] uppercase tracking-widest">
              © 2024 SENTINEL_INTERFACE // ALL_RIGHTS_RESERVED
            </div>
            <div className="flex gap-6 font-label text-[10px] uppercase tracking-widest">
              <a
                className="text-outline hover:text-primary transition-all"
                href="https://github.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB
              </a>
              <a
                className="text-outline hover:text-primary transition-all"
                href="https://linkedin.com/in/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINKEDIN
              </a>
              <span className="text-primary">TERMINAL_STATUS:ONLINE</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
