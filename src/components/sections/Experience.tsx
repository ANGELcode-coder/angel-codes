"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { experiences } from "@/lib/data";

const expVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.25,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="experience" className="bg-void-2/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey"
        />

        <div ref={ref} className="relative max-w-3xl mx-auto">
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-pink via-neon-violet to-neon-cyan md:-translate-x-px"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${exp.title}`}
              className={`relative flex flex-col md:flex-row gap-6 md:gap-8 pb-12 last:pb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              variants={expVariants}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="hidden md:block md:w-1/2" />

              <motion.div
                className="absolute left-4 md:left-1/2 top-1 w-4 h-4 rotate-45 bg-neon-pink border-4 border-background z-10 md:-translate-x-2 shadow-[0_0_12px_rgba(255,45,120,0.9)]"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: i * 0.25 + 0.2, duration: 0.4, type: "spring", stiffness: 200 }}
              />

              <div className={`md:w-1/2 pl-10 md:pl-0 ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <motion.div
                  className="p-5 clip-corners-sm bg-card/70 border border-neon-violet/20 backdrop-blur-sm hover:border-neon-pink/50 hover:shadow-[0_0_28px_-6px_rgba(255,45,120,0.5)] transition-all duration-300 group"
                  whileHover={{ y: -4 }}
                >
                  <motion.span
                    className="hud-label text-neon-pink inline-block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: i * 0.25 + 0.3 }}
                  >
                    {exp.period}
                  </motion.span>
                  <h3 className="text-lg font-heading font-bold uppercase tracking-wide text-foreground mt-2 group-hover:text-gradient transition-all">
                    {exp.title}
                  </h3>
                  <p className="text-sm font-mono text-neon-cyan mb-3">
                    {exp.company}
                    {"location" in exp && exp.location ? (
                      <span className="text-neon-muted"> &middot; {exp.location}</span>
                    ) : null}
                  </p>

                  <ul className="space-y-1.5 mb-4">
                    {exp.achievements.map((achievement, ai) => (
                      <motion.li
                        key={achievement}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.25 + 0.4 + ai * 0.1 }}
                      >
                        <span aria-hidden="true" className="text-neon-lime mt-1.5 flex-shrink-0 font-mono">
                          &gt;
                        </span>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>

                  <div className={`flex flex-wrap gap-1.5 ${i % 2 === 0 ? "md:justify-start" : "md:justify-start"}`}>
                    {exp.technologies.map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
