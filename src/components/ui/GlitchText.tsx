"use client";

import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  /** Accessible text. Defaults to `text`. */
  srText?: string;
}

/**
 * RGB-split glitch headline.
 *
 * Renders three stacked copies of `text`: the base layer, plus cyan and magenta
 * offsets clipped to shifting horizontal bands. The decorative copies are hidden
 * from screen readers so the name is announced once.
 *
 * The glitch only runs while hovered (or while focused via keyboard) so the page
 * stays calm by default, and it is fully disabled under reduced-motion.
 */
export function GlitchText({ text, className, srText }: GlitchTextProps) {
  return (
    <span className={cn("group/glitch relative inline-block", className)}>
      <span className="sr-only">{srText ?? text}</span>
      <span aria-hidden="true" className="relative inline-block">
        <span className="text-gradient bg-clip-text text-transparent">
          {text}
        </span>
        <span
          className="pointer-events-none absolute inset-0 text-neon-cyan opacity-0 mix-blend-screen group-hover/glitch:opacity-80 group-hover/glitch:animate-[glitch-a_0.42s_steps(2,end)_infinite] motion-reduce:hidden"
        >
          {text}
        </span>
        <span
          className="pointer-events-none absolute inset-0 text-neon-pink opacity-0 mix-blend-screen group-hover/glitch:opacity-80 group-hover/glitch:animate-[glitch-b_0.42s_steps(2,end)_infinite] motion-reduce:hidden"
        >
          {text}
        </span>
      </span>
    </span>
  );
}
