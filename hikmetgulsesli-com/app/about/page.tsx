"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

interface TimelineItemProps {
  date: string;
  title: string;
  company: string;
  description: string;
  isCurrent?: boolean;
  index: number;
}

function TimelineItem({
  date,
  title,
  company,
  description,
  isCurrent = false,
  index,
}: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="relative pl-12 pb-16 last:pb-0"
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full ${
          isCurrent
            ? "bg-primary shadow-[0_0_10px_rgba(78,222,163,1)]"
            : "bg-surface-container-highest border border-primary/50"
        }`}
      />

      {/* Timeline line */}
      {index < 2 && (
        <div className="absolute left-[0px] top-5 bottom-0 w-px bg-primary/30" />
      )}

      {/* Date badge */}
      <span
        className={`font-label text-xs px-3 py-1 rounded-full mb-4 inline-block border ${
          isCurrent
            ? "text-primary-fixed-dim bg-primary/10 border-primary/20"
            : "text-slate-500 bg-surface-container-high border-outline-variant/20"
        }`}
      >
        {date}
      </span>

      {/* Title */}
      <h4 className="text-xl font-bold font-headline text-on-surface">
        {title}
      </h4>

      {/* Company */}
      <p className="text-primary text-sm font-label mb-3">@ {company}</p>

      {/* Description */}
      <p className="text-on-surface-variant text-sm leading-relaxed max-w-lg">
        {description}
      </p>
    </motion.div>
  );
}

interface SkillBarProps {
  name: string;
  percentage: number;
  icon: string;
  index: number;
}

function SkillBar({ name, percentage, icon, index }: SkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      className="space-y-2"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex justify-between text-xs font-label mb-2">
        <span className="flex items-center gap-2">
          <span className="text-sm">{icon}</span> {name}
        </span>
        {showTooltip && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-primary bg-surface-container-high px-2 py-0.5 rounded text-[10px]"
          >
            {percentage}%
          </motion.span>
        )}
      </div>
      <div className="h-1 bg-surface-container rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary shadow-[0_0_8px_rgba(78,222,163,0.5)]"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{
            duration: 1,
            delay: 0.3 + index * 0.1,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
}

function AvailabilityToggle() {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="bg-surface-container-low px-6 py-4 rounded-xl flex items-center gap-6 border border-outline-variant/10 shadow-lg">
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          checked={isAvailable}
          onChange={() => setIsAvailable(!isAvailable)}
          className="sr-only peer"
          type="checkbox"
          aria-label="Toggle availability"
        />
        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/20 shadow-[0_0_10px_rgba(78,222,163,0.2)]" />
      </div>
      <span
        className={`font-label text-sm tracking-widest animate-pulse ${
          isAvailable ? "text-primary" : "text-slate-500"
        }`}
      >
        {isAvailable
          ? "SYSTEM_READY // AVAILABLE_FOR_NEW_PROJECTS"
          : "SYSTEM_BUSY // NOT_AVAILABLE"}
      </span>
    </div>
  );
}

const experiences = [
  {
    date: "2022 - GÜNÜMÜZ",
    title: "Senior Full-Stack Developer",
    company: "TechTide AI",
    description:
      "Yapay zeka tabanlı veri analitiği platformlarının mimari tasarımı ve geliştirilmesi. Mikroservis ekosisteminin yönetimi ve yüksek performanslı dashboard sistemlerinin implementasyonu.",
    isCurrent: true,
  },
  {
    date: "2020 - 2022",
    title: "Lead Backend Architect",
    company: "CyberStream Systems",
    description:
      "Büyük ölçekli veri işleme boru hatlarının Rust ve Go ile optimizasyonu. Veritabanı katmanında %40 performans artışı sağlayan şema tasarımları.",
    isCurrent: false,
  },
  {
    date: "2018 - 2020",
    title: "Software Engineer",
    company: "Nexus Digital Agency",
    description:
      "E-ticaret ve fintech projelerinde Full-stack geliştirme süreçleri. React ve Node.js ekosisteminde ölçeklenebilir uygulamalar.",
    isCurrent: false,
  },
];

const skillCategories = [
  {
    category: "Frontend Architecture",
    skills: [
      { name: "React / Next.js", percentage: 95, icon: "⌨" },
      { name: "Tailwind CSS", percentage: 98, icon: "🎨" },
    ],
  },
  {
    category: "Backend & Logic",
    skills: [
      { name: "Node.js / Go", percentage: 90, icon: "⚙" },
      { name: "PostgreSQL / Redis", percentage: 85, icon: "💾" },
    ],
  },
  {
    category: "Infrastructure",
    skills: [{ name: "Docker / Kubernetes", percentage: 80, icon: "☁" }],
  },
];

const learningTopics = ["Rust", "WASM", "AI Agents", "WebGPU"];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50" />

      {/* Top Navigation */}
      <header className="bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 h-16">
          <a
            href="/"
            className="text-xl font-bold text-primary tracking-widest font-headline"
          >
            KINETIC_CONSOLE
          </a>
          <div className="hidden md:flex gap-8 items-center">
            <a
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
              href="/projects"
            >
              PROJECTS
            </a>
            <a
              className="font-headline uppercase tracking-tighter font-bold text-primary border-b-2 border-primary pb-1"
              href="/about"
            >
              STACK
            </a>
            <a
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
              href="/archive"
            >
              ARCHIVE
            </a>
            <a
              className="font-headline uppercase tracking-tighter font-bold text-on-surface-variant hover:text-primary transition-colors"
              href="/contact"
            >
              CONTACT
            </a>
          </div>
          <button className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-md font-headline uppercase tracking-tighter font-bold text-sm hover:bg-primary/20 transition-all">
            DOWNLOAD_CV
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-12 mb-24">
          {/* Avatar with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all duration-500" />
            <img
              alt="Hikmet Güleşli Avatar"
              className="relative w-[200px] h-[200px] rounded-full object-cover border-4 border-primary shadow-[0_0_30px_rgba(78,222,163,0.3)] group-hover:scale-105 transition-transform duration-300"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA174UADiEYMPYWlht4hK6-w3oYaRbVVz4qgfjxYXBtMfMngh_nbMWij1ULz5hGQOokSRPmOi3YhoGHpQRzTN6irdfJKCgkGrleSUL2nGF8Z5m6zf_n8M_B_wd00-lpJukh9xFUSmAzCAD_-nbQwvZXYye8Hp0X9sQQPcKbuad0yfudhWeoeIe9BXf1DfNw8i6pKtT5k1vRwJMjK7E2ZPuBVgKm1RYFVDUud_OzPtbNd6_udnnGK78BeDdjngRWaI4Xkm0aC6B3gs"
            />
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary via-primary-fixed-dim to-secondary bg-clip-text text-transparent">
              Hakkında
            </h1>
            <h3 className="font-headline text-xl md:text-2xl text-primary/80 mb-6 tracking-wide">
              Full-Stack Developer & Systems Architect
            </h3>
            <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed">
              Complex sistemleri minimalist ve ölçeklenebilir çözümlere
              dönüştürmeye odaklı bir yazılım mimarı. Sentinel Interface
              vizyonuyla, veri yoğunluklu uygulamaları kullanıcı odaklı terminal
              estetiğiyle harmanlıyorum. Geleceğin dijital altyapılarını bugünün
              teknolojileriyle inşa ediyorum.
            </p>
          </div>
        </section>

        {/* Availability Toggle */}
        <section className="mb-24 flex justify-center md:justify-start">
          <AvailabilityToggle />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Experience Timeline */}
          <div className="lg:col-span-7">
            <h2 className="font-headline text-2xl font-bold uppercase tracking-widest mb-12 flex items-center gap-4">
              <span className="text-primary">//</span> Deneyim Geçmişi
            </h2>
            <div className="relative ml-4">
              {experiences.map((exp, index) => (
                <TimelineItem key={index} {...exp} index={index} />
              ))}
            </div>
          </div>

          {/* Skills & More */}
          <div className="lg:col-span-5 space-y-16">
            {/* Skills Grid */}
            <div>
              <h2 className="font-headline text-2xl font-bold uppercase tracking-widest mb-8 flex items-center gap-4">
                <span className="text-primary">//</span> Teknik Yetkinlikler
              </h2>
              <div className="space-y-8">
                {skillCategories.map((cat, catIndex) => (
                  <div key={catIndex}>
                    <p className="font-label text-[10px] uppercase text-slate-500 mb-4 tracking-widest italic">
                      {cat.category}
                    </p>
                    <div className="space-y-4">
                      {cat.skills.map((skill, skillIndex) => (
                        <SkillBar
                          key={skillIndex}
                          {...skill}
                          index={catIndex * 2 + skillIndex}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-surface-container-low p-6 border-l-2 border-primary">
              <h2 className="font-headline text-lg font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="text-primary">🚀</span> Currently Learning
              </h2>
              <div className="flex flex-wrap gap-2">
                {learningTopics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-surface-container-high text-xs font-label text-on-surface-variant border border-outline-variant/30"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div>
              <button className="w-full bg-primary text-on-primary font-headline font-bold py-4 rounded-md shadow-[0_0_25px_rgba(78,222,163,0.4)] hover:shadow-[0_0_40px_rgba(78,222,163,0.6)] transition-all flex items-center justify-center gap-3 active:scale-95 group">
                <span className="text-lg">⬇</span>
                <span>DOWNLOAD CV.EXE</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-primary/20 bg-surface-container-low">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 w-full gap-4">
          <div className="text-primary font-bold font-label text-[10px] uppercase tracking-widest">
            © 2024 SENTINEL_INTERFACE // ALL_RIGHTS_RESERVED
          </div>
          <div className="flex gap-6 font-label text-[10px] uppercase tracking-widest">
            <a
              className="text-slate-500 hover:text-primary transition-all hover:translate-x-1 duration-200"
              href="https://github.com/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </a>
            <a
              className="text-slate-500 hover:text-primary transition-all hover:translate-x-1 duration-200"
              href="https://linkedin.com/in/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN
            </a>
            <a
              className="text-slate-500 hover:text-primary transition-all hover:translate-x-1 duration-200"
              href="https://stackoverflow.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              STACK_OVERFLOW
            </a>
            <span className="text-primary">TERMINAL_STATUS:ONLINE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
