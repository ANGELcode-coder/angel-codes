"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before animating in. */
  delay?: number;
  direction?: RevealDirection;
  /** Seconds the entrance takes. */
  duration?: number;
  /** Distance in pixels to travel. */
  distance?: number;
  /** Start animating once this much of the element is visible (0–1). */
  start?: string;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}

/**
 * Scroll-triggered entrance animation, batched by ScrollTrigger.
 *
 * Deliberately *not* a continuous scrub: reveals fire once and then stop. A
 * scrub ties animation to scroll position forever, keeps the ticker hot while
 * scrolling, and reads as a gimmick on content the user has already seen.
 *
 * Falls back to simply rendering the children if GSAP is unavailable or the
 * user prefers reduced motion — content must never be trapped at opacity 0.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.7,
  distance = 28,
  start = "top 85%",
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const from: gsap.TweenVars = { opacity: 0 };
    switch (direction) {
      case "up":
        from.y = distance;
        break;
      case "down":
        from.y = -distance;
        break;
      case "left":
        from.x = distance;
        break;
      case "right":
        from.x = -distance;
        break;
      case "none":
        from.scale = 0.96;
        break;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        from,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, direction, duration, distance, start]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}