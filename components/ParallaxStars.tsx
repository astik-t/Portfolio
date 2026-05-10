"use client";

/**
 * Pure-CSS parallax starfield.
 * Three layers of stars at different sizes / speeds create depth.
 * Zero JavaScript, zero canvas — everything is GPU-composited CSS.
 */
export function ParallaxStars({ className }: { className?: string }) {
  return (
    <div className={`parallax-stars-wrap ${className || ""}`}>
      <div className="parallax-stars parallax-stars-sm" />
      <div className="parallax-stars parallax-stars-md" />
      <div className="parallax-stars parallax-stars-lg" />
    </div>
  );
}
