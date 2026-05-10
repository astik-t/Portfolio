"use client";

import { AnimatePresence, motion, useTransform } from "framer-motion";
import { ArrowRight, BadgeCheck, Check, ChevronDown, Code2, Copy, Cpu, Download, Gamepad2, Github, Linkedin, Mail, Menu, Phone, Send, TerminalSquare, Wrench, X, Youtube } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { CustomCursor } from "@/components/CustomCursor";
import { SectionShell } from "@/components/SectionShell";
import { SectionDivider } from "@/components/SectionDivider";
import Particles from "@/components/Particles";
import { SkillOrb } from "@/components/SkillOrb";
import { ProjectCard } from "@/components/ProjectCard";
import { FakeTerminal } from "@/components/FakeTerminal";

const roles = ["Python Developer", "AIML Engineer", "Student Builder", "UI Experimenter"];

const skillsTechnical = [
  { label: "Python", description: "Primary scripting and automation language for data and logic-heavy builds.", progress: 96 },
  { label: "C Programming", description: "Low-level thinking, memory discipline, and fundamentals that sharpen every other layer.", progress: 78 },
  { label: "Data Structures & Algorithms", description: "Problem solving with efficient patterns, complexity awareness, and clean reasoning.", progress: 84 },
  { label: "ML Frameworks", description: "PyTorch and scikit-learn workflows for experiments, evaluation, and iteration.", progress: 82 },
  { label: "Flask / FastAPI / Next.js", description: "Practical app delivery across APIs, web frontends, and server-rendered systems.", progress: 88 },
  { label: "Git & Open Source", description: "Versioned collaboration, branching discipline, and contribution-ready habits.", progress: 90 },
  { label: "Networking & IT Protocols", description: "Useful intuition for real systems, connectivity, and infrastructure behavior.", progress: 73 },
  { label: "UI/UX Design", description: "Interface thinking with hierarchy, motion, and feedback loops that feel premium.", progress: 79 },
  { label: "Embedded Systems", description: "Arduino-style hardware exploration, sensors, timing, and physical computing.", progress: 74 }
];

const skillsFuture = [
  { label: "3D Web Dev", description: "Building immersive scenes and spatial interfaces with Three.js and React Three Fiber.", progress: 46, muted: true },
  { label: "AIML Engineering", description: "Expanding into stronger deployment, experimentation, and applied intelligence systems.", progress: 58, muted: true },
  { label: "Full-Stack", description: "Growing towards shipping entire products end to end with confidence.", progress: 53, muted: true },
  { label: "AI-Assisted Dev", description: "Using tooling and workflows that multiply speed without losing craft.", progress: 63, muted: true }
];

const projects = [
  {
    title: "Traffic Object Detection",
    problem: "Real-time vehicle/object detection for smarter traffic monitoring.",
    stack: ["Python", "OpenCV", "ML", "Computer Vision"],
    learned: "Optimizing CV pipelines for real-time inference taught me how much impact clean preprocessing, frame management, and model selection can have on live systems.",
    github: "https://github.com/astik-t/traffic-detection-system",
    gradient: "bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#050505]",
    effectClassName: "scanline",
    category: "ML/AI" as const
  },
  {
    title: "Traffic Accident Severity Prediction",
    problem: "Predicting crash severity from accident data for safety analysis.",
    stack: ["Python", "Data Analysis", "Scikit-learn", "Predictive Modeling"],
    learned: "This project reinforced feature engineering, class imbalance handling, and how to interpret ML evaluation metrics with discipline.",
    github: "https://github.com/astik-t/traffic-accident-severity-prediction",
    gradient: "bg-gradient-to-br from-[#202020] via-[#353535] to-[#050505]",
    effectClassName: "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_24%)]",
    category: "ML/AI" as const
  },
  {
    title: "Smash Sessions Unleashed",
    problem: "Immersive, high-energy web experience for a rage room concept.",
    stack: ["Frontend Dev", "Interactive UI", "Web Design"],
    learned: "Motion design and visual storytelling matter when the product itself is about emotional energy and experience.",
    github: "https://github.com/astik-t/smash-sessions-unleashed",
    gradient: "bg-gradient-to-br from-[#161616] via-[#303030] to-[#050505]",
    effectClassName: "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_22%)]",
    category: "Web" as const
  }
];

