"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.25 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const enter = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, input, textarea, [data-hoverable='true']")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", enter);
    window.addEventListener("mouseout", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", enter);
      window.removeEventListener("mouseout", enter);
    };
  }, [x, y]);

  return (
    <motion.div
      className="custom-cursor hidden lg:block"
      style={{ x: springX, y: springY, scale: hovering ? 1.8 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    />
  );
}