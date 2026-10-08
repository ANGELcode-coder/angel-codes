"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-driven motion layer.
 *
 * Performance budget:
 *  - Client-only, and initialised after first paint, so GSAP and Lenis stay out
 *    of the critical rendering path.
 *  - Skipped entirely for reduced-motion users and coarse pointers — they get
 *    zero animation JS rather than animation they cannot see.
 *  - GSAP and Lenis share one rAF ticker instead of running two.
 *  - `ignoreMobileResize` avoids the known address-bar thrash where a height
 *    change retriggers every ScrollTrigger.
 *  - All triggers are reverted on unmount so route changes do not leak.
 *
 * Inertia is deliberately mild (lerp 0.1). Lower values feel more premium but
 * decouple the scrollbar from the content, which hurts people who track their
 * position in the document and makes keyboard scrolling feel broken.
 */

let lenis: Lenis | null = null;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasCoarsePointer() {
  return !window.matchMedia("(pointer: fine)").matches;
}

/**
 * Schedules work off the critical path.
 *
 * Typed loosely on purpose: `requestIdleCallback` is absent from some DOM
 * typings and from Safari before 16.4, so the fallback must be reachable.
 */
function scheduleIdle(callback: () => void): number {
  const idle = (window as unknown as {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  }).requestIdleCallback;

  if (typeof idle === "function") {
    return idle(callback, { timeout: 1200 });
  }
  return window.setTimeout(callback, 200);
}

function cancelIdle(handle: number) {
  window.clearTimeout(handle);
}

export function ScrollMotion({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion() || hasCoarsePointer()) return;

    let lenisInstance: Lenis | null = null;

    const start = () => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      lenisInstance = new Lenis({
        duration: 1.1,
        lerp: 0.1,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        smoothWheel: true,
      });
      lenis = lenisInstance;

      lenisInstance.on("scroll", ScrollTrigger.update);

      // One ticker drives both libraries.
      gsap.ticker.add((time) => lenisInstance?.raf(time));
      gsap.ticker.lagSmoothing(0);
    };

    const idleHandle = scheduleIdle(start);

    return () => {
      cancelIdle(idleHandle);
      gsap.ticker.lagSmoothing(500, 33);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenisInstance?.destroy();
      lenisInstance = null;
      lenis = null;
    };
  }, []);

  return <>{children}</>;
}

/**
 * Anchor navigation that routes through Lenis when it is running, and falls
 * back to native smooth scrolling when it is not (reduced motion, touch).
 */
export function useScrollToSection() {
  return (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.2 });
      return;
    }
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

/** Recalculate trigger positions after content or route changes. */
export function refreshScrollTriggers() {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
}