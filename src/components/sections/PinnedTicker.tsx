"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export interface TickerItem {
  label: string;
  detail: string;
}

/**
 * Pinned horizontal scroller.
 *
 * A panel pins while its row of cards translates horizontally, driven by scrubbed
 * scroll progress — the pattern that does most of the work in the award-winning
 * portfolios. Two identical copies are rendered and the track is offset by -50%
 * so the loop has no seam.
 *
 * Degrades to a static wrapped list for reduced-motion users and coarse pointers,
 * which is the common case on phones: pinning there is where scroll-jacking
 * feels worst, so it is never enabled.
 */
export function PinnedTicker({
  items,
  heading = "Capabilities",
  subtitle,
  className,
}: {
  items: TickerItem[];
  heading?: string;
  subtitle?: string;
  className?: string;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const track = trackRef.current;
    if (!panel || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // Distance needed to slide exactly one copy of the row out of view.
    const distance = () => track.scrollWidth / 2;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, panel);

    // Layout settles after web fonts and images decode; recompute then.
    const settle = window.setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      window.clearTimeout(settle);
      ctx.revert();
    };
  }, [items]);

  return (
    <section
      ref={panelRef}
      id="capabilities"
      className={cn(
        "relative flex flex-col justify-center overflow-hidden py-24",
        className
      )}
      aria-label={heading}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-void-2/40" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 grid-flat opacity-40" />

      <SectionHeading title={heading} subtitle={subtitle} className="px-4" />

      <div className="relative w-full overflow-hidden clip-corners-sm border-y border-neon-violet/20 bg-void/70 backdrop-blur-sm">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-20 sm:w-32 z-10 bg-gradient-to-r from-void to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-20 sm:w-32 z-10 bg-gradient-to-l from-void to-transparent pointer-events-none"
        />

        <div ref={trackRef} className="flex w-max will-change-transform">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0"
              /* The duplicate is decorative: screen readers get one pass. */
              aria-hidden={copy === 1}
            >
              {items.map((item) => (
                <div
                  key={`${copy}-${item.label}`}
                  className="group relative w-72 sm:w-96 shrink-0 p-8 sm:p-10 border-r border-neon-violet/15 hover:bg-neon-pink/5 transition-colors duration-300"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-[2px] w-0 bg-neon-pink group-hover:w-full transition-[width] duration-500"
                  />
                  <h3 className="font-heading font-bold uppercase tracking-wide text-lg text-foreground group-hover:text-neon-pink transition-colors mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm font-mono text-neon-muted leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}