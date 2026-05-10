"use client";

import { motion } from "framer-motion";

/**
 * Lightweight section divider — pure CSS shimmer effect.
 * Replaces the previous SparklesCore (tsparticles) version
 * to eliminate 6 extra canvas + rAF loops from the page.
 */
export function SectionDivider() {
  return (
    <motion.div
      className="relative h-12 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* main gradient line */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

      {/* animated shimmer sweep */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 overflow-hidden">
        <div className="divider-shimmer h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      {/* soft glow bloom */}
      <div className="absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/10 to-transparent blur-md" />

      {/* subtle dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 0 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />
    </motion.div>
  );
}