"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "@/components/SparklesCore";

export function SectionDivider() {
  return (
    <motion.div
      className="relative h-12 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      <div className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 opacity-80">
        <SparklesCore
          background="#050505"
          particleColor="#C9C9C9"
          particleDensity={40}
          speed={1}
          minSize={0.4}
          maxSize={1.5}
          className="h-full w-full"
        />
      </div>
    </motion.div>
  );
}