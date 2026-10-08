"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const titleWordsVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/**
 * Section title block with a bracketed HUD index, neon gradient headline and a
 * two-tone underline that wipes in from the centre.
 */
export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const titleWords = title.split(" ");

  return (
    <div ref={ref} className={cn("text-center mb-16", className)}>
      {/* Index tag */}
      <motion.div
        className="inline-flex items-center gap-2 mb-4"
        initial={{ opacity: 0, y: -8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span aria-hidden="true" className="text-neon-pink font-mono text-xs">
          [
        </span>
        <span className="hud-label text-neon-cyan">
          {subtitle ? subtitle.split(" ")[0] : "Section"}
        </span>
        <span aria-hidden="true" className="text-neon-pink font-mono text-xs">
          ]
        </span>
      </motion.div>

      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tight mb-4"
        variants={titleWordsVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {titleWords.map((word, i) => (
          <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
            <span className="text-gradient">{word}</span>
          </motion.span>
        ))}
      </motion.h2>

      {subtitle && (
        <Reveal delay={0.15} distance={16} className="max-w-2xl mx-auto">
          <p className="text-neon-muted text-lg leading-relaxed">{subtitle}</p>
        </Reveal>
      )}

      {/* Centre-out neon rule */}
      <motion.div
        className="w-24 h-[2px] mx-auto mt-7 bg-gradient-to-r from-transparent via-neon-pink to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="w-px h-6 mx-auto bg-gradient-to-b from-neon-cyan to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
