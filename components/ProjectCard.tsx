"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";

type ProjectCardProps = {
  title: string;
  problem: string;
  stack: string[];
  learned: string;
  github: string;
  gradient: string;
  effectClassName: string;
  category: "ML/AI" | "Web" | "Hardware";
};

export function ProjectCard({ title, problem, stack, learned, github, gradient, effectClassName, category }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      layout
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="glass-card group h-full rounded-3xl"
      style={{ perspective: 1200 }}
      data-hoverable="true"
    >
      <div className={`relative h-40 overflow-hidden ${gradient} ${effectClassName}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_35%)]" />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/80">
          {category}
        </div>
        <div className="absolute inset-0 flex items-end p-5">
          <h3 className="font-heading text-2xl text-white">{title}</h3>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <p className="text-sm leading-7 text-muted">{problem}</p>
        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-text/90">
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4">
          <a href={github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-danger/50 bg-danger/10 px-4 py-2 text-sm font-medium text-text">
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
          <motion.button
            type="button"
            onClick={() => setOpen((current) => !current)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text"
          >
            What I Learned
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </motion.button>
        </div>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-2xl border border-accent/20 bg-accent/5 p-4 text-sm leading-7 text-text"
            >
              {learned}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}