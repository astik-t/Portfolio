"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type SkillOrbProps = {
  label: string;
  description: string;
  progress: number;
  muted?: boolean;
  delay?: number;
};

export function SkillOrb({ label, description, progress, muted, delay = 0 }: SkillOrbProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ scale: 1.04, y: -3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative"
      data-hoverable="true"
    >
      <div className={`glass-card rounded-2xl p-5 ${muted ? "opacity-70" : "shadow-glow"}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-text">{label}</p>
            <p className="mt-2 text-xs leading-6 text-muted">{description}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">{muted ? "Learning" : "Core"}</p>
            <p className="mt-2 font-mono text-lg text-text">{progress}%</p>
          </div>
        </div>
        <div className="mt-5 h-2 w-full rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[#f5f5f5] via-[#cfcfcf] to-[#8a8a8a]"
          />
        </div>
        <motion.div
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-muted"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0.65, scale: hovered ? 1.02 : 1 }}
          transition={{ duration: 0.25 }}
        >
          Signal stable
        </motion.div>
      </div>
    </motion.div>
  );
}