const timeline = [
  { year: "2023", title: "Started CS journey", detail: "Wrote my first Python script and started thinking like a builder instead of just a learner." },
  { year: "2024", title: "Built first Arduino project", detail: "Entered the embedded world and learned how hardware constraints sharpen software design." },
  { year: "2025", title: "Dived into ML/AI", detail: "Completed my first model and started understanding data, evaluation, and iteration deeply." },
  { year: "2025", title: "Started contributing to open source", detail: "Began learning collaborative development, version control, and community-driven workflows." },
  { year: "2026", title: "Built more real-world ML projects", detail: "Focused on problems with context, pipelines, and practical outcomes instead of isolated demos." },
  { year: "2026", title: "Started C for fundamentals", detail: "Used C to tighten my grasp on low-level logic, memory, and computational discipline." },
  { year: "2026", title: "Worked on frameworks and deployment tools", detail: "Expanded from prototypes into software that could be packaged, shipped, and maintained." },
  { year: "2026", title: "Currently: 2nd year, building deeper", detail: "The direction now is stronger fundamentals, better taste, and more ambitious systems." }
];

function useTypewriter(words: string[], interval = 2100) {
  const [typed, setTyped] = useState("");
  const wordsRef = useRef(words);
  wordsRef.current = words;

  useEffect(() => {
    let alive = true;
    let wordIndex = 0;
    let charIndex = 0;
    let direction: 1 | -1 = 1;

    const schedule = (fn: () => void, delay: number) => {
      window.setTimeout(() => {
        if (alive) fn();
      }, delay);
    };

    const tick = () => {
      if (!alive) return;
      const current = wordsRef.current[wordIndex];
      setTyped(current.slice(0, charIndex));

      if (direction === 1) {
        if (charIndex < current.length) {
          charIndex += 1;
          schedule(tick, 45);
        } else {
          direction = -1;
          schedule(tick, interval);
        }
      } else if (charIndex > 0) {
        charIndex -= 1;
        schedule(tick, 25);
      } else {
        direction = 1;
        wordIndex = (wordIndex + 1) % wordsRef.current.length;
        schedule(tick, 25);
      }
    };

    tick();

    return () => {
      alive = false;
    };
  }, [interval]);

  return typed;
}

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="inline-flex flex-wrap gap-x-2 gap-y-1">
      {words.map((word, wordIndex) => (
        <motion.span
          key={`${word}-${wordIndex}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18, delay: wordIndex * 0.1 }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function Navbar({ onResumeClick, onToggleTerminal }: { onResumeClick: () => void; onToggleTerminal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["home", "about", "skills", "projects", "creator", "timeline", "contact"];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-none ${scrolled ? "bg-[#050505]/80 shadow-glow backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}
    >
      <div className="section-shell flex items-center justify-between py-4">
        <a href="#home" className="group inline-flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 font-heading text-xl text-text shadow-glow">
            <span className="gradient-text">A.</span>
          </span>
          <div className="leading-tight">
            <p className="font-heading text-lg text-text">Astik Tripathi</p>
            <p className="text-xs uppercase tracking-[0.32em] text-muted">Creative Technologist</p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a key={link} href={`#${link === "creator" ? "about" : link}`} className="text-sm text-muted transition-none hover:text-text">
              {link[0].toUpperCase() + link.slice(1)}
            </a>
          ))}
          <button onClick={onToggleTerminal} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text" type="button">
            <TerminalSquare className="h-4 w-4 text-accent" />
            Terminal
          </button>
          <button onClick={onResumeClick} className="inline-flex items-center gap-2 rounded-full border border-danger/60 bg-danger/10 px-5 py-2.5 text-sm text-text" type="button">
            <Download className="h-4 w-4" />
            Resume
          </button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={onToggleTerminal} type="button" className="rounded-full border border-white/10 bg-white/5 p-3 text-text">
            <TerminalSquare className="h-4 w-4" />
          </button>
          <button onClick={() => setOpen((current) => !current)} className="rounded-full border border-white/10 bg-white/5 p-3 text-text" type="button">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.3 }}
            className="mx-4 mb-4 rounded-3xl border border-white/10 bg-[#0b0b0f]/95 p-5 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a key={link} href={`#${link === "creator" ? "about" : link}`} onClick={() => setOpen(false)} className="text-sm text-text">
                  {link[0].toUpperCase() + link.slice(1)}
                </a>
              ))}
              <button onClick={() => { setOpen(false); onResumeClick(); }} type="button" className="inline-flex items-center gap-2 rounded-full border border-danger/60 bg-danger/10 px-5 py-3 text-sm text-text">
                <Download className="h-4 w-4" />
                Download Resume
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const typed = useTypewriter(roles);
  const { bind, x, y } = useMouseParallax(20);
  const heroX = useTransform(x, (value) => -value * 0.4);
  const heroY = useTransform(y, (value) => -value * 0.2);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28 lg:pt-32" {...bind}>
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="absolute inset-0 soft-grid opacity-25" />
      <motion.div
        aria-hidden="true"
        style={{ x: heroX, y: heroY }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <div style={{ width: "1080px", height: "1080px", position: "relative" }}>
          <Particles
            particleCount={550}
            particleSpread={14}
            speed={0.02}
            particleColors={["#ffffff", "#ffffff", "#ffffff"]}
            moveParticlesOnHover
            particleHoverFactor={0.4}
            alphaParticles={false}
            particleBaseSize={100}
            sizeRandomness={0.6}
            cameraDistance={20}
            disableRotation={false}
          />
        </div>
      </motion.div>
      <div className="section-shell relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div style={{ x, y }} className="relative z-10 space-y-8">
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-accent/80">
              <WordReveal text="Hello, I\'m" />
            </p>
            <h1 className="font-heading text-6xl leading-none tracking-tight text-text sm:text-7xl lg:text-8xl">
              <span className="gradient-text">Astik</span>
            </h1>
            <div className="flex items-center gap-3 text-base text-muted sm:text-lg">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_20px_rgba(255,255,255,0.65)]" />
              <span className="font-mono text-accent">{typed}</span>
              <span className="animate-pulse text-accent/70">|</span>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-text/85 sm:text-xl">
              <WordReveal text="I build intelligent systems, interactive experiences, and experimental tech — one deep thought at a time." />
            </p>
            <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">
              Student • Python Dev • AIML Explorer • Creative Technologist
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-[#050505] shadow-glow">
              View Projects <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-text">
              Contact Me
            </motion.a>
            <motion.a href="/assets/resume.pdf" target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3.5 text-sm text-text/90">
              Resume ↓
            </motion.a>
          </div>

          <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.3em] text-muted">
            {[
              "Python Developer",
              "AIML Developer",
              "Student Builder",
              "UI Enthusiast"
            ].map((pill) => (
              <span key={pill} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-accent/90">
                {pill}
              </span>
            ))}
          </div>
        </motion.div>


      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-muted"
      >
        <span className="mb-2 block text-center text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <ChevronDown className="mx-auto h-5 w-5 animate-bounce text-accent" />
      </motion.a>
    </section>
  );
}

