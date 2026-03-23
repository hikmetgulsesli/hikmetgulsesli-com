"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { ProjectDetail, getAdjacentProjects } from "@/lib/project-detail";
import { Accordion } from "@/components/ui/Accordion";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { TechStackGrid } from "@/components/ui/TechStackGrid";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { cn } from "@/lib/utils";

interface ProjectDetailClientProps {
  project: ProjectDetail;
}

const tocItems = [
  { id: "genel-bakis", title: "Genel Bakış", level: 2 as const },
  { id: "teknoloji-yigini", title: "Teknoloji Yığını", level: 2 as const },
  { id: "galeri", title: "Ekran Görüntüleri", level: 2 as const },
  { id: "zorluklar-ve-cozumler", title: "Zorluklar ve Çözümler", level: 2 as const },
  { id: "kaynak-kod", title: "Kaynak Kod", level: 2 as const },
  { id: "sonuclar", title: "Sonuçlar", level: 2 as const },
];

const sampleCode = `// Sentinel Dashboard - Veri izleme örneği
import { useWebSocket } from '@/hooks/useWebSocket';
import { AnomalyDetector } from '@/lib/ml/anomalyDetector';

export function NetworkMonitor({ networkId }: { networkId: string }) {
  const { data, status } = useWebSocket(\`/api/networks/\${networkId}/stream\`);

  const anomalies = useMemo(() => {
    if (!data) return [];
    return AnomalyDetector.detect(data.packets);
  }, [data]);

  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard label="Paket/s" value={data?.packetRate} />
      <MetricCard label="Gecikme" value={data?.latency} unit="ms" />
      <MetricCard 
        label="Anomali" 
        value={anomalies.length} 
        variant={anomalies.length > 0 ? 'warning' : 'success'} 
      />
    </div>
  );
}`;

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { prev, next } = getAdjacentProjects(project.slug);

  const accordionItems = [
    {
      value: "problem",
      title: "Problem",
      content: (
        <p>{project.overview?.problem || "Proje detayları yakında eklenecek."}</p>
      ),
    },
    {
      value: "cozum",
      title: "Çözüm",
      content: (
        <p>{project.overview?.solution || "Çözüm detayları yakında eklenecek."}</p>
      ),
    },
    {
      value: "etki",
      title: "Etki",
      content: (
        <p>{project.overview?.impact || "Etki analizi yakında eklenecek."}</p>
      ),
    },
  ];

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
              className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
            >
              PROJELER
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
        {/* Hero Thumbnail */}
        <section className="relative w-full h-[500px] bg-surface-container overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
          
          {/* Draft Overlay */}
          {project.status === "draft" && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface/90 backdrop-blur-sm">
              <div className="text-center">
                <div className="inline-block px-6 py-3 bg-surface-container border border-primary/30 rounded-lg">
                  <span className="font-headline text-xl text-primary uppercase tracking-wider">
                    Bu proje henüz yayınlanmadı
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="absolute top-4 left-4 z-10">
            <Link
              href="/projects"
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest/80 backdrop-blur-sm rounded-lg text-on-surface hover:text-primary transition-colors font-label text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tüm Projeler</span>
            </Link>
          </div>
        </section>

        {/* Content Area */}
        <section className="py-12 px-8 md:px-12 lg:px-24 bg-surface">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
              {/* Main Content */}
              <div className="space-y-16">
                {/* Project Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <span className="font-label text-primary text-sm uppercase tracking-[0.3em] block mb-2">
                    // proje_detay
                  </span>
                  <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4 text-on-surface">
                    {project.title}
                  </h1>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{new Date(project.publishedAt).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}</span>
                    </span>
                    {project.duration && (
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{project.duration}</span>
                      </span>
                    )}
                    {project.client && (
                      <span className="px-3 py-1 bg-surface-container rounded-full font-label text-xs uppercase tracking-wider">
                        {project.client}
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Overview Section */}
                <motion.div
                  id="genel-bakis"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h2 className="font-headline text-2xl font-bold uppercase tracking-tight mb-6 text-on-surface border-l-4 border-primary pl-4">
                    Genel Bakış
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed mb-8">
                    {project.content}
                  </p>

                  {project.overview && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/20">
                        <h3 className="font-headline text-sm font-bold uppercase text-primary mb-2">Problem</h3>
                        <p className="text-sm text-on-surface-variant">{project.overview.problem}</p>
                      </div>
                      <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/20">
                        <h3 className="font-headline text-sm font-bold uppercase text-primary mb-2">Çözüm</h3>
                        <p className="text-sm text-on-surface-variant">{project.overview.solution}</p>
                      </div>
                      <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/20">
                        <h3 className="font-headline text-sm font-bold uppercase text-primary mb-2">Etki</h3>
                        <p className="text-sm text-on-surface-variant">{project.overview.impact}</p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Tech Stack Section */}
                <motion.div
                  id="teknoloji-yigini"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h2 className="font-headline text-2xl font-bold uppercase tracking-tight mb-6 text-on-surface border-l-4 border-primary pl-4">
                    Teknoloji Yığını
                  </h2>
                  <TechStackGrid items={project.techStackItems} />
                </motion.div>

                {/* Gallery Section */}
                {project.images.length > 0 && (
                  <motion.div
                    id="galeri"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <h2 className="font-headline text-2xl font-bold uppercase tracking-tight mb-6 text-on-surface border-l-4 border-primary pl-4">
                      Ekran Görüntüleri
                    </h2>
                    <ImageCarousel images={project.images} alt={project.title} />
                  </motion.div>
                )}

                {/* Challenges & Solutions */}
                <motion.div
                  id="sartlar-ve-cozumler"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h2 className="font-headline text-2xl font-bold uppercase tracking-tight mb-6 text-on-surface border-l-4 border-primary pl-4">
                    Zorluklar ve Çözümler
                  </h2>
                  <Accordion items={accordionItems} defaultValue="problem" />
                </motion.div>

                {/* Code Block */}
                <motion.div
                  id="kaynak-kod"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h2 className="font-headline text-2xl font-bold uppercase tracking-tight mb-6 text-on-surface border-l-4 border-primary pl-4">
                    Kaynak Kod
                  </h2>
                  <CodeBlock code={sampleCode} language="typescript" filename="NetworkMonitor.tsx" />
                </motion.div>

                {/* Results */}
                {project.results && (
                  <motion.div
                    id="sonuclar"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <h2 className="font-headline text-2xl font-bold uppercase tracking-tight mb-6 text-on-surface border-l-4 border-primary pl-4">
                      Sonuçlar
                    </h2>
                    <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/20">
                      <p className="text-on-surface-variant leading-relaxed">{project.results}</p>
                    </div>
                  </motion.div>
                )}

                {/* Project Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h2 className="font-headline text-2xl font-bold uppercase tracking-tight mb-6 text-on-surface border-l-4 border-primary pl-4">
                    Proje Linkleri
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 bg-surface-container border border-outline-variant/30 rounded-lg text-on-surface hover:border-primary hover:text-primary transition-all duration-200"
                      >
                        <Github className="w-5 h-5" />
                        <span className="font-headline font-semibold uppercase tracking-tight">GitHub Deposu</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-all duration-200"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span className="font-headline font-semibold uppercase tracking-tight">Canlı Demo</span>
                      </a>
                    )}
                    {project.caseStudyUrl && (
                      <a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 bg-surface-container border border-outline-variant/30 rounded-lg text-on-surface hover:border-primary hover:text-primary transition-all duration-200"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span className="font-headline font-semibold uppercase tracking-tight">Vaka Çalışması</span>
                      </a>
                    )}
                  </div>
                </motion.div>

                {/* Next/Prev Navigation */}
                <nav className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-outline-variant/20">
                  {prev ? (
                    <Link
                      href={`/projects/${prev.slug}`}
                      className="flex-1 flex items-center gap-3 px-6 py-4 bg-surface-container rounded-lg border border-outline-variant/30 hover:border-primary transition-all duration-200 group"
                    >
                      <ArrowLeft className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                      <div className="text-left">
                        <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant block">Önceki Proje</span>
                        <span className="font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">{prev.title}</span>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                  {next && (
                    <Link
                      href={`/projects/${next.slug}`}
                      className="flex-1 flex items-center justify-end gap-3 px-6 py-4 bg-surface-container rounded-lg border border-outline-variant/30 hover:border-primary transition-all duration-200 group text-right"
                    >
                      <div className="text-right">
                        <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant block">Sonraki Proje</span>
                        <span className="font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">{next.title}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                    </Link>
                  )}
                </nav>
              </div>

              {/* Sticky Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-8">
                  {/* Table of Contents */}
                  <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/20">
                    <TableOfContents items={tocItems} />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-lg text-on-surface hover:border-primary hover:text-primary transition-all duration-200 font-headline font-semibold text-sm uppercase tracking-tight"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-all duration-200 font-headline font-semibold text-sm uppercase tracking-tight"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Canlı Demo</span>
                      </a>
                    )}
                    {project.caseStudyUrl && (
                      <a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-lg text-on-surface hover:border-primary hover:text-primary transition-all duration-200 font-headline font-semibold text-sm uppercase tracking-tight"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Vaka Çalışması</span>
                      </a>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-6 mt-auto">
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
    </div>
  );
}
