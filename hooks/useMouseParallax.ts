"use client";

import { useCallback } from "react";
import { MotionValue, useMotionValue, useSpring } from "framer-motion";

export type MouseParallax = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  bind: {
    onPointerMove: (event: React.PointerEvent<HTMLElement>) => void;
    onPointerLeave: () => void;
  };
};

export function useMouseParallax(depth = 18): MouseParallax {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.8 });
  const y = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.8 });

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
      rawX.set(normalizedX * depth);
      rawY.set(normalizedY * depth);
    },
    [depth, rawX, rawY]
  );

  const onPointerLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { x, y, bind: { onPointerMove, onPointerLeave } };
}