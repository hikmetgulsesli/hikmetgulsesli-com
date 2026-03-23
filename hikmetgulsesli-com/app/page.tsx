import Link from "next/link";
import { Github, Linkedin, Mail, ChevronDown, ArrowRight } from "lucide-react";
import { TypingAnimation } from "@/components/ui/TypingAnimation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { BlogPostCard } from "@/components/ui/BlogPostCard";
import { featuredProjects, recentBlogPosts } from "@/lib/data";

const roles = ["Full-Stack Developer", "UI/UX Designer", "Problem Solver"];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Top Navigation */}
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
              href="/projects"
              className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
            >
              PROJECTS
            </Link>
            <Link
              href="/blog"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              BLOG
            </Link>
            <Link
              href="/about"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
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
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center px-8 md:px-12 lg:px-24 py-20 bg-surface">
          <div className="max-w-4xl space-y-8">
            {/* Status Badge */}
            <StatusBadge status="online" label="Available for work" />

            {/* Hero Text */}
            <div className="space-y-4">
              <p className="font-label text-primary text-xl tracking-tight">
                &gt; Merhaba, ben Hikmet_
              </p>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none">
                <span className="text-gradient">KINETIC</span>
                <br />
                <span className="text-gradient">EXPERIENCES.</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                Building high-performance applications with{" "}
                <span className="text-on-surface font-semibold">
                  <TypingAnimation roles={roles} speed={80} />
                </span>
                . Focused on creating immersive digital interfaces that bridge
                the gap between human and machine.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/about"
                className="px-8 py-4 bg-primary text-on-primary font-bold rounded-md shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:scale-105 transition-transform flex items-center gap-2"
              >
                <span className="font-label">//</span> Hakkımda Bilgi Al
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 border border-outline-variant/30 text-on-surface font-bold rounded-md hover:bg-primary/5 hover:border-primary/50 transition-colors flex items-center gap-2"
              >
                <span className="font-label">&gt;</span> Projeleri Gör
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 pt-12 text-on-surface-variant">
              <a
                href="https://github.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                LINKEDIN
              </a>
              <a
                href="https://x.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm group"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X_SOCIAL
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <ChevronDown className="w-6 h-6 text-on-surface-variant" />
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-16 md:py-24 px-8 md:px-12 lg:px-24 bg-surface-container-low">
          <div className="max-w-[1280px] mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <span className="font-label text-primary text-sm uppercase tracking-[0.3em] block mb-2">
                  // featured_projects
                </span>
                <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter uppercase">
                  Selected Works
                </h2>
              </div>
              <Link
                href="/projects"
                className="font-label text-primary hover:underline underline-offset-8 transition-all flex items-center gap-2 group"
              >
                Tümünü Gör
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProjects.slice(0, 6).map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="py-16 md:py-24 px-8 md:px-12 lg:px-24 bg-surface">
          <div className="max-w-[1280px] mx-auto">
            {/* Section Header */}
            <div className="mb-12">
              <span className="font-label text-primary text-sm uppercase tracking-[0.3em] block mb-2">
                // recent_writing
              </span>
              <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter uppercase">
                Logs &amp; Research
              </h2>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {recentBlogPosts.slice(0, 3).map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 px-8 md:px-12 lg:px-24 bg-surface-container-lowest relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-none">
              Let&apos;s build something{" "}
              <span className="text-primary">amazing</span> together.
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
              Currently open for new projects and collaborations. If you have a
              challenge that needs precise execution, let&apos;s talk.
            </p>
            <div className="pt-8">
              <Link
                href="/contact"
                className="px-12 py-5 bg-primary text-on-primary font-bold rounded-md shadow-[0_0_30px_rgba(78,222,163,0.4)] hover:scale-105 transition-transform flex items-center gap-3 mx-auto uppercase tracking-widest inline-flex"
              >
                <Mail className="w-5 h-5" />
                İletişime Geç
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-6 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4 max-w-[1280px] mx-auto">
          <div className="text-primary font-bold font-headline">
            HIKMET GÜLEŞLİ
          </div>
          <div className="font-label text-xs tracking-mono text-on-surface-variant">
            © 2024 HIKMET GÜLEŞLİ // SYSTEM_READY
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
            <a
              href="/source"
              className="text-on-surface-variant hover:text-primary underline decoration-outline/30 transition-opacity duration-200"
            >
              SOURCE_CODE
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
