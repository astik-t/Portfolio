"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

export function SectionShell({ id, eyebrow, title, subtitle, children, className }: SectionShellProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="section-shell">
        <motion.div variants={sectionVariants} className="mb-12">
          {eyebrow ? <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent/80">{eyebrow}</p> : null}
          <h2 className="section-title mt-3">{title}</h2>
          {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
        </motion.div>
        {children}
      </div>
    </motion.section>
  );
}