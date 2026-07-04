"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { featuredTech } from "@/lib/data";
import {
  SiReact, SiNextdotjs, SiTypescript, SiPython,
  SiTailwindcss, SiDocker, SiGit, SiMysql, SiPostgresql,
  SiTensorflow,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const iconMap: Record<string, React.ElementType> = {
  SiReact, SiNextdotjs, SiTypescript, FaJava,
  SiPython, SiTailwindcss, SiDocker, SiGit, SiMysql,
  SiPostgresql, SiTensorflow,
};

const techIcons = [
  { icon: SiReact, color: "#61DAFB" },
  { icon: SiNextdotjs, color: "#fff" },
  { icon: SiTypescript, color: "#3178C6" },
  { icon: FaJava, color: "#007396" },
  { icon: SiPython, color: "#3776AB" },
  { icon: SiTailwindcss, color: "#06B6D4" },
  { icon: SiDocker, color: "#2496ED" },
  { icon: SiGit, color: "#F05032" },
  { icon: SiMysql, color: "#4479A1" },
  { icon: SiPostgresql, color: "#4169E1" },
  { icon: SiTensorflow, color: "#FF6F00" },
  { icon: SiReact, color: "#61DAFB" },
];

export function FeaturedTech() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-royal-blue/3 via-transparent to-cyan/3" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {featuredTech.map((tech, i) => {
            const Icon = iconMap[tech.icon];
            const hoverColor = techIcons[i]?.color || "#2563EB";
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
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center group-hover:border-royal-blue/50 group-hover:shadow-lg group-hover:shadow-royal-blue/5 transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.4 } }}
                >
                  {Icon && (
                    <Icon
                      className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-royal-blue transition-colors"

                    />
                  )}
                </motion.div>
                <motion.span
                  className="text-[10px] md:text-xs text-muted-foreground group-hover:text-foreground transition-colors"
                  whileHover={{ color: hoverColor }}
                >
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
