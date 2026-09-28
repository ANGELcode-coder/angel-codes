"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { featuredTech } from "@/lib/data";
import {
  SiReact, SiNextdotjs, SiTypescript, SiPython,
  SiTailwindcss, SiDocker, SiGit, SiPostgresql,
  SiNodedotjs, SiVercel,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const iconMap: Record<string, React.ElementType> = {
  SiReact, SiNextdotjs, SiTypescript, FaJava,
  SiPython, SiTailwindcss, SiDocker, SiGit,
  SiPostgresql, SiNodedotjs, SiVercel,
};

export function FeaturedTech() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/5 via-transparent to-neon-cyan/5" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <p className="hud-label text-neon-violet/70 text-center mb-8">
          {"// Primary stack"}
        </p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-5 md:gap-7"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {featuredTech.map((tech, i) => {
            const Icon = iconMap[tech.icon];
            return (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center gap-2 group cursor-default"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -6 }}
              >
                <motion.div
                  className="w-11 h-11 md:w-13 md:h-13 clip-corners-sm bg-card/70 border border-neon-violet/25 flex items-center justify-center group-hover:border-neon-pink/60 group-hover:shadow-[0_0_20px_-2px_rgba(255,45,120,0.7)] transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.4 } }}
                >
                  {Icon && (
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-neon-muted group-hover:text-neon-pink transition-colors" />
                  )}
                </motion.div>
                <motion.span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-neon-muted group-hover:text-neon-cyan transition-colors">
                  {tech.name}
                </motion.span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
