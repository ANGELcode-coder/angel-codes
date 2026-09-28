"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { statistics } from "@/lib/data";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Statistics() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/5 via-transparent to-neon-cyan/5" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-violet/40 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {statistics.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative text-center p-6 md:p-8 clip-corners-sm bg-card/70 border border-neon-violet/20 backdrop-blur-sm group hover:border-neon-pink/50 transition-colors duration-300"
              variants={cardVariants}
              custom={i}
              whileHover={{ y: -6 }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
              />
              <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gradient mb-3">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="hud-label text-neon-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
