"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const titleWordsVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const titleWords = title.split(" ");

  return (
    <div ref={ref} className={cn("text-center mb-16", className)}>
      <motion.div
        className="inline-block mb-3"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-royal-blue/10 text-royal-blue border border-royal-blue/20">
          {subtitle ? subtitle.split(" ")[0] : "Section"}
        </span>
      </motion.div>
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4"
        variants={titleWordsVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ perspective: 800 }}
      >
        {titleWords.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block mr-[0.25em]"
          >
            <span className="text-gradient">{word}</span>
          </motion.span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className="w-20 h-1 bg-gradient-to-r from-royal-blue via-indigo to-cyan rounded-full mx-auto mt-6"
        initial={{ width: 0 }}
        animate={isInView ? { width: 80 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="w-12 h-1 bg-gradient-to-r from-cyan to-royal-blue rounded-full mx-auto mt-1.5"
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: 48, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
