"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Palette, Settings, Database, Cloud, Briefcase, GraduationCap, Award, Download, Rocket } from "lucide-react";

interface TimelineItemProps {
  date: string;
  title: string;
  company: string;
  description: string;
  isCurrent?: boolean;
  index: number;
}

function TimelineItem({ date, title, company, description, isCurrent = false, index }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="relative pl-12 pb-16 last:pb-0"
    >
      <div className={`absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full ${isCurrent ? "bg-primary shadow-[0_0_10px_rgba(78,222,163,1)]" : "bg-surface-container-highest border border-primary/50"}`} />
      {index < experiences.length - 1 && <div className="absolute left-[0px] top-5 bottom-0 w-px bg-primary/30" />}
      <span className={`font-label text-xs px-3 py-1 rounded-full mb-4 inline-block border ${isCurrent ? "text-primary-fixed-dim bg-primary/10 border-primary/20" : "text-slate-500 bg-surface-container-high border-outline-variant/20"}`}>
        {date}
      </span>
      <h3 className="text-xl font-bold font-headline text-on-surface">{title}</h3>
      <p className="text-primary text-sm font-label mb-3 flex items-center gap-1">
        <Briefcase className="w-3 h-3" />
        @ {company}
      </p>
      <p className="text-on-surface-variant text-sm leading-relaxed max-w-lg">{description}</p>
    </motion.div>
  );
}

interface SkillBarProps {
  name: string;
  percentage: number;
  icon: React.ReactNode;
  index: number;
}

function SkillBar({ name, percentage, icon, index }: SkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="space-y-2"
    >
      <div className="flex justify-between text-xs font-label mb-2">
        <span className="flex items-center gap-2 text-on-surface-variant">
          <span className="text-primary w-4 h-4">{icon}</span> {name}
        </span>
      </div>
      <div className="h-1 bg-surface-container rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary shadow-[0_0_8px_rgba(78,222,163,0.5)]"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

const experiences = [
  { date: "2022 - GÜNÜMÜZ", title: "Senior Full-Stack Developer", company: "TechTide AI", description: "Yapay zeka tabanlı veri analitiği platformlarının mimari tasarımı ve geliştirilmesi.", isCurrent: true },
  { date: "2020 - 2022", title: "Lead Backend Architect", company: "CyberStream Systems", description: "Büyük ölçekli veri işleme boru hatlarının Rust ve Go ile optimizasyonu.", isCurrent: false },
  { date: "2018 - 2020", title: "Software Engineer", company: "Nexus Digital Agency", description: "E-ticaret ve fintech projelerinde Full-stack geliştirme süreçleri.", isCurrent: false },
];

const skillCategories = [
  { category: "Frontend Mimarisi", skills: [
    { name: "React / Next.js", percentage: 95, icon: <Code className="w-4 h-4" /> },
    { name: "Tailwind CSS", percentage: 98, icon: <Palette className="w-4 h-4" /> }
  ]},
  { category: "Backend ve Logic", skills: [
    { name: "Node.js / Go", percentage: 90, icon: <Settings className="w-4 h-4" /> },
    { name: "PostgreSQL / Redis", percentage: 85, icon: <Database className="w-4 h-4" /> }
  ]},
  { category: "Altyapı", skills: [
    { name: "Docker / Kubernetes", percentage: 80, icon: <Cloud className="w-4 h-4" /> }
  ]},
];

const learningTopics = ["Rust", "WASM", "AI Agents", "WebGPU"];

export function AboutContent() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-30" />
      <div className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <section className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all duration-500" />
            <div className="relative w-[200px] h-[200px] rounded-full bg-surface-container-high border-4 border-primary shadow-[0_0_30px_rgba(78,222,163,0.3)] group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <span className="font-headline text-5xl font-bold text-primary">HG</span>
            </div>
          </motion.div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary via-primary-fixed-dim to-secondary bg-clip-text text-transparent">Hakkında</h1>
            <h2 className="font-headline text-xl md:text-2xl text-primary/80 mb-6 tracking-wide">Full-Stack Developer & Systems Architect</h2>
            <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed">
              Karmaşık sistemleri minimalist ve ölçeklenebilir çözümlere dönüştürmeye odaklı bir yazılım geliştirici.
            </p>
          </div>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-headline text-2xl font-bold uppercase tracking-widest mb-12 flex items-center gap-4"><span className="text-primary">//</span> Deneyim Geçmişi</h2>
            <div className="relative ml-4">
              {experiences.map((exp, index) => <TimelineItem key={index} {...exp} index={index} />)}
            </div>
          </div>
          <div className="lg:col-span-5 space-y-16">
            <div>
              <h2 className="font-headline text-2xl font-bold uppercase tracking-widest mb-8 flex items-center gap-4"><span className="text-primary">//</span> Teknik Yetkinlikler</h2>
              <div className="space-y-8">
                {skillCategories.map((cat, catIndex) => (
                  <div key={catIndex}>
                    <p className="font-label text-[10px] uppercase text-slate-500 mb-4 tracking-widest">{cat.category}</p>
                    <div className="space-y-4">
                      {cat.skills.map((skill, skillIndex) => <SkillBar key={skillIndex} {...skill} index={catIndex * 2 + skillIndex} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-low p-6 border-l-2 border-primary">
              <h2 className="font-headline text-lg font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-primary" />
                Şu Anda Öğreniyorum
              </h2>
              <div className="flex flex-wrap gap-2">
                {learningTopics.map((topic) => <span key={topic} className="px-3 py-1 bg-surface-container-high text-xs font-label text-on-surface-variant border border-outline-variant/30">{topic}</span>)}
              </div>
            </div>
            <a
              href="/cv.pdf"
              download
              className="w-full bg-primary text-[var(--color-on-primary)] font-headline font-bold py-4 rounded-lg shadow-[0_0_25px_rgba(78,222,163,0.4)] hover:shadow-[0_0_40px_rgba(78,222,163,0.6)] transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>CV'YI İNDİR</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
