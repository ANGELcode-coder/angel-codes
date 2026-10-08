"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element is pulled toward the cursor, as a fraction. */
  strength?: number;
  as?: "div" | "a" | "button";
}

/**
 * Pulls an element slightly toward the cursor while it is hovered.
 *
 * Uses GSAP's `quickTo` so pointer movement updates a transform through a single
 * cached tween rather than creating a new tween per mousemove event — which is
 * what makes this cheap enough to leave enabled.
 *
 * Returns to rest on leave. Disabled for reduced motion and coarse pointers.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
  as: Tag = "div",
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}