"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Tools and technologies I work with"
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="group relative p-6 clip-corners-sm bg-card/70 border border-neon-violet/20 backdrop-blur-sm hover:border-neon-pink/50 hover:shadow-[0_0_28px_-6px_rgba(255,45,120,0.5)] transition-all duration-500"
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.3 },
              }}
            >
              {/* Top accent bar keyed to the category colour */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(to right, transparent, ${category.color}, transparent)`,
                }}
              />

              {/* Corner brackets */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to right, currentColor 1px, transparent 1px) 0 0 / 12px 1px no-repeat, linear-gradient(to bottom, currentColor 1px, transparent 1px) 0 0 / 1px 12px no-repeat, linear-gradient(to left, currentColor 1px, transparent 1px) 100% 100% / 12px 1px no-repeat, linear-gradient(to top, currentColor 1px, transparent 1px) 100% 100% / 1px 12px no-repeat",
                  color: category.color,
                }}
              />

              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  className="w-9 h-9 clip-corners-sm flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${category.color}1a`,
                    border: `1px solid ${category.color}55`,
                  }}
                  whileHover={{ rotate: 45, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className="w-2.5 h-2.5 rotate-45"
                    style={{ backgroundColor: category.color }}
                  />
                </motion.div>
                <h3 className="text-base font-heading font-bold uppercase tracking-widest text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className="px-2.5 py-1 clip-corners-sm font-mono text-xs text-neon-muted border border-neon-violet/20 bg-void-3/60 group-hover:border-neon-pink/40 group-hover:text-neon-pink transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + si * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