function About() {
  const interests = [
    { icon: Cpu, title: "Python & ML" },
    { icon: Code2, title: "Data Structures & Algorithms" },
    { icon: Gamepad2, title: "Gaming" },
    { icon: Wrench, title: "Hardware / Embedded" }
  ];

  const mindset = ["Deep Thinker", "Learning-Driven", "Experimental", "Problem Solver"];

  return (
    <SectionShell
      id="about"
      eyebrow="Creator"
      title="About Me"
      subtitle="A quick picture of how I think, what I build, and the kinds of problems I enjoy working through."
      className="py-24"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="flex justify-center">
          <div className="relative flex h-[22rem] w-[22rem] items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),rgba(255,255,255,0.02)_40%,rgba(0,0,0,0.2)_70%)] shadow-[0_0_60px_rgba(255,255,255,0.16)]">
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute inset-10 rounded-full border border-white/10" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.18),transparent_20%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1),transparent_18%)]" />
            <div className="relative z-10 flex h-52 w-52 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.28),rgba(0,0,0,0)_58%)] opacity-70 blur-xl" />
              <div className="relative z-10 text-center">
                <p className="font-heading text-5xl text-text">A.T.</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted">Stylized Avatar</p>
                <p className="mt-3 px-8 text-xs leading-6 text-muted">TODO: replace with actual photo if you add /assets/avatar.png</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="space-y-8">
          <p className="text-lg leading-9 text-text/90 sm:text-xl">
            I&apos;m Astik — a second-year CS student obsessed with building things that actually work: ML systems, embedded hardware, interactive UIs, and everything in between. I think deeply before I act, learn by doing, and love solving problems that don&apos;t have obvious answers.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {interests.map(({ icon: Icon, title }) => (
              <motion.div key={title} whileHover={{ scale: 1.03, y: -2 }} className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-accent shadow-glowAccent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-text">{title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {mindset.map((badge) => (
              <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text/90">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}

function Skills() {
  return (
    <SectionShell id="skills" eyebrow="Capabilities" title="My Arsenal" subtitle="A focused mix of technical depth and the next layers I am actively learning." className="py-24">
      <div className="space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.45em] text-muted">Arsenal Console</p>
              <h3 className="mt-2 font-heading text-2xl text-text">Signal Overview</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-muted">
              <span className="h-2 w-2 rounded-full bg-white/60" />
              Sync Active
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { label: "Core Modules", value: "9" },
              { label: "Learning Tracks", value: "4" },
              { label: "Focus Mode", value: "Deep" }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.label}</p>
                <p className="mt-2 font-heading text-2xl text-text">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute left-0 top-0 h-full w-1/3 rounded-full bg-white/30"
              animate={{ x: ["-40%", "140%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
        <div>
          <div className="mb-5 flex items-center gap-3">
            <h3 className="font-heading text-2xl text-text">Technical Skills</h3>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-accent">Core</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillsTechnical.map((skill, index) => (
              <SkillOrb key={skill.label} {...skill} delay={index * 0.08} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3">
            <h3 className="font-heading text-2xl text-text">Future / Learning</h3>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-muted">In progress</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {skillsFuture.map((skill, index) => (
              <SkillOrb key={skill.label} {...skill} delay={index * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function Projects() {
  const [filter, setFilter] = useState<"All" | "ML/AI" | "Web" | "Hardware">("All");
  const filtered = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  const filters = ["All", "ML/AI", "Web", "Hardware"] as const;

  return (
    <SectionShell id="projects" eyebrow="Builds" title="Things I've Built" subtitle="A few projects that show how I think, what I care about, and how I ship." className="py-24">
      <div className="mb-8 flex flex-wrap gap-3">
        {filters.map((item) => (
          <motion.button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-full border px-5 py-2 text-sm ${filter === item ? "border-accent/50 bg-accent/10 text-text" : "border-white/10 bg-white/5 text-muted"}`}
          >
            {item}
          </motion.button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </SectionShell>
  );
}

function TimelineSection() {
  return (
    <SectionShell id="timeline" eyebrow="Journey" title="How I Got Here" subtitle="A compact timeline of the steps that shaped the way I build today." className="py-24">
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2 md:-translate-x-1/2" />
        <div className="absolute left-4 top-0 h-24 w-px bg-gradient-to-b from-accent/90 to-transparent md:left-1/2 md:-translate-x-1/2 md:animate-pulseLine" />
        <div className="space-y-8">
          {timeline.map((entry, index) => {
            const alignRight = index % 2 === 1;
            const card = (
              <div className={`glass-card rounded-3xl p-6 ${alignRight ? "text-left" : "text-left md:text-right"}`}>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">{entry.year}</p>
                <h3 className="mt-3 font-heading text-2xl text-text">{entry.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{entry.detail}</p>
              </div>
            );
            return (
              <motion.div
                key={`${entry.year}-${entry.title}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative grid gap-4 pl-14 md:grid-cols-[1fr_auto_1fr] md:pl-0"
              >
                <div className={`order-2 md:order-none md:flex ${alignRight ? "md:col-start-3 md:justify-start" : "md:col-start-1 md:justify-end"}`}>
                  {card}
                </div>
                <div className="order-1 md:order-none md:col-start-2 md:flex md:items-center md:justify-center">
                  <div className="relative flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 bg-[#0c0c0c] shadow-glowAccent">
                    <div className="h-2.5 w-2.5 rounded-full bg-accent pulse-dot" />
                  </div>
                </div>
                <div className={`order-3 hidden md:block ${alignRight ? "md:col-start-1" : "md:col-start-3"}`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

function Education() {
  const card = {
    label: "Current",
    institution: "Graphic Era Deemed to be University",
    degree: "B.Tech CSE with AIML",
    year: "2025 - 2029",
    highlights: ["PBL projects", "AIML coursework", "Data Mining", "C Programming"]
  };

  return (
    <SectionShell id="education" eyebrow="Academics" title="Education" subtitle="The formal path behind the skills and projects you see here." className="py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-accent shadow-glowAccent">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">{card.label}</p>
              <h3 className="mt-2 font-heading text-2xl text-text">{card.institution}</h3>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm leading-7 text-muted">
            <p className="text-text">{card.degree}</p>
            <p>{card.year}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {card.highlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-text/90">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}

function Contact({ onToggleTerminal }: { onToggleTerminal: () => void }) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = async (label: string, value: string) => {
    if (!navigator?.clipboard) {
      setCopied("Clipboard blocked");
      window.setTimeout(() => setCopied(null), 2000);
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied("Copy failed");
      window.setTimeout(() => setCopied(null), 2000);
    }
  };

  const info = [
    { icon: Mail, title: "Email", value: "astik.tr@gmail.com", href: "mailto:astik.tr@gmail.com" },
    { icon: Phone, title: "Phone", value: "+91 9259500529", href: "tel:+919259500529" },
    { icon: Github, title: "GitHub", value: "astik-t", href: "https://github.com/astik-t" },
    { icon: Linkedin, title: "LinkedIn", value: "astik-tripathi", href: "https://www.linkedin.com/in/astik-tripathi/" },
    { icon: Youtube, title: "YouTube", value: "Not shared yet", href: "#contact" }
  ];

  const quickActions = [
    { label: "Copy Email", value: "astik.tr@gmail.com", icon: Copy, copyKey: "Email", onClick: () => copyText("Email", "astik.tr@gmail.com") },
    { label: "Copy Phone", value: "+91 9259500529", icon: Copy, copyKey: "Phone", onClick: () => copyText("Phone", "+91 9259500529") },
    { label: "Open Resume", value: "/assets/resume.pdf", icon: Download, copyKey: null, onClick: () => window.open("/assets/resume.pdf", "_blank", "noopener,noreferrer") }
  ];

  return (
    <div className="relative overflow-hidden py-24">
      <SectionShell id="contact" eyebrow="Reach Out" title="Let's Build Something" subtitle="Available for collaborations, projects, internships, and interesting conversations." className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form
            onSubmit={(event) => {
              event.preventDefault();
              setStatus("sent");
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-muted">
                Name
                <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-text outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10" placeholder="Your name" />
              </label>
              <label className="space-y-2 text-sm text-muted">
                Email
                <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-text outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10" placeholder="your@email.com" />
              </label>
            </div>
            <label className="mt-4 block space-y-2 text-sm text-muted">
              Message
              <textarea rows={7} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-text outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10" placeholder="Tell me about your project, idea, or opportunity." />
            </label>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-[#050505] shadow-glow">
                <Send className="h-4 w-4" />
                Send
              </motion.button>
              <button onClick={onToggleTerminal} type="button" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-text">
                Open Terminal
              </button>
              {status === "sent" ? <span className="text-sm text-accent">Message captured locally. Connect the form endpoint when ready.</span> : null}
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="space-y-4"
          >
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="pulse-dot inline-block h-3 w-3 rounded-full bg-white/60" />
                  <span className="text-sm text-text">Open to opportunities</span>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-muted">Live</span>
              </div>
              <div className="mt-5 grid gap-3">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.label}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.onClick}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-accent">
                        {action.copyKey && copied === action.copyKey ? <Check className="h-4 w-4" /> : <action.icon className="h-4 w-4" />}
                      </span>
                      <div className="text-left">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted">{action.label}</p>
                        <p className="text-sm text-text/80">{action.value}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted" />
                  </motion.button>
                ))}
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.35em] text-muted">
                {copied ? (copied === "Clipboard blocked" || copied === "Copy failed" ? copied : `Copied ${copied}`) : "Tap to copy details"}
              </p>
            </div>
            <div className="glass-card rounded-3xl p-6">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted">Connect</p>
              <div className="mt-4 space-y-3">
                {info.map(({ icon: Icon, title, value, href }) => (
                  <motion.a
                    key={title}
                    whileHover={{ scale: 1.01, x: 2 }}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-none hover:border-accent/30 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted">{title}</p>
                        <p className="text-sm text-text">{value}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-3xl p-6 text-sm leading-7 text-muted">
              Available for collaborations, internships, and challenging product work that benefits from deep thinking and strong execution.
            </div>
          </motion.div>
        </div>
      </SectionShell>
    </div>
  );
}

export function PortfolioApp() {
  useLenisScroll();
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "`") {
        event.preventDefault();
        setTerminalOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const openResume = useCallback(() => {
    window.open("/assets/resume.pdf", "_blank", "noopener,noreferrer");
  }, []);

  const toggleTerminal = useCallback(() => {
    setTerminalOpen((current) => !current);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <CustomCursor />
      <div className="noise-overlay" />
      <Navbar onResumeClick={openResume} onToggleTerminal={toggleTerminal} />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <TimelineSection />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Contact onToggleTerminal={toggleTerminal} />
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-sm text-muted">
        <div className="section-shell">Built with Next.js, React Three Fiber, Framer Motion, Tailwind, Lenis, and a lot of late-night iteration.</div>
      </footer>
      <FakeTerminal open={terminalOpen} onClose={toggleTerminal} />
    </div>
  );
}