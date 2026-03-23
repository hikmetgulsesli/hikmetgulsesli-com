import { Github, Linkedin, Twitter } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center px-6 md:px-24 py-20 bg-surface">
        <div className="max-w-4xl space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-surface-container border border-outline-variant/20 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              Available for work
            </span>
          </div>

          {/* Hero Text */}
          <div className="space-y-4">
            <p className="font-label text-primary text-xl tracking-tight">
              &gt; Merhaba, ben Hikmet_
            </p>
            <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter leading-none text-gradient">
              KINETIC
              <br />
              EXPERIENCES.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              Building high-performance applications with{" "}
              <span className="text-on-surface font-semibold">
                React, Next.js, and TypeScript
              </span>
              . Focused on creating immersive digital interfaces that bridge
              the gap between human and machine.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="/about"
              className="px-8 py-4 bg-primary text-on-primary font-bold rounded-md shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:scale-105 transition-transform flex items-center gap-2"
            >
              <span className="font-label">//</span> Hakkımda Bilgi Al
            </a>
            <a
              href="/projects"
              className="px-8 py-4 border border-outline-variant/30 text-on-surface font-bold rounded-md hover:bg-primary/5 transition-colors flex items-center gap-2"
            >
              <span className="font-label">&gt;</span> Projeleri Gör
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 pt-12 text-on-surface-variant">
            <a
              className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
              href="https://github.com/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
              GITHUB
            </a>
            <a
              className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
              href="https://linkedin.com/in/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5" />
              LINKEDIN
            </a>
            <a
              className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
              href="https://x.com/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5" />
              X_SOCIAL
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <svg
            className="w-6 h-6 text-on-surface-variant"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-6 md:px-24 bg-surface-container-low">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-label text-primary text-sm uppercase tracking-[0.3em] block mb-2">
              // featured_projects
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter uppercase">
              Selected Works
            </h2>
          </div>
          <a
            className="font-label text-primary hover:underline underline-offset-8 transition-all"
            href="/projects"
          >
            Tümünü Gör →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Card 1 */}
          <article className="group bg-surface-container hover:bg-surface-container-high transition-all duration-300 border-l-2 border-transparent hover:border-primary overflow-hidden">
            <div className="aspect-video w-full overflow-hidden bg-slate-900">
              <img
                alt="Sentinel Dashboard"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkxyt6DgfFIcoJXJU2ynxAPf_Kh0K2mgXzQYeDmICUPu84aXeppBelsxi9eHFLTEHRF_-mVWEw8R77KKTw3sGULpYXm8-lemSAxX8_HUCjsmMvtnIpDbdhRTsX6RwPi4ZvgVcf59uljbHHUn78WpRklZV2H6IFdfJDHhAADrHD_Nr2AsRtSojOAJ3m5zhMmXoCtdMk3LVXQDwUTsU3DoKFyzA5KRmp0n-JcZ6EVwgS9wJzwWg2lL0WSDmxBKVwFkJFSqbLPLq1YT0"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="font-headline text-xl font-bold tracking-tight uppercase">
                Sentinel Dashboard
              </h3>
              <p className="text-sm text-on-surface-variant line-clamp-2">
                Real-time network security monitoring interface with 3D packet visualization.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2 py-1 bg-surface-container-lowest font-label text-[10px] text-secondary">
                  REACT
                </span>
                <span className="px-2 py-1 bg-surface-container-lowest font-label text-[10px] text-secondary">
                  TAILWIND
                </span>
                <span className="px-2 py-1 bg-surface-container-lowest font-label text-[10px] text-secondary">
                  D3.JS
                </span>
              </div>
            </div>
          </article>

          {/* Project Card 2 */}
          <article className="group bg-surface-container hover:bg-surface-container-high transition-all duration-300 border-l-2 border-transparent hover:border-primary overflow-hidden">
            <div className="aspect-video w-full overflow-hidden bg-slate-900">
              <img
                alt="Claw Open Projects"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG1iAyEaYNjFG5dorw33MtiEbBOuinKJdGswv0LIPOFmD3tbOUhX1bmkHeU89vZekUXNoGxiP0yDZEo3dTFdPIfNogbNY2FbEoJ1n-SXJVWGti_b6xOABo5vWc8ORNl_g7tELU93mYjGuYtirFSBW9qI-AkAQzuZ4rNvzY1pri1o07WSOLNR0PwHJ4WU0uI_-u2Z-VkjjnhSmZrDwk11G8U9z11EHfeafC3ijAn0eFWK-H5IQm-kaKXD9hW8QNARmI2Mh2EAhXxmo"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="font-headline text-xl font-bold tracking-tight uppercase">
                Claw Open Projects
              </h3>
              <p className="text-sm text-on-surface-variant line-clamp-2">
                A decentralized collaboration platform for open-source hardware developers.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2 py-1 bg-surface-container-lowest font-label text-[10px] text-secondary">
                  NEXT.JS
                </span>
                <span className="px-2 py-1 bg-surface-container-lowest font-label text-[10px] text-secondary">
                  TYPESCRIPT
                </span>
                <span className="px-2 py-1 bg-surface-container-lowest font-label text-[10px] text-secondary">
                  POSTGRES
                </span>
              </div>
            </div>
          </article>

          {/* Project Card 3 */}
          <article className="group bg-surface-container hover:bg-surface-container-high transition-all duration-300 border-l-2 border-transparent hover:border-primary overflow-hidden">
            <div className="aspect-video w-full overflow-hidden bg-slate-900">
              <img
                alt="AI Agent Platform"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg897AAyV5wtVBrsS9VplMPCXPsKwOrPur_J_KVH6yzThF0cdjJD-5D5YVQGaXYsGexWyfXVjnGLIQ8LT-7ENc0yTloPE47RbqoQuzdjNcWb0GKh_9SXKmUuoYfmwn1zRiT33yfi3K8_xp63p_g9XuiEWgPxwtlqF0myc-7KhyACXFYnHpcaDvgHtXpkDsuZSQESbwBUcadfC9qVC9oREw5JuhcyrV57_fjLokx_ghnmrC09eq-o-oxp8c5ciS1lwmWbI_y6xxDik"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="font-headline text-xl font-bold tracking-tight uppercase">
                AI Agent Platform
              </h3>
              <p className="text-sm text-on-surface-variant line-clamp-2">
                Autonomous agent orchestration framework for complex business workflows.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2 py-1 bg-surface-container-lowest font-label text-[10px] text-secondary">
                  PYTHON
                </span>
                <span className="px-2 py-1 bg-surface-container-lowest font-label text-[10px] text-secondary">
                  LANGCHAIN
                </span>
                <span className="px-2 py-1 bg-surface-container-lowest font-label text-[10px] text-secondary">
                  FASTAPI
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Recent Writing */}
      <section className="py-24 px-6 md:px-24 bg-surface">
        <div className="mb-12">
          <span className="font-label text-primary text-sm uppercase tracking-[0.3em] block mb-2">
            // recent_writing
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter uppercase">
            Logs & Research
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Blog Post 1 */}
          <article className="space-y-4">
            <div className="font-label text-xs text-secondary-fixed-dim tracking-widest uppercase">
              MARCH 12, 2024
            </div>
            <h3 className="font-headline text-2xl font-bold tracking-tight hover:text-primary transition-colors cursor-pointer leading-tight">
              Optimizing React for 60fps
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              A deep dive into virtualization, memory management, and rendering pipelines in complex dashboards.
            </p>
            <div className="flex items-center gap-2 font-label text-[10px] text-on-surface-variant">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              8 MIN READ
            </div>
          </article>

          {/* Blog Post 2 */}
          <article className="space-y-4">
            <div className="font-label text-xs text-secondary-fixed-dim tracking-widest uppercase">
              FEB 28, 2024
            </div>
            <h3 className="font-headline text-2xl font-bold tracking-tight hover:text-primary transition-colors cursor-pointer leading-tight">
              The Future of AI Agents
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Why the next shift in UI will be agentic, moving from interfaces to instructions and workflows.
            </p>
            <div className="flex items-center gap-2 font-label text-[10px] text-on-surface-variant">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              12 MIN READ
            </div>
          </article>

          {/* Blog Post 3 */}
          <article className="space-y-4">
            <div className="font-label text-xs text-secondary-fixed-dim tracking-widest uppercase">
              JAN 15, 2024
            </div>
            <h3 className="font-headline text-2xl font-bold tracking-tight hover:text-primary transition-colors cursor-pointer leading-tight">
              Building Terminal UIs
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Exploring the psychology of the CLI and how to translate that efficiency to the modern web browser.
            </p>
            <div className="flex items-center gap-2 font-label text-[10px] text-on-surface-variant">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              6 MIN READ
            </div>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-24 bg-surface-container-lowest relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
            Let&apos;s build something <span className="text-primary">amazing</span> together.
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
            Currently open for new projects and collaborations. If you have a challenge that needs precise execution, let&apos;s talk.
          </p>
          <div className="pt-8">
            <a
              href="/contact"
              className="px-12 py-5 bg-primary text-on-primary font-bold rounded-md shadow-[0_0_30px_rgba(78,222,163,0.4)] hover:scale-105 transition-transform flex items-center gap-3 mx-auto uppercase tracking-widest inline-flex"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              İletişime Geç
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
