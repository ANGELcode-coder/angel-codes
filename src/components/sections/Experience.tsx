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
    <SectionWrapper id="experience" className="bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey"
        />

        <div ref={ref} className="relative max-w-3xl mx-auto">
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-royal-blue via-indigo to-cyan md:-translate-x-px"
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
                className="absolute left-4 md:left-1/2 top-1 w-4 h-4 rounded-full bg-royal-blue border-4 border-background z-10 md:-translate-x-2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: i * 0.25 + 0.2, duration: 0.4, type: "spring", stiffness: 200 }}
              />

              <div className={`md:w-1/2 pl-10 md:pl-0 ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                <motion.div
                  className="p-5 rounded-2xl bg-card/50 border border-border/50 hover:border-royal-blue/30 transition-all duration-300 group"
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 30px rgba(37,99,235,0.08)",
                  }}
                >
                  <motion.span
                    className="text-xs font-mono text-royal-blue inline-block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: i * 0.25 + 0.3 }}
                  >
                    {exp.period}
                  </motion.span>
                  <h3 className="text-lg font-heading font-bold text-foreground mt-1 group-hover:text-gradient transition-all">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {exp.company}
                  </p>

                  <ul className={`space-y-1.5 mb-3 ${i % 2 === 0 ? "md:text-left" : ""}`}>
                    {exp.achievements.map((achievement, ai) => (
                      <motion.li
                        key={achievement}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.25 + 0.4 + ai * 0.1 }}
                      >
                        <span className="text-royal-blue mt-1.5 flex-shrink-0">
                          &rsaquo;
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
